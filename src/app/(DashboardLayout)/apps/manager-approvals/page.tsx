import ManagerApprovalsPage from "@/app/components/apps/manager-approvals";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approvals",
};

const BCrumb = [
  {
    to: "/dashboard",
    title: "Home",
  },
  {
    title: "Approvals",
  },
];

const Approvals = () => {
  return (
    <>
      <BreadcrumbComp title="Approvals" items={BCrumb} />
      <ManagerApprovalsPage />
    </>
  );
};

export default Approvals;
