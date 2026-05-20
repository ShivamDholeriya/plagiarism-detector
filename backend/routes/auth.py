from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Header
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from typing import List, Optional
from jose import jwt, JWTError
import tempfile, os
from services.text_extractor import extract_text
from services.similarity_engine import calculate_similarity
from database import get_db, ComparisonHistory, User

router = APIRouter()

SECRET_KEY = "plagiarism123secret"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_token(data: dict):
    expire = datetime.utcnow() + timedelta(hours=24)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    password_bytes = user.password.encode('utf-8')[:72]
    password_trimmed = password_bytes.decode('utf-8', errors='ignore')
    hashed = pwd_context.hash(password_trimmed)
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        contact=user.contact,
        username=user.username,
        hashed_password=hashed
    )
    db.add(new_user)
    db.commit()
    return {"message": "Account ban gaya! Ab login karo."}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not pwd_context.verify(user.password[:72], db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Username ya password galat hai")
    token = create_token({"sub": str(db_user.id), "username": db_user.username})
    return {
        "access_token": token,
        "token_type": "bearer",
        "username": db_user.username,
        "full_name": f"{db_user.first_name} {db_user.last_name}"
    }