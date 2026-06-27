import { createFileRoute, useRouter, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Lock } from "lucide-react";
import { checkUnlocked, unlockSite } from "@/lib/gate.functions";

export const Route = createFileRoute("/unlock")({
  beforeLoad: async () => {
    const { unlocked } = await checkUnlocked();
    if (unlocked) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Tandem — Accès privé" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Unlock,
});

function Unlock() {
  const router = useRouter();
  const unlock = useServerFn(unlockSite);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const password = new FormData(e.currentTarget).get("password") as string;
    const { ok } = await unlock({ data: { password } });
    if (ok) {
      await router.invalidate();
      await router.navigate({ to: "/" });
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-6 rounded-2xl border border-border/40 bg-card/60 p-8 backdrop-blur"
      >
        <div className="text-center space-y-3">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-serif">Tandem</h1>
          <p className="text-sm text-muted-foreground">
            Espace réservé. Entrez le mot de passe pour accéder au site.
          </p>
        </div>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          placeholder="Mot de passe"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && (
          <p className="text-sm text-destructive text-center">
            Mot de passe incorrect.
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Vérification…" : "Entrer"}
        </button>
      </form>
    </main>
  );
}
