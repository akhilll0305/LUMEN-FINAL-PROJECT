/**
 * API Service Utilities
 * Helper functions for making API calls
 */

import { API_ENDPOINTS, getJsonHeaders, getAuthHeaders } from '../config/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Authentication Services
 */
export const authService = {
  async login(email: string, password: string, userType: 'consumer' | 'business'): Promise<ApiResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, user_type: userType }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.detail || data.error || 'Login failed' };
      }
      
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message || 'Network error' };
    }
  },

  async register(formData: FormData): Promise<ApiResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.detail || data.error || 'Registration failed' };
      }
      
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message || 'Network error' };
    }
  },

  async logout(): Promise<ApiResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

/**
 * User Services
 */
export const userService = {
  async getCurrentUser(): Promise<ApiResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.ME, {
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.detail || 'Failed to fetch user' };
      }
      
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async updateProfile(updates: any): Promise<ApiResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.UPDATE_PROFILE, {
        method: 'PATCH',
        headers: getJsonHeaders(),
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

/**
 * Transaction Services
 */
export const transactionService = {
  async getTransactions(params: { limit?: number; offset?: number; flagged_only?: boolean } = {}): Promise<ApiResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.flagged_only) queryParams.append('flagged_only', 'true');

      const response = await fetch(`${API_ENDPOINTS.TRANSACTIONS.LIST}?${queryParams}`, {
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async getStats(days: number = 30): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_ENDPOINTS.TRANSACTIONS.STATS}?days=${days}`, {
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async confirmTransaction(transactionId: number, confirmed: boolean, notes?: string): Promise<ApiResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.TRANSACTIONS.CONFIRM(transactionId), {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify({ confirmed, notes }),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

/**
 * Chat Services
 */
export const chatService = {
  async createSession(): Promise<ApiResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.CHAT.CREATE_SESSION, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async sendMessage(message: string, sessionId?: number): Promise<ApiResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.CHAT.SEND_MESSAGE, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify({ message, session_id: sessionId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Chat API error:', response.status, data);
        return { 
          success: false, 
          error: data.detail || data.error || `Server error: ${response.status}` 
        };
      }
      
      return { success: true, data };
    } catch (error: any) {
      console.error('Chat service error:', error);
      return { success: false, error: error.message || 'Network error' };
    }
  },

  async getHistory(sessionId: number, limit: number = 50): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_ENDPOINTS.CHAT.HISTORY(sessionId)}?limit=${limit}`, {
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

/**
 * Ingestion Services
 */
export const ingestionService = {
  async uploadFile(file: File, sourceType: string = 'Upload'): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('source_type', sourceType);

      const response = await fetch(API_ENDPOINTS.INGEST.UPLOAD, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.detail || data.error || 'Upload failed' };
      }
      
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async getGmailStatus(): Promise<ApiResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.INGEST.GMAIL_STATUS, {
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async syncGmail(daysBack: number = 30): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_ENDPOINTS.INGEST.GMAIL_SYNC}?days_back=${daysBack}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

/**
 * Anomaly Services
 */
export const anomalyService = {
  async getFlagged(params: { limit?: number; offset?: number; unconfirmed_only?: boolean } = {}): Promise<ApiResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.unconfirmed_only !== undefined) queryParams.append('unconfirmed_only', params.unconfirmed_only.toString());

      const response = await fetch(`${API_ENDPOINTS.ANOMALIES.FLAGGED}?${queryParams}`, {
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      return { success: response.ok, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
