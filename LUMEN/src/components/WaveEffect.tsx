import { motion } from 'framer-motion';
import { useThemeStore } from './ThemeToggle';

export default function WaveEffect() {
  const isDark = useThemeStore((state) => state.isDark);

  const waves = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    duration: 8 + i,
  }));

  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none overflow-hidden h-96 -z-5">
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className={`absolute bottom-0 left-0 right-0 h-full ${
            isDark
              ? 'bg-gradient-to-t from-cyan/5 via-purple/5 to-transparent'
              : 'bg-gradient-to-t from-blue-100/40 via-purple-100/40 to-transparent'
          }`}
          style={{
            opacity: 0.3 - wave.id * 0.05,
          }}
          animate={{
            y: [0, -30, 0],
            scaleX: [1, 1.1, 1],
          }}
          transition={{
            duration: wave.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: wave.delay,
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,100 C300,150 600,50 900,100 C1050,125 1150,75 1200,100 L1200,200 L0,200 Z"
              fill={isDark ? 'rgba(0, 217, 255, 0.03)' : 'rgba(59, 130, 246, 0.1)'}
              animate={{
                d: [
                  'M0,100 C300,150 600,50 900,100 C1050,125 1150,75 1200,100 L1200,200 L0,200 Z',
                  'M0,120 C300,70 600,130 900,80 C1050,105 1150,95 1200,120 L1200,200 L0,200 Z',
                  'M0,100 C300,150 600,50 900,100 C1050,125 1150,75 1200,100 L1200,200 L0,200 Z',
                ],
              }}
              transition={{
                duration: wave.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: wave.delay,
              }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
