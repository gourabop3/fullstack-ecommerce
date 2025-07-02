# 🚀 Flipkart Clone Setup Guide

This guide will help you set up and run the complete Flipkart clone on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account) - [Get Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

## 🔧 Required Accounts

You'll need accounts for the following services:
1. **MongoDB Atlas** (for database) - Free tier available
2. **Cloudinary** (for image uploads) - Free tier available
3. **Stripe** (for payments) - Test mode available
4. **Razorpay** (optional, for Indian payments) - Test mode available

## 🛠️ Step-by-Step Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd flipkart-clone
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Create environment file
Create a `.env` file in the `backend` directory and add your configuration:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Admin Credentials
ADMIN_EMAIL=admin@flipkart.com
ADMIN_PASSWORD=admin123

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Payment Gateways
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Server Configuration
PORT=4000
NODE_ENV=development
```

#### Seed the database with sample data
```bash
npm run seed
```

#### Start the backend server
```bash
npm run server
```

The backend will be running on `http://localhost:4000`

### 3. Frontend Setup

#### Open a new terminal and navigate to frontend directory
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Start the frontend development server
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

### 4. Admin Panel Setup

#### Open another terminal and navigate to admin directory
```bash
cd admin
```

#### Install dependencies
```bash
npm install
```

#### Start the admin development server
```bash
npm run dev
```

The admin panel will be running on `http://localhost:5174`

## 🔑 Getting API Keys

### MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier)
3. Get your connection string
4. Replace `<username>`, `<password>`, and `<cluster-url>` in your connection string

### Cloudinary
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret

### Stripe
1. Create account at [Stripe](https://stripe.com/)
2. Go to Developers > API Keys
3. Copy your Secret Key (use test key for development)

### Razorpay (Optional)
1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to Account & Settings > API Keys
3. Generate and copy your Key ID and Key Secret

## 🌐 Application URLs

- **Frontend (User)**: http://localhost:5173
- **Admin Panel**: http://localhost:5174
- **Backend API**: http://localhost:4000

## 👤 Default Admin Credentials

- **Email**: admin@flipkart.com
- **Password**: admin123

## 📝 Testing the Application

### User Flow:
1. Visit http://localhost:5173
2. Register a new user account
3. Browse products, add to cart
4. Add products to wishlist
5. Place an order
6. View order history

### Admin Flow:
1. Visit http://localhost:5174
2. Login with admin credentials
3. Add new products
4. Manage existing products
5. View and manage orders

## 🛠️ Development Commands

### Backend:
```bash
npm run server    # Start development server with nodemon
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Admin:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🚀 Production Deployment

### Backend (Vercel/Railway/Heroku):
1. Set up all environment variables
2. Deploy backend to your preferred platform
3. Update CORS settings for your frontend domain

### Frontend (Vercel/Netlify):
1. Update API endpoints in frontend to point to your deployed backend
2. Build and deploy frontend

### Database:
- MongoDB Atlas is already cloud-hosted
- Ensure your connection string uses the production database

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure backend CORS is configured for your frontend URL
   - Check if all URLs are correct

2. **Database Connection**:
   - Verify MongoDB URI is correct
   - Check if IP address is whitelisted in MongoDB Atlas

3. **Image Upload Issues**:
   - Verify Cloudinary credentials
   - Check if images are being uploaded to correct folder

4. **Payment Issues**:
   - Ensure you're using test keys for development
   - Check API key format and validity

### Port Conflicts:
If any port is already in use, you can change them:
- Backend: Change PORT in .env file
- Frontend: Modify vite.config.js
- Admin: Modify vite.config.js

## 📂 Project Structure Overview

```
flipkart-clone/
├── backend/          # Node.js/Express API
│   ├── config/       # Database & Cloudinary config
│   ├── controllers/  # API logic
│   ├── middleware/   # Auth & file upload
│   ├── models/       # Database schemas
│   ├── routes/       # API routes
│   ├── scripts/      # Utility scripts
│   └── server.js     # Main server file
├── frontend/         # React user interface
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── assets/
└── admin/           # React admin panel
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── assets/
```

## 🎯 Features Included

✅ User authentication & authorization  
✅ Product browsing with filters & search  
✅ Shopping cart functionality  
✅ Wishlist management  
✅ Order placement & tracking  
✅ Admin product management  
✅ Admin order management  
✅ Image upload with Cloudinary  
✅ Payment integration (Stripe & Razorpay)  
✅ Responsive design  
✅ Review & rating system  

## 🤝 Need Help?

If you encounter any issues:
1. Check this guide again
2. Verify all environment variables
3. Check console logs for errors
4. Ensure all services are running

---

**Happy coding! 🚀**