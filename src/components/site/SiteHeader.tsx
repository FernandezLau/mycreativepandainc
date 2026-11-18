import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function useScrollToJobs() {
  const navigate = useNavigate();
  return () => {
    const el = document.getElementById("jobs");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate({ to: "/careers", hash: "jobs" });
  };
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrollToJobs = useScrollToJobs();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass-light">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" aria-label="My Creative Panda home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="pill" size="sm" className="h-9 px-4">
            <Link to="/contact">Free Consultation</Link>
          </Button>
          <Button variant="hero" size="sm" className="h-9 px-5" onClick={scrollToJobs}>
            Apply Now
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5!" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: true }}
                  className="rounded-xl px-4 py-3 font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "bg-muted text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 px-2">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(scrollToJobs, 250);
                  }}
                >
                  Apply Now
                </Button>
                <Button asChild variant="pill" size="lg">
                  <Link to="/contact" onClick={() => setOpen(false)}>
                    Free Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
