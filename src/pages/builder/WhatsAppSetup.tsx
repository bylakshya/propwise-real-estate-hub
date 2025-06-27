
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Phone, Users, Send, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const WhatsAppSetup: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleConnect = () => {
    if (!phoneNumber || !businessName) {
      toast({
        title: language === 'en' ? 'Missing Information' : 'जानकारी गुम',
        description: language === 'en' 
          ? 'Please fill in all required fields' 
          : 'कृपया सभी आवश्यक फ़ील्ड भरें',
        variant: 'destructive'
      });
      return;
    }

    setIsConnected(true);
    toast({
      title: language === 'en' ? 'WhatsApp Connected!' : 'व्हाट्सऐप जुड़ा!',
      description: language === 'en' 
        ? 'Your WhatsApp Business account has been successfully connected' 
        : 'आपका व्हाट्सऐप बिजनेस अकाउंट सफलतापूर्वक जुड़ गया है',
    });
  };

  const handleSendTestMessage = () => {
    toast({
      title: language === 'en' ? 'Test Message Sent' : 'टेस्ट मैसेज भेजा गया',
      description: language === 'en' 
        ? 'A test message has been sent to your WhatsApp' 
        : 'आपके व्हाट्सऐप पर एक टेस्ट मैसेज भेजा गया है',
    });
  };

  const texts = {
    en: {
      title: 'WhatsApp Business Setup',
      subtitle: 'Connect your WhatsApp Business account to send automated messages to customers',
      connectionStatus: 'Connection Status',
      connected: 'Connected',
      disconnected: 'Disconnected',
      businessDetails: 'Business Details',
      phoneNumber: 'Phone Number',
      businessName: 'Business Name',
      phoneNumberPlaceholder: '+91 9876543210',
      businessNamePlaceholder: 'Your Business Name',
      messageTemplates: 'Message Templates',
      welcomeMessage: 'Welcome Message',
      welcomeMessagePlaceholder: 'Welcome to our real estate service! How can we help you today?',
      features: 'Features',
      autoResponder: 'Auto Responder',
      broadcastMessages: 'Broadcast Messages',
      customerSupport: 'Customer Support',
      leadNotifications: 'Lead Notifications',
      connectWhatsApp: 'Connect WhatsApp',
      sendTestMessage: 'Send Test Message',
      saveSettings: 'Save Settings',
      setupInstructions: 'Setup Instructions',
      step1: '1. Download WhatsApp Business app',
      step2: '2. Verify your business phone number',
      step3: '3. Complete your business profile',
      step4: '4. Connect using the form above'
    },
    hi: {
      title: 'व्हाट्सऐप बिजनेस सेटअप',
      subtitle: 'ग्राहकों को स्वचालित संदेश भेजने के लिए अपना व्हाट्सऐप बिजनेस खाता कनेक्ट करें',
      connectionStatus: 'कनेक्शन स्थिति',
      connected: 'जुड़ा हुआ',
      disconnected: 'डिस्कनेक्टेड',
      businessDetails: 'व्यापार विवरण',
      phoneNumber: 'फोन नंबर',
      businessName: 'व्यापार का नाम',
      phoneNumberPlaceholder: '+91 9876543210',
      businessNamePlaceholder: 'आपके व्यापार का नाम',
      messageTemplates: 'संदेश टेम्प्लेट',
      welcomeMessage: 'स्वागत संदेश',
      welcomeMessagePlaceholder: 'हमारी रियल एस्टेट सेवा में आपका स्वागत है! आज हम आपकी कैसे मदद कर सकते हैं?',
      features: 'सुविधाएं',
      autoResponder: 'ऑटो रेस्पॉन्डर',
      broadcastMessages: 'ब्रॉडकास्ट संदेश',
      customerSupport: 'ग्राहक सहायता',
      leadNotifications: 'लीड नोटिफिकेशन',
      connectWhatsApp: 'व्हाट्सऐप कनेक्ट करें',
      sendTestMessage: 'टेस्ट मैसेज भेजें',
      saveSettings: 'सेटिंग्स सेव करें',
      setupInstructions: 'सेटअप निर्देश',
      step1: '1. व्हाट्सऐप बिजनेस ऐप डाउनलोड करें',
      step2: '2. अपना व्यापारिक फोन नंबर सत्यापित करें',
      step3: '3. अपनी व्यापारिक प्रोफ़ाइल पूरी करें',
      step4: '4. ऊपर दिए गए फॉर्म का उपयोग करके कनेक्ट करें'
    }
  };

  const currentTexts = texts[language];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl mb-2">{currentTexts.title}</h1>
          <p className="text-gray-500">{currentTexts.subtitle}</p>
        </div>

        {/* Connection Status */}
        <Card className="border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              {currentTexts.connectionStatus}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {isConnected ? (
                <>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <Badge className="bg-green-100 text-green-800">{currentTexts.connected}</Badge>
                  <span className="text-sm text-gray-600">
                    {phoneNumber} - {businessName}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {currentTexts.disconnected}
                  </Badge>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Business Setup */}
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                {currentTexts.businessDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">{currentTexts.phoneNumber}</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={currentTexts.phoneNumberPlaceholder}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="business">{currentTexts.businessName}</Label>
                <Input
                  id="business"
                  placeholder={currentTexts.businessNamePlaceholder}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button 
                onClick={handleConnect} 
                className="w-full"
                disabled={isConnected}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {currentTexts.connectWhatsApp}
              </Button>
            </CardContent>
          </Card>

          {/* Message Templates */}
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-purple-600" />
                {currentTexts.messageTemplates}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="welcome">{currentTexts.welcomeMessage}</Label>
                <Textarea
                  id="welcome"
                  placeholder={currentTexts.welcomeMessagePlaceholder}
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleSendTestMessage}
                  disabled={!isConnected}
                  className="flex-1"
                >
                  {currentTexts.sendTestMessage}
                </Button>
                <Button className="flex-1">
                  {currentTexts.saveSettings}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="border shadow-md">
          <CardHeader>
            <CardTitle>{currentTexts.features}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold">{currentTexts.autoResponder}</h4>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold">{currentTexts.broadcastMessages}</h4>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Phone className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold">{currentTexts.customerSupport}</h4>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Send className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold">{currentTexts.leadNotifications}</h4>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card className="border shadow-md">
          <CardHeader>
            <CardTitle>{currentTexts.setupInstructions}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                <span>{currentTexts.step1}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                <span>{currentTexts.step2}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <span>{currentTexts.step3}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                <span>{currentTexts.step4}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WhatsAppSetup;
