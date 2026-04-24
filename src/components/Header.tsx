import { Link, useLocation } from "react-router-dom";
import { ShoppingBasket, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/boutique", label: "Boutique" },
  { to: "/contact", label: "Contact" },
  { to: "/a-propos", label: "À propos" },
];

export const Header = () => {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-extrabold text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-sun text-primary shadow-glow">M</span>
          <span>
            Marsé <span className="text-accent">Bi</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                pathname === l.to && "bg-secondary text-primary"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/panier"
            aria-label="Panier"
            className="relative inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:scale-[1.02] active:scale-95"
          >
            <ShoppingBasket className="h-4 w-4" />
            <span className="hidden sm:inline">Panier</span>
            {count > 0 && (
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-highlight px-1.5 text-xs font-bold text-highlight-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-secondary md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border/60 bg-background md:hidden">
          <div className="container-custom flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary",
                  pathname === l.to && "bg-secondary text-primary"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
