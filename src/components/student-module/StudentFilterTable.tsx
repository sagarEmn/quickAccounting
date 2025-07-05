import React from "react";
import { Search, Filter, Download, Trash2, Edit, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Student } from "@/types/student";

interface StudentFilterTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onViewDetails: (student: Student) => void;
  onViewFeeHistory: (student: Student) => void;
  onSearch: (searchTerm: string) => void;
  onClassFilter: (classValue: string) => void;
  onSectionFilter: (section: string) => void;
  onStudentTypeFilter: (type: string) => void;
  onGenderFilter: (gender: string) => void;
  onExportData: () => void;
  searchTerm: string;
  selectedClass: string;
  selectedSection: string;
  selectedStudentType: string;
  selectedGender: string;
  totalStudents: number;
}

export const StudentFilterTable: React.FC<StudentFilterTableProps> = ({
  students,
  onEdit,
  onDelete,
  onViewDetails,
  onViewFeeHistory,
  onSearch,
  onClassFilter,
  onSectionFilter,
  onStudentTypeFilter,
  onGenderFilter,
  onExportData,
  searchTerm,
  selectedClass,
  selectedSection,
  selectedStudentType,
  selectedGender,
  totalStudents,
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
    <Card>
      {/* Filter Section */}
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {/* Search Input */}
          <div className="relative xl:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Class Filter */}
          <Select value={selectedClass} onValueChange={onClassFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="5">Class 5</SelectItem>
              <SelectItem value="6">Class 6</SelectItem>
              <SelectItem value="7">Class 7</SelectItem>
              <SelectItem value="8">Class 8</SelectItem>
              <SelectItem value="9">Class 9</SelectItem>
              <SelectItem value="10">Class 10</SelectItem>
            </SelectContent>
          </Select>

          {/* Section Filter */}
          <Select value={selectedSection} onValueChange={onSectionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              <SelectItem value="A1">Section A1</SelectItem>
              <SelectItem value="A2">Section A2</SelectItem>
              <SelectItem value="B1">Section B1</SelectItem>
              <SelectItem value="B2">Section B2</SelectItem>
              <SelectItem value="C1">Section C1</SelectItem>
              <SelectItem value="D3">Section D3</SelectItem>
            </SelectContent>
          </Select>

          {/* Student Type Filter */}
          <Select value={selectedStudentType} onValueChange={onStudentTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Student Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Day Scholar">Day Scholar</SelectItem>
              <SelectItem value="Bus">Bus</SelectItem>
              <SelectItem value="Hostel">Hostel</SelectItem>
            </SelectContent>
          </Select>

          {/* Gender Filter */}
          <Select value={selectedGender} onValueChange={onGenderFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" onClick={onExportData} className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onSearch("");
              onClassFilter("all");
              onSectionFilter("all");
              onStudentTypeFilter("all");
              onGenderFilter("all");
            }}
            className="h-9"
          >
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>
            Showing {students.length} of {totalStudents} students
          </span>
          {students.length !== totalStudents && (
            <span className="text-blue-600">
              Filters applied
            </span>
          )}
        </div>

        {/* Table Section */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Student Type</TableHead>
                <TableHead>Months Enrolled</TableHead>
                <TableHead>Annual Income</TableHead>
                <TableHead>Fee Breakdown</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    No students found matching the current filters.
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>Class {student.class}</TableCell>
                    <TableCell>{getSectionBadge(student.section)}</TableCell>
                    <TableCell>{getStudentTypeBadge(student.studentType)}</TableCell>
                    <TableCell>{student.monthsEnrolled.toFixed(1)} months</TableCell>
                    <TableCell>₹ {student.annualIncome.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={student.hasFeeBreakdown ? "default" : "secondary"}>
                        {student.hasFeeBreakdown ? "Available" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewDetails(student)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewFeeHistory(student)}
                          title="Fee History"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(student)}
                          title="Edit Student"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(student)}
                          title="Delete Student"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
