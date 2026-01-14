from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import requests
import json
import os
from typing import Optional

app = FastAPI(
    title="AI Resistance Survey API (GitHub Gist)",
    description="Uran qazib olish sohasida Sun'iy Intellekt joriy etilishiga bo'lgan qarshilikni o'rganish uchun so'rovnoma backend API - GitHub Gist bilan",
    version="1.0.0"
)

# CORS yoqish
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GitHub Gist sozlamalari
# Environment variables orqali sozlash kerak:
# export GITHUB_TOKEN="your-token"
# export GIST_ID="your-gist-id"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GIST_ID = os.getenv("GIST_ID")

GIST_API_URL = f"https://api.github.com/gists/{GIST_ID}" if GIST_ID else None
GIST_HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

class SurveyResponse(BaseModel):
    user_id: str
    answers: dict

def get_gist_data():
    """Gist'dan ma'lumotlarni olish"""
    if not GIST_ID:
        raise HTTPException(status_code=500, detail="GIST_ID sozlanmagan")
    
    try:
        response = requests.get(GIST_API_URL, headers=GIST_HEADERS)
        response.raise_for_status()
        gist = response.json()
        content = gist["files"]["responses.json"]["content"]
        return json.loads(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gist'dan o'qishda xatolik: {str(e)}")

def save_gist_data(data):
    """Gist'ga ma'lumotlarni saqlash"""
    if not GIST_ID:
        raise HTTPException(status_code=500, detail="GIST_ID sozlanmagan")
    
    try:
        payload = {
            "files": {
                "responses.json": {
                    "content": json.dumps(data, indent=2, ensure_ascii=False)
                }
            }
        }
        response = requests.patch(GIST_API_URL, headers=GIST_HEADERS, json=payload)
        response.raise_for_status()
        return True
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gist'ga yozishda xatolik: {str(e)}")

@app.get("/")
def root():
    """API root endpoint"""
    return {
        "message": "AI Resistance Survey API (GitHub Gist)",
        "version": "1.0.0",
        "storage": "GitHub Gist",
        "gist_id": GIST_ID if GIST_ID else "Not configured",
        "endpoints": {
            "submit": "POST /submit - So'rovnoma javoblarini yuborish",
            "stats": "GET /stats - Statistika olish",
            "responses": "GET /responses - Barcha javoblarni olish",
            "docs": "GET /docs - API dokumentatsiya (Swagger UI)",
            "redoc": "GET /redoc - API dokumentatsiya (ReDoc)"
        }
    }

@app.post("/submit")
def submit_response(data: SurveyResponse):
    """
    So'rovnoma javoblarini qabul qilish va GitHub Gist'ga saqlash
    """
    try:
        # Mavjud ma'lumotlarni olish
        gist_data = get_gist_data()
        
        # Yangi javoblarni qo'shish
        timestamp = datetime.now().isoformat()
        for q_id, answer in data.answers.items():
            gist_data["timestamp"].append(timestamp)
            gist_data["user_id"].append(data.user_id)
            gist_data["question_id"].append(str(q_id))
            gist_data["answer"].append(
                json.dumps(answer, ensure_ascii=False) if isinstance(answer, dict) else str(answer)
            )
        
        # Gist'ga saqlash
        save_gist_data(gist_data)
        
        return {"status": "ok", "message": "Javoblar muvaffaqiyatli saqlandi (GitHub Gist)"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Xatolik yuz berdi: {str(e)}")

@app.get("/stats")
def get_stats():
    """
    Barcha javoblarning statistikasini qaytaradi
    """
    try:
        gist_data = get_gist_data()
        
        if not gist_data or len(gist_data["timestamp"]) == 0:
            return {
                "total": 0,
                "question_stats": {},
                "user_count": 0,
                "message": "Hozircha javoblar yo'q"
            }
        
        # Ma'lumotlarni qayta tuzish
        responses = []
        for i in range(len(gist_data["timestamp"])):
            responses.append({
                "timestamp": gist_data["timestamp"][i],
                "user_id": gist_data["user_id"][i],
                "question_id": gist_data["question_id"][i],
                "answer": gist_data["answer"][i]
            })
        
        # Statistika hisoblash
        question_stats = {}
        user_data = {}
        
        for row in responses:
            q_id = row["question_id"]
            answer = row["answer"]
            user_id = row["user_id"]
            
            if user_id not in user_data:
                user_data[user_id] = {}
            user_data[user_id][q_id] = answer
            
            if q_id not in question_stats:
                question_stats[q_id] = {}
            
            if answer not in question_stats[q_id]:
                question_stats[q_id][answer] = 0
            question_stats[q_id][answer] += 1
        
        return {
            "total": len(responses),
            "question_stats": question_stats,
            "user_count": len(user_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Statistika olishda xatolik: {str(e)}")

@app.get("/responses")
def get_responses(limit: Optional[int] = None):
    """
    Barcha javoblarni qaytaradi
    """
    try:
        gist_data = get_gist_data()
        
        if not gist_data or len(gist_data["timestamp"]) == 0:
            return {
                "total": 0,
                "responses": [],
                "message": "Hozircha javoblar yo'q"
            }
        
        # Ma'lumotlarni qayta tuzish
        responses = []
        for i in range(len(gist_data["timestamp"])):
            responses.append({
                "timestamp": gist_data["timestamp"][i],
                "user_id": gist_data["user_id"][i],
                "question_id": gist_data["question_id"][i],
                "answer": gist_data["answer"][i]
            })
        
        # Limit qo'llash
        if limit and limit > 0:
            responses = responses[-limit:]
        
        return {
            "total": len(responses),
            "responses": responses
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Javoblarni olishda xatolik: {str(e)}")
