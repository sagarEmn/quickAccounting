import React from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Student } from "@/types/student";

interface DeleteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  student: Student | null;
}

export const DeleteStudentModal: React.FC<DeleteStudentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  student,
}) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Student
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this student? This action cannot be undone.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{student.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Class:</span>
              <span>{student.class}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Section:</span>
              <Badge variant="outline">{student.section}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Student Type:</span>
              <Badge variant="secondary">{student.studentType}</Badge>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              This will permanently delete all student records and fee history.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
