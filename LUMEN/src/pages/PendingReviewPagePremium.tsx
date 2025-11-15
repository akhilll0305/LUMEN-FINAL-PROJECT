import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import AnomalyBadge from '../components/AnomalyBadgeComponent';
import PageTransition from '../components/PageTransition';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import AuthenticatedNav from '../components/AuthenticatedNav';
import { containerVariants, itemVariants } from '../utils/animations';
import { mockTransactions } from '../utils/mockData';

export default function PendingReviewPagePremium() {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get flagged transactions
  const flaggedTransactions = mockTransactions.filter((t) => t.status === 'flagged');
  
  // Simulate anomaly severity
  const transactionsWithSeverity = flaggedTransactions.map((t) => ({
    ...t,
    severity: Math.abs(t.amount) > 1000 ? 'high' : Math.abs(t.amount) > 500 ? 'medium' : 'low',
    reason: Math.abs(t.amount) > 1000 
      ? 'Unusually high amount detected'
      : Math.abs(t.amount) > 500
      ? 'Amount above typical threshold'
      : 'Pattern deviation detected',
  }));

  const filteredTransactions = transactionsWithSeverity.filter((t) => {
    const matchesFilter = filter === 'all' || t.severity === filter;
    const matchesSearch = t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: 'Total Pending', value: flaggedTransactions.length, color: 'text-warning' },
    { label: 'High Priority', value: transactionsWithSeverity.filter(t => t.severity === 'high').length, color: 'text-error' },
    { label: 'Medium Priority', value: transactionsWithSeverity.filter(t => t.severity === 'medium').length, color: 'text-warning' },
    { label: 'Low Priority', value: transactionsWithSeverity.filter(t => t.severity === 'low').length, color: 'text-info' },
  ];

  return (
    <PageTransition className="min-h-screen pb-20 relative overflow-hidden">
      {/* Ultra-Premium Background */}
      <UltraPremiumBackground />
      <MouseGlow />
      
      {/* Authenticated Navigation */}
      <AuthenticatedNav />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12 space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-8 h-8 text-warning" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Pending <span className="gradient-text-premium">Reviews</span>
            </h1>
          </div>
          <p className="text-text-secondary text-lg">
            Review and approve flagged transactions to maintain accurate records
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard hoverable={false}>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassCard>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search by merchant or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-glass-bg border border-glass-border rounded-lg 
                           text-text-primary placeholder-text-tertiary
                           focus:outline-none focus:border-luxe-gold transition-colors"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                {['all', 'high', 'medium', 'low'].map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter(f as typeof filter)}
                  >
                    <Filter className="w-4 h-4" />
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-semibold mb-2">All Clear!</h3>
                <p className="text-text-secondary">
                  No pending transactions match your current filters
                </p>
              </GlassCard>
            </motion.div>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <GlassCard noPadding hoverable className="overflow-hidden">
                  <div className="p-6">
                    {/* Transaction Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{transaction.merchant}</h3>
                          <AnomalyBadge
                            type={transaction.severity as 'high' | 'medium' | 'low'}
                            label={transaction.severity.toUpperCase()}
                            description={transaction.reason}
                          />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-text-secondary">
                          <span className="font-mono">{transaction.id}</span>
                          <span>•</span>
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{transaction.category}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-3xl font-bold ${transaction.amount >= 0 ? 'text-success' : 'text-error'}`}>
                          {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    {/* Anomaly Reason */}
                    <div className="mb-4 p-4 bg-glass-bg rounded-lg border-l-4 border-warning">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm mb-1">Flagged Reason:</div>
                          <div className="text-sm text-text-secondary">{transaction.reason}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button variant="primary" size="sm" className="flex-1">
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </div>

        {/* Batch Actions */}
        {filteredTransactions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard className="bg-gradient-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Batch Actions</h3>
                  <p className="text-sm text-text-secondary">
                    {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="primary">
                    <CheckCircle className="w-4 h-4" />
                    Approve All
                  </Button>
                  <Button variant="outline">
                    <XCircle className="w-4 h-4" />
                    Reject All
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
