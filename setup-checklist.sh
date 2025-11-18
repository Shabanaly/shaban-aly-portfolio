#!/bin/bash
# Quick Setup Checklist for Shaban Aly Portfolio
# Run this file to verify your setup: bash setup-checklist.sh

echo "🔍 Portfolio Setup Checklist"
echo "=============================="
echo ""

# Check if files exist
echo "✓ Checking project structure..."
files=(
  "index.html"
  "admin/index.html"
  "admin/config.js"
  "netlify/functions/upload-image.js"
  "netlify/functions/projects-crud.js"
  "sql/schema.sql"
  "netlify.toml"
  "package.json"
  "_headers"
  "_redirects"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
  fi
done

echo ""
echo "📋 Pre-Deployment Checklist:"
echo "=============================="
echo ""
echo "Cloudinary Setup:"
echo "  [ ] Create Cloudinary account at https://cloudinary.com"
echo "  [ ] Copy Cloud Name, API Key, API Secret"
echo ""
echo "Neon PostgreSQL Setup:"
echo "  [ ] Create Neon account at https://neon.tech"
echo "  [ ] Create project and get connection string"
echo "  [ ] Run: psql '<YOUR_CONNECTION_STRING>' < sql/schema.sql"
echo ""
echo "Environment Variables (Netlify):"
echo "  [ ] CLOUDINARY_CLOUD_NAME"
echo "  [ ] CLOUDINARY_API_KEY"
echo "  [ ] CLOUDINARY_API_SECRET"
echo "  [ ] DATABASE_URL"
echo "  [ ] ADMIN_PASSWORD (change from default!)"
echo ""
echo "Netlify Deployment:"
echo "  [ ] Push to GitHub OR upload ZIP to netlify.com/drop"
echo "  [ ] Set Environment variables in Site Settings"
echo "  [ ] Test admin panel: https://YOUR_SITE/admin/"
echo "  [ ] Test API: https://YOUR_SITE/.netlify/functions/projects-crud"
echo ""
echo "✨ All set! Your full-stack portfolio is ready to deploy!"
