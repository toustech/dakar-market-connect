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
import placeholder from "@/assets/hero-market.jpg";

export const productImages: Record<string, string> = {
  mangue: mangues,
  maad,
  tool,
  sidem,
  new: neww,
  guerte,
  orange,
  "legumes-frais": legumes,
  "boubou-wax": boubou,
  "panier-tisse": panier,
  "sandales-cuir": sandales,
};

export const resolveImage = (key?: string | null) =>
  (key && productImages[key]) || placeholder;
