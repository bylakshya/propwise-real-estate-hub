
export type UserRole = 'broker' | 'builder';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'Plot' | 'Flat' | 'House';
  purpose: 'Sell' | 'Rent';
  address: string;
  area: string;
  size: number;
  sizeUnit: 'sqft' | 'sqm' | 'acres' | 'hectares';
  price: number;
  photos: string[];
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  isHot: boolean;
  updatedAt: string;
  hasGarden: boolean;
  isCorner: boolean;
  isVastuCompliant: boolean;
  ownerName: string;
  ownerContact: string;
  interestedCustomers: Customer[];
  nextFollowUpDate?: string;
  followUpHistory: FollowUp[];
  dealStatus: DealStatus;
  brokerageAmount?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  totalArea: number;
  areaUnit: 'sqft' | 'sqm' | 'acres' | 'hectares';
  approvals: string[];
  layouts: Layout[];
  plots: Plot[];
  createdAt: string;
  updatedAt: string;
}

export interface Plot {
  id: string;
  projectId: string;
  plotNumber: string;
  status: 'Available' | 'Sold' | 'Reserved';
  size: number;
  sizeUnit: 'sqft' | 'sqm';
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  price: number;
  hasGarden: boolean;
  isCorner: boolean;
  isHot: boolean;
  buyer?: {
    name: string;
    contactNumber: string;
    purchaseDate: string;
    governmentId: string;
  };
  brokerId?: string;
  documents?: {
    agreement?: string;
    registry?: string;
    map?: string;
  };
  payment?: {
    type: 'Installment' | 'Lumpsum';
    history: {
      date: string;
      amount: number;
      mode: 'Cash' | 'Check' | 'Bank Transfer' | 'UPI';
    }[];
    pending?: {
      amount: number;
      dueDate: string;
    }[];
  };
}

export interface Layout {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  email?: string;
  address?: string;
  interestedIn: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FollowUp {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  remarks: string;
  nextFollowUpDate?: string;
  isInterested: boolean;
}

export type DealStatus = 'Interested' | 'Call' | 'Visit Done' | 'Follow Ups' | 'Deal Cancelled' | 'Deal Finalized' | 'Agreement Done' | 'Registry Done' | 'Brokerage Received';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'Meeting' | 'Visit' | 'Follow Up' | 'Payment' | 'Other';
  description?: string;
  relatedEntityId?: string;
  relatedEntityType?: 'Property' | 'Project' | 'Customer';
}

export interface DealHistory {
  id: string;
  propertyId?: string;
  projectId?: string;
  customerId: string;
  customerName: string;
  date: string;
  status: DealStatus;
  amount?: number;
  brokerageAmount?: number;
  remarks?: string;
}
