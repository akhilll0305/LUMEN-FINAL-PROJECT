"""
Gmail Auto-Ingestion Test Script
Tests the complete flow: Login → Stop → Start → Check → Display

Run this after starting the backend server to verify Gmail integration works
"""

import requests
import time
import json

API_BASE_URL = "http://localhost:8000"

def test_gmail_flow():
    """Test the complete Gmail auto-ingestion flow"""
    
    print("=" * 80)
    print("GMAIL AUTO-INGESTION TEST")
    print("=" * 80)
    
    # Step 1: Login
    print("\n[1] Logging in...")
    login_data = {
        "email": "test@example.com",  # Replace with your test user
        "password": "password123",     # Replace with your test password
        "user_type": "consumer"
    }
    
    login_response = requests.post(
        f"{API_BASE_URL}/api/v1/auth/login",
        json=login_data
    )
    
    if not login_response.ok:
        print(f"❌ Login failed: {login_response.text}")
        return
    
    auth_data = login_response.json()
    token = auth_data["access_token"]
    user_id = auth_data["user_id"]
    
    print(f"✅ Logged in successfully as User ID: {user_id}")
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Step 2: Stop existing monitor
    print("\n[2] Stopping existing Gmail monitor...")
    stop_response = requests.post(
        f"{API_BASE_URL}/api/v1/n8n/gmail/stop",
        headers=headers
    )
    
    if stop_response.ok:
        print("✅ Monitor stopped")
    else:
        print(f"⚠️  Stop failed (may not have been running): {stop_response.text}")
    
    time.sleep(1)
    
    # Step 3: Start monitor for this user
    print("\n[3] Starting Gmail monitor for current user...")
    start_response = requests.post(
        f"{API_BASE_URL}/api/v1/n8n/gmail/start",
        headers=headers
    )
    
    if not start_response.ok:
        print(f"❌ Start failed: {start_response.text}")
        return
    
    start_data = start_response.json()
    print(f"✅ Monitor started!")
    print(f"   Monitored Email: {start_data['monitored_email']}")
    print(f"   Saving to User ID: {start_data['saving_to_user_id']}")
    print(f"   User Type: {start_data['saving_to_user_type']}")
    print(f"   Check Interval: {start_data['check_interval_seconds']}s")
    
    # Step 4: Check status
    print("\n[4] Checking monitor status...")
    status_response = requests.get(f"{API_BASE_URL}/api/v1/n8n/gmail/status")
    
    if status_response.ok:
        status_data = status_response.json()
        print(f"✅ Status retrieved:")
        print(f"   Running: {status_data['running']}")
        print(f"   Active User: {status_data['transactions_saving_to_user_id']}")
        print(f"   Last Check: {status_data['last_check']}")
        print(f"   Messages Processed: {status_data['processed_messages_count']}")
    
    # Step 5: Force immediate check
    print("\n[5] Forcing immediate Gmail check...")
    time.sleep(2)  # Wait for monitor to initialize
    
    check_response = requests.post(
        f"{API_BASE_URL}/api/v1/n8n/gmail/check-now",
        headers=headers
    )
    
    if check_response.ok:
        check_data = check_response.json()
        print(f"✅ Immediate check completed!")
        print(f"   Message: {check_data['message']}")
        print(f"   Processed: {check_data.get('processed_messages_count', 0)} messages")
    else:
        print(f"⚠️  Check failed: {check_response.text}")
    
    # Step 6: Get transactions
    print("\n[6] Fetching transactions...")
    time.sleep(1)
    
    txn_response = requests.get(
        f"{API_BASE_URL}/api/v1/transactions/?limit=10",
        headers=headers
    )
    
    if txn_response.ok:
        txn_data = txn_response.json()
        transactions = txn_data.get("transactions", [])
        print(f"✅ Retrieved {len(transactions)} transactions")
        
        gmail_txns = [t for t in transactions if t.get("source") == "gmail"]
        print(f"   Gmail transactions: {len(gmail_txns)}")
        
        if gmail_txns:
            print("\n   Recent Gmail transactions:")
            for txn in gmail_txns[:3]:
                print(f"   - {txn.get('merchant_name', 'Unknown')}: ${txn.get('amount', 0):.2f}")
                print(f"     Category: {txn.get('category', 'N/A')}")
                print(f"     Date: {txn.get('date', 'N/A')}")
                print()
    else:
        print(f"❌ Transaction fetch failed: {txn_response.text}")
    
    # Step 7: Monitor background checks
    print("\n[7] Monitoring background checks (30 seconds)...")
    print("   Waiting for automatic check cycle...")
    print("   (The monitor should check every 30 seconds)")
    
    for i in range(30):
        print(f"\r   Waiting: {30-i}s remaining...", end="", flush=True)
        time.sleep(1)
    
    print("\n\n[8] Checking status after 30 seconds...")
    status_response2 = requests.get(f"{API_BASE_URL}/api/v1/n8n/gmail/status")
    
    if status_response2.ok:
        status_data2 = status_response2.json()
        print(f"✅ Status after wait:")
        print(f"   Last Check: {status_data2['last_check']}")
        print(f"   Messages Processed: {status_data2['processed_messages_count']}")
    
    print("\n" + "=" * 80)
    print("TEST COMPLETE!")
    print("=" * 80)
    print("\nNext steps:")
    print("1. Send a test transaction email to: siddharth24102@iiitnr.edu.in")
    print("2. Wait 30-60 seconds")
    print("3. Check your dashboard - transaction should appear with 📧 Gmail badge")
    print("\nMonitor logs with:")
    print("  Backend: Check terminal running uvicorn")
    print("  Frontend: Check browser console")


if __name__ == "__main__":
    try:
        test_gmail_flow()
    except Exception as e:
        print(f"\n❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
