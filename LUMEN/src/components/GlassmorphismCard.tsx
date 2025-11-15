import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassmorphismCard({
  children,
  className = '',
  hover = true,
}: GlassmorphismCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      className={`glass-card p-6 rounded-xl transition-all duration-200 relative overflow-hidden group ${className}`}
    >
      {/* Animated gradient overlay on hover */}
      {hover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-purple/5" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
