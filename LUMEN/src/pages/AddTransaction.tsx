import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import AuthenticatedNav from '../components/AuthenticatedNav';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { User, Building2 } from 'lucide-react';
import { API_ENDPOINTS, getJsonHeaders } from '../config/api';
import { useAuthStore } from '../store/authStore';

export default function AddTransaction() {
  const navigate = useNavigate();
  const userType = useAuthStore((state) => state.userType);
  const [loading, setLoading] = useState(false);

  // Consumer form data
  const [consumerForm, setConsumerForm] = useState({
    amount: '',
    category: '',
    date: '',
    paid_to: '',
    payment_method: 'cash',
    purpose: '',
  });

  // Business form data
  const [businessForm, setBusinessForm] = useState({
    amount: '',
    category: '',
    date: '',
    gst_amount: '',
    invoice_number: '',
    party_name: '',
    payment_method: 'cash',
    payment_terms: '',
    purpose: '',
    reference_number: '',
    transaction_type: 'expense',
  });

  const handleConsumerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setConsumerForm({
      ...consumerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBusinessForm({
      ...businessForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleConsumerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        amount: parseFloat(consumerForm.amount),
        category: consumerForm.category,
        date: consumerForm.date,
        paid_to: consumerForm.paid_to,
        payment_method: consumerForm.payment_method,
        purpose: consumerForm.purpose,
      };

      const res = await fetch(API_ENDPOINTS.INGEST.MANUAL_CONSUMER, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Transaction added successfully!');
        navigate('/dashboard');
      } else {
        const error = await res.json();
        alert(`Failed to add transaction: ${error.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding consumer transaction:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        amount: parseFloat(businessForm.amount),
        category: businessForm.category,
        date: businessForm.date,
        gst_amount: parseFloat(businessForm.gst_amount),
        invoice_number: businessForm.invoice_number,
        party_name: businessForm.party_name,
        payment_method: businessForm.payment_method,
        payment_terms: businessForm.payment_terms,
        purpose: businessForm.purpose,
        reference_number: businessForm.reference_number,
        transaction_type: businessForm.transaction_type,
      };

      const res = await fetch(API_ENDPOINTS.INGEST.MANUAL_BUSINESS, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Transaction added successfully!');
        navigate('/dashboard');
      } else {
        const error = await res.json();
        alert(`Failed to add transaction: ${error.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding business transaction:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while determining user type
  if (!userType) {
    return (
      <PageTransition className="min-h-screen pb-20 relative overflow-hidden">
        <UltraPremiumBackground />
        <MouseGlow />
        <AuthenticatedNav />
        <div className="flex items-center justify-center h-screen">
          <p className="text-text-secondary">Loading...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen pb-20 relative overflow-hidden">
      <UltraPremiumBackground />
      <MouseGlow />
      <AuthenticatedNav />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-12 space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              userType === 'consumer' ? 'bg-cyan/10' : 'bg-luxe-gold/10'
            }`}>
              {userType === 'consumer' ? (
                <User className="w-8 h-8 text-cyan" />
              ) : (
                <Building2 className="w-8 h-8 text-luxe-gold" />
              )}
            </div>
            <div>
              <h1 className="text-5xl font-heading font-bold gradient-text-premium">
                Add {userType === 'consumer' ? 'Consumer' : 'Business'} Transaction
              </h1>
              <p className="text-text-secondary text-lg">
                {userType === 'consumer' ? 'Add your personal expense or income' : 'Add your business transaction'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Consumer Transaction Form */}
        {userType === 'consumer' && (
          <GlassCard>
            <form onSubmit={handleConsumerSubmit} className="space-y-5">
              {/* Amount */}
              <div>
                <label htmlFor="consumer-amount" className="block text-text-secondary text-sm mb-2">
                  Amount *
                </label>
                <input
                  type="number"
                  id="consumer-amount"
                  name="amount"
                  value={consumerForm.amount}
                  onChange={handleConsumerChange}
                  step="0.01"
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="consumer-category" className="block text-text-secondary text-sm mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  id="consumer-category"
                  name="category"
                  value={consumerForm.category}
                  onChange={handleConsumerChange}
                  placeholder="e.g., Transport, Food, Entertainment"
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="consumer-date" className="block text-text-secondary text-sm mb-2">
                  Date *
                </label>
                <input
                  type="datetime-local"
                  id="consumer-date"
                  name="date"
                  value={consumerForm.date}
                  onChange={handleConsumerChange}
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
                  required
                />
              </div>

              {/* Paid To */}
              <div>
                <label htmlFor="consumer-paid-to" className="block text-text-secondary text-sm mb-2">
                  Paid To *
                </label>
                <input
                  type="text"
                  id="consumer-paid-to"
                  name="paid_to"
                  value={consumerForm.paid_to}
                  onChange={handleConsumerChange}
                  placeholder="e.g., Uber Driver, Restaurant Name"
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label htmlFor="consumer-payment-method" className="block text-text-secondary text-sm mb-2">
                  Payment Method *
                </label>
                <select
                  id="consumer-payment-method"
                  name="payment_method"
                  value={consumerForm.payment_method}
                  onChange={handleConsumerChange}
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                  <option value="net_banking">Net Banking</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>

              {/* Purpose */}
              <div>
                <label htmlFor="consumer-purpose" className="block text-text-secondary text-sm mb-2">
                  Purpose *
                </label>
                <textarea
                  id="consumer-purpose"
                  name="purpose"
                  value={consumerForm.purpose}
                  onChange={handleConsumerChange}
                  placeholder="Brief description of the transaction"
                  rows={3}
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan resize-none"
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" disabled={loading} className="flex-1">
                  {loading ? 'Adding Transaction...' : 'Add Transaction'}
                </Button>
                <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </GlassCard>
        )}

        {/* Business Transaction Form */}
        {userType === 'business' && (
          <GlassCard>
            <form onSubmit={handleBusinessSubmit} className="space-y-5">
              {/* Row 1: Amount & GST Amount */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="business-amount" className="block text-text-secondary text-sm mb-2">
                    Amount *
                  </label>
                  <input
                    type="number"
                    id="business-amount"
                    name="amount"
                    value={businessForm.amount}
                    onChange={handleBusinessChange}
                    step="0.01"
                    className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="business-gst" className="block text-text-secondary text-sm mb-2">
                    GST Amount *
                  </label>
                  <input
                    type="number"
                    id="business-gst"
                    name="gst_amount"
                    value={businessForm.gst_amount}
                    onChange={handleBusinessChange}
                    step="0.01"
                    className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Category & Transaction Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="business-category" className="block text-text-secondary text-sm mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    id="business-category"
                    name="category"
                    value={businessForm.category}
                    onChange={handleBusinessChange}
                    placeholder="e.g., Inventory, Marketing"
                    className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="business-type" className="block text-text-secondary text-sm mb-2">
                    Transaction Type *
                  </label>
                  <select
                    id="business-type"
                    name="transaction_type"
                    value={businessForm.transaction_type}
                    onChange={handleBusinessChange}
                    className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                    required
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="business-date" className="block text-text-secondary text-sm mb-2">
                  Date *
                </label>
                <input
                  type="datetime-local"
                  id="business-date"
                  name="date"
                  value={businessForm.date}
                  onChange={handleBusinessChange}
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                  required
                />
              </div>

              {/* Party Name */}
              <div>
                <label htmlFor="business-party" className="block text-text-secondary text-sm mb-2">
                  Party Name *
                </label>
                <input
                  type="text"
                  id="business-party"
                  name="party_name"
                  value={businessForm.party_name}
                  onChange={handleBusinessChange}
                  placeholder="e.g., XYZ Vendors Ltd"
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                  required
                />
              </div>

              {/* Row 3: Invoice Number & Reference Number */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="business-invoice" className="block text-text-secondary text-sm mb-2">
                    Invoice Number *
                  </label>
                  <input
                    type="text"
                    id="business-invoice"
                    name="invoice_number"
                    value={businessForm.invoice_number}
                    onChange={handleBusinessChange}
                    placeholder="e.g., INV-2024-001"
                    className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="business-reference" className="block text-text-secondary text-sm mb-2">
                    Reference Number *
                  </label>
                  <input
                    type="text"
                    id="business-reference"
                    name="reference_number"
                    value={businessForm.reference_number}
                    onChange={handleBusinessChange}
                    placeholder="e.g., CHQ-123456"
                    className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label htmlFor="business-payment-method" className="block text-text-secondary text-sm mb-2">
                  Payment Method *
                </label>
                <select
                  id="business-payment-method"
                  name="payment_method"
                  value={businessForm.payment_method}
                  onChange={handleBusinessChange}
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                  <option value="net_banking">Net Banking</option>
                  <option value="cheque">Cheque</option>
                  <option value="rtgs">RTGS</option>
                  <option value="neft">NEFT</option>
                </select>
              </div>

              {/* Payment Terms */}
              <div>
                <label htmlFor="business-payment-terms" className="block text-text-secondary text-sm mb-2">
                  Payment Terms *
                </label>
                <input
                  type="text"
                  id="business-payment-terms"
                  name="payment_terms"
                  value={businessForm.payment_terms}
                  onChange={handleBusinessChange}
                  placeholder="e.g., Paid in full, Net 30"
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                  required
                />
              </div>

              {/* Purpose */}
              <div>
                <label htmlFor="business-purpose" className="block text-text-secondary text-sm mb-2">
                  Purpose *
                </label>
                <textarea
                  id="business-purpose"
                  name="purpose"
                  value={businessForm.purpose}
                  onChange={handleBusinessChange}
                  placeholder="Detailed description of the transaction"
                  rows={3}
                  className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-luxe-gold resize-none"
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="secondary" disabled={loading} className="flex-1">
                  {loading ? 'Adding Transaction...' : 'Add Transaction'}
                </Button>
                <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </GlassCard>
        )}
      </div>
    </PageTransition>
  );
}
