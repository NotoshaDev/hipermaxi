// ─── app/page.tsx ─────────────────────────────────────────────────────────────
// Home page — assembles above-the-fold sections in render order.
// Server Component (default in App Router).
// ──────────────────────────────────────────────────────────────────────────────

import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import ProductFeed from "@/components/ProductFeed";

export default function HomePage() {
  return (
    <main id="main-content" className="flex-1 bg-zinc-50">
      {/* 1. Hero Banner — asymmetric, above the fold */}
      <HeroBanner />

      {/* Thin divider */}
      <div className="h-px bg-zinc-100" aria-hidden="true" />

      {/* 2. Category strip */}
      <CategorySection />

      {/* Thin divider */}
      <div className="h-px bg-zinc-100" aria-hidden="true" />

      {/* 3. Product feed — "más vendidos" + "Fit & Light" */}
      <div className="py-12 sm:py-16">
        <ProductFeed />
      </div>
    </main>
  );
}
