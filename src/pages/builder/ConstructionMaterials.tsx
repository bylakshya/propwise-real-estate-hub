
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Hammer, 
  Package, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Plus,
  Filter
} from 'lucide-react';

const ConstructionMaterials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const materials = [
    { 
      id: 1, 
      name: 'Portland Cement', 
      category: 'Cement', 
      stock: 450, 
      unit: 'Bags', 
      pricePerUnit: 12.50, 
      supplier: 'BuildCorp Ltd',
      status: 'In Stock',
      lastOrdered: '2024-01-15',
      minStock: 100
    },
    { 
      id: 2, 
      name: 'Steel Reinforcement Bars', 
      category: 'Steel', 
      stock: 25, 
      unit: 'Tons', 
      pricePerUnit: 850.00, 
      supplier: 'Steel Masters Inc',
      status: 'Low Stock',
      lastOrdered: '2024-01-10',
      minStock: 50
    },
    { 
      id: 3, 
      name: 'Red Clay Bricks', 
      category: 'Bricks', 
      stock: 8500, 
      unit: 'Pieces', 
      pricePerUnit: 0.45, 
      supplier: 'Brick Valley Co',
      status: 'In Stock',
      lastOrdered: '2024-01-12',
      minStock: 5000
    },
    { 
      id: 4, 
      name: 'Concrete Mixer', 
      category: 'Equipment', 
      stock: 3, 
      unit: 'Units', 
      pricePerUnit: 2500.00, 
      supplier: 'EquipRent Pro',
      status: 'Available',
      lastOrdered: '2024-01-08',
      minStock: 2
    },
    { 
      id: 5, 
      name: 'Roofing Tiles', 
      category: 'Roofing', 
      stock: 0, 
      unit: 'Sq Ft', 
      pricePerUnit: 3.25, 
      supplier: 'Roof Masters',
      status: 'Out of Stock',
      lastOrdered: '2024-01-05',
      minStock: 1000
    }
  ];

  const categories = [
    { name: 'Cement', count: 125, value: 45230 },
    { name: 'Steel', count: 89, value: 67890 },
    { name: 'Bricks', count: 234, value: 23450 },
    { name: 'Equipment', count: 45, value: 89340 },
    { name: 'Roofing', count: 67, value: 34560 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
      case 'Available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl mb-2">Construction Materials</h1>
            <p className="text-gray-500">Manage your construction materials inventory</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="premium-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Material
            </Button>
          </div>
        </div>

        {/* Materials Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-500" />
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">560</div>
              <p className="text-sm text-green-500 mt-2">↑ 8% this month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$260,470</div>
              <p className="text-sm text-green-500 mt-2">↑ 15% vs last month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Low Stock Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-orange-500 mt-2">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                Out of Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-sm text-red-500 mt-2">Immediate action needed</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Materials Inventory</CardTitle>
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search materials, categories, suppliers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMaterials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{material.name}</h3>
                          <Badge className={getStatusColor(material.status)}>
                            {material.status}
                          </Badge>
                          {material.stock <= material.minStock && (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>Category: {material.category}</span>
                          <span>Stock: {material.stock.toLocaleString()} {material.unit}</span>
                          <span>Price: ${material.pricePerUnit}</span>
                          <span>Supplier: {material.supplier}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">Last ordered: {material.lastOrdered}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Order</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-500">{category.count} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${category.value.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConstructionMaterials;
