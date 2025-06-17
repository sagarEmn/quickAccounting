import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, X, Download } from "lucide-react";

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface JournalVoucherDocumentsProps {
  voucherId: string;
}

export const JournalVoucherDocuments: React.FC<
  JournalVoucherDocumentsProps
> = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "tax_ledger.pdf",
      size: "3.60 MB",
      type: "PDF",
    },
    {
      id: "2",
      name: "tax_ledger.pdf",
      size: "3.60 MB",
      type: "PDF",
    },
  ]);

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      const newDocument: Document = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.type.includes("pdf")
          ? "PDF"
          : file.type.split("/")[1]?.toUpperCase() || "FILE",
      };
      setDocuments((prev) => [...prev, newDocument]);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const newDocument: Document = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.type.includes("pdf")
          ? "PDF"
          : file.type.split("/")[1]?.toUpperCase() || "FILE",
      };
      setDocuments((prev) => [...prev, newDocument]);
    });
  };

  const handleRemoveDocument = (documentId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Documents</h2>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-blue-50 rounded-full">
              <Upload className="h-8 w-8 text-blue-500" />
            </div>            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                <label 
                  htmlFor="file-upload"
                  className="text-blue-600 underline cursor-pointer hover:text-blue-700"
                >
                  Click to upload
                </label>{" "}
                or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                Document size must be less than 10MB
              </p>
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      {documents.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Uploaded Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((document) => (
              <Card
                key={document.id}
                className="relative hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-red-500" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {document.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {document.type}
                        </span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-xs text-gray-500">
                          {document.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDocument(document.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
