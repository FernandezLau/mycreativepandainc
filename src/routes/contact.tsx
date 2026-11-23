import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us & Free Consultation — My Creative Panda" },
      { name: "description", content: "Visit us at the Amari Building, McArthur Highway, Tarlac City or call (045) 985-6909 for a free consultation." },
      { property: "og:title", content: "Contact My Creative Panda" },
      { property: "og:description", content: "Book a free consultation with Tarlac's software team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const cards = [
    { icon: MapPin, title: "Visit", lines: [CONTACT.address] },
    { icon: Mail, title: "Email", lines: [CONTACT.salesEmail, CONTACT.careersEmail] },
    { icon: Phone, title: "Call", lines: [CONTACT.landline, CONTACT.mobile] },
  ];
  return (
    <>
      <PageHero
        eyebrow="Free consultation"
        title="Let's talk about your next system."
        description="Tell us what you're building. Our consultation is free — whether you're a municipality or just starting out."
      >
        <div className="mt-8">
          <Button asChild variant="hero" size="xl">
            <a href={`mailto:${CONTACT.salesEmail}?subject=Free%20Consultation`}>Email our team</a>
          </Button>
        </div>
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-24 sm:px-6 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, lines }) => (
          <article key={title} className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <Icon className="h-6 w-6 text-accent-foreground" />
            <h2 className="mt-4 text-xl font-bold">{title}</h2>
            {lines.map((l) => (
              <p key={l} className="mt-1 text-muted-foreground">{l}</p>
            ))}
          </article>
        ))}
      </section>
    </>
  );
}
