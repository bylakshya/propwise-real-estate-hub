
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Users, Settings, Database, Shield, Activity, UserPlus, Edit, Trash2, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPanel: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');

  const texts = {
    en: {
      title: 'Admin Panel',
      subtitle: 'Manage system settings, users, and configurations',
      userManagement: 'User Management',
      systemSettings: 'System Settings',
      dataBackup: 'Data & Backup',
      security: 'Security',
      addUser: 'Add User',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      admin: 'Admin',
      user: 'User',
      manager: 'Manager',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      userAdded: 'User Added',
      userAddedSuccess: 'New user has been added successfully',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      adminUsers: 'Admin Users',
      systemHealth: 'System Health',
      enableNotifications: 'Enable Notifications',
      enableBackup: 'Enable Auto Backup',
      enableSecurity: 'Enable Security Logs',
      backupFrequency: 'Backup Frequency',
      lastBackup: 'Last Backup',
      securityStatus: 'Security Status'
    },
    hi: {
      title: 'एडमिन पैनल',
      subtitle: 'सिस्टम सेटिंग्स, उपयोगकर्ता और कॉन्फ़िगरेशन प्रबंधित करें',
      userManagement: 'उपयोगकर्ता प्रबंधन',
      systemSettings: 'सिस्टम सेटिंग्स',
      dataBackup: 'डेटा और बैकअप',
      security: 'सुरक्षा',
      addUser: 'उपयोगकर्ता जोड़ें',
      name: 'नाम',
      email: 'ईमेल',
      role: 'भूमिका',
      status: 'स्थिति',
      actions: 'कार्य',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
      admin: 'एडमिन',
      user: 'उपयोगकर्ता',
      manager: 'प्रबंधक',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      save: 'सेव करें',
      cancel: 'रद्द करें',
      userAdded: 'उपयोगकर्ता जोड़ा गया',
      userAddedSuccess: 'नया उपयोगकर्ता सफलतापूर्वक जोड़ा गया है',
      totalUsers: 'कुल उपयोगकर्ता',
      activeUsers: 'सक्रिय उपयोगकर्ता',
      adminUsers: 'एडमिन उपयोगकर्ता',
      systemHealth: 'सिस्टम स्वास्थ्य',
      enableNotifications: 'नोटिफिकेशन सक्षम करें',
      enableBackup: 'ऑटो बैकअप सक्षम करें',
      enableSecurity: 'सिक्यूरिटी लॉग सक्षम करें',
      backupFrequency: 'बैकअप आवृत्ति',
      lastBackup: 'अंतिम बैकअप',
      securityStatus: 'सुरक्षा स्थिति'
    }
  };

  const currentTexts = texts[language];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'manager', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive' },
  ];

  const handleAddUser = () => {
    if (!newUserName || !newUserEmail) {
      toast({
        title: language === 'en' ? 'Missing Information' : 'जानकारी गुम',
        description: language === 'en' ? 'Please fill in all required fields' : 'कृपया सभी आवश्यक फ़ील्ड भरें',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: currentTexts.userAdded,
      description: currentTexts.userAddedSuccess,
    });

    setIsAddUserOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('user');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl mb-2">{currentTexts.title}</h1>
          <p className="text-gray-500">{currentTexts.subtitle}</p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                {currentTexts.totalUsers}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-500">+3 {language === 'en' ? 'this month' : 'इस महीने'}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {currentTexts.activeUsers}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-green-600">75% {language === 'en' ? 'active rate' : 'सक्रिय दर'}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {currentTexts.adminUsers}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-blue-600">{language === 'en' ? 'Admin accounts' : 'एडमिन खाते'}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="h-4 w-4" />
                {currentTexts.systemHealth}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-xs text-green-600">{language === 'en' ? 'All systems operational' : 'सभी सिस्टम चालू'}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users">{currentTexts.userManagement}</TabsTrigger>
            <TabsTrigger value="settings">{currentTexts.systemSettings}</TabsTrigger>
            <TabsTrigger value="backup">{currentTexts.dataBackup}</TabsTrigger>
            <TabsTrigger value="security">{currentTexts.security}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{currentTexts.userManagement}</CardTitle>
                  <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="h-4 w-4 mr-2" />
                        {currentTexts.addUser}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{currentTexts.addUser}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">{currentTexts.name}</Label>
                          <Input
                            id="name"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder={language === 'en' ? 'Enter user name' : 'उपयोगकर्ता नाम दर्ज करें'}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{currentTexts.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            placeholder={language === 'en' ? 'Enter email address' : 'ईमेल पता दर्ज करें'}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleAddUser}>{currentTexts.save}</Button>
                          <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>{currentTexts.cancel}</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{currentTexts.name}</TableHead>
                      <TableHead>{currentTexts.email}</TableHead>
                      <TableHead>{currentTexts.role}</TableHead>
                      <TableHead>{currentTexts.status}</TableHead>
                      <TableHead>{currentTexts.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role === 'admin' ? currentTexts.admin : user.role === 'manager' ? currentTexts.manager : currentTexts.user}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {user.status === 'active' ? currentTexts.active : currentTexts.inactive}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{currentTexts.systemSettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{currentTexts.enableNotifications}</h4>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'Send system notifications to users' : 'उपयोगकर्ताओं को सिस्टम नोटिफिकेशन भेजें'}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{currentTexts.enableBackup}</h4>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'Automatically backup system data' : 'सिस्टम डेटा का स्वचालित बैकअप'}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{currentTexts.enableSecurity}</h4>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'Log security events and access attempts' : 'सुरक्षा घटनाओं और एक्सेस प्रयासों को लॉग करें'}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{currentTexts.dataBackup}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{currentTexts.backupFrequency}</Label>
                    <p className="text-2xl font-bold">{language === 'en' ? 'Daily' : 'दैनिक'}</p>
                  </div>
                  <div>
                    <Label>{currentTexts.lastBackup}</Label>
                    <p className="text-2xl font-bold">{language === 'en' ? '2 hours ago' : '2 घंटे पहले'}</p>
                  </div>
                </div>
                <Button>
                  <Database className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Create Backup Now' : 'अभी बैकअप बनाएं'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{currentTexts.security}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{currentTexts.securityStatus}</h4>
                    <p className="text-sm text-green-600">{language === 'en' ? 'All security measures are active' : 'सभी सुरक्षा उपाय सक्रिय हैं'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
