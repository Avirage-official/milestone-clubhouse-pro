import CreateTicketForm from "@/app/components/apps/tickets/CreateTicketForm";
import type { Metadata } from "next";
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";


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
const CreateTickets = () => {
    return (
        <>
            <BreadcrumbComp title="Change Requests" items={BCrumb} />
            <CreateTicketForm />

        </>
    );
};

export default CreateTickets;