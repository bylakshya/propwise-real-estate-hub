import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProjects } from '@/data/mockData';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Download, ChartBar, CalendarClock, TrendingUp, Filter, ChartPie } from 'lucide-react';

const StatsAnalysis: React.FC = () => {
  const [timeframe, setTimeframe] = useState('yearly');
  const [projectFilter, setProjectFilter] = useState('all');
  
  // Generate stats data from mock projects
  const generateSalesData = () => {
    // Monthly data points
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    // Calculate total sales by month
    const monthlySales = months.map(month => {
      const randomValue = Math.floor(Math.random() * 8000000) + 2000000;
      return {
        name: month,
        sales: randomValue,
        target: randomValue * (Math.random() * 0.4 + 0.8), // 80-120% of sales as target
      };
    });
    
    // Create quarterly data
    const quarterlySales = [
      {
        name: 'Q1',
        sales: monthlySales.slice(0, 3).reduce((sum, month) => sum + month.sales, 0),
        target: monthlySales.slice(0, 3).reduce((sum, month) => sum + month.target, 0),
      },
      {
        name: 'Q2',
        sales: monthlySales.slice(3, 6).reduce((sum, month) => sum + month.sales, 0),
        target: monthlySales.slice(3, 6).reduce((sum, month) => sum + month.target, 0),
      },
      {
        name: 'Q3',
        sales: monthlySales.slice(6, 9).reduce((sum, month) => sum + month.sales, 0),
        target: monthlySales.slice(6, 9).reduce((sum, month) => sum + month.target, 0),
      },
      {
        name: 'Q4',
        sales: monthlySales.slice(9, 12).reduce((sum, month) => sum + month.sales, 0),
        target: monthlySales.slice(9, 12).reduce((sum, month) => sum + month.target, 0),
      },
    ];
    
    // Create yearly data (total of all months)
    const yearlySales = {
      name: '2023',
      sales: monthlySales.reduce((sum, month) => sum + month.sales, 0),
      target: monthlySales.reduce((sum, month) => sum + month.target, 0),
    };
    
    return { monthlySales, quarterlySales, yearlySales };
  };
  
  const generateProjectPerformanceData = () => {
    return mockProjects.map(project => {
      const totalPlots = project.plots.length;
      const soldPlots = project.plots.filter(plot => plot.status === 'Sold').length;
      const reservedPlots = project.plots.filter(plot => plot.status === 'Reserved').length;
      const availablePlots = project.plots.filter(plot => plot.status === 'Available').length;
      
      return {
        name: project.name,
        sold: soldPlots,
        reserved: reservedPlots,
        available: availablePlots,
        total: totalPlots,
        revenue: project.plots.filter(plot => plot.status === 'Sold').reduce((sum, plot) => sum + plot.price, 0),
        salesRate: (soldPlots / totalPlots) * 100 // Sales rate as percentage
      };
    });
  };
  
  const generateFinancialTrendsData = () => {
    // Create financial trend data with slight increase each month
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    let lastRevenue = 5000000; // Starting revenue
    let lastExpense = 3500000; // Starting expense
    let lastProfit = lastRevenue - lastExpense;
    
    return months.map((month, index) => {
      // Add some randomness with general upward trend
      const revenueGrowth = Math.random() * 0.15 + (index < 6 ? 0.02 : 0.05); // higher growth in second half
      const expenseGrowth = Math.random() * 0.08 + 0.02;
      
      lastRevenue = lastRevenue * (1 + revenueGrowth);
      lastExpense = lastExpense * (1 + expenseGrowth);
      lastProfit = lastRevenue - lastExpense;
      
      return {
        name: month,
        revenue: Math.round(lastRevenue),
        expenses: Math.round(lastExpense),
        profit: Math.round(lastProfit)
      };
    });
  };
  
  const generateInventoryData = () => {
    // Summarize inventory status
    const totalPlots = mockProjects.reduce((sum, project) => sum + project.plots.length, 0);
    const soldPlots = mockProjects.reduce(
      (sum, project) => sum + project.plots.filter(plot => plot.status === 'Sold').length,
      0
    );
    const reservedPlots = mockProjects.reduce(
      (sum, project) => sum + project.plots.filter(plot => plot.status === 'Reserved').length,
      0
    );
    const availablePlots = mockProjects.reduce(
      (sum, project) => sum + project.plots.filter(plot => plot.status === 'Available').length,
      0
    );
    
    return [
      { name: 'Sold', value: soldPlots },
      { name: 'Reserved', value: reservedPlots },
      { name: 'Available', value: availablePlots },
    ];
  };
  
  const generateSalesVelocityData = () => {
    // Simulate sales velocity (plots sold per month) over time
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return months.map(month => ({
      name: month,
      velocity: Math.floor(Math.random() * 10) + 5, // 5-15 plots per month
    }));
  };
  
  // Generate all the data
  const { monthlySales, quarterlySales, yearlySales } = generateSalesData();
  const projectPerformance = generateProjectPerformanceData();
  const financialTrends = generateFinancialTrendsData();
  const inventoryData = generateInventoryData();
  const salesVelocity = generateSalesVelocityData();
  
  // Filtered data based on selected project
  const filteredProjectData = projectFilter === 'all' 
    ? projectPerformance 
    : projectPerformance.filter(project => project.name === projectFilter);
  
  // Get sales data based on selected timeframe
  const getSalesDataByTimeframe = () => {
    switch(timeframe) {
      case 'monthly':
        return monthlySales;
      case 'quarterly':
        return quarterlySales;
      case 'yearly':
        return [yearlySales];
      default:
        return monthlySales;
    }
  };
  
  const salesData = getSalesDataByTimeframe();
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) { // 1 crore or more
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) { // 1 lakh or more
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };
  
  // Calculate summary metrics
  const totalSales = yearlySales.sales;
  const totalTarget = yearlySales.target;
  const achievementPercentage = (totalSales / totalTarget) * 100;
  
  const totalRevenue = financialTrends.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = financialTrends.reduce((sum, month) => sum + month.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = (totalProfit / totalRevenue) * 100;
  
  const inventoryTotal = inventoryData.reduce((sum, item) => sum + item.value, 0);
  const soldPercentage = (inventoryData[0].value / inventoryTotal) * 100;
  
  // Colors for charts
  const barColors = {
    sales: '#3b82f6', // blue
    target: '#cbd5e1', // gray
    sold: '#22c55e', // green
    reserved: '#f59e0b', // amber
    available: '#94a3b8', // slate
    revenue: '#3b82f6', // blue
    expenses: '#ef4444', // red
    profit: '#16a34a', // green
  };
  
  const pieColors = ['#22c55e', '#f59e0b', '#94a3b8']; // green, amber, slate
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Stats & Analysis</h1>
            <p className="text-gray-500">Comprehensive analytics and insights for your real estate business</p>
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalSales)}</div>
              <div className="flex items-center mt-2">
                <div className="text-sm text-gray-500">vs Target: {formatCurrency(totalTarget)}</div>
                <div className={`ml-2 text-sm font-medium ${achievementPercentage >= 100 ? 'text-green-600' : 'text-amber-600'}`}>
                  ({achievementPercentage.toFixed(1)}%)
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{profitMargin.toFixed(1)}%</div>
              <div className="flex items-center mt-2">
                <div className="text-sm text-gray-500">
                  Profit: {formatCurrency(totalProfit)}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Sales Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{soldPercentage.toFixed(1)}%</div>
              <div className="flex items-center mt-2">
                <div className="text-sm text-gray-500">
                  {inventoryData[0].value} of {inventoryTotal} plots sold
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Avg. Sales Velocity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {(salesVelocity.reduce((sum, month) => sum + month.velocity, 0) / salesVelocity.length).toFixed(1)}
              </div>
              <div className="flex items-center mt-2">
                <div className="text-sm text-gray-500">
                  Plots sold per month
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Controls for filtering and timeframe */}
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Filter by project" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {mockProjects.map(project => (
                <SelectItem key={project.id} value={project.name}>{project.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="bg-gray-100 rounded-md p-1 flex">
            <Button 
              variant={timeframe === 'monthly' ? "default" : "ghost"} 
              className="flex-1"
              onClick={() => setTimeframe('monthly')}
            >
              Monthly
            </Button>
            <Button 
              variant={timeframe === 'quarterly' ? "default" : "ghost"} 
              className="flex-1"
              onClick={() => setTimeframe('quarterly')}
            >
              Quarterly
            </Button>
            <Button 
              variant={timeframe === 'yearly' ? "default" : "ghost"} 
              className="flex-1"
              onClick={() => setTimeframe('yearly')}
            >
              Yearly
            </Button>
          </div>
        </div>
        
        {/* Main Analytics Tabs */}
        <Tabs defaultValue="sales" className="bg-white rounded-lg shadow-sm border p-1">
          <TabsList className="grid grid-cols-4 w-full mb-4">
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span>Sales</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Project Performance</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              <span>Financial Trends</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <ChartPie className="h-4 w-4" />
              <span>Inventory Analysis</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Sales Tab */}
          <TabsContent value="sales">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle>Sales vs Targets</CardTitle>
                <CardDescription>
                  Comparing actual sales against targets for the selected time period
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => {
                          if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
                          if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
                          return value;
                        }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), ""]}
                        labelFormatter={(label) => `Period: ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill={barColors.sales} name="Sales" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill={barColors.target} name="Target" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Sales Velocity</CardTitle>
                      <CardDescription>Number of plots sold per month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={salesVelocity} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="velocity" stroke="#8884d8" fill="#8884d8" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Revenue Distribution</CardTitle>
                      <CardDescription>Revenue distribution by project</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={projectPerformance}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="revenue"
                              nameKey="name"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {projectPerformance.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`hsl(${index * 40}, 70%, 50%)`} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [formatCurrency(value), "Revenue"]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Project Performance Tab */}
          <TabsContent value="performance">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle>Project Performance Analysis</CardTitle>
                <CardDescription>
                  Detailed analysis of sales performance across different projects
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredProjectData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        yAxisId="left" 
                        orientation="left" 
                        label={{ value: 'Number of Plots', angle: -90, position: 'insideLeft' }}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        label={{ value: 'Sales Rate (%)', angle: 90, position: 'insideRight' }}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="sold" stackId="plots" fill={barColors.sold} name="Sold" />
                      <Bar yAxisId="left" dataKey="reserved" stackId="plots" fill={barColors.reserved} name="Reserved" />
                      <Bar yAxisId="left" dataKey="available" stackId="plots" fill={barColors.available} name="Available" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Project Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredProjectData.map((project) => (
                      <Card key={project.name}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <span className="text-gray-500">Total Revenue:</span>
                              <span className="font-medium">{formatCurrency(project.revenue)}</span>
                              
                              <span className="text-gray-500">Total Plots:</span>
                              <span className="font-medium">{project.total}</span>
                              
                              <span className="text-gray-500">Sold:</span>
                              <span className="font-medium text-green-600">{project.sold} ({(project.sold / project.total * 100).toFixed(1)}%)</span>
                              
                              <span className="text-gray-500">Reserved:</span>
                              <span className="font-medium text-amber-600">{project.reserved} ({(project.reserved / project.total * 100).toFixed(1)}%)</span>
                              
                              <span className="text-gray-500">Available:</span>
                              <span className="font-medium">{project.available} ({(project.available / project.total * 100).toFixed(1)}%)</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Financial Trends Tab */}
          <TabsContent value="financial">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle>Financial Trends</CardTitle>
                <CardDescription>
                  Monthly financial performance tracking with revenue, expenses, and profit
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => {
                          if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
                          if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
                          return value;
                        }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), ""]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="revenue" fill={barColors.revenue} name="Revenue" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill={barColors.expenses} name="Expenses" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="profit" fill={barColors.profit} name="Profit" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</div>
                      <div className="mt-2 text-sm text-gray-500">Annual revenue from all projects</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Total Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</div>
                      <div className="mt-2 text-sm text-gray-500">Annual expenses across operations</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Net Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{formatCurrency(totalProfit)}</div>
                      <div className="mt-2 text-sm text-gray-500">
                        Profit Margin: <span className="font-medium">{profitMargin.toFixed(1)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Inventory Analysis Tab */}
          <TabsContent value="inventory">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle>Inventory Analysis</CardTitle>
                <CardDescription>
                  Status and distribution of your property inventory across all projects
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={inventoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {inventoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex flex-col justify-center space-y-6">
                    <Card className="border shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-medium">Total Inventory</div>
                            <div className="text-3xl font-bold">{inventoryTotal} Plots</div>
                          </div>
                          <ChartPie className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 bg-green-50 rounded-md">
                            <div className="text-sm text-gray-600">Sold</div>
                            <div className="font-semibold text-green-600">{inventoryData[0].value}</div>
                          </div>
                          <div className="p-2 bg-amber-50 rounded-md">
                            <div className="text-sm text-gray-600">Reserved</div>
                            <div className="font-semibold text-amber-600">{inventoryData[1].value}</div>
                          </div>
                          <div className="p-2 bg-slate-50 rounded-md">
                            <div className="text-sm text-gray-600">Available</div>
                            <div className="font-semibold text-slate-600">{inventoryData[2].value}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Inventory Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Sales Completion</span>
                              <span className="text-sm font-medium">{soldPercentage.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${soldPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Reserved Plots</span>
                              <span className="text-sm font-medium">{(inventoryData[1].value / inventoryTotal * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-amber-500 h-2 rounded-full" 
                                style={{ width: `${inventoryData[1].value / inventoryTotal * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Available Plots</span>
                              <span className="text-sm font-medium">{(inventoryData[2].value / inventoryTotal * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-slate-400 h-2 rounded-full" 
                                style={{ width: `${inventoryData[2].value / inventoryTotal * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Project-Wise Inventory</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectPerformance.map((project) => (
                      <Card key={project.name} className="overflow-hidden">
                        <CardHeader className="pb-2 bg-gray-50 border-b">
                          <CardTitle className="text-base">{project.name}</CardTitle>
                          <CardDescription>{project.total} Total Plots</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Sold</span>
                                <span className="text-sm font-medium">{project.sold} ({(project.sold / project.total * 100).toFixed(1)}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${project.sold / project.total * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Reserved</span>
                                <span className="text-sm font-medium">{project.reserved} ({(project.reserved / project.total * 100).toFixed(1)}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-amber-500 h-2 rounded-full" 
                                  style={{ width: `${project.reserved / project.total * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Available</span>
                                <span className="text-sm font-medium">{project.available} ({(project.available / project.total * 100).toFixed(1)}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-slate-400 h-2 rounded-full" 
                                  style={{ width: `${project.available / project.total * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StatsAnalysis;
