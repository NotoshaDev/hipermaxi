// ─── HeroBanner.tsx ───────────────────────────────────────────────────────────
// Replaces the old heavy carousel with a single, well-optimised asymmetric hero.
// Server Component — no "use client" needed.
// ──────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";

// ──── Pill / chip for the eyebrow label ────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-600 ring-1 ring-red-100">
      <span className="size-1.5 rounded-full bg-red-500" aria-hidden="true" />
      {children}
    </span>
  );
}

// ──── Floating stat badge used in the visual cluster ──────────────────────────
function StatBadge({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute flex flex-col items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-zinc-100 ${className}`}
    >
      <span className="text-xl font-bold leading-none text-zinc-900">
        {value}
      </span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
        {label}
      </span>
    </div>
  );
}

// ──── Main component ───────────────────────────────────────────────────────────
export default function HeroBanner() {
  return (
    <section
      aria-label="Bienvenida a Hipermaxi Juan de la Rosa"
      className="relative overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-red-50/30"
    >
      {/* Subtle background decoration */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 size-80 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        {/* ── LEFT: Copy & CTA ── */}
        <div className="flex flex-col justify-center">
          <Eyebrow>Juan de la Rosa · Cochabamba</Eyebrow>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Frescura y{" "}
            <span className="relative whitespace-nowrap text-red-600">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-red-300/50"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 9.395C156.412 43.364 111.458 52.15 91.05 52.805c-10.329.34-11.345-.406-11.345-2.97 0-4.019 6.073-6.217 24.882-10.748l-.048-.068" />
              </svg>
              calidad local,
            </span>{" "}
            cada día.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-500">
            En Hipermaxi Juan de la Rosa encontrás todo lo que necesitás a un
            solo paso — con precios que cuidan tu bolsillo y productos frescos
            seleccionados para Cochabamba.
          </p>

          {/* Feature pills */}
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Ventajas">
            {[
              "🛒 Click & Recoge",
              "🚚 Envío a domicilio",
              "❄️ Cadena de frío",
              "💊 Farmacia en local",
            ].map((f) => (
              <li
                key={f}
                className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200"
              >
                {f}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all duration-200 hover:bg-red-700 hover:shadow-lg hover:shadow-red-200 active:scale-95"
            >
              Ver productos
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href="/ofertas"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zinc-800 shadow-sm ring-1 ring-zinc-200 transition-all duration-200 hover:bg-zinc-50 hover:ring-zinc-300 active:scale-95"
            >
              Ver ofertas
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Visual cluster ── */}
        <div className="relative flex items-center justify-center lg:justify-end">
          {/* Main hero image */}
          <div className="relative h-[420px] w-full max-w-[520px] overflow-hidden rounded-3xl shadow-2xl shadow-zinc-300/60 sm:h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1040&h=960&fit=crop&q=75"
              alt="Pasillos luminosos y surtidos del supermercado Hipermaxi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              /* Above the fold → eager load + preload link in <head> */
              loading="eager"
              preload
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Floating stat badges */}
          <StatBadge
            value="900+"
            label="Productos"
            className="-left-6 top-12 sm:-left-10"
          />
          <StatBadge
            value="Bs 0"
            label="Envío mín."
            className="-right-4 bottom-24 sm:-right-8"
          />

          {/* Small accent image */}
          <div className="absolute bottom-4 left-4 hidden size-28 overflow-hidden rounded-2xl shadow-xl ring-4 ring-white sm:block md:size-32">
            <Image
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=256&h=256&fit=crop&q=75"
              alt="Productos frescos y coloridos"
              fill
              sizes="128px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
