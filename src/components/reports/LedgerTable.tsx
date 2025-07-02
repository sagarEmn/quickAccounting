import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { mockTrialBalanceData } from "@/data/mockData";
import type { TrialBalanceItem } from "@/types/trialBalance";

export const LedgerTable: React.FC = () => {
  // First level assets as expanded by default
  const initialExpandedItems: Record<string, boolean> = {};
  mockTrialBalanceData.items.forEach(item => {
    initialExpandedItems[item.id] = true; 
  });
  
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(initialExpandedItems);

  // Format number as currency
  const formatCurrency = (value: number | string): string => {
    if (value === "-" || value === "") return value.toString();
    
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numValue)) return "-";
    
    return numValue.toLocaleString();
  };

  // Toggle the expanded state of an item
  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Recursive function to render ledger items
  const renderLedgerItems = (items: TrialBalanceItem[]) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        <TableRow className={item.level > 0 ? "bg-gray-50" : ""}>
          <TableCell className="flex items-center">
            {item.isExpandable ? (
              <button 
                onClick={() => toggleItemExpansion(item.id)}
                className="p-1 mr-2 hover:bg-gray-200 rounded"
              >
                {expandedItems[item.id] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ) : (
              <div className="w-6 mr-2" />
            )}
            <span 
              className={`${item.level === 0 ? 'font-semibold text-gray-800' : 'text-gray-700'}`}
              style={{ marginLeft: `${item.level * 24}px` }}
            >
              {item.name}
            </span>
          </TableCell>
          <TableCell className="text-right">
            {formatCurrency(item.debit)}
          </TableCell>
          <TableCell className="text-right">
            {formatCurrency(item.credit)}
          </TableCell>
        </TableRow>
        
        {/* Render children if expanded */}
        {item.isExpandable && expandedItems[item.id] && item.children && 
          renderLedgerItems(item.children)
        }
      </React.Fragment>
    ));
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Customer</TableHead>
            <TableHead className="text-right">Debit(Closing)</TableHead>
            <TableHead className="text-right">Credit(Closing)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderLedgerItems(mockTrialBalanceData.items)}
        </TableBody>
      </Table>
    </div>
  );
};
