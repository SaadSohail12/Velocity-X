import { useRef, useState, type MouseEvent } from "react";
import { Plus } from "lucide-react";
import type { Hotspot } from "@/data/models";
import { cn } from "@/lib/utils";

/** Interactive vehicle viewer: mouse-driven 3D tilt, live paint filter, clickable hotspots. */
export function VehicleStage({
  image,
  alt,
  filter,
  hotspots = [],
  priority = false,
}: {
  image: string;
  alt: string;
  filter: string;
  hotspots?: Hotspot[];
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<number | null>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -6, y: px * 10 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative [perspective:1600px]"
    >
      <div
        className="relative transition-transform duration-500 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={alt}
            width={1600}
            height={912}
            loading={priority ? "eager" : "lazy"}
            className="paint mask-stage h-auto w-full"
            style={{ filter }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 overflow-hidden">
            <div className="hud-line animate-scan h-px w-full opacity-60" />
          </div>
        </div>

        {hotspots.map((h, i) => (
          <button
            key={h.title}
            onClick={() => setActive(active === i ? null : i)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            aria-label={h.title}
          >
            <span className="animate-pulse-ring absolute inset-0 rounded-full border border-accent" />
            <span
              className={cn(
                "relative flex size-8 items-center justify-center rounded-full border border-accent bg-background/70 text-accent backdrop-blur transition-all",
                active === i && "rotate-45 bg-accent text-accent-foreground",
              )}
            >
              <Plus className="size-4" />
            </span>
          </button>
        ))}
      </div>

      {active !== null && hotspots[active] && (
        <div
          key={active}
          className="glass hud-corners animate-in fade-in slide-in-from-bottom-4 absolute bottom-4 left-4 right-4 z-10 max-w-sm border border-border p-5 duration-500 md:left-6"
        >
          <p className="label-hud text-accent">Feature 0{active + 1}</p>
          <p className="mt-2 font-display text-sm tracking-wider">{hotspots[active].title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{hotspots[active].detail}</p>
        </div>
      )}
    </div>
  );
}
