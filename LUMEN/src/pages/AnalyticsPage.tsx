import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import PageTransition from '../components/PageTransition';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import AuthenticatedNav from '../components/AuthenticatedNav';
import TransactionCard from '../components/TransactionCardComponent';
import { DollarSign, ShoppingCart, TrendingUp, Filter } from 'lucide-react';
import { transactionService } from '../services/api';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CATEGORY_COLORS: { [key: string]: string } = {
  'Groceries': '#00D9FF',
  'Dining': '#8B5CF6',
  'Transport': '#10B981',
  'Utilities': '#F59E0B',
  'Entertainment': '#EF4444',
  'Shopping': '#F97316',
  'Healthcare': '#14B8A6',
  'Education': '#A855F7',
  'Other': '#64748B',
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'month' | '30days' | '3months'>('month');
  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>(['all']);
  const [topMerchants, setTopMerchants] = useState<Array<{name: string; amount: number; percentage: number}>>([]);
  
  // Time-range filtered data
  const [timeRangeTransactions, setTimeRangeTransactions] = useState<any[]>([]);
  const [spendingOverTime, setSpendingOverTime] = useState<Array<{date: string; amount: number}>>([]);
  const [categoryData, setCategoryData] = useState<Array<{name: string; value: number; color: string}>>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [avgPerDay, setAvgPerDay] = useState(0);
  
  const transactionsSectionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Fetch all transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionService.getTransactions({ limit: 1000 });
        if (response.success && response.data) {
          const transactions = response.data.transactions || [];
          setAllTransactions(transactions);
          setFilteredTransactions(transactions);
          
          // Extract unique categories
          const uniqueCategories = ['all', ...new Set(transactions.map((t: any) => t.category).filter(Boolean))];
          setCategories(uniqueCategories as string[]);

          // Calculate top merchants by total amount spent
          const merchantTotals = transactions.reduce((acc: any, t: any) => {
            const merchantName = t.merchant_name_raw || 'Unknown';
            if (!acc[merchantName]) {
              acc[merchantName] = 0;
            }
            acc[merchantName] += t.amount || 0;
            return acc;
          }, {});

          // Convert to array and sort by amount (descending)
          const merchantArray = Object.entries(merchantTotals).map(([name, amount]) => ({
            name,
            amount: amount as number,
          }));
          merchantArray.sort((a, b) => b.amount - a.amount);

          // Calculate total spent for percentages
          const totalSpent = merchantArray.reduce((sum, m) => sum + m.amount, 0);

          // Get top 5 merchants with percentages
          const top5 = merchantArray.slice(0, 5).map(m => ({
            name: m.name,
            amount: m.amount,
            percentage: totalSpent > 0 ? Math.round((m.amount / totalSpent) * 100) : 0,
          }));
          setTopMerchants(top5);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };
    
    // Fetch immediately
    fetchTransactions();
    
    // Poll every 10 seconds for new transactions
    const interval = setInterval(fetchTransactions, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter transactions when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      // Sort all transactions by date (most recent first)
      const sorted = [...allTransactions].sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setFilteredTransactions(sorted);
    } else {
      // Filter by category and sort by date
      const filtered = allTransactions
        .filter(t => t.category === selectedCategory)
        .sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      setFilteredTransactions(filtered);
    }
  }, [selectedCategory, allTransactions]);

  // Filter transactions by time range and calculate analytics
  useEffect(() => {
    const now = new Date();
    let startDate: Date;
    let days: number;

    switch (timeRange) {
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        days = now.getDate();
        break;
      case '30days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        days = 30;
        break;
      case '3months':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        days = 90;
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        days = now.getDate();
    }

    // Filter transactions within time range
    const filtered = allTransactions.filter((t: any) => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= now;
    });
    setTimeRangeTransactions(filtered);

    // Calculate total spent
    const total = filtered.reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
    setTotalSpent(total);

    // Calculate total transactions
    setTotalTransactions(filtered.length);

    // Calculate avg per day
    setAvgPerDay(days > 0 ? total / days : 0);

    // Calculate spending over time (daily aggregation)
    const dailySpending: { [key: string]: number } = {};
    filtered.forEach((t: any) => {
      const dateKey = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dailySpending[dateKey] = (dailySpending[dateKey] || 0) + (t.amount || 0);
    });

    const spendingArray = Object.entries(dailySpending)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setSpendingOverTime(spendingArray);

    // Calculate category spending
    const categoryTotals: { [key: string]: number } = {};
    filtered.forEach((t: any) => {
      const category = t.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + (t.amount || 0);
    });

    const categoryArray = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value: value as number,
      color: CATEGORY_COLORS[name] || '#64748B',
    })).sort((a, b) => b.value - a.value);
    setCategoryData(categoryArray);

  }, [timeRange, allTransactions]);

  // Scroll to transactions section if hash is present
  useEffect(() => {
    if (location.hash === '#transactions' && transactionsSectionRef.current) {
      setTimeout(() => {
        transactionsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [location]);

  return (
    <PageTransition className="min-h-screen pb-20 relative overflow-hidden">
      <UltraPremiumBackground />
      <MouseGlow />
      <AuthenticatedNav />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12 space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-heading font-bold gradient-text-premium mb-2">Financial Analytics</h1>
          <p className="text-text-secondary text-lg">Comprehensive insights into your financial patterns</p>
        </motion.div>

        {/* Time Range Selector */}
        <div className="flex gap-4">
          {(['month', '30days', '3months'] as const).map((range) => (
            <button
              key={range}
            onClick={() => setTimeRange(range)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              timeRange === range
                ? 'bg-cyan text-black'
                : 'glass-card hover:bg-white/10 text-text-secondary'
            }`}
          >
            {range === 'month'
              ? 'This Month'
              : range === '30days'
              ? 'Last 30 Days'
              : 'Last 3 Months'}
          </button>
        ))}
      </div>

      {/* Top Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Spent"
          value={totalSpent}
          prefix="$"
          icon={DollarSign}
          variant="primary"
        />
        <StatCard
          title="Transactions"
          value={totalTransactions}
          icon={ShoppingCart}
          variant="success"
        />
        <StatCard
          title="Avg/Day"
          value={avgPerDay}
          prefix="$"
          icon={TrendingUp}
          variant="warning"
        />
      </div>

      {/* Spending Over Time Chart */}
      <GlassCard className="mb-8" hoverable={false}>
        <h2 className="text-xl font-bold mb-6">📈 Spending Over Time</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={spendingOverTime}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00D9FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#737373" />
              <YAxis stroke="#737373" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#00D9FF"
                strokeWidth={2}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Spending by Category */}
      <GlassCard className="mb-8" hoverable={false}>
        <h2 className="text-xl font-bold mb-6">🏷️ Spending by Category</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">${category.value}</div>
                  <div className="text-sm text-text-secondary">
                    {((category.value / totalSpent) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Top Merchants */}
      <GlassCard className="mb-8" hoverable={false}>
        <h2 className="text-xl font-bold mb-6">🏪 Top Merchants</h2>
        <div className="space-y-4">
          {topMerchants.map((merchant, index) => (
            <motion.div
              key={merchant.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4"
            >
              <div className="text-2xl font-bold text-text-tertiary w-8">
                {index + 1}.
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{merchant.name}</span>
                  <span className="font-bold">${merchant.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-bg-tertiary rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${merchant.percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-12 text-right">
                    {merchant.percentage}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Next Month Forecast */}
      {/* <GlassCard hoverable={false}>
        <h2 className="text-xl font-bold mb-6">🔮 Next Month Forecast</h2>
        <p className="text-text-secondary mb-4">
          Based on your patterns, we predict:
        </p>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold">${forecastTotal}</span>
            <span className="text-text-secondary">± $85</span>
          </div>
          <ProgressBar
            current={forecastTotal}
            max={budget}
            color="cyan"
            label={`${((forecastTotal / budget) * 100).toFixed(0)}% of budget`}
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">By category:</h3>
          {forecastData.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <span className="text-text-secondary">• {item.category}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">${item.amount}</span>
                <span
                  className={`text-sm ${
                    item.change === 0
                      ? 'text-text-tertiary'
                      : item.change > 0
                      ? 'text-success'
                      : 'text-danger'
                  }`}
                >
                  ({item.change === 0 ? '→' : item.change > 0 ? '↑' : '↓'} {Math.abs(item.change)}%)
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard> */}

      {/* All Transactions Section */}
      <GlassCard hoverable={false} ref={transactionsSectionRef}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">📋 All Transactions</h2>
          
          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-text-secondary" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-glass-bg border border-glass-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-text-secondary mb-4">
          Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` in ${selectedCategory} category`}
        </div>

        {selectedCategory !== 'all' && filteredTransactions.length > 0 && (
          <div className="mb-4 p-4 bg-cyan/10 border border-cyan/30 rounded-lg">
            <p className="text-sm text-cyan font-medium mb-2">
              📍 Merchants in {selectedCategory}:
            </p>
            <div className="flex flex-wrap gap-2">
              {[...new Set(filteredTransactions.map((t: any) => t.merchant_name_raw))].map((merchant: any) => (
                <span key={merchant} className="px-3 py-1 bg-glass-bg rounded-full text-xs text-text-primary border border-glass-border">
                  {merchant}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-text-secondary">
              No transactions found
            </div>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                id={String(transaction.id)}
                amount={transaction.amount}
                description={transaction.merchant_name_raw || 'Unknown Merchant'}
                date={new Date(transaction.date).toLocaleDateString()}
                status={transaction.flagged ? 'flagged' : 'completed'}
                category={transaction.category}
                index={index}
              />
            ))
          )}
        </div>
      </GlassCard>
      </div>
    </PageTransition>
  );
}
