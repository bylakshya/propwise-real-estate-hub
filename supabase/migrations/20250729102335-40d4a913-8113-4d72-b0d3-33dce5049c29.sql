-- Add 'builder' to the user_role enum
ALTER TYPE user_role ADD VALUE 'builder';

-- The enum should now include: 'admin', 'sales_manager', 'broker', 'accountant', 'viewer', 'builder'