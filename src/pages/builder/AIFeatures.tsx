
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  MessageSquare, 
  BarChart3, 
  PredictiveText,
  Lightbulb,
  Zap,
  TrendingUp,
  Target,
  Search,
  Sparkles,
  Camera,
  FileText
} from 'lucide-react';

const AIFeatures: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [analysisQuery, setAnalysisQuery] = useState('');

  const aiTools = [
    {
      id: 1,
      name: 'AI Property Advisor',
      description: 'Get intelligent recommendations for property development and pricing strategies',
      icon: Brain,
      color: 'text-blue-500',
      usage: 89,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Smart Market Analysis',
      description: 'AI-powered market trends and competitive analysis for real estate projects',
      icon: BarChart3,
      color: 'text-green-500',
      usage: 76,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Predictive Sales Forecasting',
      description: 'Forecast sales performance and demand using machine learning algorithms',
      icon: TrendingUp,
      color: 'text-purple-500',
      usage: 92,
      status: 'Active'
    },
    {
      id: 4,
      name: 'AI Content Generator',
      description: 'Generate marketing content, property descriptions, and promotional materials',
      icon: FileText,
      color: 'text-orange-500',
      usage: 67,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Image Recognition',
      description: 'Analyze construction progress and quality through AI-powered image analysis',
      icon: Camera,
      color: 'text-indigo-500',
      usage: 54,
      status: 'Beta'
    },
    {
      id: 6,
      name: 'Smart Recommendations',
      description: 'Personalized recommendations for customers based on their preferences and behavior',
      icon: Target,
      color: 'text-pink-500',
      usage: 88,
      status: 'Active'
    }
  ];

  const recentInsights = [
    {
      id: 1,
      title: 'High demand predicted for 2-bedroom units',
      description: 'AI analysis shows 35% increase in demand for 2-bedroom properties in your area for next quarter',
      confidence: 94,
      date: '2024-01-18',
      type: 'Market Trend'
    },
    {
      id: 2,
      title: 'Optimal pricing strategy identified',
      description: 'Suggested 8% price adjustment for premium plots to maximize revenue while maintaining demand',
      confidence: 87,
      date: '2024-01-17',
      type: 'Pricing'
    },
    {
      id: 3,
      title: 'Customer segment analysis complete',
      description: 'Identified 3 key customer segments with personalized marketing recommendations',
      confidence: 91,
      date: '2024-01-16',
      type: 'Customer Analysis'
    }
  ];

  const chatHistory = [
    { id: 1, type: 'user', message: 'What are the market trends for luxury properties in our area?' },
    { id: 2, type: 'ai', message: 'Based on recent data analysis, luxury properties in your area are showing strong growth. Here are the key trends: 1) 23% increase in inquiries for premium plots, 2) Average price appreciation of 12% year-over-year, 3) High demand for properties with modern amenities. Would you like me to generate a detailed market report?' },
    { id: 3, type: 'user', message: 'Yes, please generate a detailed report' },
    { id: 4, type: 'ai', message: 'I\'ll generate a comprehensive market report for you. This will include competitor analysis, pricing recommendations, and demand forecasting. The report will be ready in about 2-3 minutes.' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl mb-2 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-blue-500" />
              AI Features
            </h1>
            <p className="text-gray-500">Leverage artificial intelligence to enhance your real estate business</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              AI Insights
            </Button>
            <Button className="premium-button">
              <Zap className="h-4 w-4 mr-2" />
              Train AI Model
            </Button>
          </div>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-gray-100 dark:bg-gray-800 rounded-lg ${tool.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        <Badge variant={tool.status === 'Active' ? 'default' : 'secondary'}>
                          {tool.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {tool.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Usage this month</span>
                      <span>{tool.usage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${tool.usage}%` }}
                      />
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Chat Assistant and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Chat Assistant */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                AI Business Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                  {chatHistory.map((chat) => (
                    <div key={chat.id} className={`mb-3 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-2 rounded-lg max-w-xs ${
                        chat.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}>
                        <p className="text-sm">{chat.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask AI about your business..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Recent AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInsights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <Badge variant="outline">{insight.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {insight.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Confidence: {insight.confidence}%</span>
                      <span>{insight.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Analytics Query */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              AI-Powered Analytics Query
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Ask complex questions about your business data... e.g., 'Compare sales performance across different property types for the last 6 months and predict next quarter trends'"
                value={analysisQuery}
                onChange={(e) => setAnalysisQuery(e.target.value)}
                rows={3}
              />
              <div className="flex gap-3">
                <Button className="premium-button flex-1">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Analysis
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIFeatures;
