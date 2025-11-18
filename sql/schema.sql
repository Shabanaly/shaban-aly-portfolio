-- SQL Schema for Portfolio Admin
-- Run this on your Neon PostgreSQL database

-- Create images table
CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at DESC);

-- Insert sample data (optional, remove after testing)
-- INSERT INTO projects (title, description, image, link, created_at) VALUES
-- ('مختبر Nmap', 'تدريب عملي على اكتشاف الخدمات باستخدام Nmap', 'https://res.cloudinary.com/...', 'https://github.com/...', NOW()),
-- ('تحليل الشبكة', 'التقاط وتحليل حزم باستخدام Wireshark', 'https://res.cloudinary.com/...', NULL, NOW());
