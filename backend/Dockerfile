FROM python:3.11-slim

WORKDIR /app

# Backend papkasiga o'tish
WORKDIR /app/backend

# Dependencies o'rnatish
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kodlarni ko'chirish
COPY backend/ .

# Port ochish
EXPOSE 8000

# Server ishga tushirish
CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "8000"]
