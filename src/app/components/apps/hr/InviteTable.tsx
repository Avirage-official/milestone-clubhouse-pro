"use client";

import React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { InviteRow, InviteStatus } from "@/app/(DashboardLayout)/types/hr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InviteTableProps {
  invites: InviteRow[];
  statusFilter: InviteStatus | "ALL";
  setStatusFilter: (f: InviteStatus | "ALL") => void;
  onResendInvite: (id: string) => void;
  onOpenProfile: (id: string) => void;
  onCancelInvite: (id: string) => void;
}

const statusBadgeVariant = (status: InviteStatus) => {
  switch (status) {
    case "PENDING":
      return "lightWarning";
    case "IN_PROGRESS":
      return "lightPrimary";
    case "COMPLETED":
      return "lightSuccess";
    default:
      return "default";
  }
};

const statusLabel: Record<InviteStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

const InviteTable: React.FC<InviteTableProps> = ({
  invites,
  statusFilter,
  setStatusFilter,
  onResendInvite,
  onOpenProfile,
  onCancelInvite,
}) => {
  const pendingCount = invites.filter((i) => i.status === "PENDING").length;
  const inProgressCount = invites.filter(
    (i) => i.status === "IN_PROGRESS"
  ).length;
  const completedCount = invites.filter(
    (i) => i.status === "COMPLETED"
  ).length;

  const filteredInvites =
    statusFilter === "ALL"
      ? invites
      : invites.filter((i) => i.status === statusFilter);

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Invites &amp; onboarding</h3>

      {/* Stats row */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        <div className="lg:col-span-4 md:col-span-4 col-span-12 p-4 bg-lightwarning text-center rounded-md">
          <h3 className="text-warning text-2xl">{pendingCount}</h3>
          <h6 className="text-sm text-warning">Pending invites</h6>
        </div>
        <div className="lg:col-span-4 md:col-span-4 col-span-12 p-4 bg-lightprimary text-center rounded-md">
          <h3 className="text-primary text-2xl">{inProgressCount}</h3>
          <h6 className="text-sm text-primary">In onboarding</h6>
        </div>
        <div className="lg:col-span-4 md:col-span-4 col-span-12 p-4 bg-lightsuccess text-center rounded-md">
          <h3 className="text-success text-2xl">{completedCount}</h3>
          <h6 className="text-sm text-success">Completed</h6>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground">Status:</span>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as InviteStatus | "ALL")}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="IN_PROGRESS">In progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Invited</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-end">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvites.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell>
                  <span className="text-sm font-medium">
                    {invite.fullName}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{invite.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{invite.team}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{invite.managerName}</span>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(invite.invitedAt), "E, MMM d")}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusBadgeVariant(invite.status)}
                    className="rounded-md"
                  >
                    {statusLabel[invite.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-end">
                  <div className="flex justify-end gap-1">
                    {invite.status === "PENDING" && (
                      <>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-primary"
                                onClick={() => onResendInvite(invite.id)}
                              >
                                <Icon icon="tabler:mail-forward" height="18" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Resend invite</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-error"
                                onClick={() => onCancelInvite(invite.id)}
                              >
                                <Icon icon="tabler:x" height="18" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cancel invite</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </>
                    )}
                    {invite.status === "COMPLETED" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:text-primary"
                              onClick={() => onOpenProfile(invite.id)}
                            >
                              <Icon icon="tabler:user" height="18" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Open profile</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredInvites.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-muted-foreground">No invites found.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InviteTable;
