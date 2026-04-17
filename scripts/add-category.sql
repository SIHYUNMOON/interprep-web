-- Add category column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS category TEXT DEFAULT '인터프렙 소개';

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);

-- Create categories table for managing available categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default categories
INSERT INTO categories (name) VALUES
  ('인터프렙 소개'),
  ('인터프렙 이야기'),
  ('US College'),
  ('국내수시'),
  ('MBA'),
  ('인터프렙 프로그램'),
  ('유용한 정보'),
  ('잉글스토리')
ON CONFLICT (name) DO NOTHING;
