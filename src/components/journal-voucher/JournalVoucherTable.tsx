import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Pencil } from "lucide-react";
import { mockJournalVouchers } from "@/data/mockData";
import { JournalVoucherDetailView } from "./JournalVoucherDetailView";
import { DeleteJournalVoucherModal } from "./DeleteJournalVoucherModal";
import { SuccessToast } from "@/components/ui/success-toast";
import type { JournalVoucher } from "@/types/journalVoucher";

export const JournalVoucherTable: React.FC = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [vouchers, setVouchers] = useState(mockJournalVouchers);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleRowClick = (voucherId: string, event: React.MouseEvent) => {
    // Prevent row click when clicking on action buttons or checkbox
    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest('[role="checkbox"]')) {
      return;
    }
    setSelectedVoucher(voucherId);
  };

  const handleBack = () => {
    setSelectedVoucher(null);
  };

  const handleViewClick = (voucherId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedVoucher(voucherId);
  };

  const handleDeleteClick = (voucherId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setVoucherToDelete(voucherId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (voucherToDelete) {
      // Remove voucher from the list
      setVouchers((prev) =>
        prev.filter((voucher) => voucher.voucherNo !== voucherToDelete)
      );

      // Show success toast
      setShowSuccessToast(true);

      // Reset delete state
      setVoucherToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  // If a voucher is selected, show the detail view
  if (selectedVoucher) {
    return (
      <JournalVoucherDetailView
        voucherId={selectedVoucher}
        onBack={handleBack}
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Voucher No.</TableHead>
              <TableHead>Bill No.</TableHead>
              <TableHead>Bill Date</TableHead>
              <TableHead>Voucher Name</TableHead>
              <TableHead>Fiscal year</TableHead>
              <TableHead>Entry Summary</TableHead>
              <TableHead>Amount (Rs.)</TableHead>
              <TableHead>Entered By</TableHead>
              <TableHead>Voucher Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vouchers.map((voucher: JournalVoucher) => (
              <TableRow
                key={voucher.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={(e) => handleRowClick(voucher.voucherNo, e)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">
                  {voucher.voucherNo}
                </TableCell>
                <TableCell>{voucher.billNo}</TableCell>
                <TableCell>{voucher.billDate}</TableCell>
                <TableCell>{voucher.voucherName}</TableCell>
                <TableCell>{voucher.fiscalYear}</TableCell>
                <TableCell>{voucher.entrySummary}</TableCell>
                <TableCell>{voucher.amount}</TableCell>
                <TableCell>{voucher.enteredBy}</TableCell>
                <TableCell>{voucher.voucherDate}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleViewClick(voucher.voucherNo, e)}
                      className="hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-green-50 hover:text-green-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-red-50 hover:text-red-600"
                      onClick={(e) => handleDeleteClick(voucher.voucherNo, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
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
      </div>      {/* Delete Confirmation Modal */}
      <DeleteJournalVoucherModal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirmDelete={handleConfirmDelete}
        voucherName={voucherToDelete ? `Journal Voucher ${voucherToDelete}` : undefined}
      />      {/* Success Toast */}
      <SuccessToast
        isVisible={showSuccessToast}
        title="Voucher Deleted Successfully"
        message="The selected voucher has been permanently removed from your records."
        onClose={() => setShowSuccessToast(false)}
      />
    </>
  );
};
