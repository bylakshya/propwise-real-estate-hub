import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Hammer,
  Plus,
  Package2,
  TrendingUp
} from 'lucide-react';

const ConstructionMaterials: React.FC = () => {
  const { toast } = useToast();
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Portland Cement', category: 'Cement', quantity: 500, unit: 'bags', pricePerUnit: 450, supplier: 'ABC Cement Co.', lastOrdered: '2024-01-15', status: 'In Stock' },
    { id: 2, name: 'Steel Rebar 12mm', category: 'Steel', quantity: 200, unit: 'pieces', pricePerUnit: 850, supplier: 'Steel Works Ltd', lastOrdered: '2024-01-12', status: 'Low Stock' },
    { id: 3, name: 'Red Bricks', category: 'Bricks', quantity: 10000, unit: 'pieces', pricePerUnit: 8, supplier: 'Local Brick Kiln', lastOrdered: '2024-01-10', status: 'In Stock' },
    { id: 4, name: 'River Sand', category: 'Sand', quantity: 50, unit: 'tons', pricePerUnit: 1200, supplier: 'Sand Suppliers Inc', lastOrdered: '2024-01-08', status: 'Out of Stock' },
  ]);

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    pricePerUnit: '',
    supplier: ''
  });

  const handleAddMaterial = () => {
    if (!newMaterial.name || !newMaterial.category) {
      toast({
        title: "Error",
        description: "Please fill in material name and category",
        variant: "destructive",
      });
      return;
    }

    const material = {
      id: materials.length + 1,
      name: newMaterial.name,
      category: newMaterial.category,
      quantity: parseInt(newMaterial.quantity) || 0,
      unit: newMaterial.unit,
      pricePerUnit: parseFloat(newMaterial.pricePerUnit) || 0,
      supplier: newMaterial.supplier,
      lastOrdered: new Date().toISOString().split('T')[0],
      status: 'In Stock'
    };

    setMaterials([...materials, material]);
    setNewMaterial({ name: '', category: '', quantity: '', unit: '', pricePerUnit: '', supplier: '' });
    
    toast({
      title: "Success",
      description: "Material added successfully!",
    });
  };

  const handleOrder = (materialId: number) => {
    setMaterials(materials.map(m => 
      m.id === materialId 
        ? { ...m, lastOrdered: new Date().toISOString().split('T')[0], status: 'Ordered' }
        : m
    ));
    
    toast({
      title: "Order Placed",
      description: "Material order has been placed successfully!",
    });
  };

  const handleScheduleOrder = (materialId: number) => {
    toast({
      title: "Order Scheduled",
      description: "Material order has been scheduled for next delivery cycle!",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl mb-2">Construction Materials</h1>
            <p className="text-gray-500">Manage your construction materials and inventory</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="premium-button">
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Material Name"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                />
                <Input
                  placeholder="Category"
                  value={newMaterial.category}
                  onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Quantity"
                    type="number"
                    value={newMaterial.quantity}
                    onChange={(e) => setNewMaterial({...newMaterial, quantity: e.target.value})}
                  />
                  <Input
                    placeholder="Unit (bags, pieces, tons)"
                    value={newMaterial.unit}
                    onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                  />
                </div>
                <Input
                  placeholder="Price per Unit"
                  type="number"
                  value={newMaterial.pricePerUnit}
                  onChange={(e) => setNewMaterial({...newMaterial, pricePerUnit: e.target.value})}
                />
                <Input
                  placeholder="Supplier"
                  value={newMaterial.supplier}
                  onChange={(e) => setNewMaterial({...newMaterial, supplier: e.target.value})}
                />
                <Button onClick={handleAddMaterial} className="w-full">
                  Add Material
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Package2 className="h-5 w-5 text-blue-500" />
                Total Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{materials.length}</div>
              <p className="text-sm text-green-500 mt-2">↑ 12% this month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Avg. Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ₹{Math.round(materials.reduce((sum, m) => sum + m.pricePerUnit, 0) / materials.length)}
              </div>
              <p className="text-sm text-green-500 mt-2">↑ 5.2% vs last month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Hammer className="h-5 w-5 text-orange-500" />
                In Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{materials.filter(m => m.status === 'In Stock').length}</div>
              <p className="text-sm text-orange-500 mt-2">↑ 2.1% vs last month</p>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500 flex items-center gap-2">
                <Package2 className="h-5 w-5 text-purple-500" />
                Out of Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{materials.filter(m => m.status === 'Out of Stock').length}</div>
              <p className="text-sm text-purple-500 mt-2">↑ 23% this week</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Materials Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{material.name}</h3>
                      <Badge variant={material.status === 'In Stock' ? 'default' : material.status === 'Low Stock' ? 'secondary' : 'destructive'}>
                        {material.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>Category: {material.category}</span>
                      <span>Qty: {material.quantity} {material.unit}</span>
                      <span>Price: ₹{material.pricePerUnit}/{material.unit}</span>
                      <span>Supplier: {material.supplier}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-2">Last Ordered: {material.lastOrdered}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOrder(material.id)}
                      >
                        Order Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleScheduleOrder(material.id)}
                      >
                        Schedule Order
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ConstructionMaterials;
