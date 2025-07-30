-- Add apartment specific columns to projects table (skip bucket creation since it exists)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS apartment_type TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS total_towers INTEGER;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tower_details JSONB;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS total_commercial_units INTEGER;