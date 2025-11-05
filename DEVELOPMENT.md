# Personal Health Manager - Development Guide

## Current Development Status

### ✅ Completed (Phase 0 - Foundation)
- [x] Docker development environment setup
- [x] FastAPI project structure with async configuration
- [x] React TypeScript project with Redux Toolkit
- [x] Database models for all 6 core tables
- [x] Basic API route structure
- [x] Frontend routing and layout components
- [x] Redux store with authentication and UI state management

### 🚧 In Progress (Phase 1 - Core Features)
- [ ] Database migrations and initialization
- [ ] JWT authentication system implementation
- [ ] API endpoint implementations
- [ ] Frontend authentication forms
- [ ] Basic CRUD operations for profiles and visits

### 📋 Planned Implementation Order

#### Week 1-2: Authentication & Profiles
1. **Database Setup**
   - Initialize Alembic migrations
   - Create database tables
   - Seed initial data

2. **Authentication Backend**
   - User registration and login
   - JWT token generation and refresh
   - Password hashing and verification
   - Email verification (optional for MVP)

3. **Authentication Frontend**
   - Login and registration forms
   - Protected routes
   - Token management
   - User session handling

4. **Profile Management**
   - Create, read, update profiles
   - Profile selection and switching
   - Family member management

#### Week 3-4: Medical Records
1. **Medical Visits**
   - CRUD operations for medical visits
   - Visit forms and validation
   - Medical history timeline

2. **Document Management**
   - File upload functionality
   - MinIO integration
   - Document categorization
   - Basic document viewer

#### Week 5-6: Advanced Features
1. **OCR Processing**
   - Tesseract integration
   - Background processing with Celery
   - Text extraction and storage

2. **Medications Management**
   - Medication tracking
   - Dosage and schedule management
   - Refill reminders

## Development Workflow

### 1. Environment Setup
```bash
# Clone the repository
git clone <repository-url>
cd personal-health-manager

# Run the setup script
./setup.sh

# Or manual setup:
cp .env.example .env
docker-compose -f docker-compose.dev.yml up -d --build
```

### 2. Development Commands
```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Restart specific service
docker-compose -f docker-compose.dev.yml restart backend

# Access containers
docker-compose -f docker-compose.dev.yml exec backend bash
docker-compose -f docker-compose.dev.yml exec frontend bash

# Stop all services
docker-compose -f docker-compose.dev.yml down

# Clean up (removes volumes)
docker-compose -f docker-compose.dev.yml down -v
```

### 3. Database Operations
```bash
# Create new migration
docker-compose -f docker-compose.dev.yml exec backend alembic revision --autogenerate -m "description"

# Apply migrations
docker-compose -f docker-compose.dev.yml exec backend alembic upgrade head

# Check current migration
docker-compose -f docker-compose.dev.yml exec backend alembic current

# Downgrade migration
docker-compose -f docker-compose.dev.yml exec backend alembic downgrade -1
```

### 4. Testing
```bash
# Backend tests
docker-compose -f docker-compose.dev.yml exec backend pytest

# Frontend tests
docker-compose -f docker-compose.dev.yml exec frontend npm test

# Type checking
docker-compose -f docker-compose.dev.yml exec frontend npm run type-check

# Linting
docker-compose -f docker-compose.dev.yml exec frontend npm run lint
```

## Architecture Overview

### Backend (FastAPI)
```
backend/
├── app/
│   ├── api/              # API routes
│   ├── core/             # Configuration and security
│   ├── models/           # SQLAlchemy models
│   ├── services/         # Business logic
│   ├── tasks/            # Celery background tasks
│   └── main.py           # FastAPI application
├── alembic/              # Database migrations
├── tests/                # Backend tests
└── requirements.txt      # Python dependencies
```

### Frontend (React + TypeScript)
```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── store/            # Redux store and slices
│   ├── services/         # API service layer
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── public/               # Static assets
└── package.json          # Node.js dependencies
```

### Database Schema
The application uses 6 core tables:
1. **users** - Authentication and user accounts
2. **profiles** - Patient profiles and demographics
3. **medical_visits** - Medical encounter records
4. **documents** - Medical documents and files
5. **medications** - Medication tracking
6. **lab_results** - Lab test results

## API Design

### Authentication Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - User logout

### Profile Endpoints
- `GET /api/v1/profiles` - List user profiles
- `POST /api/v1/profiles` - Create new profile
- `GET /api/v1/profiles/{id}` - Get specific profile
- `PUT /api/v1/profiles/{id}` - Update profile
- `DELETE /api/v1/profiles/{id}` - Delete profile

### Medical Visits Endpoints
- `GET /api/v1/visits` - List medical visits
- `POST /api/v1/visits` - Create new visit
- `GET /api/v1/visits/{id}` - Get specific visit
- `PUT /api/v1/visits/{id}` - Update visit
- `DELETE /api/v1/visits/{id}` - Delete visit

## Technology Stack

### Backend
- **FastAPI** - Modern web framework for building APIs
- **PostgreSQL** - Primary database with JSONB support
- **SQLAlchemy** - Async ORM for database operations
- **Alembic** - Database migration tool
- **Redis** - Caching and session management
- **Celery** - Background task processing
- **MinIO** - Object storage for documents
- **Pydantic** - Data validation and serialization
- **JWT** - Authentication tokens

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **React Hook Form** - Form handling
- **Recharts** - Data visualization

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline

## Development Tips

### Code Style
- Backend: Follow PEP 8 with Black formatting
- Frontend: Prettier with ESLint configuration
- Use TypeScript for type safety
- Write meaningful commit messages

### Database Development
- Use Alembic for all database changes
- Review generated migrations before applying
- Use descriptive column and table names
- Add appropriate indexes for performance

### API Development
- Use Pydantic models for request/response validation
- Include proper error handling and logging
- Follow RESTful conventions
- Document endpoints with FastAPI's auto-docs

### Frontend Development
- Use TypeScript interfaces for API responses
- Implement proper loading and error states
- Follow Material-UI design principles
- Use Redux Toolkit for state management

### Testing Strategy
- Write unit tests for business logic
- Use integration tests for API endpoints
- Test frontend components with React Testing Library
- Implement E2E tests for critical user flows

## Troubleshooting

### Common Issues
1. **Database connection errors**
   - Check if PostgreSQL container is healthy
   - Verify DATABASE_URL in .env file
   - Ensure network connectivity between containers

2. **Frontend build errors**
   - Clear node_modules: `docker-compose exec frontend rm -rf node_modules`
   - Reinstall dependencies: `docker-compose exec frontend npm install`
   - Check for TypeScript errors

3. **Authentication issues**
   - Verify JWT secret key is consistent
   - Check token expiration times
   - Ensure CORS configuration is correct

4. **File upload issues**
   - Check MinIO container status
   - Verify bucket permissions
   - Check file size limits

### Health Checks
```bash
# Check service status
docker-compose -f docker-compose.dev.yml ps

# Check container logs
docker-compose -f docker-compose.dev.yml logs [service-name]

# Test API endpoints
curl http://localhost:8000/health

# Access MinIO console
open http://localhost:9001
```

## Production Considerations

### Security
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs
- Use environment variables for secrets
- Implement proper logging and monitoring

### Performance
- Add database indexes
- Implement caching strategies
- Optimize image sizes
- Use CDN for static assets

### Scalability
- Use load balancers
- Implement horizontal scaling
- Use managed database services
- Implement proper backup strategies

## Next Steps

1. **Immediate (This Week)**
   - Complete database migrations
   - Implement authentication backend
   - Create login/register forms
   - Test basic user flow

2. **Short Term (Next 2 Weeks)**
   - Implement profile management
   - Create medical visit forms
   - Add document upload functionality

3. **Medium Term (Next Month)**
   - Implement OCR processing
   - Add medication tracking
   - Create basic dashboard visualizations

4. **Long Term (Next 2-3 Months)**
   - AI health assistant integration
   - Advanced analytics
   - Mobile responsiveness
   - Production deployment