/**
 * Gmail Monitor Status Component
 * Shows real-time status of Gmail auto-ingestion
 */

import { useEffect, useState } from 'react';
import { Mail, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { getGmailStatus, type GmailStatus } from '../services/gmailMonitor';

interface GmailMonitorStatusProps {
  className?: string;
}

export default function GmailMonitorStatus({ className = '' }: GmailMonitorStatusProps) {
  const [status, setStatus] = useState<GmailStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    const gmailStatus = await getGmailStatus();
    setStatus(gmailStatus);
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 text-text-secondary text-sm ${className}`}>
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span>Loading Gmail status...</span>
      </div>
    );
  }

  if (!status) {
    return null;
  }

  const isActive = status.running && status.gmail_service_ready;
  const lastCheckTime = status.last_check 
    ? new Date(status.last_check).toLocaleTimeString() 
    : 'Never';

  return (
    <div className={`bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-3 border border-border ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${isActive ? 'text-green-400' : 'text-red-400'}`}>
          {isActive ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-luxe-gold" />
            <span className="text-sm font-medium text-text-primary">
              Gmail Monitor: {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          {isActive && (
            <div className="text-xs text-text-secondary space-y-1">
              <div className="flex justify-between">
                <span>Monitored Email:</span>
                <span className="text-text-primary">{status.monitored_email}</span>
              </div>
              
              {status.transactions_saving_to_user_id && (
                <div className="flex justify-between">
                  <span>Your User ID:</span>
                  <span className="text-text-primary">{status.transactions_saving_to_user_id}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Last Check:</span>
                <span className="text-text-primary">{lastCheckTime}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Check Interval:</span>
                <span className="text-text-primary">{status.check_interval_seconds}s</span>
              </div>
              
              {status.processed_messages_count !== undefined && (
                <div className="flex justify-between">
                  <span>Processed Messages:</span>
                  <span className="text-text-primary">{status.processed_messages_count}</span>
                </div>
              )}
            </div>
          )}
          
          {!isActive && (
            <p className="text-xs text-text-secondary">
              Gmail monitoring is not active. Login to activate automatic transaction import.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
