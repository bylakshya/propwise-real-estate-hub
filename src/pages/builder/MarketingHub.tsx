
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Target, 
  TrendingUp, 
  Users, 
  Send, 
  Eye,
  MousePointer,
  Calendar,
  Plus
} from 'lucide-react';

const MarketingHub: React.FC = () => {
  const campaigns = [
    { id: 1, name: 'New Project Launch', type: 'Email', status: 'Active', sent: 1250, opened: 342, clicked: 87, date: '2024-01-15' },
    { id: 2, name: 'Holiday Special Offers', type: 'SMS', status: 'Completed', sent: 890, opened: 567, clicked: 145, date: '2024-01-10' },
    { id: 3, name: 'Property Investment Tips', type: 'Email', status: 'Draft', sent: 0, opened: 0, clicked: 0, date: '2024-01-20' },
  ];

  const leads = [
    { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+1-555-0123', source: 'Website', interest: 'Premium Plots', score: 85, date: '2024-01-18' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1-555-0124', source: 'Facebook', interest: 'Budget Homes', score: 72, date: '2024-01-17' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', phone: '+1-555-0125', source: 'Google Ads', interest: 'Commercial', score: 94, date: '2024-01-16' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl mb-2">Marketing Hub</h1>
            <p className="text-gray-500">Manage your marketing campaigns and lead generation</p>
          </div>
          <div className="flex gap-3">
            <Button className="premium-button">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Marketing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-500" />
                Total Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,140</div>
              <p className="text-sm text-green-500 mt-2">↑ 12% this month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-500" />
                Open Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42.3%</div>
              <p className="text-sm text-green-500 mt-2">↑ 5.2% vs last month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <MousePointer className="h-5 w-5 text-orange-500" />
                Click Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8.7%</div>
              <p className="text-sm text-orange-500 mt-2">↑ 2.1% vs last month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                New Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87</div>
              <p className="text-sm text-purple-500 mt-2">↑ 23% this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Email Campaigns Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                Email Campaigns
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <Badge variant={campaign.status === 'Active' ? 'default' : campaign.status === 'Completed' ? 'secondary' : 'outline'}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>Type: {campaign.type}</span>
                      <span>Sent: {campaign.sent.toLocaleString()}</span>
                      <span>Opened: {campaign.opened}</span>
                      <span>Clicked: {campaign.clicked}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{campaign.date}</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Generation Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Recent Leads
              </CardTitle>
              <Button variant="outline" size="sm">Manage Leads</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{lead.name}</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-500 font-medium">Score: {lead.score}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>{lead.email}</span>
                      <span>{lead.phone}</span>
                      <span>Source: {lead.source}</span>
                      <span>Interest: {lead.interest}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{lead.date}</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">Contact</Button>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MarketingHub;
