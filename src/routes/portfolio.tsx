import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { CLIENTS } from "@/lib/site";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — My Creative Panda" },
      { name: "description", content: "Websites and systems built for LGUs, national agencies and private brands across the Philippines." },
      { property: "og:title", content: "Portfolio — My Creative Panda" },
      { property: "og:description", content: "Trusted by the National Library, City of Caloocan, Landbank Insurance Brokerage and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const PROJECTS = [
  { name: "Municipality of Talibon", url: "https://talibon.gov.ph" },
  { name: "Jelexei Bakeshop", url: "https://jelexie.ph/" },
  { name: "Municipality of Milagros", url: "https://milagrosmasbate.gov.ph/" },
  { name: "Municipality of Alangalang", url: "https://alangalangleyte.gov.ph/" },
  { name: "National Academy of Sports", url: "https://nas.edu.ph/" },
];

function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that serves millions of Filipinos."
        description="A sample of the partners who trust us with their websites and mission-critical systems."
      />
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Latest website projects" title="Recently launched." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-3xl border border-border bg-card p-6 shadow-card lift hover:border-primary"
            >
              <span className="font-semibold">{p.name}</span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground" />
            </a>
          ))}
        </div>
        <div className="mt-20">
          <SectionHeading eyebrow="Trusted partners" title="Clients we're proud to serve." />
          <ul className="mt-10 flex flex-wrap gap-3">
            {CLIENTS.map((c) => (
              <li key={c} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
