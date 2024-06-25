export interface CasesResponse {
  total: number;
  page: string;
  limit: string;
  data: caseData[];
}

export interface caseData {
  caseName: string;
  priority: Priority;
  assignee: string;
  description: string;
  status: Status;
  type: string;
  dateCreated: string;
  lastUpdated: string;
}

export enum Priority {
  High = 'High',
  Low = 'Low',
}

export enum Status {
  Accepted = 'Accepted',
  InProgress = 'In Progress',
  Rejected = 'Rejected',
}

export type ToastProps = {
  open: boolean;
  vertical: 'bottom' | 'top';
  horizontal: 'left' | 'right' | 'center';
};
