// ─── ProductFeed.tsx ──────────────────────────────────────────────────────────
// Renders one or more named product sections ("Los más vendidos", "Fit & Light").
// Server Component — each section lazily renders its card grid via
// <Suspense> boundaries so above-the-fold content is never blocked.
// ──────────────────────────────────────────────────────────────────────────────

import { Suspense } from "react";
import Link from "next/link";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import type { ProductSection } from "@/components/types/product";
import { PRODUCT_SECTIONS } from "@/lib/data";

// ──── Section-level skeleton (shown during streaming SSR / lazy hydration) ─────
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ──── Section header with optional "Ver todos" link ────────────────────────────
function SectionHeader({
  title,
  subtitle,
  viewAllHref,
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        ) : null}
      </div>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="flex-shrink-0 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
          aria-label={`Ver todos en ${title}`}
        >
          Ver todos →
        </Link>
      ) : null}
    </div>
  );
}

// ──── Responsive product grid ──────────────────────────────────────────────────
function ProductGrid({ section }: { section: ProductSection }) {
  return (
    <>
      <SectionHeader
        title={section.title}
        subtitle={section.subtitle}
        viewAllHref={section.viewAllHref}
      />

      {/*
       * 2 cols on mobile → 3 on sm → 4 on lg → 5 on xl
       * Single layout — no hidden/visible duplicates.
       */}
      <ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5"
        aria-label={section.title}
        role="list"
      >
        {section.products.map((product) => (
          <li key={product.id} role="listitem">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}

// ──── Main ProductFeed ─────────────────────────────────────────────────────────
export default function ProductFeed() {
  return (
    <div className="space-y-16">
      {(PRODUCT_SECTIONS as ProductSection[]).map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`section-heading-${section.id}`}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {/*
           * Only the first section is rendered eagerly (it's likely above the fold).
           * All subsequent sections are wrapped in <Suspense> so they can stream in
           * without blocking the initial paint. Replace the static data call with
           * your server fetch inside the Suspense boundary for true streaming SSR.
           */}
          {index === 0 ? (
            <ProductGrid section={section} />
          ) : (
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid section={section} />
            </Suspense>
          )}
        </section>
      ))}
    </div>
  );
}
