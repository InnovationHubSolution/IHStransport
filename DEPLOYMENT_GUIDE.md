# 🚀 Deployment Guide - IHStransport

This guide will help you deploy the beautified IHStransport application to your production server.

## 📋 Prerequisites

Before deploying, ensure your server has:
- ✅ Node.js (v16 or higher)
- ✅ PostgreSQL database
- ✅ Git installed
- ✅ nginx (for serving frontend on port 80)
- ✅ systemd (for running backend as a service)

## 🎯 Quick Deployment (Recommended)

If your server is already configured, use the enhanced deployment script:

```bash
# SSH into your production server
ssh your-user@your-server-ip

# Navigate to your app directory
cd /home/wantok/cashlesstransit  # or wherever your app is

# Pull and deploy everything
./deploy/deploy-full.sh

# Or with migrations
./deploy/deploy-full.sh --migrate
```

## 📖 Step-by-Step Deployment

### Step 1: SSH into Your Server

```bash
ssh your-user@your-server-ip
```

### Step 2: Navigate to Repository

```bash
cd /home/wantok/cashlesstransit
# or wherever your repository is located
```

### Step 3: Pull Latest Changes

The beautified UI changes have been pushed to GitHub. Pull them:

```bash
git pull origin main
```

You should see the updated files:
- `frontend/src/components/Layout.jsx`
- `frontend/src/index.css`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/Login.jsx`

### Step 4: Install Backend Dependencies

```bash
cd backend
npm install --production
cd ..
```

### Step 5: Build Frontend

```bash
cd frontend

# Install dependencies if not already installed
npm install

# Build for production
npm run build

# This creates the optimized frontend in frontend/dist/
cd ..
```

### Step 6: Run Migrations (if needed)

If there are database changes:

```bash
cd backend
npm run migrate:pg
cd ..
```

### Step 7: Restart Backend Service

```bash
sudo systemctl restart ihstransport-api

# Check status
sudo systemctl status ihstransport-api
```

### Step 8: Configure nginx (if not already done)

If you haven't set up nginx yet:

```bash
# Copy nginx config
sudo cp deploy/nginx-ihstransport.conf /etc/nginx/sites-available/ihstransport

# Create symlink
sudo ln -s /etc/nginx/sites-available/ihstransport /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Step 9: Verify Deployment

Test the backend API:
```bash
curl http://localhost:3001/health
```

Test the frontend:
```bash
curl http://localhost/
```

Access from browser:
```
http://your-server-ip
```

## 🔍 Troubleshooting

### Backend Not Starting

Check logs:
```bash
journalctl -u ihstransport-api -f
```

Check if port 3001 is in use:
```bash
sudo lsof -i :3001
```

### Frontend Not Loading

Check nginx status:
```bash
sudo systemctl status nginx
```

Check nginx error log:
```bash
sudo tail -f /var/log/nginx/error.log
```

Verify frontend build exists:
```bash
ls -la frontend/dist/
```

### Database Connection Issues

Check PostgreSQL is running:
```bash
sudo systemctl status postgresql
```

Test database connection:
```bash
cd backend
node -e "require('dotenv').config(); console.log(process.env.DB_HOST, process.env.DB_NAME);"
```

### Permission Issues

Ensure the deploy user owns the files:
```bash
sudo chown -R wantok:wantok /home/wantok/cashlesstransit
```

## 🎨 What's New in This Deployment

This deployment includes beautiful UI enhancements:

✨ **Modern Sidebar**
- Dark gradient background
- Collapsible navigation with smooth animations
- Hover effects with gradient accents
- User profile card with role badge

📊 **Enhanced Dashboard**
- Gradient stat cards with unique colors
- Animated card entries with staggered timing
- Hover effects with scale and shadow transformations
- Icon animations

🔐 **Stunning Login Page**
- Dark gradient background with floating decorative elements
- Modern card design with gradient top bar
- Enhanced form inputs with icons and focus states
- Beautiful error alerts

🎯 **Overall Improvements**
- Smooth animations throughout
- Consistent gradient color scheme
- Modern typography (Poppins & Inter fonts)
- Glass-morphism effects
- Custom scrollbar with gradient styling

## 📞 Support

If you encounter issues:

1. Check service status: `sudo systemctl status ihstransport-api`
2. View logs: `journalctl -u ihstransport-api -n 100`
3. Check nginx: `sudo nginx -t`
4. Verify build: `ls -la frontend/dist/`

## 🔄 Future Deployments

For future updates, simply:

```bash
cd /home/wantok/cashlesstransit
./deploy/deploy-full.sh
```

Or use the original script:
```bash
./deploy/deploy.sh          # Basic deployment
./deploy/deploy.sh --migrate  # With migrations
```

---

**🎉 Enjoy your beautified IHStransport system!**
