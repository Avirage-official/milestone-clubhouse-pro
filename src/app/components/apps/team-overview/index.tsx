"use client";

import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import CardBox from "@/app/components/shared/CardBox";
import { Input } from "@/components/ui/input";
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
import type { TeamMember, WorkPattern } from "@/app/(DashboardLayout)/types/team";
import { currentUser, teamMembers as allMembers } from "./mockData";

/* ------------------------------------------------------------------ */
/*  Badge helpers (same pattern as TicketListing / InviteTable)       */
/* ------------------------------------------------------------------ */

const workPatternLabel: Record<WorkPattern, string> = {
  OFFICE: "Office",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
};

const workPatternBadgeVariant = (wp: WorkPattern) => {
  switch (wp) {
    case "OFFICE":
      return "lightPrimary";
    case "REMOTE":
      return "lightSuccess";
    case "HYBRID":
      return "lightWarning";
    default:
      return "default";
  }
};

const onboardingLabel: Record<string, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

const onboardingBadgeVariant = (status: string) => {
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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const TeamOverviewApp = () => {
  const role = currentUser.role;
  const isHR = role === "HR";
  const isManager = role === "MANAGER";

  /* ---- access gate ---- */
  if (!isHR && !isManager) {
    return (
      <CardBox>
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Access denied</h3>
          <p className="text-muted-foreground">
            You do not have permission to view this page.
          </p>
        </div>
      </CardBox>
    );
  }

  /* ---- role-based member list ---- */
  const baseMembers: TeamMember[] = isHR
    ? allMembers
    : allMembers.filter(
        (m) =>
          m.managerName === currentUser.fullName ||
          (currentUser.managedTeams ?? []).includes(m.primaryTeam)
      );

  return <TeamOverviewInner members={baseMembers} isHR={isHR} />;
};

/* ------------------------------------------------------------------ */
/*  Inner component (uses hooks safely)                                */
/* ------------------------------------------------------------------ */

interface InnerProps {
  members: TeamMember[];
  isHR: boolean;
}

const TeamOverviewInner: React.FC<InnerProps> = ({ members, isHR }) => {
  /* ---- filter state ---- */
  const [teamFilter, setTeamFilter] = useState("ALL");
  const [locationFilter, setLocationFilter] = useState("ALL");
  const [wpFilter, setWpFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [openTicketsOnly, setOpenTicketsOnly] = useState(false);

  /* ---- derived filter options ---- */
  const teams = useMemo(
    () => Array.from(new Set(members.map((m) => m.primaryTeam))).sort(),
    [members]
  );
  const locations = useMemo(
    () => Array.from(new Set(members.map((m) => m.location))).sort(),
    [members]
  );

  /* ---- visible members ---- */
  const visibleMembers = useMemo(() => {
    const lower = search.toLowerCase();
    return members.filter((m) => {
      if (teamFilter !== "ALL" && m.primaryTeam !== teamFilter) return false;
      if (locationFilter !== "ALL" && m.location !== locationFilter)
        return false;
      if (wpFilter !== "ALL" && m.workPattern !== wpFilter) return false;
      if (openTicketsOnly && m.openTicketsCount === 0) return false;
      if (
        lower &&
        !(m.fullName.toLowerCase().includes(lower) ||
          (m.preferredName ?? "").toLowerCase().includes(lower) ||
          m.roleTitle.toLowerCase().includes(lower))
      )
        return false;
      return true;
    });
  }, [members, teamFilter, locationFilter, wpFilter, search, openTicketsOnly]);

  /* ---- stats ---- */
  const totalCount = members.length;
  const remoteHybridCount = members.filter(
    (m) => m.workPattern !== "OFFICE"
  ).length;
  const withOpenTickets = members.filter((m) => m.hasOpenTickets).length;
  const totalOpenTickets = members.reduce(
    (sum, m) => sum + m.openTicketsCount,
    0
  );

  /* ---- handlers ---- */
  const handleViewProfile = (id: string) => {
    console.log("View profile for member:", id);
  };

  const handleResendInvite = (id: string) => {
    console.log("Resend invite for member:", id);
  };

  return (
    <CardBox>
      <div className="p-6">
        {/* ---- Header ---- */}
        <h3 className="text-lg font-semibold mb-1">
          {isHR ? "People overview" : "My team"}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {isHR
            ? "See employees across teams, locations, and work patterns."
            : "See your team's key details, locations, and open requests."}
        </p>

        {/* ---- Stats row ---- */}
        <div className="grid grid-cols-12 gap-4 mb-6">
          <div className="lg:col-span-4 md:col-span-4 col-span-12 p-4 bg-lightprimary text-center rounded-md">
            <h3 className="text-primary text-2xl">{totalCount}</h3>
            <h6 className="text-sm text-primary">
              {isHR ? "Total employees" : "Total team members"}
            </h6>
          </div>
          <div className="lg:col-span-4 md:col-span-4 col-span-12 p-4 bg-lightwarning text-center rounded-md">
            <h3 className="text-warning text-2xl">{remoteHybridCount}</h3>
            <h6 className="text-sm text-warning">Remote / hybrid</h6>
          </div>
          <div className="lg:col-span-4 md:col-span-4 col-span-12 p-4 bg-lightsuccess text-center rounded-md">
            <h3 className="text-success text-2xl">{withOpenTickets}</h3>
            <h6 className="text-sm text-success">
              With open tickets
              {totalOpenTickets > 0 && (
                <span className="block text-xs font-normal">
                  ({totalOpenTickets} total)
                </span>
              )}
            </h6>
          </div>
        </div>

        {/* ---- Filters bar ---- */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Left-side dropdowns */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Team:</span>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                {teams.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Location:</span>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Work pattern:</span>
            <Select value={wpFilter} onValueChange={setWpFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="OFFICE">Office</SelectItem>
                <SelectItem value="REMOTE">Remote</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Manager: open-tickets toggle */}
          {!isHR && (
            <Button
              variant={openTicketsOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setOpenTicketsOnly((v) => !v)}
            >
              <Icon icon="tabler:filter" height="16" className="mr-1" />
              Open tickets only
            </Button>
          )}

          {/* Search */}
          <div className="relative sm:max-w-60 max-w-full w-full">
            <Icon
              icon="tabler:search"
              height={18}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              type="text"
              className="pl-8"
              placeholder="Search by name or role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ---- Table ---- */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Team</TableHead>
                {isHR && <TableHead>Manager</TableHead>}
                <TableHead>Location</TableHead>
                <TableHead>Work pattern</TableHead>
                <TableHead>Open tickets</TableHead>
                {isHR && <TableHead>Onboarding</TableHead>}
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleMembers.map((member) => (
                <TableRow key={member.id}>
                  {/* Name */}
                  <TableCell>
                    <span className="text-sm font-medium">
                      {member.preferredName || member.fullName}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {member.roleTitle}
                    </span>
                  </TableCell>

                  {/* Team */}
                  <TableCell>
                    <span className="text-sm">{member.primaryTeam}</span>
                  </TableCell>

                  {/* Manager (HR only) */}
                  {isHR && (
                    <TableCell>
                      <span className="text-sm">{member.managerName}</span>
                    </TableCell>
                  )}

                  {/* Location */}
                  <TableCell>
                    <span className="text-sm">{member.location}</span>
                    <span className="block text-xs text-muted-foreground">
                      {member.timeZone}
                    </span>
                  </TableCell>

                  {/* Work pattern */}
                  <TableCell>
                    <Badge
                      variant={workPatternBadgeVariant(member.workPattern)}
                      className="rounded-md"
                    >
                      {workPatternLabel[member.workPattern]}
                    </Badge>
                  </TableCell>

                  {/* Open tickets */}
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {member.hasOpenTickets && (
                        <span className="inline-block h-2 w-2 rounded-full bg-warning" />
                      )}
                      <span className="text-sm">
                        {member.openTicketsCount}
                      </span>
                    </div>
                  </TableCell>

                  {/* Onboarding (HR only) */}
                  {isHR && (
                    <TableCell>
                      {member.onboardingStatus ? (
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant={onboardingBadgeVariant(
                              member.onboardingStatus
                            )}
                            className="rounded-md"
                          >
                            {onboardingLabel[member.onboardingStatus]}
                          </Badge>
                          {member.onboardingStatus === "IN_PROGRESS" && (
                            <span className="text-xs text-muted-foreground">
                              Onboarding
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          —
                        </span>
                      )}
                    </TableCell>
                  )}

                  {/* Actions */}
                  <TableCell className="text-end">
                    <div className="flex justify-end gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:text-primary"
                              onClick={() => handleViewProfile(member.id)}
                            >
                              <Icon icon="tabler:user" height="18" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View profile</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {/* HR: Resend invite for PENDING onboarding */}
                      {isHR && member.onboardingStatus === "PENDING" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-warning"
                                onClick={() => handleResendInvite(member.id)}
                              >
                                <Icon
                                  icon="tabler:mail-forward"
                                  height="18"
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Resend invite</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {visibleMembers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={isHR ? 8 : 6}
                    className="text-center py-8"
                  >
                    <p className="text-muted-foreground">
                      No team members found.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </CardBox>
  );
};

export default TeamOverviewApp;
