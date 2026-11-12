import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { SectionLabel } from "@/components/site/SectionLabel";
import { VehicleStage } from "@/components/site/VehicleStage";
import { PaintPicker } from "@/components/site/PaintPicker";
import { DriveModes } from "@/components/site/DriveModes";
import { formatPrice, getModel, models } from "@/data/models";

export const Route = createFileRoute("/models/$slug")({
  loader: ({ params }) => {
    const model = getModel(params.slug);
    if (!model) throw notFound();
    return { model };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.model;
    if (!m) return { meta: [{ title: "Model not found | AETHER" }, { name: "robots", content: "noindex" }] };
    const title = `${m.name} — ${m.category} | AETHER`;
    return {
      meta: [
        { title },
        { name: "description", content: m.description },
        { property: "og:title", content: title },
        { property: "og:description", content: m.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="label-hud text-accent">Signal lost</p>
      <h1 className="font-display text-3xl">This model doesn't exist yet.</h1>
      <Button asChild variant="hud">
        <Link to="/models">View all models</Link>
      </Button>
    </div>
  ),
  component: ModelPage,
});

function ModelPage() {
  const { model: m } = Route.useLoaderData();
  const [paint, setPaint] = useState(0);
  const idx = models.findIndex((x) => x.slug === m.slug);
  const next = models[(idx + 1) % models.length] ?? models[0]!;
  const activePaint = m.paints[paint] ?? m.paints[0]!;

  return (
    <div key={m.slug}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36">
        <div className="hud-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <p className="pointer-events-none absolute left-1/2 top-28 -translate-x-1/2 whitespace-nowrap font-display text-[16vw] leading-none text-foreground/[0.04]">
          {m.name.toUpperCase()}
        </p>
        <div className="relative mx-auto max-w-7xl px-6">
          <Link to="/models" className="label-hud inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3" /> All models
          </Link>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-hud animate-rise text-accent">{m.code} · {m.category}</p>
              <h1 className="animate-rise mt-4 font-display text-5xl [animation-delay:150ms] md:text-7xl">
                <span className="text-chrome">{m.name}</span>
              </h1>
              <p className="animate-rise mt-4 text-lg text-ember [animation-delay:300ms]">{m.tagline}</p>
            </div>
            <div className="animate-rise text-right [animation-delay:450ms]">
              <p className="label-hud text-muted-foreground">Starting at</p>
              <p className="mt-1 font-display text-2xl">{formatPrice(m.price)}</p>
            </div>
          </div>

          <div className="animate-rise mt-10 [animation-delay:500ms]">
            <VehicleStage image={m.image} alt={m.name} filter={activePaint.filter} hotspots={m.hotspots} priority />
          </div>
          <p className="label-hud mt-4 text-center text-muted-foreground">Move to tilt · Tap the markers to explore</p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            { v: m.stats.topSpeed, d: 0, u: "km/h", l: "Top speed" },
            { v: m.stats.zeroTo100, d: 1, u: "sec", l: "0 – 100 km/h" },
            { v: m.stats.power, d: 0, u: "hp", l: "Power" },
            { v: m.stats.range, d: 0, u: "km", l: "Range" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100} className="bg-background p-6 md:p-10">
              <p className="font-display text-4xl md:text-5xl">
                <CountUp to={s.v} decimals={s.d} />
              </p>
              <p className="mt-2 font-mono text-sm text-accent">{s.u}</p>
              <p className="label-hud mt-6 text-muted-foreground">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Paint + description */}
      <section className="border-y border-border bg-card/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionLabel index="01">Overview</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 text-xl leading-relaxed text-foreground/90 md:text-2xl">{m.description}</p>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <SectionLabel index="02">Colour variations</SectionLabel>
            </Reveal>
            <Reveal delay={100} className="mt-8">
              <PaintPicker paints={m.paints} value={paint} onChange={setPaint} />
              <p className="mt-2 font-mono text-sm text-muted-foreground">
                {activePaint.price === 0 ? "Included" : `+ ${formatPrice(activePaint.price)}`}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Specs + modes */}
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionLabel index="03">Specifications</SectionLabel>
          </Reveal>
          <dl className="mt-10">
            {m.specs.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="flex items-center justify-between border-b border-border py-5">
                <dt className="label-hud text-muted-foreground">{s.label}</dt>
                <dd className="font-display text-sm tracking-wider md:text-base">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <div>
          <Reveal>
            <SectionLabel index="04">Drive modes</SectionLabel>
          </Reveal>
          <Reveal delay={150} className="mt-10">
            <DriveModes modes={m.modes} />
          </Reveal>
        </div>
      </section>

      {/* Next model */}
      <Link
        to="/models/$slug"
        params={{ slug: next.slug }}
        className="group relative block overflow-hidden border-t border-border"
      >
        <img
          src={next.image}
          alt={next.name}
          width={1600}
          height={912}
          loading="lazy"
          className="h-[50vh] w-full object-cover opacity-40 transition-all duration-[1.2s] group-hover:scale-105 group-hover:opacity-70"
        />
        <div className="fade-left absolute inset-0" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-6">
          <p className="label-hud text-accent">Next model</p>
          <p className="mt-4 flex items-center gap-4 font-display text-4xl md:text-6xl">
            {next.name} <ArrowRight className="size-8 transition-transform group-hover:translate-x-3" />
          </p>
        </div>
      </Link>
    </div>
  );
}
