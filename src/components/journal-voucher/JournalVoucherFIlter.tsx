import React, { useState } from "react";

// shadcn imports
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JournalVoucherFilterProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JournalVoucherFilter: React.FC<JournalVoucherFilterProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [status, setStatus] = useState("Active");
  const [accountType, setAccountType] = useState("Debit");
  const [isParentCategory, setIsParentCategory] = useState(false);
  const [parentCategory, setParentCategory] = useState("Any");

  const handleClearFilter = () => {
    setStatus("Active");
    setAccountType("Debit");
    setIsParentCategory(false);
    setParentCategory("Any");
  };

  const handleFilter = () => {
    console.log({ status, accountType, isParentCategory, parentCategory });
    onOpenChange(false);
  };

  return (
    <Sheet onOpenChange={onOpenChange} open={isOpen}>
      <SheetContent className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle>Filter(0)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-6 p-4">
          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aactive">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            <Select onValueChange={setAccountType} value={accountType}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Debit</SelectItem>
                <SelectItem value="B">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Switch
              id="isParentCategory"
              checked={isParentCategory}
              onCheckedChange={setIsParentCategory}
            />
            <Label htmlFor="isParentCategory">Is it parent category?</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentCategory">Parent Category</Label>
            <Select onValueChange={setParentCategory} value={parentCategory}>
              <SelectTrigger id="parentCategory" className="w-full">
                <SelectValue placeholder="Select parent category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="A">Category A</SelectItem>
                <SelectItem value="B">Category B</SelectItem>
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
