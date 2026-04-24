import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Phone, MapPin, Mail } from "lucide-react";

const PHONE = "221770000000";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    const text = `Bonjour, je suis ${form.name} (${form.phone}).%0A${form.message}`;
    window.open(`https://wa.me/${PHONE}?text=${text}`, "_blank");
    toast.success("Redirection vers WhatsApp…");
  };

  return (
    <section className="container-custom py-10 sm:py-14">
      <header className="mb-10">
        <p className="wolof">Jokkooante</p>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Contactez-nous</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Une question, une commande spéciale ? Écrivez-nous ou contactez-nous directement par WhatsApp.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
          <div>
            <label className="mb-1 block text-sm font-semibold">Nom</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring" placeholder="Votre nom" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Téléphone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring" placeholder="+221 77 000 00 00" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full rounded-xl border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Votre message…" />
          </div>
          <button className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-white shadow-glow hover:scale-105">
            <MessageCircle className="h-4 w-4" /> Envoyer via WhatsApp
          </button>
        </form>

        <aside className="space-y-4">
          {[
            { icon: Phone, label: "Téléphone", value: "+221 77 000 00 00" },
            { icon: Mail, label: "Email", value: "contact@marsebi.sn" },
            { icon: MapPin, label: "Adresse", value: "Marché Castors, Dakar" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-accent">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="font-semibold">{c.value}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
};

export default Contact;
