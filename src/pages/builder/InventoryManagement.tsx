
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Package2, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  BarChart3,
  Search,
  Plus,
  RefreshCw,
  Archive,
  Eye
} from 'lucide-react';

const InventoryManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const inventoryItems = [
    {
      id: 1,
      name: 'Portland Cement',
      sku: 'CEM-001',
      category: 'Cement',
      currentStock: 450,
      minStock: 100,
      maxStock: 1000,
      unitCost: 12.50,
      totalValue: 5625,
      location: 'Warehouse A-1',
      lastUpdated: '2024-01-18',
      status: 'In Stock',
      reorderPoint: 150,
      supplier: 'BuildCorp Ltd'
    },
    {
      id: 2,
      name: 'Steel Reinforcement Bars',
      sku: 'STL-002',
      category: 'Steel',
      currentStock: 25,
      minStock: 50,
      maxStock: 200,
      unitCost: 850.00,
      totalValue: 21250,
      location: 'Warehouse B-2',
      lastUpdated: '2024-01-17',
      status: 'Low Stock',
      reorderPoint: 75,
      supplier: 'Steel Masters Inc'
    },
    {
      id: 3,
      name: 'Red Clay Bricks',
      sku: 'BRK-003',
      category: 'Bricks',
      currentStock: 8500,
      minStock: 5000,
      maxStock: 15000,
      unitCost: 0.45,
      totalValue: 3825,
      location: 'Yard C-1',
      lastUpdated: '2024-01-16',
      status: 'In Stock',
      reorderPoint: 7500,
      supplier: 'Brick Valley Co'
    },
    {
      id: 4,
      name: 'Roofing Tiles',
      sku: 'ROF-004',
      category: 'Roofing',
      currentStock: 0,
      minStock: 1000,
      maxStock: 5000,
      unitCost: 3.25,
      totalValue: 0,
      location: 'Warehouse D-1',
      lastUpdated: '2024-01-15',
      status: 'Out of Stock',
      reorderPoint: 1500,
      supplier: 'Roof Masters'
    },
    {
      id: 5,
      name: 'Paint - Premium White',
      sku: 'PNT-005',
      category: 'Paint',
      currentStock: 120,
      minStock: 50,
      maxStock: 500,
      unitCost: 45.00,
      totalValue: 5400,
      location: 'Warehouse A-3',
      lastUpdated: '2024-01-14',
      status: 'In Stock',
      reorderPoint: 100,
      supplier: 'Color Masters'
    }
  ];

  const categories = ['All', 'Cement', 'Steel', 'Bricks', 'Roofing', 'Paint'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const getStockLevel = (current: number, min: number, reorder: number) => {
    if (current === 0) return 'critical';
    if (current <= min) return 'low';
    if (current <= reorder) return 'warning';
    return 'good';
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.minStock).length;
  const outOfStockItems = inventoryItems.filter(item => item.currentStock === 0).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl mb-2">Inventory Management</h1>
            <p className="text-gray-500">Track and manage your construction materials inventory</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Inventory
            </Button>
            <Button className="premium-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Package2 className="h-5 w-5 text-blue-500" />
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{inventoryItems.length}</div>
              <p className="text-sm text-gray-500 mt-2">Unique SKUs tracked</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-sm text-green-500 mt-2">↑ 12% vs last month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-orange-500" />
                Low Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{lowStockItems}</div>
              <p className="text-sm text-orange-500 mt-2">Items need reordering</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Out of Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{outOfStockItems}</div>
              <p className="text-sm text-red-500 mt-2">Urgent attention needed</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, SKU, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Inventory Items */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const stockLevel = getStockLevel(item.currentStock, item.minStock, item.reorderPoint);
                const stockPercentage = getStockPercentage(item.currentStock, item.maxStock);
                
                return (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          {stockLevel === 'critical' && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          {stockLevel === 'low' && (
                            <TrendingDown className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-2">
                          <span>SKU: {item.sku}</span>
                          <span>Category: {item.category}</span>
                          <span>Location: {item.location}</span>
                          <span>Supplier: {item.supplier}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Last updated: {item.lastUpdated}</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                          <Button size="sm">Order</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Current Stock</p>
                        <p className="font-semibold text-lg">{item.currentStock.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Min Stock</p>
                        <p className="font-semibold">{item.minStock.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Unit Cost</p>
                        <p className="font-semibold">${item.unitCost}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Value</p>
                        <p className="font-semibold">${item.totalValue.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stock Level</span>
                        <span>{item.currentStock} / {item.maxStock}</span>
                      </div>
                      <Progress 
                        value={stockPercentage} 
                        className={`h-2 ${
                          stockLevel === 'critical' ? 'text-red-500' :
                          stockLevel === 'low' ? 'text-orange-500' :
                          stockLevel === 'warning' ? 'text-yellow-500' : 'text-green-500'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InventoryManagement;
