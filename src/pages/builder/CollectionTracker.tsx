
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProjects } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, Filter, Mail, Search, Bell, Phone, Whatsapp, Clock, Calendar as CalendarIcon, User, IndianRupee } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Payment {
  id: string;
  plotId: string;
  plotNumber: string;
  projectName: string;
  customerName: string;
  contactNumber: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Paid' | 'Overdue';
  paymentMethod?: string;
  paymentDate?: string;
  reminderSent: boolean;
  lastReminderDate?: string;
  whatsappEnabled?: boolean;
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
            contactNumber: plot.buyer ? plot.buyer.contactNumber || '+91 9876543210' : '+91 9876543210',
            amount: payment.amount,
            dueDate: payment.dueDate,
            status: new Date(payment.dueDate) < new Date() ? 'Overdue' : 'Pending',
            reminderSent: Math.random() > 0.5,
            lastReminderDate: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
            whatsappEnabled: Math.random() > 0.3,
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
            contactNumber: plot.buyer ? plot.buyer.contactNumber || '+91 9876543210' : '+91 9876543210',
            amount: payment.amount,
            dueDate: payment.date,
            status: 'Paid',
            paymentMethod: payment.mode,
            paymentDate: payment.date,
            reminderSent: true,
            whatsappEnabled: Math.random() > 0.3,
          });
        });
      }
    });
  });

  // Add some more random collection records
  const methods = ['Online Transfer', 'Cheque', 'Cash', 'Bank Transfer', 'UPI'];
  const statusOptions = ['Paid', 'Pending', 'Overdue'];
  const projectNames = mockProjects.map(p => p.name);
  const phoneNumbers = [
    '+91 9876543210', '+91 8765432109', '+91 7654321098', '+91 6543210987', 
    '+91 9876123456', '+91 8765123456', '+91 7654123456', '+91 6543123456'
  ];
  
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
      contactNumber: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
      amount: Math.floor(Math.random() * 1000000) + 100000,
      dueDate: dueDate.toISOString().split('T')[0],
      status: status,
      reminderSent: Math.random() > 0.3,
      lastReminderDate: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
      whatsappEnabled: Math.random() > 0.3,
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
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isWhatsappDialogOpen, setIsWhatsappDialogOpen] = useState(false);
  const [whatsappApiKey, setWhatsappApiKey] = useState(localStorage.getItem('whatsappApiKey') || '');
  const [isSending, setIsSending] = useState(false);
  
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
      if (filter !== 'all' && payment.status.toLowerCase() !== filter.toLowerCase()) {
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
  
  const handleOpenReminderModal = (payment: Payment) => {
    setSelectedPayment(payment);
    
    // Set default message
    const defaultMessage = `Dear ${payment.customerName},\n\nThis is a reminder that your payment of ${formatCurrency(payment.amount)} for Plot #${payment.plotNumber} in ${payment.projectName} is due on ${new Date(payment.dueDate).toLocaleDateString()}.\n\nPlease make the payment at your earliest convenience.\n\nThank you,\nProperty Management Team`;
    
    setCustomMessage(defaultMessage);
    setIsReminderModalOpen(true);
  };

  const handleSendReminder = (type: 'email' | 'sms' | 'whatsapp') => {
    if (!selectedPayment) return;
    
    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      setIsReminderModalOpen(false);
      
      // Update the payment's reminderSent status
      const updatedPayment = { ...selectedPayment, reminderSent: true, lastReminderDate: new Date().toISOString().split('T')[0] };
      const index = collectionData.findIndex(p => p.id === selectedPayment.id);
      if (index !== -1) {
        collectionData[index] = updatedPayment;
      }
      
      let message = `Reminder sent to ${selectedPayment.customerName} via `;
      switch(type) {
        case 'email':
          message += 'email';
          break;
        case 'sms':
          message += 'SMS';
          break;
        case 'whatsapp':
          message += 'WhatsApp';
          break;
      }
      
      toast({
        title: "Reminder Sent",
        description: message,
      });
      
      setSelectedPayment(null);
    }, 1500);
  };
  
  const handleWhatsappSetup = () => {
    localStorage.setItem('whatsappApiKey', whatsappApiKey);
    setIsWhatsappDialogOpen(false);
    
    toast({
      title: "WhatsApp Integration Configured",
      description: "Your WhatsApp Business API is now connected for payment reminders.",
    });
  };
  
  const handleSendWhatsapp = (payment: Payment) => {
    if (!whatsappApiKey) {
      setIsWhatsappDialogOpen(true);
      return;
    }
    
    handleOpenReminderModal(payment);
  };
  
  const getDaysUntilDueLabel = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return <span className="text-red-600 font-medium">{Math.abs(diffDays)} days overdue</span>;
    } else if (diffDays === 0) {
      return <span className="text-amber-600 font-medium">Due today</span>;
    } else {
      return <span>{diffDays} days left</span>;
    }
  };
  
  const shouldHighlightReminder = (payment: Payment) => {
    if (payment.status === 'Paid') return false;
    
    // Check if it's overdue or due in 5 days
    const today = new Date();
    const due = new Date(payment.dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 5 || diffDays < 0;
  };
  
  const countRemindersDue = filteredPayments.filter(p => shouldHighlightReminder(p) && !p.reminderSent).length;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Collection Tracker</h1>
            <p className="text-gray-500">Monitor and manage payment collections with automated WhatsApp reminders</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button 
              className="flex gap-2 items-center"
              onClick={() => setIsWhatsappDialogOpen(true)}
            >
              <Whatsapp className="h-4 w-4" />
              WhatsApp Setup
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border shadow-md">
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
          
          <Card className="border shadow-md">
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
          
          <Card className="border shadow-md">
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
          
          <Card className="border shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Reminders Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{countRemindersDue}</div>
              <p className="text-sm text-gray-500 mt-2">
                Payments requiring immediate action
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Search and Filter */}
        <Card className="border shadow-md">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search by customer, plot, or project" 
                  className="pl-10 border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="border-gray-300">
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
                  <SelectTrigger className="border-gray-300">
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
        <Tabs defaultValue="list" className="bg-white rounded-lg shadow-sm border p-1">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle>Payment Collections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
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
                        <TableRow key={payment.id} className={payment.status === 'Overdue' ? 'bg-red-50' : ''}>
                          <TableCell>{payment.projectName}</TableCell>
                          <TableCell>#{payment.plotNumber}</TableCell>
                          <TableCell>{payment.customerName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-gray-500" />
                              <div>
                                <div>{new Date(payment.dueDate).toLocaleDateString()}</div>
                                <div className="text-xs text-gray-500">
                                  {getDaysUntilDueLabel(payment.dueDate)}
                                </div>
                              </div>
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
                                <div className="flex flex-col">
                                  <Badge variant="outline" className="bg-gray-100">Sent</Badge>
                                  {payment.lastReminderDate && (
                                    <span className="text-xs text-gray-500 mt-1">
                                      {new Date(payment.lastReminderDate).toLocaleDateString()}
                                    </span>
                                  )}
                                </div> : 
                                <Badge 
                                  variant="outline" 
                                  className={`${shouldHighlightReminder(payment) ? 'bg-blue-100 text-blue-800 animate-pulse' : 'bg-gray-100'}`}
                                >
                                  {shouldHighlightReminder(payment) ? 'Send Now' : 'Not Sent'}
                                </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {payment.status !== 'Paid' ? (
                                <>
                                  <Button size="icon" variant="ghost" onClick={() => handleOpenReminderModal(payment)}>
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" onClick={() => handleOpenReminderModal(payment)}>
                                    <Phone className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="icon" 
                                    variant={payment.whatsappEnabled ? "default" : "ghost"}
                                    className={payment.whatsappEnabled ? "bg-green-600 text-white hover:bg-green-700" : ""}
                                    onClick={() => handleSendWhatsapp(payment)}
                                  >
                                    <Whatsapp className="h-4 w-4" />
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
          
          <TabsContent value="timeline">
            <Card className="border-0 shadow-none">
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
                          <div key={payment.id} className={`p-4 border rounded-md ${payment.status === 'Overdue' ? 'bg-red-50 border-red-100' : 'bg-white'}`}>
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
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="h-3.5 w-3.5 text-gray-400" /> 
                                    <span>{payment.customerName}</span>
                                    <span className="text-gray-400">|</span>
                                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                                    <span>{payment.contactNumber}</span>
                                  </div>
                                  {payment.status !== 'Paid' && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                                      <span>{getDaysUntilDueLabel(payment.dueDate)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex flex-col md:items-end">
                                <div className="font-bold flex items-center gap-1">
                                  <IndianRupee className="h-4 w-4 text-gray-500" />
                                  {formatCurrency(payment.amount).substring(1)}
                                </div>
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
                                <Button size="sm" variant="outline" onClick={() => handleOpenReminderModal(payment)}>
                                  <Mail className="h-3.5 w-3.5 mr-1" />
                                  Email
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleOpenReminderModal(payment)}>
                                  <Phone className="h-3.5 w-3.5 mr-1" />
                                  Call
                                </Button>
                                <Button 
                                  size="sm" 
                                  className={payment.whatsappEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                                  onClick={() => handleSendWhatsapp(payment)}
                                >
                                  <Whatsapp className="h-3.5 w-3.5 mr-1" />
                                  Send Reminder
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {sortedDates.length === 0 && (
                    <div className="flex items-center justify-center h-40 text-gray-500">
                      <p>No payments match your current filters</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Reminder Dialog */}
      <Dialog open={isReminderModalOpen} onOpenChange={setIsReminderModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Send Payment Reminder</DialogTitle>
            <DialogDescription>
              {selectedPayment ? `Send a reminder to ${selectedPayment.customerName} for ${formatCurrency(selectedPayment.amount)}` : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-2">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input 
                id="recipient" 
                value={selectedPayment?.customerName || ''} 
                readOnly 
                className="bg-gray-50"
              />
            </div>
            {selectedPayment?.whatsappEnabled && (
              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp Number</Label>
                <Input 
                  id="phone" 
                  value={selectedPayment?.contactNumber || ''} 
                  readOnly 
                  className="bg-gray-50"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="message">Reminder Message</Label>
              <Textarea 
                id="message" 
                value={customMessage} 
                onChange={(e) => setCustomMessage(e.target.value)} 
                rows={6}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReminderModalOpen(false)}>
              Cancel
            </Button>
            {selectedPayment?.whatsappEnabled && (
              <Button 
                className="bg-green-600 hover:bg-green-700" 
                onClick={() => handleSendReminder('whatsapp')}
                disabled={isSending}
              >
                {isSending ? "Sending..." : (
                  <>
                    <Whatsapp className="h-4 w-4 mr-2" />
                    Send via WhatsApp
                  </>
                )}
              </Button>
            )}
            <Button onClick={() => handleSendReminder('email')} disabled={isSending}>
              {isSending ? "Sending..." : "Send via Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* WhatsApp Setup Dialog */}
      <Dialog open={isWhatsappDialogOpen} onOpenChange={setIsWhatsappDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>WhatsApp Business API Setup</DialogTitle>
            <DialogDescription>
              Connect your WhatsApp Business API to send automated payment reminders to customers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-2">
            <div className="space-y-2">
              <Label htmlFor="apiKey">WhatsApp Business API Key</Label>
              <Input 
                id="apiKey" 
                value={whatsappApiKey} 
                onChange={(e) => setWhatsappApiKey(e.target.value)} 
                placeholder="Enter your WhatsApp Business API key"
              />
              <p className="text-xs text-gray-500">
                You'll need a WhatsApp Business API account to use this feature. 
                <a href="#" className="text-blue-600 ml-1 hover:underline">Learn more</a>
              </p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
              <h4 className="text-sm font-medium text-amber-800 mb-2">WhatsApp Business API Integration</h4>
              <p className="text-xs text-amber-700">
                This integration allows you to send automated payment reminders to your customers via WhatsApp.
                Please ensure you comply with WhatsApp Business API policies and have customer consent before sending messages.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWhatsappDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleWhatsappSetup}>
              Save & Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Bulk Reminder Alert Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" className="hidden">Send Bulk Reminders</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Bulk Reminders</AlertDialogTitle>
            <AlertDialogDescription>
              This will send reminders to all customers with pending payments that are due in the next 5 days or overdue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default CollectionTracker;
