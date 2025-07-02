#!/bin/bash

echo "🚀 Starting Flipkart Clone Application..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Function to check if .env exists
check_env_file() {
    if [ ! -f "backend/.env" ]; then
        echo "❌ Environment file (.env) not found in backend directory!"
        echo "📝 Please create backend/.env file with required variables."
        echo "📖 Check backend/.env.example for reference."
        exit 1
    fi
}

# Function to install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    
    # Backend dependencies
    echo "🔧 Installing backend dependencies..."
    cd backend && npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install backend dependencies"
        exit 1
    fi
    cd ..
    
    # Frontend dependencies
    echo "🎨 Installing frontend dependencies..."
    cd frontend && npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install frontend dependencies"
        exit 1
    fi
    cd ..
    
    # Admin dependencies
    echo "⚙️ Installing admin dependencies..."
    cd admin && npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install admin dependencies"
        exit 1
    fi
    cd ..
    
    echo "✅ All dependencies installed successfully!"
}

# Function to start all services
start_services() {
    echo "🚀 Starting all services..."
    
    # Start backend in background
    echo "🔧 Starting backend server on port 4000..."
    cd backend
    npm run server &
    BACKEND_PID=$!
    cd ..
    
    # Wait a moment for backend to start
    sleep 3
    
    # Start frontend in background
    echo "🎨 Starting frontend server on port 5173..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    # Wait a moment
    sleep 3
    
    # Start admin panel in background
    echo "⚙️ Starting admin panel on port 5174..."
    cd admin
    npm run dev &
    ADMIN_PID=$!
    cd ..
    
    echo ""
    echo "🎉 All services are starting up!"
    echo "=================================="
    echo "🌐 Frontend (User):  http://localhost:5173"
    echo "🛠️  Admin Panel:     http://localhost:5174"  
    echo "🔧 Backend API:      http://localhost:4000"
    echo "=================================="
    echo ""
    echo "👤 Default Admin Credentials:"
    echo "   Email: admin@flipkart.com"
    echo "   Password: admin123"
    echo ""
    echo "Press Ctrl+C to stop all services"
    echo ""
    
    # Wait for any process to exit
    wait
}

# Function to seed database
seed_database() {
    echo "🌱 Seeding database with sample data..."
    cd backend
    npm run seed
    if [ $? -eq 0 ]; then
        echo "✅ Database seeded successfully!"
    else
        echo "⚠️ Database seeding failed. You may need to check your MongoDB connection."
    fi
    cd ..
}

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    if [ ! -z "$ADMIN_PID" ]; then
        kill $ADMIN_PID 2>/dev/null
    fi
    echo "👋 All services stopped. Goodbye!"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Main execution
echo "🔍 Checking prerequisites..."

# Check for .env file
check_env_file

echo "✅ Environment file found!"

# Ask user if they want to install dependencies
read -p "📦 Do you want to install/update dependencies? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    install_dependencies
fi

# Ask user if they want to seed the database
read -p "🌱 Do you want to seed the database with sample data? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    seed_database
fi

# Start all services
start_services