import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const { user, loading: authLoading } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!authLoading && user) return <Navigate to="/admin" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Compte créé. Vous pouvez vous connecter.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Connecté !");
        nav("/admin");
      }
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-custom flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-8 shadow-card">
        <p className="wolof">Bureau bi</p>
        <h1 className="font-display text-3xl font-extrabold">
          {mode === "signin" ? "Connexion admin" : "Créer un compte"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Espace réservé à l'équipe e-Sandika.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring"
              placeholder="vous@e-sandika.sn"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Mot de passe</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>
          <button
            disabled={loading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent font-semibold text-accent-foreground shadow-glow hover:scale-[1.02] disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Se connecter" : "Créer le compte"}
          </button>
        </form>

        <button
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-accent"
        >
          {mode === "signin" ? "Pas encore de compte ? Créer un compte" : "← Déjà un compte ? Se connecter"}
        </button>

        <p className="mt-6 rounded-xl bg-secondary p-3 text-xs text-muted-foreground">
          ℹ️ Le premier compte créé doit être promu admin manuellement depuis le tableau Lovable Cloud (table <code>user_roles</code>) en remplaçant son rôle par <strong>admin</strong>.
        </p>
      </div>
    </section>
  );
};

export default Auth;
