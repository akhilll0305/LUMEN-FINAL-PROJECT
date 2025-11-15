/**
 * Gmail Auto-Ingestion Monitor Service
 * Handles the 3-step setup flow for Gmail transaction monitoring
 */

import { API_ENDPOINTS } from '../config/api';

export interface GmailSetupResult {
  success: boolean;
  userId?: number;
  userType?: string;
  monitoredEmail?: string;
  error?: string;
}

export interface GmailStatus {
  running: boolean;
  monitored_email?: string;
  transactions_saving_to_user_id?: number;
  transactions_saving_to_user_type?: string;
  last_check?: string;
  check_interval_seconds?: number;
  processed_messages_count?: number;
  authenticated?: boolean;
  gmail_service_ready?: boolean;
}

/**
 * Setup Gmail monitoring for the authenticated user
 * Implements the 3-step flow: STOP → START → CHECK
 */
export async function setupGmailForUser(authToken: string): Promise<GmailSetupResult> {
  const headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  };

  try {
    console.log('📧 Gmail Monitor Setup - Step 1/3: Stopping existing monitor...');
    
    // STEP 1: Stop existing monitor
    try {
      await fetch(API_ENDPOINTS.GMAIL_MONITOR.STOP, {
        method: 'POST',
        headers: headers
      });
      console.log('✓ Existing monitor stopped');
    } catch (error) {
      console.warn('Warning: Failed to stop existing monitor (may not be running):', error);
      // Continue anyway - monitor might not have been running
    }

    // Small delay to ensure clean shutdown
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('📧 Gmail Monitor Setup - Step 2/3: Starting monitor for your account...');
    
    // STEP 2: Start monitor for this user
    const startResponse = await fetch(API_ENDPOINTS.GMAIL_MONITOR.START, {
      method: 'POST',
      headers: headers
    });
    
    if (!startResponse.ok) {
      const errorData = await startResponse.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || 'Failed to start Gmail monitor');
    }
    
    const startData = await startResponse.json();
    console.log('✓ Gmail monitor started!');
    console.log(`  User ID: ${startData.saving_to_user_id}`);
    console.log(`  User Type: ${startData.saving_to_user_type}`);
    console.log(`  Monitored Email: ${startData.monitored_email}`);

    console.log('📧 Gmail Monitor Setup - Step 3/3: Checking for transaction emails...');
    
    // Wait 2 seconds for monitor to fully initialize
    await new Promise(resolve => setTimeout(resolve, 2000));

    // STEP 3: Force immediate check
    try {
      const checkResponse = await fetch(API_ENDPOINTS.GMAIL_MONITOR.CHECK_NOW, {
        method: 'POST',
        headers: headers
      });

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        console.log('✓ Gmail check complete:', checkData.message);
        console.log(`  Processed messages: ${checkData.processed_messages_count || 0}`);
      } else {
        console.warn('Warning: Initial email check failed, but monitor is running');
      }
    } catch (error) {
      console.warn('Warning: Failed to force initial check:', error);
      // Non-critical - monitor will check automatically in 30 seconds
    }

    console.log('🎉 Gmail monitoring fully activated!');

    return {
      success: true,
      userId: startData.saving_to_user_id,
      userType: startData.saving_to_user_type,
      monitoredEmail: startData.monitored_email
    };

  } catch (error: any) {
    console.error('❌ Gmail setup error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to setup Gmail monitoring'
    };
  }
}

/**
 * Get current Gmail monitor status
 */
export async function getGmailStatus(): Promise<GmailStatus | null> {
  try {
    const response = await fetch(API_ENDPOINTS.GMAIL_MONITOR.STATUS);
    if (!response.ok) {
      throw new Error('Failed to get Gmail status');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to get Gmail status:', error);
    return null;
  }
}

/**
 * Stop Gmail monitor (typically on logout)
 */
export async function stopGmailMonitor(authToken: string): Promise<boolean> {
  try {
    const response = await fetch(API_ENDPOINTS.GMAIL_MONITOR.STOP, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to stop Gmail monitor:', error);
    return false;
  }
}

/**
 * Format user-friendly error message based on error type
 */
export function getGmailErrorMessage(error: string): string {
  if (error.includes('authentication') || error.includes('401')) {
    return 'Gmail authentication expired. Please contact support to re-authenticate.';
  } else if (error.includes('token') || error.includes('expired')) {
    return 'Your session has expired. Please login again.';
  } else if (error.includes('network') || error.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  } else {
    return 'Failed to setup Gmail monitoring. Please try again later.';
  }
}
