#!/bin/bash

# Personal Health Manager Development Setup Script
# This script sets up the development environment for the PHM application

set -e

echo "🏥 Personal Health Manager - Development Setup"
echo "============================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please review and update the configuration."
else
    echo "✅ .env file already exists."
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/cache
mkdir -p database/init
mkdir -p logs
mkdir -p uploads

echo "✅ Directories created."

# Function to wait for database
wait_for_db() {
    echo "⏳ Waiting for database to be ready..."
    until docker-compose -f docker-compose.dev.yml exec -T postgres pg_isready -U postgres; do
        sleep 2
    done
    echo "✅ Database is ready."
}

# Function to initialize database
init_database() {
    echo "🗄️ Initializing database..."
    docker-compose -f docker-compose.dev.yml exec backend alembic upgrade head
    echo "✅ Database initialized."
}

# Main setup flow
echo ""
echo "🚀 Starting development environment setup..."

# Stop any existing containers
echo "🛑 Stopping any existing containers..."
docker-compose -f docker-compose.dev.yml down -v

# Build and start services
echo "🔨 Building and starting services..."
docker-compose -f docker-compose.dev.yml up -d --build

# Wait for database to be ready
wait_for_db

# Initialize database (will be implemented when Alembic is ready)
echo "📊 Database setup will be implemented in the next phase."

# Show status
echo ""
echo "📊 Development Environment Status:"
echo "=================================="
docker-compose -f docker-compose.dev.yml ps

echo ""
echo "🎉 Development environment setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Review and update .env file if needed"
echo "2. Wait for all services to be healthy (check status above)"
echo "3. Access applications:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo "   - API Documentation: http://localhost:8000/docs"
echo "   - MinIO Console: http://localhost:9001 (minioadmin/minioadmin123)"
echo ""
echo "📝 Development Commands:"
echo "   - Start: docker-compose -f docker-compose.dev.yml up -d"
echo "   - Stop: docker-compose -f docker-compose.dev.yml down"
echo "   - Logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "   - Rebuild: docker-compose -f docker-compose.dev.yml up -d --build"
echo ""
echo "🔄 To restart the environment: ./setup.sh"