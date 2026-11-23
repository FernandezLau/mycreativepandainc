import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Section";
import { JobBoard } from "@/components/site/JobBoard";
import { PrepGuide } from "@/components/site/PrepGuide";
import { WhyPanda } from "@/components/site/WhyPanda";
import { JOBS } from "@/lib/jobs";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Open Roles — My Creative Panda Careers" },
      { name: "description", content: "Browse full-time onsite roles in Tarlac City across tech, support, admin, finance, HR and sales." },
      { property: "og:title", content: "Open Roles — My Creative Panda" },
      { property: "og:description", content: "Full-time onsite roles in Tarlac City. Apply in 2 minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Careers,
});

function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>{JOBS.length} roles. One mission.</>}
        description="Help us build the digital backbone of Philippine local government — from Tarlac City."
      />
      <JobBoard />
      <PrepGuide />
      <WhyPanda />
    </>
  );
}
