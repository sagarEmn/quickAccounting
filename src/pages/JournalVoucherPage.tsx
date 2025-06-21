import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";

// shadcn imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useLoading } from "@/contexts/LoadingContext";

// Journal Components imports
import { JournalVoucherTable } from "@/components/journal-voucher/JournalVoucherTable";
import { AddJournalVoucherModal } from "@/components/journal-voucher/AddJournalVoucherModal";
import { JournalVoucherFilter } from "@/components/journal-voucher/JournalVoucherFIlter";
import { SuccessToast } from "@/components/ui/success-toast";

export const JournalVoucherPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [createdVoucherNo, setCreatedVoucherNo] = useState("");
  const { setLoading } = useLoading();

  // State for filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);  useEffect(() => {
    // Simulate data loading only once when the component mounts
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVoucherSuccess = (voucherNo: string) => {
    setCreatedVoucherNo(voucherNo);
    setShowSuccessToast(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Journal Voucher</h1>

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
          <JournalVoucherFilter isOpen={isFilterOpen} onOpenChange={setIsFilterOpen} />
        </Sheet>

        {/* Add New Account Button */}
        <Sheet onOpenChange={setIsModalOpen} open={isModalOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </SheetTrigger>          <AddJournalVoucherModal
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
            onSuccess={handleVoucherSuccess}
          />
        </Sheet>
      </div>      {/* Journal Voucher Table */}
      <JournalVoucherTable />

      {/* Success Toast */}
      <SuccessToast
        isVisible={showSuccessToast}
        title="Journal Voucher created successfully"
        message={`Journal Voucher #JV-${createdVoucherNo} created successfully. Your journal voucher has been recorded and added to the ledger.`}
        onClose={() => setShowSuccessToast(false)}
      />
    </div>
  );
};
