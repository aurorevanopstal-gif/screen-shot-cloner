import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Mic,
  Music,
  Guitar,
  Clock,
  Users,
  MapPin,
  Wrench,
  Mail,
  Phone,
  Facebook,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Heart,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/tandem-duo-live.png.asset.json";
import eventOhain from "@/assets/tandem-event-ohain.jpg";
import duoPortrait from "@/assets/tandem-duo-concert.jpg.asset.json";
import guitareImg from "@/assets/tandem-guitare.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tandem — Duo guitare et voix" },
      {
        name: "description",
        content:
          "Tandem, duo acoustique voix et guitare. Covers françaises, anglaises et italiennes, revisitées en version intimiste.",
      },
      { property: "og:title", content: "Tandem — Duo guitare et voix" },
      {
        property: "og:description",
        content:
          "Duo acoustique intimiste. Covers françaises, anglaises et italiennes.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#accueil", label: "Accueil" },
  { href: "#prochainement", label: "Prochainement" },
  { href: "#ecouter", label: "Écouter" },
  { href: "#repertoire", label: "Répertoire" },
  { href: "#programmer", label: "Programmer" },
  { href: "#en-cours", label: "En cours" },
  { href: "#contact", label: "Contact" },
];

const events = [
  {
    img: eventOhain,
    date: "Vendredi 26 juin · 20h00",
    dateValue: new Date("2026-06-26T20:00:00"),
    place: "Les AfterWorks du Hututu, Ohain",
    note: "Marché nocturne, concert, bar, restauration",
  },
];

const upcomingEvents = events.filter((e) => e.dateValue.getTime() >= Date.now());

const repertoire = [
  { icon: Music, title: "Variété française", text: "Les plus belles chansons françaises revisitées." },
  { icon: Music, title: "Variété anglaise", text: "Standards pop et rock, en version intimiste." },
  { icon: Music, title: "Variété italienne", text: "La dolce musica, avec passion." },
  { icon: Heart, title: "Hommage BBB", text: "Brel, Brassens, Barbara — les géants à l'honneur." },
];

const programmer = [
  { icon: Clock, label: "Durée", text: "Environ 1h30" },
  { icon: Users, label: "Format", text: "Duo guitare et voix" },
  { icon: MapPin, label: "Lieux", text: "Petites et moyennes salles, cafés-concerts, clubs, centres culturels" },
  { icon: Wrench, label: "Autonomie technique", text: "Installation légère incluse" },
];

function Index() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#accueil" className="flex items-center gap-2">
            <Guitar className="h-6 w-6 text-copper" strokeWidth={1.5} />
            <span className="font-script text-3xl leading-none text-foreground">Tandem</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-copper"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="accueil" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-32">
          <div>
            <h1 className="font-serif text-6xl font-bold tracking-tight text-foreground md:text-8xl">
              TANDEM
            </h1>
            <p className="mt-4 text-xl font-medium text-copper md:text-2xl">
              Duo guitare et voix
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Covers françaises, anglaises et italiennes, revisitées en version intimiste.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#ecouter"
                className="rounded-full bg-copper px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_var(--primary)]"
              >
                Écouter
              </a>
              <a
                href="#programmer"
                className="rounded-full border border-copper px-7 py-3 text-sm font-medium text-copper transition-all hover:bg-copper hover:text-primary-foreground"
              >
                Nous programmer
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-copper/20 to-transparent blur-2xl" />
            <img
              src={heroImg.url}
              alt="Tandem en concert"
              className="relative h-auto w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* PROCHAINEMENT */}
      <section id="prochainement" className="border-t border-border/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="section-title">Prochainement</h2>
          <p className="mt-2 text-muted-foreground">Nos prochaines dates</p>

          <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="mt-10">
            <CarouselContent className="-ml-4">
              {upcomingEvents.map((e, i) => (
                <CarouselItem key={i} className="basis-full pl-4 md:basis-1/2">
                  <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-copper/60 hover:shadow-[0_10px_40px_-10px_var(--primary)]">
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-copper">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">{e.date}</span>
                      </div>
                      <h3 className="mt-2 font-serif text-xl text-foreground">{e.place}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{e.note}</p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-6 flex items-center justify-end">
              <div className="flex gap-2">
                <button
                  onClick={() => api?.scrollPrev()}
                  disabled={!canScrollPrev}
                  aria-label="Précédent"
                  className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-copper hover:text-copper disabled:opacity-40"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => api?.scrollNext()}
                  disabled={!canScrollNext}
                  aria-label="Suivant"
                  className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-copper hover:text-copper disabled:opacity-40"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Carousel>

          <div className="mt-10 text-center">
            <a
              href="https://facebook.com/Tandemgvx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-copper px-7 py-3 text-sm font-medium text-copper transition-all hover:bg-copper hover:text-primary-foreground"
            >
              Toutes nos dates
            </a>
          </div>
        </div>
      </section>

      {/* À PROPOS */}
      <section className="border-t border-border/40 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <img
            src={duoPortrait.url}
            alt="Portrait du duo Tandem"
            className="mx-auto h-auto w-full max-w-xl rounded-2xl object-contain shadow-2xl"
          />
          <div>
            <Mic className="h-10 w-10 text-copper" strokeWidth={1.5} />
            <h2 className="section-title mt-4">À propos</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Tandem, c'est la complicité d'une voix chaleureuse et d'une guitare sensible.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Un duo intimiste qui revisite avec élégance des chansons d'hier et d'aujourd'hui,
              pour des moments vrais, proches du public.
            </p>
          </div>
        </div>
      </section>

      {/* ÉCOUTER */}
      <section id="ecouter" className="border-t border-border/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="section-title">Écouter</h2>
          <p className="mt-2 text-muted-foreground">Quelques extraits live</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "1xtE4LcOeDs", caption: "Live — Coup de cœur" },
              { id: "yzYwXExQZgs", caption: "Soirée live" },
              { id: "hzBz-2f3EIE", caption: "Nouveau extrait" },
              { id: "ul3BOQbkQ2M", caption: "À découvrir" },
            ].map((v) => (
              <div key={v.id}>
                <div className="aspect-video overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.caption}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mt-3 text-sm text-copper">{v.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RÉPERTOIRE */}
      <section id="repertoire" className="border-t border-border/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="section-title">Répertoire</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {repertoire.map((r) => (
              <div
                key={r.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-copper/60 hover:shadow-[0_10px_40px_-10px_var(--primary)]"
              >
                <r.icon className="h-8 w-8 text-copper" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-xl text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMER */}
      <section id="programmer" className="border-t border-border/40 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="section-title">Programmer Tandem</h2>
            <ul className="mt-8 space-y-6">
              {programmer.map((p) => (
                <li key={p.label} className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-copper/40 bg-copper/10">
                    <p.icon className="h-5 w-5 text-copper" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="font-serif text-lg text-foreground">{p.label}</div>
                    <div className="text-sm text-muted-foreground">{p.text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={guitareImg}
            alt="Guitare Tandem"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* EN COURS */}
      <section id="en-cours" className="border-t border-border/40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-copper" strokeWidth={1.5} />
          <h2 className="section-title mt-4">En cours</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Prochainement des compositions originales et bien d'autres surprises !
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border/40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title">Contact</h2>
          <p className="mt-2 text-muted-foreground">Pour nous écrire ou nous programmer</p>

          <div className="mt-10 space-y-5">
            <a
              href="mailto:contact@musictandem.eu"
              className="flex items-center justify-center gap-3 text-lg text-foreground transition-colors hover:text-copper"
            >
              <Mail className="h-5 w-5 text-copper" />
              contact@musictandem.eu
            </a>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="tel:+32498141670"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-copper"
              >
                <Phone className="h-4 w-4 text-copper" />
                0498 / 141 670
              </a>
              <a
                href="tel:+32494134192"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-copper"
              >
                <Phone className="h-4 w-4 text-copper" />
                0494 / 134 192
              </a>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="https://facebook.com/Tandemgvx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-copper hover:text-copper"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/tandemgvx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-copper hover:text-copper"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://tiktok.com/@dsyness"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-copper hover:text-copper"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-12 text-center">
        <div className="font-script text-4xl text-foreground">Tandem</div>
        <p className="mt-2 text-sm tracking-widest text-muted-foreground">
          MUSIQUE · ÉMOTION · PARTAGE
        </p>
        <p className="mt-6 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Tandem. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
