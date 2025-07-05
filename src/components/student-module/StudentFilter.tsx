import React from "react";
import { Search, Filter, Download } from "lucide-react";
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

interface StudentFilterProps {
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
}

export const StudentFilter: React.FC<StudentFilterProps> = ({
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
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
        <div className="flex flex-wrap gap-2 mt-4">
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
      </CardContent>
    </Card>
  );
};
