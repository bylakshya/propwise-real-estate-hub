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
import { Plus, Upload, MapPin, X, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import MapInput from '@/components/ui/MapInput';

interface CreateProjectDialogProps {
  onProjectCreated?: () => void;
}

interface TowerDetail {
  name: string;
  floors: number;
  flats: number;
}

export const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({ onProjectCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    project_type: '' as ProjectType,
    location: '',
    latitude: null as number | null,
    longitude: null as number | null,
    size_options: '',
    price_range_min: '',
    price_range_max: '',
    project_status: 'pre_launch' as ProjectStatus,
    apartment_type: '',
    total_towers: '',
    tower_details: [] as TowerDetail[],
    total_commercial_units: ''
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

  const apartmentTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'res-comm', label: 'Residential-Commercial' },
  ];

  const handleInputChange = (field: string, value: string | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData(prev => ({
      ...prev,
      location: location.address,
      latitude: location.lat,
      longitude: location.lng
    }));
  };

  const handleTowerDetailsChange = (towers: number) => {
    const newTowerDetails: TowerDetail[] = Array.from({ length: towers }, (_, i) => ({
      name: formData.tower_details[i]?.name || `Tower ${i + 1}`,
      floors: formData.tower_details[i]?.floors || 0,
      flats: formData.tower_details[i]?.flats || 0
    }));
    
    setFormData(prev => ({ ...prev, tower_details: newTowerDetails }));
  };

  const updateTowerDetail = (index: number, field: keyof TowerDetail, value: string | number) => {
    const newTowerDetails = [...formData.tower_details];
    newTowerDetails[index] = { ...newTowerDetails[index], [field]: value };
    setFormData(prev => ({ ...prev, tower_details: newTowerDetails }));
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-photos')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading photo:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('project-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.project_type || !formData.location) {
      toast({
        title: t('error'),
        description: 'Please fill all required fields',
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
          description: 'You must be logged in to create a project',
          variant: 'destructive',
        });
        return;
      }

      // Upload photo if provided
      let photoUrl = null;
      if (coverPhoto) {
        photoUrl = await uploadPhoto(coverPhoto);
      }

      const projectData = {
        name: formData.name,
        description: formData.description,
        project_type: formData.project_type,
        cover_photo: photoUrl,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        size_options: formData.size_options ? formData.size_options.split(',').map(s => parseInt(s.trim())) : null,
        price_range_min: formData.price_range_min ? parseFloat(formData.price_range_min) : null,
        price_range_max: formData.price_range_max ? parseFloat(formData.price_range_max) : null,
        project_status: formData.project_status,
        apartment_type: formData.project_type === 'apartment' && formData.apartment_type ? formData.apartment_type : null,
        total_towers: formData.project_type === 'apartment' && formData.total_towers ? parseInt(formData.total_towers) || null : null,
        tower_details: formData.project_type === 'apartment' && formData.tower_details.length > 0 ? JSON.stringify(formData.tower_details) : null,
        total_commercial_units: formData.apartment_type === 'res-comm' && formData.total_commercial_units ? parseInt(formData.total_commercial_units) || null : null,
        created_by: user.id,
      } as any;

      const { error } = await supabase.from('projects').insert([projectData]);

      if (error) throw error;

      toast({
        title: t('success'),
        description: 'Project created successfully!',
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        project_type: '' as ProjectType,
        location: '',
        latitude: null,
        longitude: null,
        size_options: '',
        price_range_min: '',
        price_range_max: '',
        project_status: 'pre_launch' as ProjectStatus,
        apartment_type: '',
        total_towers: '',
        tower_details: [],
        total_commercial_units: ''
      });
      setCoverPhoto(null);
      setPhotoPreview('');
      setIsOpen(false);
      onProjectCreated?.();

    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: t('error'),
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      project_type: '' as ProjectType,
      location: '',
      latitude: null,
      longitude: null,
      size_options: '',
      price_range_min: '',
      price_range_max: '',
      project_status: 'pre_launch' as ProjectStatus,
      apartment_type: '',
      total_towers: '',
      tower_details: [],
      total_commercial_units: ''
    });
    setCoverPhoto(null);
    setPhotoPreview('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={resetForm}>
          <Plus className="mr-2 h-4 w-4" />
          {t('createProject')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            {t('createNewProject')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_type">Project Type *</Label>
                  <Select
                    value={formData.project_type}
                    onValueChange={(value) => handleInputChange('project_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter project description"
                  rows={3}
                  required
                />
              </div>

              {/* Cover Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="cover_photo">Cover Photo *</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      id="cover_photo"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Label htmlFor="cover_photo" className="cursor-pointer">
                      <div className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span>{coverPhoto ? coverPhoto.name : 'Click to upload cover photo'}</span>
                      </div>
                    </Label>
                  </div>
                  {photoPreview && (
                    <div className="relative">
                      <img src={photoPreview} alt="Preview" className="h-20 w-20 object-cover rounded-lg" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() => {
                          setCoverPhoto(null);
                          setPhotoPreview('');
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Status</Label>
                  <Select
                    value={formData.project_status}
                    onValueChange={(value) => handleInputChange('project_status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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

                <div className="space-y-2">
                  <Label htmlFor="size_options">Size Options (sq ft)</Label>
                  <Input
                    id="size_options"
                    value={formData.size_options}
                    onChange={(e) => handleInputChange('size_options', e.target.value)}
                    placeholder="e.g., 800, 1000, 1200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price_min">Minimum Price (₹)</Label>
                  <Input
                    id="price_min"
                    type="number"
                    value={formData.price_range_min}
                    onChange={(e) => handleInputChange('price_range_min', e.target.value)}
                    placeholder="Enter minimum price"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price_max">Maximum Price (₹)</Label>
                  <Input
                    id="price_max"
                    type="number"
                    value={formData.price_range_max}
                    onChange={(e) => handleInputChange('price_range_max', e.target.value)}
                    placeholder="Enter maximum price"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Map */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location & Map *
              </h3>
              <MapInput onLocationSelect={handleLocationSelect} />
              {formData.location && (
                <div className="mt-2 p-2 bg-muted rounded text-sm">
                  <strong>Selected Location:</strong> {formData.location}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project Type Specific Fields */}
          {formData.project_type === 'apartment' && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Apartment Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Apartment Type</Label>
                    <Select
                      value={formData.apartment_type}
                      onValueChange={(value) => handleInputChange('apartment_type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select apartment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {apartmentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total_towers">Total Towers</Label>
                    <Input
                      id="total_towers"
                      type="number"
                      value={formData.total_towers}
                      onChange={(e) => {
                        const towers = parseInt(e.target.value) || 0;
                        handleInputChange('total_towers', e.target.value);
                        if (towers > 0) {
                          handleTowerDetailsChange(towers);
                        }
                      }}
                      placeholder="Enter number of towers"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                {formData.apartment_type === 'res-comm' && (
                  <div className="space-y-2">
                    <Label htmlFor="commercial_units">Total Commercial Units</Label>
                    <Input
                      id="commercial_units"
                      type="number"
                      value={formData.total_commercial_units}
                      onChange={(e) => handleInputChange('total_commercial_units', e.target.value)}
                      placeholder="Enter number of commercial units"
                    />
                  </div>
                )}

                {/* Tower Details */}
                {formData.tower_details.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Tower Details</h4>
                    <div className="grid gap-4">
                      {formData.tower_details.map((tower, index) => (
                        <Card key={index} className="p-4">
                          <h5 className="font-medium mb-3">Tower {index + 1}</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Tower Name</Label>
                              <Input
                                value={tower.name}
                                onChange={(e) => updateTowerDetail(index, 'name', e.target.value)}
                                placeholder={`Tower ${index + 1}`}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Total Floors</Label>
                              <Input
                                type="number"
                                value={tower.floors}
                                onChange={(e) => updateTowerDetail(index, 'floors', parseInt(e.target.value) || 0)}
                                placeholder="Number of floors"
                                min="1"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Flats per Floor</Label>
                              <Input
                                type="number"
                                value={tower.flats}
                                onChange={(e) => updateTowerDetail(index, 'flats', parseInt(e.target.value) || 0)}
                                placeholder="Flats per floor"
                                min="1"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};