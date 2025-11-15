"""User endpoints - stub implementation"""
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.utils.auth import get_current_user
import os
import shutil
from pathlib import Path

router = APIRouter()

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("uploads/avatars")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/upload-avatar")
async def upload_avatar(
    file: UploadFile = File(...)
):
    """Upload avatar image - stores with timestamp for uniqueness"""
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Generate unique filename with timestamp
        file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
        import uuid
        import time
        filename = f"user_{int(time.time())}_{uuid.uuid4().hex[:8]}.{file_extension}"
        file_path = UPLOAD_DIR / filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Return just the filename (we'll construct full path on frontend)
        return {"avatar_url": filename}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload avatar: {str(e)}")


@router.get("/avatar/{email}")
async def get_user_avatar(email: str):
    """Get user avatar by email - searches uploads folder"""
    try:
        # List all files in uploads folder
        import glob
        files = glob.glob(str(UPLOAD_DIR / "*"))
        
        # If we find any image, return the first one (you can implement better logic)
        if files:
            filename = os.path.basename(files[0])
            return {"avatar_url": f"/uploads/avatars/{filename}"}
        
        return {"avatar_url": None}
    
    except Exception as e:
        return {"avatar_url": None}

@router.get("/me")
async def get_current_user_profile(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user profile"""
    user = current_user["user"]
    user_type = current_user["user_type"]
    
    # Convert SQLAlchemy model to dict with all relevant fields
    user_data = {
        "id": user.id,
        "email": user.email,
        "user_type": user_type,
        "phone": user.phone,
        "timezone": user.timezone,
        "locale": user.locale,
        "currency": user.currency,
        "is_active": user.is_active,
        "created_at": user.created_at.isoformat() if user.created_at else None,
        "last_active": user.last_active.isoformat() if user.last_active else None,
    }
    
    # Try to find user's avatar in uploads folder
    avatar_url = None
    try:
        import glob
        # Look for any image file in uploads/avatars
        avatar_files = glob.glob(str(UPLOAD_DIR / "*"))
        if avatar_files:
            # Use the most recent file
            avatar_files.sort(key=os.path.getmtime, reverse=True)
            filename = os.path.basename(avatar_files[0])
            avatar_url = f"/uploads/avatars/{filename}"
    except:
        pass
    
    user_data["avatar_url"] = avatar_url
    
    # Add type-specific fields
    if user_type == "consumer":
        user_data["name"] = user.name
        user_data["budget_preferences"] = user.budget_preferences
        user_data["personal_category_set"] = user.personal_category_set
        user_data["consent_gmail_ingest"] = user.consent_gmail_ingest
        user_data["consent_upi_ingest"] = user.consent_upi_ingest
        user_data["consent_sms_ingest"] = user.consent_sms_ingest
    elif user_type == "business":
        user_data["business_name"] = user.business_name
        user_data["contact_person"] = user.contact_person
        user_data["name"] = user.business_name  # Use business_name as name
        user_data["gstin"] = getattr(user, 'gstin', None)
        user_data["business_type"] = getattr(user, 'business_type', None)
        user_data["pos_integration"] = getattr(user, 'pos_integration', False)
        user_data["business_category_set"] = user.business_category_set
        user_data["expected_invoice_rules"] = getattr(user, 'expected_invoice_rules', {})
        user_data["consent_gmail_ingest"] = user.consent_gmail_ingest
        user_data["consent_upi_ingest"] = user.consent_upi_ingest
        user_data["consent_sms_ingest"] = user.consent_sms_ingest
    
    return user_data

@router.patch("/me")
async def update_user_profile(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user profile - implement as needed"""
    return {"message": "Update endpoint - to be implemented"}

@router.patch("/me/consent")
async def update_consent(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update consent flags - implement as needed"""
    return {"message": "Consent update endpoint - to be implemented"}
