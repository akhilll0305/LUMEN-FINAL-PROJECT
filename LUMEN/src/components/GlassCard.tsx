import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glowOnHover?: boolean;
  noPadding?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({ 
  children, 
  className = '', 
  hoverable = true,
  glowOnHover = false,
  noPadding = false,
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`
        glass-card
        ${noPadding ? '' : 'p-6'}
        ${hoverable ? 'transition-all duration-300 cursor-pointer' : ''}
        ${glowOnHover ? 'hover:shadow-gold-glow' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hoverable ? { y: -4, scale: 1.01 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
