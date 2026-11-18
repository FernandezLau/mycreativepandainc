import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] font-medium tracking-widest uppercase",
        tone === "light" ? "glass-dark text-mint" : "bg-accent text-accent-foreground",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className={cn("mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl", tone === "light" && "text-ink-foreground")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-ink-muted" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-hero text-ink-foreground">
      <div className="absolute inset-0 grid-lines" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{description}</p>
        {children}
      </div>
    </section>
  );
}
