import React, { useState } from "react";
import { Link, useLocation } from "react-router";

import {
  Wallet,
  LayoutDashboard,
  Users,
  Book,
  CheckCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r flex flex-col shadow-md h-screen transition-all duration-300`}>
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="bg-gray-800 p-2 rounded-lg">
              <span className="text-white text-lg font-bold">LB</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Lightbox</span>
          </div>
        )}
        {isCollapsed && (
          <div className="bg-gray-800 p-2 rounded-lg mx-auto">
            <span className="text-white text-lg font-bold">LB</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-gray-100 rounded"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-50"
        >
          <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-50"
        >
          <Users className="mr-2 h-5 w-5" /> Teacher Module
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-50"
        >
          <Book className="mr-2 h-5 w-5" /> Student Module
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-50"        >
          <CheckCheck className="mr-2 h-5 w-5" /> Attendance
        </Button>
        
        <Accordion type="single" collapsible defaultValue="accounting">
          <AccordionItem value="accounting" className="border-b-0">
            <AccordionTrigger className="w-full justify-start text-gray-700 hover:bg-gray-50 data-[state=open]:text-blue-600">
              <Wallet className="mr-2 h-5 w-5" /> Accounting
            </AccordionTrigger>
            <AccordionContent className="pl-8 pt-1 pb-0">
              <Link to="/charts-of-accountant">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    currentPath === "/charts-of-accountant"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Charts of Account
                </Button>
              </Link>
              <Link to="/payment-voucher">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    currentPath === "/payment-voucher"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Payment Voucher
                </Button>
              </Link>
              <Link to="/journal-voucher">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    currentPath === "/journal-voucher"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Journal Voucher
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:bg-gray-50"
              >
                Contra Voucher
              </Button>
            </AccordionContent>          </AccordionItem>
        </Accordion>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="reports" className="border-b-0">
            <AccordionTrigger className="w-full justify-start text-gray-700 hover:bg-gray-50 data-[state=open]:text-blue-600">
              <Book className="mr-2 h-5 w-5" /> Reports
            </AccordionTrigger>
            <AccordionContent className="pl-8 pt-1 pb-0">
              <Link to="/reports/fee-collection">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    currentPath === "/reports/fee-collection"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Fee Collection
                </Button>
              </Link>
              <Link to="/reports/ledger">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    currentPath === "/reports/ledger"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Ledger
                </Button>
              </Link>
              <Link to="/reports/trial-balance">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    currentPath === "/reports/trial-balance"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Trial Balance
                </Button>
              </Link>
              <Link to="/reports/profit-loss">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    currentPath === "/reports/profit-loss"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Profit & Loss Statement
                </Button>
              </Link>
              <Link to="/reports/balance-sheet">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    currentPath === "/reports/balance-sheet"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Balance Sheet
                </Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>

      {/* Fixed Footer */}
      <div className="p-4 space-y-2 border-t border-gray-200 bg-white">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-50"
        >
          <Settings className="mr-2 h-5 w-5" /> Settings
        </Button>
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
              OR
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Olivia Rhye</p>
              <p className="text-xs text-gray-500">olivia@untitledui.com</p>
            </div>
          </div>
          <LogOut className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </aside>
  );
};
