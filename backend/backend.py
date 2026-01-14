from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import csv
import os
import json
from typing import Optional

app = FastAPI(
    title="AI Resistance Survey API",
    description="Uran qazib olish sohasida Sun'iy Intellekt joriy etilishiga bo'lgan qarshilikni o'rganish uchun so'rovnoma backend API",
    version="1.0.0"
)

# CORS yoqish
# Production'da faqat kerakli domain'larni qo'shing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production'da o'zgartirish kerak
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variable'dan olish yoki default qiymat
FILE_NAME = os.getenv("CSV_FILE_NAME", "responses.csv")

class SurveyResponse(BaseModel):
    user_id: str
    answers: dict

@app.get("/")
def root():
    """API root endpoint"""
    return {
        "message": "AI Resistance Survey API",
        "version": "1.0.0",
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
    So'rovnoma javoblarini qabul qilish va CSV faylga saqlash
    
    Args:
        data: SurveyResponse model - user_id va answers o'z ichiga oladi
    
    Returns:
        dict: {"status": "ok"} muvaffaqiyatli saqlanganda
    """
    try:
        file_exists = os.path.isfile(FILE_NAME)

        with open(FILE_NAME, mode="a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)

            if not file_exists:
                writer.writerow(["timestamp", "user_id", "question_id", "answer"])

            for q_id, answer in data.answers.items():
                writer.writerow([
                    datetime.now().isoformat(),
                    data.user_id,
                    q_id,
                    json.dumps(answer, ensure_ascii=False) if isinstance(answer, dict) else answer
                ])

        return {"status": "ok", "message": "Javoblar muvaffaqiyatli saqlandi"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Xatolik yuz berdi: {str(e)}")

@app.get("/stats")
def get_stats():
    """
    Barcha javoblarning statistikasini qaytaradi
    
    Returns:
        dict: {
            "total": int - Jami javoblar soni,
            "question_stats": dict - Savollar bo'yicha statistika,
            "user_count": int - Foydalanuvchilar soni
        }
    """
    try:
        if not os.path.isfile(FILE_NAME):
            return {
                "total": 0,
                "question_stats": {},
                "user_count": 0,
                "message": "Hozircha javoblar yo'q"
            }
        
        responses = []
        with open(FILE_NAME, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                responses.append(row)
        
        # Savollar bo'yicha yig'indi
        question_stats = {}
        user_data = {}
        
        for row in responses:
            q_id = row["question_id"]
            answer = row["answer"]
            user_id = row["user_id"]
            
            # Har bir foydalanuvchining barcha javoblarini yig'ish
            if user_id not in user_data:
                user_data[user_id] = {}
            user_data[user_id][q_id] = answer
            
            # Savollar bo'yicha statistika
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
    
    Args:
        limit (Optional[int]): Qaytariladigan javoblar soni chegarasi
    
    Returns:
        dict: {
            "total": int - Jami javoblar soni,
            "responses": list - Javoblar ro'yxati
        }
    """
    try:
        if not os.path.isfile(FILE_NAME):
            return {
                "total": 0,
                "responses": [],
                "message": "Hozircha javoblar yo'q"
            }
        
        responses = []
        with open(FILE_NAME, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                responses.append(row)
        
        # Limit qo'llash agar berilgan bo'lsa
        if limit and limit > 0:
            responses = responses[-limit:]
        
        return {
            "total": len(responses),
            "responses": responses
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Javoblarni olishda xatolik: {str(e)}")
