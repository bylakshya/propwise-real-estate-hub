
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, LucideIcon } from 'lucide-react';

interface AIToolCardProps {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  usage: number;
  status: string;
  onLaunch: (id: number) => void;
}

export const AIToolCard: React.FC<AIToolCardProps> = ({
  id,
  name,
  description,
  icon: IconComponent,
  color,
  usage,
  status,
  onLaunch
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-gray-100 dark:bg-gray-800 rounded-lg ${color}`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">{name}</h3>
              <Badge variant={status === 'Active' ? 'default' : 'secondary'}>
                {status}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Usage this month</span>
            <span>{usage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${usage}%` }}
            />
          </div>
        </div>
        <Button 
          className="w-full mt-4" 
          variant="outline"
          onClick={() => onLaunch(id)}
        >
          <Zap className="h-4 w-4 mr-2" />
          Launch Tool
        </Button>
      </CardContent>
    </Card>
  );
};
