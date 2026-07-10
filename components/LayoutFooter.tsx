// ─── LayoutFooter.tsx ──────────────────────────────────────────────────────────
// Mockup 4 — Institutional footer with orange corporate background.
// Server Component — zero client-side JavaScript required.
// ──────────────────────────────────────────────────────────────────────────────

import Link from "next/link";

// ─── Social icons (inline SVG, no extra dependency) ──────────────────────────

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

// ─── Footer link groups ───────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
}

const INSTITUTIONAL_LINKS: FooterLink[] = [
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Contáctanos", href: "/contacto" },
  { label: "Trabaja con Nosotros", href: "/empleos" },
  { label: "Política de Privacidad", href: "/privacidad" },
];

const SERVICE_LINKS: FooterLink[] = [
  { label: "Sucursales", href: "/sucursales" },
  { label: "Click & Recoge", href: "/click-recoge" },
  { label: "Envío a Domicilio", href: "/delivery" },
  { label: "Farmacia", href: "/farmacia" },
];

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function FooterLinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-orange-200">
        {heading}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors duration-150 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main LayoutFooter ────────────────────────────────────────────────────────

export default function LayoutFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Pie de página institucional"
      className="bg-orange-600"
    >
      {/* ── Upper section ── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            {/* Wordmark */}
            <div className="flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white">
                <span className="text-xl font-black leading-none text-orange-600 tracking-tight">
                  H
                </span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                hipermaxi
              </span>
            </div>

            {/* Tagline */}
            <p className="max-w-[220px] text-sm leading-relaxed text-white/70">
              Frescura y calidad local, cada día. Sucursal Juan de la Rosa,
              Cochabamba — Bolivia.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ id, label, href, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-all duration-150 hover:bg-white/25 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Institutional links */}
          <FooterLinkColumn heading="Institución" links={INSTITUTIONAL_LINKS} />

          {/* Service links */}
          <FooterLinkColumn heading="Servicios" links={SERVICE_LINKS} />

          {/* Contact & hours */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-orange-200">
              Horario
            </h3>
            <address className="not-italic">
              <ul className="flex flex-col gap-2 text-sm text-white/80">
                <li className="flex justify-between gap-4">
                  <span>Lun – Sáb</span>
                  <span className="font-semibold text-white">07:00 – 21:30</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Domingo</span>
                  <span className="font-semibold text-white">08:00 – 21:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Feriados</span>
                  <span className="font-semibold text-white">09:00 – 20:00</span>
                </li>
              </ul>
            </address>

            <div className="mt-5 flex flex-col gap-1.5 text-sm text-white/70">
              <p>
                <span className="font-semibold text-white">Tel:</span>{" "}
                (591-4) 4-282828
              </p>
              <p>
                <span className="font-semibold text-white">Dirección:</span>{" "}
                Av. Juan de la Rosa · Cochabamba
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Thin divider ── */}
      <div className="border-t border-white/10" aria-hidden="true" />

      {/* ── Bottom bar ── */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-5 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
        <p className="text-xs text-white/60">
          Copyright&copy; {year} Hipermaxi SA. Todos los derechos reservados.
        </p>

        <nav aria-label="Navegación legal secundaria">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 sm:justify-end">
            {[
              { label: "Términos y Condiciones", href: "/terminos" },
              { label: "Privacidad", href: "/privacidad" },
              { label: "Cookies", href: "/cookies" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-white/50 transition-colors duration-150 hover:text-white/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
