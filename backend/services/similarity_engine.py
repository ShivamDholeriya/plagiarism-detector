from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(text1: str, text2: str) -> float:
    
    if not text1 or not text2:
        return 0.0
    
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([text1, text2])
    score = cosine_similarity(vectors[0], vectors[1])[0][0]
    
    return round(float(score) * 100, 2)