
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AIToolCard } from '@/components/ai/AIToolCard';
import { AIChat } from '@/components/ai/AIChat';
import { AIInsights } from '@/components/ai/AIInsights';
import { AIAnalyticsQuery } from '@/components/ai/AIAnalyticsQuery';
import { 
  Brain, 
  BarChart3, 
  TrendingUp,
  Target,
  Search,
  Sparkles,
  Camera,
  FileText,
  Zap
} from 'lucide-react';

const AIFeatures: React.FC = () => {
  const { toast } = useToast();

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
    { id: 1, type: 'user' as const, message: 'What are the market trends for luxury properties in our area?' },
    { id: 2, type: 'ai' as const, message: 'Based on recent data analysis, luxury properties in your area are showing strong growth. Here are the key trends: 1) 23% increase in inquiries for premium plots, 2) Average price appreciation of 12% year-over-year, 3) High demand for properties with modern amenities. Would you like me to generate a detailed market report?' },
    { id: 3, type: 'user' as const, message: 'Yes, please generate a detailed report' },
    { id: 4, type: 'ai' as const, message: 'I\'ll generate a comprehensive market report for you. This will include competitor analysis, pricing recommendations, and demand forecasting. The report will be ready in about 2-3 minutes.' }
  ];

  const handleLaunchTool = (toolId: number) => {
    const tool = aiTools.find(t => t.id === toolId);
    toast({
      title: "Tool Launched",
      description: `${tool?.name} has been launched successfully!`,
    });
  };

  const handleSendMessage = (message: string) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the AI assistant!",
    });
  };

  const handleGenerateAnalysis = (query: string) => {
    toast({
      title: "Analysis Started",
      description: "AI is generating your business analysis. This may take a few moments.",
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "Your AI analysis report has been exported successfully!",
    });
  };

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
          {aiTools.map((tool) => (
            <AIToolCard
              key={tool.id}
              {...tool}
              onLaunch={handleLaunchTool}
            />
          ))}
        </div>

        {/* AI Chat Assistant and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIChat 
            chatHistory={chatHistory}
            onSendMessage={handleSendMessage}
          />
          <AIInsights insights={recentInsights} />
        </div>

        {/* AI Analytics Query */}
        <AIAnalyticsQuery
          onGenerateAnalysis={handleGenerateAnalysis}
          onExportReport={handleExportReport}
        />
      </div>
    </DashboardLayout>
  );
};

export default AIFeatures;
