# Import all models to ensure they're registered with SQLAlchemy
from app.models.user import User
from app.models.profile import Profile
from app.models.medical_visit import MedicalVisit
from app.models.document import Document
from app.models.medication import Medication
from app.models.lab_result import LabResult

__all__ = [
    "User",
    "Profile",
    "MedicalVisit",
    "Document",
    "Medication",
    "LabResult"
]