import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RealEstateProject } from '@/types/project';
import { MapPin, Calendar, Building, Eye, Edit, Share } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectCardProps {
  project: RealEstateProject;
  onViewDetails: (projectId: string) => void;
  onEdit?: (projectId: string) => void;
  onShare?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails,
  onEdit,
  onShare,
}) => {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pre_launch':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'booking_open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'under_construction':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'possession':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'colony':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'apartment':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'villa':
        return 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200';
      case 'farmhouse':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'commercial':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatPrice = (min?: number, max?: number) => {
    if (!min && !max) return t('priceOnRequest');
    if (min && max) return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    if (min) return `₹${(min / 100000).toFixed(1)}L+`;
    if (max) return `${t('upTo')} ₹${(max / 100000).toFixed(1)}L`;
    return t('priceOnRequest');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      {project.cover_photo && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={project.cover_photo}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge className={getTypeColor(project.project_type)}>
              {t(project.project_type)}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className={getStatusColor(project.project_status)}>
              {t(project.project_status.replace('_', ''))}
            </Badge>
          </div>
        </div>
      )}
      
      <CardContent className="flex-1 p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{project.location}</span>
          </div>

          {!project.cover_photo && (
            <div className="flex gap-2">
              <Badge className={getTypeColor(project.project_type)}>
                {t(project.project_type)}
              </Badge>
              <Badge className={getStatusColor(project.project_status)}>
                {t(project.project_status.replace('_', ''))}
              </Badge>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{t('priceRange')}</span>
              <span className="text-sm font-semibold text-primary">
                {formatPrice(project.price_range_min, project.price_range_max)}
              </span>
            </div>

            {project.size_options && project.size_options.length > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{t('sizes')}</span>
                <span className="text-sm text-muted-foreground">
                  {project.size_options.join(', ')} {t('sqft')}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{t('updated')}: {formatDate(project.updated_at)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onViewDetails(project.id)}
          >
            <Eye className="h-4 w-4" />
            {t('viewDetails')}
          </Button>
          
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(project.id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          
          {onShare && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare(project.id)}
            >
              <Share className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};