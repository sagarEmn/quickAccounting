import React from "react";
import { X, Calendar, CreditCard, Receipt, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import type { Student } from "@/types/student";

interface FeeHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

// Mock fee history data
const generateFeeHistory = (student: Student | null) => {
  if (!student) return [];
  
  const feeHistory = [];
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const currentDate = new Date();
  
  for (let i = 0; i < Math.min(student.monthsEnrolled, 12); i++) {
    const monthIndex = (currentDate.getMonth() + i) % 12;
    const year = currentDate.getFullYear() - (i > currentDate.getMonth() ? 1 : 0);
    
    const baseFee = student.studentType === "Hostel" ? 4500 : 
                   student.studentType === "Bus" ? 3200 : 2400;
    
    const additionalFees = Math.random() * 500;
    const totalAmount = baseFee + additionalFees;
    
    feeHistory.push({
      id: i + 1,
      month: `${months[monthIndex]} ${year}`,
      dueDate: `${15 + i} ${months[monthIndex]} ${year}`,
      paidDate: i < student.monthsEnrolled - 1 ? `${10 + i} ${months[monthIndex]} ${year}` : null,
      tuitionFee: baseFee,
      additionalFees: additionalFees,
      totalAmount: totalAmount,
      status: i < student.monthsEnrolled - 1 ? "Paid" : "Pending",
      paymentMethod: i < student.monthsEnrolled - 1 ? 
        ["Bank Transfer", "Cash", "Cheque", "Online"][Math.floor(Math.random() * 4)] : null,
      lateFee: Math.random() > 0.8 ? 100 : 0,
    });
  }
  
  return feeHistory.reverse();
};

export const FeeHistoryModal: React.FC<FeeHistoryModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!student) return null;

  const feeHistory = generateFeeHistory(student);
  const totalPaid = feeHistory
    .filter(fee => fee.status === "Paid")
    .reduce((sum, fee) => sum + fee.totalAmount + fee.lateFee, 0);
  const totalPending = feeHistory
    .filter(fee => fee.status === "Pending")
    .reduce((sum, fee) => sum + fee.totalAmount, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Fee History - {student.name}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
                <CreditCard className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ₹ {totalPaid.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {feeHistory.filter(f => f.status === "Paid").length} payments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
                <Calendar className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  ₹ {totalPending.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {feeHistory.filter(f => f.status === "Pending").length} pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ₹ {Math.round(totalPaid / Math.max(feeHistory.filter(f => f.status === "Paid").length, 1)).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  per month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {Math.round((feeHistory.filter(f => f.status === "Paid").length / feeHistory.length) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  on-time payments
                </p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Student Information */}
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Class & Section</label>
                  <p className="font-semibold">Class {student.class} - {student.section}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Student Type</label>
                  <div className="mt-1">
                    <Badge variant={student.studentType === "Day Scholar" ? "default" : 
                                  student.studentType === "Bus" ? "secondary" : "outline"}>
                      {student.studentType}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Academic Year</label>
                  <p className="font-semibold">2077/78</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Total Annual</label>
                  <p className="font-semibold">₹ {student.annualIncome.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fee History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Fee History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Tuition Fee</TableHead>
                      <TableHead>Additional Fees</TableHead>
                      <TableHead>Late Fee</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Paid Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeHistory.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium">{fee.month}</TableCell>
                        <TableCell>{fee.dueDate}</TableCell>
                        <TableCell>₹ {fee.tuitionFee.toLocaleString()}</TableCell>
                        <TableCell>₹ {fee.additionalFees.toFixed(0)}</TableCell>
                        <TableCell>
                          {fee.lateFee > 0 ? `₹ ${fee.lateFee}` : "-"}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹ {(fee.totalAmount + fee.lateFee).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={fee.status === "Paid" ? "default" : "destructive"}>
                            {fee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{fee.paidDate || "-"}</TableCell>
                        <TableCell>{fee.paymentMethod || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Payment Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline">
              <Receipt className="mr-2 h-4 w-4" />
              Generate Receipt
            </Button>
            <Button variant="outline">
              Download Report
            </Button>
            <Button>
              Record Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
