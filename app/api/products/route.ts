// ─── app/api/products/route.ts ────────────────────────────────────────────────
// GET /api/products
// Query params aceptados:
//   ?category=lacteos          (filtro por categoría exacta)
//   ?search=pil                (búsqueda por nombre, marca o categoría)
//   ?minPrice=0                (precio mínimo en bolivianos)
//   ?maxPrice=150              (precio máximo en bolivianos)
//
// Responde con { data: Product[], total: number }
// ──────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { ALL_PRODUCTS } from "@/lib/data";
import type { Product } from "@/components/types/product";

export const dynamic = "force-dynamic"; // no cachear — siempre fresh

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const category  = searchParams.get("category")?.trim().toLowerCase() ?? "";
  const search    = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const minPrice  = parseFloat(searchParams.get("minPrice") ?? "0");
  const maxPrice  = parseFloat(searchParams.get("maxPrice") ?? "99999");

  // ── Validación básica ──────────────────────────────────────────────────────
  if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < minPrice) {
    return NextResponse.json(
      { error: "Parámetros de precio inválidos" },
      { status: 400 }
    );
  }

  // ── Filtrado ───────────────────────────────────────────────────────────────
  let filtered: Product[] = ALL_PRODUCTS;

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        (p.description?.toLowerCase().includes(search) ?? false)
    );
  }

  filtered = filtered.filter(
    (p) => p.price >= minPrice && p.price <= maxPrice
  );

  // ── Respuesta ──────────────────────────────────────────────────────────────
  return NextResponse.json(
    {
      data: filtered,
      total: filtered.length,
      filters: { category, search, minPrice, maxPrice },
    },
    {
      status: 200,
      headers: {
        // Permite que el browser cachee 60 s pero revalide en background
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
