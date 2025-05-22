
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProjects } from '@/data/mockData';
import { Project } from '@/types';
import { PlusCircle, Edit, Share, ArrowRight } from 'lucide-react';

const ProjectManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Filter projects
  const filteredProjects = mockProjects.filter(project => {
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Project Manager</h1>
            <p className="text-gray-500">Manage your real estate projects, plots, and development status.</p>
          </div>
          
          <Button className="md:self-start">
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Project
          </Button>
        </div>
        
        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Search Projects</label>
                <Input
                  placeholder="Search by name or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Projects Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onViewDetails={() => navigate(`/builder/projects/${project.id}`)} 
              />
            ))}
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                  <path d="M12 12h.01"></path>
                  <path d="M17 12h.01"></path>
                  <path d="M7 12h.01"></path>
                  <path d="M2 10h20"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-6">
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Active Projects</h3>
              <p className="text-gray-500">All your projects are currently in active status.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Projects</h3>
              <p className="text-gray-500">You don't have any completed projects yet.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const totalPlots = project.plots.length;
  const soldPlots = project.plots.filter(p => p.status === 'Sold').length;
  const reservedPlots = project.plots.filter(p => p.status === 'Reserved').length;
  const availablePlots = project.plots.filter(p => p.status === 'Available').length;
  
  // Calculate percentages
  const soldPercentage = Math.round((soldPlots / totalPlots) * 100);
  const reservedPercentage = Math.round((reservedPlots / totalPlots) * 100);
  const availablePercentage = Math.round((availablePlots / totalPlots) * 100);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onViewDetails}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-60 md:h-auto">
          <img 
            src={project.layouts[0]?.imageUrl || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=860&q=80'} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <CardContent className="p-5 flex-1">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="font-semibold text-xl mb-1">{project.name}</h3>
              <p className="text-gray-500 mb-2">{project.location}</p>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>Area: {project.totalArea} {project.areaUnit}</span>
                <span>•</span>
                <span>Plots: {totalPlots}</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex md:flex-col items-center md:items-end gap-2 md:gap-0">
              <span className="text-xs text-gray-500">Last Updated</span>
              <span className="text-sm font-medium">{new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Sold</span>
                <span className="text-sm font-medium">{soldPlots}/{totalPlots}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-realestate-success rounded-full" 
                  style={{ width: `${soldPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Reserved</span>
                <span className="text-sm font-medium">{reservedPlots}/{totalPlots}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-realestate-warning rounded-full" 
                  style={{ width: `${reservedPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Available</span>
                <span className="text-sm font-medium">{availablePlots}/{totalPlots}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-realestate-info rounded-full" 
                  style={{ width: `${availablePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.approvals.map((approval, index) => (
              <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                {approval}
              </span>
            ))}
          </div>
          
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            
            <Button>
              View Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProjectManager;
