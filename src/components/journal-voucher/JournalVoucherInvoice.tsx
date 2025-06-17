import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Download, Printer } from "lucide-react";

interface JournalVoucherInvoiceProps {
  voucherId: string;
  onBack: () => void;
}

export const JournalVoucherInvoice: React.FC<JournalVoucherInvoiceProps> = ({
  onBack,
}) => {
  const invoiceData = {
    companyName: "Prakash Acharya & Associates",
    address: "New Baneshwor",
    phone: "9851261512",
    email: "cprakashacharya@gmail.com",
    pan: "PAN: 156621612",
    voucherNo: "JV0004 - 81/82",
    type: "Journal Voucher",
    entryId: "JV0032/71-21",
    date: "28-04-2025",
    entries: [
      {
        code: "C001",
        accountDesc: "C001",
        drAmount: "Rs. 1,000",
        crAmount: "Rs. 1,00,000",
      },
      {
        code: "C001",
        accountDesc: "C001",
        drAmount: "Rs. 1,000",
        crAmount: "Rs. 1,00,000",
      },
    ],
    totalDr: "Rs. 1,000",
    totalCr: "Rs. 1,00,000",
    notes: "",
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    console.log("Download PDF");
  };

  const handleSendEmail = () => {
    // Implement email functionality
    console.log("Send Email");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Invoice Preview
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleSendEmail}
              className="flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Send Email</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
            <Button
              onClick={handlePrint}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="flex justify-center p-6 print:p-0">
        <div className="bg-white w-full max-w-4xl shadow-lg print:shadow-none print:max-w-none">
          <div className="p-8 print:p-6">
            {/* Company Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {invoiceData.companyName}
              </h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{invoiceData.address}</p>
                <p>{invoiceData.phone}</p>
                <p>{invoiceData.email}</p>
                <p>{invoiceData.pan}</p>
              </div>
            </div>

            {/* Voucher Title */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {invoiceData.voucherNo}
              </h2>
            </div>

            {/* Voucher Details */}
            <div className="border border-gray-300 mb-6">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                <h3 className="text-lg font-semibold text-center">
                  JOURNAL VOUCHER
                </h3>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span>
                    <span className="ml-2">{invoiceData.type}</span>
                  </div>
                  <div>
                    <span className="font-medium">Entry ID:</span>
                    <span className="ml-2">{invoiceData.entryId}</span>
                  </div>
                  <div>
                    <span className="font-medium">Date:</span>
                    <span className="ml-2">{invoiceData.date}</span>
                  </div>
                </div>

                {/* Entries Table */}
                <div className="border border-gray-300">
                  <div className="bg-gray-50 grid grid-cols-4 text-sm font-medium border-b border-gray-300">
                    <div className="p-3 border-r border-gray-300">Code</div>
                    <div className="p-3 border-r border-gray-300">
                      Accounts/Desc
                    </div>
                    <div className="p-3 border-r border-gray-300 text-right">
                      Amount (Dr.)
                    </div>
                    <div className="p-3 text-right">Amount (Cr.)</div>
                  </div>

                  {invoiceData.entries.map((entry, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 text-sm border-b border-gray-300 last:border-b-0"
                    >
                      <div className="p-3 border-r border-gray-300">
                        {entry.code}
                      </div>
                      <div className="p-3 border-r border-gray-300">
                        {entry.accountDesc}
                      </div>
                      <div className="p-3 border-r border-gray-300 text-right">
                        {entry.drAmount}
                      </div>
                      <div className="p-3 text-right">{entry.crAmount}</div>
                    </div>
                  ))}

                  {/* Total Row */}
                  <div className="grid grid-cols-4 text-sm font-bold bg-gray-50">
                    <div className="p-3 border-r border-gray-300 col-span-2">
                      Total
                    </div>
                    <div className="p-3 border-r border-gray-300 text-right">
                      {invoiceData.totalDr}
                    </div>
                    <div className="p-3 text-right">{invoiceData.totalCr}</div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mt-6">
                  <h4 className="font-medium text-sm mb-2">Notes:</h4>
                  <div className="min-h-[60px] text-sm text-gray-600">
                    {invoiceData.notes || "No additional notes"}
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="flex justify-between mt-12">
              <div className="text-center">
                <div className="border-t border-gray-400 w-48 mx-auto mb-2"></div>
                <p className="text-sm font-medium">APPROVED BY</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-48 mx-auto mb-2"></div>
                <p className="text-sm font-medium">PREPARED BY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
