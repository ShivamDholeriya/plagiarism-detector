from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.compare import router as compare_router
from routes.auth import router as auth_router
from database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Plagiarism Detector API")

origins = [
    "https://plagiarism-detector-alpha.vercel.app",
    "http://localhost:5173",  
    "http://localhost:3000"    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(compare_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Plagiarism Detector API is running!"}