import { Link } from "react-router-dom";
import hero from "@/assets/hero-market.jpg";
import { products, categories, formatFCFA } from "@/data/products";
import { ArrowRight, ShieldCheck, Truck, Smartphone } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

const Index = () => {
  const featured = products.slice(0, 4);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Marché de Dakar" className="h-full w-full object-cover" width={1536} height={1024} />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="container-custom relative z-10 flex min-h-[78vh] flex-col items-start justify-center py-20 text-primary-foreground">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-highlight/40 bg-primary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-highlight backdrop-blur">
            🇸🇳 Marché en ligne · Dakar
          </span>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            Le marché du Sénégal,
            <span className="block bg-gradient-sun bg-clip-text text-transparent">livré chez vous.</span>
          </h1>
          <p className="mt-4 font-display text-xl italic text-highlight">Jëf-jël ci lou néex.</p>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/90 sm:text-lg">
            Fruits frais, légumes, habits en wax et artisanat — choisis directement chez les vendeurs du marché.
            Paiement facile via <strong>Wave</strong>, <strong>Orange Money</strong> ou à la livraison.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/boutique"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-foreground shadow-glow transition-transform hover:scale-105 active:scale-95"
            >
              Commander maintenant <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/a-propos"
              className="inline-flex h-12 items-center rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-6 font-semibold backdrop-blur hover:bg-primary-foreground/20"
            >
              Comment ça marche ?
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-highlight" /> Livraison Dakar &amp; banlieue</div>
            <div className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-highlight" /> Wave · Orange Money · PayDunya</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-highlight" /> Paiement sécurisé</div>
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="container-custom py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="wolof">Réer ñu lan nga bëgg</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Catégories du marché</h2>
          </div>
          <Link to="/boutique" className="hidden text-sm font-semibold text-accent hover:underline sm:inline">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/boutique?cat=${c.id}`}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="text-4xl">{c.emoji}</div>
              <h3 className="mt-3 font-display text-lg font-bold">{c.label}</h3>
              <p className="text-sm italic text-accent/80">{c.wolof}</p>
              <span className="absolute right-4 top-4 text-muted-foreground transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* VEDETTES */}
      <section className="bg-secondary/40 py-16">
        <div className="container-custom">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="wolof">Lou bees ci marché bi</p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Vendeurs à la une</h2>
            </div>
            <Link to="/boutique" className="text-sm font-semibold text-accent hover:underline">Voir la boutique →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* PROMESSE */}
      <section className="container-custom py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Frais et local", w: "Yu bees, yu set", d: "Produits cueillis chaque matin chez nos vendeurs partenaires de Dakar." },
            { t: "Paiement facile", w: "Fey ko ndànk", d: "Wave, Orange Money, PayDunya — ou paiement à la livraison sans frais cachés." },
            { t: "Confiance Teranga", w: "Teranga ji nu war", d: "Un service client par WhatsApp, en français comme en wolof." },
          ].map((it) => (
            <div key={it.t} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-sun font-display font-extrabold text-primary">
                ★
              </div>
              <h3 className="font-display text-xl font-bold">{it.t}</h3>
              <p className="wolof mb-2">{it.w}</p>
              <p className="text-sm text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA bande */}
      <section className="container-custom pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-glow sm:p-12">
          <div className="wax-divider absolute inset-y-0 right-0 w-2" />
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="wolof text-highlight">Bul yeex !</p>
              <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                Prêt à composer votre panier ?
              </h2>
              <p className="mt-2 max-w-xl text-primary-foreground/85">
                Plus de {products.length * 12}+ articles disponibles dès aujourd'hui — à partir de {formatFCFA(1500)}.
              </p>
            </div>
            <Link
              to="/boutique"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-foreground hover:scale-105 active:scale-95"
            >
              Commander maintenant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
