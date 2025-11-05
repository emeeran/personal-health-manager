from sqlalchemy import Column, String, Date, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base


class MedicalVisit(Base):
    """Medical visit/encounter model"""
    __tablename__ = "medical_visits"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False, index=True)

    # Visit details
    visit_date = Column(Date, nullable=False, index=True)
    visit_type = Column(String(50), nullable=True)  # Regular checkup, Emergency, Follow-up, etc.
    provider_name = Column(String(255), nullable=True)
    provider_specialty = Column(String(100), nullable=True)
    facility_name = Column(String(255), nullable=True)
    facility_address = Column(Text, nullable=True)

    # Clinical information
    chief_complaint = Column(Text, nullable=True)
    history_of_present_illness = Column(Text, nullable=True)
    symptoms = Column(JSONB, default=list, nullable=False)  # Array of symptoms with details
    vital_signs = Column(JSONB, nullable=True)  # Object with BP, HR, Temp, etc.
    physical_examination = Column(Text, nullable=True)

    # Diagnoses and assessments
    diagnosis = Column(JSONB, nullable=False)  # Array of diagnosis objects
    assessment = Column(Text, nullable=True)
    treatment_plan = Column(Text, nullable=True)

    # Procedures and tests
    procedures = Column(JSONB, default=list, nullable=False)  # Array of procedures
    lab_tests = Column(JSONB, default=list, nullable=False)  # Array of lab tests ordered
    imaging_studies = Column(JSONB, default=list, nullable=False)  # Array of imaging studies

    # Medications and prescriptions
    prescriptions = Column(JSONB, default=list, nullable=False)  # Array of prescription objects
    medications_prescribed = Column(JSONB, default=list, nullable=False)  # Simplified list

    # Follow-up and recommendations
    follow_up_instructions = Column(Text, nullable=True)
    follow_up_date = Column(Date, nullable=True)
    referrals = Column(JSONB, default=list, nullable=False)  # Array of referrals
    lifestyle_recommendations = Column(JSONB, default=list, nullable=False)  # Array of recommendations

    # Patient notes
    patient_notes = Column(Text, nullable=True)  # Notes added by patient
    provider_notes = Column(Text, nullable=True)  # Clinical notes from provider

    # Financial information
    visit_cost = Column(String(50), nullable=True)
    insurance_claim = Column(JSONB, nullable=True)  # Insurance claim information

    # Metadata
    is_confidential = Column(String(20), default=False, nullable=False)  # For sensitive visits
    tags = Column(JSONB, default=list, nullable=False)  # Array of tags for categorization

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    profile = relationship("Profile", back_populates="medical_visits")
    documents = relationship("Document", back_populates="visit", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<MedicalVisit(id={self.id}, date={self.visit_date}, provider={self.provider_name})>"

    @property
    def primary_diagnosis(self) -> str:
        """Get the primary diagnosis if available"""
        if self.diagnosis and len(self.diagnosis) > 0:
            return self.diagnosis[0].get("description", "Unknown") if isinstance(self.diagnosis[0], dict) else str(self.diagnosis[0])
        return None

    @property
    def visit_summary(self) -> str:
        """Generate a brief summary of the visit"""
        summary_parts = []

        if self.visit_type:
            summary_parts.append(f"Type: {self.visit_type}")

        if self.provider_name:
            summary_parts.append(f"Provider: {self.provider_name}")

        if self.chief_complaint:
            summary_parts.append(f"Chief Complaint: {self.chief_complaint[:100]}...")

        if self.diagnosis and len(self.diagnosis) > 0:
            primary_dx = self.primary_diagnosis
            summary_parts.append(f"Primary Diagnosis: {primary_dx}")

        return " | ".join(summary_parts) if summary_parts else "Medical visit details not available"