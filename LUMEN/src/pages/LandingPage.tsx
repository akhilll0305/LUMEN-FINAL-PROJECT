import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import HeroOrb from '../components/HeroOrb';
import AnimatedGuide from '../components/AnimatedGuide';
import DataFlow from '../components/DataFlow';
import InteractiveFeatures from '../components/InteractiveFeatures';
import AnimatedBackground from '../components/AnimatedBackground';
import SlideUpReveal from '../components/SlideUpReveal';
import AnimatedCard from '../components/AnimatedCard';
import { useThemeStore } from '../components/ThemeToggle';

const features = [
  {
    icon: Sparkles,
    title: 'Multimodal Document Processing',
    description: 'Advanced OCR and AI to extract data from any receipt format',
  },
  {
    icon: Brain,
    title: 'Agentic Financial Reasoning',
    description: 'Smart fraud detection powered by LangGraph multi-agent system',
  },
  {
    icon: Bell,
    title: 'Smart Purchase Reminders',
    description: 'Never miss a payment with AI-predicted expense alerts',
  },
];

const stats = [
  { value: 1000000, label: 'Receipts Processed', suffix: '+' },
  { value: 99.2, label: 'Accuracy', suffix: '%' },
  { value: 5000000, label: 'Saved', prefix: '$', suffix: 'M' },
];

const steps = [
  { number: 1, title: 'Upload', description: 'Drag & drop your receipt or connect Gmail' },
  { number: 2, title: 'AI Analyzes', description: 'Our AI extracts and categorizes data' },
  { number: 3, title: 'Confirm', description: 'Review and approve transactions' },
  { number: 4, title: 'Get Insights', description: 'Receive personalized financial insights' },
];

export default function LandingPage() {
  const isDark = useThemeStore((state) => state.isDark);
  
  return (
    <div className="min-h-screen relative">
      {/* Premium Animated Background */}
      <AnimatedBackground />
      
      {/* Additional floating orbs specific to landing page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 glass-card border-b backdrop-blur-xl transition-colors duration-500 ${
        isDark ? 'border-white/10 bg-dark/80' : 'border-gray-200/50 bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Sparkles className="w-8 h-8 text-cyan drop-shadow-lg" />
              <motion.div
                className="absolute inset-0 bg-cyan rounded-full blur-md opacity-50"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className={`text-2xl font-bold tracking-wider transition-colors duration-500 ${
              isDark ? 'gradient-text' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600'
            }`}>LUMEN</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            <motion.a 
              href="#features" 
              className={`transition-colors relative group ${
                isDark ? 'text-text-secondary hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan to-purple"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.a>
            <motion.a 
              href="#how-it-works" 
              className={`transition-colors relative group ${
                isDark ? 'text-text-secondary hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              How It Works
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan to-purple"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.a>
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-cyan hover:bg-cyan-dark text-black font-semibold rounded-lg transition-all btn-premium btn-neon relative z-10 overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        {/* Hero Orb Animation */}
        <HeroOrb />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Glowing badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 holographic"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-cyan" />
              </motion.div>
              <span className="text-sm font-semibold gradient-text">Powered by Advanced AI</span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="gradient-text text-reveal relative inline-block">
                Project LUMEN
                {/* Glowing underline */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan via-purple to-cyan rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-4xl mb-4 font-bold relative"
            >
              <span className={`inline-block px-6 py-3 rounded-xl backdrop-blur-sm relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan/5 via-purple/5 to-pink/5'
                  : 'bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10'
              }`}>
                <motion.span
                  className="absolute inset-0 rounded-xl blur-xl opacity-50"
                  style={{
                    background: isDark
                      ? 'linear-gradient(90deg, rgba(0,217,255,0.3), rgba(139,92,246,0.3), rgba(236,72,153,0.3))'
                      : 'linear-gradient(90deg, rgba(6,182,212,0.4), rgba(168,85,247,0.4), rgba(219,39,119,0.4))'
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                />
                <span className={`relative ${
                  isDark
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan via-purple to-pink'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600'
                }`}>
                  <motion.span
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      backgroundImage: isDark
                        ? 'linear-gradient(90deg, rgba(0,217,255,1), rgba(139,92,246,1), rgba(236,72,153,1), rgba(0,217,255,1))'
                        : 'linear-gradient(90deg, rgba(6,182,212,1), rgba(168,85,247,1), rgba(219,39,119,1), rgba(6,182,212,1))',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    AI Financial Intelligence Layer
                  </motion.span>
                </span>
              </span>
            </motion.div>
            <motion.p 
              className="text-xl text-text-tertiary max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Transform receipts into intelligent insights with AI-powered fraud detection and
              predictions
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-cyan hover:bg-cyan-dark text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2 glow-cyan btn-premium relative z-10 group"
                >
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.button>
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 glass-card hover:bg-white/10 font-semibold rounded-lg transition-all relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Watch Demo
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ▶
                  </motion.span>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-purple/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-cyan/50 rounded-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Floating stats preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { num: "1M+", label: "Receipts", gradient: "from-cyan to-blue-400" },
              { num: "99.9%", label: "Accuracy", gradient: "from-purple to-pink-400" },
              { num: "$5M+", label: "Saved", gradient: "from-cyan to-purple" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ 
                  scale: 1.08, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="glass-card p-4 rounded-xl relative overflow-hidden group holographic cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-purple/5"
                  whileHover={{
                    background: 'linear-gradient(to bottom right, rgba(0,217,255,0.15), rgba(139,92,246,0.15))',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan/20 to-purple/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity,
                    delay: i * 2 
                  }}
                />
                <div className="relative z-10">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.num}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SlideUpReveal>
            <motion.h2 
              className="text-5xl font-bold text-center mb-4"
            >
              <span className="gradient-text">Powerful Features</span>
            </motion.h2>
            <motion.p
              className="text-center text-text-secondary mb-16 text-lg"
            >
              Experience the future of financial intelligence — hover to explore
            </motion.p>
          </SlideUpReveal>

          {/* Interactive Features Component */}
          <SlideUpReveal delay={0.2}>
            <InteractiveFeatures />
          </SlideUpReveal>

          {/* Original features grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={index * 0.15}>
                <div className="glass-card p-8 rounded-xl text-center relative group h-full">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan/20 to-purple/20 rounded-xl flex items-center justify-center relative"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-cyan/30 to-purple/30 rounded-xl blur-lg"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                    <feature.icon className="w-8 h-8 text-cyan relative z-10" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                  
                  {/* Hover glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan/0 to-purple/0 pointer-events-none"
                    whileHover={{
                      background: 'linear-gradient(to bottom right, rgba(0,217,255,0.1), rgba(139,92,246,0.1))',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-purple/5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="text-center relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-purple/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />
                <div className="relative">
                  <div className="text-6xl md:text-7xl font-bold gradient-text mb-3">
                    {stat.prefix}
                    <CountUp end={stat.value} duration={2.5} separator="," decimals={stat.value < 100 ? 1 : 0} />
                    {stat.suffix}
                  </div>
                  <div className="text-text-secondary text-lg font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 relative overflow-hidden">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(0,217,255,0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(139,92,246,0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(0,217,255,0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(139,92,246,0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <SlideUpReveal>
            <motion.h2 
              className="text-5xl font-bold text-center mb-4 cinematic-reveal"
            >
              <span className="wave-text">
                <span>H</span><span>o</span><span>w</span> <span>I</span><span>t</span> <span>W</span><span>o</span><span>r</span><span>k</span><span>s</span>
              </span>
            </motion.h2>
            <motion.p
              className="text-center text-text-secondary mb-12 text-lg"
            >
              Watch your data flow like magic — smooth, intelligent, beautiful
            </motion.p>
          </SlideUpReveal>

          {/* Animated Guide Component */}
          <SlideUpReveal delay={0.2}>
            <AnimatedGuide />
          </SlideUpReveal>

          {/* Data Flow Visualization */}
          <SlideUpReveal delay={0.4}>
            <DataFlow from="📄" to="💎" label="Transforming Receipts into Insights" />
          </SlideUpReveal>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                <motion.div 
                  className="glass-card p-6 rounded-xl text-center relative overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan/30 to-purple/30 rounded-full flex items-center justify-center text-2xl font-bold text-cyan relative"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/40 to-purple/40 rounded-full blur-lg group-hover:blur-xl transition-all" />
                    <span className="relative z-10">{step.number}</span>
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                  
                  {/* Animated gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan/0 to-purple/0 group-hover:from-cyan/5 group-hover:to-purple/5 transition-all duration-300 rounded-xl" />
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    <ArrowRight className="w-8 h-8 text-cyan/50" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 via-purple/10 to-cyan/10" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to take control of your finances?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-text-secondary mb-10 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join thousands of users who trust LUMEN for intelligent financial management
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-12 py-5 bg-cyan hover:bg-cyan-dark text-black font-bold rounded-xl text-lg transition-all glow-cyan btn-premium relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Sign Up Free <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-dark/50 to-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-cyan" />
            <span className="text-xl font-bold gradient-text">LUMEN</span>
          </div>
          <p className="text-text-secondary text-sm">
            © 2025 Project LUMEN. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
