# 🚀 Vercel Deployment Guide

## 📋 Prerequisites

- **Vercel account** - Sign up at [vercel.com](https://vercel.com)
- **GitHub repository** - Code đã push lên GitHub
- **Supabase production** - Database và authentication setup

## 🔧 Deployment Steps

### **Step 1: Connect GitHub Repository**

1. **Login to Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"

2. **Import Git Repository**
   - Select "Import Git Repository"
   - Choose your GitHub repository
   - Click "Import"

### **Step 2: Configure Project Settings**

**Framework Preset:** Next.js
**Root Directory:** `./` (default)
**Build Command:** `npm run build`
**Output Directory:** `.next` (auto-detected)

### **Step 3: Environment Variables**

Add these environment variables in Vercel Dashboard:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# JWT Configuration
JWT_SECRET=your_32_character_production_secret_key_here
JWT_EXPIRES_IN=1h
REFRESH_EXPIRES_IN=30d

# App Configuration
NEXT_PUBLIC_APP_NAME=TR Flashcard
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### **Step 4: Deploy**

1. **Click "Deploy"**
2. **Wait for build** (2-3 minutes)
3. **Get production URL** - `https://your-project.vercel.app`

## 🌐 **Post-Deployment Setup**

### **1. Test API Endpoints**

```bash
# Test authentication
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'

# Test Card API
curl -X GET https://your-project.vercel.app/api/cards \
  -H "Authorization: Bearer <access_token>"
```

### **2. Test i18n Routing**

- **Vietnamese**: `https://your-project.vercel.app/vi`
- **English**: `https://your-project.vercel.app/en`
- **Auto redirect**: `https://your-project.vercel.app/` → `/vi`

### **3. Test Admin Dashboard**

- **Login**: `https://your-project.vercel.app/vi/login`
- **Dashboard**: `https://your-project.vercel.app/vi/dashboard`
- **Members**: `https://your-project.vercel.app/vi/members`
- **Cards**: `https://your-project.vercel.app/vi/cards`

## 🔧 **Vercel CLI (Optional)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from local
vercel

# Deploy to production
vercel --prod
```

## 📊 **Monitoring & Analytics**

### **Vercel Dashboard Features:**
- **Deployments** - Build logs và deployment history
- **Analytics** - Traffic và performance metrics
- **Functions** - API routes monitoring
- **Domains** - Custom domain management

### **Environment Management:**
- **Development** - Auto-deploy từ `main` branch
- **Preview** - Auto-deploy từ feature branches
- **Production** - Manual deploy hoặc auto-deploy

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Build Failures**
   ```bash
   # Check build logs in Vercel Dashboard
   # Common fixes:
   - Update dependencies
   - Fix TypeScript errors
   - Check environment variables
   ```

2. **API Routes Not Working**
   ```bash
   # Check function logs
   # Verify environment variables
   # Test locally first
   ```

3. **i18n Routing Issues**
   ```bash
   # Check middleware.ts
   # Verify locale configuration
   # Test redirects
   ```

## 🎯 **Next Steps**

1. **Custom Domain** - Add your own domain
2. **SSL Certificate** - Automatic HTTPS
3. **Performance Optimization** - Vercel Analytics
4. **Monitoring** - Error tracking và alerts

---

**🎉 Congratulations! Your Next.js app is now live on Vercel!**
