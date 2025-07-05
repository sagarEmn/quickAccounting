import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { Student } from "@/types/student";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Partial<Student>) => void;
  editingStudent?: Student | null;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingStudent,
}) => {
  const [formData, setFormData] = useState<Partial<Student>>({
    name: editingStudent?.name || "",
    gender: editingStudent?.gender || "Male",
    class: editingStudent?.class || "",
    section: editingStudent?.section || "",
    studentType: editingStudent?.studentType || "Day Scholar",
    monthsEnrolled: editingStudent?.monthsEnrolled || 0,
    annualIncome: editingStudent?.annualIncome || 0,
    hasFeeBreakdown: editingStudent?.hasFeeBreakdown || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof Student, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Student name is required";
    }
    if (!formData.class?.trim()) {
      newErrors.class = "Class is required";
    }
    if (!formData.section?.trim()) {
      newErrors.section = "Section is required";
    }
    if (!formData.monthsEnrolled || formData.monthsEnrolled <= 0) {
      newErrors.monthsEnrolled = "Months enrolled must be greater than 0";
    }
    if (!formData.annualIncome || formData.annualIncome <= 0) {
      newErrors.annualIncome = "Annual income must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      gender: "Male",
      class: "",
      section: "",
      studentType: "Day Scholar",
      monthsEnrolled: 0,
      annualIncome: 0,
      hasFeeBreakdown: false,
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {editingStudent ? "Edit Student" : "Add New Student"}
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Student Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter student full name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender || "Male"}
                    onValueChange={(value) => handleInputChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="class">Class *</Label>
                  <Select
                    value={formData.class || ""}
                    onValueChange={(value) => handleInputChange("class", value)}
                  >
                    <SelectTrigger className={errors.class ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Class 5</SelectItem>
                      <SelectItem value="6">Class 6</SelectItem>
                      <SelectItem value="7">Class 7</SelectItem>
                      <SelectItem value="8">Class 8</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.class && <p className="text-sm text-red-500 mt-1">{errors.class}</p>}
                </div>

                <div>
                  <Label htmlFor="section">Section *</Label>
                  <Select
                    value={formData.section || ""}
                    onValueChange={(value) => handleInputChange("section", value)}
                  >
                    <SelectTrigger className={errors.section ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A1">Section A1</SelectItem>
                      <SelectItem value="A2">Section A2</SelectItem>
                      <SelectItem value="B1">Section B1</SelectItem>
                      <SelectItem value="B2">Section B2</SelectItem>
                      <SelectItem value="C1">Section C1</SelectItem>
                      <SelectItem value="D3">Section D3</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.section && <p className="text-sm text-red-500 mt-1">{errors.section}</p>}
                </div>

                <div>
                  <Label htmlFor="studentType">Student Type *</Label>
                  <Select
                    value={formData.studentType || "Day Scholar"}
                    onValueChange={(value) => handleInputChange("studentType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Day Scholar">Day Scholar</SelectItem>
                      <SelectItem value="Bus">Bus</SelectItem>
                      <SelectItem value="Hostel">Hostel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="monthsEnrolled">Months Enrolled (2077/78) *</Label>
                  <Input
                    id="monthsEnrolled"
                    type="number"
                    step="0.1"
                    min="0"
                    max="12"
                    value={formData.monthsEnrolled || ""}
                    onChange={(e) => handleInputChange("monthsEnrolled", parseFloat(e.target.value) || 0)}
                    placeholder="Enter months enrolled"
                    className={errors.monthsEnrolled ? "border-red-500" : ""}
                  />
                  {errors.monthsEnrolled && <p className="text-sm text-red-500 mt-1">{errors.monthsEnrolled}</p>}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="annualIncome">Annual Received Income (₹) *</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    min="0"
                    value={formData.annualIncome || ""}
                    onChange={(e) => handleInputChange("annualIncome", parseFloat(e.target.value) || 0)}
                    placeholder="Enter annual income"
                    className={errors.annualIncome ? "border-red-500" : ""}
                  />
                  {errors.annualIncome && <p className="text-sm text-red-500 mt-1">{errors.annualIncome}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingStudent ? "Update Student" : "Add Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
