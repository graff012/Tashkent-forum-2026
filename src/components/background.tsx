/**
 * Background — premium layered gradient + grain overlay.
 * Drop this as the first child of any `relative` container.
 * It sits at z-0 (or -z-10 if you pass className="-z-10").
 *
 * Usage:
 *   <div className="relative min-h-screen">
 *     <Background />
 *     <main className="relative z-10">…</main>
 *   </div>
 */
export function Background({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* ── Layer 1: base tint ─────────────────────────────────────
          Soft off-white in light mode, deep navy-black in dark mode. */}
      <div className="absolute inset-0 bg-[oklch(0.99_0_0)] dark:bg-[oklch(0.10_0.01_264)]" />

      {/* ── Layer 2: primary blob (top-left) ───────────────────────
          Pomegranate/red hue — references the site accent colour.
          animate-blob-drift makes it slowly float; pauses on reduced-motion. */}
      <div
        className="
          absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full
          bg-[oklch(0.52_0.22_24_/_0.08)] dark:bg-[oklch(0.52_0.22_24_/_0.14)]
          blur-[120px]
          animate-blob-drift
        "
      />

      {/* ── Layer 3: secondary blob (bottom-right) ─────────────────
          Cool indigo accent for contrast with the warm primary blob. */}
      <div
        className="
          absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full
          bg-[oklch(0.60_0.18_264_/_0.07)] dark:bg-[oklch(0.55_0.20_264_/_0.18)]
          blur-[100px]
          animate-blob-drift [animation-delay:8s]
        "
      />

      {/* ── Layer 4: mid-page accent (center-right) ────────────────
          Amber/gold — adds warmth; very faint so it stays classy. */}
      <div
        className="
          absolute top-1/3 right-1/4 h-[340px] w-[340px] rounded-full
          bg-[oklch(0.85_0.15_80_/_0.06)] dark:bg-[oklch(0.75_0.18_80_/_0.10)]
          blur-[80px]
          animate-blob-drift [animation-delay:4s] [animation-direction:reverse]
        "
      />

      {/* ── Layer 5: grain/noise overlay ───────────────────────────
          SVG-based noise rendered as a data-URI background — no external files.
          Adds organic texture that prevents the gradients from looking too digital. */}
      <div className="absolute inset-0 bg-noise opacity-[0.025] dark:opacity-[0.04]" />
    </div>
  );
}
