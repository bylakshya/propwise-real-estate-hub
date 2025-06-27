
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Plus, 
  Send, 
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users
} from 'lucide-react';

const EmailCampaigns: React.FC = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'New Project Launch', status: 'Active', sent: 1250, opened: 342, clicked: 87, date: '2024-01-15' },
    { id: 2, name: 'Holiday Special Offers', status: 'Completed', sent: 890, opened: 567, clicked: 145, date: '2024-01-10' },
    { id: 3, name: 'Property Investment Tips', status: 'Draft', sent: 0, opened: 0, clicked: 0, date: '2024-01-20' },
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    content: '',
    recipients: ''
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.subject) {
      toast({
        title: "Error",
        description: "Please fill in campaign name and subject",
        variant: "destructive",
      });
      return;
    }

    const campaign = {
      id: campaigns.length + 1,
      name: newCampaign.name,
      status: 'Draft',
      sent: 0,
      opened: 0,
      clicked: 0,
      date: new Date().toISOString().split('T')[0]
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({ name: '', subject: '', content: '', recipients: '' });
    
    toast({
      title: "Success",
      description: "Email campaign created successfully!",
    });
  };

  const handleSendCampaign = (id: number) => {
    setCampaigns(campaigns.map(c => 
      c.id === id ? { ...c, status: 'Active', sent: Math.floor(Math.random() * 1000) + 100 } : c
    ));
    
    toast({
      title: "Campaign Sent",
      description: "Email campaign has been sent successfully!",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl mb-2">Email Campaigns</h1>
            <p className="text-gray-500">Create and manage your email marketing campaigns</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="premium-button">
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Email Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Campaign Name"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                />
                <Input
                  placeholder="Email Subject"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                />
                <Textarea
                  placeholder="Email Content"
                  rows={6}
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                />
                <Input
                  placeholder="Recipients (comma separated emails)"
                  value={newCampaign.recipients}
                  onChange={(e) => setNewCampaign({...newCampaign, recipients: e.target.value})}
                />
                <Button onClick={handleCreateCampaign} className="w-full">
                  Create Campaign
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                Total Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaigns.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Send className="h-5 w-5 text-green-500" />
                Total Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaigns.reduce((sum, c) => sum + c.sent, 0)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Eye className="h-5 w-5 text-orange-500" />
                Total Opened
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaigns.reduce((sum, c) => sum + c.opened, 0)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaigns.reduce((sum, c) => sum + c.clicked, 0)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
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
                      <span>Sent: {campaign.sent}</span>
                      <span>Opened: {campaign.opened}</span>
                      <span>Clicked: {campaign.clicked}</span>
                      <span>Date: {campaign.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {campaign.status === 'Draft' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendCampaign(campaign.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default EmailCampaigns;
