export type ProjectType = 'colony' | 'apartment' | 'villa' | 'farmhouse' | 'commercial';
export type ProjectStatus = 'pre_launch' | 'booking_open' | 'under_construction' | 'possession' | 'completed';
export type UnitStatus = 'available' | 'reserved' | 'sold';
export type UnitType = 'plot' | 'flat' | 'villa' | 'farmhouse' | 'shop' | 'office';
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'partial';
export type LeadStatus = 'new' | 'contacted' | 'visited' | 'negotiation' | 'closed';
export type UserRole = 'admin' | 'sales_manager' | 'broker' | 'accountant' | 'viewer';

export interface RealEstateProject {
  id: string;
  name: string;
  description: string;
  project_type: ProjectType;
  cover_photo?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  size_options?: number[];
  price_range_min?: number;
  price_range_max?: number;
  project_status: ProjectStatus;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectDocument {
  id: string;
  project_id: string;
  document_name: string;
  document_type: string;
  file_url: string;
  uploaded_by?: string;
  uploaded_at: string;
}

export interface Unit {
  id: string;
  project_id: string;
  unit_number: string;
  unit_type: UnitType;
  unit_status: UnitStatus;
  size_sqft?: number;
  carpet_area?: number;
  floor_number?: number;
  block_tower?: string;
  bhk_type?: string;
  facing?: string;
  road_width?: number;
  is_corner_plot?: boolean;
  price_per_sqft?: number;
  total_price?: number;
  frontage?: number;
  has_water_electricity?: boolean;
  amenities?: string[];
  created_at: string;
  updated_at: string;
}

export interface Buyer {
  id: string;
  name: string;
  contact: string;
  email?: string;
  aadhar_number?: string;
  pan_number?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface UnitReservation {
  id: string;
  unit_id: string;
  reserved_by: string;
  contact: string;
  broker_id?: string;
  broker_name?: string;
  reservation_date: string;
  notes?: string;
  created_at: string;
}

export interface UnitSale {
  id: string;
  unit_id: string;
  buyer_id?: string;
  sale_date: string;
  final_price: number;
  broker_id?: string;
  broker_name?: string;
  agreement_date?: string;
  registry_date?: string;
  possession_date?: string;
  notes?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  unit_sale_id: string;
  installment_number: number;
  installment_label: string;
  due_date: string;
  amount: number;
  paid_date?: string;
  paid_amount?: number;
  payment_mode?: string;
  payment_status: PaymentStatus;
  notes?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  project_id: string;
  enquiry_source: string;
  customer_name: string;
  contact: string;
  email?: string;
  interested_in?: string;
  lead_status: LeadStatus;
  assigned_to?: string;
  next_follow_up?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadFollowup {
  id: string;
  lead_id: string;
  follow_up_date: string;
  notes: string;
  next_follow_up?: string;
  contacted_by?: string;
  created_at: string;
}