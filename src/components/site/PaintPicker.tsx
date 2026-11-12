import type { Paint } from "@/data/models";
import { cn } from "@/lib/utils";

export function PaintPicker({
  paints,
  value,
  onChange,
}: {
  paints: Paint[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {paints.map((p, i) => (
          <button
            key={p.name}
            onClick={() => onChange(i)}
            aria-label={p.name}
            aria-pressed={value === i}
            className={cn(
              "relative size-11 rounded-full border border-border transition-all duration-300 hover:scale-110",
              value === i && "scale-110 ring-2 ring-accent ring-offset-4 ring-offset-background",
            )}
            style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, ${p.swatch} 60%, white), ${p.swatch} 55%, color-mix(in oklab, ${p.swatch} 60%, black))` }}
          />
        ))}
      </div>
      <p className="mt-4 font-display text-sm tracking-widest">{paints[value]?.name}</p>
    </div>
  );
}
