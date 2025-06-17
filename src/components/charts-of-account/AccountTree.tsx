import React from 'react';
import { mockTreeData } from '@/data/mockData';
import { AccountTreeNode } from './AccountTreeNode';

export const AccountTree: React.FC = () => {
  return (
    <div className="p-4 border rounded-md">
      {mockTreeData.map((node) => (
        <AccountTreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};