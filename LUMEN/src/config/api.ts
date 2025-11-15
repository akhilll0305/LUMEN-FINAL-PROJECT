/**
 * API Configuration for LUMEN Frontend
 * Central configuration for all API endpoints
 */

// Base API URL - can be overridden with environment variable
export const API_BASE_URL = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  },
  
  // Users
  USERS: {
    ME: `${API_BASE_URL}/api/v1/users/me`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/v1/users/me`,
    UPDATE_CONSENT: `${API_BASE_URL}/api/v1/users/me/consent`,
  },
  
  // Transactions
  TRANSACTIONS: {
    LIST: `${API_BASE_URL}/api/v1/transactions/`,
    STATS: `${API_BASE_URL}/api/v1/transactions/stats`,
    DETAIL: (id: number) => `${API_BASE_URL}/api/v1/transactions/${id}`,
    CONFIRM: (id: number) => `${API_BASE_URL}/api/v1/transactions/${id}/confirm`,
  },
  
  // Anomalies
  ANOMALIES: {
    FLAGGED: `${API_BASE_URL}/api/v1/anomalies/flagged`,
    EXPLAIN: (id: number) => `${API_BASE_URL}/api/v1/anomalies/${id}/explain`,
  },
  
  // Chat & RAG
  CHAT: {
    CREATE_SESSION: `${API_BASE_URL}/api/v1/chat/session`,
    SEND_MESSAGE: `${API_BASE_URL}/api/v1/chat/message`,
    HISTORY: (sessionId: number) => `${API_BASE_URL}/api/v1/chat/session/${sessionId}/history`,
    EXACT_LOOKUP: `${API_BASE_URL}/api/v1/chat/exact-lookup`,
    MEMORY: `${API_BASE_URL}/api/v1/chat/memory`,
  },
  
  // Data Ingestion
  INGEST: {
    UPLOAD: `${API_BASE_URL}/api/v1/ingest/upload`,
    GMAIL_STATUS: `${API_BASE_URL}/api/v1/ingest/gmail/status`,
    GMAIL_CONNECT: `${API_BASE_URL}/api/v1/ingest/gmail/connect`,
    GMAIL_SYNC: `${API_BASE_URL}/api/v1/ingest/gmail/sync`,
    WHATSAPP: `${API_BASE_URL}/api/v1/ingest/whatsapp`,
    MANUAL_CONSUMER: `${API_BASE_URL}/api/v1/ingest/manual/consumer`,
    MANUAL_BUSINESS: `${API_BASE_URL}/api/v1/ingest/manual/business`,
  },
  
  // Gmail Auto-Ingestion (N8N)
  GMAIL_MONITOR: {
    START: `${API_BASE_URL}/api/v1/n8n/gmail/start`,
    STOP: `${API_BASE_URL}/api/v1/n8n/gmail/stop`,
    CHECK_NOW: `${API_BASE_URL}/api/v1/n8n/gmail/check-now`,
    STATUS: `${API_BASE_URL}/api/v1/n8n/gmail/status`,
    AUTHENTICATE: `${API_BASE_URL}/api/v1/n8n/gmail/authenticate`,
    HEALTH: `${API_BASE_URL}/api/v1/n8n/health`,
  },
  
  // System
  HEALTH: `${API_BASE_URL}/health`,
  ROOT: `${API_BASE_URL}/`,
};

/**
 * Get authorization headers with JWT token
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem('AUTH_TOKEN');
  return {
    'Authorization': `Bearer ${token}`,
  };
};

/**
 * Get headers for JSON requests
 */
export const getJsonHeaders = () => {
  return {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  };
};

/**
 * Get headers for multipart/form-data requests
 */
export const getFormDataHeaders = () => {
  return {
    ...getAuthHeaders(),
  };
};

/**
 * Handle API errors consistently
 */
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.detail || error.response.data?.error || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};
