// ──────────────────────────────────────────────
//  Hipermaxi · Shared TypeScript Interfaces
// ──────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  brand: string;
  /** Price in bolivianos, e.g. 12.90 */
  price: number;
  /** Original price before discount (optional) */
  originalPrice?: number;
  /** 0–100 integer, e.g. 20 means 20 % off */
  discountPercent?: number;
  /** Badge label: "Nuevo", "Oferta", "Fit & Light", etc. */
  badge?: string;
  /** Absolute path under /public or a remote URL */
  imageUrl: string;
  imageAlt: string;
  category: string;
  unit?: string; // e.g. "kg", "l", "u"
  isNew?: boolean;
  inStock: boolean;
}

export interface ProductSection {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
  /** Renders a "Ver todos" link pointing to this slug */
  viewAllHref?: string;
}

export interface Category {
  id: string;
  label: string;
  href: string;
  icon: string; // emoji or icon key
  color: string; // Tailwind bg color token (e.g. "bg-emerald-50")
  accentColor: string; // Tailwind text color token (e.g. "text-emerald-600")
}
