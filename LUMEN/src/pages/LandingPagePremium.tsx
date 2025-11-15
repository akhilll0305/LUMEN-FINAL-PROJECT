import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, Shield, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import Button from '../components/Button';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import Premium3DHero from '../components/Premium3DHero';
import NeonBorderCard from '../components/NeonBorderCard';
import SpotlightCard from '../components/SpotlightCard';
import CinematicPageTransition from '../components/CinematicPageTransition';
import PageTransition from '../components/PageTransition';
import AuthenticatedNav from '../components/AuthenticatedNav';
import AIChatAssistant from '../components/AIChatAssistant';
import { useAuthStore } from '../store/authStore';
import { containerVariants, itemVariants } from '../utils/animations';

const features = [
  {
    icon: Shield,
    title: 'AI-Powered Security',
    description: 'Advanced fraud detection with multi-agent reasoning system',
    color: 'from-luxe-gold to-luxe-amber',
  },
  {
    icon: TrendingUp,
    title: 'Smart Analytics',
    description: 'Real-time insights and predictive financial intelligence',
    color: 'from-luxe-amber to-luxe-bronze',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process thousands of transactions in seconds',
    color: 'from-luxe-bronze to-luxe-gold',
  },
];

const stats = [
  { value: 1000000, label: 'Transactions Processed', suffix: '+' },
  { value: 99.8, label: 'Detection Accuracy', suffix: '%', decimals: 1 },
  { value: 50, label: 'Time Saved', suffix: '%' },
];

const benefits = [
  'Military-grade encryption',
  'Real-time anomaly detection',
  'Automated categorization',
  'Smart expense predictions',
  'Multi-platform integration',
  'Comprehensive audit trail',
];

export default function LandingPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasToken = localStorage.getItem('AUTH_TOKEN');
  const isLoggedIn = isAuthenticated || hasToken;

  return (
    <CinematicPageTransition isFirstLoad={true}>
      <PageTransition className="min-h-screen relative overflow-hidden">
        {/* Ultra-Premium Background */}
        <UltraPremiumBackground />
        <MouseGlow />

        {/* Conditional Navigation - Show AuthenticatedNav if logged in, otherwise show public nav */}
        {isLoggedIn ? (
          <AuthenticatedNav />
        ) : (
          <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border backdrop-blur-glass">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <Sparkles className="w-8 h-8 text-luxe-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                </motion.div>
                <span className="text-3xl font-heading font-bold tracking-wider gradient-text-premium">LUMEN</span>
              </motion.div>
              
              <div className="hidden md:flex items-center gap-8">
                <motion.a 
                  href="#features" 
                  className="text-text-secondary hover:text-luxe-gold transition-colors font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Features
                </motion.a>
                <motion.a 
                  href="#benefits" 
                  className="text-text-secondary hover:text-luxe-gold transition-colors font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Benefits
                </motion.a>
                <Link to="/auth">
                  <Button variant="primary" glow>
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}

        {/* Hero Section */}
        <section className="pt-1 pb-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Hero Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.h1 
                  variants={itemVariants}
                  className="text-hero font-heading font-bold leading-tight"
                >
                  Premium Financial
                  <br />
                  <span className="gradient-text-premium">Intelligence Layer</span>
                </motion.h1>

                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-text-secondary max-w-xl leading-relaxed"
                >
                  Transform your financial operations with AI-powered transaction management,
                  real-time fraud detection, and intelligent insights.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                  {isLoggedIn ? (
                    <Link to="/dashboard">
                      <Button variant="primary" size="lg" glow>
                        Your Dashboard
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <Button variant="primary" size="lg" glow>
                        Start Free Trial
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="lg">
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right: Premium 3D Hero Scene */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative lg:block hidden"
              >
                <Premium3DHero />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 px-6 relative p-4">
          <div className="max-w-7xl mx-auto">
            <NeonBorderCard color="gold" className="p-8">
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-5xl font-bold text-luxe-gold mb-2">
                      <CountUp 
                        end={stat.value} 
                        duration={2.5} 
                        separator="," 
                        suffix={stat.suffix}
                        decimals={stat.decimals || 0}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </div>
                    <div className="text-base text-text-secondary font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </NeonBorderCard>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-display font-heading font-bold mb-4">
                Powered by <span className="gradient-text-premium">Advanced AI</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Experience the next generation of financial transaction management
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SpotlightCard className="h-full p-8">
                    <div className={`w-16 h-16 rounded-glass-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-gold-glow`}>
                      <feature.icon className="w-8 h-8 text-bg-primary" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-3 text-text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-display font-heading font-bold mb-6">
                  Everything you need for
                  <br />
                  <span className="gradient-text-premium">Financial Excellence</span>
                </h2>
                <p className="text-xl text-text-secondary mb-8">
                  Built for modern finance teams who demand precision, security, and speed.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-luxe-gold flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <NeonBorderCard color="blue" animated className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Security Score</span>
                      <span className="text-2xl font-bold text-success">A+</span>
                    </div>
                    <div className="w-full bg-glass-bg rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-luxe-gold to-success"
                        initial={{ width: 0 }}
                        whileInView={{ width: '98%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="glass-card p-4 rounded-glass">
                        <div className="text-sm text-text-tertiary mb-1">Uptime</div>
                        <div className="text-2xl font-bold text-luxe-gold">99.99%</div>
                      </div>
                      <div className="glass-card p-4 rounded-glass">
                        <div className="text-sm text-text-tertiary mb-1">Response Time</div>
                        <div className="text-2xl font-bold text-luxe-gold">&lt;100ms</div>
                      </div>
                    </div>
                  </div>
                </NeonBorderCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-15 px-6 relative">
          <div className="max-w-4xl mx-auto text-center ">
            <NeonBorderCard color="gold" animated className="p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-display font-heading font-bold mb-6 pt-4">
                  Ready to <span className="gradient-text-premium">Transform</span> Your Finance?
                </h2>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                  Join thousands of companies using LUMEN to secure and optimize their financial operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pb-4">
                  {isLoggedIn ? (
                    <Link to="/dashboard">
                      <Button variant="primary" size="lg" glow>
                        Your Dashboard
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <Button variant="primary" size="lg" glow>
                        Start Free Trial
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </div>
              </motion.div>
            </NeonBorderCard>
          </div>
        </section>
      </PageTransition>
      
      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </CinematicPageTransition>
  );
}
