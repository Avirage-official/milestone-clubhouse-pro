"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Ticket } from "@/app/(DashboardLayout)/types/ticket";
import { CurrentUser } from "@/app/(DashboardLayout)/types/team";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface TicketDetailPanelProps {
  ticket: Ticket | null;
  open: boolean;
  onClose: () => void;
  currentUser: CurrentUser;
  onApprove: (ticket: Ticket) => void;
  onReject: (ticket: Ticket, reason: string) => void;
  onRequestChanges: (ticket: Ticket, comment: string) => void;
}

const requestTypeLabelMap: Record<string, string> = {
  ORG_CHANGE: "Org change",
  POLICY_CHANGE: "Policy change",
  ACCESS_REQUEST: "Access request",
  OTHER: "Other",
};

const stageLabelMap: Record<string, string> = {
  NEW: "New",
  MANAGER_REVIEW: "Manager review",
  CEO_REVIEW: "CEO review",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
};

const stageBadgeVariant = (stage: string) => {
  switch (stage) {
    case "NEW":
      return "lightPrimary";
    case "MANAGER_REVIEW":
      return "lightWarning";
    case "CEO_REVIEW":
      return "lightSuccess";
    case "COMPLETED":
      return "lightSuccess";
    case "REJECTED":
      return "lightError";
    default:
      return "default";
  }
};

const stageTimeline: Record<string, string[]> = {
  NEW: ["New"],
  MANAGER_REVIEW: ["New", "Manager review"],
  CEO_REVIEW: ["New", "Manager review", "CEO review"],
  COMPLETED: ["New", "Manager review", "CEO review", "Completed"],
  REJECTED: ["New", "Rejected"],
};

const TicketDetailPanel: React.FC<TicketDetailPanelProps> = ({
  ticket,
  open,
  onClose,
  currentUser,
  onApprove,
  onReject,
  onRequestChanges,
}) => {
  const [comment, setComment] = useState("");

  const isManager = currentUser.role === "MANAGER";
  const isCEO = currentUser.role === "CEO";

  const canAct =
    ticket &&
    ((isManager &&
      ticket.stage === "MANAGER_REVIEW" &&
      ticket.managerName === currentUser.fullName) ||
      (isCEO &&
        ticket.stage === "CEO_REVIEW" &&
        ticket.ceoName === currentUser.fullName));

  const handleApprove = () => {
    if (!ticket) return;
    onApprove(ticket);
    setComment("");
  };

  const handleReject = () => {
    if (!ticket) return;
    onReject(ticket, comment);
    setComment("");
  };

  const handleRequestChanges = () => {
    if (!ticket) return;
    onRequestChanges(ticket, comment);
    setComment("");
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent
        side="right"
        className="sm:max-w-lg w-full overflow-y-auto p-6"
      >
        <SheetHeader className="mb-4">
          <SheetTitle>{ticket?.title || "Ticket Details"}</SheetTitle>
          <SheetDescription>
            {ticket
              ? `${ticket.companyName} • ${requestTypeLabelMap[ticket.requestType] || ticket.requestType}`
              : ""}
          </SheetDescription>
        </SheetHeader>

        {ticket && (
          <div className="space-y-5">
            {/* Description */}
            <div>
              <h6 className="text-sm font-medium text-muted-foreground mb-1">
                Description
              </h6>
              <p className="text-sm">{ticket.description}</p>
            </div>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Submitted by</span>
                <p className="font-medium">{ticket.submittedBy}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Submitted</span>
                <p className="font-medium">
                  {format(new Date(ticket.submittedAt), "MMM d, yyyy")}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Request type</span>
                <p className="font-medium">
                  {requestTypeLabelMap[ticket.requestType] ||
                    ticket.requestType}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Stage</span>
                <div className="mt-0.5">
                  <Badge
                    variant={`${stageBadgeVariant(ticket.stage)}`}
                    className="rounded-md"
                  >
                    {stageLabelMap[ticket.stage] || ticket.stage}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Stage timeline */}
            <div>
              <h6 className="text-sm font-medium text-muted-foreground mb-2">
                Progress
              </h6>
              <div className="flex items-center gap-2 flex-wrap">
                {(stageTimeline[ticket.stage] || [ticket.stage]).map(
                  (step, i, arr) => (
                    <React.Fragment key={step}>
                      <span className="text-xs px-2 py-1 rounded bg-lightprimary text-primary">
                        {step}
                      </span>
                      {i < arr.length - 1 && (
                        <span className="text-muted-foreground text-xs">→</span>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            </div>

            {/* Approver context line */}
            {canAct && (
              <div className="text-sm text-muted-foreground italic border-l-2 border-primary pl-3">
                {isManager
                  ? "You are the manager approver for this request."
                  : "You are the CEO approver for this request."}
              </div>
            )}

            {/* Action area */}
            {canAct && (
              <div className="space-y-3 border-t pt-4">
                <Textarea
                  placeholder="Add a comment (optional for approve, recommended for reject/changes)…"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />

                <div className="flex flex-wrap gap-2">
                  <Button className="rounded-md" onClick={handleApprove}>
                    {isManager ? "Approve & send to CEO" : "Approve & complete"}
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-md"
                    onClick={handleRequestChanges}
                  >
                    Request changes
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-md text-error hover:bg-lighterror hover:text-error"
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default TicketDetailPanel;
