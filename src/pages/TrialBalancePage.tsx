// src/pages/TrialBalancePage.tsx
import React, { useState } from "react";
import { Calendar, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrialBalanceTable } from "@/components/reports/TrialBalanceTable";
import { TrialBalanceFilter } from "@/components/reports/TrialBalanceFilter";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

export const TrialBalancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("Today 01-06-2025");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setDatePickerOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Trial Balance</h1>

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
            <div className="absolute top-12 left-0 z-10 bg-white rounded-md shadow-lg p-4 border border-gray-200">
              {/* Simple date picker placeholder */}
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => handleDateChange("Today 01-06-2025")}
                >
                  Today 01-06-2025
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => handleDateChange("Yesterday 31-05-2025")}
                >
                  Yesterday 31-05-2025
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => handleDateChange("Last Week 24-05-2025")}
                >
                  Last Week 24-05-2025
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
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
          <TrialBalanceFilter isOpen={isFilterOpen} onOpenChange={setIsFilterOpen} />
        </Sheet>
      </div>

      {/* Display date range */}
      <p className="text-sm text-gray-600 mb-4">
        Showing trial balance for 01/06/2025 to 01/06/2025
      </p>

      {/* Trial Balance Table */}
      <TrialBalanceTable />
    </div>
  );
};
