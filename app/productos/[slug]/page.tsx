// ─── app/productos/[slug]/page.tsx ────────────────────────────────────────────
// Server Component — Página de detalle de producto.
// En Next.js 16 `params` es una Promise, debe ser awaited.
// Usa generateStaticParams para pre-renderizar todos los slugs conocidos.
// ──────────────────────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts, ALL_PRODUCTS } from "@/lib/data";
import ProductDetail from "@/components/ProductDetail";

// ─── generateStaticParams ─────────────────────────────────────────────────────
// Pre-renderiza todas las páginas de producto conocidas en build time.

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

// ─── generateMetadata ─────────────────────────────────────────────────────────
// Metadatos SEO dinámicos por producto.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado | Hipermaxi" };
  }

  const title = `${product.name} — ${product.brand} | Hipermaxi`;
  const description =
    product.description ??
    `Comprá ${product.name} de ${product.brand} en Hipermaxi Juan de la Rosa, Cochabamba. ${product.price > 0 ? `Bs ${product.price.toFixed(2)}` : ""}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.imageUrl, alt: product.imageAlt }],
      locale: "es_BO",
      type: "website",
    },
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // Si el slug no existe → 404
  if (!product) notFound();

  const related = getRelatedProducts(product, 5);

  return (
    <main
      id="main-content"
      className="flex-1 bg-zinc-100"
      aria-label={`Detalle de ${product.name}`}
    >
      <ProductDetail product={product} related={related} />
    </main>
  );
}
