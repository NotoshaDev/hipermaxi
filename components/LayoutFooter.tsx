// ─── LayoutFooter.tsx ──────────────────────────────────────────────────────────
// Wireframe fidelity — Footer naranja simplificado de 2 filas:
//   Fila 1: Iconos sociales (izquierda) · Sobre Nosotros · Contáctanos (centro)
//   Fila 2: Copyright centrado
// ──────────────────────────────────────────────────────────────────────────────

import Link from "next/link";

// ─── Social icons ─────────────────────────────────────────────────────────────

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

// ─── Social links data ────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Síguenos en Facebook",
    href: "https://www.facebook.com/hipermaxi",
    Icon: IconFacebook,
  },
  {
    id: "instagram",
    label: "Síguenos en Instagram",
    href: "https://www.instagram.com/hipermaxi",
    Icon: IconInstagram,
  },
  {
    id: "youtube",
    label: "Suscríbete en YouTube",
    href: "https://www.youtube.com/@hipermaxi",
    Icon: IconYouTube,
  },
];

// ─── Main LayoutFooter ────────────────────────────────────────────────────────

export default function LayoutFooter() {
  return (
    <footer aria-label="Pie de página institucional" className="bg-orange-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Fila principal ── */}
        <div className="flex items-center py-5">

          {/* Iconos sociales — izquierda */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ id, label, href, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-lg bg-white/20 text-white transition-all duration-150 hover:bg-white/35 hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>

          {/* Links institucionales — centro (flex-1 para centrarlos) */}
          <nav
            aria-label="Navegación institucional"
            className="flex flex-1 items-center justify-center gap-8"
          >
            <Link
              href="/sobre-nosotros"
              className="text-sm font-medium text-white underline underline-offset-4 transition-colors hover:text-white/80"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-medium text-white underline underline-offset-4 transition-colors hover:text-white/80"
            >
              Contáctanos
            </Link>
          </nav>

          {/* Spacer derecho (misma anchura que los iconos para centrar los links) */}
          <div className="flex items-center gap-2" aria-hidden="true">
            {SOCIAL_LINKS.map(({ id }) => (
              <div key={id} className="size-9" />
            ))}
          </div>
        </div>

        {/* ── Línea divisoria ── */}
        <div className="border-t border-white/20" aria-hidden="true" />

        {/* ── Copyright centrado ── */}
        <p className="py-4 text-center text-sm text-white">
          Copyright&copy; 2026 Hipermaxi SA. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
}
