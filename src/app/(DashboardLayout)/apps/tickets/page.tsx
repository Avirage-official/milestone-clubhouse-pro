import TicketsApp from "@/app/components/apps/tickets";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Requests",
};

const BCrumb = [
  {
    to: "/dashboard",
    title: "Home",
  },
  {
    title: "Change Requests",
  },
];
const Tickets = () => {
  return (
    <>
      <BreadcrumbComp title="Change Requests" items={BCrumb} />
      <TicketsApp />
    </>
  );
};

export default Tickets;
