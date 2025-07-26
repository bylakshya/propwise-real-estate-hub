import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ProjectType, ProjectStatus } from '@/types/project';
import { Plus, Upload, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CreateProjectDialogProps {
  onProjectCreated?: () => void;
}

export const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({ onProjectCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    project_type: '' as ProjectType,
    cover_photo: '',
    location: '',
    latitude: '',
    longitude: '',
    size_options: '',
    price_range_min: '',
    price_range_max: '',
    project_status: 'pre_launch' as ProjectStatus,
  });

  const { toast } = useToast();
  const { t } = useLanguage();

  const projectTypes = [
    { value: 'colony', label: t('colony') },
    { value: 'apartment', label: t('apartment') },
    { value: 'villa', label: t('villa') },
    { value: 'farmhouse', label: t('farmhouse') },
    { value: 'commercial', label: t('commercial') },
  ];

  const projectStatuses = [
    { value: 'pre_launch', label: t('preLaunch') },
    { value: 'booking_open', label: t('bookingOpen') },
    { value: 'under_construction', label: t('underConstruction') },
    { value: 'possession', label: t('possession') },
    { value: 'completed', label: t('completed') },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.project_type || !formData.location) {
      toast({
        title: t('error'),
        description: t('pleaseAllRequired'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: t('error'),
          description: t('mustLogin'),
          variant: 'destructive',
        });
        return;
      }

      const projectData = {
        name: formData.name,
        description: formData.description,
        project_type: formData.project_type,
        cover_photo: formData.cover_photo || null,
        location: formData.location,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        size_options: formData.size_options ? formData.size_options.split(',').map(s => parseInt(s.trim())) : null,
        price_range_min: formData.price_range_min ? parseFloat(formData.price_range_min) : null,
        price_range_max: formData.price_range_max ? parseFloat(formData.price_range_max) : null,
        project_status: formData.project_status,
        created_by: user.id,
      };

      const { error } = await supabase.from('projects').insert([projectData]);

      if (error) throw error;

      toast({
        title: t('success'),
        description: t('projectCreated'),
      });

      setFormData({
        name: '',
        description: '',
        project_type: '' as ProjectType,
        cover_photo: '',
        location: '',
        latitude: '',
        longitude: '',
        size_options: '',
        price_range_min: '',
        price_range_max: '',
        project_status: 'pre_launch' as ProjectStatus,
      });
      
      setIsOpen(false);
      onProjectCreated?.();
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: t('error'),
        description: t('errorCreatingProject'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t('createNewProject')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('createNewProject')}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-lg">{t('basicInformation')}</h3>
                
                <div>
                  <Label htmlFor="name">{t('projectName')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={t('enterProjectName')}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">{t('description')} *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder={t('enterDescription')}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="project_type">{t('projectType')} *</Label>
                  <Select value={formData.project_type} onValueChange={(value) => handleInputChange('project_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectProjectType')} />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="project_status">{t('projectStatus')} *</Label>
                  <Select value={formData.project_status} onValueChange={(value) => handleInputChange('project_status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectProjectStatus')} />
                    </SelectTrigger>
                    <SelectContent>
                      {projectStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Location & Media */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-lg">{t('locationMedia')}</h3>
                
                <div>
                  <Label htmlFor="location">{t('location')} *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder={t('enterLocation')}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">{t('latitude')}</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={(e) => handleInputChange('latitude', e.target.value)}
                      placeholder="0.0000000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude">{t('longitude')}</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={(e) => handleInputChange('longitude', e.target.value)}
                      placeholder="0.0000000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cover_photo">{t('coverPhoto')}</Label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cover_photo"
                      value={formData.cover_photo}
                      onChange={(e) => handleInputChange('cover_photo', e.target.value)}
                      placeholder={t('imageUrl')}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Options */}
            <Card className="md:col-span-2">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-lg">{t('pricingOptions')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="size_options">{t('sizeOptions')} ({t('sqft')})</Label>
                    <Input
                      id="size_options"
                      value={formData.size_options}
                      onChange={(e) => handleInputChange('size_options', e.target.value)}
                      placeholder="800, 1000, 1200"
                    />
                    <p className="text-sm text-muted-foreground mt-1">{t('commaSeparated')}</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="price_range_min">{t('minPrice')} (₹)</Label>
                    <Input
                      id="price_range_min"
                      type="number"
                      value={formData.price_range_min}
                      onChange={(e) => handleInputChange('price_range_min', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="price_range_max">{t('maxPrice')} (₹)</Label>
                    <Input
                      id="price_range_max"
                      type="number"
                      value={formData.price_range_max}
                      onChange={(e) => handleInputChange('price_range_max', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t('creating') : t('createProject')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};