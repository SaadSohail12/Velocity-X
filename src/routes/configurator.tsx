import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { VehicleStage } from "@/components/site/VehicleStage";
import { PaintPicker } from "@/components/site/PaintPicker";
import { formatPrice, models } from "@/data/models";
import { cn } from "@/lib/utils";

const wheels = [
  { name: "Aero Turbine 21\"", price: 0 },
  { name: "Forged Blade 22\"", price: 5400 },
  { name: "Carbon Monoblock 22\"", price: 14800 },
];
const interiors = [
  { name: "Onyx Alcantara", price: 0 },
  { name: "Ivory Nappa", price: 3900 },
  { name: "Ember Carbon Racing", price: 8600 },
];

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Configurator — Build Your AETHER" },
      { name: "description", content: "Configure your AETHER: choose the model, paint, wheels and interior and see the price live." },
      { property: "og:title", content: "Build Your AETHER" },
      { property: "og:description", content: "Configure your AETHER: choose the model, paint, wheels and interior and see the price live." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Configurator,
});

function OptionList({
  items,
  value,
  onChange,
}: {
  items: { name: string; price: number }[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <button
          key={it.name}
          onClick={() => onChange(i)}
          className={cn(
            "flex w-full items-center justify-between border px-4 py-3 text-left text-sm transition-all",
            value === i ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted-foreground hover:border-foreground/40",
          )}
        >
          <span className="flex items-center gap-3">
            <span className={cn("flex size-4 items-center justify-center border", value === i ? "border-accent bg-accent text-accent-foreground" : "border-border")}>
              {value === i && <Check className="size-3" />}
            </span>
            {it.name}
          </span>
          <span className="font-mono text-xs">{it.price === 0 ? "Included" : `+${formatPrice(it.price)}`}</span>
        </button>
      ))}
    </div>
  );
}

function Configurator() {
  const [mi, setMi] = useState(0);
  const [paint, setPaint] = useState(0);
  const [wheel, setWheel] = useState(0);
  const [interior, setInterior] = useState(0);
  const m = models[mi] ?? models[0]!;
  const activePaint = m.paints[paint] ?? m.paints[0]!;
  const total = m.price + activePaint.price + (wheels[wheel]?.price ?? 0) + (interiors[interior]?.price ?? 0);

  return (
    <div className="pt-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 lg:grid-cols-[1.6fr_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="label-hud text-accent">Configurator</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">
            <span className="text-chrome">Build your {m.name}</span>
          </h1>
          <div className="relative mt-8">
            <div className="hud-grid absolute inset-0 opacity-40" />
            <VehicleStage key={m.slug} image={m.image} alt={m.name} filter={activePaint.filter} priority />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              ["0–100", `${m.stats.zeroTo100}s`],
              ["Top speed", `${m.stats.topSpeed} km/h`],
              ["Range", `${m.stats.range} km`],
            ].map(([l, v]) => (
              <div key={l} className="border-t border-border pt-3">
                <p className="label-hud text-muted-foreground">{l}</p>
                <p className="mt-1 font-display text-lg">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="hud-corners space-y-10 border border-border bg-card/60 p-6 md:p-8">
          <div>
            <p className="label-hud text-muted-foreground">01 · Model</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {models.map((x, i) => (
                <button
                  key={x.slug}
                  onClick={() => {
                    setMi(i);
                    setPaint(0);
                  }}
                  className={cn(
                    "border px-2 py-3 text-xs transition-all",
                    mi === i ? "border-primary bg-primary/15 text-foreground shadow-glow" : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {x.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="label-hud mb-4 text-muted-foreground">02 · Paint</p>
            <PaintPicker paints={m.paints} value={paint} onChange={setPaint} />
          </div>
          <div>
            <p className="label-hud mb-4 text-muted-foreground">03 · Wheels</p>
            <OptionList items={wheels} value={wheel} onChange={setWheel} />
          </div>
          <div>
            <p className="label-hud mb-4 text-muted-foreground">04 · Interior</p>
            <OptionList items={interiors} value={interior} onChange={setInterior} />
          </div>
          <div className="border-t border-border pt-6">
            <div className="flex items-end justify-between">
              <p className="label-hud text-muted-foreground">Total</p>
              <p key={total} className="animate-in fade-in slide-in-from-bottom-2 font-display text-3xl duration-500">
                {formatPrice(total)}
              </p>
            </div>
            <Button
              variant="hero"
              size="xl"
              className="mt-6 w-full"
              onClick={() =>
                toast.success(`${m.name} reserved`, {
                  description: `${activePaint.name} · ${formatPrice(total)} — our team will contact you.`,
                })
              }
            >
              Reserve this build
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
