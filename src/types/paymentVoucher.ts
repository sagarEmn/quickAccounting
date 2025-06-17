export interface PaymentVoucher {
  id: string;
  voucherNo: string;
  partyName: string;
  amount: number;
  method: string;
  account: string;
  remarks: string;
  voucherDate: string;
  voucherType: 'Payment' | 'Receipt';
  enteredBy: string;
  fiscalYear: string;
  billNo?: string;
  billDate?: string;
}
