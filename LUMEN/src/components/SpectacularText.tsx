import { motion } from 'framer-motion';

interface SpectacularTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function SpectacularText({
  children,
  className = '',
  delay = 0,
}: SpectacularTextProps) {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      scale: 0.8,
      filter: 'blur(10px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          style={{
            display: 'inline-block',
            willChange: 'transform',
            transformOrigin: 'center center',
          }}
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
