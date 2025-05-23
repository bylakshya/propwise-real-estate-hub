
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockProjects } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, ArrowUp, ArrowDown, Wallet, Receipt, CreditCard, Calendar } from 'lucide-react';

// Generate mock financial data
const generateFinancialData = () => {
  // Mock income data
  const income = [
    { id: 1, date: '2023-05-15', description: 'Plot #A-12 Payment', project: 'Green Valley', amount: 2500000, category: 'Plot Sale' },
    { id: 2, date: '2023-05-18', description: 'Plot #B-08 Payment', project: 'Sunshine City', amount: 1800000, category: 'Plot Sale' },
    { id: 3, date: '2023-05-20', description: 'Plot #A-15 Booking Amount', project: 'Green Valley', amount: 500000, category: 'Booking Fee' },
    { id: 4, date: '2023-05-25', description: 'Plot #C-03 Installment', project: 'Riverside Gardens', amount: 350000, category: 'Installment' },
    { id: 5, date: '2023-05-27', description: 'Plot #B-12 Installment', project: 'Sunshine City', amount: 420000, category: 'Installment' },
    { id: 6, date: '2023-06-02', description: 'Plot #A-22 Full Payment', project: 'Green Valley', amount: 3200000, category: 'Plot Sale' },
    { id: 7, date: '2023-06-05', description: 'Plot #C-09 Booking Amount', project: 'Riverside Gardens', amount: 600000, category: 'Booking Fee' },
    { id: 8, date: '2023-06-10', description: 'Plot #B-15 Installment', project: 'Sunshine City', amount: 380000, category: 'Installment' },
  ];

  // Mock expenses data
  const expenses = [
    { id: 1, date: '2023-05-10', description: 'Land Development', project: 'Green Valley', amount: 1200000, category: 'Development Cost' },
    { id: 2, date: '2023-05-12', description: 'Marketing Campaign', project: 'All Projects', amount: 350000, category: 'Marketing' },
    { id: 3, date: '2023-05-18', description: 'Construction Materials', project: 'Sunshine City', amount: 880000, category: 'Materials' },
    { id: 4, date: '2023-05-22', description: 'Staff Salaries', project: 'All Projects', amount: 420000, category: 'Salaries' },
    { id: 5, date: '2023-05-28', description: 'Infrastructure Development', project: 'Riverside Gardens', amount: 950000, category: 'Development Cost' },
    { id: 6, date: '2023-06-01', description: 'Permit Fees', project: 'Sunshine City', amount: 180000, category: 'Legal & Permits' },
    { id: 7, date: '2023-06-05', description: 'Contractor Payment', project: 'Green Valley', amount: 750000, category: 'Construction Cost' },
    { id: 8, date: '2023-06-08', description: 'Office Utilities', project: 'All Projects', amount: 45000, category: 'Office Expense' },
  ];

  // Mock upcoming payments
  const upcoming = [
    { id: 1, dueDate: '2023-06-15', description: 'Plot #A-17 Installment', project: 'Green Valley', amount: 450000, status: 'Upcoming' },
    { id: 2, dueDate: '2023-06-18', description: 'Plot #B-09 Final Payment', project: 'Sunshine City', amount: 1200000, status: 'Upcoming' },
    { id: 3, dueDate: '2023-06-20', description: 'Plot #C-11 Installment', project: 'Riverside Gardens', amount: 380000, status: 'Upcoming' },
    { id: 4, dueDate: '2023-06-22', description: 'Plot #A-21 Booking Amount', project: 'Green Valley', amount: 500000, status: 'Upcoming' },
    { id: 5, dueDate: '2023-06-25', description: 'Plot #B-14 Installment', project: 'Sunshine City', amount: 420000, status: 'Upcoming' },
  ];

  return { income, expenses, upcoming };
};

const { income, expenses, upcoming } = generateFinancialData();

// Calculate totals
const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
const profit = totalIncome - totalExpenses;

// Format currency
const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString()}`;
};

const Financials: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Financial Management</h1>
            <p className="text-gray-500">Track revenue, expenses, and financial performance of your projects</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Financial Report
            </Button>
          </div>
        </div>
        
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={`${profit > 0 ? 'border-green-100' : 'border-red-100'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Wallet className="h-5 w-5 mr-2" />
                Net Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(profit)}
              </div>
              <div className="mt-2 flex items-center text-sm">
                {profit > 0 ? (
                  <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={profit > 0 ? 'text-green-600' : 'text-red-600'}>
                  {Math.abs(Math.round((profit / totalIncome) * 100))}% {profit > 0 ? 'Profit Margin' : 'Loss Margin'}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <ArrowUp className="h-5 w-5 mr-2" />
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(totalIncome)}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                From {income.length} transactions
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <ArrowDown className="h-5 w-5 mr-2" />
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {formatCurrency(totalExpenses)}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                From {expenses.length} transactions
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcoming.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>{payment.project}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Send Reminder</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {/* Transactions Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Financial Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...income, ...expenses]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((transaction) => {
                          const isIncome = income.some(inc => inc.id === transaction.id);
                          return (
                            <TableRow key={`${isIncome ? 'income' : 'expense'}-${transaction.id}`}>
                              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                              <TableCell>{transaction.description}</TableCell>
                              <TableCell>{transaction.project}</TableCell>
                              <TableCell>{transaction.category}</TableCell>
                              <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${isIncome ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                  {isIncome ? 'Income' : 'Expense'}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="income" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {income
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.project}</TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenses
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.project}</TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Financials;
