import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { formatPrice, models } from "@/data/models";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/models/")({
  head: () => ({
    meta: [
      { title: "Models — Spectre GT, Aurora & Titan X | AETHER" },
      { name: "description", content: "Explore the AETHER lineup: an electric hypercar, a grand touring sedan and a performance SUV." },
      { property: "og:title", content: "AETHER Models" },
      { property: "og:description", content: "Explore the AETHER lineup: an electric hypercar, a grand touring sedan and a performance SUV." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ModelsPage,
});

function ModelsPage() {
  return (
    <div className="pt-36">
      <section className="mx-auto max-w-7xl px-6">
        <p className="label-hud animate-rise text-accent">The lineup · 2027</p>
        <h1 className="animate-rise mt-6 font-display text-5xl [animation-delay:150ms] md:text-7xl">
          <span className="text-chrome">Models</span>
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-muted-foreground [animation-delay:300ms]">
          Every AETHER is fully electric, built on carbon and powered by solid-state cells.
        </p>
      </section>

      <div className="mt-20 space-y-32 pb-32 md:space-y-44">
        {models.map((m, i) => (
          <section key={m.slug} className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-12">
            <Reveal className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
              <Link to="/models/$slug" params={{ slug: m.slug }} className="group block overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  width={1600}
                  height={912}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="mask-stage w-full transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </Link>
            </Reveal>
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel index={m.code}>{m.category}</SectionLabel>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-6 font-display text-4xl md:text-5xl">{m.name}</h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-3 text-lg text-ember">{m.tagline}</p>
                <p className="mt-6 text-muted-foreground">{m.description}</p>
              </Reveal>
              <Reveal delay={300} className="mt-10 grid grid-cols-3 gap-4 border-y border-border py-6">
                <div>
                  <p className="font-display text-2xl">{m.stats.zeroTo100}s</p>
                  <p className="label-hud mt-1 text-muted-foreground">0–100</p>
                </div>
                <div>
                  <p className="font-display text-2xl">{m.stats.topSpeed}</p>
                  <p className="label-hud mt-1 text-muted-foreground">km/h</p>
                </div>
                <div>
                  <p className="font-display text-2xl">{m.stats.power}</p>
                  <p className="label-hud mt-1 text-muted-foreground">hp</p>
                </div>
              </Reveal>
              <Reveal delay={400} className="mt-8 flex flex-wrap items-center gap-6">
                <Button asChild variant="hero" size="lg">
                  <Link to="/models/$slug" params={{ slug: m.slug }}>
                    Explore <ArrowRight />
                  </Link>
                </Button>
                <p className="font-mono text-sm text-muted-foreground">From {formatPrice(m.price)}</p>
              </Reveal>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
