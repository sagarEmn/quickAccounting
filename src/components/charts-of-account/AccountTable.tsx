import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { mockTableData } from "@/data/mockData";
import type { AccountTableData } from "@/types/account";

export const AccountTable: React.FC = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="flex items-center">
                Account Code <ChevronDown className="ml-1 h-4 w-4" />
              </TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Opening Balance</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Has Children</TableHead>
              <TableHead>Parent Account</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTableData.map((account: AccountTableData) => (
              <TableRow key={account.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>{account.accountCode}</TableCell>
                <TableCell>{account.level}</TableCell>
                <TableCell>{account.openingBalance}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      account.type === "Debit"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {account.type}
                  </Badge>
                </TableCell>
                <TableCell>{account.hasChildren}</TableCell>
                <TableCell>{account.parentAccount}</TableCell>
                <TableCell>{account.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <span>Page 1 of 10</span>
        <Button variant="outline">Next</Button>
      </div>
    </>
  );
};
