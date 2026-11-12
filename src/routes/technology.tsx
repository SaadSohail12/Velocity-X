import { createFileRoute, Link } from "@tanstack/react-router";
import { BatteryCharging, Brain, Cpu, Wind } from "lucide-react";
import interiorImg from "@/assets/interior.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

const features = [
  { icon: Brain, title: "Neural Drive AI", text: "An onboard model reads the road 300 m ahead and pre-loads suspension, torque and aero before you reach the corner." },
  { icon: BatteryCharging, title: "Solid-state core", text: "Ceramic-electrolyte cells deliver 40% more energy density and charge 10–80% in under ten minutes." },
  { icon: Wind, title: "Morphing aero", text: "Thirty-two active surfaces reshape the body in milliseconds, from 0.19 Cd cruising to full downforce." },
  { icon: Cpu, title: "Quantum HUD", text: "A full-windshield augmented display paints racing lines, hazards and navigation directly onto the world." },
];

const timeline = [
  ["2019", "AETHER founded in a Modena garage"],
  ["2022", "First solid-state prototype laps the Nordschleife"],
  ["2025", "Neural Drive AI reaches Level-4 autonomy"],
  ["2027", "Spectre GT production begins — 499 units"],
];

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — Neural Drive, Solid-State & Active Aero | AETHER" },
      { name: "description", content: "Inside AETHER: neural driving AI, solid-state batteries, morphing aerodynamics and a full-windshield HUD." },
      { property: "og:title", content: "AETHER Technology" },
      { property: "og:description", content: "Inside AETHER: neural driving AI, solid-state batteries, morphing aerodynamics and a full-windshield HUD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Technology,
});

function Technology() {
  return (
    <>
      <section className="letterbox relative h-[90svh] min-h-[600px] overflow-hidden">
        <img src={interiorImg} alt="AETHER cockpit at night" width={1920} height={1088} className="animate-kenburns h-full w-full object-cover" />
        <div className="fade-bottom absolute inset-0" />
        <div className="fade-top absolute inset-0" />
        <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-20">
          <p className="label-hud animate-rise text-accent [animation-delay:1.2s]">Technology</p>
          <h1 className="animate-rise mt-4 max-w-3xl font-display text-4xl leading-tight [animation-delay:1.4s] md:text-6xl">
            <span className="text-chrome">Intelligence,</span> <span className="text-ember">engineered.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28">
        <Reveal>
          <SectionLabel index="01">Core systems</SectionLabel>
        </Reveal>
        <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120} className="group bg-background p-8 transition-colors hover:bg-card md:p-12">
              <div className="flex size-12 items-center justify-center border border-accent/50 text-accent transition-all group-hover:shadow-hud">
                <f.icon className="size-5" />
              </div>
              <p className="label-hud mt-8 text-muted-foreground">0{i + 1}</p>
              <h2 className="mt-2 font-display text-2xl">{f.title}</h2>
              <p className="mt-4 max-w-md text-muted-foreground">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel index="02">Timeline</SectionLabel>
          </Reveal>
          <div className="relative mt-14 grid gap-10 md:grid-cols-4">
            <div className="hud-line absolute left-0 right-0 top-[7px] hidden h-px md:block" />
            {timeline.map(([year, text], i) => (
              <Reveal key={year} delay={i * 150} className="relative">
                <span className="block size-4 rotate-45 border border-accent bg-background" />
                <p className="mt-6 font-display text-3xl text-ember">{year}</p>
                <p className="mt-3 text-sm text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl">Feel it for yourself.</h2>
        </Reveal>
        <Reveal delay={150} className="mt-10">
          <Button asChild variant="hero" size="xl">
            <Link to="/configurator">Build your AETHER</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
