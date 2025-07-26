import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RealEstateProject, Unit, Lead, ProjectDocument } from '@/types/project';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  MapPin, 
  Calendar, 
  Building2, 
  Users, 
  FileText, 
  Plus, 
  Edit, 
  Trash2,
  ArrowLeft,
  Upload,
  Download,
  Eye
} from 'lucide-react';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [project, setProject] = useState<RealEstateProject | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch project data
  const fetchProjectData = async () => {
    if (!projectId) return;
    
    try {
      setIsLoading(true);
      
      // Fetch project details
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (projectError) throw projectError;
      setProject(projectData);

      // Fetch units
      const { data: unitsData, error: unitsError } = await supabase
        .from('units')
        .select('*')
        .eq('project_id', projectId)
        .order('unit_number');

      if (unitsError) throw unitsError;
      setUnits(unitsData || []);

      // Fetch leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;
      setLeads(leadsData || []);

      // Fetch documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('project_documents')
        .select('*')
        .eq('project_id', projectId)
        .order('uploaded_at', { ascending: false });

      if (documentsError) throw documentsError;
      setDocuments(documentsData || []);

    } catch (error) {
      console.error('Error fetching project data:', error);
      toast({
        title: t('error'),
        description: t('errorFetchingProjects'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mb-4"></div>
            <div className="h-4 bg-muted rounded w-96"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">{t('projectNotFound')}</h2>
          <Button onClick={() => navigate('/builder/project-manager')}>
            {t('backToProjects')}
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pre_launch': return 'bg-orange-100 text-orange-800';
      case 'booking_open': return 'bg-green-100 text-green-800';
      case 'under_construction': return 'bg-blue-100 text-blue-800';
      case 'possession': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUnitStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'visited': return 'bg-orange-100 text-orange-800';
      case 'negotiation': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unitStats = {
    total: units.length,
    available: units.filter(u => u.unit_status === 'available').length,
    reserved: units.filter(u => u.unit_status === 'reserved').length,
    sold: units.filter(u => u.unit_status === 'sold').length,
  };

  const leadStats = {
    total: leads.length,
    new: leads.filter(l => l.lead_status === 'new').length,
    contacted: leads.filter(l => l.lead_status === 'contacted').length,
    closed: leads.filter(l => l.lead_status === 'closed').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/builder/project-manager')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <Badge className={getStatusColor(project.project_status)}>
                {t(project.project_status.replace('_', ''))}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {t(project.project_type)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {t('created')}: {new Date(project.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              {t('edit')}
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              {t('upload')}
            </Button>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('totalUnits')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unitStats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('availableUnits')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{unitStats.available}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('totalLeads')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leadStats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('documents')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="units">{t('unitManagement')}</TabsTrigger>
            <TabsTrigger value="leads">{t('leadsEnquiries')}</TabsTrigger>
            <TabsTrigger value="documents">{t('documents')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('projectDescription')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  {project.size_options && project.size_options.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">{t('availableSizes')}</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.size_options.map((size, index) => (
                          <Badge key={index} variant="outline">
                            {size} {t('sqft')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {(project.price_range_min || project.price_range_max) && (
                    <div>
                      <Label className="text-sm font-medium">{t('priceRange')}</Label>
                      <p className="text-lg font-semibold mt-1">
                        ₹{project.price_range_min ? (project.price_range_min / 100000).toFixed(1) : '0'}L - 
                        ₹{project.price_range_max ? (project.price_range_max / 100000).toFixed(1) : '0'}L
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('unitOverview')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t('available')}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-green-600">{unitStats.available}</span>
                        <span className="text-sm text-muted-foreground ml-1">/ {unitStats.total}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t('reserved')}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-yellow-600">{unitStats.reserved}</span>
                        <span className="text-sm text-muted-foreground ml-1">/ {unitStats.total}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t('sold')}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-red-600">{unitStats.sold}</span>
                        <span className="text-sm text-muted-foreground ml-1">/ {unitStats.total}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Units Management Tab */}
          <TabsContent value="units" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t('unitManagement')}</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('addUnit')}
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('unitNumber')}</TableHead>
                      <TableHead>{t('type')}</TableHead>
                      <TableHead>{t('size')}</TableHead>
                      <TableHead>{t('price')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {units.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell className="font-medium">{unit.unit_number}</TableCell>
                        <TableCell>{t(unit.unit_type)}</TableCell>
                        <TableCell>{unit.size_sqft} {t('sqft')}</TableCell>
                        <TableCell>₹{unit.total_price?.toLocaleString() || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge className={getUnitStatusColor(unit.unit_status)}>
                            {t(unit.unit_status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {units.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    {t('noUnitsFound')}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads & Enquiries Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t('leadsEnquiries')}</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('addLead')}
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('customerName')}</TableHead>
                      <TableHead>{t('contact')}</TableHead>
                      <TableHead>{t('source')}</TableHead>
                      <TableHead>{t('interestedIn')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.customer_name}</TableCell>
                        <TableCell>{lead.contact}</TableCell>
                        <TableCell>{lead.enquiry_source}</TableCell>
                        <TableCell>{lead.interested_in || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge className={getLeadStatusColor(lead.lead_status)}>
                            {t(lead.lead_status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {leads.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    {t('noLeadsFound')}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t('projectDocuments')}</h3>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                {t('uploadDocument')}
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('documentName')}</TableHead>
                      <TableHead>{t('type')}</TableHead>
                      <TableHead>{t('uploadedDate')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.document_name}</TableCell>
                        <TableCell>{doc.document_type}</TableCell>
                        <TableCell>{new Date(doc.uploaded_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {documents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    {t('noDocumentsFound')}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetailPage;