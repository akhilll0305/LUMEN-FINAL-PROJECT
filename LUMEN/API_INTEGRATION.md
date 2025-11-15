# LUMEN Frontend - API Integration

## Overview

The LUMEN frontend is now fully integrated with the Final-Lumen backend API. All API calls use centralized configuration for easy maintenance and deployment.

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:4000
```

For production, update this to your production API URL.

### API Configuration

All API endpoints are configured in `src/config/api.ts`:

- Centralized base URL management
- Type-safe endpoint definitions
- Helper functions for headers and error handling

## API Services

We've created service modules in `src/services/api.ts` for clean API calls:

### Authentication Services
```typescript
import { authService } from '../services/api';

// Login
const result = await authService.login(email, password, userType);

// Register
const formData = new FormData();
// ... add fields
const result = await authService.register(formData);

// Logout
const result = await authService.logout();
```

### User Services
```typescript
import { userService } from '../services/api';

// Get current user
const result = await userService.getCurrentUser();

// Update profile
const result = await userService.updateProfile(updates);
```

### Transaction Services
```typescript
import { transactionService } from '../services/api';

// Get transactions
const result = await transactionService.getTransactions({ limit: 100 });

// Get statistics
const result = await transactionService.getStats(30); // last 30 days

// Confirm transaction
const result = await transactionService.confirmTransaction(txId, true, 'notes');
```

### Chat Services
```typescript
import { chatService } from '../services/api';

// Create session
const result = await chatService.createSession();

// Send message
const result = await chatService.sendMessage('Hello AI', sessionId);

// Get history
const result = await chatService.getHistory(sessionId);
```

### Ingestion Services
```typescript
import { ingestionService } from '../services/api';

// Upload file
const result = await ingestionService.uploadFile(file);

// Gmail status
const result = await ingestionService.getGmailStatus();

// Sync Gmail
const result = await ingestionService.syncGmail(30);
```

### Anomaly Services
```typescript
import { anomalyService } from '../services/api';

// Get flagged transactions
const result = await anomalyService.getFlagged({ unconfirmed_only: true });
```

## Available API Endpoints

### Authentication (`/api/v1/auth`)
- ✅ `POST /auth/register` - Register new user
- ✅ `POST /auth/login` - Login user
- ✅ `POST /auth/logout` - Logout user

### Users (`/api/v1/users`)
- ✅ `GET /users/me` - Get current user profile
- ✅ `PATCH /users/me` - Update user profile
- ✅ `PATCH /users/me/consent` - Update consent flags

### Transactions (`/api/v1/transactions`)
- ✅ `GET /transactions/` - List transactions
- ✅ `GET /transactions/stats` - Get statistics
- ✅ `GET /transactions/{id}` - Get transaction details
- ✅ `POST /transactions/{id}/confirm` - Confirm/reject transaction

### Anomalies (`/api/v1/anomalies`)
- ✅ `GET /anomalies/flagged` - Get flagged transactions
- ✅ `GET /anomalies/{id}/explain` - Explain anomaly

### Chat & RAG (`/api/v1/chat`)
- ✅ `POST /chat/session` - Create chat session
- ✅ `POST /chat/message` - Send message
- ✅ `GET /chat/session/{id}/history` - Get chat history
- ✅ `POST /chat/exact-lookup` - Exact transaction lookup
- ✅ `POST /chat/memory` - Store persistent memory

### Data Ingestion (`/api/v1/ingest`)
- ✅ `POST /ingest/upload` - Upload receipt/invoice
- ✅ `GET /ingest/gmail/status` - Gmail integration status
- ✅ `POST /ingest/gmail/connect` - Connect Gmail
- ✅ `POST /ingest/gmail/sync` - Sync Gmail transactions
- ✅ `POST /ingest/whatsapp` - WhatsApp webhook
- ✅ `POST /ingest/manual/consumer` - Manual consumer transaction
- ✅ `POST /ingest/manual/business` - Manual business transaction

## Changes Made

### New Files Created
1. ✅ `src/config/api.ts` - Centralized API configuration
2. ✅ `src/services/api.ts` - API service utilities
3. ✅ `src/vite-env.d.ts` - TypeScript environment definitions
4. ✅ `.env` - Environment configuration
5. ✅ `.env.example` - Environment template

### Updated Files
1. ✅ `src/pages/AuthPage.tsx` - Updated login/register endpoints
2. ✅ `src/pages/DashboardPremium.tsx` - Updated user profile endpoint
3. ✅ `src/pages/Dashboard.tsx` - Updated user profile endpoint
4. ✅ `src/components/UploadModal.tsx` - Implemented real file upload
5. ✅ `.gitignore` - Added .env protection

### Removed
- ❌ Hardcoded API URLs (replaced with configuration)
- ❌ Mock upload implementation (replaced with real API)

## Authentication Flow

1. **Login/Register** → Receives JWT token
2. **Store Token** → `localStorage.setItem('AUTH_TOKEN', token)`
3. **API Calls** → Token automatically included via `getAuthHeaders()`
4. **Token Expiry** → Redirect to login (401 response)

## Error Handling

All API calls return a consistent response format:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
```

Usage:
```typescript
const result = await userService.getCurrentUser();
if (result.success) {
  console.log('User data:', result.data);
} else {
  console.error('Error:', result.error);
}
```

## Running the Application

### Start Backend (Port 4000)
```bash
cd Final-Lumen
uvicorn main:app --reload --port 4000
```

### Start Frontend (Port 5173)
```bash
cd LUMEN
npm run dev
```

The frontend will automatically connect to `http://localhost:4000` as configured in `.env`.

## Production Deployment

1. Update `.env` with production API URL:
   ```env
   VITE_API_URL=https://api.yourdomain.com
   ```

2. Build the frontend:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to your hosting service.

## API Documentation

- Swagger UI: http://localhost:4000/api/docs
- ReDoc: http://localhost:4000/api/redoc

## Notes

- All API endpoints require authentication except `/auth/login` and `/auth/register`
- JWT tokens are stored in `localStorage` under key `AUTH_TOKEN`
- CORS is enabled in backend for development
- File uploads support images and PDFs up to configured limit
- Toast notifications show API success/error messages
