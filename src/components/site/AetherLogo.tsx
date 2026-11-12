import { cn } from "@/lib/utils";

/** AETHER emblem: shield outline, blade "A", ember chevron. */
export function AetherLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={cn("h-11 w-auto", className)} aria-hidden="true">
      <path
        d="M24 2 L44 10 V30 C44 42 35 50 24 54 C13 50 4 42 4 30 V10 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M24 8.5 L40 14.5 V30" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.8" />
      <path d="M24 12 L36.5 43 H31.2 L24 24.5 L16.8 43 H11.5 Z" fill="currentColor" />
      <path d="M17.5 36 L24 31.5 L30.5 36 L28.6 38.2 L24 35 L19.4 38.2 Z" className="fill-primary" />
    </svg>
  );
}
