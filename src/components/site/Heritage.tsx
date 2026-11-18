import { CLIENTS, E_SYSTEMS } from "@/lib/site";
import { SectionHeading } from "./Section";

export function ClientRibbon() {
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <div className="relative overflow-hidden border-y border-ink-border py-6">
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((c, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-semibold whitespace-nowrap text-ink-muted">
            {c}
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SystemsGrid({ limit }: { limit?: number }) {
  const items = limit ? E_SYSTEMS.slice(0, limit) : E_SYSTEMS;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <article key={s.code} className="group relative overflow-hidden rounded-3xl glass-dark p-6 lift hover:border-primary">
          <div className="absolute inset-0 card-glow opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
          <div className="relative">
            <span className="font-mono text-2xl font-bold text-mint">{s.code}</span>
            <h3 className="mt-3 font-bold text-ink-foreground">{s.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Heritage() {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="absolute inset-0 grid-lines" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <SectionHeading
          tone="light"
          eyebrow="Agency heritage"
          title={<>Trusted by the institutions <span className="text-mint-gradient">that serve Filipinos.</span></>}
          description="From the National Library to city halls and municipal offices, our systems run where it counts."
        />
      </div>
      <div className="relative mt-12">
        <ClientRibbon />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h3 className="font-mono text-xs tracking-widest text-mint uppercase">E-Systems you'll work on</h3>
        <div className="mt-6">
          <SystemsGrid limit={4} />
        </div>
      </div>
    </section>
  );
}
