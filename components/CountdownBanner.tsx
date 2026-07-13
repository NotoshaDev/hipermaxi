"use client";
// ─── components/CountdownBanner.tsx ──────────────────────────────────────────
// Banner de "Ofertas del día" con temporizador regresivo.
// Genera un target dinámico: medianoche del día actual.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

// ─── Utilidades ───────────────────────────────────────────────────────────────

function getMidnight(): Date {
  const d = new Date();
  d.setHours(23, 59, 59, 0);
  return d;
}

function calcRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return { h, m, s, done: diff === 0 };
}

// ─── Digit Block ──────────────────────────────────────────────────────────────

function Digit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-0.5">
        {str.split("").map((d, i) => (
          <span
            key={i}
            className="flex size-8 items-center justify-center rounded-md bg-white/20 text-lg font-black tabular-nums text-white backdrop-blur-sm sm:size-10 sm:text-xl"
          >
            {d}
          </span>
        ))}
      </div>
      <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-orange-100">
        {label}
      </span>
    </div>
  );
}

// ─── Placeholder estático (SSR) ───────────────────────────────────────────────
// El servidor renderiza dígitos "--" para evitar el mismatch de hidratación.
// El cliente reemplaza esto inmediatamente después del mount.

function DigitPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-0.5">
        {["–", "–"].map((d, i) => (
          <span
            key={i}
            className="flex size-8 items-center justify-center rounded-md bg-white/20 text-lg font-black tabular-nums text-white backdrop-blur-sm sm:size-10 sm:text-xl"
          >
            {d}
          </span>
        ))}
      </div>
      <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-orange-100">
        {label}
      </span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CountdownBanner() {
  /**
   * `mounted` empieza en false → el servidor renderiza el placeholder estático.
   * Tras el primer useEffect (solo cliente) se activa el timer real.
   * Esto elimina el mismatch SSR/cliente porque el servidor nunca ve Date.now().
   */
  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState<Date | null>(null);
  const [remaining, setRemaining] = useState({ h: 0, m: 0, s: 0, done: false });

  // Paso 1: activar en el cliente
  useEffect(() => {
    const t = getMidnight();
    setTarget(t);
    setRemaining(calcRemaining(t));
    setMounted(true);
  }, []);

  // Paso 2: actualizar cada segundo
  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => {
      setRemaining(calcRemaining(target));
    }, 1_000);
    return () => clearInterval(id);
  }, [target]);

  if (mounted && remaining.done) return null;

  return (
    <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
        {/* Copy */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="text-2xl" aria-hidden="true">🔥</span>
          <div>
            <p className="text-sm font-bold text-white sm:text-base">
              Ofertas del día — ¡Hasta 40% OFF!
            </p>
            <p className="text-xs text-orange-100">
              Productos seleccionados · Solo por hoy
            </p>
          </div>
        </div>

        {/* Countdown clock — placeholder en SSR, real en cliente */}
        <div
          className="flex items-center gap-2"
          aria-label="Tiempo restante de la oferta"
        >
          {mounted ? (
            <>
              <Digit value={remaining.h} label="Horas" />
              <span className="mb-4 text-xl font-black text-white/60">:</span>
              <Digit value={remaining.m} label="Minutos" />
              <span className="mb-4 text-xl font-black text-white/60">:</span>
              <Digit value={remaining.s} label="Segundos" />
            </>
          ) : (
            <>
              <DigitPlaceholder label="Horas" />
              <span className="mb-4 text-xl font-black text-white/60">:</span>
              <DigitPlaceholder label="Minutos" />
              <span className="mb-4 text-xl font-black text-white/60">:</span>
              <DigitPlaceholder label="Segundos" />
            </>
          )}
        </div>

        {/* CTA */}
        <a
          href="/ofertas"
          className="shrink-0 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-orange-600 shadow-md transition-all hover:bg-orange-50 active:scale-95"
        >
          Ver ofertas →
        </a>
      </div>
    </div>
  );
}
