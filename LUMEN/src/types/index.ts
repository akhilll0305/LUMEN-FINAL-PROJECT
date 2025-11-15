export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  category: string;
  date: Date;
  items?: string[];
  imageUrl?: string;
  status: 'confirmed' | 'pending' | 'flagged';
  riskScore?: number;
  flagReasons?: string[];
}

export interface ExpectedPayment {
  id: string;
  merchant: string;
  amount: number;
  expectedDate: Date;
  notes: string;
  status: 'pending' | 'matched';
  matchedTransactionId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface SpendingByCategory {
  category: string;
  amount: number;
  percentage: number;
}

export interface DailySpending {
  date: string;
  amount: number;
}
