import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Lock } from 'lucide-react';
import type { AccountTreeNode as AccountNodeType } from '@/types/account'; 

interface AccountTreeNodeProps {
  node: AccountNodeType;
  level?: number;
}

export const AccountTreeNode: React.FC<AccountTreeNodeProps> = ({ node, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true); 

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ paddingLeft: `${level * 20}px` }}>
      <div className="flex items-center py-2 border-b border-gray-200">
        {hasChildren && (
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="mr-2">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        )}
        {!hasChildren && level > 0 && <span className="w-8"></span>} {/* Spacer for non-parent nodes */}
        <span className="font-medium text-gray-800">{node.name}</span>
        {node.accountCode && <span className="ml-2 text-sm text-gray-500">{node.accountCode}</span>}

        <div className="ml-auto flex items-center space-x-4">
          {node.isLocked && <Lock className="h-4 w-4 text-gray-500" />}
          {node.type && (
            <Badge
              className={
                node.type === 'Debit'
                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                  : node.type === 'Credit'
                  ? 'bg-red-100 text-red-800 hover:bg-red-100'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
              }
            >
              {node.type}
            </Badge>
          )}
          {hasChildren && (
            <Button variant="link" className="px-2 text-blue-600 hover:underline">
              Add Category
            </Button>
          )}
          {!hasChildren && ( // Only show Edit/View for leaf nodes in this example
            <>
              <Button variant="link" className="px-2 text-blue-600 hover:underline">
                Edit
              </Button>
              <Button variant="link" className="px-2 text-blue-600 hover:underline">
                View Detail
              </Button>
            </>
          )}
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div className="pl-4">
          {node.children?.map((child) => (
            <AccountTreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
      {hasChildren && !isExpanded && ( // "Add Category" button for collapsed parents
        <div className="py-2 pl-8">
            <Button variant="link" className="text-blue-600 hover:underline">
                + Add Category
            </Button>
        </div>
      )}
    </div>
  );
};