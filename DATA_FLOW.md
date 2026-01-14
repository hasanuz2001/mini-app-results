# 📊 Ma'lumotlar Oqimi (Data Flow)

## ❌ Nima emas

**GitHub'ga ma'lumotlar saqlanmaydi!**

GitHub faqat **kod saqlash** uchun ishlatiladi, **ma'lumotlar saqlash** uchun emas.

## ✅ Haqiqiy ma'lumotlar oqimi

### 1. Survey to'ldirish (mini-app)

```
User Telegram'da survey to'ldiradi
    ↓
mini-app (frontend)
    ↓
POST /submit → Backend API'ga yuboriladi
```

**Kod:** `mini-app/app.js` → `submitToBackend()`

### 2. Backend'da saqlash

```
Backend API javoblarni qabul qiladi
    ↓
CSV faylga yoziladi (responses.csv)
    ↓
Ma'lumotlar backend server'da saqlanadi
```

**Kod:** `mini-app-results/backend/backend.py` → `submit_response()`

**Saqlash joyi:** Backend server'da `responses.csv` fayli

### 3. Dashboard ma'lumotlarni olish

```
Dashboard ochiladi
    ↓
GET /stats → Backend API'dan statistika
GET /responses → Backend API'dan javoblar
    ↓
Dashboard ko'rsatadi
```

**Kod:** `mini-app-results/dashboard.js` → `loadData()`

## 📁 Struktura

```
┌─────────────────────────────────────┐
│  GitHub Repository                  │
│  (Faqat kod saqlash)                │
│                                     │
│  mini-app-results/                  │
│  ├── backend/                      │
│  │   └── backend.py  ← Kod         │
│  ├── dashboard.js   ← Kod          │
│  └── index.html     ← Kod          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Backend Server                     │
│  (Ma'lumotlar saqlash)              │
│                                     │
│  responses.csv  ← JAVOBLAR BURDA!  │
│                                     │
│  Backend API:                       │
│  - POST /submit  (javob qabul)     │
│  - GET /stats    (statistika)      │
│  - GET /responses (barcha javoblar) │
└─────────────────────────────────────┘
```

## 🔄 To'liq oqim

```
1. User survey to'ldiradi
   ↓
2. mini-app → POST /submit → Backend API
   ↓
3. Backend API → responses.csv faylga yozadi
   ↓
4. Dashboard → GET /stats → Backend API
   ↓
5. Backend API → responses.csv dan o'qiydi
   ↓
6. Dashboard → Ma'lumotlarni ko'rsatadi
```

## 📍 Muhim nuqtalar

1. **GitHub = Kod saqlash**
   - Backend kodi (`backend.py`)
   - Frontend kodi (`dashboard.js`)
   - Deployment fayllari

2. **Backend Server = Ma'lumotlar saqlash**
   - `responses.csv` fayli
   - Barcha survey javoblari
   - Statistika

3. **Backend deploy qilish kerak**
   - Railway, Render, Heroku yoki boshqa platforma
   - Backend server ishlamasa, ma'lumotlar saqlanmaydi!

## 🚀 Deployment

### Backend deploy qilish (majburiy!)

Backend'ni deploy qilish kerak, chunki:
- Ma'lumotlar backend server'da saqlanadi
- Dashboard backend'dan ma'lumot oladi
- Backend ishlamasa, hech narsa ishlamaydi

**Deploy platformalar:**
- Railway (tavsiya)
- Render
- Heroku
- Boshqa cloud platformalar

### Frontend deploy qilish

- mini-app: GitHub Pages, Netlify, Vercel
- mini-app-results (dashboard): GitHub Pages, Netlify, Vercel

## ⚠️ Eslatma

**GitHub repository'da ma'lumotlar yo'q!**

- GitHub'da faqat kod bor
- Ma'lumotlar backend server'da `responses.csv` faylida
- Backend deploy qilish kerak
- Backend URL'ni sozlash kerak (`config.js`)

## 🔍 Tekshirish

### Backend ishlayaptimi?

```bash
curl https://your-backend-url.com/
```

### Ma'lumotlar bormi?

```bash
curl https://your-backend-url.com/stats
```

### Dashboard backend'ga ulanayaptimi?

Browser console'da:
```javascript
console.log('API_BASE:', API_BASE);
```

## 📝 Xulosa

1. ✅ Survey javoblari → Backend API'ga yuboriladi
2. ✅ Backend API → CSV faylga saqlaydi (server'da)
3. ✅ Dashboard → Backend API'dan o'qiydi
4. ❌ GitHub'ga ma'lumotlar saqlanmaydi (faqat kod)
