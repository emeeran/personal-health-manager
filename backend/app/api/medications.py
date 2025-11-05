"""
Medication management API routes.
"""

from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()


@router.get("/")
async def get_medications() -> Dict[str, Any]:
    """Get all medications"""
    return {"message": "Get medications endpoint - TODO: Implement"}


@router.post("/")
async def create_medication() -> Dict[str, Any]:
    """Add a new medication"""
    return {"message": "Create medication endpoint - TODO: Implement"}


@router.get("/{medication_id}")
async def get_medication(medication_id: str) -> Dict[str, Any]:
    """Get a specific medication"""
    return {"message": f"Get medication {medication_id} endpoint - TODO: Implement"}


@router.put("/{medication_id}")
async def update_medication(medication_id: str) -> Dict[str, Any]:
    """Update a medication"""
    return {"message": f"Update medication {medication_id} endpoint - TODO: Implement"}