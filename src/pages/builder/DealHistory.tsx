
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockProjects } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Search, Download, CalendarClock, User, Building, IndianRupee, Phone } from 'lucide-react';

// Interface for deal data
interface Deal {
  id: string;
  plotId: string;
  plotNumber: string;
  projectName: string;
  customerName: string;
  contactNumber: string;
  saleDate: string;
  price: number;
  commission?: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

// Generate deal history data from mock projects
const generateDealData = () => {
  const deals: Deal[] = [];
  let id = 1;
  
  mockProjects.forEach(project => {
    project.plots
      .filter(plot => plot.status === 'Sold' || plot.status === 'Reserved')
      .forEach(plot => {
        if (plot.buyer) {
          deals.push({
            id: `deal-${id++}`,
            plotId: plot.id,
            plotNumber: plot.plotNumber,
            projectName: project.name,
            customerName: plot.buyer.name,
            // Use contactNumber instead of phone
            contactNumber: plot.buyer.contactNumber,
            saleDate: plot.buyer.purchaseDate,
            price: plot.price,
            commission: Math.round(plot.price * 0.02),
            status: plot.status === 'Sold' ? 'Completed' : 'Pending'
          });
        }
      });
  });
  
  // Add some more random deals
  const statuses: Deal['status'][] = ['Completed', 'Pending', 'Cancelled'];
  const names = ['Rahul Sharma', 'Amit Patel', 'Priya Gupta', 'Vikram Singh', 'Neha Verma', 
                'Deepak Joshi', 'Sunita Agarwal', 'Raj Kumar', 'Anjali Mehta', 'Sanjay Kapoor'];
  
  for (let i = 0; i < 15; i++) {
    const price = Math.floor(Math.random() * 5000000) + 1000000;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const deal: Deal = {
      id: `deal-${id++}`,
      plotId: `plot-${Math.floor(Math.random() * 100) + 1}`,
      plotNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 4))}-${Math.floor(Math.random() * 30) + 1}`,
      projectName: mockProjects[Math.floor(Math.random() * mockProjects.length)].name,
      customerName: names[Math.floor(Math.random() * names.length)],
      contactNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      saleDate: new Date(
        2023, 
        Math.floor(Math.random() * 12), 
        Math.floor(Math.random() * 28) + 1
      ).toISOString().split('T')[0],
      price: price,
      commission: status !== 'Cancelled' ? Math.round(price * 0.02) : undefined,
      status: status
    };
    
    deals.push(deal);
  }
  
  return deals.sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());
};

const deals = generateDealData();

// Format currency
const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString()}`;
};

const DealHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter deals based on search and status
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = !searchQuery || 
      deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.plotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.projectName.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = !statusFilter || deal.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Calculate total commission
  const totalCommission = filteredDeals
    .filter(deal => deal.status === 'Completed' && deal.commission)
    .reduce((sum, deal) => sum + (deal.commission || 0), 0);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Deal History</h1>
            <p className="text-gray-500">Track and manage your property transactions</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        
        {/* Commission Summary */}
        <Card className="border-green-100">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <IndianRupee className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Total Commission Earned</h3>
                  <p className="text-sm text-gray-500">From completed deals</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-2xl font-bold text-green-600">
                {formatCurrency(totalCommission)}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search by customer, plot, or project" 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant={statusFilter === null ? "default" : "outline"}
                  onClick={() => setStatusFilter(null)}
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === 'Completed' ? "default" : "outline"}
                  onClick={() => setStatusFilter('Completed')}
                >
                  Completed
                </Button>
                <Button 
                  variant={statusFilter === 'Pending' ? "default" : "outline"}
                  onClick={() => setStatusFilter('Pending')}
                >
                  Pending
                </Button>
                <Button 
                  variant={statusFilter === 'Cancelled' ? "default" : "outline"}
                  onClick={() => setStatusFilter('Cancelled')}
                >
                  Cancelled
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Deals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Property Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plot</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Sale Date</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Commission</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">#{deal.plotNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span>{deal.projectName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>{deal.customerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{deal.contactNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-gray-500" />
                          <span>{new Date(deal.saleDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(deal.price)}</TableCell>
                      <TableCell className="text-right">
                        {deal.commission ? formatCurrency(deal.commission) : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          deal.status === 'Completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          deal.status === 'Pending' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                          'bg-red-100 text-red-800 hover:bg-red-100'
                        }>
                          {deal.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DealHistory;
