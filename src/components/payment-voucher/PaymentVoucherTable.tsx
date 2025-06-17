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
import { Printer, Trash2, Pencil } from "lucide-react";
import { mockPaymentVouchers } from "@/data/mockData";
import { DeletePaymentVoucherModal } from "./DeletePaymentVoucherModal";
import { SuccessToast } from "@/components/ui/success-toast";

export const PaymentVoucherTable: React.FC = () => {
  const [vouchers, setVouchers] = useState(mockPaymentVouchers);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleDeleteClick = (voucherId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setVoucherToDelete(voucherId);
    setDeleteModalOpen(true);
  };

  const handlePrintClick = (voucherId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Print voucher:", voucherId);
  };

  const handleEditClick = (voucherId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Edit voucher:", voucherId);
  };

  const handleConfirmDelete = () => {
    if (voucherToDelete) {
      setVouchers((prev) =>
        prev.filter((voucher) => voucher.id !== voucherToDelete)
      );

      // Show success toast
      setShowSuccessToast(true);

      // Reset delete state
      setVoucherToDelete(null);
      setDeleteModalOpen(false);

      // Hide toast after 3 seconds
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };
  const getVoucherTypeBadge = (type: 'Payment' | 'Receipt') => {
    return type === 'Payment' ? (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300">
        Payment
      </div>
    ) : (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
        Receipt
      </div>
    );
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Voucher No.</TableHead>
              <TableHead>Party Name</TableHead>
              <TableHead>Amount (Rs.)</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Voucher Date</TableHead>
              <TableHead>Voucher Type</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vouchers.map((voucher) => (
              <TableRow
                key={voucher.id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">
                  {voucher.voucherNo}
                </TableCell>
                <TableCell className="font-medium">{voucher.partyName}</TableCell>
                <TableCell>{voucher.amount.toLocaleString()}</TableCell>
                <TableCell>{voucher.method}</TableCell>
                <TableCell className="font-medium">{voucher.account}</TableCell>
                <TableCell>{voucher.remarks}</TableCell>
                <TableCell>{voucher.voucherDate}</TableCell>
                <TableCell>
                  {getVoucherTypeBadge(voucher.voucherType)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handlePrintClick(voucher.id, e)}
                      className="h-8 w-8 p-0"
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDeleteClick(voucher.id, e)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleEditClick(voucher.id, e)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <span className="text-sm text-gray-600">Page 1 of 10</span>
        <Button variant="outline">Next</Button>
      </div>

      {/* Delete Modal */}
      <DeletePaymentVoucherModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />      {/* Success Toast */}
      {showSuccessToast && (
        <SuccessToast 
          message="Payment voucher deleted successfully!"
          isVisible={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </>
  );
};
