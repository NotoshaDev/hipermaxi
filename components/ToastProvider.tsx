"use client";
// ─── components/ToastProvider.tsx ─────────────────────────────────────────────
// Sistema de toasts animados — Context + portal fijo en la esquina.
// ──────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  removing?: boolean;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconX({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Cerrar notificación"
      className="ml-3 shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
    >
      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

// ─── Single Toast UI ──────────────────────────────────────────────────────────

const TYPE_STYLES: Record<ToastType, string> = {
  success: "bg-emerald-600 text-white",
  error:   "bg-red-600 text-white",
  info:    "bg-slate-800 text-white",
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex items-center gap-2 rounded-xl px-4 py-3 shadow-xl text-sm font-medium
        transition-all duration-300 ease-out
        ${TYPE_STYLES[toast.type]}
        ${toast.removing
          ? "translate-x-full opacity-0"
          : "translate-x-0 opacity-100"
        }`}
      style={{ minWidth: 240, maxWidth: 340 }}
    >
      <IconCheck />
      <span className="flex-1 leading-snug">{toast.message}</span>
      <IconX onClick={() => onDismiss(toast.id)} />
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

const DURATION = 3000;
const EXIT_DURATION = 300;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    // Mark as removing (triggers exit animation)
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, removing: true } : t))
    );
    // Remove from DOM after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_DURATION);
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = `toast-${++counterRef.current}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), DURATION);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Fixed portal — bottom-right corner */}
      <div
        aria-label="Notificaciones"
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
