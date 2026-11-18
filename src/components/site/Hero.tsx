import { ArrowDown, Building2, Clock3, MapPin, Rocket, Users } from "lucide-react";
import heroImg from "@/assets/hero-team.jpg";
import { Button } from "@/components/ui/button";
import { JOBS, DEPARTMENTS } from "@/lib/jobs";
import { Eyebrow } from "./Section";
import { useApply } from "./apply-context";
import { useScrollToJobs } from "./SiteHeader";

export function Hero() {
  const { openApply } = useApply();
  const scrollToJobs = useScrollToJobs();
  const pills = [
    { icon: Rocket, label: `${JOBS.length} Open Roles` },
    { icon: Users, label: `${DEPARTMENTS.length} Departments` },
    { icon: MapPin, label: "Tarlac City Tech Hub" },
    { icon: Clock3, label: "48h Review Guarantee" },
  ];

  return (
    <section className="relative overflow-hidden bg-hero text-ink-foreground">
      <div className="absolute inset-0 grid-lines" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-16 pb-20 sm:px-6 md:pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
        <div>
          <Eyebrow tone="light">We're hiring · 2026</Eyebrow>
          <h1 className="mt-6 text-4xl leading-[1.04] font-extrabold sm:text-6xl lg:text-7xl">
            Build Technology That <span className="text-mint-gradient">Powers the Nation.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Join Tarlac's premier software powerhouse. We engineer mission-critical e-governance platforms,
            enterprise systems, and digital solutions serving Philippine municipalities and national agencies
            since 2006.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {pills.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-sm font-medium">
                <Icon className="h-3.5 w-3.5 text-mint" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="hero" size="xl" onClick={scrollToJobs}>
              Browse {JOBS.length} Open Roles <ArrowDown />
            </Button>
            <Button variant="glass" size="xl" onClick={() => openApply()}>
              Fast-Track Application
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-ink-border shadow-lift">
            <img
              src={heroImg}
              alt="My Creative Panda developers building e-governance systems"
              width={1600}
              height={1008}
              className="aspect-[4/3.4] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl glass-dark px-4 py-3 shadow-lift animate-float sm:-left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-gradient">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </span>
            <div>
              <p className="text-xl font-extrabold">18+ years</p>
              <p className="text-xs text-ink-muted">serving LGUs & agencies</p>
            </div>
          </div>

          <div className="absolute -top-5 right-4 rounded-2xl glass-dark px-4 py-3 shadow-lift animate-float [animation-delay:-3s]">
            <p className="font-mono text-[10px] tracking-widest text-mint uppercase">Live systems</p>
            <p className="mt-1 text-sm font-semibold">EBPLS · EBIS · ETRISYS · ELIS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
