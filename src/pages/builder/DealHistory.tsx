
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProjects } from '@/data/mockData';
import { ChevronDown, ChevronRight, Download, FileText, Search } from 'lucide-react';

interface Deal {
  id: string;
  plotId: string;
  plotNumber: string;
  projectName: string;
  buyerName: string;
  buyerContact: string;
  sellerName?: string;
  sellerContact?: string;
  price: number;
  brokerName?: string;
  brokerageFee?: number;
  date: string;
  status: 'Completed' | 'Cancelled' | 'In Progress';
  documents: {
    name: string;
    type: 'agreement' | 'registry' | 'payment' | 'other';
    uploadDate: string;
    url: string;
  }[];
  notes?: string;
}

// Generate mock deal data
const generateDealData = () => {
  const deals: Deal[] = [];
  let id = 1;
  
  // Extract completed deals from mock projects
  mockProjects.forEach(project => {
    project.plots.filter(plot => plot.status === 'Sold' && plot.buyer).forEach(plot => {
      const dealDate = new Date();
      dealDate.setMonth(dealDate.getMonth() - Math.floor(Math.random() * 12));
      
      const documents = [
        {
          name: 'Sale Agreement',
          type: 'agreement' as const,
          uploadDate: new Date(dealDate.getTime() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0],
          url: '#',
        },
        {
          name: 'Property Registry',
          type: 'registry' as const,
          uploadDate: new Date(dealDate.getTime() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0],
          url: '#',
        },
        {
          name: 'Payment Receipt',
          type: 'payment' as const,
          uploadDate: new Date(dealDate.getTime() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0],
          url: '#',
        },
      ];
      
      deals.push({
        id: `deal-${id++}`,
        plotId: plot.id,
        plotNumber: plot.plotNumber,
        projectName: project.name,
        buyerName: plot.buyer!.name,
        buyerContact: plot.buyer!.phone || '9876543210',
        price: plot.price,
        brokerName: Math.random() > 0.5 ? `Broker ${Math.floor(Math.random() * 10) + 1}` : undefined,
        brokerageFee: Math.random() > 0.5 ? Math.round(plot.price * 0.01) : undefined,
        date: dealDate.toISOString().split('T')[0],
        status: 'Completed',
        documents,
        notes: Math.random() > 0.7 ? 'Deal completed smoothly with all documentation in place.' : undefined,
      });
    });
  });
  
  // Add some in-progress and cancelled deals
  const statuses = ['Completed', 'In Progress', 'Cancelled'];
  const projectNames = mockProjects.map(p => p.name);
  
  for (let i = 0; i < 15; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)] as 'Completed' | 'Cancelled' | 'In Progress';
    const dealDate = new Date();
    dealDate.setMonth(dealDate.getMonth() - Math.floor(Math.random() * 24));
    
    const documents = [];
    if (status !== 'Cancelled' || Math.random() > 0.5) {
      documents.push({
        name: 'Sale Agreement',
        type: 'agreement' as const,
        uploadDate: new Date(dealDate.getTime() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0],
        url: '#',
      });
    }
    
    if (status === 'Completed') {
      documents.push({
        name: 'Property Registry',
        type: 'registry' as const,
        uploadDate: new Date(dealDate.getTime() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0],
        url: '#',
      });
      
      documents.push({
        name: 'Payment Receipt',
        type: 'payment' as const,
        uploadDate: new Date(dealDate.getTime() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0],
        url: '#',
      });
    }
    
    const price = Math.floor(Math.random() * 8000000) + 2000000;
    
    deals.push({
      id: `deal-${id++}`,
      plotId: `plot-${Math.floor(Math.random() * 100) + 1}`,
      plotNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 4))}-${Math.floor(Math.random() * 30) + 1}`,
      projectName: projectNames[Math.floor(Math.random() * projectNames.length)],
      buyerName: `Customer ${Math.floor(Math.random() * 50) + 1}`,
      buyerContact: `9${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
      sellerName: Math.random() > 0.8 ? `Seller ${Math.floor(Math.random() * 20) + 1}` : undefined,
      sellerContact: Math.random() > 0.8 ? `8${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}` : undefined,
      price,
      brokerName: Math.random() > 0.7 ? `Broker ${Math.floor(Math.random() * 10) + 1}` : undefined,
      brokerageFee: Math.random() > 0.7 ? Math.round(price * 0.01) : undefined,
      date: dealDate.toISOString().split('T')[0],
      status,
      documents,
      notes: Math.random() > 0.7 ? (
        status === 'Cancelled' 
          ? 'Deal cancelled due to financing issues.'
          : status === 'In Progress' 
            ? 'Documentation in progress. Awaiting final payment.'
            : 'Deal completed successfully.'
      ) : undefined,
    });
  }
  
  // Sort by date (most recent first)
  return deals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const dealData = generateDealData();

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString()}`;
};

const DealHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDeal, setExpandedDeal] = useState<string | null>(null);
  
  // Filter deals based on search
  const filteredDeals = dealData.filter(deal => {
    if (searchQuery) {
      return deal.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
             deal.plotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
             deal.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
             (deal.brokerName?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    }
    return true;
  });
  
  // Stats calculations
  const totalDeals = filteredDeals.length;
  const completedDeals = filteredDeals.filter(deal => deal.status === 'Completed').length;
  const cancelledDeals = filteredDeals.filter(deal => deal.status === 'Cancelled').length;
  const inProgressDeals = filteredDeals.filter(deal => deal.status === 'In Progress').length;
  
  const totalValue = filteredDeals
    .filter(deal => deal.status === 'Completed')
    .reduce((sum, deal) => sum + deal.price, 0);
    
  const totalBrokerage = filteredDeals
    .filter(deal => deal.status === 'Completed' && deal.brokerageFee)
    .reduce((sum, deal) => sum + (deal.brokerageFee || 0), 0);
  
  const toggleDealExpansion = (dealId: string) => {
    if (expandedDeal === dealId) {
      setExpandedDeal(null);
    } else {
      setExpandedDeal(dealId);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Deals History</h1>
            <p className="text-gray-500">Comprehensive record of all property transactions and their statuses</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDeals}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Completed Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedDeals}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalValue)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Brokerage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{formatCurrency(totalBrokerage)}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input 
                placeholder="Search by buyer, project, or plot number" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Deals Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">All ({totalDeals})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedDeals})</TabsTrigger>
            <TabsTrigger value="inprogress">In Progress ({inProgressDeals})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledDeals})</TabsTrigger>
          </TabsList>
          
          {['all', 'completed', 'inprogress', 'cancelled'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {tab === 'all' && 'All Deals'}
                    {tab === 'completed' && 'Completed Deals'}
                    {tab === 'inprogress' && 'In Progress Deals'}
                    {tab === 'cancelled' && 'Cancelled Deals'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead></TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Project & Plot</TableHead>
                          <TableHead>Buyer</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Broker</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Documents</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDeals
                          .filter(deal => 
                            tab === 'all' || 
                            (tab === 'completed' && deal.status === 'Completed') ||
                            (tab === 'inprogress' && deal.status === 'In Progress') ||
                            (tab === 'cancelled' && deal.status === 'Cancelled')
                          )
                          .map((deal) => (
                            <React.Fragment key={deal.id}>
                              <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => toggleDealExpansion(deal.id)}>
                                <TableCell>
                                  {expandedDeal === deal.id ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </TableCell>
                                <TableCell>{new Date(deal.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{deal.projectName}</div>
                                    <div className="text-sm text-gray-500">Plot #{deal.plotNumber}</div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{deal.buyerName}</div>
                                    <div className="text-sm text-gray-500">{deal.buyerContact}</div>
                                  </div>
                                </TableCell>
                                <TableCell>{formatCurrency(deal.price)}</TableCell>
                                <TableCell>
                                  {deal.brokerName ? (
                                    <div>
                                      <div>{deal.brokerName}</div>
                                      {deal.brokerageFee && (
                                        <div className="text-sm text-gray-500">{formatCurrency(deal.brokerageFee)}</div>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-gray-500">Direct</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Badge className={
                                    deal.status === 'Completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                    deal.status === 'In Progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                    'bg-red-100 text-red-800 hover:bg-red-100'
                                  }>
                                    {deal.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <FileText className="h-4 w-4 mr-1" />
                                    {deal.documents.length}
                                  </Button>
                                </TableCell>
                              </TableRow>
                              
                              {/* Expanded Row */}
                              {expandedDeal === deal.id && (
                                <TableRow>
                                  <TableCell colSpan={8} className="p-0">
                                    <div className="bg-gray-50 p-4 border-t">
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                          <h4 className="font-medium mb-2">Deal Details</h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                              <span className="text-gray-500">Date:</span>
                                              <span>{new Date(deal.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-500">Project:</span>
                                              <span>{deal.projectName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-500">Plot:</span>
                                              <span>#{deal.plotNumber}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-500">Value:</span>
                                              <span>{formatCurrency(deal.price)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-500">Status:</span>
                                              <Badge className={
                                                deal.status === 'Completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                                deal.status === 'In Progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                                'bg-red-100 text-red-800 hover:bg-red-100'
                                              }>
                                                {deal.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <h4 className="font-medium mb-2">Parties</h4>
                                          <div className="space-y-4 text-sm">
                                            <div>
                                              <h5 className="text-gray-500 mb-1">Buyer</h5>
                                              <div>{deal.buyerName}</div>
                                              <div>{deal.buyerContact}</div>
                                            </div>
                                            
                                            {deal.sellerName && (
                                              <div>
                                                <h5 className="text-gray-500 mb-1">Seller</h5>
                                                <div>{deal.sellerName}</div>
                                                <div>{deal.sellerContact}</div>
                                              </div>
                                            )}
                                            
                                            {deal.brokerName && (
                                              <div>
                                                <h5 className="text-gray-500 mb-1">Broker</h5>
                                                <div>{deal.brokerName}</div>
                                                {deal.brokerageFee && (
                                                  <div>Fee: {formatCurrency(deal.brokerageFee)}</div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <h4 className="font-medium mb-2">Documents</h4>
                                          <div className="space-y-2">
                                            {deal.documents.length > 0 ? (
                                              deal.documents.map((doc, index) => (
                                                <div key={index} className="flex items-center justify-between p-2 bg-white border rounded-md">
                                                  <div className="flex items-center">
                                                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                                    <div>
                                                      <div className="text-sm">{doc.name}</div>
                                                      <div className="text-xs text-gray-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</div>
                                                    </div>
                                                  </div>
                                                  <Button variant="ghost" size="sm">View</Button>
                                                </div>
                                              ))
                                            ) : (
                                              <div className="text-gray-500 text-sm">No documents available</div>
                                            )}
                                            
                                            {deal.status !== 'Cancelled' && (
                                              <Button variant="outline" size="sm" className="w-full mt-2">
                                                Upload New Document
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {deal.notes && (
                                        <div className="mt-6">
                                          <h4 className="font-medium mb-2">Notes</h4>
                                          <div className="p-3 bg-white border rounded-md text-sm">
                                            {deal.notes}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </React.Fragment>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DealHistory;
