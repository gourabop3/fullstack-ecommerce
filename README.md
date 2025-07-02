# 🛒 Flipkart Clone - MERN Stack E-Commerce Platform

A complete **Flipkart-style e-commerce platform** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) featuring **Cloudinary** for image management, comprehensive product management, user authentication, shopping cart, wishlist, reviews, and payment integration.

## 🚀 Features

### 🛍️ **User Features**
- **🏠 Homepage** - Browse featured products, bestsellers, and categories
- **🔍 Advanced Search & Filters** - Search by name, filter by category, brand, price range, and ratings
- **📱 Product Details** - Detailed product pages with multiple images, specifications, reviews
- **⭐ Reviews & Ratings** - User reviews and rating system for products
- **🛒 Shopping Cart** - Add/remove items, adjust quantities, persistent cart
- **❤️ Wishlist** - Save favorite products for later
- **👤 User Profile** - Manage profile information, addresses, and order history
- **📦 Order Management** - Place orders, track order status, view order history
- **💳 Multiple Payment Options** - Stripe and Razorpay integration
- **📍 Address Management** - Multiple delivery addresses support

### 🔑 **Admin Features**
- **📊 Admin Dashboard** - Comprehensive overview of sales, orders, and products
- **📦 Product Management** - Add, edit, delete products with image upload
- **🏷️ Category Management** - Manage product categories and subcategories
- **📋 Order Management** - View all orders, update order status
- **👥 User Management** - View and manage user accounts
- **📈 Analytics** - Sales reports and product performance metrics

### 🎨 **Design Features**
- **📱 Responsive Design** - Mobile-first, fully responsive UI
- **🎨 Modern UI/UX** - Clean, intuitive Flipkart-inspired design
- **⚡ Fast Loading** - Optimized images and lazy loading
- **🌙 Theme Support** - Light theme with modern color schemes

## � Tech Stack

### **Frontend**
- **React.js** - Component-based UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Beautiful notifications
- **Vite** - Fast build tool and development server

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### **Cloud Services**
- **Cloudinary** - Image and video management
- **MongoDB Atlas** - Cloud database hosting

### **Payment Integration**
- **Stripe** - International payment processing
- **Razorpay** - Indian payment gateway

### **Authentication & Security**
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Validator** - Input validation

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Stripe/Razorpay accounts (for payments)

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/flipkart-clone.git
cd flipkart-clone
```

### **2. Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flipkart-clone

# JWT Secret
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

Start the backend server:
```bash
npm run server
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### **4. Admin Panel Setup**
```bash
cd admin
npm install
npm run dev
```

## 🌐 API Endpoints

### **Authentication**
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### **Products**
- `GET /api/product/list` - Get all products with filters
- `GET /api/product/featured` - Get featured products
- `GET /api/product/bestseller` - Get bestseller products
- `POST /api/product/single` - Get single product details
- `GET /api/product/related/:id` - Get related products
- `POST /api/product/review` - Add product review
- `GET /api/product/reviews/:id` - Get product reviews

### **User Management**
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/address` - Add user address
- `PUT /api/user/address/:id` - Update user address
- `DELETE /api/user/address/:id` - Delete user address

### **Wishlist**
- `POST /api/user/wishlist/add` - Add to wishlist
- `POST /api/user/wishlist/remove` - Remove from wishlist
- `GET /api/user/wishlist` - Get user wishlist

### **Cart & Orders**
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart
- `POST /api/cart/get` - Get user cart
- `POST /api/order/place` - Place order
- `POST /api/order/userorders` - Get user orders

## 📱 Screenshots

| Home Page | Product Details | Admin Dashboard |
|-----------|----------------|-----------------|
| ![Home](screenshots/home.png) | ![Product](screenshots/product.png) | ![Admin](screenshots/admin.png) |

## 🔧 Configuration

### **Cloudinary Setup**
1. Create a Cloudinary account
2. Get your cloud name, API key, and secret
3. Add them to your `.env` file

### **Payment Gateway Setup**
1. **Stripe**: Get test/live keys from Stripe dashboard
2. **Razorpay**: Get key ID and secret from Razorpay dashboard

### **MongoDB Setup**
1. Create a MongoDB Atlas cluster
2. Get the connection string
3. Add it to your `.env` file

## 📂 Project Structure
```
flipkart-clone/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── mongodb.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── Auth.js
│   │   ├── adminAuth.js
│   │   └── multer.js
│   ├── models/
│   │   ├── productModel.js
│   │   ├── userModel.js
│   │   └── orderModel.js
│   ├── routes/
│   │   ├── productRoute.js
│   │   ├── userRoute.js
│   │   ├── cartRoute.js
│   │   └── orderRoute.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── assets/
│   └── package.json
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── assets/
│   └── package.json
└── README.md
```

## 🚀 Deployment

### **Backend Deployment (Vercel/Heroku)**
1. Set up environment variables
2. Deploy backend to your preferred platform
3. Update frontend API URLs

### **Frontend Deployment (Vercel/Netlify)**
1. Build the frontend: `npm run build`
2. Deploy to your preferred platform
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Flipkart's design and functionality
- Built with modern web technologies
- Community contributions and feedback

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@flipkartclone.com

---

**⭐ If you found this project helpful, please give it a star!**
