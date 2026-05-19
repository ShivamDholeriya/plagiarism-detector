from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Header
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

def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Login karo pehle")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=401, detail="User nahi mila")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Token invalid hai")

@router.post("/compare")
async def compare_files(
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if len(files) != 2:
        raise HTTPException(status_code=400, detail="Exactly 2 files chahiye")

    extracted_texts = []
    for file in files:
        filename = file.filename.lower()
        if filename.endswith(".pdf"):
            file_type = "pdf"
        elif filename.endswith(".docx"):
            file_type = "docx"
        else:
            raise HTTPException(status_code=400, detail=f"{file.filename} — sirf PDF ya DOCX allowed hai")

        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file_type}") as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        text = extract_text(tmp_path, file_type)
        extracted_texts.append(text)
        os.unlink(tmp_path)

    score = calculate_similarity(extracted_texts[0], extracted_texts[1])
    result_label = "High Plagiarism" if score > 70 else "Medium Plagiarism" if score > 40 else "Low Plagiarism"

    record = ComparisonHistory(
        user_id=current_user.id,
        file1_name=files[0].filename,
        file2_name=files[1].filename,
        similarity_score=score,
        result=result_label
    )
    db.add(record)
    db.commit()

    return {"similarity_score": score, "file1": files[0].filename, "file2": files[1].filename, "result": result_label}

@router.get("/history")
def get_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    records = db.query(ComparisonHistory).filter(
        ComparisonHistory.user_id == current_user.id
    ).order_by(ComparisonHistory.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "file1": r.file1_name,
            "file2": r.file2_name,
            "score": r.similarity_score,
            "result": r.result,
            "date": r.created_at.strftime("%d %b %Y, %I:%M %p")
        }
        for r in records
    ]

@router.delete("/history/{record_id}")
def delete_record(record_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    record = db.query(ComparisonHistory).filter(
        ComparisonHistory.id == record_id,
        ComparisonHistory.user_id == current_user.id
    ).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record nahi mila")
    db.delete(record)
    db.commit()
    return {"message": "Record delete ho gaya"}