export interface DashboardStats {
  teacherAttendance: {
    present: number;
    absent: number;
    percentage: number;
  };
  cashAndBank: {
    cash: number;
    bank: number;
  };
  incomeAndExpenses: {
    income: number;
    expense: number;
  };
  profitLoss: {
    surplus: number;
    type: 'surplus' | 'deficit';
  };
}

export interface TeacherAttendanceData {
  day: string;
  present: number;
  absent: number;
}

export interface AccountDistributionData {
  name: string;
  value: number;
  color: string;
}

export interface DashboardData {
  stats: DashboardStats;
  teacherAttendanceChart: TeacherAttendanceData[];
  accountDistribution: AccountDistributionData[];
}
