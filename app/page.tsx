// ─── app/page.tsx ─────────────────────────────────────────────────────────────
// Home page — the carousel now lives inside LayoutHeader.
// Server Component (default in App Router).
// ──────────────────────────────────────────────────────────────────────────────

import CategorySection from "@/components/CategorySection";
import CatalogLayout from "@/components/CatalogLayout";

export default function HomePage() {
  return (
    <main id="main-content" className="flex-1 bg-zinc-50">
      {/* Category strip — just below the header carousel */}
      <div className="bg-white shadow-[0_1px_0_0_#e2e8f0]">
        <CategorySection />
      </div>

      {/* Catalog: filter sidebar + media banner + product grid */}
      <CatalogLayout />
    </main>
  );
}
