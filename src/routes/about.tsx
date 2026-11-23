import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — My Creative Panda" },
      { name: "description", content: "Established in 2006 in Tarlac City, My Creative Panda builds websites and e-governance systems for the Philippines." },
      { property: "og:title", content: "About My Creative Panda" },
      { property: "og:description", content: "From logo designs in 2006 to national e-governance systems today." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const VALUES = [
  { title: "Advice Solutions", text: "Free consultation for anyone making a name on the World Wide Web." },
  { title: "#1 Goal", text: "Keeping our clients happy. Trust is everything in every project we take on." },
  { title: "Affordable Rates", text: "We keep our costs low and our talent high, so you pay for great results." },
];

const PROCESS = ["Requirement Gathering", "Design & Planning", "Development", "Testing & QA", "Deployment & Support"];

function About() {
  return (
    <>
      <PageHero
        eyebrow="Est. 2006"
        title="A dream that grew into a software powerhouse."
        description="We started with logo designs, website templates, business cards and flyers. One thing led to another — and happy clients kept recommending us. Today we build systems that municipalities depend on every day."
      />
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="What we stand for" title="Why clients stay for years." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => (
            <article key={v.title} className="rounded-3xl border border-border bg-card p-8 shadow-card lift">
              <h3 className="text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-20">
          <SectionHeading eyebrow="How we work" title="Our development process." />
          <ol className="mt-10 grid gap-4 sm:grid-cols-5">
            {PROCESS.map((p, i) => (
              <li key={p} className="rounded-2xl bg-ink p-5 text-ink-foreground">
                <span className="font-mono text-xs text-mint">0{i + 1}</span>
                <p className="mt-2 font-semibold">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
