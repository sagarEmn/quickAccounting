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

interface DeletePaymentVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  voucherName?: string;
}

export const DeletePaymentVoucherModal: React.FC<DeletePaymentVoucherModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  voucherName = "Payment Voucher",
}) => {
  const [dontShowAgain, setDontShowAgain] = React.useState(false);

  const handleDelete = () => {
    if (dontShowAgain) {
      // Store preference in localStorage or state management
      localStorage.setItem('payment-voucher-delete-warning', 'false');
    }
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    setDontShowAgain(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-red-100 rounded-full">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            Delete {voucherName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this payment voucher? This action cannot be undone.
          </p>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dont-show-again"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            />
            <label
              htmlFor="dont-show-again"
              className="text-sm text-gray-600 cursor-pointer"
            >
              Don't show this warning again
            </label>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
