import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Printer, Eye, HelpCircle } from "lucide-react";
import { JournalVoucherDocuments } from "./JournalVoucherDocuments";
import { JournalVoucherInvoice } from "./JournalVoucherInvoice";

interface JournalVoucherDetailProps {
  voucherId: string;
  onBack: () => void;
}

export const JournalVoucherDetailView: React.FC<JournalVoucherDetailProps> = ({
  voucherId,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "documents">("overview");
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);

  const handleViewPrintPreview = () => {
    setShowInvoicePreview(true);
  };

  const handleBackFromInvoice = () => {
    setShowInvoicePreview(false);
  };

  // If invoice preview is active, show invoice component
  if (showInvoicePreview) {
    return (
      <JournalVoucherInvoice 
        voucherId={voucherId} 
        onBack={handleBackFromInvoice} 
      />
    );
  }

  const voucherData = {
    id: "JV0004/82-82",
    amount: "8,9000.00",
    createdDate: "May 24, 2025 10:13:04",
    createdBy: "Snark Design & Co.",
    fiscalYear: "JV0005/81-82",
    dateCreated: "24/05/2025",
    reference: "-",
  };

  const accountEntries = [
    { account: "Liabilities C0003", description: "", drAmount: "10,000", crAmount: "10,000" },
    { account: "Liabilities C0003", description: "", drAmount: "10,000", crAmount: "10,000" },
    { account: "Liabilities C0003", description: "", drAmount: "10,000", crAmount: "10,000" },
  ];

  const glTransactions = [
    { account: "Liabilities", drAmount: "10,000", crAmount: "10,000" },
    { account: "Liabilities", drAmount: "10,000", crAmount: "10,000" },
    { account: "Liabilities", drAmount: "10,000", crAmount: "10,000" },
  ];

  const totalDr = "10,000";
  const totalCr = "10,000";
  const difference = 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-gray-900">{voucherId}</h1>
              <Badge variant="secondary" className="text-blue-600 bg-blue-50">
                Details
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search your entries here"
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline">OPTIONS</Button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white px-6 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>🏠</span>
          <span>Accounting</span>
          <span>/</span>
          <span>Journal Voucher</span>
          <span>/</span>
          <span className="text-blue-600 font-medium">JV004 - 81/82</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Left Panel */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{voucherData.id}</h2>
              <p className="text-xl text-gray-600">{voucherData.amount}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">CREATED DATE</p>
                <p className="text-sm text-gray-900 mt-1">{voucherData.createdDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">CREATED BY</p>
                <p className="text-sm text-gray-900 mt-1">{voucherData.createdBy}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div 
                className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
                  activeTab === "overview" 
                    ? "bg-gray-50 text-gray-900 font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <span className="text-sm">Overview</span>
              </div>
              <div 
                className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
                  activeTab === "documents" 
                    ? "bg-gray-50 text-gray-900 font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("documents")}
              >
                <span className="text-sm">Documents</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            {activeTab === "overview" ? (
              <>
                {/* Details Section */}
                <Card className="mb-6">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-lg font-semibold">Details</CardTitle>
                    <Button variant="outline" size="sm" className="text-blue-600" onClick={handleViewPrintPreview}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Print Preview
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">JV/Fiscal Year</p>
                        <p className="text-sm font-medium">{voucherData.fiscalYear}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Date Created</p>
                        <p className="text-sm font-medium">{voucherData.dateCreated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Reference</p>
                        <p className="text-sm font-medium">{voucherData.reference}</p>
                      </div>
                    </div>

                    {/* Accounts Table */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">Accounts</span>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">Description</span>
                          <span className="text-sm font-medium">Dr. Amount</span>
                          <span className="text-sm font-medium">Cr. Amount</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {accountEntries.map((entry, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 last:border-b-0">
                            <div className="text-sm text-gray-900">{entry.account}</div>
                            <div className="text-sm text-gray-500">{entry.description || "-"}</div>
                            <div className="text-sm text-gray-900">{entry.drAmount}</div>
                            <div className="text-sm text-gray-900">{entry.crAmount}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-2">
                            <span className="text-sm font-medium text-gray-900">Total</span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">{totalDr}</div>
                          <div className="text-sm font-medium text-gray-900">{totalCr}</div>
                        </div>
                        <div className="mt-2 text-right">
                          <span className="text-sm text-green-600 font-medium">
                            Difference: {difference}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notes Section */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-500">You've drafted notes</p>
                    </div>
                  </CardContent>
                </Card>

                {/* GL Transactions Section */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-lg font-semibold">GL Transactions</CardTitle>                    <Button variant="outline" size="sm" className="text-blue-600" onClick={handleViewPrintPreview}>
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center space-x-4 text-sm font-medium text-gray-700">
                        <span className="flex items-center">
                          Accounts
                          <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                        </span>
                        <span>Dr. Amount</span>
                        <span>Cr. Amount</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {glTransactions.map((transaction, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
                          <div className="text-sm text-gray-900">{transaction.account}</div>
                          <div className="text-sm text-gray-900">{transaction.drAmount}</div>
                          <div className="text-sm text-gray-900">{transaction.crAmount}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <JournalVoucherDocuments voucherId={voucherId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};