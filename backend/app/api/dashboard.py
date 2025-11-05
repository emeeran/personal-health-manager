"""
Dashboard API routes.
"""

from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()


@router.get("/")
async def get_dashboard_data() -> Dict[str, Any]:
    """Get dashboard data"""
    return {"message": "Get dashboard data endpoint - TODO: Implement"}


@router.get("/metrics")
async def get_health_metrics() -> Dict[str, Any]:
    """Get health metrics"""
    return {"message": "Get health metrics endpoint - TODO: Implement"}


@router.get("/timeline")
async def get_medical_timeline() -> Dict[str, Any]:
    """Get medical timeline"""
    return {"message": "Get medical timeline endpoint - TODO: Implement"}