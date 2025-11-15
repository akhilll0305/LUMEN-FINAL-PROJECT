import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideUpRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function SlideUpReveal({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}: SlideUpRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
