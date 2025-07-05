import React, { useState } from "react";
import { TrendingUp, BookOpen, Award, AlertCircle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Student } from "@/types/student";

interface AcademicProgressTrackerProps {
  students: Student[];
}

// Mock academic data
const generateAcademicData = (students: Student[]) => {
  return students.map(student => {
    const subjects = ["Mathematics", "Science", "English", "Social Studies", "Computer"];
    const grades = subjects.map(subject => ({
      subject,
      score: 60 + Math.random() * 35, // 60-95%
      grade: ["A+", "A", "B+", "B", "C"][Math.floor(Math.random() * 5)],
      attendance: 75 + Math.random() * 20, // 75-95%
    }));
    
    const overallScore = grades.reduce((sum, g) => sum + g.score, 0) / grades.length;
    const overallAttendance = grades.reduce((sum, g) => sum + g.attendance, 0) / grades.length;
    
    return {
      ...student,
      academicData: {
        grades,
        overallScore,
        overallAttendance,
        rank: Math.floor(Math.random() * 50) + 1,
        totalStudents: 150,
        lastUpdated: new Date().toISOString().split('T')[0],
      }
    };
  });
};

export const AcademicProgressTracker: React.FC<AcademicProgressTrackerProps> = ({
  students,
}) => {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  
  const studentsWithAcademics = generateAcademicData(students);
  
  const filteredStudents = studentsWithAcademics.filter(student => {
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    const matchesSection = selectedSection === "all" || student.section === selectedSection;
    return matchesClass && matchesSection;
  });

  const getPerformanceCategory = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "bg-green-100 text-green-800", variant: "default" as const };
    if (score >= 80) return { label: "Good", color: "bg-blue-100 text-blue-800", variant: "secondary" as const };
    if (score >= 70) return { label: "Average", color: "bg-yellow-100 text-yellow-800", variant: "outline" as const };
    return { label: "Needs Improvement", color: "bg-red-100 text-red-800", variant: "destructive" as const };
  };

  const classAverage = filteredStudents.length > 0 
    ? filteredStudents.reduce((sum, s) => sum + s.academicData.overallScore, 0) / filteredStudents.length 
    : 0;

  const topPerformers = filteredStudents
    .sort((a, b) => b.academicData.overallScore - a.academicData.overallScore)
    .slice(0, 5);

  const needsAttention = filteredStudents
    .filter(s => s.academicData.overallScore < 70 || s.academicData.overallAttendance < 80)
    .sort((a, b) => a.academicData.overallScore - b.academicData.overallScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Academic Progress Tracker</h2>
          <p className="text-gray-600">Monitor student academic performance and attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
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

        <Select value={selectedSection} onValueChange={setSelectedSection}>
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
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classAverage.toFixed(1)}%</div>
            <Progress value={classAverage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topPerformers.length}</div>
            <p className="text-xs text-muted-foreground">Above 90%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{needsAttention.length}</div>
            <p className="text-xs text-muted-foreground">Below 70% or poor attendance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredStudents.length}</div>
            <p className="text-xs text-muted-foreground">Being tracked</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-800 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-gray-600">Class {student.class} - {student.section}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-800">
                    {student.academicData.overallScore.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">
                    Rank #{student.academicData.rank}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Students Needing Attention */}
      {needsAttention.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Students Needing Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {needsAttention.slice(0, 10).map((student) => {
                const performance = getPerformanceCategory(student.academicData.overallScore);
                return (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-gray-600">Class {student.class} - {student.section}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex gap-2">
                        <Badge variant={performance.variant}>{performance.label}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Score: {student.academicData.overallScore.toFixed(1)}% | 
                        Attendance: {student.academicData.overallAttendance.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
