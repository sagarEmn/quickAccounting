// src/pages/ChartsOfAccountPage.tsx
import React, { useState } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { AddAccountModal } from "@/components/charts-of-account/AddAccountModal";
import { AccountTable } from "@/components/charts-of-account/AccountTable";
import { AccountTree } from "@/components/charts-of-account/AccountTree";

export const ChartsOfAccountPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"table" | "tree">("table");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Charts of Account
      </h1>

      {/* Toolbar */}
      <div className="flex items-center space-x-4 mb-6">
        {/* View Toggle */}
        <div className="flex rounded-md overflow-hidden border border-gray-300">
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            className="rounded-none"
            onClick={() => setViewMode("table")}
          >
            Table View
          </Button>
          <Button
            variant={viewMode === "tree" ? "default" : "ghost"}
            className="rounded-none"
            onClick={() => setViewMode("tree")}
          >
            Tree View
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search account name" className="pl-9" />
        </div>

        {/* Filters Button */}
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
        </Button>

        {/* Add New Account Button (triggers modal) */}
        <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </DialogTrigger>
          <AddAccountModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
        </Dialog>
        <AddAccountModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>

      {/* Dynamic Content based on viewMode */}
      {viewMode === "table" ? <AccountTable /> : <AccountTree />}
    </div>
  );
};
