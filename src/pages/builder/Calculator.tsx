
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
import { ArrowRight } from 'lucide-react';

const Calculator: React.FC = () => {
  const [loanEmi, setLoanEmi] = useState<number | null>(null);
  const [plotReturns, setPlotReturns] = useState<{ monthly: number; yearly: number; total: number } | null>(null);
  
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Real Estate Calculator</h1>
          <p className="text-gray-500 mt-1">Calculate loan EMIs, expected returns, and more</p>
        </div>
        
        <Tabs defaultValue="loan">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="loan" className="flex-1">Loan EMI Calculator</TabsTrigger>
            <TabsTrigger value="plot" className="flex-1">Plot Investment Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="loan" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Home Loan EMI Calculator</CardTitle>
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
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.1"
                        {...loanForm.register('interestRate', { valueAsNumber: true })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                      <Input
                        id="tenure"
                        type="number"
                        {...loanForm.register('tenure', { valueAsNumber: true })}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Calculate EMI
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>EMI Results</CardTitle>
                  <CardDescription>Your calculated monthly EMI payment</CardDescription>
                </CardHeader>
                <CardContent>
                  {loanEmi ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">Monthly EMI</p>
                        <h2 className="text-3xl font-bold">₹{Math.round(loanEmi).toLocaleString()}</h2>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Total Interest Payable</p>
                          <p className="text-lg font-semibold">
                            ₹{Math.round(loanEmi * loanForm.getValues('tenure') * 12 - loanForm.getValues('loanAmount')).toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Total Payment</p>
                          <p className="text-lg font-semibold">
                            ₹{Math.round(loanEmi * loanForm.getValues('tenure') * 12).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                      <p>Enter loan details and calculate to see results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="plot" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plot Investment Calculator</CardTitle>
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
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="annualAppreciation">Annual Appreciation Rate (%)</Label>
                      <Input
                        id="annualAppreciation"
                        type="number"
                        step="0.5"
                        {...plotForm.register('annualAppreciation', { valueAsNumber: true })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="holdingPeriod">Holding Period (Years)</Label>
                      <Input
                        id="holdingPeriod"
                        type="number"
                        {...plotForm.register('holdingPeriod', { valueAsNumber: true })}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Calculate Returns
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Investment Results</CardTitle>
                  <CardDescription>Projected returns on your plot investment</CardDescription>
                </CardHeader>
                <CardContent>
                  {plotReturns ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">Total Returns After {plotForm.getValues('holdingPeriod')} Years</p>
                        <h2 className="text-3xl font-bold">₹{Math.round(plotReturns.total).toLocaleString()}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Future Value: ₹{Math.round(plotForm.getValues('initialInvestment') + plotReturns.total).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Yearly Return</p>
                          <p className="text-lg font-semibold">
                            ₹{Math.round(plotReturns.yearly).toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Monthly Return</p>
                          <p className="text-lg font-semibold">
                            ₹{Math.round(plotReturns.monthly).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                      <p>Enter investment details to see projected returns</p>
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
