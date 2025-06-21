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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { Plus, FileText, Calendar, Check, ChevronsUpDown } from "lucide-react";
import { mockTableData } from "@/data/mockData"; 
import type { JournalVoucherEntryRow } from "@/types/journalVoucher";

interface AddJournalVoucherModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (voucherNo: string) => void;
}

export const AddJournalVoucherModal: React.FC<AddJournalVoucherModalProps> = ({
  isOpen,
  onOpenChange,
  onSuccess,
}) => {
  const [voucherDetails, setVoucherDetails] = useState({
    voucherNo: "11121",
    voucherDate: "2023-11-12",
    fiscalYear: "2081/82",
    voucherName: "Cash",
    billDate: "2023-11-12",
    billNo: "",
    paymentMethod: "Cash",
    remarks: "",
  });  const [entryRows, setEntryRows] = useState<JournalVoucherEntryRow[]>([
    { chartOfAccount: "C0001 Accounts", debit: 100, credit: 0, balance: 100, description: "" },
    { chartOfAccount: "C0032 Fees", debit: 0, credit: 100, balance: -100, description: "" },
    { chartOfAccount: "", debit: 0, credit: 0, balance: 0, description: "" },
  ]);
  const [openComboboxes, setOpenComboboxes] = useState<{[key: number]: boolean}>({});

  // Create combined account list for searching
  const allAccounts = [
    { id: "preset1", accountCode: "C0001", name: "Accounts" },
    { id: "preset2", accountCode: "C0032", name: "Fees" },
    ...mockTableData
  ];

  const handleVoucherDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setVoucherDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setVoucherDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleEntryRowChange = (
    index: number,
    field: keyof JournalVoucherEntryRow,
    value: string | number
  ) => {
    const updatedRows = [...entryRows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };

    // Calculate balance for the current row
    if (field === "debit" || field === "credit") {
      const debit = typeof updatedRows[index].debit === 'number' ? updatedRows[index].debit : parseFloat(String(updatedRows[index].debit)) || 0;
      const credit = typeof updatedRows[index].credit === 'number' ? updatedRows[index].credit : parseFloat(String(updatedRows[index].credit)) || 0;
      updatedRows[index].balance = debit - credit;
    }
    setEntryRows(updatedRows);
  };

  const addEntryRow = () => {
    setEntryRows((prev) => [
      ...prev,
      { chartOfAccount: "", debit: 0, credit: 0, balance: 0, description: "" },
    ]);
  };

  const totalDebit = entryRows.reduce((sum, row) => sum + (typeof row.debit === 'number' ? row.debit : parseFloat(String(row.debit)) || 0), 0);
  const totalCredit = entryRows.reduce((sum, row) => sum + (typeof row.credit === 'number' ? row.credit : parseFloat(String(row.credit)) || 0), 0);
  const difference = totalDebit - totalCredit;  const handleSubmit = () => {
    // Handle form submission
    console.log("Voucher Details:", voucherDetails);
    console.log("Entry Rows:", entryRows);
    
    // Close modal immediately
    onOpenChange(false);
    
    // Show success message via parent callback
    if (onSuccess) {
      onSuccess(voucherDetails.voucherNo);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full lg:max-w-6xl flex flex-col overflow-hidden">
        <SheetHeader className="px-8 pt-8 pb-6 border-b border-gray-100">
          <SheetTitle className="text-2xl font-bold text-gray-900">Add New Account</SheetTitle>
          <p className="text-sm text-gray-500 mt-1">Please fill essentials fields here</p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Voucher Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Voucher Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="voucherNo" className="text-sm font-medium text-gray-700">Voucher No*</Label>
                  <Input 
                    id="voucherNo" 
                    value={voucherDetails.voucherNo} 
                    onChange={handleVoucherDetailChange}
                    className="h-10"
                  />
                </div>
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
                  <Label htmlFor="billDate" className="text-sm font-medium text-gray-700">Bill Date*</Label>
                  <div className="relative">
                    <Input 
                      id="billDate" 
                      type="date" 
                      value={voucherDetails.billDate} 
                      onChange={handleVoucherDetailChange}
                      className="h-10 pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700">Payment Method*</Label>
                  <Select onValueChange={(value) => handleSelectChange("paymentMethod", value)} value={voucherDetails.paymentMethod}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="voucherDate" className="text-sm font-medium text-gray-700">Voucher Date*</Label>
                  <div className="relative">
                    <Input 
                      id="voucherDate" 
                      type="date" 
                      value={voucherDetails.voucherDate} 
                      onChange={handleVoucherDetailChange}
                      className="h-10 pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscalYear" className="text-sm font-medium text-gray-700">Fiscal Year*</Label>
                  <Select onValueChange={(value) => handleSelectChange("fiscalYear", value)} value={voucherDetails.fiscalYear}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select fiscal year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2081/82">2081/82</SelectItem>
                      <SelectItem value="2080/2081">2080/2081</SelectItem>
                    </SelectContent>
                  </Select>
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
            </div>
          </div>

          {/* Entry Rows Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Entry Rows</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-700 py-4 px-4">Charts of Account</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-4">Debit</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-4">Credit</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-4">Balance</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-4">Description</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entryRows.map((row, index) => (
                    <TableRow key={index} className="border-b border-gray-100">                      <TableCell className="py-4 px-4">
                        <Popover 
                          open={openComboboxes[index]} 
                          onOpenChange={(open) => setOpenComboboxes(prev => ({ ...prev, [index]: open }))}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openComboboxes[index]}
                              className="w-full min-w-[200px] h-9 justify-between"
                            >
                              {row.chartOfAccount || "Select account..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[280px] p-0">
                            <Command>
                              <CommandInput placeholder="Search accounts..." />
                              <CommandList>
                                <CommandEmpty>No account found.</CommandEmpty>
                                <CommandGroup>
                                  {allAccounts.map((account) => (
                                    <CommandItem
                                      key={account.id}
                                      value={`${account.accountCode} ${account.name}`}
                                      onSelect={(currentValue) => {
                                        handleEntryRowChange(index, "chartOfAccount", currentValue);
                                        setOpenComboboxes(prev => ({ ...prev, [index]: false }));
                                      }}
                                    >
                                      <Check
                                        className={`mr-2 h-4 w-4 ${
                                          row.chartOfAccount === `${account.accountCode} ${account.name}` 
                                            ? "opacity-100" 
                                            : "opacity-0"
                                        }`}
                                      />
                                      {account.accountCode} {account.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 font-medium">Rs.</span>
                          <Input
                            type="number"
                            value={row.debit}
                            onChange={(e) => handleEntryRowChange(index, "debit", parseFloat(e.target.value) || 0)}
                            className="w-20 h-9 text-center"
                            min="0"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 font-medium">Rs.</span>
                          <Input
                            type="number"
                            value={row.credit}
                            onChange={(e) => handleEntryRowChange(index, "credit", parseFloat(e.target.value) || 0)}
                            className="w-20 h-9 text-center"
                            min="0"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">{row.balance.toFixed(2)}</span>
                          <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                            <FileText className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <Input
                          value={row.description}
                          onChange={(e) => handleEntryRowChange(index, "description", e.target.value)}
                          className="w-full min-w-[150px] h-9"
                          placeholder="Description"
                        />
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={addEntryRow}
                          className="p-1 h-8 w-8 hover:bg-blue-50"
                        >
                          <Plus className="h-4 w-4 text-blue-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end mt-6 space-y-2">
              <div className="text-right space-y-2">
                <div className="flex items-center justify-between min-w-[200px]">
                  <span className="text-sm font-medium text-gray-700">Total Credit:</span>
                  <span className="text-sm font-semibold">Rs. {totalCredit.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between min-w-[200px]">
                  <span className="text-sm font-medium text-gray-700">Total Debit:</span>
                  <span className="text-sm font-semibold">Rs. {totalDebit.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between min-w-[200px] pt-2 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Difference:</span>
                  <span className={`text-sm font-semibold ${difference === 0 ? "text-green-600" : "text-red-500"}`}>
                    Rs. {difference.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Remarks Section */}
          <div className="space-y-2">
            <Label htmlFor="remarks" className="text-sm font-medium text-gray-700">Remarks*</Label>
            <Textarea 
              id="remarks" 
              value={voucherDetails.remarks} 
              onChange={handleVoucherDetailChange} 
              placeholder="Write a few remarks"
              className="min-h-[100px] resize-none"
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
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700"            >
              Add Account
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};