import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  glow = false,
  className = '',
  disabled,
  onClick,
  type = 'button',
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: `
      bg-gradient-gold text-bg-primary font-semibold
      hover:shadow-gold-glow hover:scale-105
      active:scale-95
      ${glow ? 'shadow-gold-glow' : ''}
    `,
    secondary: `
      bg-slate border border-glass-border text-text-primary
      hover:bg-slate-light hover:border-glass-border-light
      hover:shadow-glass-hover
    `,
    ghost: `
      bg-transparent text-text-gold
      hover:bg-glass-bg
    `,
    outline: `
      bg-transparent border-2 border-luxe-gold text-luxe-gold
      hover:bg-luxe-gold hover:text-bg-primary
      hover:shadow-gold-glow
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
