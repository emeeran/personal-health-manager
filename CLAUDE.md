# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Personal Health Manager (PHM)** application blueprint - a comprehensive medical records management system. The current repository contains the technical specification document only.

**Current State**: The repository contains only the blueprint document (`personal_health_manager_blueprint.md`). No actual application code has been implemented yet.

## Technology Stack (From Blueprint)

**Backend:**
- FastAPI 0.115+ (Python web framework)
- PostgreSQL 16 (Database with JSONB support)
- SQLAlchemy 2.0+ (Async ORM)
- Redis 7+ (Caching and session management)
- Celery (Background job processing)
- Tesseract 5 (OCR processing)
- LangChain (AI integration)
- MinIO/S3 (File storage)

**Frontend:**
- React 18+ (UI framework)
- TypeScript 5+ (Type safety)
- Redux Toolkit (State management)
- Material-UI v5 (UI components)
- Recharts + D3.js (Data visualization)
- React Hook Form (Forms)
- Axios + React Query (HTTP client)

**DevOps:**
- Docker + Docker Compose (Containerization)
- Nginx (Reverse proxy)
- Prometheus + Grafana (Monitoring)
- GitHub Actions (CI/CD)

## Application Architecture

The planned system follows a 3-tier architecture:

1. **Client Layer**: React frontend with TypeScript and Redux for state management
2. **API Gateway**: FastAPI application server with authentication, routing, and WebSocket support
3. **Service Layer**: Specialized services for OCR, AI processing, and health analytics
4. **Data Layer**: PostgreSQL database, Redis cache, and object storage for documents

## Key Features (Planned)

- **Multi-user family health management** with profile switching
- **Medical records timeline** with visit tracking and document management
- **OCR processing** for medical documents and lab reports
- **AI health assistant** with contextual medical information
- **Health metrics visualization** including HbA1c trends and chronic conditions tracking
- **Medication management** with interaction checking
- **Data export** capabilities (PDF/CSV reports)

## Database Schema (Planned)

Key tables include:
- `users` and `profiles` for user management
- `medical_visits` for visit records
- `documents` for file storage with OCR processing
- `medications` for tracking current/past medications
- `lab_results` for storing test values and trends

## Security Considerations

The blueprint emphasizes:
- End-to-end encryption (TLS 1.3 transit, AES-256 at rest)
- HIPAA compliance measures
- Role-based access control and audit logging
- JWT-based authentication with MFA support

## Development Environment Setup (Planned)

The blueprint outlines Docker Compose setup for:
- PostgreSQL database
- Redis cache
- MinIO object storage
- FastAPI backend
- React frontend
- Nginx reverse proxy

## Implementation Notes

Since this repository currently contains only the specification document:

1. **No build commands exist yet** - the application hasn't been implemented
2. **The blueprint serves as a guide** for the planned implementation
3. **All code examples in the blueprint** are illustrative and not functional
4. **Following the blueprint's roadmap** would be necessary to create the actual application

## Next Steps for Implementation

If implementing this application:
1. Set up the development environment using the Docker configurations
2. Follow the 14-week implementation roadmap from the blueprint
3. Start with Phase 1 (Foundation): basic FastAPI setup, database schema, and authentication
4. Implement core features progressively through the outlined phases
5. Ensure comprehensive testing and security measures as specified

## Document Location

The complete technical specification is available in `personal_health_manager_blueprint.md`.