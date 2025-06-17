export interface TrialBalanceItem {
  id: string;
  name: string;
  debit: number | string;
  credit: number | string;
  isExpandable?: boolean;
  isExpanded?: boolean;
  level: number;
  children?: TrialBalanceItem[];
}

export interface TrialBalanceData {
  fromDate: string;
  toDate: string;
  items: TrialBalanceItem[];
}
