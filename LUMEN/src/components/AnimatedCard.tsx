import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedCard({ children, delay = 0, className = '' }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className={className}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
