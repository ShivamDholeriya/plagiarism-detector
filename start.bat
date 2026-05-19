@echo off
echo Starting Plagiarism Detector...

start cmd /k "cd /d D:\plagiarism-detector\backend && venv\Scripts\activate && uvicorn main:app --reload"

timeout /t 3

start cmd /k "cd /d D:\plagiarism-detector\frontend && npm run dev"

echo Done! Opening browser...
timeout /t 4
start http://localhost:5173