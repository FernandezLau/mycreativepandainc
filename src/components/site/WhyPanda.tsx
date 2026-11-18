import { Award, GraduationCap, Landmark, Sparkles } from "lucide-react";
import { SectionHeading } from "./Section";

export function WhyPanda() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 grid-lines-light" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why build with Panda"
          title={<>Work that matters. A team that grows you.</>}
          description="Every line of code you write here helps a municipality serve its citizens faster."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-6 md:grid-rows-2">
          {/* Impact — large */}
          <article className="group relative overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground lift md:col-span-4 md:row-span-1">
            <div className="absolute inset-0 card-glow" aria-hidden />
            <div className="absolute inset-0 grid-lines opacity-70" aria-hidden />
            <div className="relative">
              <Landmark className="h-8 w-8 text-mint" />
              <h3 className="mt-6 text-2xl font-bold">Real National Impact</h3>
              <p className="mt-2 max-w-md text-ink-muted">
                Develop systems used by dozens of LGUs across Luzon, Visayas and Mindanao — permits, barangay
                records, franchises and libraries, all running on code our team ships.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["EBPLS", "EBIS", "ETRISYS", "ELIS", "EWBS", "EHRMIS"].map((s) => (
                  <span key={s} className="rounded-full glass-dark px-3 py-1 font-mono text-xs text-mint transition-colors group-hover:border-primary">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Stability */}
          <article className="relative overflow-hidden rounded-3xl bg-mint-gradient p-8 text-primary-foreground lift md:col-span-2">
            <Award className="h-8 w-8" />
            <p className="mt-6 text-6xl font-extrabold tracking-tighter">18+</p>
            <h3 className="mt-1 text-xl font-bold">Years of Stability</h3>
            <p className="mt-2 text-sm opacity-80">
              Established in 2006 with long-term public and private sector clients.
            </p>
          </article>

          {/* Mentorship */}
          <article className="rounded-3xl border border-border bg-card p-8 shadow-card lift md:col-span-3">
            <GraduationCap className="h-8 w-8 text-accent-foreground" />
            <h3 className="mt-6 text-xl font-bold">Continuous Mentorship & Growth</h3>
            <p className="mt-2 text-muted-foreground">Dedicated pathways from junior to tech lead.</p>
            <ol className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase">
              {["Assistant", "Developer", "Senior", "Tech Lead"].map((step, i, arr) => (
                <li key={step} className="flex items-center gap-2">
                  <span className={i === arr.length - 1 ? "rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground" : "rounded-full bg-accent px-2.5 py-1 text-accent-foreground"}>
                    {step}
                  </span>
                  {i < arr.length - 1 && <span className="h-px w-4 bg-border" />}
                </li>
              ))}
            </ol>
          </article>

          {/* Package */}
          <article className="rounded-3xl border border-border bg-card p-8 shadow-card lift md:col-span-3">
            <Sparkles className="h-8 w-8 text-accent-foreground" />
            <h3 className="mt-6 text-xl font-bold">Competitive Package & Culture</h3>
            <p className="mt-2 text-muted-foreground">Everything you need to do your best work.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Work-life balance", "Performance incentives", "Collaborative team", "Modern tooling", "Gov't benefits"].map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
