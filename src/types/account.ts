export interface AccountTableData {
  id: string;
  name: string;
  accountCode: string;
  level: number;
  openingBalance: string;
  type: 'Debit' | 'Credit';
  hasChildren: 'Yes' | 'No';
  parentAccount: string;
  remarks: string;
  company: string;
}

export interface AccountTreeNode {
  id: string;
  name: string;
  accountCode?: string; 
  type?: 'Debit' | 'Credit' | 'Debit/Credit'; 
  isLocked?: boolean;
  children?: AccountTreeNode[];
}
