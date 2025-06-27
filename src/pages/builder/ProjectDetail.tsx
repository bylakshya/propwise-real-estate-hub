import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockProjects } from '@/data/mockData';
import { Project, Plot } from '@/types';
import { ArrowLeft, Download, Filter, Grid3X3, Users } from 'lucide-react';
import PlotDetailDialog from '@/components/builder/PlotDetailDialog';

const ProjectDetail: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [isPlotDialogOpen, setIsPlotDialogOpen] = useState(false);
  
  useEffect(() => {
    // Find project from mock data
    if (projectId) {
      const foundProject = mockProjects.find(p => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
      }
    }
  }, [projectId]);
  
  const handlePlotClick = (plot: Plot) => {
    setSelectedPlot(plot);
    setIsPlotDialogOpen(true);
    console.log('Plot details:', plot);
  };
  
  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p>Project not found. <Button onClick={() => navigate('/builder/projects')}>Back to Projects</Button></p>
        </div>
      </DashboardLayout>
    );
  }
  
  // Filter plots based on status
  const filteredPlots = project.plots.filter(plot => {
    if (filterStatus === 'all') return true;
    return plot.status.toLowerCase() === filterStatus.toLowerCase();
  });
  
  // Group plots for grid display
  const groupedPlots: Plot[][] = [];
  const plotsPerRow = 5; // 5 plots per row for grid view
  
  for (let i = 0; i < filteredPlots.length; i += plotsPerRow) {
    groupedPlots.push(filteredPlots.slice(i, i + plotsPerRow));
  }
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-blue-100 text-blue-800';
      case 'sold':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/builder/projects')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-bold text-3xl">{project.name}</h1>
            <p className="text-gray-500">{project.location}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {project.totalArea} {project.areaUnit}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Plots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {project.plots.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <span className="text-green-600">{project.plots.filter(p => p.status === 'Sold').length}</span> Sold, 
                <span className="text-amber-600 ml-1">{project.plots.filter(p => p.status === 'Reserved').length}</span> Reserved, 
                <span className="text-blue-600 ml-1">{project.plots.filter(p => p.status === 'Available').length}</span> Available
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.approvals.map((approval, index) => (
                  <Badge key={index} variant="outline">{approval}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Plot Layout</CardTitle>
              <div className="flex items-center gap-2">
                <div>
                  <select
                    className="p-2 text-sm border rounded-md"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Plots</option>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <Button variant="outline" size="icon" onClick={() => setViewMode('grid')}>
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setViewMode('table')}>
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'grid' ? (
              <div className="space-y-6">
                {project.layouts.length > 0 && (
                  <div className="border rounded-md overflow-hidden">
                    <img 
                      src={project.layouts[0].imageUrl} 
                      alt={project.layouts[0].name} 
                      className="w-full h-auto"
                    />
                  </div>
                )}
                
                <div className="border rounded-md p-4">
                  <div className="grid grid-cols-1 gap-y-8">
                    {groupedPlots.map((row, rowIndex) => (
                      <div key={rowIndex} className="grid grid-cols-5 gap-4">
                        {row.map((plot) => (
                          <div 
                            key={plot.id} 
                            className={`p-4 border rounded-md cursor-pointer hover:shadow-md transition-shadow
                              ${plot.status === 'Sold' ? 'bg-green-50 border-green-200' : 
                                plot.status === 'Reserved' ? 'bg-amber-50 border-amber-200' : 
                                'bg-blue-50 border-blue-200'}`}
                            onClick={() => handlePlotClick(plot)}
                          >
                            <div className="text-center">
                              <p className="font-bold text-lg">#{plot.plotNumber}</p>
                              <p className="text-sm text-gray-500">{plot.size} {plot.sizeUnit}</p>
                              <p className={`text-xs mt-2 px-2 py-1 rounded-full ${getStatusColor(plot.status)}`}>
                                {plot.status}
                              </p>
                              <p className="text-sm mt-2">₹{plot.price.toLocaleString()}</p>
                              {plot.isCorner && <Badge className="mt-1">Corner</Badge>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plot #</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Facing</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead>Buyer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlots.map((plot) => (
                      <TableRow 
                        key={plot.id} 
                        className="cursor-pointer hover:bg-gray-50" 
                        onClick={() => handlePlotClick(plot)}
                      >
                        <TableCell className="font-medium">{plot.plotNumber}</TableCell>
                        <TableCell>{plot.size} {plot.sizeUnit}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(plot.status)}`}>
                            {plot.status}
                          </span>
                        </TableCell>
                        <TableCell>₹{plot.price.toLocaleString()}</TableCell>
                        <TableCell>{plot.facing}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {plot.isCorner && <Badge variant="outline" className="text-xs">Corner</Badge>}
                            {plot.hasGarden && <Badge variant="outline" className="text-xs">Garden</Badge>}
                            {plot.isHot && <Badge variant="outline" className="text-xs bg-red-50 text-red-800">Hot</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>
                          {plot.buyer ? (
                            <div className="flex items-center">
                              <span>{plot.buyer.name}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Plot Detail Dialog */}
      <PlotDetailDialog 
        plot={selectedPlot}
        isOpen={isPlotDialogOpen}
        onClose={() => setIsPlotDialogOpen(false)}
      />
    </DashboardLayout>
  );
};

export default ProjectDetail;
