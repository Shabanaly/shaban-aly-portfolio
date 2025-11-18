#!/bin/bash
# 🚀 Shaban Aly Portfolio — Quick Deploy Guide
# Follow these 7 simple steps to go live!

echo "🎯 Shaban Aly Portfolio — Quick Deploy"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1
echo -e "${YELLOW}STEP 1: Create Free Accounts${NC}"
echo "================================"
echo "  [ ] Cloudinary: https://cloudinary.com"
echo "      → Copy: Cloud Name, API Key, API Secret"
echo ""
echo "  [ ] Neon PostgreSQL: https://neon.tech"
echo "      → Copy: Connection String (postgresql://...)"
echo ""
echo "  [ ] Netlify: https://netlify.com"
echo "      → Ready for deployment"
echo ""

# Step 2
echo -e "${YELLOW}STEP 2: Setup Database (Local Machine)${NC}"
echo "======================================="
echo "  Run this command with your Neon connection string:"
echo ""
echo "  psql \"postgresql://user:pass@host/db\" < sql/schema.sql"
echo ""
echo "  After running, verify:"
echo "  psql \"your_connection_string\" -c \"SELECT * FROM projects;\""
echo ""

# Step 3
echo -e "${YELLOW}STEP 3: Test Locally${NC}"
echo "====================="
echo "  Run these commands:"
echo ""
echo "  npm install"
echo "  npm run dev"
echo ""
echo "  Then open:"
echo "  - http://localhost:8000     (Portfolio site)"
echo "  - http://localhost:8000/admin/  (Admin panel, password: shaban123)"
echo ""

# Step 4
echo -e "${YELLOW}STEP 4: Deploy to Netlify${NC}"
echo "=========================="
echo "  OPTION A (Easy - Drag & Drop):"
echo "    zip portfolio.zip ."
echo "    Go to: https://app.netlify.com/drop"
echo "    Drag portfolio.zip onto the page"
echo ""
echo "  OPTION B (Recommended - GitHub):"
echo "    git init && git add . && git commit -m 'Initial'"
echo "    git push origin main"
echo "    Connect repo to Netlify"
echo ""

# Step 5
echo -e "${YELLOW}STEP 5: Set Environment Variables${NC}"
echo "===================================="
echo "  After deploying, go to:"
echo "  Site Settings → Build & deploy → Environment"
echo ""
echo "  Add these variables:"
echo "    CLOUDINARY_CLOUD_NAME=your_cloud_name"
echo "    CLOUDINARY_API_KEY=your_api_key"
echo "    CLOUDINARY_API_SECRET=your_api_secret"
echo "    DATABASE_URL=postgresql://user:pass@host/db"
echo "    ADMIN_PASSWORD=choose_a_secure_password"
echo ""

# Step 6
echo -e "${YELLOW}STEP 6: Change Admin Password${NC}"
echo "=============================="
echo "  ⚠️  IMPORTANT!"
echo "  Default password: shaban123"
echo "  Change it in ADMIN_PASSWORD env var"
echo ""

# Step 7
echo -e "${YELLOW}STEP 7: Access Admin & Add Projects${NC}"
echo "======================================"
echo "  Go to: https://YOUR_SITE.netlify.app/admin/"
echo "  Login with your password"
echo ""
echo "  Now you can:"
echo "    📤 Upload images to Cloudinary"
echo "    ➕ Add projects (appear on homepage instantly!)"
echo "    📋 Manage existing projects"
echo ""

# Summary
echo ""
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo ""
echo "Resources:"
echo "  📚 Full guide: DEPLOYMENT_GUIDE.md"
echo "  📝 Build summary: BUILD_SUMMARY.md"
echo "  📋 Setup checklist: setup-checklist.sh"
echo ""
echo "Need help? Check the docs!"
echo ""

# Check if files exist
echo "Checking project files..."
files=(
  "index.html"
  "admin/index.html"
  "netlify/functions/upload-image.js"
  "netlify/functions/projects-crud.js"
  "sql/schema.sql"
  "package.json"
)

all_ok=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "  ${GREEN}✓${NC} $file"
  else
    echo -e "  ❌ $file (MISSING)"
    all_ok=false
  fi
done

echo ""
if [ "$all_ok" = true ]; then
  echo -e "${GREEN}✅ All files are present! Ready to deploy.${NC}"
else
  echo -e "❌ Some files are missing. Check the errors above."
fi

echo ""
echo "Happy deploying! 🚀"
