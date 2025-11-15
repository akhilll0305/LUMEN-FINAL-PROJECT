import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useThemeStore } from './ThemeToggle';

interface PremiumButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
}

export default function PremiumButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
}: PremiumButtonProps) {
  const isDark = useThemeStore((state) => state.isDark);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: isDark
      ? 'bg-gradient-to-r from-cyan to-blue-500 text-black font-bold'
      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold',
    secondary: isDark
      ? 'bg-gradient-to-r from-purple to-pink-500 text-white font-semibold'
      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold',
    outline: isDark
      ? 'border-2 border-cyan/50 text-cyan hover:bg-cyan/10'
      : 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: { duration: 0.6, ease: 'easeInOut' },
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-xl -z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5 }}
        style={{
          background:
            variant === 'primary'
              ? isDark
                ? 'radial-gradient(circle, rgba(0,217,255,0.5) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
        }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
