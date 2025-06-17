// For adding new account
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// import lucide-react icons
import { FileText } from 'lucide-react';

interface AddAccountModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            {/* Document icon placeholder */}
            <FileText className='h-5 w-5 text-gray-600' />
            <div>
              <DialogTitle className="text-lg font-semibold">Add New Account</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                For creating new COA
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code <span className="text-red-500">*</span>
            </Label>
            <Input id="code" defaultValue="C001" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="account-name" className="text-right">
              Account Name <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger id="account-name" className="col-span-3">
                <SelectValue placeholder="Account Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash Account</SelectItem>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="equity">Equity Account</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="under" className="text-right">
              Under <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger id="under" className="col-span-3">
                <SelectValue placeholder="Parent Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assets">Assets</SelectItem>
                <SelectItem value="liabilities">Liabilities</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expenses">Expenses</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea id="description" placeholder="Description" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button>Add Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};