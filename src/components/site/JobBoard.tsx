import { useMemo, useState } from "react";
import { ArrowUpRight, Briefcase, CheckCircle2, MapPin, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DEPARTMENTS, JOBS, countByDepartment, filterJobs, type Department, type Job } from "@/lib/jobs";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./Section";
import { useApply } from "./apply-context";

export function JobBoard() {
  const [dept, setDept] = useState<"All" | Department>("All");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Job | null>(null);
  const { openApply } = useApply();
  const counts = useMemo(() => countByDepartment(), []);
  const jobs = useMemo(() => filterJobs(JOBS, dept, query), [dept, query]);

  const tabs: ("All" | Department)[] = ["All", ...DEPARTMENTS];

  return (
    <section id="jobs" className="bg-muted/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={`${JOBS.length} open roles`}
            title="Find your seat at the table."
            description="All roles are full-time and onsite at our Tarlac City tech hub."
          />
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title or keyword…"
              aria-label="Search positions"
              className="h-12 rounded-full bg-card pl-11 shadow-card"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div role="tablist" aria-label="Departments" className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={dept === t}
              onClick={() => setDept(t)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                dept === t
                  ? "border-secondary bg-secondary text-secondary-foreground shadow-card"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {t}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-mono text-[11px]",
                  dept === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {counts[t]}
              </span>
            </button>
          ))}
        </div>

        {jobs.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-input bg-card p-12 text-center">
            <p className="text-lg font-semibold">No roles match "{query}"</p>
            <p className="mt-1 text-muted-foreground">Try another keyword — or send us an open application.</p>
            <Button variant="ink" size="lg" className="mt-6" onClick={() => openApply()}>
              Send open application
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card lift hover:border-primary"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-medium text-accent-foreground uppercase">
                    {job.department}
                  </span>
                  <Briefcase className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent-foreground" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{job.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{job.summary}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
                  <span className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1">{job.type}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <span key={t} className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-2 pt-6">
                  <Button variant="pill" className="flex-1" onClick={() => setDetail(job)}>
                    View Details
                  </Button>
                  <Button variant="hero" className="flex-1" onClick={() => openApply(job.id)}>
                    Apply Now
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-lg">
          {detail && (
            <>
              <DialogHeader className="text-left">
                <span className="font-mono text-xs tracking-widest text-accent-foreground uppercase">
                  {detail.department} · {detail.type}
                </span>
                <DialogTitle className="text-2xl font-bold">{detail.title}</DialogTitle>
                <DialogDescription>{detail.summary}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-1.5">
                {detail.tags.map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-1 text-xs font-medium">{t}</span>
                ))}
              </div>
              <DetailList title="What you'll do" items={detail.responsibilities} />
              <DetailList title="What we're looking for" items={detail.qualifications} />
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {detail.location}
              </p>
              <Button
                variant="hero"
                size="lg"
                onClick={() => {
                  const id = detail.id;
                  setDetail(null);
                  openApply(id);
                }}
              >
                Apply for this role <ArrowUpRight />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold">{title}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" /> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
