export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="label-hud flex items-center gap-3 text-accent">
      <span>{index}</span>
      <span className="h-px w-10 bg-accent/60" />
      <span className="text-muted-foreground">{children}</span>
    </div>
  );
}
