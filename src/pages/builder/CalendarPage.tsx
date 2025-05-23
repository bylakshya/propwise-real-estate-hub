
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarPlus, Search } from 'lucide-react';

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: 'Client Meeting',
    description: 'Meeting with Mr. Kapoor regarding Plot A-12',
    date: new Date(2025, 4, 25),
    type: 'meeting',
  },
  {
    id: 2,
    title: 'Payment Collection',
    description: 'Collect installment for Plot B-08',
    date: new Date(2025, 4, 26),
    type: 'payment',
  },
  {
    id: 3,
    title: 'Site Visit',
    description: 'Show Sunshine City plots to prospective buyers',
    date: new Date(2025, 4, 27),
    type: 'visit',
  },
  {
    id: 4,
    title: 'Project Review',
    description: 'Internal review of Green Valley development progress',
    date: new Date(2025, 4, 28),
    type: 'meeting',
  },
  {
    id: 5,
    title: 'Follow-up with Mr. Singh',
    description: 'Call regarding interest in Plot C-05',
    date: new Date(2025, 4, 29),
    type: 'followup',
  },
];

interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  type: 'meeting' | 'payment' | 'visit' | 'followup' | 'other';
}

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    type: 'meeting',
    date: new Date(),
  });

  // Filter events for the selected day
  const selectedDateEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  // Function to add new event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        id: events.length + 1,
        title: newEvent.title,
        description: newEvent.description || '',
        date: newEvent.date,
        type: newEvent.type as Event['type'],
      };
      setEvents([...events, event]);
      setIsAddEventOpen(false);
      setNewEvent({
        title: '',
        description: '',
        type: 'meeting',
        date: new Date(),
      });
    }
  };

  // Function to determine if a date has events
  const isDayWithEvent = (day: Date) => {
    return events.some(event => event.date.toDateString() === day.toDateString());
  };

  // Render event badges on the calendar
  const renderEventBadge = (day: Date) => {
    const eventsOnDay = events.filter(
      event => event.date.toDateString() === day.toDateString()
    );
    if (eventsOnDay.length > 0) {
      return (
        <div className="absolute bottom-0 right-0 left-0 flex justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
        </div>
      );
    }
    return null;
  };

  // Get badge color based on event type
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'visit':
        return 'bg-purple-100 text-purple-800';
      case 'followup':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl mb-2">Calendar</h1>
            <p className="text-gray-500">Manage your schedule, appointments, and events</p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={() => setIsAddEventOpen(true)}>
              <CalendarPlus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md p-3 pointer-events-auto"
                modifiers={{
                  hasEvent: isDayWithEvent,
                }}
                modifiersClassNames={{
                  hasEvent: "relative",
                }}
                components={{
                  DayContent: ({ date: dayDate }) => (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {dayDate.getDate()}
                      {isDayWithEvent(dayDate) && renderEventBadge(dayDate)}
                    </div>
                  ),
                }}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {date ? `Events for ${date.toLocaleDateString()}` : 'Select a Date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{event.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <p className="text-xs text-gray-500">
                        {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No events scheduled for this day</p>
                    <Button variant="outline" className="mt-2" onClick={() => setIsAddEventOpen(true)}>
                      Add Event
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <CardTitle>Upcoming Events</CardTitle>
              <div className="mt-2 md:mt-0">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input 
                    className="pl-9 max-w-xs" 
                    placeholder="Search events..." 
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events
                .filter(event => event.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 border rounded-md">
                    <div className="min-w-16 text-center">
                      <div className="font-bold">{event.date.toLocaleDateString('en-US', { day: 'numeric' })}</div>
                      <div className="text-xs text-gray-500">{event.date.toLocaleDateString('en-US', { month: 'short' })}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{event.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid w-full gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input 
                id="title" 
                placeholder="Enter event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter event description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="event-type">Event Type</Label>
              <Select 
                value={newEvent.type} 
                onValueChange={(value) => setNewEvent({...newEvent, type: value as Event['type']})}
              >
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="visit">Site Visit</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full gap-2">
              <Label>Event Date</Label>
              <div className="border rounded-md p-3">
                <Calendar
                  mode="single"
                  selected={newEvent.date}
                  onSelect={(date) => setNewEvent({...newEvent, date})}
                  className="pointer-events-auto"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>Cancel</Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CalendarPage;
