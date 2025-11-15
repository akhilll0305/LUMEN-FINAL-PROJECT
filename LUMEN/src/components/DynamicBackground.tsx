import { motion } from 'framer-motion';
import { useThemeStore } from './ThemeToggle';

export default function DynamicBackground() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient layer */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? [
                'radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)',
                'radial-gradient(125% 125% at 50% 10%, #000000 40%, #1a0d36 100%)',
                'radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)',
              ]
            : [
                'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
                'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
              ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          background: isDark
            ? [
                'radial-gradient(ellipse at 20% 0%, rgba(0, 217, 255, 0.15) 0%, transparent 50%)',
                'radial-gradient(ellipse at 40% 20%, rgba(0, 217, 255, 0.2) 0%, transparent 50%)',
                'radial-gradient(ellipse at 20% 0%, rgba(0, 217, 255, 0.15) 0%, transparent 50%)',
              ]
            : [
                'radial-gradient(ellipse at 20% 0%, rgba(102, 126, 234, 0.4) 0%, transparent 50%)',
                'radial-gradient(ellipse at 40% 20%, rgba(102, 126, 234, 0.5) 0%, transparent 50%)',
                'radial-gradient(ellipse at 20% 0%, rgba(102, 126, 234, 0.4) 0%, transparent 50%)',
              ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-full h-full"
        animate={{
          background: isDark
            ? [
                'radial-gradient(ellipse at 80% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(ellipse at 60% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
                'radial-gradient(ellipse at 80% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              ]
            : [
                'radial-gradient(ellipse at 80% 100%, rgba(240, 147, 251, 0.4) 0%, transparent 50%)',
                'radial-gradient(ellipse at 60% 80%, rgba(240, 147, 251, 0.5) 0%, transparent 50%)',
                'radial-gradient(ellipse at 80% 100%, rgba(240, 147, 251, 0.4) 0%, transparent 50%)',
              ],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      {/* Floating mesh gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? `radial-gradient(at 40% 20%, rgba(0, 217, 255, 0.1) 0px, transparent 50%),
               radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
               radial-gradient(at 0% 50%, rgba(0, 217, 255, 0.08) 0px, transparent 50%),
               radial-gradient(at 80% 50%, rgba(139, 92, 246, 0.08) 0px, transparent 50%),
               radial-gradient(at 0% 100%, rgba(0, 217, 255, 0.1) 0px, transparent 50%)`
            : `radial-gradient(at 40% 20%, rgba(6, 182, 212, 0.2) 0px, transparent 50%),
               radial-gradient(at 80% 0%, rgba(168, 85, 247, 0.2) 0px, transparent 50%),
               radial-gradient(at 0% 50%, rgba(6, 182, 212, 0.15) 0px, transparent 50%),
               radial-gradient(at 80% 50%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
               radial-gradient(at 0% 100%, rgba(6, 182, 212, 0.2) 0px, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px)`
            : `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Starfield effect for dark mode */}
      {isDark && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Cloud-like shapes for light mode */}
      {!isDark && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
