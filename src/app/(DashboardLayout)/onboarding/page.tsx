"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  { id: 1, label: "Welcome" },
  { id: 2, label: "Milestones" },
  { id: 3, label: "Personal" },
  { id: 4, label: "Fun extras" },
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

/* simulated-day bar percentages */

/* ─── main page ─── */

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [animKey, setAnimKey] = useState(0);

  /* step 1 – welcome (no fields, just intro) */

  /* step 2 – milestones intro (no fields, just intro) */

  /* step 3 – personal basics */
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");
  const [tz, setTz] = useState("");
  const [location, setLocation] = useState("");

  /* step 4 – fun extras */
  const [petType, setPetType] = useState("fox");
  const [petName, setPetName] = useState("");
  const [petPersonality, setPetPersonality] = useState("chill");
  const [preferences, setPreferences] = useState("");

  const go = (s: number) => {
    setDir(s > step ? "fwd" : "back");
    setAnimKey((k) => k + 1);
    setStep(s);
  };

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
          onClick={() => router.push("/user-profile")}
          className="text-sm text-muted-foreground/70 hover:text-primary transition-colors whitespace-nowrap ml-4"
        >
          Skip for now
        </button>
      </div>

      {/* ── step content ── */}
      <div key={animKey} className={dir === "fwd" ? styles.enterFwd : styles.enterBack}>
        {step === 1 && (
          <WelcomeStep onContinue={() => go(2)} />
        )}
        {step === 2 && (
          <MilestonesIntroStep onBack={() => go(1)} onContinue={() => go(3)} />
        )}
        {step === 3 && (
          <PersonalStep
            name={name}
            setName={setName}
            role={role}
            setRole={setRole}
            team={team}
            setTeam={setTeam}
            tz={tz}
            setTz={setTz}
            location={location}
            setLocation={setLocation}
            onBack={() => go(2)}
            onContinue={() => go(4)}
          />
        )}
        {step === 4 && (
          <FunExtrasStep
            petType={petType}
            setPetType={setPetType}
            petName={petName}
            setPetName={setPetName}
            personality={petPersonality}
            setPersonality={setPetPersonality}
            preferences={preferences}
            setPreferences={setPreferences}
            onBack={() => go(3)}
            onFinish={() => router.push("/user-profile")}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Step 1 – Welcome + company intro ─── */

function WelcomeStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card shadow-xl shadow-black/5 overflow-hidden ${styles.glowCard}`}>
      <div className="h-1 bg-gradient-to-r from-primary via-info to-secondary" />
      <div className={`p-6 sm:p-10 ${styles.shimmer}`}>
        <div className={styles.fadeUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Welcome to your new workspace</h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            We&apos;re excited to have you on board. This quick setup will help
            us personalise your experience so you can hit the ground running.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${styles.fadeUpDelay1}`}>
          <div className="rounded-xl border border-border/50 bg-muted/30 p-5 space-y-2">
            <span className="text-2xl">🏢</span>
            <h3 className="font-semibold text-sm">Your company</h3>
            <p className="text-xs text-muted-foreground">
              Milestones Ltd — building tools for growing teams since 2023.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/30 p-5 space-y-2">
            <span className="text-2xl">👥</span>
            <h3 className="font-semibold text-sm">Your team</h3>
            <p className="text-xs text-muted-foreground">
              You&apos;ll be joining a cross-functional squad focused on
              delivering great experiences.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/30 p-5 space-y-2">
            <span className="text-2xl">🚀</span>
            <h3 className="font-semibold text-sm">What&apos;s next</h3>
            <p className="text-xs text-muted-foreground">
              Four quick steps and you&apos;ll be ready — takes under 2 minutes.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end pt-6 border-t border-border/50">
          <Button onClick={onContinue} className="shadow-lg shadow-primary/20">
            Let&apos;s get started
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2 – Milestones intro ─── */

function MilestonesIntroStep({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card shadow-xl shadow-black/5 overflow-hidden ${styles.glowCard}`}>
      <div className="h-1 bg-gradient-to-r from-info via-primary to-success" />
      <div className={`p-6 sm:p-10 ${styles.shimmer}`}>
        <div className={styles.fadeUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
              <span className="text-lg">🎯</span>
            </div>
            <h2 className="text-2xl font-bold">Meet Milestones</h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Milestones is your team&apos;s single hub for light HR, approvals, and
            work notes. Here&apos;s what you can do:
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 ${styles.fadeUpDelay1}`}>
          {[
            { icon: "📝", title: "Work Notes", desc: "Capture thoughts, meeting notes, and daily logs." },
            { icon: "✅", title: "Change Requests & Approvals", desc: "Submit and track change requests with manager approval flows." },
            { icon: "👤", title: "HR & People", desc: "Onboard new hires, manage invites, and view your team." },
            { icon: "📊", title: "Dashboard & Hubs", desc: "See key metrics, manage your team, and stay organised." },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border/50 bg-muted/30 p-5 flex gap-4 items-start"
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button onClick={onContinue} className="shadow-lg shadow-primary/20">
            Continue to personal details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3 – Personal basics ─── */

function PersonalStep({
  name,
  setName,
  role,
  setRole,
  team,
  setTeam,
  tz,
  setTz,
  location,
  setLocation,
  onBack,
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
  location: string;
  setLocation: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card shadow-xl shadow-black/5 overflow-hidden ${styles.glowCard}`}>
      <div className="h-1 bg-gradient-to-r from-primary via-info to-secondary" />
      <div className={`p-6 sm:p-8 ${styles.shimmer}`}>
        <div className={styles.fadeUp}>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Personal basics</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-8 ml-11">
            Let&apos;s personalise your profile so teammates know who you are.
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
                <Label htmlFor="onb-location">Location</Label>
                <Input
                  id="onb-location"
                  placeholder="e.g. London, UK"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="transition-shadow duration-300 focus:shadow-md focus:shadow-primary/10"
                />
                <p className="text-xs text-muted-foreground">
                  Where you&apos;re based.
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
              {location && (
                <p className="text-xs text-muted-foreground">📍 {location}</p>
              )}
              {tz && (
                <p className="text-xs text-muted-foreground">🕐 {tz}</p>
              )}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
          <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button onClick={onContinue} className="shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
            Continue to fun extras
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4 – Fun extras (pet, preferences) ─── */

function FunExtrasStep({
  petType,
  setPetType,
  petName,
  setPetName,
  personality,
  setPersonality,
  preferences,
  setPreferences,
  onBack,
  onFinish,
}: {
  petType: string;
  setPetType: (v: string) => void;
  petName: string;
  setPetName: (v: string) => void;
  personality: string;
  setPersonality: (v: string) => void;
  preferences: string;
  setPreferences: (v: string) => void;
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
            <h2 className="text-xl font-bold">Fun extras</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-8 ml-11">
            Pick a pet companion and set your preferences. This is totally
            optional — you can change it later.
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

            {/* preferences */}
            <div className="space-y-2">
              <Label htmlFor="onb-prefs">Anything else we should know?</Label>
              <Input
                id="onb-prefs"
                placeholder="e.g. I love coffee, hate mornings"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="transition-shadow duration-300 focus:shadow-md focus:shadow-primary/10"
              />
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
            Back to personal details
          </Button>
          <Button onClick={onFinish} className="shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
            Finish onboarding
            <Check className="w-4 h-4 ml-1" />
          </Button>
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
