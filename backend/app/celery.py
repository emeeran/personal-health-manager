"""
Celery configuration for background tasks.
"""

from celery import Celery
from app.core.config import settings

# Create Celery instance
celery_app = Celery(
    "phm_backend",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=[
        "app.tasks.ocr",
        "app.tasks.reports",
        "app.tasks.notifications",
        "app.tasks.ai_processing"
    ]
)

# Configure Celery
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
    # Redis configuration
    broker_connection_retry_on_startup=True,
    result_expires=3600,  # Results expire after 1 hour
)

# Configure task routes
celery_app.conf.task_routes = {
    "app.tasks.ocr.*": {"queue": "ocr"},
    "app.tasks.reports.*": {"queue": "reports"},
    "app.tasks.notifications.*": {"queue": "notifications"},
    "app.tasks.ai_processing.*": {"queue": "ai"},
}

# Configure beat schedule for periodic tasks
celery_app.conf.beat_schedule = {
    'cleanup-expired-sessions': {
        'task': 'app.tasks.notifications.cleanup_expired_sessions',
        'schedule': 3600.0,  # Run every hour
    },
    'process-ocr-queue': {
        'task': 'app.tasks.ocr.process_pending_documents',
        'schedule': 60.0,  # Run every minute
    },
}