-- Add avatar_url column to users_consumer table
ALTER TABLE users_consumer ADD COLUMN IF NOT EXISTS avatar_url VARCHAR;

-- Add avatar_url column to users_business table
ALTER TABLE users_business ADD COLUMN IF NOT EXISTS avatar_url VARCHAR;
