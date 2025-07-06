import React, { useState, useMemo } from "react";
import { Search, Filter, Plus, Edit, Users, TrendingUp, DollarSign, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddStudentSheet } from "@/components/student-module/AddStudentSheet";
import { StudentDetailModal } from "@/components/student-module/StudentDetailModal";
import { mockStudentData } from "@/data/mockData";
import type { Student } from "@/types/student";

const StudentModulePage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudentData);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter states
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Modal states
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Filter students based on search criteria
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClass = selectedClass === "all" || student.class === selectedClass;
      
      const matchesDate = selectedDate === "" || student.enrolledDate === selectedDate;
      
      return matchesSearch && matchesClass && matchesDate;
    });
  }, [students, searchTerm, selectedClass, selectedDate]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalStudents = filteredStudents.length;
    const totalRevenue = filteredStudents.reduce((sum, student) => sum + student.annualIncome, 0);
    const averageMonths = filteredStudents.length > 0 
      ? filteredStudents.reduce((sum, student) => sum + student.monthsEnrolled, 0) / filteredStudents.length 
      : 0;
    
    const studentTypeDistribution = filteredStudents.reduce((acc, student) => {
      acc[student.studentType] = (acc[student.studentType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalStudents,
      totalRevenue,
      averageMonths,
      studentTypeDistribution,
    };
  }, [filteredStudents]);

  // Handle student operations
  const handleAddStudent = (studentData: Partial<Student>) => {
    const newStudent: Student = {
      id: (students.length + 1).toString(),
      name: studentData.name || "",
      gender: studentData.gender || "Male",
      class: studentData.class || "",
      section: studentData.section || "",
      studentType: studentData.studentType || "Day Scholar",
      monthsEnrolled: studentData.monthsEnrolled || 0,
      annualIncome: studentData.annualIncome || 0,
      enrolledDate: studentData.enrolledDate || new Date().toISOString().split('T')[0],
      hasFeeBreakdown: studentData.hasFeeBreakdown || false,
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsAddSheetOpen(true);
  };

  const handleUpdateStudent = (studentData: Partial<Student>) => {
    if (editingStudent) {
      setStudents(prev => 
        prev.map(student => 
          student.id === editingStudent.id 
            ? { ...student, ...studentData }
            : student
        )
      );
      setEditingStudent(null);
      setIsAddSheetOpen(false);
    }
  };

  const clearFilters = () => {
    setSelectedClass("all");
    setSelectedDate("");
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
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[section] || "bg-gray-100 text-gray-800"}`}>
        {section}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Active enrolled students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ {stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Annual income received
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Enrollment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageMonths.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Months per student
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Types</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {Object.entries(stats.studentTypeDistribution).map(([type, count]) => (
                <div key={type} className="flex justify-between text-sm">
                  <span>{type}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header with Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Student Module</h1>
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
              <SheetTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </SheetTrigger>
              <AddStudentSheet
                isOpen={isAddSheetOpen}
                onOpenChange={setIsAddSheetOpen}
                onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
                editingStudent={editingStudent}
              />
            </Sheet>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search student"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 border-gray-300"
              />
            </div>

            {/* Filters Toggle Button */}
            <Button 
              variant="outline" 
              className="h-10 px-4 border-gray-300"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Class Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Class:</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue placeholder="All Classes" />
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
                </div>

                {/* Date Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Enrolled Date:</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40 h-8"
                  />
                </div>

                {/* Clear Filters */}
                {(selectedClass || selectedDate) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name of student
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled Date
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount received
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow 
                  key={student.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleEditStudent(student)}
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.gender}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.class}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {getSectionBadge(student.section)}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(student.enrolledDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mr-2">
                        <span className="text-white text-xs">!</span>
                      </span>
                      {student.annualIncome.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-600 p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditStudent(student);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Button variant="outline" className="text-gray-600 border-gray-300">
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page 1 of 10
            </span>
            <Button variant="outline" className="text-gray-600 border-gray-300">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        student={null}
      />
    </div>
  );
};

export default StudentModulePage;
