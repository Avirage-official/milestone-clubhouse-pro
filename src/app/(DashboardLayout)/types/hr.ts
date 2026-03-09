export type ContractType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR';

export interface NewHireDraft {
  fullName: string;
  preferredName?: string;
  email: string;
  role: string;
  primaryTeam: string;
  managerName: string;
  startDate: string; // ISO or yyyy-mm-dd
  contractType: ContractType;

  location: string;
  timeZone: string;
  workPattern: string; // e.g. 'Office', 'Remote', 'Hybrid'

  showCompanyIntro: boolean;
  showClubhouseIntro: boolean;
  requirePolicies: boolean;

  sendInviteNow: boolean;
}

export type InviteStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface InviteRow {
  id: string;
  fullName: string;
  email: string;
  team: string;
  managerName: string;
  invitedAt: string;
  status: InviteStatus;
  lastActivity?: string;
}

export const defaultNewHireDraft: NewHireDraft = {
  fullName: '',
  preferredName: '',
  email: '',
  role: '',
  primaryTeam: '',
  managerName: '',
  startDate: '',
  contractType: 'FULL_TIME',
  location: '',
  timeZone: 'UTC',
  workPattern: 'Office',
  showCompanyIntro: true,
  showClubhouseIntro: true,
  requirePolicies: true,
  sendInviteNow: true,
};
