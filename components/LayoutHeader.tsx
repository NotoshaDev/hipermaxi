"use client";
// ─── LayoutHeader.tsx ──────────────────────────────────────────────────────────
// Wireframe fidelity — header con exactamente 2 filas:
//   1. Top bar  : Logo · Search · Sucursal · Iniciar Sesión/Carrito
//   2. Sub-nav  : Barra blanca con links de categorías
//
// El carrusel fue movido a HeroBanner.tsx (en el body, dentro del contenedor).
// ──────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavCategory {
  id: string;
  label: string;
  href: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const NAV_CATEGORIES: NavCategory[] = [
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

// ─── Main LayoutHeader ─────────────────────────────────────────────────────────

export default function LayoutHeader() {
  const [cartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex flex-col shadow-[0_1px_16px_rgba(0,0,0,0.07)]">

      {/* ══ FILA 1: Top bar ══════════════════════════════════════════════════ */}
      <div className="bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">

          {/* ── Logo ── */}
          <Link href="/" aria-label="Hipermaxi — Inicio" className="flex-shrink-0">
            <div className="flex h-9 items-center gap-1.5">
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-slate-300 bg-white">
                <span className="text-sm font-black leading-none text-slate-700 tracking-tight">Logo</span>
              </div>
              <span className="hidden text-lg font-extrabold tracking-tight text-slate-800 sm:block">
                hipermaxi
              </span>
            </div>
          </Link>

          {/* ── Buscador (crece para llenar el espacio disponible) ── */}
          <div className="relative flex-1">
            <label htmlFor="site-search" className="sr-only">Buscar productos</label>
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <IconSearch className="size-4 text-slate-400" />
            </div>
            <input
              id="site-search"
              type="search"
              autoComplete="off"
              placeholder="Buscar productos, marcas o categorías…"
              className="h-10 w-full rounded border border-slate-300 bg-white pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-150 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>

          {/* ── Botón ovalado "Sucursal" ── */}
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

          {/* ── Iniciar Sesión + Carrito ── */}
          <div className="flex flex-shrink-0 items-center gap-2">
            {/* Iniciar sesión */}
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded border border-slate-800 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white transition-all duration-150 hover:bg-slate-700 sm:flex"
            >
              Iniciar Sesion/Carrito
              <IconCart className="size-3.5 text-white" />
            </Link>

            {/* Cart — móvil únicamente */}
            <Link
              href="/carrito"
              aria-label={`Carrito — ${cartCount} artículos`}
              className="relative flex size-10 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm transition-all duration-150 hover:bg-orange-600 active:scale-95 sm:hidden"
            >
              <IconCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex min-w-[18px] items-center justify-center rounded-full bg-slate-900 px-1 py-px text-[10px] font-bold leading-none text-white" aria-live="polite">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

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
  );
}
