import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
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
import { Combobox } from "@/components/ui/combobox";
import type { Student } from "@/types/student";

interface AddStudentSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (student: Partial<Student>) => void;
  editingStudent?: Student | null;
}

export const AddStudentSheet: React.FC<AddStudentSheetProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  editingStudent,
}) => {
  const [formData, setFormData] = useState<Partial<Student>>({
    name: "",
    gender: "Male",
    class: "",
    section: "",
    studentType: "Day Scholar",
    monthsEnrolled: 0,
    annualIncome: 0,
    enrolledDate: "",
    hasFeeBreakdown: false,
  });

  const [transactionData, setTransactionData] = useState({
    option: "",
    datePaid: "",
    payments: [{ amount: "", paymentMethod: "" }], // Array to support multiple payment entries
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const transactionOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // Update form data when editing student changes
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || "",
        gender: editingStudent.gender || "Male",
        class: editingStudent.class || "",
        section: editingStudent.section || "",
        studentType: editingStudent.studentType || "Day Scholar",
        monthsEnrolled: editingStudent.monthsEnrolled || 0,
        annualIncome: editingStudent.annualIncome || 0,
        enrolledDate: editingStudent.enrolledDate || "",
        hasFeeBreakdown: editingStudent.hasFeeBreakdown || false,
      });
    } else {
      setFormData({
        name: "",
        gender: "Male",
        class: "",
        section: "",
        studentType: "Day Scholar",
        monthsEnrolled: 0,
        annualIncome: 0,
        enrolledDate: "",
        hasFeeBreakdown: false,
      });
    }
    // Reset transaction data when opening/closing or changing student
    setTransactionData({
      option: "",
      datePaid: "",
      payments: [{ amount: "", paymentMethod: "" }],
    });
    setErrors({});
  }, [editingStudent, isOpen]);

  const handleInputChange = (field: keyof Student, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleTransactionChange = (field: string, value: string) => {
    setTransactionData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (index: number, field: string, value: string) => {
    setTransactionData(prev => ({
      ...prev,
      payments: prev.payments.map((payment, i) => 
        i === index ? { ...payment, [field]: value } : payment
      )
    }));
  };

  const addPaymentRow = () => {
    setTransactionData(prev => ({
      ...prev,
      payments: [...prev.payments, { amount: "", paymentMethod: "" }]
    }));
  };

  const removePaymentRow = (index: number) => {
    if (transactionData.payments.length > 1) {
      setTransactionData(prev => ({
        ...prev,
        payments: prev.payments.filter((_, i) => i !== index)
      }));
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
      enrolledDate: "",
      hasFeeBreakdown: false,
    });
    setTransactionData({
      option: "",
      datePaid: "",
      payments: [{ amount: "", paymentMethod: "" }],
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            {editingStudent ? "Edit Student" : "Add New Student"}
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-none border">
            <CardContent>
              <h3 className="font-semibold mb-4">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
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

                <div className="space-y-2">
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

                <div className="space-y-2">
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

                <div className="space-y-2">
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

                <div className="space-y-2">
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

                <div className="space-y-2">
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

                <div className="md:col-span-2 space-y-2">
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

          {/* Add Transaction Section */}
          <Card className="shadow-none border">
              <CardContent>
                <h3 className="font-semibold mb-4">Add Transaction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Combobox</Label>
                    <Combobox
                      options={transactionOptions}
                      value={transactionData.option}
                      onValueChange={(value) => handleTransactionChange("option", value)}
                      placeholder="Select transaction type"
                      searchPlaceholder="Search transaction types..."
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="datePaid">Date Paid</Label>
                    <Input
                      id="datePaid"
                      type="date"
                      value={transactionData.datePaid}
                      onChange={(e) => handleTransactionChange("datePaid", e.target.value)}
                    />
                  </div>

                  {/* Payment Rows */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Payment Details</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addPaymentRow}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Payment
                      </Button>
                    </div>
                    
                    {transactionData.payments.map((payment, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg relative">
                        {transactionData.payments.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePaymentRow(index)}
                            className="absolute top-2 right-2 h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor={`amount-${index}`}>Amount</Label>
                          <Input
                            id={`amount-${index}`}
                            type="number"
                            min="0"
                            value={payment.amount}
                            onChange={(e) => handlePaymentChange(index, "amount", e.target.value)}
                            placeholder="Enter amount"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`paymentMethod-${index}`}>Payment Method</Label>
                          <Select
                            value={payment.paymentMethod}
                            onValueChange={(value) => handlePaymentChange(index, "paymentMethod", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="card">Card</SelectItem>
                              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                              <SelectItem value="cheque">Cheque</SelectItem>
                              <SelectItem value="online">Online Payment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      // Handle add transaction logic here
                      console.log("Adding transaction:", transactionData);
                      // Reset transaction form
                      setTransactionData({
                        option: "",
                        datePaid: "",
                        payments: [{ amount: "", paymentMethod: "" }],
                      });
                    }}
                  >
                    Save Transaction
                  </Button>
                </div>
              </CardContent>
            </Card>

          <SheetFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingStudent ? "Update Student" : "Add Student"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
