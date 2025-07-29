-- Create storage bucket for project photos
INSERT INTO storage.buckets (id, name, public) VALUES ('project-photos', 'project-photos', true);

-- Create policies for project photos
CREATE POLICY "Anyone can view project photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-photos');

CREATE POLICY "Authenticated users can upload project photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-photos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their project photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'project-photos' AND auth.uid() IS NOT NULL);

-- Add additional columns to projects table for detailed project info
ALTER TABLE projects ADD COLUMN IF NOT EXISTS apartment_type TEXT; -- 'residential' or 'res-comm'
ALTER TABLE projects ADD COLUMN IF NOT EXISTS total_towers INTEGER;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tower_details JSONB; -- Store tower info
ALTER TABLE projects ADD COLUMN IF NOT EXISTS total_commercial_units INTEGER;