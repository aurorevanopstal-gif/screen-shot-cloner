import { useState } from "react";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export function ConcertSubscribeDialog() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState({ firstName: "", lastName: "", city: "", email: "" });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.from("concert_subscribers").insert({
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      city: form.city.trim(),
      email: form.email.trim(),
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("done");
    setForm({ firstName: "", lastName: "", city: "", email: "" });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setStatus("idle");
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-copper px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
        >
          <Mail className="h-4 w-4" />
          Recevoir les dates de concerts
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Recevoir les dates de concerts</DialogTitle>
          <DialogDescription>
            Laissez vos coordonnées et nous vous préviendrons de nos prochains concerts.
          </DialogDescription>
        </DialogHeader>

        {status === "done" ? (
          <p className="py-6 text-center text-copper">
            Merci ! Votre inscription est bien enregistrée.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" required value={form.firstName} onChange={update("firstName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" required value={form.lastName} onChange={update("lastName")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input id="city" required value={form.city} onChange={update("city")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input id="email" type="email" required value={form.email} onChange={update("email")} />
            </div>
            {status === "error" && (
              <p className="text-sm text-destructive">
                Une erreur est survenue. Merci de réessayer.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-copper px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "Envoi..." : "Je m'inscris"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
