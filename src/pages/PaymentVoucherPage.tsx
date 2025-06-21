import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";

// shadcn imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useLoading } from "@/contexts/LoadingContext";

// Payment Voucher Components imports
import { PaymentVoucherTable } from "@/components/payment-voucher/PaymentVoucherTable";
import { AddPaymentVoucherModal } from "@/components/payment-voucher/AddPaymentVoucherModal";
import { PaymentVoucherFilter } from "@/components/payment-voucher/PaymentVoucherFilter";
import { SuccessToast } from "@/components/ui/success-toast";

export const PaymentVoucherPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [createdVoucherNo, setCreatedVoucherNo] = useState("");
  const { setLoading } = useLoading();
    useEffect(() => {
    // Simulate data loading only once when the component mounts
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // State for filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleVoucherSuccess = (voucherNo: string) => {
    setCreatedVoucherNo(voucherNo);
    setShowSuccessToast(true);
    // Hide toast after 3 seconds
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Payment/Receipt Voucher</h1>

      {/* Toolbar */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search account name" className="pl-9" />
        </div>

        {/* Filters Button */}
        <Sheet onOpenChange={setIsFilterOpen} open={isFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <PaymentVoucherFilter isOpen={isFilterOpen} onOpenChange={setIsFilterOpen} />
        </Sheet>

        {/* Add New Button */}
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      {/* Table */}
      <PaymentVoucherTable />

      {/* Add Modal */}
      <AddPaymentVoucherModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={handleVoucherSuccess}
      />

      {/* Success Toast */}
      {showSuccessToast && (
        <SuccessToast 
          message={`Payment voucher ${createdVoucherNo} created successfully!`}
          isVisible={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </div>
  );
};
