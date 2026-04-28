import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Comment passer une commande ?", a: "Ajoutez vos produits au panier, validez votre commande, choisissez votre mode de paiement (Wave, Orange Money, PayDunya ou cash à la livraison) et c'est fait." },
  { q: "Quels sont les délais de livraison ?", a: "À Dakar et banlieue : 24 à 48h. Pour les autres régions, comptez 2 à 4 jours selon la zone." },
  { q: "Puis-je payer à la livraison ?", a: "Oui, le paiement en espèces à la livraison est disponible sans frais supplémentaires." },
  { q: "Comment fonctionne le retour ?", a: "Vous avez 24h après réception pour signaler tout produit non conforme. Nous le remplaçons ou vous remboursons." },
  { q: "Mes informations de paiement sont-elles sécurisées ?", a: "Oui. Toutes les transactions sont chiffrées et confirmées par webhook signé HMAC SHA256." },
];

const APropos = () => (
  <section className="container-custom py-10 sm:py-14">
    <header className="mb-10 max-w-2xl">
      <p className="wolof">Ñun ñoo di e-Sandika</p>
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">À propos & FAQ</h1>
      <p className="mt-3 text-muted-foreground">
        e-Sandika connecte les vendeurs des marchés sénégalais à leurs clients en ligne.
        Notre mission : rendre le marché accessible, rapide et fiable, tout en soutenant l'économie locale.
      </p>
    </header>

    <div className="grid gap-6 md:grid-cols-3">
      {[
        { t: "Producteurs locaux", w: "Liggéeykat yi", d: "Plus de 50 vendeurs partenaires à Dakar et environs." },
        { t: "Qualité garantie", w: "Set sax", d: "Produits frais sélectionnés chaque matin." },
        { t: "Service client", w: "Topptoo bi", d: "Support WhatsApp 7j/7, en français et wolof." },
      ].map((b) => (
        <div key={b.t} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">{b.t}</h3>
          <p className="wolof mb-2">{b.w}</p>
          <p className="text-sm text-muted-foreground">{b.d}</p>
        </div>
      ))}
    </div>

    <h2 className="mt-16 mb-6 font-display text-2xl font-extrabold">Questions fréquentes</h2>
    <Accordion type="single" collapsible className="rounded-2xl border border-border/60 bg-card px-4 shadow-card sm:px-6">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`f-${i}`}>
          <AccordionTrigger className="text-left font-display text-base font-bold">{f.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default APropos;
