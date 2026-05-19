
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.compare import router as compare_router
from routes.auth import router as auth_router

app = FastAPI(title="Plagiarism Detector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(compare_router, prefix="/api")


@app.get("/")
def home():
    return {"message": "Plagiarism Detector API is running!"}