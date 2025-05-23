import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProjects } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, Filter, Mail, Search, Bell, Phone } from 'lucide-react';

interface Payment {
  id: string;
  plotId: string;
  plotNumber: string;
  projectName: string;
  customerName: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Paid' | 'Overdue';
  paymentMethod?: string;
  paymentDate?: string;
  reminderSent: boolean;
}

// Extended payment interface for MockData
interface PaymentHistory {
  date: string;
  amount: number;
  mode: "Cash" | "Bank Transfer" | "UPI" | "Check";
}

interface PendingPayment {
  amount: number;
  dueDate: string;
}

// Extended payment type to match actual mockData structure
interface PaymentData {
  type: "Installment" | "Lumpsum";
  history: PaymentHistory[];
  pending?: PendingPayment[];
}

// Generate mock collection data
const generateCollectionData = () => {
  const payments: Payment[] = [];
  let id = 1;
  
  mockProjects.forEach(project => {
    project.plots.forEach(plot => {
      if (plot.payment && plot.payment.pending && plot.payment.pending.length > 0) {
        plot.payment.pending.forEach(payment => {
          payments.push({
            id: `payment-${id++}`,
            plotId: plot.id,
            plotNumber: plot.plotNumber,
            projectName: project.name,
            customerName: plot.buyer ? plot.buyer.name : 'N/A',
            amount: payment.amount,
            dueDate: payment.dueDate,
            status: new Date(payment.dueDate) < new Date() ? 'Overdue' : 'Pending',
            reminderSent: Math.random() > 0.5,
          });
        });
      }
      
      // Using payment.history instead of payment.completed
      if (plot.payment && plot.payment.history && plot.payment.history.length > 0) {
        plot.payment.history.forEach(payment => {
          payments.push({
            id: `payment-${id++}`,
            plotId: plot.id,
            plotNumber: plot.plotNumber,
            projectName: project.name,
            customerName: plot.buyer ? plot.buyer.name : 'N/A',
            amount: payment.amount,
            dueDate: payment.date,
            status: 'Paid',
            paymentMethod: payment.mode,
            paymentDate: payment.date,
            reminderSent: true,
          });
        });
      }
    });
  });

  // Add some more random collection records
  const methods = ['Online Transfer', 'Cheque', 'Cash', 'Bank Transfer', 'UPI'];
  const statusOptions = ['Paid', 'Pending', 'Overdue'];
  const projectNames = mockProjects.map(p => p.name);
  
  for (let i = 0; i < 30; i++) {
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)] as 'Paid' | 'Pending' | 'Overdue';
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (Math.random() > 0.5 ? Math.floor(Math.random() * 30) : -Math.floor(Math.random() * 30)));
    
    const payment: Payment = {
      id: `payment-${id++}`,
      plotId: `plot-${Math.floor(Math.random() * 100) + 1}`,
      plotNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 4))}-${Math.floor(Math.random() * 30) + 1}`,
      projectName: projectNames[Math.floor(Math.random() * projectNames.length)],
      customerName: `Customer ${Math.floor(Math.random() * 50) + 1}`,
      amount: Math.floor(Math.random() * 1000000) + 100000,
      dueDate: dueDate.toISOString().split('T')[0],
      status: status,
      reminderSent: Math.random() > 0.3,
    };
    
    if (status === 'Paid') {
      const paymentDate = new Date(dueDate);
      paymentDate.setDate(paymentDate.getDate() - Math.floor(Math.random() * 5));
      payment.paymentMethod = methods[Math.floor(Math.random() * methods.length)];
      payment.paymentDate = paymentDate.toISOString().split('T')[0];
    }
    
    payments.push(payment);
  }
  
  return payments;
};

const collectionData = generateCollectionData();

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString()}`;
};

const CollectionTracker: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate summary data
  const totalDue = collectionData
    .filter(payment => payment.status === 'Pending' || payment.status === 'Overdue')
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalOverdue = collectionData
    .filter(payment => payment.status === 'Overdue')
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalCollected = collectionData
    .filter(payment => payment.status === 'Paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  // Filter payments based on status and search
  const filterPayments = (payments: Payment[]) => {
    return payments.filter(payment => {
      // Filter by status
      if (filter !== 'all' && payment.status.toLowerCase() !== filter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery && !payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !payment.plotNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !payment.projectName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };
  
  const filteredPayments = filterPayments(collectionData);
  
  // Group by due date for the timeline view
  const groupByDueDate = () => {
    const grouped: { [key: string]: Payment[] } = {};
    filteredPayments.forEach(payment => {
      if (!grouped[payment.dueDate]) {
        grouped[payment.dueDate] = [];
      }
      grouped[payment.dueDate].push(payment);
    });
    return grouped;
  };
  
  const groupedPayments = groupByDueDate();
  const sortedDates = Object.keys(groupedPayments).sort();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Collection Tracker</h1>
            <p className="text-gray-500">Monitor and manage payment collections, schedules, and reminders</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Total Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{formatCurrency(totalDue)}</div>
              <p className="text-sm text-gray-500 mt-2">
                From {collectionData.filter(p => p.status === 'Pending' || p.status === 'Overdue').length} pending payments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Overdue Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalOverdue)}</div>
              <p className="text-sm text-gray-500 mt-2">
                From {collectionData.filter(p => p.status === 'Overdue').length} overdue payments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Total Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalCollected)}</div>
              <p className="text-sm text-gray-500 mt-2">
                From {collectionData.filter(p => p.status === 'Paid').length} completed payments
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search by customer, plot, or project" 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {mockProjects.map(project => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tab Views */}
        <Tabs defaultValue="list">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Plot</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reminder</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.projectName}</TableCell>
                          <TableCell>#{payment.plotNumber}</TableCell>
                          <TableCell>{payment.customerName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-gray-500" />
                              {new Date(payment.dueDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            <Badge className={
                              payment.status === 'Paid' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                              payment.status === 'Overdue' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                              'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            }>
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {payment.status !== 'Paid' && (
                              payment.reminderSent ? 
                                <Badge variant="outline" className="bg-gray-100">Sent</Badge> : 
                                <Badge variant="outline" className="bg-blue-50 text-blue-800">Send Now</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {payment.status !== 'Paid' ? (
                                <>
                                  <Button size="icon" variant="ghost">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost">
                                    <Phone className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost">
                                    <Bell className="h-4 w-4" />
                                  </Button>
                                </>
                              ) : (
                                <span className="text-xs text-gray-500">
                                  {payment.paymentMethod}
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {sortedDates.map((date) => (
                    <div key={date} className="relative">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {groupedPayments[date].length} payment{groupedPayments[date].length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      
                      <div className="ml-5 mt-4 pl-10 border-l border-gray-200 space-y-4">
                        {groupedPayments[date].map((payment) => (
                          <div key={payment.id} className="p-4 border rounded-md">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge className={
                                    payment.status === 'Paid' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                    payment.status === 'Overdue' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                                    'bg-amber-100 text-amber-800 hover:bg-amber-100'
                                  }>
                                    {payment.status}
                                  </Badge>
                                  <span className="font-medium">{payment.projectName}</span>
                                  <span>-</span>
                                  <span>Plot #{payment.plotNumber}</span>
                                </div>
                                <div className="mt-1">
                                  <span className="text-sm text-gray-600">Customer: {payment.customerName}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-col md:items-end">
                                <div className="font-bold">{formatCurrency(payment.amount)}</div>
                                {payment.status === 'Paid' && payment.paymentDate && (
                                  <div className="text-xs text-gray-500">
                                    Paid on: {new Date(payment.paymentDate).toLocaleDateString()}
                                    {payment.paymentMethod && ` (${payment.paymentMethod})`}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {payment.status !== 'Paid' && (
                              <div className="mt-4 flex justify-end gap-2">
                                <Button size="sm" variant="outline">
                                  <Mail className="h-3.5 w-3.5 mr-1" />
                                  Email
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="h-3.5 w-3.5 mr-1" />
                                  Call
                                </Button>
                                <Button size="sm">
                                  <Bell className="h-3.5 w-3.5 mr-1" />
                                  Send Reminder
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CollectionTracker;
