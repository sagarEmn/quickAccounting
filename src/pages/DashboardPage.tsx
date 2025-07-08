import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { dashboardMockData } from '@/data/mockData';
import { Users, Wallet, TrendingUp, ArrowUpRight, Trash2 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { stats, teacherAttendanceChart, accountDistribution } = dashboardMockData;

  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Thursday, 26th June 2025 • Asadh 12, 2082</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            Today
          </Button>
          <Button variant="outline">This Week</Button>
          <Button variant="outline">Month</Button>
          <Button variant="outline">Fiscal Year</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Teacher Attendance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 text-blue-600 mr-2" />
              Teacher Attendance
            </CardTitle>
            <div className="relative w-12 h-12">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#E5E7EB"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#10B981"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={`${stats.teacherAttendance.percentage * 1.25} 125`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-green-600">
                  {stats.teacherAttendance.percentage}%
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Present:</span>
                <span className="text-sm font-medium text-green-600">
                  {stats.teacherAttendance.present}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Absent:</span>
                <span className="text-sm font-medium text-red-600">
                  {stats.teacherAttendance.absent}
                </span>
              </div>
            </div>
            <Button variant="link" className="h-auto p-0 text-blue-600 text-sm mt-2">
              View Attendance →
            </Button>
          </CardContent>
        </Card>

        {/* Cash & Bank Balance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Wallet className="h-4 w-4 text-blue-600 mr-2" />
              Cash & Bank Balance
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cash:</span>
                <span className="text-sm font-medium">
                  {formatCurrency(stats.cashAndBank.cash)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Bank:</span>
                <span className="text-sm font-medium">
                  {formatCurrency(stats.cashAndBank.bank)}
                </span>
              </div>
            </div>
            <Button variant="link" className="h-auto p-0 text-blue-600 text-sm mt-2">
              View Balance Sheet →
            </Button>
          </CardContent>
        </Card>

        {/* Income & Expenses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
              Income & Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Income:</span>
                <span className="text-sm font-medium text-green-600">
                  {formatCurrency(stats.incomeAndExpenses.income)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Expense:</span>
                <span className="text-sm font-medium text-red-600">
                  {formatCurrency(stats.incomeAndExpenses.expense)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ 
                    width: `${(stats.incomeAndExpenses.income / (stats.incomeAndExpenses.income + stats.incomeAndExpenses.expense)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            <Button variant="link" className="h-auto p-0 text-blue-600 text-sm mt-2">
              View Ledger →
            </Button>
          </CardContent>
        </Card>

        {/* Profit/Loss Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ArrowUpRight className="h-4 w-4 text-green-600 mr-2" />
              Profit/Loss Status
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Surplus:</span>
                <span className="text-sm font-medium text-green-600">
                  {formatCurrency(stats.profitLoss.surplus)}
                </span>
              </div>
            </div>
            <Button variant="link" className="h-auto p-0 text-blue-600 text-sm mt-2">
              View Report →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teacher Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Teacher Attendance (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teacherAttendanceChart}>
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Bar dataKey="present" fill="#10B981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="absent" fill="#EF4444" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Account Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Account Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-8">
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={accountDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {accountDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {accountDistribution.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.name} ({formatCurrency(item.value)})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
