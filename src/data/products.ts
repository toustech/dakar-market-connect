import mangues from "@/assets/p-mangues.jpg";
import legumes from "@/assets/p-legumes.jpg";
import boubou from "@/assets/p-boubou.jpg";
import panier from "@/assets/p-panier.jpg";
import sandales from "@/assets/p-sandales.jpg";

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
};

export const categories: { id: Category; label: string; wolof: string; emoji: string }[] = [
  { id: "fruits", label: "Fruits", wolof: "Meññeef", emoji: "🥭" },
  { id: "legumes", label: "Légumes", wolof: "Reseñ", emoji: "🥬" },
  { id: "habits", label: "Habits", wolof: "Yére", emoji: "👗" },
  { id: "artisanat", label: "Artisanat", wolof: "Liggéey loxo", emoji: "🧺" },
];

export const products: Product[] = [
  {
    id: "mangues-kent",
    name: "Mangues Kent",
    nameWolof: "Mango Kent",
    category: "fruits",
    price: 1500,
    unit: "le kg",
    stock: 24,
    vendor: "Fatou — Marché Castors",
    image: mangues,
    description: "Mangues Kent juteuses et sucrées, cueillies à maturité dans la région de Casamance. Idéales pour jus, salades ou à déguster nature.",
  },
  {
    id: "legumes-frais",
    name: "Panier légumes frais",
    nameWolof: "Reseñ yu bees",
    category: "legumes",
    price: 2500,
    unit: "le panier",
    stock: 18,
    vendor: "Modou — Marché Tilène",
    image: legumes,
    description: "Assortiment de tomates fraîches, bissap et feuilles vertes du jour. Parfait pour ceebu jën ou yassa.",
  },
  {
    id: "boubou-wax",
    name: "Boubou en wax fleuri",
    nameWolof: "Mbubb wax",
    category: "habits",
    price: 18000,
    unit: "la pièce",
    stock: 6,
    vendor: "Atelier Awa — HLM",
    image: boubou,
    description: "Boubou cousu main dans un wax 100% coton, motifs floraux orange et vert. Disponible en plusieurs tailles.",
  },
  {
    id: "panier-tisse",
    name: "Panier tressé en rônier",
    nameWolof: "Pañe liggéey loxo",
    category: "artisanat",
    price: 7500,
    unit: "la pièce",
    stock: 12,
    vendor: "Coopérative Thiès",
    image: panier,
    description: "Panier traditionnel tressé à la main par les artisanes de Thiès. Solide, écologique, parfait pour le marché.",
  },
  {
    id: "sandales-cuir",
    name: "Sandales cuir & wax",
    nameWolof: "Dàll wax",
    category: "habits",
    price: 12000,
    unit: "la paire",
    stock: 9,
    vendor: "Babacar — Sandaga",
    image: sandales,
    description: "Sandales en cuir véritable rehaussées d'une lanière en wax coloré. Confort et style, faites à Dakar.",
  },
];

export const formatFCFA = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
