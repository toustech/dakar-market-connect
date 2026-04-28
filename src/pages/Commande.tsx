import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatFCFA } from "@/data/products";
import { newOrderId, saveOrder, Order } from "@/lib/orders";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Method = Order["paymentMethod"];

const methods: { id: Method; label: string; subtitle: string; color: string }[] = [
  { id: "wave", label: "Wave", subtitle: "Paiement instantané", color: "bg-[#1BC8FF]" },
  { id: "orange-money", label: "Orange Money", subtitle: "Validation par OTP", color: "bg-[#FF7900]" },
  { id: "paydunya", label: "PayDunya", subtitle: "Carte bancaire & wallet", color: "bg-[#0EA571]" },
  { id: "cash", label: "À la livraison", subtitle: "Espèces · sans frais", color: "bg-primary" },
];

const Commande = () => {
  const { items, total, clear } = useCart();
  const nav = useNavigate();
  const [step, setStep] = useState<"infos" | "paiement" | "otp" | "confirm">(items.length ? "infos" : "infos");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [method, setMethod] = useState<Method>("wave");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (items.length === 0 && step !== "confirm") {
    return (
      <section className="container-custom py-20 text-center">
        <p className="text-muted-foreground">Votre panier est vide.</p>
      </section>
    );
  }

  const submitInfos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    if (!/^(\+221)?[0-9\s]{9,15}$/.test(form.phone.trim())) {
      toast.error("Numéro de téléphone invalide (format SN).");
      return;
    }
    setStep("paiement");
  };

  const startPayment = () => {
    if (method === "cash") return finalize();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      toast.info("Code OTP envoyé par SMS au " + form.phone);
    }, 900);
  };

  const verifyOtp = () => {
    if (otp.length < 4) { toast.error("Code OTP invalide."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      finalize();
    }, 800);
  };

  const finalize = () => {
    const order: Order = {
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      customer: form,
      items: items.map((i) => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
      total,
      paymentMethod: method,
      status: method === "cash" ? "en_attente" : "confirmee",
    };
    saveOrder(order);
    clear();
    setStep("confirm");
    toast.success("Commande enregistrée : " + order.id);
    // simulate webhook
    console.log("[webhook] HMAC SHA256 payload:", { id: order.id, total, method });
  };

  return (
    <section className="container-custom py-10 sm:py-14">
      <header className="mb-8">
        <p className="wolof">Komandeer</p>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Finaliser ma commande</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
          {step === "infos" && (
            <form onSubmit={submitInfos} className="space-y-4">
              <h2 className="font-display text-xl font-bold">1. Vos informations</h2>
              <div>
                <label className="mb-1 block text-sm font-semibold">Nom complet</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring" placeholder="Aminata Diop" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold">Téléphone (Wave / OM)</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring" placeholder="+221 77 000 00 00" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold">Adresse de livraison</label>
                <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={3} className="w-full rounded-xl border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Quartier, rue, point de repère…" />
              </div>
              <button className="inline-flex h-12 items-center rounded-full bg-accent px-6 font-semibold text-accent-foreground shadow-glow hover:scale-105">
                Continuer →
              </button>
            </form>
          )}

          {step === "paiement" && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold">2. Mode de paiement</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors",
                      method === m.id ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
                    )}
                  >
                    <span className={cn("grid h-10 w-10 place-items-center rounded-lg font-display font-extrabold text-white", m.color)}>
                      {m.label[0]}
                    </span>
                    <div>
                      <p className="font-semibold">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-secondary p-3 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Transaction sécurisée — webhook signé HMAC SHA256.
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("infos")} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary">← Retour</button>
                <button onClick={startPayment} disabled={loading} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-foreground shadow-glow hover:scale-[1.02] disabled:opacity-60">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {method === "cash" ? "Confirmer la commande" : `Payer ${formatFCFA(total)}`}
                </button>
              </div>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-4 text-center">
              <h2 className="font-display text-xl font-bold">3. Validation OTP</h2>
              <p className="text-sm text-muted-foreground">Entrez le code à 6 chiffres reçu par SMS au <strong>{form.phone}</strong>.</p>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="mx-auto h-14 w-48 rounded-xl border-2 border-input bg-background text-center font-display text-2xl font-bold tracking-[0.5em] outline-none focus:border-accent"
                placeholder="••••••"
                inputMode="numeric"
              />
              <p className="text-xs text-muted-foreground">Démo : entrez n'importe quel code à 4-6 chiffres.</p>
              <button onClick={verifyOtp} disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 font-semibold text-accent-foreground shadow-glow hover:scale-[1.02] disabled:opacity-60">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Valider le paiement
              </button>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-5 text-center py-6">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-sun text-3xl">✓</div>
              <h2 className="font-display text-2xl font-extrabold">Jërëjëf ! Commande confirmée 🎉</h2>
              <p className="text-muted-foreground">Vous recevrez une confirmation WhatsApp dans quelques instants.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => nav("/")} className="rounded-full border border-border px-5 py-2.5 font-semibold hover:bg-secondary">Retour à l'accueil</button>
                <a
                  href={`https://wa.me/221770000000?text=${encodeURIComponent("Bonjour, je viens de passer une commande sur e-Sandika.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-[#25D366] px-5 py-2.5 font-semibold text-white"
                >
                  Confirmer par WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {step !== "confirm" && (
          <aside className="h-fit rounded-2xl border border-border/60 bg-card p-6 shadow-card lg:sticky lg:top-24">
            <h3 className="font-display text-lg font-bold">Votre commande</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {items.map((i) => (
                <li key={i.product.id} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{i.quantity} × {i.product.name}</span>
                  <span className="font-semibold">{formatFCFA(i.product.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="my-4 border-t border-border" />
            <div className="flex items-center justify-between">
              <span className="font-display font-bold">Total</span>
              <span className="font-display text-xl font-extrabold text-primary">{formatFCFA(total)}</span>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default Commande;
