"use client";
// ─── components/CategoryPageClient.tsx ───────────────────────────────────────
// UI de la página de categoría: breadcrumb, heading y grid de productos.
// Reutiliza la misma lógica de tarjetas que CatalogLayout para consistencia.
// ──────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/components/types/product";
import type { Category } from "@/components/types/product";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/components/ToastProvider";

function formatPrice(n: number) {
  return `Bs ${n.toFixed(2)}`;
}

const BADGE_STYLES: Record<string, string> = {
  "Nuevo":       "bg-emerald-500 text-white",
  "Oferta":      "bg-red-500 text-white",
  "Fit & Light": "bg-sky-500 text-white",
  "Fresco":      "bg-lime-500 text-white",
};

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({ category }: { category: Category }) {
  return (
    <nav aria-label="Miga de pan" className="mb-5 flex items-center gap-1.5 text-xs text-slate-500">
      <Link href="/" className="transition-colors hover:text-orange-500">Inicio</Link>
      <svg className="size-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      </svg>
      <span className="font-medium text-slate-800" aria-current="page">{category.label}</span>
    </nav>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const [busy, setBusy] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAdd = async () => {
    if (busy || !product.inStock) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 300));
    addItem(product);
    showToast(`${product.name} agregado al carrito`, "success");
    setBusy(false);
  };

  const badgeText = product.isNew ? "Nuevo" : product.badge ?? null;
  const badgeStyle = badgeText ? (BADGE_STYLES[badgeText] ?? "bg-slate-700 text-white") : null;

  return (
    <article
      aria-label={product.name}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-slate-100 transition-all duration-200 hover:shadow-md hover:ring-slate-200"
    >
      <Link href={`/productos/${product.slug}`} tabIndex={-1} aria-label={`Ver detalle de ${product.name}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
          {badgeText && !product.discountPercent && (
            <div className={`absolute left-2 top-2 z-10 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${badgeStyle}`}>
              {badgeText}
            </div>
          )}
          {product.discountPercent && (
            <div className="absolute right-2 top-2 z-10 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              -{product.discountPercent}%
            </div>
          )}
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
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{product.brand}</span>
        <Link href={`/productos/${product.slug}`}>
          <h3 className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-xs font-semibold leading-snug text-slate-800 transition-colors hover:text-orange-600 sm:text-sm">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex min-h-[2rem] items-end gap-1.5">
          <span className="text-sm font-extrabold text-slate-900 sm:text-base">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {product.inStock ? (
          <button
            onClick={handleAdd}
            disabled={busy}
            aria-label={`Agregar ${product.name}`}
            className="mt-auto h-8 w-full rounded bg-slate-200 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-orange-500 hover:text-white active:scale-95 disabled:cursor-wait disabled:opacity-60"
          >
            {busy ? "…" : "Agregar"}
          </button>
        ) : (
          <div className="mt-auto flex h-8 items-center justify-center rounded border border-slate-200 text-xs font-medium text-slate-400">
            Sin stock
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface Props {
  category: Category;
  products: Product[];
}

export default function CategoryPageClient({ category, products }: Props) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb category={category} />

      {/* Heading de la categoría */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{category.label}</h1>
          <p className="text-sm text-slate-500">
            {products.length} producto{products.length !== 1 ? "s" : ""} disponible{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white py-20 text-center">
          <span className="text-5xl">{category.icon}</span>
          <p className="text-base font-semibold text-slate-600">
            Próximamente productos en {category.label}
          </p>
          <p className="text-sm text-slate-400">Visitá otras categorías mientras tanto.</p>
          <Link
            href="/"
            className="mt-3 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
          >
            Volver al inicio
          </Link>
        </div>
      ) : (
        <ul
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5"
          role="list"
          aria-label={`Productos de ${category.label}`}
        >
          {products.map((p) => (
            <li key={p.id} role="listitem" className="h-full">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
