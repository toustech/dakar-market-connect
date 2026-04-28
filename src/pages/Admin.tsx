import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, Order } from "@/lib/orders";
import { formatFCFA } from "@/data/products";
import { cn } from "@/lib/utils";

const statusLabel: Record<Order["status"], string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  livree: "Livrée",
  annulee: "Annulée",
};
const statusColor: Record<Order["status"], string> = {
  en_attente: "bg-highlight text-highlight-foreground",
  confirmee: "bg-accent text-accent-foreground",
  livree: "bg-primary text-primary-foreground",
  annulee: "bg-destructive text-destructive-foreground",
};

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"all" | Order["status"]>("all");

  useEffect(() => { setOrders(getOrders()); }, []);

  const change = (id: string, s: Order["status"]) => {
    updateOrderStatus(id, s);
    setOrders(getOrders());
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <section className="container-custom py-10 sm:py-14">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="wolof">Bureau bi</p>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Espace administrateur</h1>
          <p className="mt-1 text-sm text-muted-foreground">Suivi et confirmation des commandes ({orders.length} au total).</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "en_attente", "confirmee", "livree", "annulee"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold",
                filter === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
              )}
            >
              {s === "all" ? "Toutes" : statusLabel[s]}
            </button>
          ))}
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          Aucune commande pour ce filtre. Passez une commande de test sur le site, elle apparaîtra ici.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((o) => (
            <article key={o.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-extrabold">#{o.id}</p>
                  <p className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString("fr-FR")}</p>
                </div>
                <span className={cn("rounded-full px-3 py-1 text-xs font-bold", statusColor[o.status])}>
                  {statusLabel[o.status]}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Client</p>
                  <p className="font-semibold">{o.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{o.customer.phone}</p>
                  <p className="text-sm text-muted-foreground">{o.customer.address}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Articles</p>
                  <ul className="text-sm">
                    {o.items.map((i) => <li key={i.id}>{i.quantity} × {i.name}</li>)}
                  </ul>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Paiement</p>
                  <p className="font-semibold capitalize">{o.paymentMethod.replace("-", " ")}</p>
                  <p className="mt-2 font-display text-2xl font-extrabold text-primary">{formatFCFA(o.total)}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                <button onClick={() => change(o.id, "confirmee")} className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:scale-105">Confirmer</button>
                <button onClick={() => change(o.id, "livree")} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:scale-105">Marquer livrée</button>
                <button onClick={() => change(o.id, "annulee")} className="rounded-full border border-destructive px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground">Annuler</button>
                <a
                  href={`https://wa.me/${o.customer.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${o.customer.name}, votre commande ${o.id} sur e-Sandika a bien été reçue.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white"
                >
                  WhatsApp client
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Admin;
