
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SubscriptionPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState<'Basic' | 'Premium' | 'Enterprise'>('Basic');

  const plans = [
    {
      name: 'Basic',
      price: '₹999',
      period: language === 'en' ? '/month' : '/महीना',
      icon: Star,
      features: language === 'en' ? [
        'Up to 5 Projects',
        'Basic Customer Management',
        'Standard Reports',
        'Email Support'
      ] : [
        '5 तक प्रोजेक्ट',
        'बेसिक कस्टमर मैनेजमेंट',
        'स्टैंडर्ड रिपोर्ट्स',
        'ईमेल सपोर्ट'
      ]
    },
    {
      name: 'Premium',
      price: '₹1,999',
      period: language === 'en' ? '/month' : '/महीना',
      icon: Crown,
      popular: true,
      features: language === 'en' ? [
        'Unlimited Projects',
        'Advanced Analytics',
        'WhatsApp Integration',
        'AI Features',
        'Priority Support',
        'Custom Reports'
      ] : [
        'असीमित प्रोजेक्ट',
        'एडवांस्ड एनालिटिक्स',
        'व्हाट्सऐप एकीकरण',
        'AI फीचर्स',
        'प्राथमिकता सहायता',
        'कस्टम रिपोर्ट्स'
      ]
    },
    {
      name: 'Enterprise',
      price: '₹4,999',
      period: language === 'en' ? '/month' : '/महीना',
      icon: Zap,
      features: language === 'en' ? [
        'Everything in Premium',
        'Multi-user Access',
        'Advanced Security',
        'Custom Integrations',
        'Dedicated Support',
        'Training Sessions'
      ] : [
        'प्रीमियम में सब कुछ',
        'मल्टी-यूजर एक्सेस',
        'एडवांस्ड सिक्यूरिटी',
        'कस्टम इंटीग्रेशन',
        'डेडिकेटेड सपोर्ट',
        'ट्रेनिंग सेशन'
      ]
    }
  ];

  const handleSubscribe = (planName: string) => {
    toast({
      title: language === 'en' ? 'Subscription Updated' : 'सब्सक्रिप्शन अपडेट किया गया',
      description: language === 'en' 
        ? `You have selected the ${planName} plan` 
        : `आपने ${planName} प्लान चुना है`,
    });
    setCurrentPlan(planName as 'Basic' | 'Premium' | 'Enterprise');
  };

  const handleManageSubscription = () => {
    toast({
      title: language === 'en' ? 'Manage Subscription' : 'सब्सक्रिप्शन प्रबंधित करें',
      description: language === 'en' 
        ? 'Redirecting to billing portal...' 
        : 'बिलिंग पोर्टल पर रीडायरेक्ट कर रहे हैं...',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="font-bold text-3xl mb-2">
            {language === 'en' ? 'Choose Your Plan' : 'अपना प्लान चुनें'}
          </h1>
          <p className="text-gray-500">
            {language === 'en' 
              ? 'Select the perfect plan for your real estate business' 
              : 'अपने रियल एस्टेट बिजनेस के लिए सही प्लान चुनें'}
          </p>
        </div>

        {/* Current Plan Status */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? 'Current Plan' : 'वर्तमान प्लान'}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {currentPlan}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {language === 'en' ? 'Active until March 2024' : 'मार्च 2024 तक सक्रिय'}
                  </span>
                </div>
              </div>
              <Button variant="outline" onClick={handleManageSubscription}>
                {language === 'en' ? 'Manage Subscription' : 'सब्सक्रिप्शन प्रबंधित करें'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isCurrentPlan = plan.name === currentPlan;
            
            return (
              <Card 
                key={plan.name} 
                className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''} ${isCurrentPlan ? 'bg-blue-50 border-blue-300' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">
                      {language === 'en' ? 'Most Popular' : 'सबसे लोकप्रिय'}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="text-3xl font-bold">{plan.price}</div>
                    <div className="text-sm text-gray-500">{plan.period}</div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${isCurrentPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan 
                      ? (language === 'en' ? 'Current Plan' : 'वर्तमान प्लान')
                      : (language === 'en' ? 'Subscribe Now' : 'अभी सब्सक्राइब करें')
                    }
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Can I change my plan anytime?' : 'क्या मैं कभी भी अपना प्लान बदल सकता हूं?'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
                  : 'हां, आप कभी भी अपना प्लान अपग्रेड या डाउनग्रेड कर सकते हैं। बदलाव आपके अगले बिलिंग साइकल में दिखेंगे।'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Is there a free trial?' : 'क्या कोई फ्री ट्रायल है?'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Yes, all plans come with a 14-day free trial. No credit card required to start.'
                  : 'हां, सभी प्लान के साथ 14 दिन का फ्री ट्रायल आता है। शुरू करने के लिए क्रेडिट कार्ड की जरूरत नहीं।'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
