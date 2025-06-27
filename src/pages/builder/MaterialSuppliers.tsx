
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Phone, Mail, MapPin, Clock, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const MaterialSuppliers: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderMaterial, setOrderMaterial] = useState('');

  const texts = {
    en: {
      title: 'Material Suppliers',
      subtitle: 'Manage your construction material suppliers and orders',
      scheduleOrder: 'Schedule Order',
      contactInfo: 'Contact Info',
      materials: 'Materials',
      rating: 'Rating',
      scheduleDelivery: 'Schedule Delivery',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      material: 'Material',
      quantity: 'Quantity',
      schedule: 'Schedule',
      cancel: 'Cancel',
      orderScheduled: 'Order Scheduled',
      orderScheduledSuccess: 'Your material order has been scheduled successfully',
      availableMaterials: 'Available Materials'
    },
    hi: {
      title: 'सामग्री आपूर्तिकर्ता',
      subtitle: 'अपने निर्माण सामग्री आपूर्तिकर्ताओं और ऑर्डर को प्रबंधित करें',
      scheduleOrder: 'ऑर्डर शेड्यूल करें',
      contactInfo: 'संपर्क जानकारी',
      materials: 'सामग्री',
      rating: 'रेटिंग',
      scheduleDelivery: 'डिलीवरी शेड्यूल करें',
      selectDate: 'तारीख चुनें',
      selectTime: 'समय चुनें',
      material: 'सामग्री',
      quantity: 'मात्रा',
      schedule: 'शेड्यूल करें',
      cancel: 'रद्द करें',
      orderScheduled: 'ऑर्डर शेड्यूल किया गया',
      orderScheduledSuccess: 'आपका सामग्री ऑर्डर सफलतापूर्वक शेड्यूल किया गया है',
      availableMaterials: 'उपलब्ध सामग्री'
    }
  };

  const currentTexts = texts[language];

  const suppliers = [
    {
      id: 1,
      name: 'ABC Construction Materials',
      contact: '+91 9876543210',
      email: 'abc@materials.com',
      address: 'Industrial Area, Sector 15',
      rating: 4.5,
      materials: ['Cement', 'Steel', 'Bricks', 'Sand'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Prime Building Supplies',
      contact: '+91 9876543211',
      email: 'prime@supplies.com',
      address: 'Construction Hub, Phase 2',
      rating: 4.8,
      materials: ['Tiles', 'Paint', 'Wood', 'Glass'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Quality Steel Works',
      contact: '+91 9876543212',
      email: 'quality@steel.com',
      address: 'Steel Market, Main Road',
      rating: 4.3,
      materials: ['Steel Bars', 'Mesh', 'Pipes', 'Sheets'],
      status: 'Active'
    }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleScheduleOrder = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsScheduleDialogOpen(true);
  };

  const handleConfirmSchedule = () => {
    if (!selectedDate || !selectedTime || !orderMaterial || !orderQuantity) {
      toast({
        title: language === 'en' ? 'Missing Information' : 'जानकारी गुम',
        description: language === 'en' ? 'Please fill in all required fields' : 'कृपया सभी आवश्यक फ़ील्ड भरें',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: currentTexts.orderScheduled,
      description: currentTexts.orderScheduledSuccess,
    });

    setIsScheduleDialogOpen(false);
    setSelectedDate(undefined);
    setSelectedTime('');
    setOrderQuantity('');
    setOrderMaterial('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl mb-2">{currentTexts.title}</h1>
          <p className="text-gray-500">{currentTexts.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="border shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <Badge className="bg-green-100 text-green-800">{supplier.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {currentTexts.contactInfo}
                  </h4>
                  <p className="text-sm text-gray-600">{supplier.contact}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {supplier.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {supplier.address}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{currentTexts.availableMaterials}</h4>
                  <div className="flex flex-wrap gap-1">
                    {supplier.materials.map((material, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">{currentTexts.rating}</span>
                    <div className="flex items-center">
                      <span className="font-bold text-lg">{supplier.rating}</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </div>
                  <Button onClick={() => handleScheduleOrder(supplier)}>
                    <Clock className="h-4 w-4 mr-2" />
                    {currentTexts.scheduleOrder}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Schedule Order Dialog */}
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {currentTexts.scheduleDelivery}
              </DialogTitle>
            </DialogHeader>
            
            {selectedSupplier && (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{selectedSupplier.name}</h4>
                  <p className="text-sm text-gray-600">{selectedSupplier.contact}</p>
                </div>

                <div>
                  <Label htmlFor="material">{currentTexts.material}</Label>
                  <Select value={orderMaterial} onValueChange={setOrderMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select material' : 'सामग्री चुनें'} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSupplier.materials.map((material: string) => (
                        <SelectItem key={material} value={material}>{material}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">{currentTexts.quantity}</Label>
                  <Input
                    id="quantity"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(e.target.value)}
                    placeholder={language === 'en' ? 'Enter quantity' : 'मात्रा दर्ज करें'}
                  />
                </div>

                <div>
                  <Label>{currentTexts.selectDate}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : (language === 'en' ? 'Pick a date' : 'तारीख चुनें')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>{currentTexts.selectTime}</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select time' : 'समय चुनें'} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleConfirmSchedule} className="flex-1">
                    {currentTexts.schedule}
                  </Button>
                  <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)} className="flex-1">
                    {currentTexts.cancel}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MaterialSuppliers;
