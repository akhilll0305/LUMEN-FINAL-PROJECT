import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import StatCard from '../components/StatCardComponent';
import TransactionCard from '../components/TransactionCardComponent';
import PageTransition from '../components/PageTransition';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import AuthenticatedNav from '../components/AuthenticatedNav';
import GmailMonitorStatus from '../components/GmailMonitorStatus';
import { containerVariants, itemVariants } from '../utils/animations';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import { API_ENDPOINTS, getAuthHeaders } from '../config/api';
import { transactionService } from '../services/api';

export default function DashboardPremium() {
  const { logout, setUserType } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('User');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) {
      console.log('No token found in localStorage');
      logout();
      navigate('/auth');
      return;
    }

    (async () => {
      try {
        const res = await fetch(API_ENDPOINTS.USERS.ME, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) {
          console.error('API returned error status:', res.status);
          if (res.status === 401) {
            // Token is invalid or expired, logout and redirect
            console.log('Token expired or invalid, redirecting to login');
            localStorage.removeItem('AUTH_TOKEN');
            logout();
            navigate('/auth');
          }
          return;
        }
        const data = await res.json();
        console.log('User data received:', data);
        console.log('User type from response:', data.user_type);
        console.log('Name from response:', data.name);
        console.log('Business name from response:', data.business_name);
        console.log('Contact person from response:', data.contact_person);
        
        // Detect user type from JWT token in localStorage OR from response
        const userType = data.user_type || (() => {
          const token = localStorage.getItem('AUTH_TOKEN');
          if (token) {
            try {
              const payload = JSON.parse(atob(token.split('.')[1]));
              return payload.user_type;
            } catch (e) {
              return null;
            }
          }
          return null;
        })();
        
        if (userType) {
          setUserType(userType);
          console.log('User type set to:', userType);
        }
        
        // Backend returns user object with name field
        const name = data.name || data.business_name || data.contact_person || 'User';
        setUserName(name);
        setAvatarUrl(data.avatar_url || null);
        
        console.log('Final username set to:', name);
        console.log('Avatar URL from backend:', data.avatar_url);
        console.log('Final avatar URL will be:', data.avatar_url ? (data.avatar_url.startsWith('http') ? data.avatar_url : `http://localhost:8000${data.avatar_url}`) : 'No avatar');
      } catch (err) {
        console.error('Failed to fetch current user', err);
      } finally {
        setIsLoadingUser(false);
      }
    })();
  }, [logout, navigate, setUserType]);

  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Fetch transactions and stats from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('[Dashboard] Fetching transactions and stats...');
        
        // Fetch transactions
        const response = await transactionService.getTransactions({ limit: 100 });
        if (response.success && response.data) {
          // Sort by date (most recent first) and take top 5
          const sorted = (response.data.transactions || []).sort((a: any, b: any) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          ).slice(0, 5);
          setRecentTransactions(sorted);
          console.log('[Dashboard] Loaded', response.data.transactions?.length || 0, 'transactions');
        }

        // Fetch stats
        const statsRes = await fetch(API_ENDPOINTS.TRANSACTIONS.STATS, {
          headers: getAuthHeaders(),
        });
        
        console.log('[Dashboard] Stats response status:', statsRes.status);
        
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          console.log('[Dashboard] Stats data received:', statsData);
          setStats(statsData);
        } else {
          const errorText = await statsRes.text();
          console.error('[Dashboard] Stats fetch failed:', statsRes.status, errorText);
        }
      } catch (error) {
        console.error('[Dashboard] Failed to fetch data:', error);
      }
    };
    
    // Fetch immediately
    fetchData();
    
    // Poll every 30 seconds for updates (to catch new Gmail transactions)
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate stats from real data
  const totalSpent = stats?.total_amount || 0;
  const monthlyExpenses = stats?.total_amount || 0;
  const savingsRate = monthlyIncome > 0 ? (((monthlyIncome - monthlyExpenses) / monthlyIncome * 100).toFixed(1)) : '0.0';

  // Debug: Log when stats change
  useEffect(() => {
    if (stats) {
      console.log('[Dashboard] Stats updated:', {
        totalSpent,
        monthlyExpenses,
        totalTransactions: stats.total_transactions,
        categoriesCount: stats.categories?.length || 0
      });
    }
  }, [stats, totalSpent, monthlyExpenses]);

  const handleIncomeUpdate = (newIncome: number) => {
    setMonthlyIncome(newIncome);
    addToast('success', 'Monthly income updated');
  };

  const quickStats = [
    {
      title: 'Total Amount Spent',
      value: totalSpent,
      prefix: '$',
      icon: DollarSign,
      trend: 'neutral' as const,
      trendValue: `${stats?.total_transactions || 0} transactions`,
    },
    {
      title: 'Monthly Income',
      value: monthlyIncome,
      prefix: '$',
      icon: TrendingUp,
      trend: 'neutral' as const,
      trendValue: 'Click to edit',
      editable: true,
      onSave: handleIncomeUpdate,
    },
    {
      title: 'Monthly Expenses',
      value: monthlyExpenses,
      prefix: '$',
      icon: ArrowDownRight,
      trend: 'neutral' as const,
      trendValue: `Last 30 days`,
    },
  ];

  const insights = [
    {
      icon: Shield,
      title: 'No Anomalies Detected',
      description: 'All transactions appear normal',
      color: 'text-success',
    },
    {
      icon: TrendingUp,
      title: 'Savings Rate',
      description: `You're saving ${savingsRate}% this month`,
      color: 'text-luxe-gold',
    },
    {
      icon: Clock,
      title: 'Quick Tip',
      description: 'Review pending transactions to keep your account up-to-date',
      color: 'text-info',
    },
  ];

  return (
    <PageTransition className="min-h-screen pb-20 relative overflow-hidden">
      {/* Ultra-Premium Background */}
      <UltraPremiumBackground />
      <MouseGlow />

      {/* Authenticated Navigation */}
      <AuthenticatedNav />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12 space-y-8 relative z-10">
        {/* Welcome Header - Half Screen Layout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[50vh] w-full flex flex-row items-center justify-between gap-12"
        >
          {/* Left: Welcome message */}
          <motion.div 
            className="flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-white">👋 Welcome back, {userName.split(' ')[0]}</span>
            </motion.h1>
            <motion.p 
              className="text-text-secondary mb-6 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {dateStr}
            </motion.p>
            <motion.p 
              className="text-text-secondary max-w-2xl leading-relaxed text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Great to see you again! Here's a quick summary of your account and recent activity. You can upload receipts, review flagged transactions, or connect your email to import statements.
            </motion.p>
          </motion.div>

          {/* Right: Large Avatar Circle */}
          <motion.div 
            className="flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div 
              className="w-80 h-80 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Show user's avatar or initials */}
              {avatarUrl ? (
                <img 
                  src={avatarUrl.startsWith('http') ? avatarUrl : `http://localhost:8000${avatarUrl}`}
                  alt={`${userName.split(' ')[0]}'s avatar`} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-9xl font-bold text-white">
                  {userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Gmail Monitor Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GmailMonitorStatus />
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {quickStats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <StatCard {...stat} animated decimals={2} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Recent Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-semibold">Recent Transactions</h2>
                <Link to="/analytics#transactions">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <TransactionCard
                    key={transaction.id}
                    id={String(transaction.id)}
                    amount={transaction.amount}
                    description={transaction.merchant_name_raw || transaction.merchant_name || 'Unknown Merchant'}
                    date={new Date(transaction.date).toLocaleDateString()}
                    status={transaction.flagged ? 'flagged' : 'completed'}
                    category={transaction.category}
                    source={transaction.source}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Spending Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GlassCard>
                <h3 className="text-xl font-heading font-semibold mb-6">Spending Overview</h3>
                
                <div className="space-y-6">
                  {/* Budget Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-text-secondary">Monthly Spending</span>
                      <span className="text-text-primary font-semibold">
                        ${monthlyExpenses.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative h-3 bg-glass-bg rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-gold rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: monthlyIncome > 0 ? `${Math.min((monthlyExpenses / monthlyIncome) * 100, 100)}%` : '0%' }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </div>
                    {monthlyIncome > 0 && (
                      <p className="text-xs text-text-secondary mt-1">
                        {((monthlyExpenses / monthlyIncome) * 100).toFixed(1)}% of monthly income
                      </p>
                    )}
                  </div>

                  {/* Category Breakdown - Real Data */}
                  <div className="grid grid-cols-2 gap-4">
                    {(stats?.categories || []).slice(0, 4).map((category: any, index: number) => {
                      const colors = ['bg-luxe-gold', 'bg-luxe-amber', 'bg-luxe-bronze', 'bg-luxe-muted'];
                      return (
                        <motion.div
                          key={category.category || index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                          className="p-4 bg-glass-bg rounded-glass border border-glass-border"
                        >
                          <div className={`w-2 h-2 rounded-full ${colors[index % colors.length]} mb-2`} />
                          <div className="text-sm text-text-secondary mb-1">{category.category || 'Other'}</div>
                          <div className="text-lg font-bold">${(category.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </motion.div>
                      );
                    })}
                    {(!stats?.categories || stats.categories.length === 0) && (
                      <div className="col-span-2 text-center py-6 text-text-secondary">
                        No spending data yet
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column: Insights & Quick Actions */}
          <div className="space-y-6">
            {/* Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-heading font-semibold mb-6">Insights</h2>
              <div className="space-y-4">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <GlassCard hoverable={false}>
                        <div className="flex gap-4">
                          <div className={`${insight.color} flex-shrink-0`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{insight.title}</h4>
                            <p className="text-sm text-text-secondary">{insight.description}</p>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Actions */}
            {/* <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <GlassCard>
                <h3 className="text-xl font-heading font-semibold mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/pending">
                    <Button variant="secondary" fullWidth>
                      Review Pending ({pendingReviews})
                    </Button>
                  </Link>
                  <Link to="/analytics">
                    <Button variant="secondary" fullWidth>
                      View Analytics
                    </Button>
                  </Link>
                  <Link to="/chat">
                    <Button variant="primary" fullWidth>
                      Ask AI Assistant
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            </motion.div> */}

            {/* Account Security */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <GlassCard className="bg-gradient-card">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Account Secure</h4>
                    <p className="text-sm text-text-secondary mb-4">
                      All systems operational. No suspicious activity detected.
                    </p>
                    <div className="text-xs text-text-tertiary">
                      Last security check: Today at 12:00 PM
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
