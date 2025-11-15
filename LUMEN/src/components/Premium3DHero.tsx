import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Shield, Receipt, Coins } from 'lucide-react';

const Premium3DHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardRotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const cardRotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center perspective-2000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Coins */}
      {[...Array(7)].map((_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        const radius = 200;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={i}
            className="absolute w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [x, x + 10, x],
              y: [y, y - 15, y],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          >
            <Coins className="w-6 h-6 text-bg-primary" />
          </motion.div>
        );
      })}

      {/* Main Credit Card */}
      <motion.div
        className="relative preserve-3d"
        style={{
          rotateX: cardRotateX,
          rotateY: cardRotateY,
        }}
        animate={{
          y: isHovered ? -10 : 0,
        }}
      >
        <motion.div
          className="w-[400px] h-[250px] bg-gradient-gold rounded-glass-lg p-8 shadow-gold-glow-strong relative overflow-hidden"
          style={{
            transform: 'translateZ(50px)',
          }}
        >
          {/* Holographic Shine */}
          <motion.div
            className="absolute inset-0 opacity-0"
            style={{
              background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
            }}
            animate={isHovered ? {
              opacity: [0, 0.3, 0],
              x: ['-100%', '100%'],
            } : {}}
            transition={{
              duration: 1.5,
              ease: 'linear',
            }}
          />

          {/* Card Content */}
          <div className="relative h-full flex flex-col justify-between text-bg-primary z-10">
            <div>
              <div className="text-sm font-mono opacity-80 mb-2">LUMEN PREMIUM</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="font-heading font-bold text-xl">Financial AI</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="font-mono text-3xl tracking-[0.3em]">
                •••• •••• •••• 4242
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-70">CARDHOLDER</div>
                  <div className="font-semibold text-sm">Premium Account</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-70">VALID THRU</div>
                  <div className="font-semibold text-sm">12/28</div>
                </div>
              </div>
            </div>
          </div>

          {/* EMV Chip */}
          <div className="absolute top-28 left-8 w-14 h-11 rounded bg-gradient-to-br from-bg-primary/30 to-bg-primary/10 backdrop-blur-sm" />
          
          {/* Card Texture */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
            }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Receipts */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={`receipt-${i}`}
          className="absolute glass-card p-4 w-32 h-40 opacity-40"
          style={{
            left: `${20 + i * 25}%`,
            top: `${10 + i * 15}%`,
            transform: `translateZ(${-50 - i * 20}px)`,
          }}
          animate={{
            y: [0, -20, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          <Receipt className="w-6 h-6 text-luxe-gold mb-2" />
          <div className="space-y-1">
            <div className="h-1 bg-text-tertiary/30 rounded w-3/4" />
            <div className="h-1 bg-text-tertiary/30 rounded w-full" />
            <div className="h-1 bg-text-tertiary/30 rounded w-1/2" />
          </div>
        </motion.div>
      ))}

      {/* Security Shield */}
      <motion.div
        className="absolute bottom-20 right-20"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-success/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <div className="relative w-20 h-20 rounded-full bg-glass-bg border-2 border-success flex items-center justify-center">
            <Shield className="w-10 h-10 text-success" />
          </div>
        </div>
      </motion.div>

      {/* Data Orbs */}
      {[1, 2].map((i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-24 h-24 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(96,165,250,0.3), transparent)',
            border: '1px solid rgba(96,165,250,0.5)',
            backdropFilter: 'blur(10px)',
            left: i === 1 ? '10%' : '80%',
            top: i === 1 ? '20%' : '60%',
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        >
          <div className="absolute inset-4 rounded-full border border-info/30" />
          <div className="absolute inset-8 rounded-full border border-info/20" />
        </motion.div>
      ))}
    </div>
  );
};

export default Premium3DHero;
