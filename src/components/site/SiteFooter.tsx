import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="hud-line absolute inset-x-0 top-0 h-px opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl tracking-[0.4em] text-chrome">AETHER</p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Electric performance engineered for the next century of driving.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="label-hud text-accent">Explore</p>
          <Link to="/models" className="text-sm text-muted-foreground hover:text-foreground">Models</Link>
          <Link to="/configurator" className="text-sm text-muted-foreground hover:text-foreground">Configurator</Link>
          <Link to="/technology" className="text-sm text-muted-foreground hover:text-foreground">Technology</Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="label-hud text-accent">Lineup</p>
          <Link to="/models/$slug" params={{ slug: "spectre-gt" }} className="text-sm text-muted-foreground hover:text-foreground">Spectre GT</Link>
          <Link to="/models/$slug" params={{ slug: "aurora" }} className="text-sm text-muted-foreground hover:text-foreground">Aurora</Link>
          <Link to="/models/$slug" params={{ slug: "titan-x" }} className="text-sm text-muted-foreground hover:text-foreground">Titan X</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t border-border px-6 py-6 md:flex-row">
        <p className="label-hud text-muted-foreground">© 2026 AETHER Automotive — Concept</p>
        <p className="label-hud text-muted-foreground">Designed for the future</p>
      </div>
    </footer>
  );
}
