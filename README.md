# 🎯 Shaban Aly — Full-Stack Cybersecurity Portfolio

A professional **RTL Arabic** portfolio with admin dashboard, serverless backend, and database integration!

## 🚀 Quick Start

**Static site only (no backend):**
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

**Full-stack with Netlify Functions:**
```bash
npm install
npm run dev
# Visit: http://localhost:8000 (site + admin)
```

## ✨ Features

- ✅ **Admin Dashboard** — Manage projects & upload images
- ✅ **Cloudinary** — Image hosting & CDN
- ✅ **PostgreSQL (Neon)** — Database for projects
- ✅ **Netlify Functions** — Serverless backend
- ✅ **RTL Arabic** — Fully RTL optimized
- ✅ **Dark Theme** — Beautiful gradient design
- ✅ **Terminal Simulator** — Interactive Kali demo
- ✅ **Responsive** — Mobile, tablet, desktop
- ✅ **Zero-config Deploy** — Deploy to Netlify in 3 steps

## 📋 Setup Instructions

**Full guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

1. Create free accounts:
   - Cloudinary: https://cloudinary.com
   - Neon PostgreSQL: https://neon.tech
   - Netlify: https://netlify.com

2. Get credentials and run:
   ```bash
   psql "postgresql://user:pass@host/db" < sql/schema.sql
   npm install
   npm run dev
   ```

3. Deploy:
   - Option A: `zip portfolio.zip .` → drag to https://app.netlify.com/drop
   - Option B: Push to GitHub → connect to Netlify

4. Set environment variables in Netlify:
   ```
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   DATABASE_URL=postgresql://...
   ADMIN_PASSWORD=your_secure_password
   ```

5. Access admin: `/admin/` (login with password)

## 📦 What's Included

| Component | Location | Purpose |
|-----------|----------|---------|
| **Homepage** | `index.html` | Portfolio showcase (auto-loads projects) |
| **Admin Panel** | `admin/index.html` | Manage projects & images (RTL, password protected) |
| **Backend API** | `netlify/functions/` | Serverless Node.js functions |
| **Database Schema** | `sql/schema.sql` | PostgreSQL tables |
| **Styling** | `styles.css` | Dark theme, RTL optimized |
| **Animations** | `animations.js` | GSAP + particles + Lottie |
| **Terminal Demo** | `terminal.js` | Interactive Kali simulator |

## 🎮 Admin Dashboard Usage

1. **Login** → `/admin/` with password
2. **Upload Images** → Select image → Auto-upload to Cloudinary → URL copied!
3. **Add Projects** → Title + Description + Image URL → Instantly appears on homepage
4. **Manage Projects** → View all → Delete any project
5. **All in Arabic** → Full RTL interface 🇸🇦

## 🔌 API Endpoints

```bash
# Get all projects
curl GET /.netlify/functions/projects-crud?method=GET

# Add project
curl POST /.netlify/functions/projects-crud?method=POST -d '{...}'

# Delete project
curl DELETE /.netlify/functions/projects-crud?method=DELETE&id=1

# Upload image
curl POST /.netlify/functions/upload-image -F "file=@image.jpg"
```

## 📚 Documentation

- **Full deployment guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Setup checklist:** [setup-checklist.sh](./setup-checklist.sh)
- **Database schema:** [sql/schema.sql](./sql/schema.sql)

## 🎨 Customization

- **Colors:** Edit `:root` in `styles.css`
- **Admin password:** Set `ADMIN_PASSWORD` env var
- **Portfolio text:** Edit `.html` files
- **Terminal commands:** Edit `terminal.js`

## 🔒 Security

- ✅ Password-protected admin
- ✅ Database encryption (SSL/TLS)
- ✅ CORS configured
- ⚠️ Change default admin password!

## 📂 Project Structure

```
mywebsite/
├── index.html                 # Homepage (dynamic projects)
├── admin/
│   ├── index.html             # Admin panel
│   └── config.js              # API config
├── netlify/functions/
│   ├── upload-image.js        # Cloudinary upload
│   └── projects-crud.js       # GET/POST/DELETE
├── sql/schema.sql             # Database
├── styles.css                 # Styling
├── animations.js              # Animations
├── terminal.js                # Terminal sim
├── package.json               # Dependencies
└── README.md                  # This file
```

## ⚡ Next Steps

1. ✅ Create accounts (Cloudinary, Neon, Netlify)
2. ✅ Get credentials
3. ✅ Run `npm install && npm run dev`
4. ✅ Test at http://localhost:8000
5. ✅ Deploy to Netlify
6. ✅ Set environment variables
7. ✅ Access `/admin/` and add projects!

## 📝 License

MIT — Free to use and modify!

---

**Built with ❤️ for Shaban Aly**

Cybersecurity Portfolio | November 2025
