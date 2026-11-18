import logo from "@/assets/panda-logo.png";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card p-1 shadow-card">
        <img src={logo} alt="" width={816} height={816} className="h-full w-full object-contain" />
      </span>
      <span className="leading-none">
        <span className={cn("block text-[15px] font-extrabold tracking-tight", tone === "light" ? "text-ink-foreground" : "text-foreground")}>
          My Creative Panda
        </span>
        <span className={cn("mt-1 block font-mono text-[10px] tracking-widest uppercase", tone === "light" ? "text-ink-muted" : "text-muted-foreground")}>
          Est. 2006 · Tarlac
        </span>
      </span>
    </span>
  );
}
