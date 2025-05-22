
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProperties, mockCustomers, mockFollowUps } from '@/data/mockData';

const BrokerDashboard: React.FC = () => {
  // Calculate some stats
  const totalProperties = mockProperties.length;
  const propertiesForSale = mockProperties.filter(p => p.purpose === 'Sell').length;
  const propertiesForRent = mockProperties.filter(p => p.purpose === 'Rent').length;
  const totalCustomers = mockCustomers.length;
  const upcomingFollowUps = mockFollowUps.filter(f => new Date(f.nextFollowUpDate!) > new Date()).length;
  
  // Get recent properties
  const recentProperties = mockProperties.slice(0, 3);
  
  // Get upcoming follow-ups
  const pendingFollowUps = mockFollowUps
    .filter(f => new Date(f.nextFollowUpDate!) > new Date())
    .sort((a, b) => new Date(a.nextFollowUpDate!).getTime() - new Date(b.nextFollowUpDate!).getTime())
    .slice(0, 3);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl mb-2">Broker Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's an overview of your real estate business.</p>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalProperties}</div>
              <p className="text-sm text-gray-500 mt-2">
                {propertiesForSale} for sale, {propertiesForRent} for rent
              </p>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCustomers}</div>
              <p className="text-sm text-gray-500 mt-2">
                Active leads in your pipeline
              </p>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Pending Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingFollowUps}</div>
              <p className="text-sm text-gray-500 mt-2">
                Scheduled for the next 7 days
              </p>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Brokerage MTD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$3,460</div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-500">↑ 12%</span> vs last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Properties */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProperties.map((property) => (
              <Card key={property.id} className="property-card">
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={property.photos[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {property.purpose}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{property.address}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{property.size} {property.sizeUnit}</span>
                    <span>{property.type}</span>
                    <span>Facing: {property.facing}</span>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                    <span className="font-bold text-lg">${property.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">
                      Updated {new Date(property.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Upcoming Follow-ups */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Follow-ups</h2>
          <Card>
            <div className="divide-y">
              {pendingFollowUps.length > 0 ? (
                pendingFollowUps.map((followUp) => (
                  <div key={followUp.id} className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{followUp.customerName}</h3>
                      <p className="text-sm text-gray-500">{followUp.remarks}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(followUp.nextFollowUpDate!).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(followUp.nextFollowUpDate!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No upcoming follow-ups scheduled
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrokerDashboard;
