"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ContractType,
  NewHireDraft,
  defaultNewHireDraft,
} from "@/app/(DashboardLayout)/types/hr";

interface NewHireWizardProps {
  open: boolean;
  onClose: () => void;
  onCreateAccount: (draft: NewHireDraft) => void;
}

const contractLabels: Record<ContractType, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACTOR: "Contractor",
};

const timeZoneOptions = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

const workPatternOptions = ["Office", "Remote", "Hybrid"];

const NewHireWizard: React.FC<NewHireWizardProps> = ({
  open,
  onClose,
  onCreateAccount,
}) => {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<NewHireDraft>({ ...defaultNewHireDraft });

  const updateDraft = (updates: Partial<NewHireDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const resetAndClose = () => {
    setStep(1);
    setDraft({ ...defaultNewHireDraft });
    onClose();
  };

  const isStep1Valid =
    draft.fullName.trim() !== "" &&
    draft.email.trim() !== "" &&
    draft.role.trim() !== "" &&
    draft.primaryTeam.trim() !== "" &&
    draft.managerName.trim() !== "" &&
    draft.startDate.trim() !== "";

  const handleCreate = () => {
    onCreateAccount(draft);
    setStep(1);
    setDraft({ ...defaultNewHireDraft });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && resetAndClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Step 1 · Basics"}
            {step === 2 && "Step 2 · Employment details"}
            {step === 3 && "Step 3 · Onboarding content"}
            {step === 4 && "Step 4 · Review & create account"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Enter the new hire's basic information."}
            {step === 2 && "Set up employment details for this hire."}
            {step === 3 &&
              "Choose what this new hire sees during their first-login onboarding flow."}
            {step === 4 &&
              "Review all details before creating the account."}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Basics */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name *</Label>
              <Input
                id="fullName"
                value={draft.fullName}
                onChange={(e) => updateDraft({ fullName: e.target.value })}
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="preferredName">Preferred name</Label>
              <Input
                id="preferredName"
                value={draft.preferredName || ""}
                onChange={(e) => updateDraft({ preferredName: e.target.value })}
                placeholder="Jane"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Company email *</Label>
              <Input
                id="email"
                type="email"
                value={draft.email}
                onChange={(e) => updateDraft({ email: e.target.value })}
                placeholder="jane@company.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role">Role / job title *</Label>
              <Input
                id="role"
                value={draft.role}
                onChange={(e) => updateDraft({ role: e.target.value })}
                placeholder="Software Engineer"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="primaryTeam">Primary team *</Label>
              <Input
                id="primaryTeam"
                value={draft.primaryTeam}
                onChange={(e) => updateDraft({ primaryTeam: e.target.value })}
                placeholder="Engineering"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="managerName">Manager *</Label>
              <Input
                id="managerName"
                value={draft.managerName}
                onChange={(e) => updateDraft({ managerName: e.target.value })}
                placeholder="David Park"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="startDate">Start date *</Label>
              <Input
                id="startDate"
                type="date"
                value={draft.startDate}
                onChange={(e) => updateDraft({ startDate: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Contract type *</Label>
              <RadioGroup
                value={draft.contractType}
                onValueChange={(v) =>
                  updateDraft({ contractType: v as ContractType })
                }
                className="flex gap-4 pt-1"
              >
                {(
                  Object.entries(contractLabels) as [ContractType, string][]
                ).map(([value, label]) => (
                  <div key={value} className="flex items-center gap-1.5">
                    <RadioGroupItem value={value} id={`ct-${value}`} />
                    <Label htmlFor={`ct-${value}`} className="font-normal">
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 2: Employment details */}
        {step === 2 && (
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="location">Location (city, country)</Label>
                <Input
                  id="location"
                  value={draft.location}
                  onChange={(e) => updateDraft({ location: e.target.value })}
                  placeholder="London, UK"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="timeZone">Time zone</Label>
                <Select
                  value={draft.timeZone}
                  onValueChange={(v) => updateDraft({ timeZone: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZoneOptions.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="workPattern">Work pattern</Label>
                <Select
                  value={draft.workPattern}
                  onValueChange={(v) => updateDraft({ workPattern: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select work pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    {workPatternOptions.map((wp) => (
                      <SelectItem key={wp} value={wp}>
                        {wp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              These details help schedule meetings and set expectations.
            </p>
          </div>
        )}

        {/* Step 3: Onboarding content */}
        {step === 3 && (
          <div className="space-y-5 mt-2">
            <p className="text-sm text-muted-foreground">
              Choose what this new hire sees during their first-login onboarding
              flow.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="showCompanyIntro"
                  checked={draft.showCompanyIntro}
                  onCheckedChange={(c) =>
                    updateDraft({ showCompanyIntro: c === true })
                  }
                />
                <Label htmlFor="showCompanyIntro" className="font-normal">
                  Show company intro slides
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="showClubhouseIntro"
                  checked={draft.showClubhouseIntro}
                  onCheckedChange={(c) =>
                    updateDraft({ showClubhouseIntro: c === true })
                  }
                />
                <Label htmlFor="showClubhouseIntro" className="font-normal">
                  Show Clubhouse product intro
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="requirePolicies"
                  checked={draft.requirePolicies}
                  onCheckedChange={(c) =>
                    updateDraft({ requirePolicies: c === true })
                  }
                />
                <Label htmlFor="requirePolicies" className="font-normal">
                  Ask them to accept key policies
                </Label>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <Switch
                id="sendInviteNow"
                checked={draft.sendInviteNow}
                onCheckedChange={(c) => updateDraft({ sendInviteNow: c })}
              />
              <Label htmlFor="sendInviteNow" className="font-normal">
                Send invite email immediately
              </Label>
            </div>
          </div>
        )}

        {/* Step 4: Review & create */}
        {step === 4 && (
          <div className="space-y-4 mt-2">
            <div className="rounded-md border border-border p-4 space-y-3">
              <h4 className="font-semibold text-sm">Basics</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-muted-foreground">Name</span>
                <span>
                  {draft.fullName}
                  {draft.preferredName
                    ? ` (${draft.preferredName})`
                    : ""}
                </span>
                <span className="text-muted-foreground">Email</span>
                <span>{draft.email}</span>
                <span className="text-muted-foreground">Role</span>
                <span>{draft.role}</span>
                <span className="text-muted-foreground">Team</span>
                <span>{draft.primaryTeam}</span>
                <span className="text-muted-foreground">Manager</span>
                <span>{draft.managerName}</span>
                <span className="text-muted-foreground">Start date</span>
                <span>{draft.startDate}</span>
                <span className="text-muted-foreground">Contract</span>
                <span>{contractLabels[draft.contractType]}</span>
              </div>
            </div>

            <div className="rounded-md border border-border p-4 space-y-3">
              <h4 className="font-semibold text-sm">Employment details</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-muted-foreground">Location</span>
                <span>{draft.location || "—"}</span>
                <span className="text-muted-foreground">Time zone</span>
                <span>{draft.timeZone}</span>
                <span className="text-muted-foreground">Work pattern</span>
                <span>{draft.workPattern}</span>
              </div>
            </div>

            <div className="rounded-md border border-border p-4 space-y-3">
              <h4 className="font-semibold text-sm">Onboarding</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-muted-foreground">Company intro</span>
                <span>{draft.showCompanyIntro ? "Yes" : "No"}</span>
                <span className="text-muted-foreground">
                  Clubhouse intro
                </span>
                <span>{draft.showClubhouseIntro ? "Yes" : "No"}</span>
                <span className="text-muted-foreground">
                  Policy acceptance
                </span>
                <span>{draft.requirePolicies ? "Yes" : "No"}</span>
                <span className="text-muted-foreground">
                  Send invite now
                </span>
                <span>{draft.sendInviteNow ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-4">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {step === 1 && (
              <Button variant="outline" onClick={resetAndClose}>
                Cancel
              </Button>
            )}
            {step < 4 && (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 && !isStep1Valid}
              >
                Next
              </Button>
            )}
            {step === 4 && (
              <Button onClick={handleCreate}>Create account</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewHireWizard;
