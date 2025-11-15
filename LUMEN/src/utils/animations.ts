import { Variants } from 'framer-motion';

// Container animation for staggering children
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Item animation for staggered children
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Fade in animation
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

// Slide up animation
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Scale in animation
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Slide from left
export const slideFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Slide from right
export const slideFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Card hover animation
export const cardHoverVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Button tap animation
export const buttonTapVariants: Variants = {
  tap: { scale: 0.95 },
};

// Glow pulse animation
export const glowPulseVariants: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(212, 175, 55, 0.4)',
      '0 0 40px rgba(212, 175, 55, 0.6)',
      '0 0 20px rgba(212, 175, 55, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Page transition variants
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Modal variants
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

// Backdrop variants
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Floating animation
export const floatingVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Spring animation config
export const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 25,
};

// Smooth animation config
export const smoothConfig = {
  duration: 0.4,
  ease: 'easeOut' as const,
};
