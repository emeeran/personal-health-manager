"""
Authentication API routes.
"""

from datetime import datetime, timedelta
from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import (
    create_access_token,
    create_refresh_token,
    verify_password,
    get_password_hash,
    verify_token,
    create_password_reset_token,
    verify_password_reset_token
)
from app.core.exceptions import AuthenticationError, ConflictError, ValidationError
from app.models.user import User
from app.schemas.auth import (
    UserCreate,
    UserResponse,
    Token,
    LoginRequest,
    RefreshTokenRequest,
    ChangePasswordRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest
)

router = APIRouter()


# OAuth2 scheme for token authentication
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Helper function for user authentication
async def authenticate_user(db: AsyncSession, email: str, password: str) -> User:
    """Authenticate user with email and password"""
    result = await db.execute(
        select(User).where(User.email == email)
    )
    user = result.scalar_one_or_none()

    if not user:
        return None

    if not user.is_active:
        return None

    if not verify_password(password, user.password_hash):
        return None

    return user


# Dependency to get current user
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    """Get current authenticated user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = verify_token(token, "access")

        if payload is None or payload.sub is None:
            raise credentials_exception

        user_id = payload.sub

        # Get user from database
        result = await db.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalar_one_or_none()

        if user is None:
            raise credentials_exception

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive",
            )

        return user

    except Exception:
        raise credentials_exception


@router.post("/register", response_model=UserResponse, status_code=201)
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
) -> UserResponse:
    """Register a new user"""
    try:
        # Check if user already exists
        result = await db.execute(
            select(User).where(User.email == user_data.email)
        )
        existing_user = result.scalar_one_or_none()

        if existing_user:
            raise ConflictError(
                "A user with this email already exists"
            )

        # Create new user
        hashed_password = get_password_hash(user_data.password)
        user = User(
            email=user_data.email,
            password_hash=hashed_password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            is_active=True,
            is_verified=False
        )

        db.add(user)
        await db.commit()
        await db.refresh(user)

        return UserResponse.from_current_user(user)

    except ConflictError:
        raise
    except Exception as e:
        raise ValidationError(
            f"Registration failed: {str(e)}"
        )


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
) -> Token:
    """User login with OAuth2PasswordRequestForm for form data"""
    try:
        # Authenticate user
        user = await authenticate_user(db, form_data.username, form_data.password)

        if not user:
            raise AuthenticationError(
                "Invalid email or password"
            )

        # Create access token
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": str(user.id)}, expires_delta=access_token_expires
        )

        # Create refresh token
        refresh_token_expires = timedelta(days=7)
        refresh_token = create_refresh_token(
            data={"sub": str(user.id)}, expires_delta=refresh_token_expires
        )

        # Update last login time
        user.last_login = datetime.utcnow()
        db.add(user)
        await db.commit()

        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=1800  # 30 minutes
        )

    except AuthenticationError:
        raise
    except Exception as e:
        raise ValidationError(
            f"Login failed: {str(e)}"
        )


@router.post("/refresh", response_model=Token)
async def refresh_token(
    token_data: RefreshTokenRequest,
    db: AsyncSession = Depends(get_db)
) -> Token:
    """Refresh access token using refresh token"""
    try:
        # Verify refresh token
        payload = verify_token(token_data.refresh_token, "refresh")

        if not payload:
            raise AuthenticationError(
                "Invalid or expired refresh token"
            )

        user_id = payload.get("sub")
        if not user_id:
            raise AuthenticationError(
                "Invalid token payload"
            )

        # Get user
        result = await db.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalar_one_or_none()

        if not user or not user.is_active:
            raise AuthenticationError(
                "User not found or inactive"
            )

        # Create new access token
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": str(user.id)}, expires_delta=access_token_expires
        )

        # Create new refresh token
        refresh_token_expires = timedelta(days=7)
        new_refresh_token = create_refresh_token(
            data={"sub": str(user.id)}, expires_delta=refresh_token_expires
        )

        return Token(
            access_token=access_token,
            refresh_token=new_refresh_token,
            token_type="bearer",
            expires_in=1800  # 30 minutes
        )

    except AuthenticationError:
        raise
    except Exception as e:
        raise ValidationError(
            f"Token refresh failed: {str(e)}"
        )


@router.post("/logout")
async def logout(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """User logout"""
    try:
        # Clear refresh token from database
        current_user.refresh_token = None
        db.add(current_user)
        await db.commit()

        return {"message": "Successfully logged out"}

    except Exception as e:
        raise ValidationError(
            f"Logout failed: {str(e)}"
        )


@router.post("/change-password")
async def change_password(
    password_data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """Change user password"""
    try:
        # Verify current password
        if not verify_password(password_data.current_password, current_user.password_hash):
            raise AuthenticationError(
                "Current password is incorrect"
            )

        # Update password
        current_user.password_hash = get_password_hash(password_data.new_password)
        db.add(current_user)
        await db.commit()

        return {"message": "Password changed successfully"}

    except AuthenticationError:
        raise
    except Exception as e:
        raise ValidationError(
            f"Password change failed: {str(e)}"
        )


@router.post("/forgot-password")
async def forgot_password(
    request: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """Request password reset"""
    try:
        # Check if user exists
        result = await db.execute(
            select(User).where(User.email == request.email)
        )
        user = result.scalar_one_or_none()

        if user:
            # Create password reset token
            reset_token = create_password_reset_token(request.email)
            user.password_reset_token = reset_token
            # Set expiry time (1 hour from now)
            from datetime import datetime, timedelta
            user.password_reset_expires = datetime.utcnow() + timedelta(hours=1)
            db.add(user)
            await db.commit()

        # Always return success message to prevent email enumeration
        return {
            "message": "If an account with this email exists, a password reset link has been sent."
        }

    except Exception as e:
        raise ValidationError(
            f"Password reset request failed: {str(e)}"
        )


@router.post("/reset-password")
async def reset_password(
    reset_data: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """Reset password with token"""
    try:
        # Verify reset token
        email = verify_password_reset_token(reset_data.token)

        if not email:
            raise AuthenticationError(
                "Invalid or expired reset token"
            )

        # Find user
        result = await db.execute(
            select(User).where(User.email == email)
        )
        user = result.scalar_one_or_none()

        if not user:
            raise AuthenticationError(
                "User not found"
            )

        # Check if token is expired
        if user.password_reset_expires and user.password_reset_expires < datetime.utcnow():
            raise AuthenticationError(
                "Reset token has expired"
            )

        # Update password
        user.password_hash = get_password_hash(reset_data.new_password)
        user.password_reset_token = None
        user.password_reset_expires = None
        db.add(user)
        await db.commit()

        return {"message": "Password reset successfully"}

    except AuthenticationError:
        raise
    except Exception as e:
        raise ValidationError(
            f"Password reset failed: {str(e)}"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
) -> UserResponse:
    """Get current user information"""
    return UserResponse.from_current_user(current_user)


