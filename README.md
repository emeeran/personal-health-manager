# Personal Health Manager

A comprehensive medical records management system with AI-powered health insights.

## Development Setup

### Prerequisites
- Docker and Docker Compose
- Git
- Make (optional, for using make commands)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-health-manager
   ```

2. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development environment**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

4. **Initialize database**
   ```bash
   # This will be automated once backend is created
   docker-compose -f docker-compose.dev.yml exec backend alembic upgrade head
   ```

5. **Access applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
   - MinIO Console: http://localhost:9001 (minioadmin/minioadmin123)

### Development Commands

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop all services
docker-compose -f docker-compose.dev.yml down

# Rebuild backend
docker-compose -f docker-compose.dev.yml up -d --build backend

# Access backend container
docker-compose -f docker-compose.dev.yml exec backend bash

# Access frontend container
docker-compose -f docker-compose.dev.yml exec frontend bash

# Reset database (WARNING: deletes all data)
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d postgres
# Wait for postgres to be healthy, then run migrations
```

### Services Overview

- **PostgreSQL**: Primary database on port 5432
- **Redis**: Cache and message broker on port 6379
- **MinIO**: Object storage on ports 9000 (API) and 9001 (Console)
- **Backend**: FastAPI application on port 8000
- **Frontend**: React application on port 3000
- **Celery Worker**: Background job processing

### Project Structure

```
personal-health-manager/
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── main.py         # FastAPI app entry
│   ├── alembic/            # Database migrations
│   ├── tests/              # Backend tests
│   └── requirements.txt    # Python dependencies
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json        # Node.js dependencies
├── database/               # Database scripts
├── docs/                   # Documentation
├── docker-compose.dev.yml  # Development environment
├── .env.example           # Environment template
└── README.md              # This file
```

### Development Workflow

1. **Backend Development**
   - Make changes to backend code
   - Backend auto-reloads with Docker volume mounts
   - Access API docs at http://localhost:8000/docs

2. **Frontend Development**
   - Make changes to frontend code
   - Frontend hot-reloads with Docker volume mounts
   - Access React app at http://localhost:3000

3. **Database Changes**
   - Create migration: `alembic revision --autogenerate -m "description"`
   - Apply migration: `alembic upgrade head`

### Testing

```bash
# Backend tests
docker-compose -f docker-compose.dev.yml exec backend pytest

# Frontend tests
docker-compose -f docker-compose.dev.yml exec frontend npm test
```

### Troubleshooting

**Port conflicts**: Ensure ports 3000, 5432, 6379, 8000, 9000, 9001 are available

**Permission issues**: If you get permission errors, ensure Docker has proper access to the project directory

**Database connection**: If backend can't connect to database, ensure postgres container is healthy:
```bash
docker-compose -f docker-compose.dev.yml ps postgres
```

**MinIO access**: If you can't access MinIO console, wait a minute for the service to fully start

## Architecture

This application uses a modern microservices architecture:

- **Backend**: FastAPI with async/await for high performance
- **Frontend**: React with TypeScript for type safety
- **Database**: PostgreSQL with async SQLAlchemy
- **Cache**: Redis for session management and caching
- **Storage**: MinIO for document storage
- **Background Jobs**: Celery for OCR processing and report generation
- **AI Integration**: LangChain for medical AI assistant

## Security Notes

- Never commit `.env` files to version control
- Change default passwords in production
- Use HTTPS in production
- Implement proper authentication and authorization
- Follow HIPAA compliance guidelines for medical data

## Contributing

1. Follow the established code style
2. Write tests for new features
3. Update documentation
4. Ensure all tests pass before submitting PRs

## License

[Your License Here]