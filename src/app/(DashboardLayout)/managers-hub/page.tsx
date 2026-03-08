
import React from "react";
import WorkdayRhythm from "@/app/components/managers-hub/WorkdayRhythm";
import { BreakTypes } from "@/app/components/managers-hub/BreakTypes";
import { EnergyOverWeek } from "@/app/components/managers-hub/EnergyOverWeek";
import { RecentRituals } from "@/app/components/managers-hub/RecentRituals";
import { TeamPerformance } from "@/app/components/managers-hub/TeamPerformance";
import { Footer } from "@/app/components/dashboard/Footer";
import { TopCards } from "@/app/components/managers-hub/TopCards";

const ManagersHub = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <TopCards />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <WorkdayRhythm />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <BreakTypes />
            </div>
            <div className="col-span-12">
              <EnergyOverWeek />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <RecentRituals />
        </div>
        <div className="lg:col-span-8 col-span-12 flex">
          <TeamPerformance />
        </div>
        <div className="col-span-12">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ManagersHub;
