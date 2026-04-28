import { resolveImage } from "./productImages";

export type Category = "fruits" | "legumes" | "habits" | "artisanat";

export type Product = {
  id: string;
  name: string;
  nameWolof?: string;
  category: Category;
  price: number; // en FCFA
  unit: string;
  stock: number;
  vendor: string;
  image: string;
  description: string;
  imageKey?: string | null;
};

export const categories: { id: Category; label: string; wolof: string; emoji: string }[] = [
  { id: "fruits", label: "Fruits", wolof: "Meññeef", emoji: "🥭" },
  { id: "legumes", label: "Légumes", wolof: "Reseñ", emoji: "🥬" },
  { id: "habits", label: "Habits", wolof: "Yére", emoji: "👗" },
  { id: "artisanat", label: "Artisanat", wolof: "Liggéey loxo", emoji: "🧺" },
];

// DB row -> Product
export type ProductRow = {
  id: string;
  name: string;
  name_wolof: string | null;
  category: string;
  price: number;
  unit: string | null;
  image: string | null;
  stock: number;
  vendor: string | null;
  description: string | null;
};

export const mapProduct = (r: ProductRow): Product => ({
  id: r.id,
  name: r.name,
  nameWolof: r.name_wolof || undefined,
  category: (r.category as Category) || "fruits",
  price: r.price,
  unit: r.unit || "",
  stock: r.stock,
  vendor: r.vendor || "",
  description: r.description || "",
  image: resolveImage(r.image),
  imageKey: r.image,
});

export const formatFCFA = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
