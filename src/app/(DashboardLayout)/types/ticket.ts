export type TicketStage =
  | 'new'
  | 'manager_review'
  | 'ceo_review'
  | 'completed'
  | 'rejected';

export type TicketStatus = 'open' | 'on_hold' | 'closed';

export interface TicketType {
  Id: number;
  title: string;
  description: string;
  companyName: string;
  requestType: 'org_change' | 'policy_change' | 'access_request' | 'other';
  stage: TicketStage;
  status: TicketStatus;
  assignedToAdmin: string;
  submittedBy: string;
  managerName?: string;
  ceoName?: string;
  submittedAt: string;
  deleted: boolean;
}
