
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BarChart3, FileText } from 'lucide-react';

interface AIAnalyticsQueryProps {
  onGenerateAnalysis: (query: string) => void;
  onExportReport: () => void;
}

export const AIAnalyticsQuery: React.FC<AIAnalyticsQueryProps> = ({
  onGenerateAnalysis,
  onExportReport
}) => {
  const [analysisQuery, setAnalysisQuery] = useState('');

  const handleGenerateAnalysis = () => {
    if (analysisQuery.trim()) {
      onGenerateAnalysis(analysisQuery);
    }
  };

  return (
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
            <Button 
              className="premium-button flex-1"
              onClick={handleGenerateAnalysis}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Analysis
            </Button>
            <Button variant="outline" onClick={onExportReport}>
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
