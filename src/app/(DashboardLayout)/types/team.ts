export type WorkPattern = 'OFFICE' | 'REMOTE' | 'HYBRID';

export interface TeamMember {
  id: string;
  fullName: string;
  preferredName?: string;
  roleTitle: string;
  primaryTeam: string;
  managerName: string;
  location: string;
  timeZone: string;
  workPattern: WorkPattern;
  companyName: string;
  hasOpenTickets: boolean;
  openTicketsCount: number;
  onboardingStatus?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export type UserRole = 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE' | 'CEO';

export interface CurrentUser {
  id: string;
  role: UserRole;
  fullName: string;
  managedTeams?: string[];
}
