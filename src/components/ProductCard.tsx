import { Link } from "react-router-dom";
import { Product, formatFCFA } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
      <Link to={`/produit/${product.id}`} className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.stock < 10 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
            Plus que {product.stock}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <Link to={`/produit/${product.id}`} className="font-display text-base font-bold leading-tight hover:text-accent">
            {product.name}
          </Link>
          {product.nameWolof && <span className="wolof">{product.nameWolof}</span>}
        </div>
        <p className="text-xs text-muted-foreground">{product.vendor}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <p className="font-display text-lg font-extrabold text-primary">{formatFCFA(product.price)}</p>
            <p className="text-xs text-muted-foreground">{product.unit}</p>
          </div>
          <button
            onClick={() => {
              add(product);
              toast.success(`${product.name} ajouté au panier`);
            }}
            className="inline-flex h-10 items-center gap-1 rounded-full bg-accent px-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105 active:scale-95"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <Plus className="h-4 w-4" /> Ajouter
          </button>
        </div>
      </div>
    </article>
  );
};
