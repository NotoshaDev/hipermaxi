"use client";
// ─── CatalogLayout.tsx ────────────────────────────────────────────────────────
// Mockup 2 & 3 — Two-column catalog layout:
//   Left  : Filter sidebar (Categories + Price range)
//   Right : Media banner + Responsive product grid
//
// "use client" for:
//   • Mobile sidebar drawer (open/close state)
//   • Price range filter (controlled input)
//   • Active category state
// ──────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/components/types/product";
import { CATEGORIES, PRODUCT_SECTIONS } from "@/lib/data";

// ─── Utility ──────────────────────────────────────────────────────────────────

function formatPrice(n: number) {
  return `Bs ${n.toFixed(2)}`;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconFilter({ className }: { className?: string }) {
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
        d="M3 4.5h18M6 12h12M10 19.5h4"
      />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  priceMax: number;
  onPriceChange: (value: number) => void;
  PRICE_CEILING: number;
}

function FilterSidebar({
  activeCategory,
  onCategoryChange,
  priceMax,
  onPriceChange,
  PRICE_CEILING,
}: SidebarProps) {
  return (
    <aside
      aria-label="Filtros de búsqueda"
      className="flex flex-col gap-8"
    >
      {/* ── Categories ── */}
      <section aria-labelledby="filter-categories-heading">
        <h3
          id="filter-categories-heading"
          className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400"
        >
          Categorías
        </h3>
        <ul className="flex flex-col gap-0.5">
          {/* "Todos" pseudo-category */}
          <li>
            <button
              onClick={() => onCategoryChange("all")}
              className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                activeCategory === "all"
                  ? "bg-orange-50 text-orange-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
              aria-pressed={activeCategory === "all"}
            >
              <span>Todos los productos</span>
              <IconChevronRight
                className={`size-3.5 transition-colors duration-150 ${
                  activeCategory === "all"
                    ? "text-orange-400"
                    : "text-slate-300 group-hover:text-slate-400"
                }`}
              />
            </button>
          </li>

          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryChange(cat.id)}
                className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  activeCategory === cat.id
                    ? "bg-orange-50 text-orange-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                aria-pressed={activeCategory === cat.id}
              >
                <span>{cat.label}</span>
                <IconChevronRight
                  className={`size-3.5 transition-colors duration-150 ${
                    activeCategory === cat.id
                      ? "text-orange-400"
                      : "text-slate-300 group-hover:text-slate-400"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Price filter ── */}
      <section aria-labelledby="filter-price-heading">
        <h3
          id="filter-price-heading"
          className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400"
        >
          Precio máximo
        </h3>

        {/* Range slider */}
        <div className="px-1">
          <input
            id="price-range"
            type="range"
            min={0}
            max={PRICE_CEILING}
            step={5}
            value={priceMax}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            aria-label={`Precio máximo: ${formatPrice(priceMax)}`}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-orange-500"
          />
        </div>

        {/* Price display */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">{formatPrice(0)}</span>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700">
            {formatPrice(priceMax)}
          </span>
          <span className="text-xs text-slate-400">{formatPrice(PRICE_CEILING)}</span>
        </div>

        <button
          onClick={() => onPriceChange(PRICE_CEILING)}
          className="mt-3 text-xs font-medium text-slate-400 underline-offset-2 hover:text-orange-600 hover:underline"
        >
          Restablecer
        </button>
      </section>
    </aside>
  );
}

// ─── Media Banner (skeleton while image loads) ────────────────────────────────

function MediaBanner() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
      {/* Skeleton shown until image loads */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-slate-200"
          aria-hidden="true"
        >
          <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
            <svg
              className="size-10 opacity-40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
              />
            </svg>
            <span className="text-xs font-medium">Cargando promoción…</span>
          </div>
        </div>
      )}

      <Image
        src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=675&fit=crop&q=75"
        alt="Promoción especial Hipermaxi Juan de la Rosa"
        fill
        sizes="(max-width: 1024px) 100vw, 75vw"
        className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />

      {/* Overlay copy */}
      {loaded && (
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-300">
              Oferta de la semana
            </p>
            <p className="mt-1 text-lg font-bold text-white sm:text-xl">
              Hasta 30 % de descuento en productos seleccionados.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Inline compact ProductCard for the catalog grid ─────────────────────────
// Lighter version: no badge overlay, no hover-lift — optimised for dense grids.

interface CatalogCardProps {
  product: Product;
}

function CatalogCard({ product }: CatalogCardProps) {
  const [added, setAdded] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleAdd = async () => {
    if (busy || added || !product.inStock) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    setBusy(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article
      aria-label={product.name}
      className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-slate-100 transition-all duration-200 hover:shadow-md hover:ring-slate-200"
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        {product.discountPercent ? (
          <div
            className="absolute right-2 top-2 z-10 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white"
            aria-label={`${product.discountPercent}% de descuento`}
          >
            -{product.discountPercent}%
          </div>
        ) : null}
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          quality={75}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {product.brand}
        </span>
        <h3 className="mt-0.5 line-clamp-2 flex-1 text-xs font-semibold leading-snug text-slate-800 sm:text-sm">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="mt-2 flex items-end gap-1.5">
          <span className="text-sm font-extrabold text-slate-900 sm:text-base">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice ? (
            <span className="text-[11px] text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          ) : null}
        </div>

        {/* CTA — full width, flat */}
        {product.inStock ? (
          <button
            onClick={handleAdd}
            disabled={busy}
            aria-label={added ? "Producto agregado al carrito" : `Agregar ${product.name}`}
            className={`mt-3 h-8 w-full rounded-lg text-xs font-semibold transition-all duration-200 active:scale-95 disabled:cursor-wait ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-slate-900 text-white hover:bg-orange-500"
            }`}
          >
            {added ? "Agregado ✓" : busy ? "…" : "Agregar"}
          </button>
        ) : (
          <div className="mt-3 flex h-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-medium text-slate-400">
            Sin stock
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Product Grid ─────────────────────────────────────────────────────────────

function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center gap-3 py-20 text-center">
        <svg
          className="size-12 text-slate-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="text-sm font-medium text-slate-500">
          No encontramos productos con esos filtros.
        </p>
        <p className="text-xs text-slate-400">Intentá ajustar el precio o la categoría.</p>
      </div>
    );
  }

  return (
    <ul
      className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5"
      aria-label="Catálogo de productos"
      role="list"
    >
      {products.map((p) => (
        <li key={p.id} role="listitem">
          <CatalogCard product={p} />
        </li>
      ))}
    </ul>
  );
}

// ─── Mobile sidebar drawer overlay ────────────────────────────────────────────

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function SidebarDrawer({ open, onClose, children }: DrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
        className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-white px-5 py-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">Filtros</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar filtros"
            className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <IconClose className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}

// ─── Main CatalogLayout ───────────────────────────────────────────────────────

const PRICE_CEILING = 300;
const ALL_PRODUCTS = [
  ...PRODUCT_SECTIONS[0].products,
  ...PRODUCT_SECTIONS[1].products,
];

export default function CatalogLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceMax, setPriceMax] = useState(PRICE_CEILING);

  // Filter logic (pure, no memoization needed for small datasets)
  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    const categoryMatch =
      activeCategory === "all" || p.category === activeCategory;
    const priceMatch = p.price <= priceMax;
    return categoryMatch && priceMatch;
  });

  const sidebarProps: SidebarProps = {
    activeCategory,
    onCategoryChange: (id) => {
      setActiveCategory(id);
      setDrawerOpen(false);
    },
    priceMax,
    onPriceChange: setPriceMax,
    PRICE_CEILING,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* ── Mobile filter toggle ── */}
      <div className="mb-5 flex items-center justify-between lg:hidden">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Lo más vendido en Cochabamba
          </h2>
          <p className="text-sm text-slate-500">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Abrir filtros"
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 transition-all duration-150 hover:border-slate-300 hover:bg-slate-50"
        >
          <IconFilter className="size-4" />
          Filtros
        </button>
      </div>

      {/* ── Mobile sidebar drawer ── */}
      <SidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FilterSidebar {...sidebarProps} />
      </SidebarDrawer>

      {/* ── Main two-column grid ── */}
      <div className="flex gap-8">

        {/* Left — Filter sidebar (desktop only) */}
        <aside
          className="hidden w-56 flex-shrink-0 lg:block"
          aria-label="Panel de filtros"
        >
          {/* Sticky panel */}
          <div className="sticky top-[73px] rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <FilterSidebar {...sidebarProps} />
          </div>
        </aside>

        {/* Right — Dynamic content */}
        <main
          id="catalog-main"
          className="min-w-0 flex-1"
          aria-label="Catálogo de productos"
        >
          {/* Desktop section header */}
          <div className="mb-5 hidden items-end justify-between lg:flex">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Lo más vendido en Cochabamba
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}{" "}
                {activeCategory !== "all" && (
                  <span>
                    en{" "}
                    <span className="font-semibold text-orange-600">
                      {CATEGORIES.find((c) => c.id === activeCategory)?.label ?? activeCategory}
                    </span>
                  </span>
                )}
              </p>
            </div>
            <Link
              href="/mas-vendidos"
              className="text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600"
            >
              Ver todos →
            </Link>
          </div>

          {/* Media banner */}
          <div className="mb-7">
            <MediaBanner />
          </div>

          {/* Product grid */}
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
}
