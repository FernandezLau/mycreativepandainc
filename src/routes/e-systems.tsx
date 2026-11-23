import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Section";
import { SystemsGrid } from "@/components/site/Heritage";

export const Route = createFileRoute("/e-systems")({
  head: () => ({
    meta: [
      { title: "E-Systems for LGUs — My Creative Panda" },
      { name: "description", content: "EBPLS, EBIS, EWBS, EHRMIS, ETRISYS and ELIS — e-governance systems trusted by Philippine municipalities." },
      { property: "og:title", content: "E-Systems — My Creative Panda" },
      { property: "og:description", content: "E-governance platforms for business permits, barangays, water billing, HR and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ESystems,
});

function ESystems() {
  return (
    <>
      <PageHero
        eyebrow="E-Systems"
        title="Platforms that keep local government moving."
        description="Purpose-built systems that digitize permits, records, billing and HR for LGUs and national agencies."
      />
      <section className="relative bg-ink pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SystemsGrid />
        </div>
      </section>
    </>
  );
}
