import React, { useState, ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  children, 
  className = '',
  intensity = 10
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [intensity, -intensity]);
  const rotateY = useTransform(x, [-100, 100], [-intensity, intensity]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-gold opacity-0 blur-xl rounded-glass-lg"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Card content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCard;
