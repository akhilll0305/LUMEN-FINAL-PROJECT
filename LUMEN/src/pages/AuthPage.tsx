import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, Sparkles, Shield, TrendingUp, DollarSign } from 'lucide-react';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { useAuthStore } from '../store/authStore';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';
import { setupGmailForUser, getGmailErrorMessage } from '../services/gmailMonitor';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('consumer');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [gstin, setGstin] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        // Login flow
        const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, user_type: userType }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        // store token and navigate
        localStorage.setItem('AUTH_TOKEN', data.access_token);
        
        // Fetch user data to get the actual name
        const userRes = await fetch(API_ENDPOINTS.USERS.ME, {
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
            'Content-Type': 'application/json'
          },
        });
        
        let userName = 'User';
        if (userRes.ok) {
          const userData = await userRes.json();
          userName = userData.name || userData.business_name || userData.contact_person || 'User';
        }
        
        // Update Zustand auth store with actual user data
        const nameParts = userName.split(' ');
        login({
          id: data.user_id || '1',
          firstName: nameParts[0] || 'User',
          lastName: nameParts.slice(1).join(' ') || '',
          email: email,
          avatar: '',
          userType: userType as 'consumer' | 'business',
        }, userType as 'consumer' | 'business');
        
        // Setup Gmail monitoring BEFORE navigation (synchronous)
        console.log('🔄 Setting up Gmail auto-ingestion...');
        try {
          const gmailResult = await setupGmailForUser(data.access_token);
          if (gmailResult.success) {
            console.log(`✅ Gmail monitoring active for User ${gmailResult.userId}`);
            console.log(`📧 All transaction emails will be automatically imported!`);
          } else {
            console.warn('⚠️ Gmail setup failed:', gmailResult.error);
            // Non-critical - user can still use the app
          }
        } catch (err) {
          console.error('❌ Gmail setup error:', err);
          // Non-critical - continue to dashboard
        }
        
        navigate('/dashboard');
      } else {
        // Signup flow
        let avatarUrl = '';
        
        // Upload avatar if selected
        if (avatarFile) {
          const formData = new FormData();
          formData.append('file', avatarFile);
          
          const uploadRes = await fetch(`${API_BASE_URL}/api/v1/users/upload-avatar`, {
            method: 'POST',
            body: formData,
          });
          
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            avatarUrl = uploadData.avatar_url;
          } else {
            console.error('Failed to upload avatar');
          }
        }
        
        // Send registration data with avatar URL
        const registrationData: any = {
          email,
          password,
          name,
          user_type: userType,
        };
        
        if (phone) registrationData.phone = phone;
        if (businessName) registrationData.business_name = businessName;
        if (contactPerson) registrationData.contact_person = contactPerson;
        if (gstin) registrationData.gstin = gstin;
        if (avatarUrl) registrationData.avatar_url = avatarUrl;

        const res = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        localStorage.setItem('AUTH_TOKEN', data.access_token);
        
        // Update Zustand auth store
        const nameParts = name.split(' ');
        login({
          id: data.user_id || '1',
          firstName: nameParts[0] || 'User',
          lastName: nameParts.slice(1).join(' ') || '',
          email: email,
          avatar: '',
          userType: userType as 'consumer' | 'business',
        }, userType as 'consumer' | 'business');
        
        // Setup Gmail monitoring BEFORE navigation (synchronous)
        console.log('🔄 Setting up Gmail auto-ingestion...');
        try {
          const gmailResult = await setupGmailForUser(data.access_token);
          if (gmailResult.success) {
            console.log(`✅ Gmail monitoring active for User ${gmailResult.userId}`);
            console.log(`📧 All transaction emails will be automatically imported!`);
          } else {
            console.warn('⚠️ Gmail setup failed:', gmailResult.error);
            // Non-critical - user can still use the app
          }
        } catch (err) {
          console.error('❌ Gmail setup error:', err);
          // Non-critical - continue to dashboard
        }
        
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 text-text-secondary hover:text-luxe-gold transition-colors bg-bg-primary/80 backdrop-blur-sm px-3 py-2 rounded-md shadow"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
      {/* Ultra-Premium Background */}
      <UltraPremiumBackground />
      <MouseGlow />

      {/* Left Side - Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md space-y-8"
        >
          <GlassCard className="p-8 relative overflow-hidden" hoverable glowOnHover>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-10 h-10 text-luxe-gold" />
              </motion.div>
              <h2 className="text-4xl font-heading font-bold gradient-text-premium">LUMEN</h2>
            </div>
            
            <h3 className="text-2xl font-bold mb-6">
              AI-Powered Financial Intelligence
            </h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-glass-lg bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold-glow">
                  <Shield className="w-6 h-6 text-bg-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-lg">Smart Fraud Detection</h4>
                  <p className="text-sm text-text-secondary">
                    AI agents analyze every transaction for unusual patterns
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-glass-lg bg-gradient-to-br from-success to-success/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-success/20">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-lg">Real-time Analytics</h4>
                  <p className="text-sm text-text-secondary">
                    Instant insights and predictive intelligence for better decisions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-glass-lg bg-gradient-to-br from-info to-info/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-info/20">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-lg">Automated Processing</h4>
                  <p className="text-sm text-text-secondary">
                    Save time with intelligent categorization and receipt scanning
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-glass-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-luxe-gold">99.8%</div>
                <div className="text-xs text-text-tertiary mt-1">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">1M+</div>
                <div className="text-xs text-text-tertiary mt-1">Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-info">$5M</div>
                <div className="text-xs text-text-tertiary mt-1">Saved</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-heading font-bold mb-3 gradient-text-premium">
              {isLogin ? 'Welcome back' : 'Join LUMEN'}
            </h1>
            <p className="text-text-secondary mb-8 text-lg">
              {isLogin
                ? 'Enter your credentials to access your dashboard'
                : 'Create your account and start your premium journey'}
            </p>

            <GlassCard className="p-8" hoverable>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                    <div className="flex items-center gap-4">
                      <label htmlFor="full-name" className="w-32 text-sm font-semibold text-text-primary">Full Name</label>
                      <div className="relative flex-1">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                        <input
                          id="full-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-glass-bg border border-glass-border rounded-glass-lg focus:border-luxe-gold focus:outline-none focus:ring-2 focus:ring-luxe-gold/20 transition-all text-text-primary placeholder:text-text-tertiary"
                          placeholder="Akhil Reddy"
                          required={!isLogin}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <label htmlFor="user-type" className="w-32 text-sm font-semibold text-text-primary">Account Type</label>
                        <select
                          id="user-type"
                          value={userType}
                          onChange={(e) => setUserType(e.target.value)}
                          className="flex-1 pl-4 pr-4 py-4 bg-glass-bg border border-glass-border rounded-glass-lg focus:border-luxe-gold focus:outline-none focus:ring-2 focus:ring-luxe-gold/20 transition-all text-text-primary"
                        >
                          <option value="consumer">Consumer</option>
                          <option value="business">Business</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-4">
                        <label htmlFor="phone" className="w-32 text-sm font-semibold text-text-primary">Phone</label>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex-1 pl-4 pr-4 py-4 bg-glass-bg border border-glass-border rounded-glass-lg focus:border-luxe-gold focus:outline-none focus:ring-2 focus:ring-luxe-gold/20 transition-all text-text-primary placeholder:text-text-tertiary"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      {userType === 'business' && (
                        <>
                          <div className="flex items-center gap-4">
                            <label htmlFor="business-name" className="w-32 text-sm font-semibold text-text-primary">Business Name</label>
                            <input
                              id="business-name"
                              type="text"
                              value={businessName}
                              onChange={(e) => setBusinessName(e.target.value)}
                              className="flex-1 pl-4 pr-4 py-4 bg-glass-bg border border-glass-border rounded-glass-lg focus:border-luxe-gold focus:outline-none focus:ring-2 focus:ring-luxe-gold/20 transition-all text-text-primary placeholder:text-text-tertiary"
                              placeholder="ACME Pvt Ltd"
                            />
                          </div>

                          <div className="flex items-center gap-4">
                            <label htmlFor="contact-person" className="w-32 text-sm font-semibold text-text-primary">Contact Person</label>
                            <input
                              id="contact-person"
                              type="text"
                              value={contactPerson}
                              onChange={(e) => setContactPerson(e.target.value)}
                              className="flex-1 pl-4 pr-4 py-4 bg-glass-bg border border-glass-border rounded-glass-lg focus:border-luxe-gold focus:outline-none focus:ring-2 focus:ring-luxe-gold/20 transition-all text-text-primary placeholder:text-text-tertiary"
                              placeholder="John Doe"
                            />
                          </div>

                          <div className="flex items-center gap-4">
                            <label htmlFor="gstin" className="w-32 text-sm font-semibold text-text-primary">GSTIN</label>
                            <input
                              id="gstin"
                              type="text"
                              value={gstin}
                              onChange={(e) => setGstin(e.target.value)}
                              className="flex-1 pl-4 pr-4 py-4 bg-glass-bg border border-glass-border rounded-glass-lg focus:border-luxe-gold focus:outline-none focus:ring-2 focus:ring-luxe-gold/20 transition-all text-text-primary placeholder:text-text-tertiary"
                              placeholder="22AAAAA0000A1Z5"
                            />
                          </div>
                        </>
                      )}

                      <div className="flex items-center gap-4">
                        <label htmlFor="avatar" className="w-32 text-sm font-semibold text-text-primary">Profile Photo</label>
                        <div className="flex-1 flex items-center gap-3">
                          <input
                            ref={fileInputRef}
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)}
                            className="hidden"
                          />

                          <input
                            type="text"
                            readOnly
                            value={avatarFile ? avatarFile.name : ''}
                            placeholder="No file chosen"
                            className="flex-1 pl-4 pr-4 py-4 bg-glass-bg border border-glass-border rounded-glass-lg focus:border-luxe-gold focus:outline-none focus:ring-2 focus:ring-luxe-gold/20 transition-all text-text-primary placeholder:text-text-tertiary"
                          />

                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="py-3 px-5 bg-gradient-gold hover:opacity-90 text-bg-primary font-semibold rounded-glass-lg transition-all shadow-gold-glow"
                          >
                            Choose
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-4">
                  <label htmlFor="email" className="w-32 text-sm font-semibold text-text-primary">Email</label>
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-glass-bg border border-glass-border rounded-glass-lg focus:border-luxe-gold focus:outline-none focus:ring-2 focus:ring-luxe-gold/20 transition-all text-text-primary placeholder:text-text-tertiary"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label htmlFor="password" className="w-32 text-sm font-semibold text-text-primary">Password</label>
                  <div className="relative flex-1">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-glass-bg border border-glass-border rounded-glass-lg focus:border-luxe-gold focus:outline-none focus:ring-2 focus:ring-luxe-gold/20 transition-all text-text-primary placeholder:text-text-tertiary"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-glass-border bg-glass-bg checked:bg-luxe-gold focus:ring-2 focus:ring-luxe-gold/20"
                      />
                      <span className="text-text-secondary">Remember me</span>
                    </label>
                    <a href="#" className="text-luxe-gold hover:text-luxe-amber transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  glow
                  disabled={loading}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-bg-primary border-t-transparent rounded-full"
                    />
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-text-secondary">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  </span>
                  {' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-luxe-gold hover:text-luxe-amber transition-colors font-semibold"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </form>
            </GlassCard>

            <p className="text-center text-xs text-text-tertiary mt-6">
              By continuing, you agree to our{' '}
              <a href="#" className="text-luxe-gold hover:underline">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-luxe-gold hover:underline">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
