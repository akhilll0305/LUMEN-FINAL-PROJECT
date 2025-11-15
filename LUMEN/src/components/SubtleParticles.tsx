import { motion } from 'framer-motion';
import { useThemeStore } from './ThemeToggle';

export default function SubtleParticles() {
  const isDark = useThemeStore((state) => state.isDark);

  // Create fewer, more subtle particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: isDark
              ? `radial-gradient(circle, rgba(${particle.id % 2 === 0 ? '0, 217, 255' : '139, 92, 246'}, 0.6) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(${particle.id % 2 === 0 ? '6, 182, 212' : '168, 85, 247'}, 0.4) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
