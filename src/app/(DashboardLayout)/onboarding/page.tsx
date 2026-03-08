"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import styles from "./onboarding.module.css";

/* ─── constants ─── */

const STEPS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Workday" },
  { id: 3, label: "Your Clubhouse Pet" },
];

const TEAMS = ["Product", "Sales", "Engineering", "People Ops"];

const TIMEZONES = [
  "UTC-8 (Pacific)",
  "UTC-5 (Eastern)",
  "UTC+0 (London)",
  "UTC+1 (Paris)",
  "UTC+5:30 (Mumbai)",
  "UTC+8 (Singapore)",
  "UTC+9 (Tokyo)",
];

const PET_TYPES = [
  { value: "dog", label: "Dog", emoji: "🐕" },
  { value: "fox", label: "Fox", emoji: "🦊" },
  { value: "robot", label: "Robot", emoji: "🤖" },
  { value: "dragon", label: "Dragon", emoji: "🐉" },
];

const PERSONALITIES = [
  {
    value: "chill",
    label: "Chill",
    desc: "Gentle nudges, low-key encouragement.",
  },
  {
    value: "energetic",
    label: "Energetic",
    desc: "High-energy reminders and celebrations.",
  },
  {
    value: "motivator",
    label: "Motivator",
    desc: "Balanced, coaching-style nudges.",
  },
];

const FOCUS_OPTIONS = [
  { value: "deep-focus", label: "Deep focus", icon: "🎯" },
  { value: "better-breaks", label: "Better breaks", icon: "☕" },
  { value: "social", label: "More social connection", icon: "👥" },
  { value: "all", label: "All three", icon: "✨" },
];

const BREAK_STYLE_OPTIONS = ["Movement", "Mindful", "Social"];

/* simulated-day bar percentages */
const FOCUS_PCT: Record<string, number> = {
  "deep-focus": 60,
  social: 30,
  default: 45,
};
const BREAK_PCT: Record<string, number> = {
  frequent: 30,
  light: 15,
  default: 20,
};

/* ─── main page ─── */

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [animKey, setAnimKey] = useState(0);

  /* step 1 – profile */
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");
  const [tz, setTz] = useState("");

  /* step 2 – workday */
  const [focus, setFocus] = useState("");
  const [breakFreq, setBreakFreq] = useState("standard");
  const [breakStyles, setBreakStyles] = useState<string[]>([]);

  /* step 3 – pet */
  const [petType, setPetType] = useState("fox");
  const [petName, setPetName] = useState("");
  const [petPersonality, setPetPersonality] = useState("chill");
  const [nudgeFreq, setNudgeFreq] = useState("standard");

  const go = (s: number) => {
    setDir(s > step ? "fwd" : "back");
    setAnimKey((k) => k + 1);
    setStep(s);
  };

  const toggleBreak = (style: string) =>
    setBreakStyles((prev) =>
      prev.includes(style) ? prev.filter((x) => x !== style) : [...prev, style]
    );

  return (
    <div className="max-w-5xl mx-auto relative">
      {/* ── ambient glow background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-primary/5 blur-[120px]"
      />

      {/* ── stepper bar ── */}
      <div className={`flex items-center justify-between mb-10 ${styles.fadeUp}`}>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => s.id < step && go(s.id)}
                disabled={s.id > step}
                className={`group relative flex items-center gap-2.5 px-4 py-2.5 sm:px-5 rounded-full text-sm font-medium transition-all duration-500 ${
                  s.id === step
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : s.id < step
                      ? "bg-primary/15 text-primary cursor-pointer hover:bg-primary/25 hover:shadow-md hover:shadow-primary/10"
                      : "bg-muted/50 text-muted-foreground/60 cursor-default"
                }`}
              >
                {s.id === step && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-primary/20 blur-md"
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {s.id < step ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition-colors duration-300 ${
                      s.id === step ? "border-white/90" : "border-current"
                    }`}>
                      {s.id}
                    </span>
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="relative w-8 sm:w-12 h-0.5">
                  <div className="absolute inset-0 bg-border/50 rounded-full" />
                  <div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-700 ease-out"
                    style={{ width: s.id < step ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-muted-foreground/70 hover:text-primary transition-colors whitespace-nowrap ml-4"
        >
          Skip for now
        </button>
      </div>

      {/* ── step content ── */}
      <div key={animKey} className={dir === "fwd" ? styles.enterFwd : styles.enterBack}>
        {step === 1 && (
          <ProfileStep
            name={name}
            setName={setName}
            role={role}
            setRole={setRole}
            team={team}
            setTeam={setTeam}
            tz={tz}
            setTz={setTz}
            onContinue={() => go(2)}
          />
        )}
        {step === 2 && (
          <WorkdayStep
            focus={focus}
            setFocus={setFocus}
            breakFreq={breakFreq}
            setBreakFreq={setBreakFreq}
            breakStyles={breakStyles}
            toggleBreak={toggleBreak}
            onBack={() => go(1)}
            onContinue={() => go(3)}
          />
        )}
        {step === 3 && (
          <PetStep
            petType={petType}
            setPetType={setPetType}
            petName={petName}
            setPetName={setPetName}
            personality={petPersonality}
            setPersonality={setPetPersonality}
            nudgeFreq={nudgeFreq}
            setNudgeFreq={setNudgeFreq}
            onBack={() => go(2)}
            onFinish={() => router.push("/dashboard")}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Step 1 – Profile basics ─── */

function ProfileStep({
  name,
  setName,
  role,
  setRole,
  team,
  setTeam,
  tz,
  setTz,
  onContinue,
}: {
  name: string;
  setName: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  team: string;
  setTeam: (v: string) => void;
  tz: string;
  setTz: (v: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card shadow-xl shadow-black/5 overflow-hidden ${styles.glowCard}`}>
      {/* decorative top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-info to-secondary" />
      <div className={`p-6 sm:p-8 ${styles.shimmer}`}>
        <div className={styles.fadeUp}>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Welcome to your Clubhouse</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-8 ml-11">
            Let&apos;s personalize your profile so teammates know who&apos;s in the
            Clubhouse.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* form */}
          <div className={`lg:col-span-2 space-y-5 ${styles.fadeUpDelay1}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="onb-name">Preferred name</Label>
                <Input
                  id="onb-name"
                  placeholder="How should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="transition-shadow duration-300 focus:shadow-md focus:shadow-primary/10"
                />
                <p className="text-xs text-muted-foreground">
                  This is how teammates will see you.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="onb-role">Role / What you do</Label>
                <Input
                  id="onb-role"
                  placeholder="e.g. Product Designer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="transition-shadow duration-300 focus:shadow-md focus:shadow-primary/10"
                />
                <p className="text-xs text-muted-foreground">
                  Appears on your profile card.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Team</Label>
                <Select value={team} onValueChange={setTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your team" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAMS.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll match you with your squad.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Time zone</Label>
                <Select value={tz} onValueChange={setTz}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  So we know when you&apos;re online.
                </p>
              </div>
            </div>
          </div>

          {/* preview panel */}
          <div className={`hidden lg:block ${styles.fadeUpDelay2}`}>
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-muted/50 to-muted/20 p-5 space-y-3 backdrop-blur-sm">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Profile preview
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-info/20 flex items-center justify-center text-primary font-bold text-lg shadow-inner">
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <p className="font-semibold text-sm">{name || "Your name"}</p>
                  <p className="text-xs text-muted-foreground">
                    {role || "Your role"}
                  </p>
                </div>
              </div>
              {team && (
                <span className="inline-block text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                  {team}
                </span>
              )}
              {tz && (
                <p className="text-xs text-muted-foreground">🕐 {tz}</p>
              )}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
          <button
            onClick={onContinue}
            className="text-sm text-muted-foreground/70 hover:text-primary transition-colors"
          >
            I&apos;ll fill this in later
          </button>
          <Button onClick={onContinue} className="shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
            Continue to workday setup
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2 – Workday preferences ─── */

function WorkdayStep({
  focus,
  setFocus,
  breakFreq,
  setBreakFreq,
  breakStyles,
  toggleBreak,
  onBack,
  onContinue,
}: {
  focus: string;
  setFocus: (v: string) => void;
  breakFreq: string;
  setBreakFreq: (v: string) => void;
  breakStyles: string[];
  toggleBreak: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card shadow-xl shadow-black/5 overflow-hidden ${styles.glowCard}`}>
      <div className="h-1 bg-gradient-to-r from-info via-primary to-success" />
      <div className={`p-6 sm:p-8 ${styles.shimmer}`}>
        <div className={styles.fadeUp}>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/10">
              <span className="text-base">🎯</span>
            </div>
            <h2 className="text-xl font-bold">Design your ideal workday</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-8 ml-11">
            Tell the Clubhouse how you like to focus and take breaks. We&apos;ll
            tune quests and nudges to match.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-2 space-y-6 ${styles.fadeUpDelay1}`}>
            {/* focus preference */}
            <div>
              <Label className="mb-3 block">
                Right now, I want more&hellip;
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {FOCUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFocus(opt.value)}
                    className={`group p-4 rounded-xl border text-left transition-all duration-300 ${
                      focus === opt.value
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/15 scale-[1.02]"
                        : "border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
                    }`}
                  >
                    <span className={`text-xl mb-1 block transition-transform duration-300 ${focus === opt.value ? "scale-110" : "group-hover:scale-105"}`}>{opt.icon}</span>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* break frequency */}
            <div>
              <Label className="mb-3 block">
                How often should we suggest breaks?
              </Label>
              <div className="flex gap-2">
                {["light", "standard", "frequent"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBreakFreq(opt)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                      breakFreq === opt
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* break styles */}
            <div>
              <Label className="mb-3 block">Favorite break styles</Label>
              <div className="flex flex-wrap gap-2">
                {BREAK_STYLE_OPTIONS.map((style) => (
                  <button
                    key={style}
                    onClick={() => toggleBreak(style)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      breakStyles.includes(style)
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* simulated day */}
          <div className={styles.fadeUpDelay2}>
            <SimulatedDay
              focus={focus}
              breakFreq={breakFreq}
              breakStyles={breakStyles}
            />
          </div>
        </div>

        {/* buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
          <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to profile
          </Button>
          <Button onClick={onContinue} className="shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
            Meet your Clubhouse pet
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── simulated day visualization ─── */

function SimulatedDay({
  focus,
  breakFreq,
  breakStyles,
}: {
  focus: string;
  breakFreq: string;
  breakStyles: string[];
}) {
  const focusW = FOCUS_PCT[focus] ?? FOCUS_PCT.default;
  const breakW = BREAK_PCT[breakFreq] ?? BREAK_PCT.default;
  const socialW = 100 - focusW - breakW;

  return (
    <div className="rounded-xl border border-border/50 bg-gradient-to-br from-muted/50 to-muted/20 p-5 space-y-4 backdrop-blur-sm">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Your simulated day
      </p>

      {/* horizontal bar */}
      <div className="flex rounded-lg overflow-hidden h-9 shadow-inner">
        <div
          className="bg-gradient-to-r from-primary/80 to-primary/60 transition-all duration-700 ease-out flex items-center justify-center"
          style={{ width: `${focusW}%` }}
        >
          <span className="text-[10px] font-semibold text-white/90 truncate px-1">
            Focus
          </span>
        </div>
        <div
          className="bg-gradient-to-r from-success/80 to-success/60 transition-all duration-700 ease-out flex items-center justify-center"
          style={{ width: `${breakW}%` }}
        >
          <span className="text-[10px] font-semibold text-white/90 truncate px-1">
            Break
          </span>
        </div>
        <div
          className="bg-gradient-to-r from-info/80 to-info/60 transition-all duration-700 ease-out flex items-center justify-center"
          style={{ width: `${socialW}%` }}
        >
          <span className="text-[10px] font-semibold text-white/90 truncate px-1">
            Social
          </span>
        </div>
      </div>

      {/* legend */}
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary/90 to-primary/60 shadow-sm" />
          <span>Focus — {focusW}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-success/90 to-success/60 shadow-sm" />
          <span>Break — {breakW}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-info/90 to-info/60 shadow-sm" />
          <span>Social — {socialW}%</span>
        </div>
      </div>

      {breakStyles.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground mb-1">Break mix:</p>
          <div className="flex gap-1.5">
            {breakStyles.map((s) => (
              <span
                key={s}
                className="text-xs bg-success/10 text-success px-2.5 py-0.5 rounded-full font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Step 3 – Pet & mascot ─── */

function PetStep({
  petType,
  setPetType,
  petName,
  setPetName,
  personality,
  setPersonality,
  nudgeFreq,
  setNudgeFreq,
  onBack,
  onFinish,
}: {
  petType: string;
  setPetType: (v: string) => void;
  petName: string;
  setPetName: (v: string) => void;
  personality: string;
  setPersonality: (v: string) => void;
  nudgeFreq: string;
  setNudgeFreq: (v: string) => void;
  onBack: () => void;
  onFinish: () => void;
}) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card shadow-xl shadow-black/5 overflow-hidden ${styles.glowCard}`}>
      <div className="h-1 bg-gradient-to-r from-secondary via-warning to-error" />
      <div className={`p-6 sm:p-8 ${styles.shimmer}`}>
        <div className={styles.fadeUp}>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
              <span className="text-base">🦊</span>
            </div>
            <h2 className="text-xl font-bold">Meet your Clubhouse pet</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-8 ml-11">
            Every teammate gets a pet that nudges them toward better focus, breaks,
            and connection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* configuration form */}
          <div className={`space-y-5 ${styles.fadeUpDelay1}`}>
            {/* pet type */}
            <div>
              <Label className="mb-3 block">Pet type</Label>
              <div className="grid grid-cols-4 gap-2">
                {PET_TYPES.map((pt) => (
                  <button
                    key={pt.value}
                    onClick={() => setPetType(pt.value)}
                    className={`group p-3 rounded-xl border text-center transition-all duration-300 ${
                      petType === pt.value
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/15 scale-[1.05]"
                        : "border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
                    }`}
                  >
                    <span className={`text-2xl block mb-1 transition-transform duration-300 ${petType === pt.value ? "scale-110" : "group-hover:scale-105"}`}>{pt.emoji}</span>
                    <span className="text-xs font-medium">{pt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* pet name */}
            <div className="space-y-2">
              <Label htmlFor="onb-pet-name">Pet name</Label>
              <Input
                id="onb-pet-name"
                placeholder="Name your pet"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="transition-shadow duration-300 focus:shadow-md focus:shadow-primary/10"
              />
            </div>

            {/* personality */}
            <div>
              <Label className="mb-3 block">Pet personality</Label>
              <div className="space-y-2">
                {PERSONALITIES.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPersonality(p.value)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                      personality === p.value
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/15"
                        : "border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
                    }`}
                  >
                    <span className="text-sm font-semibold">{p.label}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {p.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* nudge frequency */}
            <div>
              <Label className="mb-3 block">Nudge frequency</Label>
              <div className="flex gap-2">
                {["light", "standard", "frequent"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setNudgeFreq(opt)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                      nudgeFreq === opt
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* pet preview */}
          <div className={styles.fadeUpDelay2}>
            <PetPreview
              petType={PET_TYPES.find((p) => p.value === petType)}
              petName={petName}
              personality={PERSONALITIES.find((p) => p.value === personality)}
            />
          </div>
        </div>

        {/* buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
          <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to workday
          </Button>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground/70 hover:text-primary transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              Go to dashboard
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0V15" />
              </svg>
            </Link>
            <Button onClick={onFinish} className="shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
              Finish onboarding
              <Check className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── pet preview placeholder ─── */

function PetPreview({
  petType,
  petName,
  personality,
}: {
  petType?: { value: string; label: string; emoji: string };
  petName: string;
  personality?: { value: string; label: string; desc: string };
}) {
  const displayName = petName || "Your pet";
  const displayPersonality = personality?.label || "Chill";
  const displayType = petType?.label || "Fox";
  const displayEmoji = petType?.emoji || "🦊";

  return (
    <div className="rounded-xl border border-border/50 bg-gradient-to-br from-muted/30 via-card to-muted/20 p-6 flex flex-col items-center justify-center space-y-5 backdrop-blur-sm">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider self-start">
        Pet preview
      </p>

      {/* animated pet area */}
      <div className="relative">
        {/* outer rotating ring */}
        <div className={`absolute -inset-3 rounded-full border border-dashed border-primary/20 ${styles.ringRotate}`} />
        <div className={`relative w-40 h-40 rounded-full bg-gradient-to-br from-primary/25 via-info/15 to-secondary/25 flex items-center justify-center shadow-xl shadow-primary/10 ${styles.blob}`}>
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-info/10" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/5" />
          <span className="text-6xl relative z-10 drop-shadow-lg">{displayEmoji}</span>
        </div>
      </div>

      {/* dynamic description */}
      <div className="text-center space-y-2">
        <p className="text-sm text-card-foreground/80 max-w-xs">
          <span className="font-bold text-primary">{displayName}</span> the{" "}
          <span className="font-semibold">
            {displayPersonality} {displayType}
          </span>
          {personality?.value === "energetic"
            ? " loves cheering on your focus streaks."
            : personality?.value === "motivator"
              ? " coaches you through every challenge."
              : " gently guides you toward balance."}
        </p>
        <p className="text-xs text-muted-foreground/60">
          Your pet will appear on the dashboard
        </p>
      </div>
    </div>
  );
}
