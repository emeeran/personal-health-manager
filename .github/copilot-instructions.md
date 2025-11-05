## Purpose

This file guides AI coding agents (and contributors) to be productive in this repository. It focuses on the concrete, discoverable patterns from the project's blueprint (`personal_health_manager_blueprint.md`) and lists the commands and locations an agent should consult or modify.

## Big-picture (what to know first)

- Architecture: single FastAPI backend (async, SQLAlchemy 2.0), React + TypeScript frontend (Redux Toolkit), Celery background workers, PostgreSQL, Redis, and S3/MinIO for storage — see `personal_health_manager_blueprint.md` for the full diagram.
- Key code roots (examples referenced in the blueprint): `backend/app/` (FastAPI app; look for `app/main.py`), `backend/app/services/` (OCR, AI), `frontend/src/` (React components, e.g. `Dashboard`), and top-level `docker-compose*.yml` for local/dev launches.

## Critical developer workflows (concrete commands)

- Run full local stack (recommended development flow):

```bash
# from repo root
docker-compose up --build
```

- Backend tests (fast check):

```bash
cd backend
pip install -r requirements.txt
pytest -q
```

- Frontend tests / dev server:

```bash
cd frontend
npm install
npm test
npm start
```

- Run lint/typecheck if present (look for project-specific configs):

```bash
# Python linting (if configured)
cd backend; flake8 || true
# TypeScript check
cd frontend; npm run build --if-present
```

## Project-specific conventions & patterns

- Async-first backend: prefer async endpoints, `async` SQLAlchemy sessions and `asyncpg`. When adding DB access, mirror the `get_db`/`AsyncSession` pattern used in auth examples.
- Background jobs: OCR & heavy processing should be implemented as Celery tasks (Celery + Redis broker). See the blueprint's `process_document_async` example.
- Storage: documents go to object storage (MinIO/S3). Keep record metadata in Postgres and file blobs in object storage.
- AI integration: LangChain-style RAG + conversational memory is used. When adding QA/chat features, persist embeddings in a per-profile vector store (example persists to `./chroma_db/{profile_id}` in the blueprint).

## Integration points & external dependencies

- Postgres: primary data store. Use JSONB for semi-structured fields (profiles, prescriptions, extracted OCR results).
- Redis: caching and Celery broker. Expect `redis://` in config.
- MinIO/S3: document storage. Look for `MINIO_*` env vars in compose files.
- External APIs: OpenAI/Claude (LLM), RxNorm/OpenFDA for drug data — add credentials to secrets and avoid hardcoding keys.

## Where to change behavior

- API surface: `backend/app/api/*` (routers). Keep consistent prefix `/api/v1/` as shown in examples.
- Authentication: follow JWT/OAuth2 patterns in `app/api/auth.py` (use existing `create_access_token` utilities).
- OCR flow: incoming file upload -> store in object store -> enqueue Celery task -> update `documents.ocr_status` and `extracted_data` JSONB.

## Quick examples for agents

- When adding a new endpoint, include an async test under `backend/tests/` that uses `httpx.AsyncClient(app=app)` like the blueprint tests.
- When adding long-running work, create a Celery task and a small integration test that enqueues the task and asserts expected DB changes (mock external calls where possible).

## Safety, security, and secrets handling

- Do not commit credentials. Use environment variables and GitHub Secrets (`.github/workflows/*` shows deployment usage in the blueprint).
- Add high-sensitivity fields to DB as encrypted values or store in a separate encrypted store; follow the blueprint's `EncryptionService` pattern when handling PHI.

## Where to find more context

- The authoritative single-file design summary is `personal_health_manager_blueprint.md` at repository root — read it for architecture, schema examples, and workflow descriptions.
- If creating CI changes, check `.github/workflows/*` (the blueprint includes an example deploy workflow).

If anything here is unclear or you want additional examples (e.g., a small test scaffold, or exact file paths present in the repo), tell me which section to expand and I will iterate.
