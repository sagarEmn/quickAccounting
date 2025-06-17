import React, { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
  title?: string;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({
  isVisible,
  message,
  onClose,
  autoHideDuration = 5000,
  title,
}) => {
  useEffect(() => {
    if (isVisible && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[320px] max-w-md">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {title || "Success"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {message}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 h-6 w-6 hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};
