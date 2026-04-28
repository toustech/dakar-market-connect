import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { categories, Category } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const Boutique = () => {
  const [params, setParams] = useSearchParams();
  const cat = (params.get("cat") as Category | null) || null;
  const { data: products = [], isLoading } = useProducts();

  const filtered = useMemo(
    () => (cat ? products.filter((p) => p.category === cat) : products),
    [cat, products]
  );

  const setCat = (c: Category | null) => {
    if (c) params.set("cat", c);
    else params.delete("cat");
    setParams(params);
  };

  return (
    <section className="container-custom py-10 sm:py-14">
      <header className="mb-8">
        <p className="wolof">Marché bi ci sa loxo</p>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Boutique</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Choisissez vos produits frais et artisanaux directement chez les vendeurs du marché.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setCat(null)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            !cat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"
          )}
        >
          Tout voir
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"
            )}
          >
            <span className="mr-1">{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl bg-secondary p-6 text-center text-muted-foreground">Aucun produit dans cette catégorie.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
};

export default Boutique;
