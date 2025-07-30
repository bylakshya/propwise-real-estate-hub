-- Add storage bucket for project photos with proper policies
INSERT INTO storage.buckets (id, name, public) VALUES ('project-photos', 'project-photos', true);

-- Create policies for project photo uploads
CREATE POLICY "Project images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-photos');

CREATE POLICY "Authenticated users can upload project images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'project-photos' AND auth.role() = 'authenticated');

-- Add apartment specific columns to projects table
ALTER TABLE public.projects ADD COLUMN apartment_type TEXT;
ALTER TABLE public.projects ADD COLUMN total_towers INTEGER;
ALTER TABLE public.projects ADD COLUMN tower_details JSONB;
ALTER TABLE public.projects ADD COLUMN total_commercial_units INTEGER;