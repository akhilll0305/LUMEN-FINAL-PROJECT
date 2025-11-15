# 🚀 LUMEN Project - Quick Start Guide

## ✅ Pre-Flight Checklist

### Backend (Final-Lumen)
- ✅ Python dependencies installed
- ✅ `.env` file configured
- ✅ Database setup required (PostgreSQL)

### Frontend (LUMEN)
- ✅ Node modules installed
- ✅ `.env` file configured
- ✅ TypeScript compiled successfully
- ✅ Build tested and working
- ✅ All API endpoints connected

---

## 🗄️ Database Setup (Required First Step)

### 1. Install PostgreSQL
If not already installed, download from: https://www.postgresql.org/download/

### 2. Create Databases
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create databases
CREATE DATABASE lumen_db;
CREATE DATABASE lumen_audit_db;

-- Exit
\q
```

### 3. Update Backend .env
Edit `Final-Lumen/.env` and update database credentials:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/lumen_db
DATABASE_AUDIT_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/lumen_audit_db
```

### 4. Get Gemini API Key (Required for AI features)
1. Go to: https://makersuite.google.com/app/apikey
2. Create API key
3. Update in `Final-Lumen/.env`:
   ```env
   GEMINI_API_KEY=your-actual-api-key-here
   ```

---

## 🚀 Starting the Application

### Terminal 1: Backend (Port 4000)
```bash
cd Final-Lumen
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate    # macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 4000
```

**Backend will be at:** http://localhost:4000
- API Docs: http://localhost:4000/api/docs
- Health Check: http://localhost:4000/health

### Terminal 2: Frontend (Port 5173)
```bash
cd LUMEN
npm install    # If not already done
npm run dev
```

**Frontend will be at:** http://localhost:5173

---

## 🎯 Quick Test

### 1. Check Backend Health
Open: http://localhost:4000/health

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-14T...",
  "version": "1.0.0",
  "environment": "development"
}
```

### 2. Test Frontend
1. Open: http://localhost:5173
2. Click "Sign Up"
3. Register a new account (consumer or business)
4. Login and access dashboard

### 3. Test File Upload
1. Login to dashboard
2. Click "Upload" button
3. Upload a receipt image
4. Backend will process with OCR and AI classification

---

## 📋 Available Features

### ✅ Authentication
- User registration (Consumer/Business)
- Login/Logout
- JWT token-based auth
- Profile management

### ✅ Transaction Management
- List all transactions
- View statistics and analytics
- Confirm/reject transactions
- Category classification

### ✅ Data Ingestion
- Upload receipts/invoices (OCR)
- Gmail integration (sync emails)
- WhatsApp integration
- Manual entry

### ✅ AI Features
- Smart categorization
- Anomaly detection
- Chat assistant (RAG)
- Transaction insights

### ✅ Analytics
- Spending trends
- Category breakdown
- Merchant analysis
- Budget tracking

---

## 🔧 Configuration Files

### Backend (.env)
```env
ENVIRONMENT=development
DEBUG=True
SECRET_KEY=your-super-secret-key-change-in-production
DATABASE_URL=postgresql://postgres:password@localhost:5432/lumen_db
DATABASE_AUDIT_URL=postgresql://postgres:password@localhost:5432/lumen_audit_db
GEMINI_API_KEY=your-gemini-api-key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000
```

---

## 🐛 Troubleshooting

### Backend won't start
1. Check PostgreSQL is running
2. Verify database exists: `psql -U postgres -l`
3. Check `.env` database credentials
4. Ensure all Python packages installed: `pip install -r requirements.txt`

### Frontend build errors
1. Clear cache: `npm cache clean --force`
2. Reinstall: `rm -rf node_modules && npm install`
3. Check Node.js version: `node -v` (should be 18+)

### API connection fails
1. Verify backend is running on port 4000
2. Check frontend `.env` has correct `VITE_API_URL`
3. Check CORS settings in backend
4. Open browser console for error details

### Database errors
```bash
# Check if PostgreSQL is running (Windows)
Get-Service postgresql*

# Start PostgreSQL (if stopped)
Start-Service postgresql-x64-14  # Adjust version number
```

---

## 📚 Documentation

- **API Documentation**: http://localhost:4000/api/docs
- **API Integration Guide**: `LUMEN/API_INTEGRATION.md`
- **Integration Summary**: `LUMEN/INTEGRATION_SUMMARY.md`

---

## 🎉 You're Ready!

Everything is connected and ready to run. Just make sure:

1. ✅ PostgreSQL is installed and databases created
2. ✅ Gemini API key is configured
3. ✅ Backend is running on port 4000
4. ✅ Frontend is running on port 5173

**Start both servers and you're good to go!** 🚀

---

## 📝 Default Credentials

After registration, you can create your own account. The system supports:
- **Consumer accounts**: For personal expense tracking
- **Business accounts**: For business transaction management

---

## 🔗 Quick Links

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- API Docs: http://localhost:4000/api/docs
- Health Check: http://localhost:4000/health

---

**Happy tracking with LUMEN! 💫**
