# 🚀 Vercel Deployment Guide - Flipkart Clone

This guide will help you deploy your complete Flipkart clone to Vercel in production.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ **Vercel Account** - [Sign up here](https://vercel.com)
- ✅ **GitHub Repository** - Your code pushed to GitHub
- ✅ **MongoDB Atlas** - Cloud database setup
- ✅ **Cloudinary Account** - Image management service
- ✅ **Payment Gateway Accounts** - Stripe and/or Razorpay

## 🎯 Deployment Strategy

We'll deploy three separate applications:
1. **Backend API** → `your-api.vercel.app`
2. **Frontend (User)** → `your-app.vercel.app`
3. **Admin Panel** → `your-admin.vercel.app`

## 🔧 Step 1: Backend Deployment

### 1.1 Push Backend to GitHub
Ensure your backend code is in a GitHub repository.

### 1.2 Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository
4. Select the **`backend`** folder as the root directory
5. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

### 1.3 Environment Variables
Add these environment variables in Vercel dashboard:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flipkart-clone
JWT_SECRET=your_super_secret_jwt_key
ADMIN_EMAIL=admin@flipkart.com
ADMIN_PASSWORD=admin123
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
STRIPE_SECRET_KEY=sk_live_your_stripe_live_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NODE_ENV=production
```

### 1.4 Deploy
Click **"Deploy"** and wait for deployment to complete.
Your backend will be available at: `https://your-backend.vercel.app`

## 🎨 Step 2: Frontend Deployment

### 2.1 Update API URLs
First, we need to update the frontend to use the deployed backend URL.

<function_calls>
<invoke name="grep_search">
<parameter name="query">localhost:4000