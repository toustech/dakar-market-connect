import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatFCFA } from "@/data/products";
import { cn } from "@/lib/utils";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";

type OrderStatus = "en_attente" | "confirmee" | "livree" | "annulee";

type OrderRow = {
  id: string;
  reference: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  payment_method: string;
  status: OrderStatus;
  created_at: string;
  order_items: { id: string; product_name: string; unit_price: number; quantity: number }[];
};

const statusLabel: Record<OrderStatus, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  livree: "Livrée",
  annulee: "Annulée",
};
const statusColor: Record<OrderStatus, string> = {
  en_attente: "bg-highlight text-highlight-foreground",
  confirmee: "bg-accent text-accent-foreground",
  livree: "bg-primary text-primary-foreground",
  annulee: "bg-destructive text-destructive-foreground",
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setOrders((data as OrderRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  if (authLoading) {
    return <div className="container-custom py-20 text-center text-muted-foreground"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></div>;
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <section className="container-custom py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Accès refusé</h1>
        <p className="mt-2 text-muted-foreground">Votre compte n'a pas le rôle administrateur.</p>
        <button onClick={signOut} className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary">Se déconnecter</button>
      </section>
    );
  }

  const change = async (id: string, s: OrderStatus) => {
    const { error } = await supabase.from("orders").update({ status: s }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Statut mis à jour");
    load();
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <section className="container-custom py-10 sm:py-14">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="wolof">Bureau bi</p>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Espace administrateur</h1>
          <p className="mt-1 text-sm text-muted-foreground">{orders.length} commande(s) au total · connecté en tant que <strong>{user.email}</strong></p>
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
          <button onClick={signOut} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
            <LogOut className="h-3 w-3" /> Quitter
          </button>
        </div>
      </header>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          Aucune commande pour ce filtre.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((o) => (
            <article key={o.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-extrabold">#{o.reference}</p>
                  <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("fr-FR")}</p>
                </div>
                <span className={cn("rounded-full px-3 py-1 text-xs font-bold", statusColor[o.status])}>
                  {statusLabel[o.status]}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Client</p>
                  <p className="font-semibold">{o.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{o.customer_phone}</p>
                  <p className="text-sm text-muted-foreground">{o.customer_address}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Articles</p>
                  <ul className="text-sm">
                    {o.order_items?.map((i) => <li key={i.id}>{i.quantity} × {i.product_name}</li>)}
                  </ul>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Paiement</p>
                  <p className="font-semibold capitalize">{o.payment_method.replace("-", " ")}</p>
                  <p className="mt-2 font-display text-2xl font-extrabold text-primary">{formatFCFA(o.total)}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                <button onClick={() => change(o.id, "confirmee")} className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:scale-105">Confirmer</button>
                <button onClick={() => change(o.id, "livree")} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:scale-105">Marquer livrée</button>
                <button onClick={() => change(o.id, "annulee")} className="rounded-full border border-destructive px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground">Annuler</button>
                <a
                  href={`https://wa.me/${o.customer_phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${o.customer_name}, votre commande ${o.reference} sur e-Sandika a bien été reçue.`)}`}
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
