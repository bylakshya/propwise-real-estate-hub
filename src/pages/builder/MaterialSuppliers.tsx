
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Search,
  Plus,
  Calendar,
  DollarSign
} from 'lucide-react';

const MaterialSuppliers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const suppliers = [
    {
      id: 1,
      name: 'BuildCorp Ltd',
      category: 'Cement & Concrete',
      contact: 'John Manager',
      phone: '+1-555-0123',
      email: 'orders@buildcorp.com',
      address: '123 Industrial Ave, Construction City',
      rating: 4.8,
      status: 'Active',
      totalOrders: 245,
      totalValue: 125340,
      lastOrder: '2024-01-15',
      paymentTerms: 'Net 30',
      deliveryTime: '2-3 days'
    },
    {
      id: 2,
      name: 'Steel Masters Inc',
      category: 'Steel & Metal',
      contact: 'Sarah Steel',
      phone: '+1-555-0124',
      email: 'sales@steelmasters.com',
      address: '456 Metal District, Steel Town',
      rating: 4.9,
      status: 'Active',
      totalOrders: 189,
      totalValue: 298750,
      lastOrder: '2024-01-12',
      paymentTerms: 'Net 15',
      deliveryTime: '1-2 days'
    },
    {
      id: 3,
      name: 'Brick Valley Co',
      category: 'Bricks & Blocks',
      contact: 'Mike Brick',
      phone: '+1-555-0125',
      email: 'info@brickvalley.com',
      address: '789 Brick Road, Clay City',
      rating: 4.6,
      status: 'Active',
      totalOrders: 167,
      totalValue: 89650,
      lastOrder: '2024-01-10',
      paymentTerms: 'Net 30',
      deliveryTime: '3-5 days'
    },
    {
      id: 4,
      name: 'Roof Masters',
      category: 'Roofing Materials',
      contact: 'Lisa Roof',
      phone: '+1-555-0126',
      email: 'orders@roofmasters.com',
      address: '321 Roof Street, Tile Town',
      rating: 4.3,
      status: 'Pending Review',
      totalOrders: 78,
      totalValue: 45230,
      lastOrder: '2024-01-08',
      paymentTerms: 'COD',
      deliveryTime: '5-7 days'
    },
    {
      id: 5,
      name: 'EquipRent Pro',
      category: 'Equipment Rental',
      contact: 'Tom Equipment',
      phone: '+1-555-0127',
      email: 'rentals@equiprent.com',
      address: '654 Equipment Blvd, Tool City',
      rating: 4.7,
      status: 'Active',
      totalOrders: 134,
      totalValue: 156780,
      lastOrder: '2024-01-14',
      paymentTerms: 'Net 15',
      deliveryTime: 'Same day'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl mb-2">Material Suppliers</h1>
            <p className="text-gray-500">Manage your supplier relationships and orders</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Orders
            </Button>
            <Button className="premium-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </div>
        </div>

        {/* Supplier Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-500" />
                Active Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-sm text-green-500 mt-2">↑ 3 new this month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$715,750</div>
              <p className="text-sm text-green-500 mt-2">↑ 18% vs last month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Avg Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.7</div>
              <p className="text-sm text-gray-500 mt-2">Based on 813 orders</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-sm text-purple-500 mt-2">Awaiting delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Suppliers List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Supplier Directory</CardTitle>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search suppliers, categories, contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSuppliers.map((supplier) => (
                <Card key={supplier.id} className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{supplier.name}</h3>
                        <p className="text-sm text-gray-500">{supplier.category}</p>
                      </div>
                      <Badge className={getStatusColor(supplier.status)}>
                        {supplier.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {renderStars(supplier.rating)}
                      <span className="text-sm text-gray-500 ml-2">{supplier.rating}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{supplier.contact} - {supplier.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{supplier.address}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Total Orders</p>
                        <p className="font-semibold">{supplier.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Value</p>
                        <p className="font-semibold">${supplier.totalValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Payment Terms</p>
                        <p className="font-semibold">{supplier.paymentTerms}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Delivery Time</p>
                        <p className="font-semibold">{supplier.deliveryTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" className="flex-1">
                        Order
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      Last order: {supplier.lastOrder}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MaterialSuppliers;
