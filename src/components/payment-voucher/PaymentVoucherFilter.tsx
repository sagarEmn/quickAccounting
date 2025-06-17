import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentVoucherFilterProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentVoucherFilter: React.FC<PaymentVoucherFilterProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [voucherType, setVoucherType] = useState("All");
  const [account, setAccount] = useState("Debit");
  const [dateRange, setDateRange] = useState("Today 01-06-2025");
  const [method, setMethod] = useState("Bank Transfer");
  const [createdBy, setCreatedBy] = useState("Select team member");

  const handleClearFilter = () => {
    setVoucherType("All");
    setAccount("Debit");
    setDateRange("Today 01-06-2025");
    setMethod("Bank Transfer");
    setCreatedBy("Select team member");
  };

  const handleFilter = () => {
    console.log({ voucherType, account, dateRange, method, createdBy });
    onOpenChange(false);
  };

  return (
    <Sheet onOpenChange={onOpenChange} open={isOpen}>
      <SheetContent className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle>Filter(0)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-6 p-4">
          {/* Voucher Type */}
          <div className="space-y-2">
            <Label htmlFor="voucherType">Voucher Type</Label>
            <Select onValueChange={setVoucherType} value={voucherType}>
              <SelectTrigger id="voucherType" className="w-full">
                <SelectValue placeholder="Select voucher type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Payment">Payment</SelectItem>
                <SelectItem value="Receipt">Receipt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Account(COA) */}
          <div className="space-y-2">
            <Label htmlFor="account">Account(COA)</Label>
            <Select onValueChange={setAccount} value={account}>
              <SelectTrigger id="account" className="w-full">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Debit">Debit</SelectItem>
                <SelectItem value="Credit">Credit</SelectItem>
                <SelectItem value="Misc. Income">Misc. Income</SelectItem>
                <SelectItem value="Accounts Receivable">Accounts Receivable</SelectItem>
                <SelectItem value="Accounts Payable">Accounts Payable</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bank">Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <Select onValueChange={setDateRange} value={dateRange}>
              <SelectTrigger id="dateRange" className="w-full">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Today 01-06-2025">Today 01-06-2025</SelectItem>
                <SelectItem value="Yesterday">Yesterday</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="Last Week">Last Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
                <SelectItem value="Last Month">Last Month</SelectItem>
                <SelectItem value="Custom Range">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Method */}
          <div className="space-y-2">
            <Label htmlFor="method">Method</Label>
            <Select onValueChange={setMethod} value={method}>
              <SelectTrigger id="method" className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Check">Check</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Created By */}
          <div className="space-y-2">
            <Label htmlFor="createdBy">Created By</Label>
            <Select onValueChange={setCreatedBy} value={createdBy}>
              <SelectTrigger id="createdBy" className="w-full">
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Select team member">Select team member</SelectItem>
                <SelectItem value="Ramita Rai">Ramita Rai</SelectItem>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="absolute bottom-4 flex-row w-full justify-between">
          <Button
            variant="outline"
            onClick={handleClearFilter}
            className="w-1/2"
          >
            Clear Filter
          </Button>
          <Button onClick={handleFilter} className="w-1/2">
            Filter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
