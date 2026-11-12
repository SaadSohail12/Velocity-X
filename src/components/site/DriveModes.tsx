import { useState } from "react";
import type { DriveMode } from "@/data/models";
import { cn } from "@/lib/utils";

const bars: { key: keyof Omit<DriveMode, "name">; label: string }[] = [
  { key: "power", label: "Power output" },
  { key: "response", label: "Throttle response" },
  { key: "aero", label: "Active aero" },
  { key: "efficiency", label: "Efficiency" },
];

export function DriveModes({ modes }: { modes: DriveMode[] }) {
  const [i, setI] = useState(1);
  const mode = modes[i] ?? modes[0]!;
  return (
    <div className="hud-corners border border-border bg-card/60 p-6 md:p-8">
      <div className="flex gap-2">
        {modes.map((m, idx) => (
          <button
            key={m.name}
            onClick={() => setI(idx)}
            className={cn(
              "label-hud flex-1 border px-3 py-3 transition-all",
              idx === i
                ? "border-primary bg-primary/15 text-foreground shadow-glow"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="mt-8 space-y-6">
        {bars.map((b) => (
          <div key={b.key}>
            <div className="flex justify-between">
              <span className="label-hud text-muted-foreground">{b.label}</span>
              <span className="font-mono text-sm text-accent">{mode[b.key]}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden bg-muted">
              <div
                className="bg-ember h-full transition-[width] duration-700 ease-out"
                style={{ width: `${mode[b.key]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
