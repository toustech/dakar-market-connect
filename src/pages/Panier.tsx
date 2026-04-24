import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatFCFA } from "@/data/products";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

const Panier = () => {
  const { items, setQty, remove, total } = useCart();

  if (items.length === 0) {
    return (
      <section className="container-custom py-20 text-center">
        <p className="wolof">Sa pañe bi dafa wow</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">Découvrez les produits frais et artisanaux du marché.</p>
        <Link to="/boutique" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-foreground shadow-glow hover:scale-105">
          Voir la boutique <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  return (
    <section className="container-custom py-10 sm:py-14">
      <header className="mb-8">
        <p className="wolof">Sa pañe bi</p>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Mon panier</h1>
      </header>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-card">
              <img src={product.image} alt={product.name} width={120} height={120} className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28" />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link to={`/produit/${product.id}`} className="font-display font-bold hover:text-accent">{product.name}</Link>
                    <p className="text-xs text-muted-foreground">{product.vendor}</p>
                  </div>
                  <button onClick={() => remove(product.id)} className="text-muted-foreground hover:text-destructive" aria-label="Retirer">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(product.id, quantity - 1)} className="grid h-9 w-9 place-items-center hover:bg-secondary" aria-label="Moins"><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQty(product.id, quantity + 1)} className="grid h-9 w-9 place-items-center hover:bg-secondary" aria-label="Plus"><Plus className="h-4 w-4" /></button>
                  </div>
                  <p className="font-display font-extrabold text-primary">{formatFCFA(product.price * quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border/60 bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold">Récapitulatif</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Sous-total</dt><dd>{formatFCFA(total)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Livraison</dt><dd>Calculée à l'étape suivante</dd></div>
          </dl>
          <div className="my-4 border-t border-border" />
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold">Total</span>
            <span className="font-display text-2xl font-extrabold text-primary">{formatFCFA(total)}</span>
          </div>
          <Link
            to="/commande"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent font-semibold text-accent-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
          >
            Passer la commande <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">Wave · Orange Money · PayDunya · Cash</p>
        </aside>
      </div>
    </section>
  );
};

export default Panier;
