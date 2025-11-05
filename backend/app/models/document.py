from sqlalchemy import Column, String, DateTime, Text, ForeignKey, Integer, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base


class Document(Base):
    """Document model for medical records and files"""
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    visit_id = Column(UUID(as_uuid=True), ForeignKey("medical_visits.id", ondelete="SET NULL"), nullable=True, index=True)

    # File information
    file_name = Column(String(255), nullable=False)
    original_file_name = Column(String(255), nullable=True)
    file_type = Column(String(50), nullable=False)  # pdf, png, jpg, etc.
    mime_type = Column(String(100), nullable=True)
    file_size_bytes = Column(Integer, nullable=True)
    file_path = Column(String(500), nullable=False)  # Path in MinIO/S3

    # Document categorization
    document_type = Column(String(50), nullable=True)  # lab_result, prescription, imaging, etc.
    category = Column(String(100), nullable=True)  # More specific categorization
    subcategory = Column(String(100), nullable=True)  # Even more specific

    # Document metadata
    title = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    date_issued = Column(DateTime(timezone=True), nullable=True)  # Date document was issued
    issuing_provider = Column(String(255), nullable=True)  # Provider/facility that issued document
    document_number = Column(String(100), nullable=True)  # Document ID/reference number

    # OCR processing
    ocr_status = Column(String(20), default="pending", nullable=False)  # pending, processing, completed, failed
    extracted_text = Column(Text, nullable=True)  # Raw OCR text
    extracted_data = Column(JSONB, nullable=True)  # Structured extracted data
    ocr_confidence = Column(String(10), nullable=True)  # OCR confidence score
    ocr_processed_at = Column(DateTime(timezone=True), nullable=True)

    # Document processing
    is_processed = Column(Boolean, default=False, nullable=False)
    processing_status = Column(String(20), default="pending", nullable=False)  # pending, processed, error
    processing_error = Column(Text, nullable=True)  # Error message if processing failed
    processed_at = Column(DateTime(timezone=True), nullable=True)

    # Access control
    is_confidential = Column(Boolean, default=False, nullable=False)
    access_level = Column(String(20), default="private", nullable=False)  # private, family, shared

    # Verification
    is_verified = Column(Boolean, default=False, nullable=False)  # Document verified by user
    verified_by = Column(UUID(as_uuid=True), nullable=True)  # User who verified
    verified_at = Column(DateTime(timezone=True), nullable=True)

    # Tags and search
    tags = Column(JSONB, default=list, nullable=False)  # Array of tags for categorization
    searchable_text = Column(Text, nullable=True)  # Combined text for search

    # Viewing information
    view_count = Column(Integer, default=0, nullable=False)
    last_viewed_at = Column(DateTime(timezone=True), nullable=True)

    # Sharing
    is_shared = Column(Boolean, default=False, nullable=False)
    share_token = Column(String(255), nullable=True)  # Token for secure sharing
    share_expires = Column(DateTime(timezone=True), nullable=True)

    # Timestamps
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    profile = relationship("Profile", back_populates="documents")
    visit = relationship("MedicalVisit", back_populates="documents")

    def __repr__(self):
        return f"<Document(id={self.id}, file_name={self.file_name}, type={self.document_type})>"

    @property
    def file_size_mb(self) -> float:
        """Get file size in megabytes"""
        if self.file_size_bytes:
            return round(self.file_size_bytes / (1024 * 1024), 2)
        return None

    @property
    def is_image(self) -> bool:
        """Check if document is an image"""
        image_types = ["png", "jpg", "jpeg", "tiff", "bmp", "gif"]
        return self.file_type.lower() in image_types

    @property
    def is_pdf(self) -> bool:
        """Check if document is a PDF"""
        return self.file_type.lower() == "pdf"

    @property
    def display_name(self) -> str:
        """Get display name for the document"""
        if self.title:
            return self.title
        elif self.original_file_name:
            return self.original_file_name
        else:
            return self.file_name