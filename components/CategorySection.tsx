// ─── CategorySection.tsx ──────────────────────────────────────────────────────
// Horizontal-scrollable row of stylised category chips on mobile,
// auto-fill grid on md+. Server Component.
// ──────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import type { Category } from "@/components/types/product";
import { CATEGORIES } from "@/lib/data";

// ──── Single category card ─────────────────────────────────────────────────────
function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={category.href}
      className={`
        group flex flex-shrink-0 flex-col items-center gap-3 rounded-2xl px-5 py-4
        transition-all duration-200
        ${category.color}
        hover:scale-105 hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400
      `}
      aria-label={`Ver categoría ${category.label}`}
    >
      {/* Icon container */}
      <div
        className={`
          flex size-14 items-center justify-center rounded-xl text-2xl
          shadow-sm ring-1 ring-white/80 transition-transform duration-200
          group-hover:scale-110
          bg-white
        `}
        aria-hidden="true"
      >
        {category.icon}
      </div>

      {/* Label */}
      <span
        className={`text-center text-[11px] font-semibold leading-tight tracking-wide ${category.accentColor}`}
      >
        {category.label}
      </span>
    </Link>
  );
}

// ──── Section skeleton (used as loading.tsx or Suspense fallback) ─────────────
export function CategorySectionSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 h-6 w-40 animate-pulse rounded-lg bg-zinc-200" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="size-24 flex-shrink-0 animate-pulse rounded-2xl bg-zinc-100"
          />
        ))}
      </div>
    </section>
  );
}

// ──── Main component ───────────────────────────────────────────────────────────
export default function CategorySection() {
  return (
    <section aria-labelledby="categories-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2
              id="categories-heading"
              className="text-xl font-bold text-zinc-900 sm:text-2xl"
            >
              Explorar categorías
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Todo lo que necesitás, organizado para vos
            </p>
          </div>
          <Link
            href="/categorias"
            className="hidden text-sm font-semibold text-red-600 transition-colors hover:text-red-700 sm:block"
          >
            Ver todas →
          </Link>
        </div>

        {/*
         * Mobile: horizontal scroll (no duplicate elements for desktop).
         * md+: auto-fill grid. A single DOM tree handles both.
         */}
        <div
          className="
            -mx-4 flex gap-3 overflow-x-auto px-4 pb-3
            scrollbar-none
            sm:-mx-6 sm:px-6
            md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0
            lg:grid-cols-10
          "
          role="list"
          aria-label="Categorías de productos"
        >
          {(CATEGORIES as Category[]).map((cat) => (
            <div key={cat.id} role="listitem">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>

        {/* Mobile "Ver todas" link */}
        <div className="mt-4 flex justify-center sm:hidden">
          <Link
            href="/categorias"
            className="text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
          >
            Ver todas las categorías →
          </Link>
        </div>
      </div>
    </section>
  );
}
