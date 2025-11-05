from sqlalchemy import Column, String, Date, Text, ForeignKey, Numeric, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base


class LabResult(Base):
    """Lab results and test values model"""
    __tablename__ = "lab_results"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    visit_id = Column(UUID(as_uuid=True), ForeignKey("medical_visits.id", ondelete="SET NULL"), nullable=True, index=True)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id", ondelete="SET NULL"), nullable=True, index=True)

    # Test information
    test_name = Column(String(255), nullable=False)
    test_category = Column(String(100), nullable=True)  # Chemistry, Hematology, etc.
    test_code = Column(String(50), nullable=True)  # LOINC code or other standard code
    test_description = Column(Text, nullable=True)

    # Test details
    specimen_type = Column(String(100), nullable=True)  # Blood, Urine, etc.
    collection_date = Column(DateTime(timezone=True), nullable=True)
    result_date = Column(DateTime(timezone=True), nullable=True)
    reporting_laboratory = Column(String(255), nullable=True)
    ordering_provider = Column(String(255), nullable=True)

    # Result values
    value = Column(Numeric(10, 2), nullable=True)  # Numeric value
    value_text = Column(Text, nullable=True)  # Text result for non-numeric tests
    unit = Column(String(50), nullable=True)  # Unit of measurement
    reference_range = Column(String(200), nullable=True)  # Reference range
    reference_range_min = Column(Numeric(10, 2), nullable=True)
    reference_range_max = Column(Numeric(10, 2), nullable=True)
    abnormal_flag = Column(String(20), nullable=True)  # High, Low, Abnormal, Critical
    clinical_significance = Column(String(100), nullable=True)

    # Interpretation
    interpretation = Column(Text, nullable=True)  # Provider interpretation
    comments = Column(Text, nullable=True)  # Additional comments
    trend = Column(String(20), nullable=True)  # Stable, Improving, Worsening
    previous_value = Column(Numeric(10, 2), nullable=True)  # Previous result for comparison
    percent_change = Column(Numeric(5, 2), nullable=True)  # Percent change from previous

    # Test status
    test_status = Column(String(20), default="final", nullable=False)  # Preliminary, Final, Corrected, etc.
    verification_status = Column(String(20), default="verified", nullable=False)
    corrected_result = Column(Numeric(10, 2), nullable=True)  # If result was corrected
    correction_reason = Column(Text, nullable=True)

    # Method and equipment
    test_method = Column(String(100), nullable=True)  # Test methodology
    equipment_used = Column(String(255), nullable=True)
    sensitivity = Column(String(100), nullable=True)  # Test sensitivity if applicable

    # Categorization
    category = Column(String(100), nullable=True)  # General categorization
    subcategory = Column(String(100), nullable=True)  # More specific categorization
    tags = Column(JSONB, default=list, nullable=False)  # Array of tags

    # Related tests
    panel_name = Column(String(255), nullable=True)  # If part of a test panel
    panel_tests = Column(JSONB, default=list, nullable=False)  # Other tests in the same panel
    related_tests = Column(JSONB, default=list, nullable=False)  # Related test IDs

    # Clinical context
    clinical_indication = Column(Text, nullable=True)  # Why test was ordered
    follow_up_required = Column(Boolean, default=False, nullable=False)
    follow_up_plan = Column(Text, nullable=True)
    critical_value = Column(Boolean, default=False, nullable=False)
    critical_value_notified = Column(Boolean, default=False, nullable=False)
    critical_value_notification_time = Column(DateTime(timezone=True), nullable=True)

    # Quality and source
    test_quality = Column(String(20), nullable=True)  # Good, Fair, Poor
    source_document = Column(String(255), nullable=True)  # Source document if extracted
    extraction_confidence = Column(String(10), nullable=True)  # Confidence if extracted via OCR
    is_verified = Column(Boolean, default=False, nullable=False)

    # Additional data
    additional_data = Column(JSONB, nullable=True)  # Any additional structured data
    notes = Column(Text, nullable=True)  # General notes

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    profile = relationship("Profile", back_populates="lab_results")
    visit = relationship("MedicalVisit", lazy="select")
    document = relationship("Document", lazy="select")

    def __repr__(self):
        return f"<LabResult(id={self.id}, test={self.test_name}, value={self.value} {self.unit})>"

    @property
    def is_abnormal(self) -> bool:
        """Check if result is outside reference range"""
        if self.value is None or self.abnormal_flag:
            return bool(self.abnormal_flag)

        if self.reference_range_min is not None and self.value < self.reference_range_min:
            return True
        if self.reference_range_max is not None and self.value > self.reference_range_max:
            return True

        return False

    @property
    def status_display(self) -> str:
        """Get human-readable status"""
        if self.critical_value:
            return "Critical"
        elif self.is_abnormal:
            return "Abnormal"
        elif self.value is not None:
            return "Normal"
        else:
            return "Text Result"

    @property
    def value_with_unit(self) -> str:
        """Get value with unit"""
        if self.value is not None:
            value_str = str(self.value)
            if self.unit:
                return f"{value_str} {self.unit}"
            return value_str
        return self.value_text or "No value"

    @property
    def reference_range_display(self) -> str:
        """Get formatted reference range"""
        if self.reference_range:
            return self.reference_range
        elif self.reference_range_min is not None and self.reference_range_max is not None:
            return f"{self.reference_range_min} - {self.reference_range_max}"
        elif self.reference_range_min is not None:
            return f">= {self.reference_range_min}"
        elif self.reference_range_max is not None:
            return f"<= {self.reference_range_max}"
        return None

    @property
    def age_at_test(self) -> int:
        """Calculate age at time of test if profile has DOB"""
        # This would need to be implemented when we have access to profile
        # For now, return None
        return None