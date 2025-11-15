import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CinematicPageTransitionProps {
  children: React.ReactNode;
  isFirstLoad?: boolean;
}

const CinematicPageTransition: React.FC<CinematicPageTransitionProps> = ({
  children,
  isFirstLoad = false,
}) => {
  const [phase, setPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(!isFirstLoad);

  useEffect(() => {
    if (!isFirstLoad || isComplete) return;

    const timings = [800, 1200, 1600, 2000, 2400];
    
    const timeouts = timings.map((delay, index) => 
      setTimeout(() => setPhase(index + 1), delay)
    );

    const completeTimeout = setTimeout(() => setIsComplete(true), 2600);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [isFirstLoad, isComplete]);

  if (isComplete) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-primary">
      <AnimatePresence>
        {/* Phase 1: Logo Fade In */}
        {phase >= 0 && phase < 5 && (
          <motion.div
            key="logo"
            className="absolute inset-0 flex items-center justify-center z-50 bg-bg-primary"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow-strong"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="w-12 h-12 text-bg-primary" />
                </motion.div>
                <motion.h1
                  className="font-heading text-4xl font-bold gradient-text-premium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  LUMEN
                </motion.h1>
                <motion.div
                  className="w-32 h-1 bg-gradient-gold rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 2-5: Progressive Content Reveal */}
        {phase >= 1 && (
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Layers */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Animated Grid */}
            <motion.div
              className="absolute inset-0 opacity-10"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: phase >= 2 ? 0.1 : 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundImage: 'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            {/* Light Rays */}
            <motion.div
              className="absolute inset-0 opacity-20"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: phase >= 2 ? 0.2 : 0, rotate: 0 }}
              transition={{ duration: 0.8 }}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 w-full bg-gradient-to-r from-transparent via-luxe-gold to-transparent"
                  style={{ top: `${30 + i * 20}%` }}
                />
              ))}
            </motion.div>

            {/* Content Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>

            {/* 3D Elements */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: phase >= 4 ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Floating Orbs */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-luxe-gold/50"
                  style={{
                    left: `${10 + i * 20}%`,
                    top: `${20 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinematicPageTransition;
