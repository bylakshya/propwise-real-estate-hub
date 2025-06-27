
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Target, 
  Plus, 
  Phone,
  Mail,
  Eye,
  Edit,
  Users,
  TrendingUp,
  Star
} from 'lucide-react';

const LeadGeneration: React.FC = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+1-555-0123', source: 'Website', interest: 'Premium Plots', score: 85, status: 'Hot', date: '2024-01-18' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1-555-0124', source: 'Facebook', interest: 'Budget Homes', score: 72, status: 'Warm', date: '2024-01-17' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', phone: '+1-555-0125', source: 'Google Ads', interest: 'Commercial', score: 94, status: 'Hot', date: '2024-01-16' },
    { id: 4, name: 'Emma Davis', email: 'emma@email.com', phone: '+1-555-0126', source: 'Referral', interest: 'Luxury Villas', score: 91, status: 'Hot', date: '2024-01-15' },
  ]);

  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    interest: ''
  });

  const handleAddLead = () => {
    if (!newLead.name || !newLead.email) {
      toast({
        title: "Error",
        description: "Please fill in name and email",
        variant: "destructive",
      });
      return;
    }

    const lead = {
      id: leads.length + 1,
      ...newLead,
      score: Math.floor(Math.random() * 40) + 60,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    };

    setLeads([...leads, lead]);
    setNewLead({ name: '', email: '', phone: '', source: '', interest: '' });
    
    toast({
      title: "Success",
      description: "Lead added successfully!",
    });
  };

  const handleContactLead = (leadId: number) => {
    toast({
      title: "Contact Initiated",
      description: "Lead contact process started!",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-800';
      case 'Warm': return 'bg-yellow-100 text-yellow-800';
      case 'Cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl mb-2">Lead Generation</h1>
            <p className="text-gray-500">Manage and track your potential customers</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="premium-button">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                />
                <Input
                  placeholder="Phone Number"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                />
                <Input
                  placeholder="Lead Source (e.g., Website, Facebook)"
                  value={newLead.source}
                  onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                />
                <Input
                  placeholder="Interest (e.g., Premium Plots, Budget Homes)"
                  value={newLead.interest}
                  onChange={(e) => setNewLead({...newLead, interest: e.target.value})}
                />
                <Button onClick={handleAddLead} className="w-full">
                  Add Lead
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{leads.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Target className="h-5 w-5 text-red-500" />
                Hot Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{leads.filter(l => l.status === 'Hot').length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Avg Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{lead.name}</h3>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                          Score: {lead.score}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </span>
                      <span>Source: {lead.source}</span>
                      <span>Interest: {lead.interest}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-2">{lead.date}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleContactLead(lead.id)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
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

export default LeadGeneration;
