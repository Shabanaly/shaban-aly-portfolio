# 🎯 Shaban Aly — Full-Stack Cybersecurity Portfolio

A professional RTL Arabic portfolio for **Shaban Aly** (cybersecurity student) with:
- ✅ **Static Portfolio** — Hero, projects, skills, terminal simulation
- ✅ **Admin Dashboard** — RTL interface for managing projects and uploading images
- ✅ **Netlify Functions** — Serverless backend (Node.js)
- ✅ **Cloudinary** — Image hosting and CDN
- ✅ **Neon PostgreSQL** — Database for projects and images

---

## 🚀 Quick Start

### Local Development (Static Site)
```bash
cd /home/shaban/Desktop/mywebsite
python3 -m http.server 8000
```
Visit: `http://localhost:8000`

### Local Development (with Netlify Functions)
```bash
npm install
npm run dev
```
This starts both the static site and Netlify dev server on `http://localhost:8000` and functions on `http://localhost:8888`.

---

## 📂 Project Structure

```
mywebsite/
├── index.html                 # Main portfolio homepage (RTL)
├── about.html                 # About page
├── projects.html              # Projects showcase page
├── projects/
│   └── project1.html          # Individual project page
├── skills.html                # Skills & tools page
├── contact.html               # Contact form page
├── labs.html                  # Labs/articles page
│
├── styles.css                 # Global styles (dark theme)
├── script.js                  # Helper scripts
├── animations.js              # GSAP + tsparticles + Lottie config
├── terminal.js                # Kali terminal simulator
│
├── assets/
│   ├── my_image.jpg           # Personal avatar image
│   ├── kali-placeholder.svg   # Kali Linux logo
│   └── README_IMAGES.md       # Image guidelines
│
├── admin/
│   ├── index.html             # Admin dashboard (RTL, login protected)
│   ├── config.js              # Admin API configuration
│   └── admin.js               # Admin JS (compiled into HTML)
│
├── netlify/
│   └── functions/
│       ├── upload-image.js    # Upload to Cloudinary + save to DB
│       └── projects-crud.js   # GET/POST/DELETE projects
│
├── sql/
│   └── schema.sql             # PostgreSQL schema
│
├── netlify.toml               # Netlify build & dev config
├── package.json               # Node dependencies
├── _headers                   # HTTP headers (CORS, Content-Type)
├── _redirects                 # URL redirects (SPA routing)
└── README.md                  # This file
```

---

## 🔧 Setup Instructions

### Step 1: Prepare Cloudinary

1. **Create Account:** https://cloudinary.com
2. **Get Credentials:**
   - Cloud Name (visible in dashboard)
   - API Key & API Secret (in Account Settings)

### Step 2: Prepare Neon PostgreSQL

1. **Create Account:** https://neon.tech
2. **Create Project** (e.g., "portfolio")
3. **Get Connection String:** `postgresql://user:password@host/dbname`
4. **Run Schema:**
   ```bash
   # Copy the connection string and run in psql or Neon console:
   psql "postgresql://user:password@host/dbname" < sql/schema.sql
   ```

### Step 3: Deploy to Netlify

#### Option A: Manual Upload (Quickest)
1. Zip the entire `mywebsite` folder
2. Go to https://app.netlify.com/drop
3. Drag & drop the ZIP file
4. ✅ Site deployed instantly!

#### Option B: Git + Netlify (Recommended)
1. Push project to GitHub
2. Connect to Netlify: https://app.netlify.com/start
3. Select GitHub repo, authorize
4. Build settings:
   - **Publish directory:** `/`
   - **Functions directory:** `netlify/functions`
   - **Build command:** `(leave empty)`
5. Click **Deploy**

### Step 4: Set Environment Variables

After deploying, go to **Site Settings → Build & deploy → Environment**

Add these environment variables:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DATABASE_URL=postgresql://user:password@host/dbname
ADMIN_PASSWORD=choose_a_secure_password
```

### Step 5: Update Admin Password

⚠️ **IMPORTANT:** The default password in `admin/config.js` is `shaban123`.
After setting the `ADMIN_PASSWORD` environment variable, it will use that instead.

---

## 🎮 Using the Admin Dashboard

### Access
- **Local:** `http://localhost:8000/admin/`
- **Production:** `https://YOUR_NETLIFY_SITE.netlify.app/admin/`

### Features

**1. 📤 Upload Image**
- Select or drag an image
- Auto-uploads to Cloudinary
- URL is copied to clipboard automatically
- Saved to `images` table

**2. ➕ Add Project**
- Title, description, image URL, link
- Saves to `projects` table
- Instantly appears on homepage

**3. 📋 Manage Projects**
- View all projects
- Delete projects
- Changes reflected live on homepage

---

## 🗄️ Database Schema

### `images` Table
```sql
id        SERIAL PRIMARY KEY
url       TEXT (Cloudinary URL)
filename  TEXT
created_at TIMESTAMP
```

### `projects` Table
```sql
id          SERIAL PRIMARY KEY
title       VARCHAR(255)
description TEXT
image       TEXT (image URL)
link        TEXT (optional)
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

---

## 🔌 API Endpoints

All functions are at `/.netlify/functions/`

### Upload Image
```
POST /.netlify/functions/upload-image
Content-Type: multipart/form-data
file: <binary>

Response:
{
  "success": true,
  "url": "https://res.cloudinary.com/..."
}
```

### Get Projects
```
GET /.netlify/functions/projects-crud?method=GET

Response:
{
  "success": true,
  "projects": [
    {
      "id": 1,
      "title": "Nmap Lab",
      "description": "...",
      "image": "...",
      "link": "...",
      "created_at": "2025-11-18T..."
    }
  ]
}
```

### Add Project
```
POST /.netlify/functions/projects-crud?method=POST
Content-Type: application/json

{
  "title": "Project Title",
  "description": "Short description",
  "image": "https://res.cloudinary.com/...",
  "link": "https://github.com/..."
}

Response:
{
  "success": true,
  "projectId": 1
}
```

### Delete Project
```
DELETE /.netlify/functions/projects-crud?method=DELETE&id=1

Response:
{
  "success": true,
  "message": "Project deleted"
}
```

---

## 🎨 Customization

### Change Admin Password
Edit `admin/config.js` or set `ADMIN_PASSWORD` in Netlify env vars.

### Update Portfolio Content
- **Hero text:** `index.html` line ~30
- **About:** `about.html`
- **Skills:** `skills.html` + `index.html` social links
- **Contact:** `contact.html`

### Modify Styling
- **Colors:** Edit CSS variables in `styles.css` (`:root`)
- **Fonts:** Default is "Noto Sans Arabic" (RTL friendly)
- **Dark theme:** Built-in, dark blue gradient background

### Terminal Commands
Edit `terminal.js` `script` array to add custom Kali commands.

---

## 🔒 Security Notes

1. **Admin Password:** Change immediately after deployment!
2. **Cloudinary:** Use unsigned uploads in production or add signed auth.
3. **Database:** Neon provides SSL by default ✅
4. **CORS:** Configured in `_headers` for API access
5. **File Access:** `_headers` prevents direct JS/CSS download

### To Restrict CSS/JS Access
```
# In _headers:
/*.js
  Content-Type: application/octet-stream

/*.css
  Content-Type: application/octet-stream
```

---

## 🚨 Troubleshooting

### Functions Not Running
- Ensure `netlify/functions/` folder exists
- Check `netlify.toml` points to correct functions directory
- Restart `netlify dev`

### Projects Not Loading
- Verify `DATABASE_URL` is correct in Netlify env vars
- Check database schema exists: `SELECT * FROM projects;`
- Check browser console for errors

### Cloudinary Upload Fails
- Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Test upload in Cloudinary dashboard first
- Check file size (max 100MB free tier)

### Admin Login Fails
- Default password: `shaban123`
- Or check `ADMIN_PASSWORD` env var is set correctly
- Clear browser localStorage: `localStorage.clear()`

---

## 📦 Dependencies

### Frontend
- GSAP (animations)
- tsparticles (particle effects)
- Lottie (micro-animations)
- Simple Icons (CDN)

### Backend (Netlify Functions)
- `pg` — PostgreSQL client
- `cloudinary` — Image hosting SDK

---

## 📝 Next Steps

1. ✅ Modify admin password
2. ✅ Add your first projects via admin panel
3. ✅ Customize portfolio text & colors
4. ✅ Set up custom domain
5. ✅ Enable SSL (Netlify auto-enables)
6. ✅ Add analytics (Google Analytics, Plausible)

---

## 🎓 Learning Resources

- **Netlify Functions:** https://docs.netlify.com/functions/overview/
- **Cloudinary:** https://cloudinary.com/documentation
- **Neon PostgreSQL:** https://neon.tech/docs
- **Netlify Deploy:** https://docs.netlify.com/site-deploys/overview/

---

## 📄 License

MIT — Feel free to use, modify, and deploy!

---

## 🤝 Support

For issues or questions:
- Check browser console for errors
- Verify all env vars in Netlify
- Test DB connection manually
- Check Netlify function logs: **Site > Functions > Logs**

---

**Built with ❤️ for Shaban Aly — Cybersecurity Portfolio**

Last updated: November 18, 2025
