
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProjects, mockCustomers } from '@/data/mockData';

const BuilderDashboard: React.FC = () => {
  // Calculate some stats
  const totalProjects = mockProjects.length;
  const totalPlots = mockProjects.reduce((acc, project) => acc + project.plots.length, 0);
  const soldPlots = mockProjects.reduce((acc, project) => 
    acc + project.plots.filter(plot => plot.status === 'Sold').length, 0);
  const availablePlots = mockProjects.reduce((acc, project) => 
    acc + project.plots.filter(plot => plot.status === 'Available').length, 0);
  const totalCustomers = mockCustomers.length;
  
  // Calculate plot percentages
  const soldPercentage = Math.round((soldPlots / totalPlots) * 100);
  const availablePercentage = Math.round((availablePlots / totalPlots) * 100);
  const reservedPercentage = 100 - soldPercentage - availablePercentage;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl mb-2">Builder Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's an overview of your real estate projects.</p>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalProjects}</div>
              <p className="text-sm text-gray-500 mt-2">
                Active real estate developments
              </p>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Total Plots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPlots}</div>
              <p className="text-sm text-gray-500 mt-2">
                Across all your projects
              </p>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCustomers}</div>
              <p className="text-sm text-gray-500 mt-2">
                Potential and existing buyers
              </p>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Revenue MTD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$58,450</div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-500">↑ 23%</span> vs last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Projects Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Plot Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Sold</span>
                  <span className="text-sm font-medium">{soldPlots} plots ({soldPercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-realestate-success rounded-full" 
                    style={{ width: `${soldPercentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Reserved</span>
                  <span className="text-sm font-medium">{totalPlots - soldPlots - availablePlots} plots ({reservedPercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-realestate-warning rounded-full" 
                    style={{ width: `${reservedPercentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Available</span>
                  <span className="text-sm font-medium">{availablePlots} plots ({availablePercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-realestate-info rounded-full" 
                    style={{ width: `${availablePercentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProjects.map(project => 
                  project.plots
                    .filter(plot => plot.payment?.pending && plot.payment.pending.length > 0)
                    .map(plot => plot.payment!.pending!.map((payment, index) => (
                      <div key={`${plot.id}-${index}`} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{project.name} - Plot {plot.plotNumber}</p>
                          <p className="text-sm text-gray-500">Due on {payment.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${payment.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(payment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )))
                    .flat()
                    .slice(0, 3)
                )}
                
                {mockProjects.every(project => 
                  project.plots.every(plot => 
                    !plot.payment?.pending || plot.payment.pending.length === 0
                  )
                ) && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming collections</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Projects List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProjects.map(project => (
              <Card key={project.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.layouts[0]?.imageUrl || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=860&q=80'} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-xl mb-2">{project.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{project.location}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Total Plots</p>
                      <p className="font-semibold">{project.plots.length}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Sold</p>
                      <p className="font-semibold">
                        {project.plots.filter(p => p.status === 'Sold').length}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Available</p>
                      <p className="font-semibold">
                        {project.plots.filter(p => p.status === 'Available').length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Import Button which was missing
import { Button } from '@/components/ui/button';

export default BuilderDashboard;
