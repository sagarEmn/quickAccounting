export interface Student {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  class: string;
  section: string;
  studentType: 'Day Scholar' | 'Bus' | 'Hostel';
  monthsEnrolled: number;
  annualIncome: number;
  enrolledDate: string;
  hasFeeBreakdown?: boolean;
}

export interface StudentTableData extends Student {
  actions?: string[];
}
