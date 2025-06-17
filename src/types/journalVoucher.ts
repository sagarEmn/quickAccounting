export interface JournalVoucherEntryRow {
  chartOfAccount: string;
  debit: number;
  credit: number;
  balance: number; // This will be calculated: debit - credit
  description: string;
}

export interface JournalVoucher {
  id: string;
  voucherNo: string;
  voucherDate: string; // Using string for simplicity, can be Date
  fiscalYear: string;
  voucherName: string;
  entrySummary: string;
  amount: number;
  enteredBy: string;
  paymentMethod: string;
  billNo: string;
  billDate: string; // Using string for simplicity, can be Date
  remarks: string;
  entryRows: JournalVoucherEntryRow[];
}
