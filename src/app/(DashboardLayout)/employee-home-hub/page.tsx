import React from "react";
import { TopCards } from "@/app/components/employee-home-hub/TopCards";
import TodaysMissionCard from "@/app/components/employee-home-hub/TodaysMissionCard";
import DailyChecksCard from "@/app/components/employee-home-hub/DailyChecksCard";
import PetCard from "@/app/components/employee-home-hub/PetCard";
import SocialToolsCard from "@/app/components/employee-home-hub/SocialToolsCard";
import SongAndBestieCard from "@/app/components/employee-home-hub/SongAndBestieCard";
import { Footer } from "@/app/components/dashboard/Footer";

const EmployeeHomeHub = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* Top rotating cards */}
        <div className="col-span-12">
          <TopCards />
        </div>

        {/* Card A – Today's mission & tasks (left large card) */}
        <div className="lg:col-span-8 col-span-12">
          <TodaysMissionCard />
        </div>

        {/* Card B – Daily checks (right on desktop, stacked on mobile) */}
        <div className="lg:col-span-4 col-span-12">
          <DailyChecksCard />
        </div>

        {/* Card C1 – Pet card */}
        <div className="lg:col-span-4 col-span-12">
          <PetCard />
        </div>

        {/* Card C2 – Social & tools */}
        <div className="lg:col-span-4 col-span-12">
          <SocialToolsCard />
        </div>

        {/* Song of the day & Work bestie */}
        <div className="lg:col-span-4 col-span-12">
          <SongAndBestieCard />
        </div>

        {/* Footer */}
        <div className="col-span-12">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default EmployeeHomeHub;
