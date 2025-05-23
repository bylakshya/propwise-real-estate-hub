
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ArrowRight, Calculator as CalcIcon, IndianRupee, Percent, Building, BarChart3, FileText } from 'lucide-react';

const Calculator: React.FC = () => {
  // Loan EMI Calculator state and logic
  const [loanEmi, setLoanEmi] = useState<number | null>(null);
  const [plotReturns, setPlotReturns] = useState<{ monthly: number; yearly: number; total: number } | null>(null);
  const [stampDuty, setStampDuty] = useState<{ amount: number; percentage: number } | null>(null);
  const [brokerage, setBrokerage] = useState<{ amount: number; percentage: number } | null>(null);
  
  const loanForm = useForm({
    defaultValues: {
      loanAmount: 2000000,
      interestRate: 8.5,
      tenure: 20,
    },
  });

  const plotForm = useForm({
    defaultValues: {
      initialInvestment: 2000000,
      annualAppreciation: 15,
      holdingPeriod: 5,
    },
  });

  const stampDutyForm = useForm({
    defaultValues: {
      propertyValue: 5000000,
      state: 'maharashtra',
      propertyType: 'residential',
    },
  });

  const brokerageForm = useForm({
    defaultValues: {
      dealValue: 5000000,
      brokerageRate: 1,
    },
  });

  const calculateEMI = (values: { loanAmount: number; interestRate: number; tenure: number }) => {
    const P = values.loanAmount;
    const r = values.interestRate / 12 / 100; // monthly interest rate
    const n = values.tenure * 12; // total number of months
    
    // EMI formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    setLoanEmi(emi);
  };

  const calculatePlotReturns = (values: { initialInvestment: number; annualAppreciation: number; holdingPeriod: number }) => {
    const initial = values.initialInvestment;
    const rate = values.annualAppreciation / 100;
    const years = values.holdingPeriod;
    
    const finalValue = initial * Math.pow(1 + rate, years);
    const totalReturns = finalValue - initial;
    const yearlyReturns = totalReturns / years;
    const monthlyReturns = yearlyReturns / 12;
    
    setPlotReturns({
      monthly: monthlyReturns,
      yearly: yearlyReturns,
      total: totalReturns,
    });
  };

  const calculateStampDuty = (values: { propertyValue: number; state: string; propertyType: string }) => {
    // Different stamp duty rates by state and property type
    const stampDutyRates: Record<string, Record<string, number>> = {
      'maharashtra': { 'residential': 5, 'commercial': 6, 'land': 4 },
      'karnataka': { 'residential': 5.6, 'commercial': 6, 'land': 5 },
      'delhi': { 'residential': 4, 'commercial': 6, 'land': 4 },
      'tamilnadu': { 'residential': 7, 'commercial': 8, 'land': 7 },
      'telangana': { 'residential': 6, 'commercial': 6, 'land': 5.5 },
    };
    
    const rate = stampDutyRates[values.state]?.[values.propertyType] || 5;
    const dutyAmount = (values.propertyValue * rate) / 100;
    
    setStampDuty({ 
      amount: dutyAmount,
      percentage: rate
    });
  };

  const calculateBrokerage = (values: { dealValue: number; brokerageRate: number }) => {
    const amount = (values.dealValue * values.brokerageRate) / 100;
    
    setBrokerage({
      amount: amount,
      percentage: values.brokerageRate
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${Math.round(amount).toLocaleString()}`;
  };

  const calculateButtonClasses = "w-full bg-primary hover:bg-primary/90 text-white";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Real Estate Calculator</h1>
          <p className="text-gray-500 mt-1">Calculate loan EMIs, expected returns, stamp duty, and brokerage</p>
        </div>
        
        <Tabs defaultValue="loan" className="bg-white rounded-lg shadow-sm border p-1">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="loan" className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              <span>Loan EMI</span>
            </TabsTrigger>
            <TabsTrigger value="plot" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Plot Returns</span>
            </TabsTrigger>
            <TabsTrigger value="stampduty" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Stamp Duty</span>
            </TabsTrigger>
            <TabsTrigger value="brokerage" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              <span>Brokerage</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="loan" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalcIcon className="h-5 w-5 text-primary" />
                    <span>Home Loan EMI Calculator</span>
                  </CardTitle>
                  <CardDescription>Calculate your monthly EMI payment for home loans</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loanForm.handleSubmit(calculateEMI)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        step="100000"
                        {...loanForm.register('loanAmount', { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.1"
                        {...loanForm.register('interestRate', { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                      <Input
                        id="tenure"
                        type="number"
                        {...loanForm.register('tenure', { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                    </div>
                    
                    <Button type="submit" className={calculateButtonClasses}>
                      Calculate EMI
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="border shadow-md">
                <CardHeader>
                  <CardTitle>EMI Results</CardTitle>
                  <CardDescription>Your calculated monthly EMI payment</CardDescription>
                </CardHeader>
                <CardContent>
                  {loanEmi ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">Monthly EMI</p>
                        <h2 className="text-3xl font-bold text-primary">{formatCurrency(loanEmi)}</h2>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Total Interest Payable</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(loanEmi * loanForm.getValues('tenure') * 12 - loanForm.getValues('loanAmount'))}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Total Payment</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(loanEmi * loanForm.getValues('tenure') * 12)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg">
                      <CalcIcon className="h-12 w-12 mb-4 text-gray-400" />
                      <p>Enter loan details and calculate to see results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="plot" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    <span>Plot Investment Calculator</span>
                  </CardTitle>
                  <CardDescription>Calculate potential returns on plot investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={plotForm.handleSubmit(calculatePlotReturns)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="initialInvestment">Initial Investment (₹)</Label>
                      <Input
                        id="initialInvestment"
                        type="number"
                        step="100000"
                        {...plotForm.register('initialInvestment', { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="annualAppreciation">Annual Appreciation Rate (%)</Label>
                      <Input
                        id="annualAppreciation"
                        type="number"
                        step="0.5"
                        {...plotForm.register('annualAppreciation', { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="holdingPeriod">Holding Period (Years)</Label>
                      <Input
                        id="holdingPeriod"
                        type="number"
                        {...plotForm.register('holdingPeriod', { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                    </div>
                    
                    <Button type="submit" className={calculateButtonClasses}>
                      Calculate Returns
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="border shadow-md">
                <CardHeader>
                  <CardTitle>Investment Results</CardTitle>
                  <CardDescription>Projected returns on your plot investment</CardDescription>
                </CardHeader>
                <CardContent>
                  {plotReturns ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">Total Returns After {plotForm.getValues('holdingPeriod')} Years</p>
                        <h2 className="text-3xl font-bold text-primary">{formatCurrency(plotReturns.total)}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Future Value: {formatCurrency(plotForm.getValues('initialInvestment') + plotReturns.total)}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Yearly Return</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(plotReturns.yearly)}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Monthly Return</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(plotReturns.monthly)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg">
                      <Building className="h-12 w-12 mb-4 text-gray-400" />
                      <p>Enter investment details to see projected returns</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="stampduty" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>Stamp Duty Calculator</span>
                  </CardTitle>
                  <CardDescription>Calculate stamp duty charges for property registration</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={stampDutyForm.handleSubmit(calculateStampDuty)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyValue">Property Value (₹)</Label>
                      <Input
                        id="propertyValue"
                        type="number"
                        step="100000"
                        {...stampDutyForm.register('propertyValue', { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select 
                        onValueChange={(value) => stampDutyForm.setValue('state', value)} 
                        defaultValue={stampDutyForm.getValues('state')}
                      >
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select 
                        onValueChange={(value) => stampDutyForm.setValue('propertyType', value)} 
                        defaultValue={stampDutyForm.getValues('propertyType')}
                      >
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="land">Land/Plot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className={calculateButtonClasses}>
                      Calculate Stamp Duty
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="border shadow-md">
                <CardHeader>
                  <CardTitle>Stamp Duty Results</CardTitle>
                  <CardDescription>Calculated stamp duty for property registration</CardDescription>
                </CardHeader>
                <CardContent>
                  {stampDuty ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">Total Stamp Duty</p>
                        <h2 className="text-3xl font-bold text-primary">{formatCurrency(stampDuty.amount)}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Rate: {stampDuty.percentage}% of property value
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Additional Information</p>
                          <ul className="text-sm space-y-1">
                            <li>• Registration charges may apply separately</li>
                            <li>• Women buyers may get concessions in some states</li>
                            <li>• Rates may vary based on property location within the state</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg">
                      <FileText className="h-12 w-12 mb-4 text-gray-400" />
                      <p>Enter property details to calculate stamp duty</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="brokerage" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-primary" />
                    <span>Brokerage Calculator</span>
                  </CardTitle>
                  <CardDescription>Calculate brokerage fees for property deals</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={brokerageForm.handleSubmit(calculateBrokerage)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dealValue">Property Deal Value (₹)</Label>
                      <Input
                        id="dealValue"
                        type="number"
                        step="100000"
                        {...brokerageForm.register('dealValue', { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="brokerageRate">Brokerage Rate (%)</Label>
                      <Input
                        id="brokerageRate"
                        type="number"
                        step="0.1"
                        {...brokerageForm.register('brokerageRate', { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                    </div>
                    
                    <Button type="submit" className={calculateButtonClasses}>
                      Calculate Brokerage
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="border shadow-md">
                <CardHeader>
                  <CardTitle>Brokerage Results</CardTitle>
                  <CardDescription>Calculated brokerage amount</CardDescription>
                </CardHeader>
                <CardContent>
                  {brokerage ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">Total Brokerage</p>
                        <h2 className="text-3xl font-bold text-primary">{formatCurrency(brokerage.amount)}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Rate: {brokerage.percentage}% of deal value
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Common Brokerage Rates</p>
                          <ul className="text-sm space-y-1">
                            <li>• Residential: 1-2% of property value</li>
                            <li>• Commercial: 2-3% of property value</li>
                            <li>• Rental: Usually 1 month's rent</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg">
                      <Percent className="h-12 w-12 mb-4 text-gray-400" />
                      <p>Enter deal value to calculate brokerage amount</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Calculator;
