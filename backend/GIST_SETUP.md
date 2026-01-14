# 🚀 GitHub Gist API Setup Qo'llanmasi

## 📋 Gist ID olish

### Usul 1: Python script orqali (Tavsiya)

1. **Script'ni ishga tushiring:**
```bash
cd backend
python3 create_gist.py
```

2. **"1" ni tanlang** (Yangi Gist yaratish)

3. **Gist ID olinadi:**
```
✅ Gist muvaffaqiyatli yaratildi!
📋 Gist ID: abc123def456...
```

4. **config.js faylida GIST_ID ni o'zgartiring:**
```javascript
GIST_ID: 'abc123def456...'  // Olingan Gist ID
```

### Usul 2: GitHub web orqali

1. **GitHub'ga kiring**: https://gist.github.com
2. **"Create a new gist"** tugmasini bosing
3. **Fayl nomi**: `responses.json`
4. **Kontent**:
```json
{
  "timestamp": [],
  "user_id": [],
  "question_id": [],
  "answer": []
}
```
5. **"Create secret gist"** yoki **"Create public gist"** tugmasini bosing
6. **Gist ID** URL'dan oling: `https://gist.github.com/username/abc123def456...`
   - Gist ID: `abc123def456...` (URL'dagi oxirgi qism)

### Usul 3: cURL orqali

```bash
curl -X POST https://api.github.com/gists \
  -H "Authorization: token YOUR_TOKEN_HERE" \
  -d '{
    "description": "Survey responses",
    "public": false,
    "files": {
      "responses.json": {
        "content": "{\"timestamp\": [], \"user_id\": [], \"question_id\": [], \"answer\": []}"
      }
    }
  }'
```

Javobdan `"id"` ni oling.

## ⚙️ Backend'ni sozlash

### 1. Environment variables

Backend'ni ishga tushirishdan oldin:

```bash
export GITHUB_TOKEN="your-github-token-here"
export GIST_ID="your-gist-id-here"
```

### 2. backend_gist.py ishlatish

`backend.py` o'rniga `backend_gist.py` ishlatish:

```bash
# Development
python3 -m uvicorn backend_gist:app --reload --host 0.0.0.0 --port 8000

# Production
python3 -m uvicorn backend_gist:app --host 0.0.0.0 --port 8000
```

### 3. Procfile yangilash (Heroku uchun)

```procfile
web: cd backend && uvicorn backend_gist:app --host 0.0.0.0 --port $PORT
```

## 📝 Config.js sozlash

`mini-app/config.js` faylida:

```javascript
const CONFIG = {
    GITHUB_TOKEN: 'your-github-token-here',  // Environment variable'dan oling
    GIST_ID: 'your-gist-id-here',  // ← Gist ID ni qo'ying
    
    API_BASE: "http://localhost:8000"  // yoki production URL
};
```

## 🔍 Tekshirish

### 1. Gist mavjudligini tekshirish

```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/gists/YOUR_GIST_ID
```

### 2. Backend ishlayaptimi?

```bash
curl http://localhost:8000/
```

### 3. Ma'lumotlar saqlanayaptimi?

```bash
curl -X POST http://localhost:8000/submit \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test_user",
    "answers": {"1": "test answer"}
  }'
```

## ⚠️ Muhim eslatmalar

1. **Rate Limit**: Soatiga 5000 so'rov
2. **Hajm cheklovi**: 1 MB per file
3. **Token xavfsizligi**: Token'ni public repository'da qo'ymang
4. **Gist ID**: Private gist yaratish tavsiya etiladi

## 🚀 Deployment

### Railway

1. Environment variables qo'shing:
   - `GITHUB_TOKEN`
   - `GIST_ID`

2. Start command:
   ```bash
   cd backend && uvicorn backend_gist:app --host 0.0.0.0 --port $PORT
   ```

### Render

1. Environment variables qo'shing
2. Build: `pip install -r requirements.txt`
3. Start: `cd backend && uvicorn backend_gist:app --host 0.0.0.0 --port $PORT`

## 📊 Ma'lumotlar formati

Gist'da saqlanadigan format:

```json
{
  "timestamp": ["2024-01-15T10:30:00", ...],
  "user_id": ["user_123", ...],
  "question_id": ["1", "2", ...],
  "answer": ["John Doe", "6-10 yil", ...]
}
```

## 🔗 Foydali linklar

- [GitHub Gist API](https://docs.github.com/en/rest/gists)
- [Rate Limits](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
