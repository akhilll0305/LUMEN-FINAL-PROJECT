/**
 * Gmail Monitor Setup Test Script
 * 
 * This script tests the Gmail auto-ingestion 3-step flow
 * Run this after successful login to verify Gmail monitoring setup
 */

import { setupGmailForUser, getGmailStatus } from '../services/gmailMonitor';

/**
 * Test the complete Gmail setup flow
 * @param authToken - JWT token from successful login
 */
export async function testGmailSetup(authToken: string) {
  console.log('='.repeat(80));
  console.log('GMAIL AUTO-INGESTION SETUP TEST');
  console.log('='.repeat(80));
  
  // Test 1: Get initial status
  console.log('\n[TEST 1] Getting initial Gmail monitor status...');
  const initialStatus = await getGmailStatus();
  console.log('Initial Status:', JSON.stringify(initialStatus, null, 2));
  
  // Test 2: Setup Gmail for user
  console.log('\n[TEST 2] Setting up Gmail monitoring for authenticated user...');
  const setupResult = await setupGmailForUser(authToken);
  
  if (setupResult.success) {
    console.log('✅ SUCCESS: Gmail monitoring setup complete!');
    console.log(`   User ID: ${setupResult.userId}`);
    console.log(`   User Type: ${setupResult.userType}`);
    console.log(`   Monitored Email: ${setupResult.monitoredEmail}`);
  } else {
    console.log('❌ FAILED: Gmail monitoring setup failed');
    console.log(`   Error: ${setupResult.error}`);
    return;
  }
  
  // Test 3: Verify status after setup
  console.log('\n[TEST 3] Verifying Gmail monitor status after setup...');
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  
  const finalStatus = await getGmailStatus();
  console.log('Final Status:', JSON.stringify(finalStatus, null, 2));
  
  if (finalStatus?.running && finalStatus.transactions_saving_to_user_id === setupResult.userId) {
    console.log('✅ SUCCESS: Monitor is active and linked to correct user!');
  } else {
    console.log('⚠️  WARNING: Monitor status does not match expected configuration');
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('TEST COMPLETE');
  console.log('='.repeat(80));
  
  return setupResult;
}

/**
 * Quick status check (for debugging)
 */
export async function checkGmailStatus() {
  const status = await getGmailStatus();
  
  console.log('\n📧 Gmail Monitor Status:');
  console.log(`   Running: ${status?.running ? 'YES ✅' : 'NO ❌'}`);
  console.log(`   Monitored Email: ${status?.monitored_email || 'N/A'}`);
  console.log(`   Active User ID: ${status?.transactions_saving_to_user_id || 'N/A'}`);
  console.log(`   Active User Type: ${status?.transactions_saving_to_user_type || 'N/A'}`);
  console.log(`   Last Check: ${status?.last_check || 'Never'}`);
  console.log(`   Check Interval: ${status?.check_interval_seconds || 0}s`);
  console.log(`   Processed Messages: ${status?.processed_messages_count || 0}\n`);
  
  return status;
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testGmailSetup = testGmailSetup;
  (window as any).checkGmailStatus = checkGmailStatus;
  
  console.log('Gmail test functions available:');
  console.log('  - testGmailSetup(authToken)');
  console.log('  - checkGmailStatus()');
}
