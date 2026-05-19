import pdfplumber
from docx import Document

def extract_text(file_path: str, file_type: str) -> str:
    
    if file_type == "pdf":
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + " "
        return text.strip()
    
    elif file_type == "docx":
        doc = Document(file_path)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + " "
        return text.strip()
    
    return ""