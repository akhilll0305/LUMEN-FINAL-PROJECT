import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative glass-card overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          left: position.x,
          top: position.y,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.25), transparent 70%)',
          opacity,
        }}
        animate={{ opacity }}
        transition={{ duration: 0.2 }}
      />

      {/* Secondary Glow */}
      <motion.div
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: position.x,
          top: position.y,
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 60%)',
          opacity,
        }}
        animate={{ opacity }}
        transition={{ duration: 0.2 }}
      />

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
