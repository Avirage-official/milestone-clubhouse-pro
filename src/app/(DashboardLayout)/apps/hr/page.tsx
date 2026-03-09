import HRApp from "@/app/components/apps/hr";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR",
};

const BCrumb = [
  { to: "/dashboard", title: "Home" },
  { title: "HR" },
];

const HRPage = () => {
  return (
    <>
      <BreadcrumbComp title="HR" items={BCrumb} />
      <HRApp />
    </>
  );
};

export default HRPage;
