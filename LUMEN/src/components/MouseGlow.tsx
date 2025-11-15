import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MouseGlow: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none -z-10"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        width: '600px',
        height: '600px',
        marginLeft: '-300px',
        marginTop: '-300px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </motion.div>
  );
};

export default MouseGlow;
