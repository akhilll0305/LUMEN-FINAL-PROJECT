import React from 'react';
import { motion } from 'framer-motion';

interface NeonBorderCardProps {
  children: React.ReactNode;
  className?: string;
  color?: 'gold' | 'blue' | 'green' | 'purple';
  animated?: boolean;
}

const NeonBorderCard: React.FC<NeonBorderCardProps> = ({
  children,
  className = '',
  color = 'gold',
  animated = true,
}) => {
  const colorMap = {
    gold: '#d4af37',
    blue: '#60a5fa',
    green: '#4ade80',
    purple: '#a78bfa',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Animated Neon Border */}
      <motion.div
        className="absolute -inset-0.5 rounded-glass-lg opacity-75 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${colorMap[color]}, transparent, ${colorMap[color]})`,
        }}
        animate={animated ? {
          opacity: [0.5, 0.75, 0.5],
          scale: [1, 1.02, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Rotating Gradient Border */}
      {animated && (
        <motion.div
          className="absolute -inset-0.5 rounded-glass-lg opacity-0"
          style={{
            background: `conic-gradient(from 0deg, ${colorMap[color]}, transparent, ${colorMap[color]})`,
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative glass-card">
        {children}
      </div>
    </div>
  );
};

export default NeonBorderCard;
