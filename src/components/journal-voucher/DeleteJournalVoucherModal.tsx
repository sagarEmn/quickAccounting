import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

interface DeleteJournalVoucherModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
  voucherName?: string;
}

export const DeleteJournalVoucherModal: React.FC<DeleteJournalVoucherModalProps> = ({
  isOpen,
  onOpenChange,
  onConfirmDelete,
  voucherName = "Journal Voucher",
}) => {
  const [dontShowAgain, setDontShowAgain] = React.useState(false);

  const handleDelete = () => {
    if (dontShowAgain) {
      // Store preference in localStorage or state management
      localStorage.setItem('journal-voucher-delete-warning', 'false');
    }
    onConfirmDelete();
    onOpenChange(false);
  };

  const handleCancel = () => {
    setDontShowAgain(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-red-50 rounded-full w-fit">
            <Trash2 className="h-6 w-6 text-red-500" />
          </div>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Delete {voucherName}?
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center text-sm text-gray-600 mb-6">
          This action will permanently remove the selected journal voucher 
          and its associated transactions from your records. Are you sure 
          you want to proceed?
        </div>        <div className="flex items-center space-x-2 mb-6">
          <Checkbox
            id="dont-show-again"
            checked={dontShowAgain}
            onCheckedChange={(checked) => setDontShowAgain(checked === true)}
          />
          <label 
            htmlFor="dont-show-again" 
            className="text-sm text-gray-600 cursor-pointer"
          >
            Don't show again
          </label>
        </div>

        <DialogFooter className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
