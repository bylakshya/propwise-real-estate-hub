
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Plot } from '@/types';
import { Phone, Tag, Flower2, Image } from 'lucide-react';

interface PlotDetailDialogProps {
  plot: Plot | null;
  isOpen: boolean;
  onClose: () => void;
}

const PlotDetailDialog: React.FC<PlotDetailDialogProps> = ({ plot, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  
  if (!plot) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-blue-100 text-blue-800';
      case 'sold':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Plot #{plot.plotNumber}</DialogTitle>
            <Badge className={`${getStatusColor(plot.status)} text-sm px-3 py-1`}>
              {plot.status}
            </Badge>
          </div>
          <DialogDescription>
            {plot.size} {plot.sizeUnit} • Facing {plot.facing} • ₹{plot.price.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="buyer" disabled={plot.status !== 'Sold'}>Buyer Info</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="payment" disabled={plot.status !== 'Sold'}>Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Plot Number</Label>
                <div className="font-medium">{plot.plotNumber}</div>
              </div>
              
              <div className="space-y-1">
                <Label>Status</Label>
                <div className="font-medium">{plot.status}</div>
              </div>
              
              <div className="space-y-1">
                <Label>Size</Label>
                <div className="font-medium">{plot.size} {plot.sizeUnit}</div>
              </div>
              
              <div className="space-y-1">
                <Label>Facing</Label>
                <div className="font-medium">{plot.facing}</div>
              </div>
              
              <div className="space-y-1">
                <Label>Price</Label>
                <div className="font-medium">₹{plot.price.toLocaleString()}</div>
              </div>
            </div>

            <div className="pt-2">
              <Label>Features</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {plot.isCorner && (
                  <Badge variant="outline">Corner Plot</Badge>
                )}
                {plot.hasGarden && (
                  <Badge variant="outline">
                    <Flower2 className="h-3.5 w-3.5 mr-1" />
                    Garden
                  </Badge>
                )}
                {plot.isHot && (
                  <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                    Hot Property
                  </Badge>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="buyer" className="space-y-4">
            {plot.status === 'Sold' && plot.buyer ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Buyer Name</Label>
                    <div className="font-medium">{plot.buyer.name}</div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Contact Number</Label>
                    <div className="font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {plot.buyer.contactNumber}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Purchase Date</Label>
                    <div className="font-medium">
                      {format(new Date(plot.buyer.purchaseDate), 'dd MMM yyyy')}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Government ID</Label>
                    <div className="font-medium">
                      <Tag className="h-4 w-4 mr-1 inline" />
                      {plot.buyer.governmentId}
                    </div>
                  </div>
                </div>

                {plot.brokerId && (
                  <div className="p-3 border rounded-md bg-gray-50 mt-4">
                    <Label className="mb-1 block">Broker Involved</Label>
                    <div className="font-medium">Broker ID: {plot.brokerId}</div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No buyer information available.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {['agreement', 'registry', 'map'].map((docType) => (
                <div key={docType} className="border rounded-md p-4 text-center">
                  <div className="mb-3">
                    <div className="h-24 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                      <Image className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="font-medium capitalize">{docType}</h3>
                  </div>
                  
                  {plot.documents && plot.documents[docType as keyof typeof plot.documents] ? (
                    <Button size="sm" className="w-full">View</Button>
                  ) : (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">No document uploaded</p>
                      <Button size="sm" className="w-full">Upload</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            {plot.payment ? (
              <>
                <div className="p-3 bg-gray-50 rounded-md">
                  <Label className="mb-1 block">Payment Type</Label>
                  <div className="font-medium">{plot.payment.type}</div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Payment History</h3>
                  {plot.payment.history && plot.payment.history.length > 0 ? (
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Payment Mode</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {plot.payment.history.map((payment, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 text-sm">
                                {format(new Date(payment.date), 'dd MMM yyyy')}
                              </td>
                              <td className="py-2 px-4 text-sm">
                                ₹{payment.amount.toLocaleString()}
                              </td>
                              <td className="py-2 px-4 text-sm">{payment.mode}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No payment history available</p>
                  )}
                </div>

                {plot.payment.pending && plot.payment.pending.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Pending Installments</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Due Date</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {plot.payment.pending.map((installment, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 text-sm">
                                {format(new Date(installment.dueDate), 'dd MMM yyyy')}
                              </td>
                              <td className="py-2 px-4 text-sm">
                                ₹{installment.amount.toLocaleString()}
                              </td>
                              <td className="py-2 px-4 text-sm">
                                <Button size="sm" variant="outline">Send Notification</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No payment information available.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {plot.status === 'Available' && (
            <div className="flex gap-2 mr-auto">
              <Button>Mark as Reserved</Button>
              <Button>Mark as Sold</Button>
            </div>
          )}
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlotDetailDialog;
