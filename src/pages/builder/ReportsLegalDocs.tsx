
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockProjects } from '@/data/mockData';
import { FileText, Download, Upload, FilePlus, FileSearch, Bookmark, Clock, Search, Filter, Eye } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: 'agreement' | 'approval' | 'license' | 'tax' | 'report';
  category: 'legal' | 'financial' | 'project';
  project?: string;
  createdAt: string;
  status: 'active' | 'expired' | 'pending';
  expiryDate?: string;
  fileSize: string;
}

const generateMockDocuments = (): Document[] => {
  const docTypes = ['agreement', 'approval', 'license', 'tax', 'report'];
  const categories = ['legal', 'financial', 'project'];
  
  const documents: Document[] = [];
  const projectNames = mockProjects.map(p => p.name);
  
  const agreementTemplates = [
    'Sale Agreement Template',
    'Property Registration Template',
    'Plot Booking Agreement',
    'Construction Agreement',
    'Land Purchase Agreement',
  ];
  
  // Generate agreement templates
  agreementTemplates.forEach((title, index) => {
    documents.push({
      id: `doc-template-${index + 1}`,
      title: title,
      type: 'agreement',
      category: 'legal',
      createdAt: '2023-03-15',
      status: 'active',
      fileSize: '256 KB',
    });
  });
  
  // Generate project documents
  mockProjects.forEach((project, index) => {
    // Project approvals
    documents.push({
      id: `doc-approval-${index + 1}`,
      title: `${project.name} - Building Approval`,
      type: 'approval',
      category: 'legal',
      project: project.name,
      createdAt: '2023-05-20',
      status: 'active',
      expiryDate: '2026-05-20',
      fileSize: '1.2 MB',
    });
    
    // Project licenses
    documents.push({
      id: `doc-license-${index + 1}`,
      title: `${project.name} - Development License`,
      type: 'license',
      category: 'legal',
      project: project.name,
      createdAt: '2023-04-10',
      status: Math.random() > 0.7 ? 'expired' : 'active',
      expiryDate: Math.random() > 0.7 ? '2024-04-10' : '2026-04-10',
      fileSize: '840 KB',
    });
    
    // Financial reports
    documents.push({
      id: `doc-financial-${index + 1}`,
      title: `${project.name} - Financial Statement Q1 2023`,
      type: 'report',
      category: 'financial',
      project: project.name,
      createdAt: '2023-03-31',
      status: 'active',
      fileSize: '560 KB',
    });
  });
  
  // Generate tax documents
  ['2022', '2023'].forEach((year, index) => {
    documents.push({
      id: `doc-tax-${index + 1}`,
      title: `Annual Property Tax Returns ${year}`,
      type: 'tax',
      category: 'financial',
      createdAt: `${year}-07-15`,
      status: 'active',
      fileSize: '780 KB',
    });
  });
  
  // Generate new pending documents
  ['Environmental Clearance', 'Fire Safety Certificate'].forEach((title, index) => {
    documents.push({
      id: `doc-pending-${index + 1}`,
      title: `${mockProjects[index % mockProjects.length].name} - ${title}`,
      type: 'approval',
      category: 'legal',
      project: mockProjects[index % mockProjects.length].name,
      createdAt: '2024-01-10',
      status: 'pending',
      fileSize: '350 KB',
    });
  });
  
  return documents;
};

const documents = generateMockDocuments();

const ReportsLegalDocs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.project && doc.project.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = !categoryFilter || doc.category === categoryFilter;
    const matchesStatus = !statusFilter || doc.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Group documents by type for templates tab
  const templateDocuments = filteredDocuments.filter(doc => !doc.project);
  const projectDocuments = filteredDocuments.filter(doc => doc.project);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getDocumentIcon = (type: string) => {
    switch(type) {
      case 'agreement':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'approval':
        return <Bookmark className="h-5 w-5 text-green-600" />;
      case 'license':
        return <FileSearch className="h-5 w-5 text-purple-600" />;
      case 'tax':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'report':
        return <FileText className="h-5 w-5 text-amber-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Reports & Legal Documents</h1>
            <p className="text-gray-500">Manage your project reports, legal documents, and approval certificates</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
            <Button className="flex gap-2">
              <FilePlus className="h-4 w-4" />
              Create New
            </Button>
          </div>
        </div>
        
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search documents by title or project" 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter || 'all'} onValueChange={(value) => setCategoryFilter(value === 'all' ? null : value)}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Filter by category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="legal">Legal Documents</SelectItem>
                  <SelectItem value="financial">Financial Documents</SelectItem>
                  <SelectItem value="project">Project Documents</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter || 'all'} onValueChange={(value) => setStatusFilter(value === 'all' ? null : value)}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Documents Tabs */}
        <Tabs defaultValue="all" className="bg-white rounded-lg shadow-sm border p-1">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="templates">Document Templates</TabsTrigger>
            <TabsTrigger value="project">Project Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.length > 0 ? (
                        filteredDocuments.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {getDocumentIcon(doc.type)}
                                <span>{doc.title}</span>
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">{doc.category}</TableCell>
                            <TableCell>{doc.project || '-'}</TableCell>
                            <TableCell>{doc.createdAt}</TableCell>
                            <TableCell>{doc.expiryDate || '-'}</TableCell>
                            <TableCell>{getStatusBadge(doc.status)}</TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No documents found matching the current filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templateDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden border transition-all hover:shadow-md">
                  <CardHeader className="bg-gray-50 pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getDocumentIcon(doc.type)}
                        <span className="line-clamp-1">{doc.title}</span>
                      </CardTitle>
                    </div>
                    <CardDescription className="capitalize">{doc.category} Template</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created:</span>
                        <span>{doc.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Size:</span>
                        <span>{doc.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        {getStatusBadge(doc.status)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t">
                    <div className="flex justify-between w-full">
                      <Button variant="ghost" size="sm" className="flex gap-1">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex gap-1">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              {templateDocuments.length === 0 && (
                <div className="col-span-3 h-40 flex items-center justify-center text-gray-500 border rounded-lg">
                  No template documents found matching the current filters.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="project">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projectDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden border transition-all hover:shadow-md">
                  <CardHeader className="bg-gray-50 pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getDocumentIcon(doc.type)}
                        <span className="line-clamp-1">{doc.title}</span>
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-1">{doc.project}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category:</span>
                        <span className="capitalize">{doc.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created:</span>
                        <span>{doc.createdAt}</span>
                      </div>
                      {doc.expiryDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Expiry:</span>
                          <span>{doc.expiryDate}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        {getStatusBadge(doc.status)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t">
                    <div className="flex justify-between w-full">
                      <Button variant="ghost" size="sm" className="flex gap-1">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex gap-1">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              {projectDocuments.length === 0 && (
                <div className="col-span-3 h-40 flex items-center justify-center text-gray-500 border rounded-lg">
                  No project documents found matching the current filters.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReportsLegalDocs;
