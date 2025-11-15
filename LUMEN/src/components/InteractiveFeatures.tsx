import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Brain, Shield, Zap, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Brain',
    shortDesc: 'Smart Processing',
    fullDesc: 'Imagine a brilliant mind analyzing every transaction — spotting patterns humans miss',
    color: 'from-cyan to-blue-400',
  },
  {
    icon: Shield,
    title: 'Fraud Shield',
    shortDesc: 'Protection Layer',
    fullDesc: 'Like a guardian watching over your finances — catching threats before they happen',
    color: 'from-purple to-pink-400',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    shortDesc: 'Instant Insights',
    fullDesc: 'Watch data transform in milliseconds — smooth as silk, fast as lightning',
    color: 'from-yellow-400 to-orange-400',
  },
  {
    icon: TrendingUp,
    title: 'Smart Growth',
    shortDesc: 'Financial Wisdom',
    fullDesc: 'Your personal advisor learning and growing — helping you make better decisions every day',
    color: 'from-green-400 to-cyan',
  },
];

export default function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="relative"
          onMouseEnter={() => setActiveFeature(index)}
          onMouseLeave={() => setActiveFeature(null)}
        >
          <motion.div
            className={`glass-card p-6 rounded-2xl cursor-pointer relative overflow-hidden group`}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            />

            {/* Morphing blob */}
            <motion.div
              className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${feature.color} rounded-full blur-3xl opacity-0 group-hover:opacity-30`}
              animate={{
                scale: activeFeature === index ? [1, 1.2, 1] : 1,
                rotate: activeFeature === index ? [0, 180, 360] : 0,
              }}
              transition={{ duration: 3, repeat: activeFeature === index ? Infinity : 0 }}
            />

            {/* Icon */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-4"
              animate={{
                rotateY: activeFeature === index ? [0, 360] : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center relative elastic-bounce`}
                animate={{
                  boxShadow: activeFeature === index
                    ? ['0 0 20px rgba(0,217,255,0.3)', '0 0 40px rgba(0,217,255,0.6)', '0 0 20px rgba(0,217,255,0.3)']
                    : '0 0 20px rgba(0,217,255,0.3)',
                }}
                transition={{ duration: 1, repeat: activeFeature === index ? Infinity : 0 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              <div className="text-center">
                <h3 className={`font-bold mb-1 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary">{feature.shortDesc}</p>
              </div>
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
              {activeFeature === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-64 z-20"
                >
                  <div className="glass-card p-4 rounded-xl border border-cyan/30 backdrop-blur-xl">
                    <div className="text-sm text-text-secondary leading-relaxed">
                      {feature.fullDesc}
                    </div>
                    {/* Arrow */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-cyan/20 to-purple/20 rotate-45 border-l border-t border-cyan/30" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
