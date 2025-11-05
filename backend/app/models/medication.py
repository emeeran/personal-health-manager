from sqlalchemy import Column, String, Date, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base


class Medication(Base):
    """Medication model for tracking current and historical medications"""
    __tablename__ = "medications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    visit_id = Column(UUID(as_uuid=True), ForeignKey("medical_visits.id", ondelete="SET NULL"), nullable=True, index=True)

    # Basic medication information
    name = Column(String(255), nullable=False)
    brand_name = Column(String(255), nullable=True)
    generic_name = Column(String(255), nullable=True)
    ndc_code = Column(String(20), nullable=True)  # National Drug Code
    drug_class = Column(String(100), nullable=True)  # e.g., "Antibiotic", "ACE Inhibitor"

    # Dosage information
    strength = Column(String(50), nullable=True)  # e.g., "500mg", "10mg/mL"
    dosage_form = Column(String(50), nullable=True)  # Tablet, Capsule, Liquid, Injection, etc.
    route = Column(String(50), nullable=True)  # Oral, IV, IM, Topical, etc.
    frequency = Column(String(100), nullable=True)  # e.g., "Twice daily", "As needed"
    quantity = Column(String(50), nullable=True)  # e.g., "30 tablets", "100mL"
    instructions = Column(Text, nullable=True)  # Detailed administration instructions

    # Timing and duration
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False, index=True)
    is_as_needed = Column(Boolean, default=False, nullable=False)

    # Prescribing information
    prescribing_doctor = Column(String(255), nullable=True)
    prescribing_doctor_id = Column(UUID(as_uuid=True), nullable=True)  # If we have doctor records
    prescription_number = Column(String(100), nullable=True)
    pharmacy = Column(String(255), nullable=True)
    pharmacy_phone = Column(String(20), nullable=True)

    # Refill information
    refills_remaining = Column(String(20), nullable=True)  # Number or "As needed"
    last_refill_date = Column(Date, nullable=True)
    next_refill_date = Column(Date, nullable=True)
    auto_refill = Column(Boolean, default=False, nullable=False)

    # Monitoring and side effects
    monitoring_required = Column(JSONB, default=list, nullable=False)  # Array of monitoring requirements
    side_effects = Column(JSONB, default=list, nullable=False)  # Array of known/expected side effects
    patient_side_effects = Column(Text, nullable=True)  # Side effects experienced by patient
    effectiveness_rating = Column(String(10), nullable=True)  # Patient rating of effectiveness

    # Contraindications and interactions
    contraindications = Column(JSONB, default=list, nullable=False)  # Known contraindications
    drug_interactions = Column(JSONB, default=list, nullable=False)  # Known interactions
    allergy_warnings = Column(JSONB, default=list, nullable=False)  # Allergy warnings

    # Cost and insurance
    cost = Column(String(50), nullable=True)  # Cost information
    insurance_covered = Column(Boolean, default=True, nullable=False)
    prior_authorization = Column(Boolean, default=False, nullable=False)

    # Reminders and adherence
    reminder_enabled = Column(Boolean, default=False, nullable=False)
    reminder_times = Column(JSONB, default=list, nullable=False)  # Array of reminder times
    adherence_tracking = Column(Boolean, default=False, nullable=False)
    missed_doses = Column(JSONB, default=list, nullable=False)  # Track missed doses

    # Additional notes
    notes = Column(Text, nullable=True)  # Additional notes about medication
    reason_for_use = Column(Text, nullable=True)  # Why this medication was prescribed

    # Verification and source
    is_verified = Column(Boolean, default=False, nullable=False)
    source = Column(String(50), nullable=True)  # manual, prescription, ocr, etc.
    source_document_id = Column(UUID(as_uuid=True), nullable=True)  # Link to source document

    # Status tracking
    status = Column(String(20), default="active", nullable=False)  # active, paused, discontinued, completed
    discontinuation_reason = Column(Text, nullable=True)
    discontinued_by = Column(String(255), nullable=True)  # Who discontinued (doctor, patient, etc.)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    last_taken_at = Column(DateTime(timezone=True), nullable=True)  # Last dose taken

    # Relationships
    profile = relationship("Profile", back_populates="medications")
    visit = relationship("MedicalVisit", lazy="select")

    def __repr__(self):
        return f"<Medication(id={self.id}, name={self.name}, active={self.is_active})>"

    @property
    def duration_days(self) -> int:
        """Calculate duration of medication in days"""
        if self.start_date and self.end_date:
            delta = self.end_date - self.start_date
            return delta.days
        return None

    @property
    def is_current(self) -> bool:
        """Check if medication should currently be taken"""
        if not self.is_active:
            return False

        from datetime import date
        today = date.today()

        if self.start_date and today < self.start_date:
            return False

        if self.end_date and today > self.end_date:
            return False

        return True

    @property
    def display_name(self) -> str:
        """Get display name for medication"""
        if self.brand_name:
            return f"{self.brand_name} ({self.name})"
        return self.name

    @property
    def dosage_summary(self) -> str:
        """Get a summary of dosage information"""
        parts = []
        if self.strength:
            parts.append(self.strength)
        if self.frequency:
            parts.append(self.frequency)
        if self.route and self.route.lower() != "oral":
            parts.append(self.route)
        return " - ".join(parts) if parts else self.name