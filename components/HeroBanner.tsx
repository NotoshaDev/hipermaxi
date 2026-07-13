"use client";
// ─── HeroBanner.tsx ───────────────────────────────────────────────────────────
// Carrusel promocional — dentro del contenedor central (max-w-7xl).
// El banner NO es full-width: respeta los bordes laterales del contenedor.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CarouselSlide {
  id: string;
  src: string;
  alt: string;
  headline: string;
  cta: string;
  ctaHref: string;
}

// ─── Static slides ────────────────────────────────────────────────────────────

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

// ─── Arrow icons ──────────────────────────────────────────────────────────────

function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroBanner() {
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

  // Auto-play cada 5 s, pausado al hacer hover
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, next]);

  return (
    /*
     * RESTRICCIÓN CRÍTICA: El carrusel vive DENTRO del contenedor central.
     * max-w-7xl + mx-auto + px-4/6/8 garantizan que se alinee con el header
     * y el contenido inferior. NO usa w-screen ni -mx extendido.
     */
    <section
      aria-label="Banners promocionales Hipermaxi"
      className="bg-zinc-100 py-4"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Carrusel contenido — overflow-hidden recorta slides fuera de vista */}
        <div
          className="relative overflow-hidden rounded-2xl bg-zinc-900 shadow-md"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carrusel"
        >
          {/* ── Track de slides ── */}
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
                {/* Imagen del slide */}
                <div className="relative h-[220px] w-full sm:h-[300px] lg:h-[380px]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover"
                    quality={75}
                    loading={i === 0 ? "eager" : "lazy"}
                    preload={i === 0}
                  />
                  {/* Gradiente oscuro */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Texto del slide */}
                <div className="absolute inset-0 flex items-center px-8 lg:px-12">
                  <div>
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

          {/* ── Flechas de navegación ── */}
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

          {/* ── Indicadores de puntos ── */}
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
      </div>
    </section>
  );
}
