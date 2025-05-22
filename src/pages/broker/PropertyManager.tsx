
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProperties } from '@/data/mockData';
import { Property } from '@/types';

const PropertyManager: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  
  // Get unique areas
  const areas = ['all', ...new Set(mockProperties.map(p => p.area))];
  
  // Filter properties
  const filteredProperties = mockProperties.filter(property => {
    // Filter by type
    if (filter !== 'all' && property.type.toLowerCase() !== filter) {
      return false;
    }
    
    // Filter by area
    if (areaFilter !== 'all' && property.area !== areaFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Property Manager</h1>
            <p className="text-gray-500">Manage your property listings, track customer interest, and follow-ups.</p>
          </div>
          
          <Button className="md:self-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Property
          </Button>
        </div>
        
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Search</label>
                <Input
                  placeholder="Search by title or address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Property Type</label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="plot">Plot</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Area</label>
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area === 'all' ? 'All Areas' : area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Property List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
          
          {filteredProperties.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card className="property-card overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={property.photos[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <span className="px-2 py-1 bg-white/90 text-realestate-primary text-xs rounded-full font-medium">
            {property.purpose}
          </span>
          {property.isHot && (
            <span className="px-2 py-1 bg-realestate-warning/90 text-white text-xs rounded-full font-medium">
              Hot
            </span>
          )}
        </div>
      </div>
      
      <CardContent className="p-4 flex-1">
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
          <p className="text-gray-500 text-sm">{property.address}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm my-3">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Type:</span>
            <span className="font-medium">{property.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Size:</span>
            <span className="font-medium">{property.size} {property.sizeUnit}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Facing:</span>
            <span className="font-medium">{property.facing}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Garden:</span>
            <span className="font-medium">{property.hasGarden ? 'Yes' : 'No'}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
          <span className="font-bold text-lg">${property.price.toLocaleString()}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-realestate-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyManager;
