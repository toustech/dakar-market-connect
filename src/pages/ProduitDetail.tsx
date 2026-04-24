import { Link, useParams } from "react-router-dom";
import { products, formatFCFA } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";

const ProduitDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="mb-4 text-muted-foreground">Produit introuvable.</p>
        <Link to="/boutique" className="font-semibold text-accent hover:underline">← Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <section className="container-custom py-10 sm:py-14">
      <Link to="/boutique" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-secondary shadow-card">
          <img src={product.image} alt={product.name} width={768} height={768} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="wolof">{product.nameWolof}</p>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Vendu par <strong>{product.vendor}</strong></p>
          <p className="mt-6 font-display text-4xl font-extrabold text-primary">{formatFCFA(product.price)}</p>
          <p className="text-sm text-muted-foreground">{product.unit}</p>

          <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center rounded-full hover:bg-secondary" aria-label="Moins">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="grid h-11 w-11 place-items-center rounded-full hover:bg-secondary" aria-label="Plus">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => { add(product, qty); toast.success(`${qty} × ${product.name} ajouté au panier`); }}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
            >
              <ShoppingBasket className="h-5 w-5" /> Ajouter au panier
            </button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Stock disponible : <strong>{product.stock}</strong> · Livraison Dakar 24-48h
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProduitDetail;
