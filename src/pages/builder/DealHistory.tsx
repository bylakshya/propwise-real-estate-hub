import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockProjects } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Search, Download, CalendarClock, User, Building, IndianRupee, Phone, FileText, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
            contactNumber: plot.buyer.contactNumber || '+91 9876543210',
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
  const phoneNumbers = [
    '+91 9876543210', '+91 8765432109', '+91 7654321098',
    '+91 6543210987', '+91 9876123456', '+91 8765123456'
  ];
  
  for (let i = 0; i < 15; i++) {
    const price = Math.floor(Math.random() * 5000000) + 1000000;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const deal: Deal = {
      id: `deal-${id++}`,
      plotId: `plot-${Math.floor(Math.random() * 100) + 1}`,
      plotNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 4))}-${Math.floor(Math.random() * 30) + 1}`,
      projectName: mockProjects[Math.floor(Math.random() * mockProjects.length)].name,
      customerName: names[Math.floor(Math.random() * names.length)],
      contactNumber: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
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

// Format currency with proper responsive handling
const formatCurrency = (amount: number) => {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) { // 1 thousand
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString()}`;
};

const DealHistory: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'monthly'>('all');
  
  // Get unique projects for filter
  const uniqueProjects = Array.from(new Set(deals.map(deal => deal.projectName)));
  
  // Filter deals based on search and status
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = !searchQuery || 
      deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.plotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.projectName.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = !statusFilter || deal.status === statusFilter;
    const matchesProject = !projectFilter || deal.projectName === projectFilter;
    
    return matchesSearch && matchesStatus && matchesProject;
  });
  
  // Calculate total commission
  const totalCommission = filteredDeals
    .filter(deal => deal.status === 'Completed' && deal.commission)
    .reduce((sum, deal) => sum + (deal.commission || 0), 0);
  
  // Calculate total sales value
  const totalSales = filteredDeals
    .filter(deal => deal.status === 'Completed')
    .reduce((sum, deal) => sum + deal.price, 0);
  
  // Calculate averages
  const avgDealValue = filteredDeals.length > 0 
    ? filteredDeals.reduce((sum, deal) => sum + deal.price, 0) / filteredDeals.length
    : 0;
  
  // Group deals by month for monthly view
  const groupDealsByMonth = () => {
    const grouped: { [key: string]: Deal[] } = {};
    
    filteredDeals.forEach(deal => {
      const date = new Date(deal.saleDate);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(deal);
    });
    
    return grouped;
  };
  
  const groupedDeals = groupDealsByMonth();
  const sortedMonths = Object.keys(groupedDeals).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  const getMonthName = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">{t('dealHistory')}</h1>
            <p className="text-gray-500">{t('trackManageTransactions')}</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 shadow-sm">
              <Download className="h-4 w-4" />
              {t('exportReport')}
            </Button>
            <Button className="flex items-center gap-2 shadow-sm">
              <FileText className="h-4 w-4" />
              {t('generateStatement')}
            </Button>
          </div>
        </div>
        
        {/* Summary Cards - Fixed responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Commission Summary */}
          <Card className="border shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm flex-shrink-0">
                    <IndianRupee className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="ml-3 md:ml-4 min-w-0 flex-1">
                    <h3 className="text-sm md:text-lg font-medium truncate">{t('totalCommission')}</h3>
                    <p className="text-xs md:text-sm text-gray-500 truncate">{t('fromCompletedDeals')}</p>
                  </div>
                </div>
                <div className="text-lg md:text-2xl font-bold text-green-600 ml-2 flex-shrink-0">
                  {formatCurrency(totalCommission)}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Total Sales Value */}
          <Card className="border shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                    <Building className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="ml-3 md:ml-4 min-w-0 flex-1">
                    <h3 className="text-sm md:text-lg font-medium truncate">{t('totalSalesValue')}</h3>
                    <p className="text-xs md:text-sm text-gray-500 truncate">{t('fromCompletedDeals')}</p>
                  </div>
                </div>
                <div className="text-lg md:text-2xl font-bold text-blue-600 ml-2 flex-shrink-0">
                  {formatCurrency(totalSales)}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Average Deal Value */}
          <Card className="border shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm flex-shrink-0">
                    <CalendarClock className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="ml-3 md:ml-4 min-w-0 flex-1">
                    <h3 className="text-sm md:text-lg font-medium truncate">{t('averageDealValue')}</h3>
                    <p className="text-xs md:text-sm text-gray-500 truncate">{t('acrossAllTransactions')}</p>
                  </div>
                </div>
                <div className="text-lg md:text-2xl font-bold text-purple-600 ml-2 flex-shrink-0">
                  {formatCurrency(avgDealValue)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Search and Filter */}
        <Card className="border shadow-md">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder={t('searchByCustomer')}
                  className="pl-10 border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter || 'all'} onValueChange={(value) => setStatusFilter(value === 'all' ? null : value)}>
                <SelectTrigger className="border-gray-300">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder={t('filterByStatus')} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allStatuses')}</SelectItem>
                  <SelectItem value="Completed">{t('completed')}</SelectItem>
                  <SelectItem value="Pending">{t('pending')}</SelectItem>
                  <SelectItem value="Cancelled">{t('cancelled')}</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={projectFilter || 'all'} onValueChange={(value) => setProjectFilter(value === 'all' ? null : value)}>
                <SelectTrigger className="border-gray-300">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder={t('filterByProject')} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allProjects')}</SelectItem>
                  {uniqueProjects.map(project => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex rounded-md overflow-hidden border border-gray-300 shadow-sm">
                <Button 
                  variant={viewMode === 'all' ? "default" : "ghost"}
                  className="flex-1 rounded-none"
                  onClick={() => setViewMode('all')}
                >
                  {t('listView')}
                </Button>
                <Button 
                  variant={viewMode === 'monthly' ? "default" : "ghost"}
                  className="flex-1 rounded-none"
                  onClick={() => setViewMode('monthly')}
                >
                  {t('monthlyView')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Deals Display */}
        {viewMode === 'all' ? (
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {t('propertyTransactions')}
              </CardTitle>
              <CardDescription>
                {/* Fixed the error here by removing the second parameter */}
                {`${t('showingTransactions').replace('{count}', filteredDeals.length.toString())}`}
                {statusFilter && ` with status: ${statusFilter}`}
                {projectFilter && ` in project: ${projectFilter}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>{t('plot')}</TableHead>
                      <TableHead>{t('project')}</TableHead>
                      <TableHead>{t('customer')}</TableHead>
                      <TableHead>{t('contact')}</TableHead>
                      <TableHead>{t('saleDate')}</TableHead>
                      <TableHead className="text-right">{t('price')}</TableHead>
                      <TableHead className="text-right">{t('commission')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeals.map((deal) => (
                      <TableRow key={deal.id} className="hover:bg-gray-50 transition-colors">
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
                        <TableCell className="text-right font-medium">{formatCurrency(deal.price)}</TableCell>
                        <TableCell className="text-right">
                          {deal.commission ? 
                            <span className="font-medium text-green-600">{formatCurrency(deal.commission)}</span> : 
                            '-'
                          }
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
                    
                    {filteredDeals.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <FileText className="h-8 w-8 mb-2 text-gray-300" />
                            <p>{t('noTransactionsFound')}</p>
                            <Button 
                              variant="link" 
                              className="mt-2" 
                              onClick={() => {
                                setSearchQuery('');
                                setStatusFilter(null);
                                setProjectFilter(null);
                              }}
                            >
                              {t('resetFilters')}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Monthly View
          <div className="space-y-6">
            {sortedMonths.map(month => (
              <Card key={month} className="border shadow-md">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <CalendarClock className="h-5 w-5" />
                      </div>
                      <CardTitle>{getMonthName(month)}</CardTitle>
                    </div>
                    <div className="text-sm text-gray-500">
                      {groupedDeals[month].length} transactions
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>{t('plot')}</TableHead>
                          <TableHead>{t('project')}</TableHead>
                          <TableHead>{t('customer')}</TableHead>
                          <TableHead>{t('saleDate')}</TableHead>
                          <TableHead className="text-right">{t('price')}</TableHead>
                          <TableHead className="text-right">{t('commission')}</TableHead>
                          <TableHead>{t('status')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {groupedDeals[month].map((deal) => (
                          <TableRow key={deal.id} className="hover:bg-gray-50 transition-colors">
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
                                <CalendarClock className="h-4 w-4 text-gray-500" />
                                <span>{new Date(deal.saleDate).toLocaleDateString()}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(deal.price)}</TableCell>
                            <TableCell className="text-right">
                              {deal.commission ? 
                                <span className="font-medium text-green-600">{formatCurrency(deal.commission)}</span> : 
                                '-'
                              }
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
                  
                  {/* Monthly Summary */}
                  <div className="bg-gray-50 p-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-md border shadow-sm">
                        <div className="text-sm text-gray-500">Monthly Sales</div>
                        <div className="text-lg font-semibold">
                          {formatCurrency(groupedDeals[month].reduce((sum, deal) => sum + deal.price, 0))}
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border shadow-sm">
                        <div className="text-sm text-gray-500">Monthly Commission</div>
                        <div className="text-lg font-semibold text-green-600">
                          {formatCurrency(groupedDeals[month]
                            .filter(deal => deal.commission)
                            .reduce((sum, deal) => sum + (deal.commission || 0), 0)
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border shadow-sm">
                        <div className="text-sm text-gray-500">Deals Completed</div>
                        <div className="text-lg font-semibold">
                          {groupedDeals[month].filter(deal => deal.status === 'Completed').length} 
                          <span className="text-sm text-gray-500"> of {groupedDeals[month].length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {sortedMonths.length === 0 && (
              <Card className="border shadow-md">
                <CardContent className="p-6">
                  <div className="h-32 flex flex-col items-center justify-center text-gray-500">
                    <FileText className="h-8 w-8 mb-2 text-gray-300" />
                    <p>{t('noTransactionsFound')}</p>
                    <Button 
                      variant="link" 
                      className="mt-2" 
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter(null);
                        setProjectFilter(null);
                      }}
                    >
                      {t('resetFilters')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DealHistory;
