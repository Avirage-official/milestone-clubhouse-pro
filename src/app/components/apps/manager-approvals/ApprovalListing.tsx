"use client";

import { format } from "date-fns";
import { Ticket } from "@/app/(DashboardLayout)/types/ticket";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  requestTypeLabelMap,
  stageLabelMap,
  stageBadgeVariant,
  statusBadgeVariant,
  statusLabelMap,
} from "./ticketConstants";

interface ApprovalListingProps {
  tickets: Ticket[];
  onReview: (ticket: Ticket) => void;
}

const ApprovalListing: React.FC<ApprovalListingProps> = ({
  tickets,
  onReview,
}) => {
  if (tickets.length === 0) {
    return (
      <div className="my-6 text-center py-12">
        <p className="text-muted-foreground text-sm">
          No pending approvals at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-end">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                className="cursor-pointer"
                onClick={() => onReview(ticket)}
              >
                <TableCell className="max-w-xs">
                  <h6 className="text-base truncate">{ticket.title}</h6>
                  <p className="text-xs text-muted-foreground">
                    {requestTypeLabelMap[ticket.requestType] ||
                      ticket.requestType}{" "}
                    • Submitted by {ticket.submittedBy}
                  </p>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{ticket.companyName}</span>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={`${stageBadgeVariant(ticket.stage)}`}
                    className="rounded-md"
                  >
                    {stageLabelMap[ticket.stage] || ticket.stage}
                  </Badge>
                </TableCell>

                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(ticket.submittedAt), "E, MMM d")}
                  </p>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={`${statusBadgeVariant(ticket.status)}`}
                    className="rounded-md"
                  >
                    {statusLabelMap[ticket.status] || ticket.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-end">
                  <Button
                    size="sm"
                    className="rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReview(ticket);
                    }}
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApprovalListing;
