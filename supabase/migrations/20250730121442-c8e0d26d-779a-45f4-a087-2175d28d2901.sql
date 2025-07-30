-- Insert sample projects with comprehensive data
INSERT INTO projects (
  name, description, project_type, location, latitude, longitude, 
  project_status, price_range_min, price_range_max, size_options,
  apartment_type, total_towers, total_commercial_units, tower_details,
  cover_photo, created_by
) VALUES 
-- Sample Project 1: Luxury Colony
(
  'Shardeya Heights Colony',
  'Premium plotted development with modern amenities and excellent connectivity. Offering various plot sizes in a gated community with 24/7 security, clubhouse, and landscaped gardens.',
  'colony',
  'Sector 67, Gurugram, Haryana, India',
  28.4089,
  77.0583,
  'booking_open',
  2500000,
  8000000,
  ARRAY[1200, 1500, 2000, 2500],
  NULL,
  NULL,
  NULL,
  NULL,
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  '00000000-0000-0000-0000-000000000001'
),
-- Sample Project 2: Apartment Complex
(
  'Shardeya Residency',
  'Modern residential apartment complex with 3 towers offering 2BHK and 3BHK units. Features include swimming pool, gym, children play area, and basement parking.',
  'apartment',
  'Whitefield, Bangalore, Karnataka, India',
  12.9698,
  77.7500,
  'under_construction',
  4500000,
  12000000,
  ARRAY[1100, 1400, 1800],
  'residential',
  3,
  NULL,
  '[
    {"name": "Tower A", "totalFloors": 15, "totalFlats": 120},
    {"name": "Tower B", "totalFloors": 12, "totalFlats": 96},
    {"name": "Tower C", "totalFloors": 18, "totalFlats": 144}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  '00000000-0000-0000-0000-000000000001'
),
-- Sample Project 3: Villa Project
(
  'Shardeya Villa Gardens',
  'Luxury independent villas with private gardens and modern architecture. Each villa comes with 3-4 bedrooms, private parking, and premium fittings.',
  'villa',
  'Kompally, Hyderabad, Telangana, India',
  17.5504,
  78.4890,
  'possession',
  8500000,
  15000000,
  ARRAY[2200, 2800, 3500],
  NULL,
  NULL,
  NULL,
  NULL,
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  '00000000-0000-0000-0000-000000000001'
),
-- Sample Project 4: Commercial Complex
(
  'Shardeya Business Hub',
  'Prime commercial complex in IT corridor with office spaces, retail outlets, and food court. Excellent connectivity and modern infrastructure.',
  'commercial',
  'Cyber City, Gurugram, Haryana, India',
  28.4950,
  77.0890,
  'completed',
  3500000,
  25000000,
  ARRAY[500, 800, 1200, 2000],
  NULL,
  NULL,
  NULL,
  NULL,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  '00000000-0000-0000-0000-000000000001'
),
-- Sample Project 5: Res-Comm Apartment
(
  'Shardeya Twin Towers',
  'Mixed-use development with residential towers and commercial spaces. Features luxury apartments and premium retail outlets in the heart of the city.',
  'apartment',
  'Banjara Hills, Hyderabad, Telangana, India',
  17.4126,
  78.4482,
  'booking_open',
  6000000,
  18000000,
  ARRAY[1300, 1600, 2100, 2800],
  'res-comm',
  2,
  45,
  '[
    {"name": "Residential Tower", "totalFloors": 25, "totalFlats": 200},
    {"name": "Premium Tower", "totalFloors": 30, "totalFlats": 240}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800',
  '00000000-0000-0000-0000-000000000001'
);

-- Insert sample units for the projects
INSERT INTO units (
  project_id, unit_number, unit_type, unit_status, size_sqft, 
  price_per_sqft, total_price, facing, floor_number, block_tower,
  bhk_type, road_width, is_corner_plot, has_water_electricity, amenities
)
SELECT 
  p.id,
  'P-' || ROW_NUMBER() OVER (ORDER BY p.id) AS unit_number,
  CASE p.project_type 
    WHEN 'colony' THEN 'plot'
    WHEN 'apartment' THEN 'flat'
    WHEN 'villa' THEN 'villa'
    WHEN 'commercial' THEN 'office'
    ELSE 'plot'
  END::unit_type,
  CASE (ROW_NUMBER() OVER (ORDER BY p.id) % 3)
    WHEN 0 THEN 'sold'
    WHEN 1 THEN 'reserved'
    ELSE 'available'
  END::unit_status,
  (ARRAY[1200, 1500, 1800])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 3) + 1] AS size_sqft,
  CASE p.project_type 
    WHEN 'colony' THEN 2500
    WHEN 'apartment' THEN 4000
    WHEN 'villa' THEN 5000
    WHEN 'commercial' THEN 7000
    ELSE 3000
  END AS price_per_sqft,
  CASE p.project_type 
    WHEN 'colony' THEN 3000000
    WHEN 'apartment' THEN 7200000
    WHEN 'villa' THEN 9000000
    WHEN 'commercial' THEN 12600000
    ELSE 4500000
  END AS total_price,
  (ARRAY['North', 'South', 'East', 'West'])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 4) + 1] AS facing,
  CASE p.project_type 
    WHEN 'apartment' THEN ((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 15) + 1
    WHEN 'commercial' THEN ((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 20) + 1
    ELSE NULL
  END AS floor_number,
  CASE p.project_type 
    WHEN 'apartment' THEN (ARRAY['Tower A', 'Tower B', 'Tower C'])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 3) + 1]
    ELSE NULL
  END AS block_tower,
  CASE p.project_type 
    WHEN 'apartment' THEN (ARRAY['2BHK', '3BHK', '3BHK+Study'])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 3) + 1]
    WHEN 'villa' THEN (ARRAY['3BHK', '4BHK', '4BHK+Study'])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 3) + 1]
    ELSE NULL
  END AS bhk_type,
  CASE p.project_type 
    WHEN 'colony' THEN (ARRAY[30, 40, 50])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 3) + 1]
    ELSE NULL
  END AS road_width,
  (ROW_NUMBER() OVER (ORDER BY p.id) % 4 = 0) AS is_corner_plot,
  true AS has_water_electricity,
  CASE p.project_type 
    WHEN 'apartment' THEN ARRAY['Swimming Pool', 'Gym', 'Children Play Area', 'Clubhouse', 'Security']
    WHEN 'villa' THEN ARRAY['Private Garden', 'Parking', 'Security', 'Landscaping']
    WHEN 'colony' THEN ARRAY['Clubhouse', 'Security', 'Park', 'Wide Roads']
    WHEN 'commercial' THEN ARRAY['Parking', 'Security', 'Power Backup', 'Elevators']
    ELSE ARRAY['Basic Amenities']
  END AS amenities
FROM projects p
CROSS JOIN generate_series(1, 8) AS gs(num);

-- Insert sample leads
INSERT INTO leads (
  project_id, enquiry_source, customer_name, contact, email,
  interested_in, lead_status, notes
)
SELECT 
  p.id,
  (ARRAY['Website', 'Walk-in', 'Reference', 'Advertisement', 'Social Media'])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 5) + 1] AS enquiry_source,
  (ARRAY['Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sneha Patel', 'Vikram Gupta', 'Anita Verma'])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 6) + 1] AS customer_name,
  '+91 ' || (9000000000 + (ROW_NUMBER() OVER (ORDER BY p.id))::bigint) AS contact,
  LOWER((ARRAY['rajesh.kumar', 'priya.sharma', 'amit.singh', 'sneha.patel', 'vikram.gupta', 'anita.verma'])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 6) + 1]) || '@gmail.com' AS email,
  CASE p.project_type 
    WHEN 'colony' THEN '1500 sqft plot'
    WHEN 'apartment' THEN '2BHK unit'
    WHEN 'villa' THEN '3BHK villa'
    WHEN 'commercial' THEN 'Office space'
    ELSE 'General inquiry'
  END AS interested_in,
  (ARRAY['new', 'contacted', 'visited', 'negotiation'])[((ROW_NUMBER() OVER (ORDER BY p.id) - 1) % 4) + 1]::lead_status AS lead_status,
  'Interested in premium ' || p.project_type || ' project. Looking for immediate possession.' AS notes
FROM projects p
CROSS JOIN generate_series(1, 3) AS gs(num);