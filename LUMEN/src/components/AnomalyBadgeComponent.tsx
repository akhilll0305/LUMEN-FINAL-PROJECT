import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface AnomalyBadgeProps {
  type: 'high' | 'medium' | 'low';
  label: string;
  description?: string;
  className?: string;
  animated?: boolean;
}

const AnomalyBadge: React.FC<AnomalyBadgeProps> = ({
  type,
  label,
  description,
  className = '',
  animated = true,
}) => {
  const config = {
    high: {
      icon: AlertCircle,
      color: 'text-error',
      bg: 'bg-error/10',
      border: 'border-error/50',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    },
    medium: {
      icon: AlertTriangle,
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/50',
      glow: 'shadow-[0_0_20px_rgba(251,191,36,0.4)]',
    },
    low: {
      icon: Info,
      color: 'text-info',
      bg: 'bg-info/10',
      border: 'border-info/50',
      glow: 'shadow-[0_0_20px_rgba(96,165,250,0.4)]',
    },
  };

  const Icon = config[type].icon;

  return (
    <motion.div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full
        border ${config[type].border} ${config[type].bg}
        ${animated && type === 'high' ? config[type].glow : ''}
        ${className}
      `}
      animate={animated && type === 'high' ? {
        boxShadow: [
          '0 0 20px rgba(239, 68, 68, 0.4)',
          '0 0 30px rgba(239, 68, 68, 0.6)',
          '0 0 20px rgba(239, 68, 68, 0.4)',
        ],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      title={description}
    >
      <motion.div
        animate={animated ? { rotate: 360 } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Icon className={`w-4 h-4 ${config[type].color}`} />
      </motion.div>
      <span className={`text-sm font-medium ${config[type].color}`}>
        {label}
      </span>
    </motion.div>
  );
};

export default AnomalyBadge;
