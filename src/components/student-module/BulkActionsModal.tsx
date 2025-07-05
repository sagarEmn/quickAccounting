import React, { useState } from "react";
import { Users, Mail, FileDown, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { Student } from "@/types/student";

interface BulkActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStudents: Student[];
  onBulkAction: (action: string, options?: any) => void;
}

export const BulkActionsModal: React.FC<BulkActionsModalProps> = ({
  isOpen,
  onClose,
  selectedStudents,
  onBulkAction,
}) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [emailOptions, setEmailOptions] = useState({
    sendFeeReminder: false,
    sendProgressReport: false,
    sendAnnouncemnt: false,
  });

  const handleActionSubmit = () => {
    if (selectedAction === "email") {
      onBulkAction("email", emailOptions);
    } else {
      onBulkAction(selectedAction);
    }
    onClose();
    setSelectedAction("");
    setEmailOptions({
      sendFeeReminder: false,
      sendProgressReport: false,
      sendAnnouncemnt: false,
    });
  };

  const getTotalFees = () => {
    return selectedStudents.reduce((sum, student) => sum + student.annualIncome, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk Actions - {selectedStudents.length} Students Selected
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Students Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Selected Students Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Students:</span>
                <span className="ml-2 font-medium">{selectedStudents.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Total Annual Fees:</span>
                <span className="ml-2 font-medium">₹ {getTotalFees().toLocaleString()}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">Student Types:</span>
                <div className="flex gap-2 mt-1">
                  {["Day Scholar", "Bus", "Hostel"].map(type => {
                    const count = selectedStudents.filter(s => s.studentType === type).length;
                    if (count > 0) {
                      return (
                        <Badge key={type} variant="outline">
                          {type}: {count}
                        </Badge>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold">Select Action</h3>
            
            {/* Email Actions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email-action" 
                  checked={selectedAction === "email"}
                  onCheckedChange={(checked) => setSelectedAction(checked ? "email" : "")}
                />
                <Label htmlFor="email-action" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Send Email Communications
                </Label>
              </div>
              
              {selectedAction === "email" && (
                <div className="ml-6 space-y-2 p-3 bg-blue-50 rounded-lg">
                  <Label className="text-sm font-medium">Email Types:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="fee-reminder" 
                        checked={emailOptions.sendFeeReminder}
                        onCheckedChange={(checked) => setEmailOptions(prev => ({
                          ...prev, sendFeeReminder: checked as boolean
                        }))}
                      />
                      <Label htmlFor="fee-reminder" className="text-sm">Fee Payment Reminders</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="progress-report" 
                        checked={emailOptions.sendProgressReport}
                        onCheckedChange={(checked) => setEmailOptions(prev => ({
                          ...prev, sendProgressReport: checked as boolean
                        }))}
                      />
                      <Label htmlFor="progress-report" className="text-sm">Academic Progress Reports</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="announcement" 
                        checked={emailOptions.sendAnnouncemnt}
                        onCheckedChange={(checked) => setEmailOptions(prev => ({
                          ...prev, sendAnnouncemnt: checked as boolean
                        }))}
                      />
                      <Label htmlFor="announcement" className="text-sm">School Announcements</Label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Export Actions */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="export-action" 
                checked={selectedAction === "export"}
                onCheckedChange={(checked) => setSelectedAction(checked ? "export" : "")}
              />
              <Label htmlFor="export-action" className="flex items-center gap-2">
                <FileDown className="h-4 w-4" />
                Export Student Data
              </Label>
            </div>

            {/* Update Actions */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="update-action" 
                checked={selectedAction === "update"}
                onCheckedChange={(checked) => setSelectedAction(checked ? "update" : "")}
              />
              <Label htmlFor="update-action" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Bulk Update Information
              </Label>
            </div>

            {/* Delete Actions */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="delete-action" 
                checked={selectedAction === "delete"}
                onCheckedChange={(checked) => setSelectedAction(checked ? "delete" : "")}
              />
              <Label htmlFor="delete-action" className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete Selected Students
              </Label>
            </div>

            {selectedAction === "delete" && (
              <div className="ml-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  ⚠️ <strong>Warning:</strong> This action will permanently delete all selected students 
                  and their associated records. This cannot be undone.
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleActionSubmit}
            disabled={!selectedAction}
            variant={selectedAction === "delete" ? "destructive" : "default"}
          >
            {selectedAction === "email" && "Send Emails"}
            {selectedAction === "export" && "Export Data"}
            {selectedAction === "update" && "Update Students"}
            {selectedAction === "delete" && "Delete Students"}
            {!selectedAction && "Select Action"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
