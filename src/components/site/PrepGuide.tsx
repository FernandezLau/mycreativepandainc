import { FileUp, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./Section";
import { useApply } from "./apply-context";

const STEPS = [
  { icon: Heart, title: "Match Your Passion", text: "Pick the department aligned with your strengths — tech, support, admin, finance, HR or sales." },
  { icon: FileUp, title: "Drop Your Resume", text: "A 2-minute quick submission. PDF or Word, no lengthy forms." },
  { icon: Zap, title: "Fast-Track Screening", text: "We review and reply within 48–72 business hours. Every applicant hears back." },
];

export function PrepGuide() {
  const { openApply } = useApply();
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading align="center" eyebrow="Candidate prep guide" title="Three steps. Zero guesswork." />
        <ol className="relative mt-16 grid gap-6 md:grid-cols-3">
          <span className="absolute top-10 right-[16%] left-[16%] hidden h-px bg-border md:block" aria-hidden />
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative flex flex-col items-center text-center">
              <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-ink shadow-lift">
                <Icon className="h-8 w-8 text-mint" />
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-mint-gradient font-mono text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mt-2 max-w-xs text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex justify-center">
          <Button variant="ink" size="xl" onClick={() => openApply()}>
            Start my application
          </Button>
        </div>
      </div>
    </section>
  );
}
