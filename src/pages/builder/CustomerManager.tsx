
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Customer } from '@/types';
import { PlusCircle, Search, Phone, Calendar, Mail, User } from 'lucide-react';

// Mock customers data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    contact: '+91 9876543210',
    email: 'john.smith@example.com',
    address: '123 Main St, Mumbai',
    interestedIn: ['Plot', 'Flat'],
    createdAt: '2023-08-15T10:30:00Z',
    updatedAt: '2023-08-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    contact: '+91 8765432109',
    email: 'priya.sharma@example.com',
    address: '456 Park Ave, Delhi',
    interestedIn: ['House'],
    createdAt: '2023-09-01T14:45:00Z',
    updatedAt: '2023-09-01T14:45:00Z'
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    contact: '+91 7654321098',
    email: 'rajesh.kumar@example.com',
    address: '789 First Road, Bangalore',
    interestedIn: ['Plot', 'House'],
    createdAt: '2023-09-10T09:15:00Z',
    updatedAt: '2023-09-10T09:15:00Z'
  },
  {
    id: '4',
    name: 'Ananya Patel',
    contact: '+91 6543210987',
    email: 'ananya.patel@example.com',
    address: '321 Second Lane, Hyderabad',
    interestedIn: ['Flat'],
    createdAt: '2023-09-20T16:30:00Z',
    updatedAt: '2023-09-20T16:30:00Z'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    contact: '+91 5432109876',
    email: 'vikram.singh@example.com',
    address: '654 Third Blvd, Chennai',
    interestedIn: ['Plot'],
    createdAt: '2023-10-05T11:20:00Z',
    updatedAt: '2023-10-05T11:20:00Z'
  }
];

// Form schema for adding a new customer
const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().min(10, { message: "Contact number must be valid." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().optional(),
  interestedIn: z.string().min(1, { message: "Please select at least one interest." }),
});

const CustomerManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      address: "",
      interestedIn: "",
    },
  });
  
  const onSubmit = (data: z.infer<typeof customerFormSchema>) => {
    const newCustomer: Customer = {
      id: (customers.length + 1).toString(),
      name: data.name,
      contact: data.contact,
      email: data.email,
      address: data.address || "",
      interestedIn: [data.interestedIn],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setCustomers([...customers, newCustomer]);
    setIsDialogOpen(false);
    form.reset();
  };
  
  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email?.toLowerCase().includes(query) ||
      customer.contact.toLowerCase().includes(query) ||
      customer.address?.toLowerCase().includes(query)
    );
  });
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Customer Manager</h1>
            <p className="text-gray-500">Manage your customers and their interests.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-5 w-5 mr-2" />
                Add New Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Enter the customer details below to add them to your database.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, Mumbai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interestedIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interested In</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select interest</option>
                            <option value="Plot">Plot</option>
                            <option value="Flat">Flat</option>
                            <option value="House">House</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Add Customer</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Search customers by name, email, or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => new Date(c.createdAt).getMonth() === new Date().getMonth()).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              Manage your customer database and track their interests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Interested In</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.contact}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.interestedIn.map((interest, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        <div className="flex flex-col items-center justify-center">
                          <User className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">No customers found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerManager;
