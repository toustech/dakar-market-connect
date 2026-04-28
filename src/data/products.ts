import mangues from "@/assets/p-mangues.jpg";
import maad from "@/assets/p-maad.jpg";
import tool from "@/assets/p-tool.jpg";
import sidem from "@/assets/p-sidem.jpg";
import neww from "@/assets/p-new.jpg";
import guerte from "@/assets/p-guerte.jpg";
import orange from "@/assets/p-orange.jpg";
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
    id: "mangue",
    name: "Mangue",
    nameWolof: "Mango",
    category: "fruits",
    price: 1500,
    unit: "le kg",
    stock: 30,
    vendor: "Fatou — Marché Castors",
    image: mangues,
    description: "Mangues juteuses et sucrées, cueillies à maturité en Casamance. Idéales pour jus, salades ou à déguster nature.",
  },
  {
    id: "maad",
    name: "Maad",
    nameWolof: "Maad",
    category: "fruits",
    price: 2000,
    unit: "le kg",
    stock: 20,
    vendor: "Aïssatou — Marché Tilène",
    image: maad,
    description: "Fruit sauvage typique du Sénégal (saba senegalensis), à la chair sucrée-acidulée. Parfait nature ou en jus rafraîchissant.",
  },
  {
    id: "tool",
    name: "Tool",
    nameWolof: "Tool",
    category: "fruits",
    price: 1800,
    unit: "le kg",
    stock: 15,
    vendor: "Coopérative Kaolack",
    image: tool,
    description: "Detarium senegalense — fruit de brousse à la pulpe douce et parfumée, très apprécié dans les villages sénégalais.",
  },
  {
    id: "sidem",
    name: "Sidem",
    nameWolof: "Sidem",
    category: "fruits",
    price: 1200,
    unit: "le kg",
    stock: 25,
    vendor: "Mariama — Thiès",
    image: sidem,
    description: "Jujubes du Sahel (sidem), petits fruits rouges sucrés, riches en vitamine C. Une saveur d'enfance.",
  },
  {
    id: "new",
    name: "New (noix de cola)",
    nameWolof: "New",
    category: "fruits",
    price: 3500,
    unit: "le kg",
    stock: 18,
    vendor: "Babacar — Sandaga",
    image: neww,
    description: "Noix de cola fraîches, rouges et blanches, symbole de la Teranga sénégalaise. Offerte lors des cérémonies.",
  },
  {
    id: "guerte",
    name: "Guerte (arachide)",
    nameWolof: "Guerte",
    category: "fruits",
    price: 1000,
    unit: "le kg",
    stock: 50,
    vendor: "Modou — Diourbel",
    image: guerte,
    description: "Arachides fraîches en coque, cultivées dans le bassin arachidier du Sénégal. À griller ou à cuisiner en mafé.",
  },
  {
    id: "orange",
    name: "Orange",
    nameWolof: "Soraas",
    category: "fruits",
    price: 1300,
    unit: "le kg",
    stock: 40,
    vendor: "Fatou — Marché Castors",
    image: orange,
    description: "Oranges juteuses et sucrées, parfaites pour le jus du matin ou à savourer en quartiers.",
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
