import React, { useState, useMemo } from "react";
import { Plus, Users, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentFilterTable } from "@/components/student-module/StudentFilterTable";
import { AddStudentModal } from "@/components/student-module/AddStudentModal";
import { DeleteStudentModal } from "@/components/student-module/DeleteStudentModal";
import { StudentDetailModal } from "@/components/student-module/StudentDetailModal";
import { mockStudentData } from "@/data/mockData";
import type { Student } from "@/types/student";

const StudentModulePage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudentData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedStudentType, setSelectedStudentType] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // Filter students based on search and filter criteria
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClass = selectedClass === "all" || student.class === selectedClass;
      const matchesSection = selectedSection === "all" || student.section === selectedSection;
      const matchesType = selectedStudentType === "all" || student.studentType === selectedStudentType;
      const matchesGender = selectedGender === "all" || student.gender === selectedGender;

      return matchesSearch && matchesClass && matchesSection && matchesType && matchesGender;
    });
  }, [students, searchTerm, selectedClass, selectedSection, selectedStudentType, selectedGender]);

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
      hasFeeBreakdown: studentData.hasFeeBreakdown || false,
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsAddModalOpen(true);
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
    }
  };

  const handleDeleteStudent = (student: Student) => {
    setDeletingStudent(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteStudent = () => {
    if (deletingStudent) {
      setStudents(prev => prev.filter(student => student.id !== deletingStudent.id));
      setDeletingStudent(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleViewDetails = (student: Student) => {
    setViewingStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleViewFeeHistory = (student: Student) => {
    // This would typically open a fee history modal or navigate to a fee details page
    console.log("View fee history for student:", student.name);
    alert(`Fee history for ${student.name} would be displayed here.`);
  };

  const handleExportData = () => {
    // This would typically export the filtered data to CSV or Excel
    console.log("Exporting student data...");
    alert("Student data export functionality would be implemented here.");
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Module</h1>
          <p className="text-gray-600">
            Manage student enrollment, fees, and academic records
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Student Filter and Table Combined */}
      <StudentFilterTable
        students={filteredStudents}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
        onViewDetails={handleViewDetails}
        onViewFeeHistory={handleViewFeeHistory}
        onSearch={setSearchTerm}
        onClassFilter={setSelectedClass}
        onSectionFilter={setSelectedSection}
        onStudentTypeFilter={setSelectedStudentType}
        onGenderFilter={setSelectedGender}
        onExportData={handleExportData}
        searchTerm={searchTerm}
        selectedClass={selectedClass}
        selectedSection={selectedSection}
        selectedStudentType={selectedStudentType}
        selectedGender={selectedGender}
        totalStudents={students.length}
      />

      {/* Modals */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
        editingStudent={editingStudent}
      />

      <DeleteStudentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteStudent}
        student={deletingStudent}
      />

      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        student={viewingStudent}
      />
    </div>
  );
};

export default StudentModulePage;
