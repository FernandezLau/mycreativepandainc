import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { WhyPanda } from "@/components/site/WhyPanda";
import { JobBoard } from "@/components/site/JobBoard";
import { PrepGuide } from "@/components/site/PrepGuide";
import { Heritage } from "@/components/site/Heritage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Careers at My Creative Panda — Build Technology That Powers the Nation" },
      {
        name: "description",
        content:
          "Join Tarlac's premier software company. 18 open roles building e-governance systems for Philippine LGUs and national agencies since 2006.",
      },
      { property: "og:title", content: "Careers at My Creative Panda" },
      {
        property: "og:description",
        content: "18 open roles in Tarlac City. Build e-governance platforms that serve municipalities nationwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <WhyPanda />
      <JobBoard />
      <PrepGuide />
      <Heritage />
    </>
  );
}
