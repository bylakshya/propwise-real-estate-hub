-- Create enum types for project management system
CREATE TYPE public.project_type AS ENUM ('colony', 'apartment', 'villa', 'farmhouse', 'commercial');
CREATE TYPE public.project_status AS ENUM ('pre_launch', 'booking_open', 'under_construction', 'possession', 'completed');
CREATE TYPE public.unit_status AS ENUM ('available', 'reserved', 'sold');
CREATE TYPE public.unit_type AS ENUM ('plot', 'flat', 'villa', 'farmhouse', 'shop', 'office');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'overdue', 'partial');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'visited', 'negotiation', 'closed');
CREATE TYPE public.user_role AS ENUM ('admin', 'sales_manager', 'broker', 'accountant', 'viewer');

-- Create projects table
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    project_type project_type NOT NULL,
    cover_photo TEXT,
    location TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    size_options INTEGER[],
    price_range_min DECIMAL(15, 2),
    price_range_max DECIMAL(15, 2),
    project_status project_status NOT NULL DEFAULT 'pre_launch',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project documents table
CREATE TABLE public.project_documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id),
    uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create units table
CREATE TABLE public.units (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    unit_number TEXT NOT NULL,
    unit_type unit_type NOT NULL,
    unit_status unit_status NOT NULL DEFAULT 'available',
    size_sqft INTEGER,
    carpet_area INTEGER,
    floor_number INTEGER,
    block_tower TEXT,
    bhk_type TEXT,
    facing TEXT,
    road_width INTEGER,
    is_corner_plot BOOLEAN DEFAULT false,
    price_per_sqft DECIMAL(10, 2),
    total_price DECIMAL(15, 2),
    frontage INTEGER,
    has_water_electricity BOOLEAN DEFAULT false,
    amenities TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(project_id, unit_number)
);

-- Create buyers table
CREATE TABLE public.buyers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    email TEXT,
    aadhar_number TEXT,
    pan_number TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unit reservations table
CREATE TABLE public.unit_reservations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_id UUID REFERENCES public.units(id) ON DELETE CASCADE,
    reserved_by TEXT NOT NULL,
    contact TEXT NOT NULL,
    broker_id UUID,
    broker_name TEXT,
    reservation_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unit sales table
CREATE TABLE public.unit_sales (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_id UUID REFERENCES public.units(id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES public.buyers(id),
    sale_date DATE NOT NULL,
    final_price DECIMAL(15, 2) NOT NULL,
    broker_id UUID,
    broker_name TEXT,
    agreement_date DATE,
    registry_date DATE,
    possession_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_sale_id UUID REFERENCES public.unit_sales(id) ON DELETE CASCADE,
    installment_number INTEGER NOT NULL,
    installment_label TEXT NOT NULL,
    due_date DATE NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    paid_date DATE,
    paid_amount DECIMAL(15, 2),
    payment_mode TEXT,
    payment_status payment_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    enquiry_source TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    contact TEXT NOT NULL,
    email TEXT,
    interested_in TEXT,
    lead_status lead_status NOT NULL DEFAULT 'new',
    assigned_to UUID REFERENCES auth.users(id),
    next_follow_up DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead follow ups table
CREATE TABLE public.lead_followups (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    follow_up_date DATE NOT NULL,
    notes TEXT NOT NULL,
    next_follow_up DATE,
    contacted_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table
CREATE TABLE public.user_roles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    project_access UUID[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unit_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unit_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_followups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Projects
CREATE POLICY "Users can view projects" ON public.projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update their projects" ON public.projects FOR UPDATE TO authenticated USING (auth.uid() = created_by);

-- Project documents
CREATE POLICY "Users can view project documents" ON public.project_documents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can upload documents" ON public.project_documents FOR INSERT TO authenticated WITH CHECK (auth.uid() = uploaded_by);

-- Units
CREATE POLICY "Users can view units" ON public.units FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create units" ON public.units FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update units" ON public.units FOR UPDATE TO authenticated USING (true);

-- Buyers
CREATE POLICY "Users can view buyers" ON public.buyers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create buyers" ON public.buyers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update buyers" ON public.buyers FOR UPDATE TO authenticated USING (true);

-- Unit reservations
CREATE POLICY "Users can view reservations" ON public.unit_reservations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create reservations" ON public.unit_reservations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update reservations" ON public.unit_reservations FOR UPDATE TO authenticated USING (true);

-- Unit sales
CREATE POLICY "Users can view sales" ON public.unit_sales FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create sales" ON public.unit_sales FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update sales" ON public.unit_sales FOR UPDATE TO authenticated USING (true);

-- Payments
CREATE POLICY "Users can view payments" ON public.payments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create payments" ON public.payments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update payments" ON public.payments FOR UPDATE TO authenticated USING (true);

-- Leads
CREATE POLICY "Users can view leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create leads" ON public.leads FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update leads" ON public.leads FOR UPDATE TO authenticated USING (true);

-- Lead followups
CREATE POLICY "Users can view followups" ON public.lead_followups FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create followups" ON public.lead_followups FOR INSERT TO authenticated WITH CHECK (auth.uid() = contacted_by);

-- User roles
CREATE POLICY "Users can view their roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create their roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Create update triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON public.units FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_buyers_updated_at BEFORE UPDATE ON public.buyers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();