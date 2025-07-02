import React, { useState } from "react";
import { 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LedgerFilterProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LedgerFilter: React.FC<LedgerFilterProps> = ({
  onOpenChange,
}) => {
  // Filter states
  const [filters, setFilters] = useState({
    showZeroBalances: true,
    includeSubAccounts: true,
    accountType: "all",
    sortBy: "accountName",
    showTransactions: true,
  });

  const handleCheckboxChange = (id: string) => {
    setFilters(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof filters],
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const applyFilters = () => {
    console.log("Applied ledger filters:", filters);
    onOpenChange(false);
  };

  const resetFilters = () => {
    setFilters({
      showZeroBalances: true,
      includeSubAccounts: true,
      accountType: "all",
      sortBy: "accountName",
      showTransactions: true,
    });
  };

  return (
    <SheetContent side="right" className="w-full sm:max-w-md">
      <SheetHeader className="px-6 pt-6 pb-4">
        <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
        <p className="text-sm text-gray-500">Customize your ledger view</p>
      </SheetHeader>

      <div className="px-6 py-4 flex flex-col space-y-6">
        {/* Basic Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="showZeroBalances" 
              checked={filters.showZeroBalances}
              onCheckedChange={() => handleCheckboxChange("showZeroBalances")}
            />
            <Label htmlFor="showZeroBalances" className="text-sm font-medium">
              Show accounts with zero balances
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeSubAccounts" 
              checked={filters.includeSubAccounts}
              onCheckedChange={() => handleCheckboxChange("includeSubAccounts")}
            />
            <Label htmlFor="includeSubAccounts" className="text-sm font-medium">
              Include sub-accounts
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="showTransactions" 
              checked={filters.showTransactions}
              onCheckedChange={() => handleCheckboxChange("showTransactions")}
            />
            <Label htmlFor="showTransactions" className="text-sm font-medium">
              Show individual transactions
            </Label>
          </div>
        </div>

        {/* Account Type */}
        <div className="space-y-2">
          <Label htmlFor="accountType" className="text-sm font-medium">
            Account Type
          </Label>
          <Select 
            value={filters.accountType} 
            onValueChange={(value) => handleSelectChange("accountType", value)}
          >
            <SelectTrigger id="accountType" className="h-10">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="assets">Assets</SelectItem>
              <SelectItem value="liabilities">Liabilities</SelectItem>
              <SelectItem value="equity">Equity</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label htmlFor="sortBy" className="text-sm font-medium">
            Sort By
          </Label>
          <Select 
            value={filters.sortBy} 
            onValueChange={(value) => handleSelectChange("sortBy", value)}
          >
            <SelectTrigger id="sortBy" className="h-10">
              <SelectValue placeholder="Select sort option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accountName">Account Name</SelectItem>
              <SelectItem value="accountCode">Account Code</SelectItem>
              <SelectItem value="debitHighToLow">Debit (High to Low)</SelectItem>
              <SelectItem value="debitLowToHigh">Debit (Low to High)</SelectItem>
              <SelectItem value="creditHighToLow">Credit (High to Low)</SelectItem>
              <SelectItem value="creditLowToHigh">Credit (Low to High)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SheetFooter className="px-6 py-6 border-t border-gray-100">
        <div className="flex space-x-4 w-full">
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="flex-1"
          >
            Reset
          </Button>
          <Button 
            onClick={applyFilters}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Apply Filters
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  );
};
