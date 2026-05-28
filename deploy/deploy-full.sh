#!/usr/bin/env bash
# Full deployment script for IHStransport (Backend + Frontend)
# Usage: ./deploy/deploy-full.sh [--migrate] [--skip-frontend]
# Run from repo root or with REPO_ROOT set.

set -e

# Configuration - adjust these for your server
REPO_ROOT="${REPO_ROOT:-$(pwd)}"
DEPLOY_USER="${DEPLOY_USER:-wantok}"
SERVICE_NAME="ihstransport-api"
FRONTEND_BUILD="${FRONTEND_BUILD:-true}"

echo "========================================="
echo "🚀 IHStransport Full Deployment"
echo "========================================="
echo "Repository: $REPO_ROOT"
echo "Deploy User: $DEPLOY_USER"
echo "Service: $SERVICE_NAME"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "backend" ]; then
    echo "❌ Error: Not in the repository root"
    echo "Current directory: $(pwd)"
    exit 1
fi

cd "$REPO_ROOT"

# Step 1: Git Pull
echo "📥 Step 1: Pulling latest changes from GitHub..."
git pull origin main || {
    echo "❌ Git pull failed. Please check your git configuration."
    exit 1
}
echo "✅ Code updated"
echo ""

# Step 2: Backend Installation
echo "🔧 Step 2: Installing backend dependencies..."
cd backend
npm install --production || {
    echo "❌ Backend npm install failed"
    exit 1
}
cd ..
echo "✅ Backend dependencies installed"
echo ""

# Step 3: Database Migration (if requested)
if [[ "$1" == "--migrate" || "$2" == "--migrate" ]]; then
    echo "🗄️  Step 3: Running database migrations..."
    cd backend
    npm run migrate:pg || {
        echo "⚠️  Migration failed. Continuing anyway..."
    }
    cd ..
    echo "✅ Migrations completed"
    echo ""
else
    echo "⏭️  Step 3: Skipping migrations (use --migrate to run them)"
    echo ""
fi

# Step 4: Frontend Build (if not skipped)
if [[ "$1" != "--skip-frontend" && "$2" != "--skip-frontend" && "$FRONTEND_BUILD" == "true" ]]; then
    echo "🎨 Step 4: Building frontend for production..."
    cd frontend
    
    # Check if node_modules exists, if not install
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing frontend dependencies first..."
        npm install || {
            echo "❌ Frontend npm install failed"
            exit 1
        }
    fi
    
    # Build the frontend
    npm run build || {
        echo "❌ Frontend build failed"
        exit 1
    }
    cd ..
    echo "✅ Frontend built successfully (dist/ folder created)"
    echo ""
else
    echo "⏭️  Step 4: Skipping frontend build (use --skip-frontend to skip)"
    echo ""
fi

# Step 5: Restart Backend Service
echo "🔄 Step 5: Restarting backend service..."
if sudo systemctl restart "$SERVICE_NAME" 2>/dev/null; then
    echo "✅ Service $SERVICE_NAME restarted"
else
    echo "⚠️  Could not restart service. You may need to do this manually:"
    echo "   sudo systemctl restart $SERVICE_NAME"
fi
echo ""

# Step 6: Check Service Status
echo "📊 Step 6: Checking service status..."
sudo systemctl status "$SERVICE_NAME" --no-pager || true
echo ""

# Step 7: Summary
echo "========================================="
echo "✅ Deployment Complete!"
echo "========================================="
echo ""
echo "📝 Next Steps:"
echo "1. Check the backend API: curl http://localhost:3001/health"
echo "2. If using nginx, the frontend is served from: $REPO_ROOT/frontend/dist"
echo "3. View logs: journalctl -u $SERVICE_NAME -f"
echo ""
echo "🌐 Access your application:"
echo "   - Frontend: http://your-server-ip (if nginx configured)"
echo "   - API: http://your-server-ip/api/"
echo ""
