"use client";

import React, { useState } from "react";
import CardBox from "@/app/components/shared/CardBox";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
  InviteRow,
  InviteStatus,
  NewHireDraft,
  defaultNewHireDraft,
} from "@/app/(DashboardLayout)/types/hr";
import NewHireWizard from "./NewHireWizard";
import InviteTable from "./InviteTable";
import { Alert, AlertTitle } from "@/components/ui/alert";

const seedInvites: InviteRow[] = [
  {
    id: "inv-001",
    fullName: "Alice Johnson",
    email: "alice.johnson@company.com",
    team: "Engineering",
    managerName: "David Park",
    invitedAt: "2026-03-01T10:00:00Z",
    status: "COMPLETED",
    lastActivity: "2026-03-03T14:30:00Z",
  },
  {
    id: "inv-002",
    fullName: "Bob Martinez",
    email: "bob.martinez@company.com",
    team: "Design",
    managerName: "Sarah Chen",
    invitedAt: "2026-03-04T09:00:00Z",
    status: "IN_PROGRESS",
    lastActivity: "2026-03-07T11:00:00Z",
  },
  {
    id: "inv-003",
    fullName: "Carol Williams",
    email: "carol.williams@company.com",
    team: "Marketing",
    managerName: "James Lee",
    invitedAt: "2026-03-06T14:00:00Z",
    status: "PENDING",
  },
  {
    id: "inv-004",
    fullName: "Daniel Kim",
    email: "daniel.kim@company.com",
    team: "Engineering",
    managerName: "David Park",
    invitedAt: "2026-02-20T08:00:00Z",
    status: "COMPLETED",
    lastActivity: "2026-02-25T16:00:00Z",
  },
  {
    id: "inv-005",
    fullName: "Eva Nguyen",
    email: "eva.nguyen@company.com",
    team: "Product",
    managerName: "Mike Brown",
    invitedAt: "2026-03-08T11:00:00Z",
    status: "PENDING",
  },
  {
    id: "inv-006",
    fullName: "Frank Torres",
    email: "frank.torres@company.com",
    team: "Sales",
    managerName: "Lisa Wang",
    invitedAt: "2026-03-02T13:00:00Z",
    status: "IN_PROGRESS",
    lastActivity: "2026-03-05T09:30:00Z",
  },
];

const HRApp = () => {
  const [invites, setInvites] = useState<InviteRow[]>(seedInvites);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<InviteStatus | "ALL">("ALL");

  const handleCreateAccount = (draft: NewHireDraft) => {
    const newInvite: InviteRow = {
      id: `inv-${String(invites.length + 1).padStart(3, "0")}`,
      fullName: draft.fullName,
      email: draft.email,
      team: draft.primaryTeam,
      managerName: draft.managerName,
      invitedAt: new Date().toISOString(),
      status: "PENDING",
    };
    setInvites((prev) => [newInvite, ...prev]);
    setWizardOpen(false);
    setToast("Account created and invite sent.");
    setTimeout(() => setToast(null), 4000);
  };

  const handleResendInvite = (id: string) => {
    console.log("Resend invite for", id);
    setToast("Invite resent successfully.");
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenProfile = (id: string) => {
    console.log(`open profile ${id}`);
  };

  const handleCancelInvite = (id: string) => {
    setInvites((prev) => prev.filter((inv) => inv.id !== id));
    console.log("Cancel invite for", id);
  };

  return (
    <>
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <Alert variant="lightsuccess" className="shadow-lg border border-success/20">
            <Icon icon="tabler:check" className="h-4 w-4" />
            <AlertTitle>{toast}</AlertTitle>
          </Alert>
        </div>
      )}

      {/* Header section */}
      <CardBox className="mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                HR · People &amp; onboarding
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Create new employee accounts and track onboarding status.
              </p>
            </div>
            <Button onClick={() => setWizardOpen(true)}>
              <Icon icon="tabler:user-plus" className="mr-2 h-5 w-5" />
              Create employee account
            </Button>
          </div>
        </div>
      </CardBox>

      {/* Invites & onboarding status table */}
      <CardBox>
        <InviteTable
          invites={invites}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onResendInvite={handleResendInvite}
          onOpenProfile={handleOpenProfile}
          onCancelInvite={handleCancelInvite}
        />
      </CardBox>

      {/* New hire wizard */}
      <NewHireWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onCreateAccount={handleCreateAccount}
      />
    </>
  );
};

export default HRApp;
