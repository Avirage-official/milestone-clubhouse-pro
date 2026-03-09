export const requestTypeLabelMap: Record<string, string> = {
  ORG_CHANGE: "Org change",
  POLICY_CHANGE: "Policy change",
  ACCESS_REQUEST: "Access request",
  OTHER: "Other",
};

export const stageLabelMap: Record<string, string> = {
  NEW: "New",
  MANAGER_REVIEW: "Manager review",
  CEO_REVIEW: "CEO review",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
};

export const stageBadgeVariant = (stage: string) => {
  switch (stage) {
    case "NEW":
      return "lightPrimary";
    case "MANAGER_REVIEW":
      return "lightWarning";
    case "CEO_REVIEW":
      return "lightSuccess";
    case "COMPLETED":
      return "lightSuccess";
    case "REJECTED":
      return "lightError";
    default:
      return "default";
  }
};

export const statusBadgeVariant = (status: string) => {
  switch (status) {
    case "OPEN":
      return "lightSuccess";
    case "ON_HOLD":
      return "lightWarning";
    case "CLOSED":
      return "lightError";
    default:
      return "default";
  }
};

export const statusLabelMap: Record<string, string> = {
  OPEN: "Open",
  ON_HOLD: "On Hold",
  CLOSED: "Closed",
};

export const stageTimeline: Record<string, string[]> = {
  NEW: ["New"],
  MANAGER_REVIEW: ["New", "Manager review"],
  CEO_REVIEW: ["New", "Manager review", "CEO review"],
  COMPLETED: ["New", "Manager review", "CEO review", "Completed"],
  REJECTED: ["New", "Rejected"],
};
