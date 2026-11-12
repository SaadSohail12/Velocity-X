import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-car.jpg";
import interiorImg from "@/assets/interior.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { SectionLabel } from "@/components/site/SectionLabel";
import { PaintPicker } from "@/components/site/PaintPicker";
import { models } from "@/data/models";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AETHER — Beyond Velocity | Futuristic Electric Hypercars" },
      { name: "description", content: "Meet Spectre GT, Aurora and Titan X — AETHER's futuristic electric performance lineup." },
      { property: "og:title", content: "AETHER — Beyond Velocity" },
      { property: "og:description", content: "Meet Spectre GT, Aurora and Titan X — AETHER's futuristic electric performance lineup." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { ref, p };
}

function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="letterbox relative h-[100svh] min-h-[640px] overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `translateY(${y * 0.35}px)` }}>
        <img
          src={heroImg}
          alt="AETHER Spectre GT in a dark concrete studio"
          width={1920}
          height={1088}
          className="animate-kenburns h-full w-full object-cover object-[70%_center]"
        />
      </div>
      <div className="fade-left absolute inset-0" />
      <div className="fade-bottom absolute inset-0" />
      <div className="hud-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_right,black,transparent_60%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
        <p className="label-hud animate-rise text-accent [animation-delay:1.2s]">AX-01 · Spectre GT · 2027</p>
        <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          <span className="animate-rise block text-chrome [animation-delay:1.4s]">Beyond</span>
          <span className="animate-rise block text-ember [animation-delay:1.6s]">Velocity</span>
        </h1>
        <p className="animate-rise mt-8 max-w-md text-base text-muted-foreground [animation-delay:1.8s] md:text-lg">
          1,480 horsepower. Zero emissions. The first electric hypercar that sounds like the future — silence.
        </p>
        <div className="animate-rise mt-10 flex flex-wrap gap-4 [animation-delay:2s]">
          <Button asChild variant="hero" size="xl">
            <Link to="/models/$slug" params={{ slug: "spectre-gt" }}>
              Discover Spectre <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="hud" size="xl">
            <Link to="/configurator">Build yours</Link>
          </Button>
        </div>
      </div>

      {/* HUD telemetry */}
      <div className="animate-rise absolute bottom-24 right-6 z-10 hidden gap-10 [animation-delay:2.2s] md:flex lg:right-12">
        {[
          ["Top speed", "412", "km/h"],
          ["0–100", "1.9", "sec"],
          ["Range", "620", "km"],
        ].map(([l, v, u]) => (
          <div key={l} className="border-l border-accent/50 pl-4">
            <p className="label-hud text-muted-foreground">{l}</p>
            <p className="mt-1 font-display text-2xl">
              {v} <span className="font-mono text-xs text-accent">{u}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="label-hud text-muted-foreground">Scroll</p>
        <ChevronDown className="animate-float-y mx-auto mt-2 size-5 text-accent" />
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Electric", "Hypercar", "Solid-state", "Active aero", "Autonomous", "Carbon", "Zero emission"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-border py-6">
      <div className="animate-marquee flex w-max gap-16">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-16 font-display text-2xl tracking-[0.3em] text-foreground/20 md:text-4xl">
            {w}
            <span className="size-2 rotate-45 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    { v: 412, d: 0, u: "km/h", l: "Top speed" },
    { v: 1.9, d: 1, u: "sec", l: "0 – 100 km/h" },
    { v: 1480, d: 0, u: "hp", l: "Peak power" },
    { v: 860, d: 0, u: "km", l: "Max range" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <Reveal>
        <SectionLabel index="01">Performance</SectionLabel>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-6 max-w-3xl font-display text-3xl leading-tight md:text-5xl">
          Numbers that rewrite <span className="text-ember">physics.</span>
        </h2>
      </Reveal>
      <div className="mt-20 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 120} className="bg-background p-6 md:p-10">
            <p className="font-display text-4xl md:text-6xl">
              <CountUp to={s.v} decimals={s.d} />
            </p>
            <p className="mt-2 font-mono text-sm text-accent">{s.u}</p>
            <p className="label-hud mt-6 text-muted-foreground">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DriveBy() {
  const { ref, p } = useScrollProgress<HTMLElement>();
  const gt = models[0]!;
  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="hud-grid absolute inset-0 opacity-30" />
        <p
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[18vw] leading-none text-foreground/[0.04]"
          style={{ transform: `translate(calc(-50% + ${(0.5 - p) * 40}vw), -50%)` }}
        >
          SPECTRE
        </p>
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div style={{ opacity: Math.min(1, p * 4) }}>
              <SectionLabel index="02">Aerodynamics</SectionLabel>
              <h2 className="mt-4 font-display text-3xl md:text-5xl">Sculpted by wind.</h2>
            </div>
            <p className="font-mono text-sm text-accent">
              Cd {(0.38 - p * 0.17).toFixed(3)}
            </p>
          </div>
          <img
            src={gt.image}
            alt="Spectre GT side profile"
            width={1600}
            height={912}
            loading="lazy"
            className="mask-stage mt-10 w-full"
            style={{
              transform: `translateX(${(1 - p) * 60 - 20}%) scale(${0.85 + p * 0.15})`,
              filter: `blur(${Math.max(0, (0.3 - p) * 12)}px)`,
            }}
          />
          <div className="mt-6 grid grid-cols-3 gap-6">
            {[
              ["Downforce", `${Math.round(p * 1100)} kg`],
              ["Wing angle", `${Math.round(p * 24)}°`],
              ["Speed", `${Math.round(p * 412)} km/h`],
            ].map(([l, v]) => (
              <div key={l} className="border-t border-border pt-4">
                <p className="label-hud text-muted-foreground">{l}</p>
                <p className="mt-2 font-display text-lg md:text-2xl">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Lineup() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <SectionLabel index="03">The lineup</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-3xl md:text-5xl">Three paths to the future.</h2>
          </Reveal>
        </div>
        <Button asChild variant="hud">
          <Link to="/models">All models <ArrowRight /></Link>
        </Button>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {models.map((m, i) => (
          <Reveal key={m.slug} delay={i * 150}>
            <Link
              to="/models/$slug"
              params={{ slug: m.slug }}
              className="group hud-corners relative block overflow-hidden border border-border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  width={1600}
                  height={912}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
              </div>
              <div className="fade-bottom pointer-events-none absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="label-hud text-accent">{m.code} · {m.category}</p>
                <p className="mt-2 font-display text-2xl">{m.name}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ColorTeaser() {
  const gt = models[0]!;
  const [paint, setPaint] = useState(0);
  return (
    <section className="relative overflow-hidden border-y border-border bg-card/40 py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_2fr]">
        <div>
          <Reveal>
            <SectionLabel index="04">Colour studio</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-3xl md:text-4xl">Your signature, in paint.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-muted-foreground">
              Six hand-layered finishes, each with up to eleven coats. Pick one and watch Spectre transform.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-10">
            <PaintPicker paints={gt.paints} value={paint} onChange={setPaint} />
          </Reveal>
          <Reveal delay={400} className="mt-10">
            <Button asChild variant="hero" size="lg">
              <Link to="/configurator">Open configurator</Link>
            </Button>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <img
            src={gt.image}
            alt={`Spectre GT in ${(gt.paints[paint] ?? gt.paints[0]!).name}`}
            width={1600}
            height={912}
            loading="lazy"
            className="paint mask-stage w-full"
            style={{ filter: (gt.paints[paint] ?? gt.paints[0]!).filter }}
          />
        </Reveal>
      </div>
    </section>
  );
}

function TechTeaser() {
  return (
    <section className="relative h-[90vh] min-h-[560px] overflow-hidden">
      <Reveal mask className="absolute inset-0">
        <img src={interiorImg} alt="AETHER cockpit with holographic display" width={1920} height={1088} className="h-full w-full object-cover" />
      </Reveal>
      <div className="fade-top absolute inset-0" />
      <div className="fade-bottom absolute inset-0" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20">
        <Reveal>
          <SectionLabel index="05">Neural cockpit</SectionLabel>
        </Reveal>
        <Reveal delay={150}>
          <h2 className="mt-6 max-w-2xl font-display text-3xl md:text-5xl">A car that thinks one corner ahead.</h2>
        </Reveal>
        <Reveal delay={300} className="mt-8">
          <Button asChild variant="hud" size="lg">
            <Link to="/technology">Explore technology <ArrowRight /></Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden py-32 text-center md:py-44">
      <div className="hud-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="label-hud text-accent">Limited to 499 units</p>
        </Reveal>
        <Reveal delay={150}>
          <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
            The future has a <span className="text-ember">waiting list.</span>
          </h2>
        </Reveal>
        <Reveal delay={300} className="mt-12 flex justify-center gap-4">
          <Button asChild variant="hero" size="xl">
            <Link to="/configurator">Reserve now</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <DriveBy />
      <Lineup />
      <ColorTeaser />
      <TechTeaser />
      <FinalCta />
    </>
  );
}
