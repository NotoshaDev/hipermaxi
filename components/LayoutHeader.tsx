"use client";
// ─── LayoutHeader.tsx ──────────────────────────────────────────────────────────
// Header con:
//   1. Top bar  : Logo · Buscador funcional (live search) · Sucursal · Auth+Carrito
//   2. Sub-nav  : Barra blanca de categorías
// Conectado al CartContext para mostrar el contador real.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";
import { PRODUCT_SECTIONS } from "@/lib/data";
import type { Product } from "@/components/types/product";

// ─── Todos los productos (para búsqueda) ─────────────────────────────────────

const ALL_PRODUCTS: Product[] = PRODUCT_SECTIONS.flatMap((s) => s.products);

// ─── Nav categories ───────────────────────────────────────────────────────────

const NAV_CATEGORIES = [
  { id: "abarrotes",  label: "Abarrotes",         href: "/categoria/abarrotes" },
  { id: "bebidas",    label: "Bebidas",            href: "/categoria/bebidas" },
  { id: "carnes",     label: "Carnes y Aves",      href: "/categoria/carnes" },
  { id: "lacteos",    label: "Lácteos",            href: "/categoria/lacteos" },
  { id: "frutas",     label: "Frutas y Verduras",  href: "/categoria/frutas-verduras" },
  { id: "panaderia",  label: "Panadería",          href: "/categoria/panaderia" },
  { id: "limpieza",   label: "Limpieza",           href: "/categoria/limpieza" },
  { id: "mascotas",   label: "Mascotas",           href: "/categoria/mascotas" },
  { id: "farmacia",   label: "Farmacia",           href: "/categoria/farmacia" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path strokeLinecap="round" d="M15.5 15.5L20 20" />
    </svg>
  );
}

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
      <circle cx="12" cy="8" r="2" />
    </svg>
  );
}

function IconCart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8l-1 5h11m-9-2a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
    </svg>
  );
}

// ─── Live Search Dropdown ─────────────────────────────────────────────────────

function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const filtered = ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 6);
    setResults(filtered);
    setOpen(filtered.length > 0);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <label htmlFor="site-search" className="sr-only">Buscar productos</label>
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <IconSearch className="size-4 text-slate-400" />
      </div>
      <input
        id="site-search"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="Buscar productos, marcas o categorías…"
        className="h-10 w-full rounded border border-slate-300 bg-white pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-150 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
      />

      {/* ── Dropdown de resultados ── */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
          <ul role="listbox" aria-label="Resultados de búsqueda">
            {results.map((p) => (
              <li key={p.id} role="option" aria-selected="false">
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-orange-50"
                  onClick={() => {
                    setQuery(p.name);
                    setOpen(false);
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                    <Image
                      src={p.imageUrl}
                      alt={p.imageAlt}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.brand}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-orange-600">
                    Bs {p.price.toFixed(2)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {/* Footer del dropdown */}
          <div className="border-t border-slate-100 px-4 py-2 text-center">
            <button
              className="text-xs font-medium text-orange-500 hover:text-orange-600"
              onClick={() => setOpen(false)}
            >
              Ver todos los resultados para &quot;{query}&quot; →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main LayoutHeader ─────────────────────────────────────────────────────────

export default function LayoutHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 flex flex-col shadow-[0_1px_16px_rgba(0,0,0,0.07)]">

        {/* ══ FILA 1: Top bar ════════════════════════════════════════════════ */}
        <div className="bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">

            {/* Logo */}
            <Link href="/" aria-label="Hipermaxi — Inicio" className="flex-shrink-0">
              <div className="flex h-9 items-center gap-1.5">
                <div className="flex size-9 items-center justify-center rounded-full border-2 border-slate-300 bg-white">
                  <span className="text-sm font-black leading-none text-slate-700">Logo</span>
                </div>
                <span className="hidden text-lg font-extrabold tracking-tight text-slate-800 sm:block">
                  hipermaxi
                </span>
              </div>
            </Link>

            {/* Buscador funcional */}
            <SearchBox />

            {/* Botón ovalado "Sucursal" */}
            <button
              type="button"
              aria-label="Seleccionar sucursal"
              className="hidden items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-all duration-150 hover:border-orange-300 hover:text-orange-600 sm:flex"
            >
              <IconMapPin className="size-3.5 text-orange-500" />
              <span className="max-w-[120px] truncate">Sucursal</span>
              <svg className="size-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Auth + Carrito */}
            <div className="flex flex-shrink-0 items-center gap-2">
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 sm:flex"
              >
                Iniciar sesión
              </Link>

              {/* Botón carrito — abre el drawer */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Carrito — ${totalItems} artículos`}
                className="relative flex items-center gap-2 rounded-lg bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white transition-all duration-150 hover:bg-slate-700 active:scale-95"
              >
                <IconCart className="size-4 text-white" />
                <span className="hidden sm:block">Carrito</span>
                {totalItems > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white" aria-live="polite">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              {/* Hamburger — solo móvil */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileMenuOpen}
                className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all duration-150 hover:bg-slate-50 lg:hidden"
              >
                {mobileMenuOpen ? (
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ══ FILA 2: Sub-nav de categorías ══════════════════════════════════ */}
        <nav
          aria-label="Categorías principales"
          className={`border-b border-slate-100 bg-white ${mobileMenuOpen ? "block" : "hidden lg:block"}`}
        >
          <ul
            className="mx-auto flex max-w-7xl items-center overflow-x-auto px-4 sm:px-6 lg:px-8"
            style={{ scrollbarWidth: "none" }}
          >
            {NAV_CATEGORIES.map((cat) => (
              <li key={cat.id} className="flex-shrink-0">
                <Link
                  href={cat.href}
                  className="relative flex items-center px-4 py-3.5 text-sm font-medium text-slate-700 transition-all duration-150 hover:text-orange-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform after:duration-200 hover:after:scale-x-100"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </header>

      {/* CartDrawer — fuera del header para evitar z-index issues */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
