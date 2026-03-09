"use client";
import React, { useEffect, useState } from "react";
import CardBox from "@/app/components/shared/CardBox";
import TicketFilter from "@/app/components/apps/tickets/TicketFilter";
import TicketListing from "@/app/components/apps/tickets/TicketListing";
import { Ticket } from "@/app/(DashboardLayout)/types/ticket";

const TicketsApp = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<string>("total_tickets");
  const [ticketSearch, setTicketSearch] = useState<string>("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/api/ticket", {
          headers: {
            browserrefreshed: "false",
          },
        });
        const json = await res.json();
        setTickets(json.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  const deleteTicket = async (id: number) => {
    try {
      await fetch("/api/ticket", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  };

  const searchTickets = (text: string) => {
    setTicketSearch(text);
  };  

  const viewDetails = (id: number) => {
    // Placeholder for future detail view / modal
    console.log("View details for request:", id);
  };

  return (
    <CardBox>
      <TicketFilter tickets={tickets} setFilter={setFilter} />
      <TicketListing
        tickets={tickets}
        filter={filter}
        ticketSearch={ticketSearch}
        deleteTicket={deleteTicket}
        onViewDetails={viewDetails}
        searchTickets={searchTickets}
      />
    </CardBox>
  );
};

export default TicketsApp;
