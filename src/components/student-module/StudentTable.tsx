import React from "react";
import { Trash2, Edit, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Student } from "@/types/student";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onViewDetails: (student: Student) => void;
  onViewFeeHistory: (student: Student) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onEdit,
  onDelete,
  onViewDetails,
  onViewFeeHistory,
}) => {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name of student</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Student Type</TableHead>
            <TableHead>No. of months (2077/78)</TableHead>
            <TableHead>Annual Received Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{getSectionBadge(student.section)}</TableCell>
              <TableCell>{getStudentTypeBadge(student.studentType)}</TableCell>
              <TableCell>{student.monthsEnrolled.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>₹ {student.annualIncome.toLocaleString()}</span>
                  {student.hasFeeBreakdown && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewFeeHistory(student)}
                      className="text-xs px-2 py-1 h-auto"
                    >
                      View Breakdown
                    </Button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewDetails(student)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(student)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(student)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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
  );
};
