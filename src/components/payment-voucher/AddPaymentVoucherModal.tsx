import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";

interface AddPaymentVoucherModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (voucherNo: string) => void;
}

export const AddPaymentVoucherModal: React.FC<AddPaymentVoucherModalProps> = ({
  isOpen,
  onOpenChange,
  onSuccess,
}) => {
  const [voucherDetails, setVoucherDetails] = useState({
    voucherType: "Payment" as "Payment" | "Receipt",
    partyName: "",
    voucherDate: "11/12/2023",
    voucherName: "Cash",
    account: "Misc. Income",
    billDate: "11/12/2023",
    billNo: "",
    transactions: [
      { account: "Bank", amount: "100" },
      { account: "Cash", amount: "2,000" },
      { account: "", amount: "" },
    ],
    remarks: "",
  });

  const handleVoucherDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setVoucherDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setVoucherDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleTransactionChange = (index: number, field: 'account' | 'amount', value: string) => {
    const updatedTransactions = [...voucherDetails.transactions];
    updatedTransactions[index] = { ...updatedTransactions[index], [field]: value };
    setVoucherDetails((prev) => ({ ...prev, transactions: updatedTransactions }));
  };

  const addTransaction = () => {
    setVoucherDetails((prev) => ({
      ...prev,
      transactions: [...prev.transactions, { account: "", amount: "" }]
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!voucherDetails.partyName || !voucherDetails.voucherName) {
      alert("Please fill in all required fields");
      return;
    }

    // Handle form submission
    console.log("Payment Voucher Details:", voucherDetails);
    
    // Call success callback if provided
    if (onSuccess) {
      onSuccess("PV-0124");
    }
    
    // Close modal
    onOpenChange(false);
    
    // Reset form
    setVoucherDetails({
      voucherType: "Payment",
      partyName: "",
      voucherDate: "11/12/2023",
      voucherName: "Cash",
      account: "Misc. Income",
      billDate: "11/12/2023",
      billNo: "",
      transactions: [
        { account: "Bank", amount: "100" },
        { account: "Cash", amount: "2,000" },
        { account: "", amount: "" },
      ],
      remarks: "",
    });
  };  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full lg:max-w-2xl flex flex-col overflow-hidden">
        <SheetHeader className="px-8 pt-8 pb-6 border-b border-gray-100">
          <SheetTitle className="text-xl font-bold text-gray-900">Create a new voucher</SheetTitle>
          <p className="text-sm text-gray-500 mt-1">Select voucher type and enter transaction details</p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Voucher Type */}
          <div className="space-y-2">
            <Label htmlFor="voucherType" className="text-sm font-medium text-gray-700">Voucher Type*</Label>
            <Select value={voucherDetails.voucherType} onValueChange={(value) => handleSelectChange("voucherType", value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select voucher type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Payment">Payment</SelectItem>
                <SelectItem value="Receipt">Receipt</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Choose Payment (money out) or Receipt (money in)</p>
          </div>

          {/* Party Name and Voucher Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partyName" className="text-sm font-medium text-gray-700">Party Name*</Label>
              <Input
                id="partyName"
                placeholder="Eg. Sarswati Enterprise"
                value={voucherDetails.partyName}
                onChange={handleVoucherDetailChange}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voucherDate" className="text-sm font-medium text-gray-700">Voucher Date*</Label>
              <div className="relative">
                <Input
                  id="voucherDate"
                  value={voucherDetails.voucherDate}
                  onChange={handleVoucherDetailChange}
                  className="h-10 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Voucher Name and Account */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voucherName" className="text-sm font-medium text-gray-700">Voucher Name*</Label>
              <Input
                id="voucherName"
                value={voucherDetails.voucherName}
                onChange={handleVoucherDetailChange}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account" className="text-sm font-medium text-gray-700">Account (COA)</Label>
              <Select value={voucherDetails.account} onValueChange={(value) => handleSelectChange("account", value)}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Misc. Income">Misc. Income</SelectItem>
                  <SelectItem value="Accounts Receivable">Accounts Receivable</SelectItem>
                  <SelectItem value="Accounts Payable">Accounts Payable</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bill Date and Bill No */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billDate" className="text-sm font-medium text-gray-700">Bill Date*</Label>
              <div className="relative">
                <Input
                  id="billDate"
                  value={voucherDetails.billDate}
                  onChange={handleVoucherDetailChange}
                  className="h-10 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billNo" className="text-sm font-medium text-gray-700">Bill No.*</Label>
              <Input
                id="billNo"
                placeholder="eg. INV-1012"
                value={voucherDetails.billNo}
                onChange={handleVoucherDetailChange}
                className="h-10"
              />
            </div>
          </div>

          {/* Transactions */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">Transactions</Label>
            <div className="space-y-3">
              {voucherDetails.transactions.map((transaction, index) => (
                <div key={index} className="grid grid-cols-3 gap-3 items-center">
                  <Select 
                    value={transaction.account} 
                    onValueChange={(value) => handleTransactionChange(index, "account", value)}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank">Bank</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Accounts Receivable">Accounts Receivable</SelectItem>
                      <SelectItem value="Accounts Payable">Accounts Payable</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 font-medium">Rs.</span>
                    <Input
                      value={transaction.amount}
                      onChange={(e) => handleTransactionChange(index, "amount", e.target.value)}
                      placeholder="Amount"
                      className="h-10"
                    />
                  </div>
                  {index === voucherDetails.transactions.length - 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={addTransaction}
                      className="text-blue-600 hover:text-blue-700 h-10"
                    >
                      + Add
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks" className="text-sm font-medium text-gray-700">Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Enter a description..."
              value={voucherDetails.remarks}
              onChange={handleVoucherDetailChange}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <SheetFooter className="px-8 pb-8 pt-6 border-t border-gray-100 flex-shrink-0">
          <div className="flex space-x-4 w-full">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700"
            >
              Add Account
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
