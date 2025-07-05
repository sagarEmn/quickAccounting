import React, { useState, useMemo } from "react";
import { Plus, Users, TrendingUp, DollarSign, Calendar, UserCheck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentTable } from "@/components/student-module/StudentTable";
import { StudentFilter } from "@/components/student-module/StudentFilter";
import { AddStudentModal } from "@/components/student-module/AddStudentModal";
import { DeleteStudentModal } from "@/components/student-module/DeleteStudentModal";
import { StudentDetailModal } from "@/components/student-module/StudentDetailModal";
import { FeeHistoryModal } from "@/components/student-module/FeeHistoryModal";
import { BulkActionsModal } from "@/components/student-module/BulkActionsModal";
import { AcademicProgressTracker } from "@/components/student-module/AcademicProgressTracker";
import { mockStudentData } from "@/data/mockData";
import type { Student } from "@/types/student";

// Tab configuration
const tabs = [
  { id: "overview", label: "Student Overview", icon: Users },
  { id: "academics", label: "Academic Progress", icon: BarChart3 },
  { id: "attendance", label: "Attendance Tracker", icon: UserCheck },
];

const StudentModulePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState<Student[]>(mockStudentData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedStudentType, setSelectedStudentType] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFeeHistoryModalOpen, setIsFeeHistoryModalOpen] = useState(false);
  const [isBulkActionsModalOpen, setIsBulkActionsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [feeHistoryStudent, setFeeHistoryStudent] = useState<Student | null>(null);

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
    setFeeHistoryStudent(student);
    setIsFeeHistoryModalOpen(true);
  };

  const handleBulkAction = (action: string, options?: any) => {
    console.log("Bulk action:", action, "for", selectedStudents.length, "students", options);
    
    switch (action) {
      case "email":
        alert(`Email sent to ${selectedStudents.length} students with options: ${JSON.stringify(options)}`);
        break;
      case "export":
        alert(`Exporting data for ${selectedStudents.length} students...`);
        break;
      case "update":
        alert(`Bulk update functionality would be implemented for ${selectedStudents.length} students`);
        break;
      case "delete":
        const idsToDelete = selectedStudents.map(s => s.id);
        setStudents(prev => prev.filter(student => !idsToDelete.includes(student.id)));
        setSelectedStudents([]);
        alert(`${selectedStudents.length} students deleted successfully`);
        break;
    }
  };

  const handleExportData = () => {
    console.log("Exporting student data...");
    alert("Student data export functionality would be implemented here.");
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setEditingStudent(null);
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "academics":
        return <AcademicProgressTracker students={filteredStudents} />;
      
      case "attendance":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Attendance Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <UserCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Attendance Tracker</h3>
                  <p>Advanced attendance tracking features would be implemented here.</p>
                  <p className="text-sm mt-2">
                    Features: Daily attendance, monthly reports, absence notifications, 
                    attendance analytics, and parent communication.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
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

            {/* Filters */}
            <StudentFilter
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
            />

            {/* Results Summary and Bulk Actions */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {filteredStudents.length} of {students.length} students
                {selectedStudents.length > 0 && (
                  <span className="ml-2 text-blue-600">
                    ({selectedStudents.length} selected)
                  </span>
                )}
              </span>
              <div className="flex gap-2">
                {selectedStudents.length > 0 && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setIsBulkActionsModalOpen(true)}
                  >
                    Bulk Actions ({selectedStudents.length})
                  </Button>
                )}
                {filteredStudents.length !== students.length && (
                  <span className="text-blue-600">
                    Filters applied
                  </span>
                )}
              </div>
            </div>

            {/* Student Table */}
            <StudentTable
              students={filteredStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onViewDetails={handleViewDetails}
              onViewFeeHistory={handleViewFeeHistory}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Module</h1>
          <p className="text-gray-600">
            Comprehensive student management system
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

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

      <FeeHistoryModal
        isOpen={isFeeHistoryModalOpen}
        onClose={() => setIsFeeHistoryModalOpen(false)}
        student={feeHistoryStudent}
      />

      <BulkActionsModal
        isOpen={isBulkActionsModalOpen}
        onClose={() => setIsBulkActionsModalOpen(false)}
        selectedStudents={selectedStudents}
        onBulkAction={handleBulkAction}
      />
    </div>
  );
};

export default StudentModulePage;
