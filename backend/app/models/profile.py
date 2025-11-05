from sqlalchemy import Column, String, Date, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base


class Profile(Base):
    """Patient profile model with demographic and health information"""
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    # Basic demographics
    name = Column(String(255), nullable=False)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(String(20), nullable=True)  # Male, Female, Other, Prefer not to say
    blood_group = Column(String(5), nullable=True)  # A+, A-, B+, B-, O+, O-, AB+, AB-

    # Contact information
    phone = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    postal_code = Column(String(20), nullable=True)
    country = Column(String(100), nullable=True)

    # Health information (stored as JSON for flexibility)
    chronic_conditions = Column(JSONB, default=list, nullable=False)  # Array of chronic conditions
    allergies = Column(JSONB, default=list, nullable=False)  # Array of allergies
    medications_allergies = Column(JSONB, default=list, nullable=False)  # Specific medication allergies

    # Emergency contact
    emergency_contact = Column(JSONB, nullable=True)  # Object with name, relationship, phone

    # Medical identifiers
    primary_care_physician = Column(String(255), nullable=True)
    insurance_provider = Column(String(255), nullable=True)
    insurance_policy_number = Column(String(100), nullable=True)
    medical_record_number = Column(String(100), nullable=True)

    # Physical characteristics
    height_cm = Column(String(10), nullable=True)  # Height in cm
    weight_kg = Column(String(10), nullable=True)  # Weight in kg

    # Lifestyle factors
    smoking_status = Column(String(20), nullable=True)  # Never, Former, Current
    alcohol_consumption = Column(String(20), nullable=True)  # None, Occasional, Regular
    exercise_frequency = Column(String(20), nullable=True)  # None, Occasional, Regular, Daily

    # Metadata
    is_primary_profile = Column(Boolean, default=True, nullable=False)
    notes = Column(Text, nullable=True)  # General notes about the profile

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    user = relationship("User", back_populates="profiles")
    medical_visits = relationship("MedicalVisit", back_populates="profile", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="profile", cascade="all, delete-orphan")
    medications = relationship("Medication", back_populates="profile", cascade="all, delete-orphan")
    lab_results = relationship("LabResult", back_populates="profile", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Profile(id={self.id}, name={self.name}, user_id={self.user_id})>"

    @property
    def age(self) -> int:
        """Calculate current age based on date of birth"""
        if self.date_of_birth:
            from datetime import date
            today = date.today()
            age = today.year - self.date_of_birth.year
            if today.month < self.date_of_birth.month or (today.month == self.date_of_birth.month and today.day < self.date_of_birth.day):
                age -= 1
            return age
        return None

    @property
    def full_address(self) -> str:
        """Get formatted full address"""
        if self.address:
            address_parts = [self.address]
            if self.city:
                address_parts.append(self.city)
            if self.state:
                address_parts.append(self.state)
            if self.postal_code:
                address_parts.append(self.postal_code)
            if self.country:
                address_parts.append(self.country)
            return ", ".join(address_parts)
        return None