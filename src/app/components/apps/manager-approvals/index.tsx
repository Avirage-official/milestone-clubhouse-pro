"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CardBox from "@/app/components/shared/CardBox";
import ApprovalFilter from "@/app/components/apps/manager-approvals/ApprovalFilter";
import ApprovalListing from "@/app/components/apps/manager-approvals/ApprovalListing";
import TicketDetailPanel from "@/app/components/apps/manager-approvals/TicketDetailPanel";
import { Ticket } from "@/app/(DashboardLayout)/types/ticket";
import { CurrentUser } from "@/app/(DashboardLayout)/types/team";
import { Alert, AlertTitle } from "@/components/ui/alert";

// Mock current user — change role/fullName to test different views.
// 'Carol Davis' (MANAGER) sees MANAGER_REVIEW tickets assigned to her.
// 'Frank Lee' (CEO) sees CEO_REVIEW tickets assigned to him.
const currentUser: CurrentUser = {
  id: "usr-mgr",
  role: "MANAGER",
  fullName: "Carol Davis",
};

const ManagerApprovalsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isManager = currentUser.role === "MANAGER";
  const isCEO = currentUser.role === "CEO";
  const hasApprovalRole = isManager || isCEO;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/api/ticket", {
          headers: { browserrefreshed: "false" },
        });
        const json = await res.json();
        setTickets(json.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  // Show toast and auto-dismiss
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  // Derive filtered lists based on role
  const pendingApprovals = tickets.filter((ticket) => {
    if (isManager) {
      return (
        ticket.stage === "MANAGER_REVIEW" &&
        ticket.managerName === currentUser.fullName
      );
    }
    if (isCEO) {
      return (
        ticket.stage === "CEO_REVIEW" &&
        ticket.ceoName === currentUser.fullName
      );
    }
    return false;
  });

  const completedCount = tickets.filter(
    (t) =>
      t.stage === "COMPLETED" &&
      ((isManager && t.managerName === currentUser.fullName) ||
        (isCEO && t.ceoName === currentUser.fullName))
  ).length;

  const rejectedCount = tickets.filter(
    (t) =>
      t.stage === "REJECTED" &&
      ((isManager && t.managerName === currentUser.fullName) ||
        (isCEO && t.ceoName === currentUser.fullName))
  ).length;

  // Open the detail panel
  const handleReview = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setSelectedTicket(null);
  };

  // Helper to update a ticket both locally and via API
  const updateTicket = async (id: number, updates: Partial<Ticket>) => {
    try {
      await fetch("/api/ticket", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
    } catch (err) {
      console.error("Error updating ticket:", err);
    }

    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  // Approve handler
  const handleApprove = async (ticket: Ticket) => {
    if (isManager) {
      await updateTicket(ticket.id, {
        stage: "CEO_REVIEW",
        status: "OPEN",
      });
      showToast("Approved and sent to CEO");
    } else if (isCEO) {
      await updateTicket(ticket.id, {
        stage: "COMPLETED",
        status: "CLOSED",
      });
      showToast("Approved and completed");
    }
    closePanel();
  };

  // Reject handler
  const handleReject = async (ticket: Ticket, _reason: string) => {
    await updateTicket(ticket.id, {
      stage: "REJECTED",
      status: "CLOSED",
    });
    showToast("Request rejected");
    closePanel();
  };

  // Request changes handler
  const handleRequestChanges = async (ticket: Ticket, _comment: string) => {
    await updateTicket(ticket.id, {
      status: "ON_HOLD",
    });
    showToast("Changes requested — ticket is on hold");
    closePanel();
  };

  // Role guard: non-manager/non-CEO
  if (!hasApprovalRole) {
    return (
      <CardBox className="p-8 text-center max-w-md mx-auto mt-12">
        <Icon
          icon="solar:lock-keyhole-linear"
          height={48}
          className="mx-auto mb-4 text-muted-foreground"
        />
        <h5 className="text-lg font-semibold mb-2">No approvals assigned</h5>
        <p className="text-sm text-muted-foreground">
          You don&apos;t have any approval responsibilities in this workspace.
        </p>
      </CardBox>
    );
  }

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <Alert
            variant="lightsuccess"
            className="shadow-lg border border-success/20"
          >
            <Icon icon="tabler:check" className="h-4 w-4" />
            <AlertTitle>{toast}</AlertTitle>
          </Alert>
        </div>
      )}

      <CardBox>
        {/* Header */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold">My approvals</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {isManager
              ? "Requests waiting for your review before moving to CEO or completion."
              : "Requests that managers have approved and are waiting for your decision."}
          </p>
        </div>

        {/* Summary cards */}
        <ApprovalFilter
          pendingCount={pendingApprovals.length}
          completedCount={completedCount}
          rejectedCount={rejectedCount}
        />

        {/* Approvals table */}
        <ApprovalListing tickets={pendingApprovals} onReview={handleReview} />
      </CardBox>

      {/* Detail panel */}
      <TicketDetailPanel
        ticket={selectedTicket}
        open={panelOpen}
        onClose={closePanel}
        currentUser={currentUser}
        onApprove={handleApprove}
        onReject={handleReject}
        onRequestChanges={handleRequestChanges}
      />
    </>
  );
};

export default ManagerApprovalsPage;
