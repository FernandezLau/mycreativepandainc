import { createFileRoute } from "@tanstack/react-router";
import { Code2, Palette, Server, Workflow } from "lucide-react";
import { PageHero } from "@/components/site/Section";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — My Creative Panda" },
      { name: "description", content: "Creative design, web hosting, web development and software development from My Creative Panda." },
      { property: "og:title", content: "Services — My Creative Panda" },
      { property: "og:description", content: "Design, hosting, web and software development for government and business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Palette, title: "Creative Design", items: ["Branding & corporate identity", "Logo design", "PSD to HTML"] },
  { icon: Server, title: "Web Hosting", items: ["24/7 email support", "Linux hosting plans", "cPanel control panel"] },
  { icon: Code2, title: "Web Development", items: ["HTML to CMS", "CMS integration", "Web-based systems"] },
  { icon: Workflow, title: "Software Development", items: ["System integration", "Secure by design", "Always-on availability"] },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your vision needs to go digital."
        description="From your first logo to a city-wide e-governance platform — designed, built and hosted by one team."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-24 sm:px-6 md:grid-cols-2">
        {SERVICES.map(({ icon: Icon, title, items }) => (
          <article key={title} className="rounded-3xl border border-border bg-card p-8 shadow-card lift">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
              <Icon className="h-6 w-6 text-accent-foreground" />
            </span>
            <h2 className="mt-6 text-2xl font-bold">{title}</h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              {items.map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {i}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
