
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageCircle, Phone, Target, Users, Plus, Calendar, Megaphone, Share2, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MarketingHub: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [campaignType, setCampaignType] = useState('');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');

  const texts = {
    en: {
      title: 'Marketing Hub',
      subtitle: 'Manage your marketing campaigns and lead generation activities',
      quickActions: 'Quick Actions',
      campaigns: 'Active Campaigns',
      createCampaign: 'Create New Campaign',
      emailCampaign: 'Email Campaign',
      smsCampaign: 'SMS Campaign',
      whatsappCampaign: 'WhatsApp Campaign',
      socialMediaCampaign: 'Social Media Campaign',
      printCampaign: 'Print Campaign',
      digitalAdsCampaign: 'Digital Ads Campaign',
      campaignTitle: 'Campaign Title',
      campaignDescription: 'Campaign Description',
      targetAudience: 'Target Audience',
      schedule: 'Schedule',
      create: 'Create Campaign',
      cancel: 'Cancel',
      campaignCreated: 'Campaign Created',
      campaignCreatedSuccess: 'Your marketing campaign has been created successfully',
      stats: 'Marketing Statistics',
      totalLeads: 'Total Leads',
      conversionRate: 'Conversion Rate',
      activeCampaigns: 'Active Campaigns',
      roi: 'Return on Investment'
    },
    hi: {
      title: 'मार्केटिंग हब',
      subtitle: 'अपनी मार्केटिंग कैंपेन और लीड जेनरेशन गतिविधियों को प्रबंधित करें',
      quickActions: 'त्वरित कार्य',
      campaigns: 'सक्रिय कैंपेन',
      createCampaign: 'नया कैंपेन बनाएं',
      emailCampaign: 'ईमेल कैंपेन',
      smsCampaign: 'SMS कैंपेन',
      whatsappCampaign: 'व्हाट्सऐप कैंपेन',
      socialMediaCampaign: 'सोशल मीडिया कैंपेन',
      printCampaign: 'प्रिंट कैंपेन',
      digitalAdsCampaign: 'डिजिटल विज्ञापन कैंपेन',
      campaignTitle: 'कैंपेन शीर्षक',
      campaignDescription: 'कैंपेन विवरण',
      targetAudience: 'लक्षित दर्शक',
      schedule: 'समय निर्धारण',
      create: 'कैंपेन बनाएं',
      cancel: 'रद्द करें',
      campaignCreated: 'कैंपेन बनाया गया',
      campaignCreatedSuccess: 'आपका मार्केटिंग कैंपेन सफलतापूर्वक बनाया गया है',
      stats: 'मार्केटिंग आंकड़े',
      totalLeads: 'कुल लीड्स',
      conversionRate: 'रूपांतरण दर',
      activeCampaigns: 'सक्रिय कैंपेन',
      roi: 'निवेश पर रिटर्न'
    }
  };

  const currentTexts = texts[language];

  const campaignTypes = [
    { id: 'email', name: currentTexts.emailCampaign, icon: Mail, color: 'bg-blue-500' },
    { id: 'sms', name: currentTexts.smsCampaign, icon: MessageCircle, color: 'bg-green-500' },
    { id: 'whatsapp', name: currentTexts.whatsappCampaign, icon: Phone, color: 'bg-green-600' },
    { id: 'social', name: currentTexts.socialMediaCampaign, icon: Instagram, color: 'bg-purple-500' },
    { id: 'print', name: currentTexts.printCampaign, icon: Share2, color: 'bg-orange-500' },
    { id: 'digital', name: currentTexts.digitalAdsCampaign, icon: Target, color: 'bg-red-500' }
  ];

  const handleCreateCampaign = () => {
    if (!campaignType || !campaignTitle) {
      toast({
        title: language === 'en' ? 'Missing Information' : 'जानकारी गुम',
        description: language === 'en' ? 'Please select campaign type and enter title' : 'कृपया कैंपेन प्रकार चुनें और शीर्षक दर्ज करें',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: currentTexts.campaignCreated,
      description: currentTexts.campaignCreatedSuccess,
    });

    setIsCreateCampaignOpen(false);
    setCampaignType('');
    setCampaignTitle('');
    setCampaignDescription('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl mb-2">{currentTexts.title}</h1>
          <p className="text-gray-500">{currentTexts.subtitle}</p>
        </div>

        {/* Marketing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{currentTexts.totalLeads}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-green-600">+12% {language === 'en' ? 'from last month' : 'पिछले महीने से'}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{currentTexts.conversionRate}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <p className="text-xs text-green-600">+3.2% {language === 'en' ? 'from last month' : 'पिछले महीने से'}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{currentTexts.activeCampaigns}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-blue-600">{language === 'en' ? 'Running campaigns' : 'चल रहे कैंपेन'}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{currentTexts.roi}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">320%</div>
              <p className="text-xs text-green-600">+45% {language === 'en' ? 'from last month' : 'पिछले महीने से'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{currentTexts.quickActions}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {campaignTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Dialog key={type.id} open={isCreateCampaignOpen && campaignType === type.id} onOpenChange={(open) => {
                    setIsCreateCampaignOpen(open);
                    if (open) setCampaignType(type.id);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-20 flex flex-col gap-2 p-4">
                        <div className={`w-8 h-8 rounded-full ${type.color} flex items-center justify-center`}>
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs text-center">{type.name}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{currentTexts.createCampaign} - {type.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">{currentTexts.campaignTitle}</Label>
                          <Input
                            id="title"
                            value={campaignTitle}
                            onChange={(e) => setCampaignTitle(e.target.value)}
                            placeholder={language === 'en' ? 'Enter campaign title' : 'कैंपेन शीर्षक दर्ज करें'}
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">{currentTexts.campaignDescription}</Label>
                          <Textarea
                            id="description"
                            value={campaignDescription}
                            onChange={(e) => setCampaignDescription(e.target.value)}
                            placeholder={language === 'en' ? 'Enter campaign description' : 'कैंपेन विवरण दर्ज करें'}
                          />
                        </div>
                        <div>
                          <Label htmlFor="audience">{currentTexts.targetAudience}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'en' ? 'Select target audience' : 'लक्षित दर्शक चुनें'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">{language === 'en' ? 'All Customers' : 'सभी ग्राहक'}</SelectItem>
                              <SelectItem value="leads">{language === 'en' ? 'Leads Only' : 'केवल लीड्स'}</SelectItem>
                              <SelectItem value="buyers">{language === 'en' ? 'Previous Buyers' : 'पिछले खरीदार'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleCreateCampaign}>{currentTexts.create}</Button>
                          <Button variant="outline" onClick={() => setIsCreateCampaignOpen(false)}>{currentTexts.cancel}</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>{currentTexts.campaigns}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{language === 'en' ? 'New Property Launch Email' : 'नई संपत्ति लॉन्च ईमेल'}</h4>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'Sent to 1,245 contacts' : '1,245 संपर्कों को भेजा गया'}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">{language === 'en' ? 'Active' : 'सक्रिय'}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{language === 'en' ? 'WhatsApp Property Updates' : 'व्हाट्सऐप संपत्ति अपडेट'}</h4>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'Sent to 892 contacts' : '892 संपर्कों को भेजा गया'}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">{language === 'en' ? 'Active' : 'सक्रिय'}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MarketingHub;
