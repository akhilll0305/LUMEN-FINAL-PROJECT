import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
}) => {
  const baseStyles = 'bg-gradient-to-r from-glass-bg via-glass-border to-glass-bg bg-[length:200%_100%] animate-shimmer';
  
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-glass',
  };

  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'circular' ? '40px' : variant === 'text' ? '1rem' : '100px'),
  };

  return (
    <motion.div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 0.8, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
};

export default Skeleton;
