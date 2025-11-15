# Gmail Auto-Ingestion Integration Guide

## Overview

The LUMEN application now includes **automatic Gmail transaction monitoring** that extracts transaction data from emails and saves them to user accounts.

### Key Features
- ✅ Automatic 3-step setup on login/signup
- ✅ Real-time status indicator in dashboard
- ✅ Background monitoring every 30 seconds
- ✅ AI-powered transaction extraction
- ✅ Seamless user experience

---

## Implementation Summary

### 1. **API Configuration** (`src/config/api.ts`)
Added Gmail monitor endpoints:
```typescript
GMAIL_MONITOR: {
  START: '/api/v1/n8n/gmail/start',
  STOP: '/api/v1/n8n/gmail/stop',
  CHECK_NOW: '/api/v1/n8n/gmail/check-now',
  STATUS: '/api/v1/n8n/gmail/status',
  AUTHENTICATE: '/api/v1/n8n/gmail/authenticate',
  HEALTH: '/api/v1/n8n/health',
}
```

### 2. **Gmail Monitor Service** (`src/services/gmailMonitor.ts`)
Core service implementing the 3-step flow:
- **Step 1**: Stop existing monitor
- **Step 2**: Start monitor for current user
- **Step 3**: Force immediate email check

```typescript
import { setupGmailForUser } from '../services/gmailMonitor';

// After login
const result = await setupGmailForUser(authToken);
if (result.success) {
  console.log(`Gmail active for User ${result.userId}`);
}
```

### 3. **Authentication Integration** (`src/pages/AuthPage.tsx`)
Automatically sets up Gmail monitoring after login/signup:

```typescript
// Login flow
setupGmailForUser(data.access_token)
  .then((result) => {
    if (result.success) {
      console.log(`🎉 Gmail monitoring active for User ${result.userId}`);
    }
  });
```

### 4. **Status Component** (`src/components/GmailMonitorStatus.tsx`)
Real-time status indicator showing:
- Monitor active/inactive status
- Monitored email address
- Current user ID receiving transactions
- Last check time
- Check interval
- Processed message count

### 5. **Dashboard Integration**
Added status component to both dashboards:
- `src/pages/Dashboard.tsx`
- `src/pages/DashboardPremium.tsx`

---

## User Flow

### On Login/Signup:
1. User authenticates successfully
2. **Automatically** calls 3-step Gmail setup
3. Monitor starts within 3-5 seconds
4. Status indicator shows "Active" in dashboard
5. Transactions appear within 30 seconds (or instantly with check-now)

### Visual Indicators:
```
✅ Gmail Monitor: Active
   Monitored inbox: siddharth24102@iiitnr.edu.in
   Your User ID: 123
   Last check: 30 seconds ago
   Check interval: 30 seconds
   Transactions imported today: 5
```

---

## Testing

### Manual Testing:
1. **Login** to the application
2. Check browser console for:
   ```
   📧 Gmail Monitor Setup - Step 1/3: Stopping existing monitor...
   ✓ Existing monitor stopped
   📧 Gmail Monitor Setup - Step 2/3: Starting monitor for your account...
   ✓ Gmail monitor started!
   📧 Gmail Monitor Setup - Step 3/3: Checking for transaction emails...
   ✓ Gmail check complete
   🎉 Gmail monitoring fully activated!
   ```
3. Verify status component in dashboard shows "Active"
4. Send test transaction email to monitored inbox
5. Wait 30 seconds OR refresh dashboard
6. Verify transaction appears in your account

### Using Test Functions:
Open browser console and run:
```javascript
// Check current status
await checkGmailStatus();

// Test full setup (replace with actual token)
const token = localStorage.getItem('AUTH_TOKEN');
await testGmailSetup(token);
```

---

## Architecture Notes

### Single Monitor System:
- **Only ONE user** receives transactions at any time
- **Last user to login** becomes the active user
- Previous user automatically disconnected
- No multi-user simultaneous monitoring

### Background Processing:
- Monitor runs in backend thread
- Checks every **30 seconds** automatically
- Processes **only unread** emails
- Marks emails as **read** after processing
- Uses **Google Gemini AI** for extraction

### Email Processing:
1. Search for transaction keywords
2. Extract: amount, merchant, date, payment method
3. Create transaction record linked to active user
4. Auto-categorize using user's categories
5. Index for RAG chatbot queries
6. Mark email as read

---

## Error Handling

### Frontend Errors:
```typescript
if (!result.success) {
  const errorMsg = getGmailErrorMessage(result.error);
  // Display to user (toast/notification)
}
```

### Common Issues:

| Error | Cause | Solution |
|-------|-------|----------|
| "Gmail service not authenticated" | OAuth token expired | Admin must re-authenticate |
| "Token expired or invalid" | JWT expired | User needs to re-login |
| "Failed to start Gmail monitor" | Backend issue | Check backend logs |
| "No transaction data extracted" | Email format | AI parsing failed (non-critical) |

---

## Backend Requirements

### Environment Variables:
```bash
GEMINI_API_KEY=<your_gemini_key>
GMAIL_CREDENTIALS_PATH=credentials/gmail_credentials.json
GMAIL_TOKEN_PATH=credentials/gmail_token.json
```

### Gmail OAuth Setup:
1. Create OAuth credentials in Google Cloud Console
2. Save to `credentials/gmail_credentials.json`
3. Run authentication: `POST /api/v1/n8n/gmail/authenticate`
4. Token saved to `credentials/gmail_token.json`

### Database:
- Transactions stored in `lumen_db`
- Audit trail in `lumen_audit_db`
- E2EE encryption for sensitive data

---

## API Endpoints Reference

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/v1/n8n/gmail/start` | POST | ✅ | Start monitor for user |
| `/api/v1/n8n/gmail/stop` | POST | ✅ | Stop monitor |
| `/api/v1/n8n/gmail/check-now` | POST | ✅ | Force immediate check |
| `/api/v1/n8n/gmail/status` | GET | ❌ | Get current status |
| `/api/v1/n8n/gmail/authenticate` | POST | ❌ | OAuth setup (admin) |
| `/api/v1/n8n/health` | GET | ❌ | Health check |

---

## Files Modified

### Frontend:
- ✅ `src/config/api.ts` - Added Gmail monitor endpoints
- ✅ `src/services/gmailMonitor.ts` - Core service (NEW)
- ✅ `src/services/gmailMonitorTest.ts` - Test utilities (NEW)
- ✅ `src/components/GmailMonitorStatus.tsx` - Status component (NEW)
- ✅ `src/pages/AuthPage.tsx` - Auto-setup integration
- ✅ `src/pages/Dashboard.tsx` - Status display
- ✅ `src/pages/DashboardPremium.tsx` - Status display

### Backend:
- Backend endpoints already exist (documented in main system docs)
- No backend changes needed for this frontend integration

---

## Security Considerations

1. **Authentication**: All endpoints use Bearer token authentication
2. **Rate Limiting**: Monitor checks every 30 seconds (server-enforced)
3. **Email Privacy**: Emails not stored, only transaction data extracted
4. **User Isolation**: Each user only sees their own transactions
5. **Encryption**: Transaction data encrypted in database (E2EE)

---

## Future Enhancements

### Potential Improvements:
- [ ] Multi-user simultaneous monitoring (requires architecture change)
- [ ] User-specific Gmail account monitoring
- [ ] Manual trigger button in UI
- [ ] Transaction preview before import
- [ ] Email filter customization
- [ ] Notification on new transactions
- [ ] Setup wizard for first-time users
- [ ] Admin dashboard for monitor management

---

## Support

### Debugging:
1. Check browser console for setup logs
2. Verify `/api/v1/n8n/gmail/status` response
3. Check backend logs for Gmail API errors
4. Verify Gmail OAuth token validity
5. Test Gemini API key

### Common Debug Commands:
```javascript
// Check if monitor is running
fetch('/api/v1/n8n/gmail/status').then(r => r.json()).then(console.log);

// Check auth token
console.log(localStorage.getItem('AUTH_TOKEN'));

// Force re-setup
const token = localStorage.getItem('AUTH_TOKEN');
await setupGmailForUser(token);
```

---

## Conclusion

The Gmail auto-ingestion feature is now **fully integrated** into the LUMEN frontend. Users automatically get transaction monitoring enabled upon login/signup with **zero manual configuration** required.

The system provides:
✅ Seamless user experience
✅ Real-time status visibility
✅ Automatic background processing
✅ Comprehensive error handling
✅ Easy testing and debugging

For detailed backend documentation, see `GMAIL_MONITOR_GUIDE.md` in the root directory.

---

**Last Updated**: November 15, 2025
**Version**: 1.0
**Integration Status**: ✅ Complete
