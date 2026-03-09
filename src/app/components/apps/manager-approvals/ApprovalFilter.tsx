import React from "react";

interface ApprovalFilterProps {
  pendingCount: number;
  completedCount: number;
  rejectedCount: number;
}

const ApprovalFilter: React.FC<ApprovalFilterProps> = ({
  pendingCount,
  completedCount,
  rejectedCount,
}) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="lg:col-span-4 md:col-span-6 col-span-12 p-30 bg-lightwarning text-center rounded-md">
        <h3 className="text-warning text-2xl">{pendingCount}</h3>
        <h6 className="text-base text-warning">Pending Approvals</h6>
      </div>

      <div className="lg:col-span-4 md:col-span-6 col-span-12 p-30 bg-lightsuccess text-center rounded-md">
        <h3 className="text-success text-2xl">{completedCount}</h3>
        <h6 className="text-base text-success">Recently Completed</h6>
      </div>

      <div className="lg:col-span-4 md:col-span-6 col-span-12 p-30 bg-lighterror text-center rounded-md">
        <h3 className="text-error text-2xl">{rejectedCount}</h3>
        <h6 className="text-base text-error">Rejected</h6>
      </div>
    </div>
  );
};

export default ApprovalFilter;
