import TeamOverviewApp from "@/app/components/apps/team-overview";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Overview",
};

const BCrumb = [
  { to: "/dashboard", title: "Home" },
  { title: "Team Overview" },
];

const TeamOverview = () => {
  return (
    <>
      <BreadcrumbComp title="Team Overview" items={BCrumb} />
      <TeamOverviewApp />
    </>
  );
};

export default TeamOverview;
