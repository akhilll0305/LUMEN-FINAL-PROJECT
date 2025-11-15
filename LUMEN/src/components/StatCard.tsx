import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import CountUp from 'react-countup';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  icon: LucideIcon;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  primary: 'border-cyan/30 hover:border-cyan/50',
  success: 'border-success/30 hover:border-success/50',
  warning: 'border-warning/30 hover:border-warning/50',
  danger: 'border-danger/30 hover:border-danger/50',
};

const variantIconBg = {
  primary: 'bg-cyan/10 text-cyan',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
};

export default function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  icon: Icon,
  variant = 'primary',
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className={`glass-card p-6 rounded-xl transition-all duration-200 relative overflow-hidden group ${variantStyles[variant]}`}
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-purple/5" />
      </div>
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <motion.div 
          className={`p-3 rounded-lg ${variantIconBg[variant]} relative`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 rounded-lg blur-lg bg-current opacity-20 group-hover:opacity-40 transition-opacity" />
          <Icon className="w-6 h-6 relative z-10" />
        </motion.div>
        {change !== undefined && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.2 }}
            className={`text-sm font-medium px-2 py-1 rounded-lg ${
              change >= 0 ? 'text-success bg-success/10' : 'text-danger bg-danger/10'
            }`}
          >
            {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
          </motion.div>
        )}
      </div>
      <h3 className="text-text-secondary text-sm font-medium mb-2 relative z-10">{title}</h3>
      <div className="text-3xl font-bold relative z-10 group-hover:gradient-text transition-all">
        {prefix}
        <CountUp
          end={value}
          duration={2}
          separator=","
          decimals={prefix === '$' ? 2 : 0}
        />
        {suffix}
      </div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 shimmer" />
      </div>
    </motion.div>
  );
}
