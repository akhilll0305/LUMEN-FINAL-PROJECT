import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useThemeStore } from './ThemeToggle';

export default function MagneticCursor() {
  const isDark = useThemeStore((state) => state.isDark);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-50 hidden md:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      >
        <motion.div
          className={`w-8 h-8 rounded-full ${
            isDark
              ? 'bg-gradient-to-br from-cyan/30 to-purple/30'
              : 'bg-gradient-to-br from-blue-400/40 to-purple-400/40'
          } backdrop-blur-sm`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-50 hidden md:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      >
        <motion.div
          className={`w-8 h-8 rounded-full border-2 ${
            isDark ? 'border-cyan/50' : 'border-blue-500/50'
          }`}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </>
  );
}
