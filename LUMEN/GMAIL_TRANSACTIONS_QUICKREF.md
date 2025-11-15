# Gmail Transactions - Quick Reference

## What Changed

### Dashboards Now Show Real Gmail Transactions ✅

**Before:**
- Mock/hardcoded transaction data
- No real-time updates
- No Gmail integration visible

**After:**
- Real transactions from API (including Gmail)
- Auto-refresh every 30 seconds
- Gmail transactions show **📧 Gmail** badge
- Loading and empty states

## Key Features

### 1. Automatic Display
```
User logs in
    ↓
Gmail monitor starts automatically
    ↓
Email arrives → Transaction created
    ↓
Dashboard polls API every 30s
    ↓
New transaction appears with badge!
```

### 2. Visual Indicators
- **📧 Gmail** badge on auto-imported transactions
- Gold accent color (`text-luxe-gold`)
- Clear source identification

### 3. Real-Time Updates
- Polls API every 30 seconds
- Fetches latest transactions
- Updates stats automatically
- No manual refresh needed

## User Journey

1. **Login** → Gmail monitor activates
2. **Wait 3-5 seconds** → Monitor fully initialized
3. **Email arrives** → Processed within 30s
4. **Dashboard updates** → Transaction appears
5. **Badge shows** → User knows it's from Gmail

## Transaction Display

### Gmail Transaction Example:
```
🛒 Amazon Pay
   Groceries  📧 Gmail
   $45.99 • 5 minutes ago
```

### Manual Transaction Example:
```
☕ Starbucks
   Dining
   $5.47 • 2 hours ago
```

## Technical Details

### Polling Interval:
- **30 seconds** (matches Gmail monitor check interval)
- Configurable in Dashboard components

### API Calls:
```typescript
// Every 30 seconds
const response = await transactionService.getTransactions({ limit: 100 });
const statsRes = await fetch(API_ENDPOINTS.TRANSACTIONS.STATS);
```

### Transaction Fields Used:
- `merchant_name` / `merchant_name_raw` / `merchant`
- `category`
- `amount`
- `date` / `timestamp`
- `source` ← **"gmail"** for Gmail transactions
- `status` / `user_confirmed`
- `is_anomaly`

## Where Transactions Appear

### 1. Dashboard (Standard)
- Recent Transactions section
- Shows top 3 confirmed transactions
- Gmail badge visible

### 2. Dashboard Premium
- Recent Transactions cards
- Shows top 5 transactions
- Gmail badge in TransactionCard

### 3. Stats Cards
- Total spent includes Gmail transactions
- Category breakdown includes Gmail data
- All calculations use real API data

## Testing

### Quick Test:
```bash
# 1. Start backend
cd Final-Lumen
uvicorn main:app --reload --port 8000

# 2. Start frontend
cd LUMEN
npm run dev

# 3. Login and check console
# Should see: "[Dashboard] Fetching transactions from API..."

# 4. Send test email to siddharth24102@iiitnr.edu.in

# 5. Wait 30-60 seconds

# 6. Check dashboard - transaction should appear with badge
```

### Console Logs to Watch:
```
[Dashboard] Fetching transactions from API...
[Dashboard] Loaded X transactions (including Gmail)
[Dashboard] Stats loaded: {...}
```

## Troubleshooting

### No Transactions Showing?
1. Check backend is running on port 8000
2. Check browser console for errors
3. Verify auth token exists: `localStorage.getItem('AUTH_TOKEN')`
4. Check API response: Network tab → `/api/v1/transactions/`

### Gmail Transactions Not Appearing?
1. Verify Gmail monitor is active (check status component)
2. Wait full 60 seconds (30s Gmail check + 30s dashboard poll)
3. Check backend logs for email processing
4. Verify email was sent to correct address

### Badge Not Showing?
1. Check transaction has `source: 'gmail'` in API response
2. Verify TransactionCard component receives `source` prop
3. Check browser console for component errors

## Files to Check

If something's wrong, check these files:

1. **Dashboard.tsx** - Main transaction fetching
2. **DashboardPremium.tsx** - Premium transaction display
3. **TransactionCardComponent.tsx** - Gmail badge rendering
4. **gmailMonitor.ts** - Monitor setup service
5. **GmailMonitorStatus.tsx** - Status indicator

---

**Status**: ✅ Production Ready
**Last Updated**: November 15, 2025
