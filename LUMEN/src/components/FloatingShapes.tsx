import { motion } from 'framer-motion';
import { useThemeStore } from './ThemeToggle';

export default function FloatingShapes() {
  const isDark = useThemeStore((state) => state.isDark);

  const shapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 15,
    type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.left,
            top: shape.top,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        >
          {shape.type === 'circle' && (
            <div
              className={`w-full h-full rounded-full blur-2xl ${
                isDark
                  ? 'bg-gradient-to-br from-cyan/5 to-purple/5'
                  : 'bg-gradient-to-br from-blue-200/30 to-purple-200/30'
              }`}
              style={{
                boxShadow: isDark
                  ? '0 0 60px rgba(0, 217, 255, 0.1)'
                  : '0 0 60px rgba(59, 130, 246, 0.2)',
              }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className={`w-full h-full blur-2xl ${
                isDark
                  ? 'bg-gradient-to-tr from-purple/5 to-pink/5'
                  : 'bg-gradient-to-tr from-purple-200/30 to-pink-200/30'
              }`}
              style={{
                boxShadow: isDark
                  ? '0 0 60px rgba(139, 92, 246, 0.1)'
                  : '0 0 60px rgba(147, 51, 234, 0.2)',
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className={`w-full h-full blur-2xl ${
                isDark
                  ? 'bg-gradient-to-bl from-cyan/5 to-blue/5'
                  : 'bg-gradient-to-bl from-blue-200/30 to-indigo-200/30'
              }`}
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                boxShadow: isDark
                  ? '0 0 60px rgba(0, 217, 255, 0.1)'
                  : '0 0 60px rgba(59, 130, 246, 0.2)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
