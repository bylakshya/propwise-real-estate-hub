import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { RealEstateProject } from '@/types/project';
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { useToast } from '@/hooks/use-toast';

const ProjectManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<RealEstateProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Fetch projects from Supabase
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
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
    fetchProjects();
  }, []);
  
  // Filter projects
  const filteredProjects = projects.filter(project => {
    if (searchQuery && 
        !project.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const activeProjects = filteredProjects.filter(project => 
    ['pre_launch', 'booking_open', 'under_construction'].includes(project.project_status)
  );

  const completedProjects = filteredProjects.filter(project => 
    ['possession', 'completed'].includes(project.project_status)
  );

  const handleViewDetails = (projectId: string) => {
    navigate(`/builder/project-detail/${projectId}`);
  };

  const handleEdit = (projectId: string) => {
    // TODO: Implement edit functionality
    toast({
      title: t('info'),
      description: t('featureComingSoon'),
    });
  };

  const handleShare = (projectId: string) => {
    // TODO: Implement share functionality
    const shareUrl = `${window.location.origin}/builder/project-detail/${projectId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: t('success'),
      description: t('linkCopied'),
    });
  };
  
  const ProjectList: React.FC<{ projects: RealEstateProject[] }> = ({ projects }) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-96 animate-pulse">
              <div className="h-48 bg-muted"></div>
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="text-center py-12 bg-background rounded-lg border">
          <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-muted flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">{t('noProjectsFound')}</h3>
          <p className="text-muted-foreground">{t('tryAdjustingSearch')}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onShare={handleShare}
          />
        ))}
      </div>
    );
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">{t('projectManager')}</h1>
            <p className="text-muted-foreground">{t('manageRealEstateProjects')}</p>
          </div>
          
          <CreateProjectDialog onProjectCreated={fetchProjects} />
        </div>
        
        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchByNameLocation')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Projects Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('totalProjects')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('activeProjects')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('completedProjects')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedProjects.length}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Projects Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="all">{t('allProjects')}</TabsTrigger>
            <TabsTrigger value="active">{t('active')}</TabsTrigger>
            <TabsTrigger value="completed">{t('completed')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ProjectList projects={filteredProjects} />
          </TabsContent>
          
          <TabsContent value="active">
            <ProjectList projects={activeProjects} />
          </TabsContent>
          
          <TabsContent value="completed">
            <ProjectList projects={completedProjects} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectManager;