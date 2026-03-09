export type TicketStage =
  | 'NEW'
  | 'MANAGER_REVIEW'
  | 'CEO_REVIEW'
  | 'COMPLETED'
  | 'REJECTED';

export type TicketStatus = 'OPEN' | 'ON_HOLD' | 'CLOSED';

export type RequestType =
  | 'ORG_CHANGE'
  | 'POLICY_CHANGE'
  | 'ACCESS_REQUEST'
  | 'OTHER';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  companyName: string;
  requestType: RequestType;
  stage: TicketStage;
  status: TicketStatus;
  assignedToAdmin: string;
  submittedBy: string;
  managerName?: string;
  ceoName?: string;
  submittedAt: string;
  updatedAt: string;
}
