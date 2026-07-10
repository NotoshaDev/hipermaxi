"use client";
// ─── LayoutHeader.tsx ──────────────────────────────────────────────────────────
// Mockup 1 — sticky global header consisting of three layers:
//   1. Top bar  : Logo · Search · Branch selector · Auth + Cart button
//   2. Sub-nav  : Horizontal category navigation
//   3. Carousel : Full-width promo banner with arrows + dot indicators
//
// "use client" for carousel state + mobile-menu toggle + cart counter.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavCategory {
  id: string;
  label: string;
  href: string;
}

interface CarouselSlide {
  id: string;
  src: string;
  alt: string;
  headline: string;
  cta: string;
  ctaHref: string;
}

// ─── Static data (swap for API/CMS in production) ─────────────────────────────

const NAV_CATEGORIES: NavCategory[] = [
  { id: "abarrotes", label: "Abarrotes", href: "/categoria/abarrotes" },
  { id: "bebidas", label: "Bebidas", href: "/categoria/bebidas" },
  { id: "carnes", label: "Carnes y Aves", href: "/categoria/carnes" },
  { id: "lacteos", label: "Lácteos", href: "/categoria/lacteos" },
  { id: "frutas", label: "Frutas y Verduras", href: "/categoria/frutas-verduras" },
  { id: "panaderia", label: "Panadería", href: "/categoria/panaderia" },
  { id: "limpieza", label: "Limpieza", href: "/categoria/limpieza" },
  { id: "mascotas", label: "Mascotas", href: "/categoria/mascotas" },
  { id: "farmacia", label: "Farmacia", href: "/categoria/farmacia" },
];

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: "slide-1",
    src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=600&fit=crop&q=75",
    alt: "Pasillos luminosos de Hipermaxi con productos frescos",
    headline: "Frescura y calidad local, cada día.",
    cta: "Ver ofertas",
    ctaHref: "/ofertas",
  },
  {
    id: "slide-2",
    src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&h=600&fit=crop&q=75",
    alt: "Sección de frutas y verduras frescas",
    headline: "Lo mejor del campo directo a tu mesa.",
    cta: "Explorar",
    ctaHref: "/categoria/frutas-verduras",
  },
  {
    id: "slide-3",
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=600&fit=crop&q=75",
    alt: "Sección de carnicería y charcutería",
    headline: "Cortes selectos, calidad garantizada.",
    cta: "Ver carnes",
    ctaHref: "/categoria/carnes",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Magnifying-glass icon */
function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path strokeLinecap="round" d="M15.5 15.5L20 20" />
    </svg>
  );
}

/** Map-pin icon for branch selector */
function IconMapPin({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"
      />
      <circle cx="12" cy="8" r="2" />
    </svg>
  );
}

/** Shopping-cart icon */
function IconCart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8l-1 5h11m-9-2a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
      />
    </svg>
  );
}

/** Chevron-left arrow */
function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

/** Chevron-right arrow */
function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

function HeaderCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = CAROUSEL_SLIDES.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-play every 5 s, paused on hover
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, next]);

  return (
    <div
      className="relative w-full overflow-hidden bg-zinc-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrusel"
      aria-label="Banners promocionales Hipermaxi"
    >
      {/* ── Slides track ── */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {CAROUSEL_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="relative min-w-full"
            aria-hidden={i !== current}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`Diapositiva ${i + 1} de ${total}`}
          >
            {/* Slide image */}
            <div className="relative h-[220px] w-full sm:h-[300px] lg:h-[380px]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover"
                quality={75}
                loading={i === 0 ? "eager" : "lazy"}
                preload={i === 0}
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Slide copy */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                <p className="max-w-sm text-xl font-bold leading-snug text-white drop-shadow sm:text-2xl lg:text-3xl">
                  {slide.headline}
                </p>
                <Link
                  href={slide.ctaHref}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-600 active:scale-95"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Arrow buttons ── */}
      <button
        onClick={prev}
        aria-label="Diapositiva anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white ring-1 ring-white/30 transition-all duration-150 hover:bg-white/40 active:scale-90 lg:left-5 lg:size-10"
      >
        <IconChevronLeft className="size-5" />
      </button>
      <button
        onClick={next}
        aria-label="Siguiente diapositiva"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white ring-1 ring-white/30 transition-all duration-150 hover:bg-white/40 active:scale-90 lg:right-5 lg:size-10"
      >
        <IconChevronRight className="size-5" />
      </button>

      {/* ── Dot indicators ── */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2"
        role="tablist"
        aria-label="Seleccionar diapositiva"
      >
        {CAROUSEL_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ir a diapositiva ${i + 1}`}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-white"
                : "size-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Category sub-nav ─────────────────────────────────────────────────────────

function CategorySubNav({ mobileOpen }: { mobileOpen: boolean }) {
  return (
    <nav
      aria-label="Categorías principales"
      className={`border-b border-slate-100 bg-white ${
        mobileOpen ? "block" : "hidden lg:block"
      }`}
    >
      <ul
        className="mx-auto flex max-w-7xl items-center gap-0 overflow-x-auto px-4 sm:px-6 lg:px-8"
        style={{ scrollbarWidth: "none" }}
      >
        {NAV_CATEGORIES.map((cat) => (
          <li key={cat.id} className="flex-shrink-0">
            <Link
              href={cat.href}
              className="relative flex items-center px-3.5 py-3.5 text-sm font-medium text-slate-600 transition-all duration-150 hover:text-orange-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Main LayoutHeader ─────────────────────────────────────────────────────────

export default function LayoutHeader() {
  const [cartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex flex-col shadow-[0_1px_16px_rgba(0,0,0,0.07)]">
      {/* ══ 1. Top bar ══════════════════════════════════════════════════════════ */}
      <div className="bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">

          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="Hipermaxi — Inicio"
            className="flex-shrink-0"
          >
            {/* Logotype wordmark (replace with real <Image> when asset is available) */}
            <div className="flex h-9 items-center gap-1.5" aria-hidden="false">
              <div className="flex size-9 items-center justify-center rounded-lg bg-orange-500">
                <span className="text-lg font-black leading-none text-white tracking-tight">
                  H
                </span>
              </div>
              <span className="hidden text-lg font-extrabold tracking-tight text-slate-800 sm:block">
                hipermaxi
              </span>
            </div>
          </Link>

          {/* ── Search ── (grows to fill available space) */}
          <div className="relative flex-1">
            <label htmlFor="site-search" className="sr-only">
              Buscar productos
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <IconSearch className="size-4 text-slate-400" />
            </div>
            <input
              id="site-search"
              type="search"
              autoComplete="off"
              placeholder="Buscar productos, marcas o categorías…"
              className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-150 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>

          {/* ── Branch selector ── */}
          <button
            type="button"
            aria-label="Seleccionar sucursal"
            className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all duration-150 hover:border-orange-300 hover:text-orange-600 sm:flex"
          >
            <IconMapPin className="size-3.5 text-orange-500" />
            <span className="max-w-[140px] truncate">Juan de la Rosa</span>
            <svg
              className="size-3 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* ── Auth + Cart button ── */}
          <div className="flex flex-shrink-0 items-center gap-2">
            {/* Auth — hidden on smallest screens */}
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 sm:flex"
            >
              <svg
                className="size-3.5 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              Iniciar sesión
            </Link>

            {/* Cart */}
            <Link
              href="/carrito"
              aria-label={`Carrito — ${cartCount} artículos`}
              className="relative flex size-10 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm transition-all duration-150 hover:bg-orange-600 active:scale-95"
            >
              <IconCart className="size-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 flex min-w-[18px] items-center justify-center rounded-full bg-slate-900 px-1 py-px text-[10px] font-bold leading-none text-white"
                  aria-live="polite"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all duration-150 hover:bg-slate-50 lg:hidden"
            >
              {mobileMenuOpen ? (
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ══ 2. Category sub-nav ════════════════════════════════════════════════ */}
      <CategorySubNav mobileOpen={mobileMenuOpen} />

      {/* ══ 3. Carousel ═══════════════════════════════════════════════════════ */}
      <HeaderCarousel />
    </header>
  );
}
