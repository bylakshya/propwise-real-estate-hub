
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

interface Insight {
  id: number;
  title: string;
  description: string;
  confidence: number;
  date: string;
  type: string;
}

interface AIInsightsProps {
  insights: Insight[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Recent AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
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
  );
};
