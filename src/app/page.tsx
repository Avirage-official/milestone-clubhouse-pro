import Link from "next/link";

/* ───────────────────────────────────────────
   Milestone Clubhouse Pro — Marketing Landing
   React Server Component · Tailwind CSS only
   Superhuman-style design
   ─────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white overflow-x-hidden">
      {/* ── Hero section ─────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background gradient — purple/lavender sky */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#8b7fce] via-[#a9a0dc] to-[#c5bfe8]"
        />
        {/* Extra soft glow at top center */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[1100px] rounded-full bg-white/10 blur-[180px]"
        />

        {/* ── Nav ────────────────────────────────── */}
        <header className="relative z-20 w-full px-6 py-4 lg:px-12">
          <nav className="mx-auto flex max-w-7xl items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-3.14 1.346 2.353 1.005a1 1 0 00.788 0l7-3a1 1 0 000-1.838l-7-3.001z" />
                  <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                MILESTONE CLUBHOUSE
              </span>
            </div>

            {/* Desktop links */}
            <div className="hidden items-center gap-7 text-sm text-white/80 md:flex">
              <a href="#overview" className="hover:text-white transition-colors">
                Product
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Enterprise
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact us
              </a>
            </div>

            {/* Auth buttons */}
            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/auth/login"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full border border-white/40 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Sign up
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-3 md:hidden">
              <Link
                href="/auth/register"
                className="rounded-full border border-white/40 bg-white/10 px-5 py-2 text-sm font-semibold text-white"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </header>

        {/* ── Hero body — centered text ───────────── */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-12 pb-0 text-center lg:pt-16">
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Bring the workday
            <br />
            back to life
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Turn focus, breaks, and bonding into a daily game
            that works in every app and tab
          </p>

          <Link
            href="/auth/login"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#2d2455] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#2d2455]/30 transition hover:bg-[#3b3070]"
          >
            Launch team demo
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5d87ff]">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
        </div>

        {/* ── Hero image + floating cards ──────────── */}
        <div className="relative z-10 mx-auto mt-8 w-full max-w-7xl flex-1 px-6 lg:px-12">
          <div className="relative mx-auto flex items-end justify-center">
            {/* Main hero image */}
            <div className="relative w-full max-w-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile/user-1.jpg"
                alt="Professional looking forward with purpose"
                className="mx-auto h-[350px] w-full rounded-t-3xl object-cover object-top sm:h-[420px] lg:h-[480px]"
              />
              {/* Gradient fade at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b1120] to-transparent" />
            </div>

            {/* ── Floating card: AI Assistant (left) ── */}
            <div className="absolute left-0 top-8 z-20 hidden w-72 rounded-2xl border border-white/15 bg-[#1a1340]/90 p-5 shadow-2xl backdrop-blur-xl lg:block">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#5d87ff]/20">
                <svg className="h-4 w-4 text-[#93b4ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-3.14 1.346 2.353 1.005a1 1 0 00.788 0l7-3a1 1 0 000-1.838l-7-3.001z" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                Looks like your team is on a <span className="text-[#93b4ff]">#focus-sprint</span> and needs to schedule a break.
                Would you like to find a good time?
              </p>
              <div className="mt-3 flex justify-end">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">yes!</span>
              </div>
              <p className="mt-3 text-xs text-white/50">
                You&apos;re all available during these times:
              </p>
              <div className="mt-2 flex gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70"><span aria-hidden="true">🕐 </span>Monday at 3:00 PM</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70"><span aria-hidden="true">🕐 </span>Tuesday at 1:00 PM</span>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-xs text-white/50">book it for monday</span>
                <svg className="ml-auto h-4 w-4 text-[#5d87ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* ── Floating icon toolbar (center-left) ── */}
            <div className="absolute left-[35%] top-12 z-20 hidden flex-col gap-2 rounded-2xl border border-white/15 bg-[#1a1340]/90 p-2 shadow-2xl backdrop-blur-xl lg:flex" aria-hidden="true">
              {[
                { d: "M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-3.14 1.346 2.353 1.005a1 1 0 00.788 0l7-3a1 1 0 000-1.838l-7-3.001z", label: "Quests" },
                { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z", label: "Achievements" },
                { d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", label: "Team" },
                { d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Gallery" },
              ].map((icon, i) => (
                <div key={`icon-${i}`} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <svg className="h-4 w-4 text-white/60" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label={icon.label}>
                    <path d={icon.d} />
                  </svg>
                </div>
              ))}
            </div>

            {/* ── Floating card: Team workspace (right) ── */}
            <div className="absolute right-0 top-16 z-20 hidden w-80 rounded-2xl border border-white/15 bg-[#1a1340]/90 p-5 shadow-2xl backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-[#5d87ff]/20">
                    <svg className="h-3 w-3 text-[#93b4ff]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-white">Team workspace</span>
                </div>
                <span className="text-[10px] text-white/40">Share</span>
              </div>

              <h4 className="mt-3 text-sm font-semibold text-white">
                Streamlining Team Documentation
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                I&apos;ve been thinking about how our team can streamline the
                onboarding process for new hires. Right now, documentation is
                scattered across different tools, which makes it hard to find
                answers quickly.
              </p>
            </div>

            {/* ── Floating card: Inbox/Activity (bottom-left) ── */}
            <div className="absolute bottom-16 left-2 z-20 hidden w-80 rounded-2xl border border-white/15 bg-[#1a1340]/90 p-4 shadow-2xl backdrop-blur-xl lg:block">
              <div className="flex gap-4 border-b border-white/10 pb-3 text-xs text-white/50">
                <span className="font-semibold text-white">Important <span className="text-white/40">12</span></span>
                <span>Calendar <span className="text-white/40">13</span></span>
                <span>Docs <span className="text-white/40">8</span></span>
                <span>Other <span className="text-white/40">19</span></span>
              </div>
              <div className="mt-3 space-y-2.5">
                {[
                  { name: "Sarah Kim", subject: "Design Review moved to Thursday", preview: "Hey team, quick he…" },
                  { name: "James Patel", subject: "Feedback on your client presentation", preview: "Great work on th…" },
                  { name: "Laura Chen", subject: "Coffee next week?", preview: "It's been a while since we caught u…" },
                ].map((item) => (
                  <div key={item.name} className="flex items-baseline gap-3 text-xs">
                    <span className="w-20 shrink-0 font-medium text-white/70">{item.name}</span>
                    <span className="font-medium text-white/90">{item.subject}</span>
                    <span className="truncate text-white/40">{item.preview}</span>
                  </div>
                ))}
              </div>
              {/* AI suggestion */}
              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 text-[#8754ec]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" />
                  </svg>
                  <span className="text-[11px] text-white/60">Schedule 15 minutes for a quick meeting with Mike</span>
                </div>
              </div>
            </div>
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
