import logo from "@/assets/logo-full.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * The brand lockup ships as a single white-background image (wordmark + panda).
 * On light surfaces it sits directly on the bar; on dark surfaces it needs a
 * light plate behind it, since the artwork itself has no transparent areas.
 */
export function Logo({
  tone = "dark",
  size = "md",
  className,
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const height = size === "lg" ? "h-14" : size === "sm" ? "h-7" : "h-10";
  const img = (
    <img
      src={logo.url}
      alt="My Creative Panda"
      width={713}
      height={373}
      className={cn("w-auto", height)}
    />
  );

  if (tone === "light") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-2xl bg-card px-4 py-3 shadow-xl shadow-black/40 ring-1 ring-white/10",
          className,
        )}
      >
        {img}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      {img}
    </span>
  );
}
