import { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Starbucks',
    amount: 9.61,
    currency: 'USD',
    category: 'Dining',
    date: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    items: ['Caffe Latte', 'Muffin'],
    status: 'confirmed',
  },
  {
    id: '2',
    merchant: 'Walmart',
    amount: 13.34,
    currency: 'USD',
    category: 'Groceries',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    items: ['Milk', 'Bread', 'Eggs'],
    status: 'confirmed',
  },
  {
    id: '3',
    merchant: 'Shell Gas Station',
    amount: 45.0,
    currency: 'USD',
    category: 'Transport',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    items: ['Fuel'],
    status: 'confirmed',
  },
  {
    id: '4',
    merchant: 'Nirmal Grocery',
    amount: 144.0,
    currency: 'USD',
    category: 'Groceries',
    date: new Date('2025-01-13'),
    items: ['Rice - 25kg', 'Oil - 5L', 'Flour - 10kg', 'Spices'],
    status: 'flagged',
    riskScore: 75,
    flagReasons: [
      'First time merchant',
      '3x usual grocery spend',
    ],
  },
  {
    id: '5',
    merchant: 'Best Buy',
    amount: 299.99,
    currency: 'USD',
    category: 'Electronics',
    date: new Date('2025-01-12'),
    items: ['Wireless Headphones'],
    status: 'flagged',
    riskScore: 45,
    flagReasons: ['Low OCR confidence'],
  },
];

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};
