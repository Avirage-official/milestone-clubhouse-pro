"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { TicketType } from "@/app/(DashboardLayout)/types/ticket";
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

interface TicketListingProps {
  tickets: TicketType[];
  deleteTicket: (id: number) => void;
  searchTickets: (term: string) => void;
  ticketSearch: string;
  filter: string;
}

const stageLabelMap: Record<string, string> = {
  new: "New",
  manager_review: "Manager",
  ceo_review: "CEO",
  completed: "Completed",
  rejected: "Rejected",
};

const stageBadgeVariant = (stage: string) => {
  switch (stage) {
    case "new":
      return "lightPrimary";
    case "manager_review":
      return "lightWarning";
    case "ceo_review":
      return "lightSuccess";
    case "completed":
      return "lightSuccess";
    case "rejected":
      return "lightError";
    default:
      return "default";
  }
};

const statusBadgeVariant = (status: string) => {
  switch (status) {
    case "open":
      return "lightSuccess";
    case "on_hold":
      return "lightWarning";
    case "closed":
      return "lightError";
    default:
      return "default";
  }
};

const statusLabelMap: Record<string, string> = {
  open: "Open",
  on_hold: "On Hold",
  closed: "Closed",
};

const TicketListing: React.FC<TicketListingProps> = ({
  tickets,
  deleteTicket,
  searchTickets,
  ticketSearch,
  filter,
}) => {
  const getVisibleTickets = (
    tickets: TicketType[],
    filter: string,
    ticketSearch: string
  ) => {
    const lowerSearch = ticketSearch.toLowerCase();

    return tickets.filter(
      (ticket) =>
        !ticket.deleted &&
        (filter === "total_tickets" || ticket.stage === filter) &&
        ticket.title.toLowerCase().includes(lowerSearch)
    );
  };

  const visibleTickets = getVisibleTickets(tickets, filter, ticketSearch);

  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="relative sm:max-w-60 max-w-full w-full">
          <Icon
            icon="tabler:search"
            height={18}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            type="text"
            className="pl-8"
            onChange={(e) => searchTickets(e.target.value)}
            placeholder="Search requests"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Request</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-end">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleTickets.map((ticket) => (
              <TableRow key={ticket.Id}>
                <TableCell>{ticket.Id}</TableCell>

                <TableCell className="max-w-xs">
                  <h6 className="text-base truncate">{ticket.title}</h6>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{ticket.companyName}</span>
                </TableCell>

                <TableCell>
                  <Badge variant={`${stageBadgeVariant(ticket.stage)}`} className="rounded-md">
                    {stageLabelMap[ticket.stage] || ticket.stage}
                  </Badge>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{ticket.assignedToAdmin}</span>
                </TableCell>

                <TableCell>
                  <Badge variant={`${statusBadgeVariant(ticket.status)}`} className="rounded-md">
                    {statusLabelMap[ticket.status] || ticket.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(ticket.submittedAt), "E, MMM d")}
                  </p>
                </TableCell>

                <TableCell className="text-end">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-primary"
                        >
                          <Icon icon="tabler:eye" height="18" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TicketListing;
