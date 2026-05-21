# auth.py (Clean Version - No "not accessed" warnings)

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from database import User, get_db
from models.schemas import UserCreate, UserLogin

router = APIRouter()

SECRET_KEY = "plagiarism123secret"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


# =========================
# Create JWT Token
# =========================
def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# =========================
# Get Current User
# =========================
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()

    if user is None:
        raise credentials_exception

    return user


# =========================
# Register API
# =========================
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    password_bytes = user.password.encode("utf-8")[:72]
    password_trimmed = password_bytes.decode("utf-8", errors="ignore")
    hashed_password = pwd_context.hash(password_trimmed)

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        contact=user.contact,
        username=user.username,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()

    return {"message": "You are registered !"}


# =========================
# Login API
# =========================
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if not db_user or not pwd_context.verify(
        user.password[:72],
        db_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Username ya password galat hai"
        )

    token = create_token({
        "sub": str(db_user.id),
        "username": db_user.username
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": db_user.username,
        "full_name": f"{db_user.first_name} {db_user.last_name}"
    }