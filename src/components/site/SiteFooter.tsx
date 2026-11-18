import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            Tarlac's software powerhouse since 2006 — engineering e-governance platforms, enterprise systems and
            websites for Philippine LGUs, national agencies and private brands.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-mint uppercase">Explore</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-ink-muted transition-colors hover:text-ink-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/hr" className="text-ink-muted transition-colors hover:text-ink-foreground">
                HR Portal
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4 text-sm">
          <h4 className="font-mono text-xs tracking-widest text-mint uppercase">Visit & Contact</h4>
          <p className="flex gap-3 text-ink-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint" /> {CONTACT.address}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-muted">
            <Mail className="h-4 w-4 shrink-0 text-mint" />
            <a href={`mailto:${CONTACT.salesEmail}`} className="hover:text-ink-foreground">{CONTACT.salesEmail}</a>
            <span aria-hidden>/</span>
            <a href={`mailto:${CONTACT.careersEmail}`} className="hover:text-ink-foreground">{CONTACT.careersEmail}</a>
          </p>
          <p className="flex items-center gap-3 text-ink-muted">
            <Phone className="h-4 w-4 shrink-0 text-mint" /> {CONTACT.landline} · {CONTACT.mobile}
          </p>
        </div>
      </div>
      <div className="relative border-t border-ink-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} My Creative Panda. All rights reserved.</p>
          <p>Built in Tarlac City, Philippines 🇵🇭</p>
        </div>
      </div>
    </footer>
  );
}
