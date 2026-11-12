import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  mask = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  mask?: boolean;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;
  // IntersectionObserver ignores fully clipped elements, so the clip lives on an inner wrapper.
  if (mask) {
    return (
      <Tag ref={ref} className={className}>
        <div data-visible={visible} className="reveal-mask h-full w-full" style={style}>
          {children}
        </div>
      </Tag>
    );
  }
  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
