# RAG Chatbot Setup Guide

## ✅ What's Implemented

The RAG-powered chatbot is now fully integrated into the LUMEN application with the following features:

### Frontend Features
- **Floating Chat Button**: Located at the bottom-right corner of all authenticated pages
- **Smart UI**: Click the button to open/close the chat window
- **Real-time Responses**: Connected to the backend RAG API
- **Transaction Display**: Shows relevant transactions with each response
- **Suggested Questions**: Quick-start queries for users
- **Session Management**: Maintains conversation context

### Backend Features
- **RAG Service**: Retrieval-Augmented Generation using:
  - FAISS vector database for fast similarity search
  - Sentence Transformers for embeddings (all-MiniLM-L6-v2)
  - Gemini AI for intelligent responses
- **Chat API**: RESTful endpoints for session and message management
- **Transaction Indexing**: All transactions are indexed for semantic search

## 🚀 How to Run

### 1. Start Backend (Port 4000)

```bash
cd Final-Lumen

# Activate virtual environment
.\env\Scripts\Activate.ps1

# Start the server on port 4000
uvicorn main:app --reload --port 4000
```

**Important**: The backend must run on **port 4000** for the frontend to connect properly.

### 2. Start Frontend

```bash
cd LUMEN

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

The frontend will typically run on `http://localhost:5173`

## 📊 Test Data

The system already has:
- ✅ 300 indexed transactions (200 consumer + 100 business)
- ✅ Demo users:
  - **Consumer**: `demo.consumer@lumen.app` / `Demo@123`
  - **Business**: `demo.business@lumen.app` / `Demo@123`

## 🎯 How to Use the Chatbot

1. **Login** to the application
2. Navigate to **Dashboard**, **Analytics**, or **Pending Reviews** page
3. Look for the **floating cyan chat button** at the bottom-right corner
4. **Click** the button to open the chat window
5. **Ask questions** like:
   - "Show me my grocery expenses"
   - "What did I spend on food this month?"
   - "Tell me about my recent purchases at Swiggy"
   - "Show me all my transport expenses"

### Example Queries

```
✅ "Show me my grocery expenses"
✅ "What did I spend on food?"
✅ "Tell me about my recent purchases at Swiggy"
✅ "Show me all my transport expenses"
✅ "What were my biggest purchases?"
✅ "Analyze my spending patterns"
```

## 🔧 Troubleshooting

### Chatbot not appearing?
- Make sure you're logged in
- Check that you're on Dashboard, Analytics, or Pending Reviews page
- Refresh the page

### Getting empty responses?
- Ensure backend is running on port 4000
- Check browser console for errors
- Verify you're logged in with a user that has transactions

### No transactions found?
Run the reindexing script:
```bash
cd Final-Lumen
python reindex_all_transactions.py
```

### Backend connection errors?
- Verify backend is running: `http://localhost:4000/health`
- Check the API URL in browser dev tools (Network tab)
- Ensure no CORS errors in console

## 📁 Files Modified

### Frontend (LUMEN/)
- `src/components/AIChatAssistant.tsx` - Updated to use real RAG API
- `src/pages/DashboardPremium.tsx` - Added chatbot
- `src/pages/PendingReviewPagePremium.tsx` - Added chatbot
- `src/pages/AnalyticsPage.tsx` - Added chatbot
- `src/services/api.ts` - Chat service already existed
- `src/config/api.ts` - Chat endpoints already configured

### Backend (Final-Lumen/)
- No changes needed - RAG service was already working!
- `app/services/rag_service.py` - RAG implementation
- `app/api/v1/endpoints/chat.py` - Chat API endpoints
- `test_rag_demo.py` - New test file created

## 🎨 UI Features

The chatbot includes:
- ✨ Smooth animations and transitions
- 💬 Clean, modern chat interface
- 📊 Inline transaction display with each response
- 💡 Suggested questions for new users
- ⚡ Real-time typing indicators
- 🔔 Error handling with user-friendly messages
- 🎯 Session persistence across page navigation

## 🔐 Security

- All API calls include JWT authentication
- Session management ensures user isolation
- Only authenticated users can access the chatbot
- Transactions are filtered by user

## 📈 Performance

- FAISS provides fast vector similarity search
- Embeddings are cached for better performance
- Responses typically take 1-3 seconds
- Up to 5 relevant transactions retrieved per query

## 🎉 Success!

Your RAG chatbot is now fully functional! Users can interact with their financial data using natural language queries, and the AI will provide intelligent responses backed by their actual transaction data.
