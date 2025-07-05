import React from "react";
import { X, User, GraduationCap, CreditCard, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Student } from "@/types/student";

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!student) return null;

  const getStudentTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "Day Scholar": "default",
      "Bus": "secondary",
      "Hostel": "outline",
    };
    return <Badge variant={variants[type] || "default"}>{type}</Badge>;
  };

  const getSectionBadge = (section: string) => {
    const colors: Record<string, string> = {
      "A1": "bg-blue-100 text-blue-800",
      "A2": "bg-green-100 text-green-800",
      "B1": "bg-purple-100 text-purple-800",
      "B2": "bg-orange-100 text-orange-800",
      "C1": "bg-pink-100 text-pink-800",
      "D3": "bg-indigo-100 text-indigo-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[section] || "bg-gray-100 text-gray-800"}`}>
        {section}
      </span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Details
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Student Name</label>
                  <p className="text-lg font-semibold">{student.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <p className="text-lg">{student.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Student ID</label>
                  <p className="text-lg font-mono">{student.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Student Type</label>
                  <div className="mt-1">
                    {getStudentTypeBadge(student.studentType)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Class</label>
                  <p className="text-lg">Class {student.class}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Section</label>
                  <div className="mt-1">
                    {getSectionBadge(student.section)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-green-700">Annual Received Income</label>
                  <p className="text-2xl font-bold text-green-800">
                    ₹ {student.annualIncome.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-blue-700">Months Enrolled (2077/78)</label>
                  <p className="text-2xl font-bold text-blue-800">
                    {student.monthsEnrolled.toFixed(1)} months
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Average Monthly Income</label>
                <p className="text-lg font-semibold">
                  ₹ {(student.annualIncome / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              {student.hasFeeBreakdown && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    📊 Fee breakdown available - detailed payment history can be viewed separately.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Enrollment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Academic Year</p>
                  <p className="font-semibold">2077/78</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Enrollment Status</p>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    Active
                  </Badge>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                    Up to Date
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
