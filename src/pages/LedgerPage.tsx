// src/pages/LedgerPage.tsx
import React, { useState, useEffect } from "react";
import { Calendar, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LedgerTable } from "@/components/reports/LedgerTable";
import { LedgerFilter } from "@/components/reports/LedgerFilter";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useLoading } from "@/contexts/LoadingContext";

export const LedgerPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("Today 01-06-2025");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    // Simulate data loading only once
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setDatePickerOpen(false);
  };

  const dateOptions = [
    "Today 01-06-2025 - 01-06-2025",
    "Last 7 days 01-06-2025 - 01-06-2025", 
    "Last 15 days 01-06-2025 - 01-06-2025",
    "Last 30 days 01-06-2025 - 01-06-2025",
    "Last 45 days 01-06-2025 - 01-06-2025", 
    "Last 60 days 01-06-2025 - 01-06-2025",
    "Last 75 days 01-06-2025 - 01-06-2025"
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Ledger</h1>

      {/* Date Picker and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Date Picker Button */}
        <div className="relative flex-1">
          <Button
            variant="outline"
            className="w-full justify-between h-10 text-left"
            onClick={() => setDatePickerOpen(!datePickerOpen)}
          >
            <span>{selectedDate}</span>
            <Calendar className="h-4 w-4 text-gray-400" />
          </Button>
          {datePickerOpen && (
            <div className="absolute top-12 left-0 z-10 bg-white rounded-md shadow-lg p-4 border border-gray-200 w-full">
              <div className="space-y-2">
                {dateOptions.map((option, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    className="w-full justify-start text-left" 
                    onClick={() => handleDateChange(option.split(' - ')[0])}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-10"
        >
          Generate
        </Button>

        {/* Filters Button */}
        <Sheet onOpenChange={setIsFilterOpen} open={isFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-10">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Show Filters
            </Button>
          </SheetTrigger>
          <LedgerFilter isOpen={isFilterOpen} onOpenChange={setIsFilterOpen} />
        </Sheet>
      </div>

      {/* Display date range */}
      <p className="text-sm text-gray-600 mb-4">
        Showing ledger for 01/06/2025 to 01/06/2025
      </p>

      {/* Ledger Table */}
      <LedgerTable />
    </div>
  );
};
