import Link from "next/link";

/* ───────────────────────────────────────────
   Milestone Clubhouse Pro — Marketing Landing
   React Server Component · Tailwind CSS only
   ─────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* ── Hero section ─────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[#0b1120] via-[#111d3a] to-[#1a1050]">
        {/* Subtle radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[#5d87ff]/10 blur-[160px]"
        />

        {/* ── Nav ────────────────────────────────── */}
        <header className="relative z-10 w-full px-6 py-5 lg:px-12">
          <nav className="mx-auto flex max-w-7xl items-center justify-between">
            {/* Logo */}
            <span className="text-lg font-bold tracking-tight">
              Milestone Clubhouse Pro
            </span>

            {/* Desktop links */}
            <div className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
              <a href="#" className="hover:text-white transition-colors">
                Product
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Why Clubhouse?
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Resources
              </a>

              <Link
                href="/auth/login"
                className="hover:text-white transition-colors"
              >
                Log in
              </Link>

              <Link
                href="/auth/login"
                className="rounded-lg bg-[#5d87ff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#5d87ff]/25 transition hover:bg-[#4a72e6]"
              >
                Get a demo
              </Link>
            </div>

            {/* Mobile menu button (simple toggle) */}
            <div className="flex items-center gap-3 md:hidden">
              <Link
                href="/auth/login"
                className="rounded-lg bg-[#5d87ff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#5d87ff]/25"
              >
                Get a demo
              </Link>
            </div>
          </nav>
        </header>

        {/* ── Hero body ──────────────────────────── */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-12 lg:py-24">
          {/* Copy column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">
            <span className="mb-4 inline-block rounded-full border border-[#5d87ff]/30 bg-[#5d87ff]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#93b4ff]">
              Built for teams who want work to feel alive again
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Bring the workday
              <br />
              back to life.
            </h1>

            <p className="mt-2 text-2xl font-semibold text-[#93b4ff] sm:text-3xl">
              Turn focus, breaks, and bonding into a daily game.
            </p>

            <p className="mt-6 max-w-[480px] text-base leading-relaxed text-gray-400">
              Milestone Clubhouse Pro transforms ordinary workdays into shared
              missions: teammates start together in one playful hub, earn XP for
              deep work and real breaks, and build rituals that people actually
              look forward to.
            </p>

            <Link
              href="/auth/login"
              className="mt-8 inline-flex items-center rounded-xl bg-[#5d87ff] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#5d87ff]/30 transition hover:bg-[#4a72e6]"
            >
              Launch team demo
            </Link>

            <p className="mt-3 text-sm text-gray-500">
              Explore a pre-loaded demo clubhouse in under 60 seconds.
            </p>

            <Link
              href="#overview"
              className="mt-2 text-sm font-medium text-[#5d87ff] transition hover:text-[#93b4ff]"
            >
              See how it feels for employees →
            </Link>
          </div>

          {/* Product preview column */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <ProductPreviewCard />
          </div>
        </div>
      </section>

      {/* ── Problem / Solution ───────────────────── */}
      <section
        id="overview"
        className="relative bg-[#0e1629] py-24 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-2">
          {/* Problem */}
          <div>
            <h2 className="text-3xl font-bold leading-snug">
              The future of work wasn&apos;t meant to feel this flat.
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Hybrid and remote gave us flexibility — and a lonely, tab‑filled
              workday. Employees bounce between tools, skip breaks, and rarely
              feel part of something shared.
            </p>
            <ul className="mt-6 space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <BulletIcon className="mt-1 text-[#ef4444]" />
                <span>
                  Engagement programs live in slides, not in the workday.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BulletIcon className="mt-1 text-[#ef4444]" />
                <span>
                  Focus time gets crushed by pings and ad‑hoc meetings.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BulletIcon className="mt-1 text-[#ef4444]" />
                <span>
                  Wellness perks feel like homework instead of a win.
                </span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-3xl font-bold leading-snug">
              Clubhouse turns your culture into a daily habit.
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Instead of another app to ignore, Clubhouse becomes the place
              employees start their day: one mission screen, micro‑games, and
              gentle nudges that make good habits feel rewarding.
            </p>
            <ul className="mt-6 space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <BulletIcon className="mt-1 text-[#13deb9]" />
                <span>
                  Daily &lsquo;mission screen&rsquo; that aligns focus, breaks, and
                  rituals.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BulletIcon className="mt-1 text-[#13deb9]" />
                <span>
                  Micro‑games, quests, and streaks that make progress feel fun.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BulletIcon className="mt-1 text-[#13deb9]" />
                <span>
                  Live ranks and Hall of Fame that celebrate healthy behaviors,
                  not burnout.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Benefit strip for leaders ────────────── */}
      <section className="bg-[#0b1120] py-20 px-6 lg:px-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold">What leaders start to notice.</h2>
          <p className="mt-3 text-gray-400">
            Teams using Clubhouse Pro report:
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <BenefitCard text="More protected deep‑work blocks." />
            <BenefitCard text="More real 1:1 lunches and social moments." />
            <BenefitCard text="Higher participation in wellness initiatives — without more meetings." />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Sub‑components (co‑located, no external file needed) ─── */

function ProductPreviewCard() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-[#5d87ff]/10 backdrop-blur-xl">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">
          Today in the Clubhouse
        </span>
        {/* Avatar group */}
        <div className="flex -space-x-2">
          {["bg-[#5d87ff]", "bg-[#13deb9]", "bg-[#f6b51e]", "bg-[#8754ec]"].map(
            (bg) => (
              <span
                key={bg}
                className={`inline-block h-7 w-7 rounded-full ${bg} ring-2 ring-[#0b1120]`}
              />
            )
          )}
        </div>
      </div>

      {/* Stat chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          { label: "Focus streak", value: "5 days" },
          { label: "XP earned", value: "1,250" },
          { label: "Lunch buddies", value: "2 online" },
          { label: "Quests done", value: "3 / day" },
        ].map((chip) => (
          <span
            key={chip.label}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
          >
            {chip.label}{" "}
            <span className="font-semibold text-white">· {chip.value}</span>
          </span>
        ))}
      </div>

      {/* Decorative chart */}
      <div className="mt-6 flex items-end gap-1.5 h-20">
        {[40, 65, 50, 80, 55, 90, 70, 60, 85, 45, 75, 95].map(
          (height, i) => (
            <div
              key={`bar-${i}-${height}`}
              className="flex-1 rounded-t bg-gradient-to-t from-[#5d87ff]/60 to-[#93b4ff]/80"
              style={{ height: `${height}%` }}
            />
          )
        )}
      </div>
    </div>
  );
}

function BulletIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 flex-shrink-0 ${className}`}
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx="4" cy="4" r="3" />
    </svg>
  );
}

function BenefitCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <p className="text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}
