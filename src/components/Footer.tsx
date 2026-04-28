import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="mt-16 border-t border-border/60 bg-primary text-primary-foreground">
    <div className="wax-divider h-2 w-full" />
    <div className="container-custom grid gap-10 py-12 md:grid-cols-4">
      <div>
        <div className="flex items-center gap-2 font-display text-xl font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-sun text-primary">M</span>
          Marsé <span className="text-highlight">Bi</span>
        </div>
        <p className="mt-3 text-sm text-primary-foreground/75">
          Le marché du Sénégal, livré chez vous.
          <span className="mt-1 block italic text-highlight/90">Jëf-jël ci lou néex.</span>
        </p>
      </div>
      <div>
        <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-highlight">Boutique</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/boutique" className="hover:text-highlight">Tous les produits</Link></li>
          <li><Link to="/boutique?cat=fruits" className="hover:text-highlight">Fruits</Link></li>
          <li><Link to="/boutique?cat=legumes" className="hover:text-highlight">Légumes</Link></li>
          <li><Link to="/boutique?cat=artisanat" className="hover:text-highlight">Artisanat</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-highlight">Aide</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/contact" className="hover:text-highlight">Contact</Link></li>
          <li><Link to="/a-propos" className="hover:text-highlight">À propos & FAQ</Link></li>
          <li><Link to="/mentions" className="hover:text-highlight">Mentions légales</Link></li>
          <li><Link to="/admin" className="hover:text-highlight">Espace admin</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-highlight">Paiement</h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-primary-foreground/10 px-3 py-1.5">Wave</span>
          <span className="rounded-full bg-primary-foreground/10 px-3 py-1.5">Orange Money</span>
          <span className="rounded-full bg-primary-foreground/10 px-3 py-1.5">PayDunya</span>
          <span className="rounded-full bg-primary-foreground/10 px-3 py-1.5">Cash</span>
        </div>
        <p className="mt-3 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} e-Sandika · Dakar, Sénégal
        </p>
      </div>
    </div>
  </footer>
);
