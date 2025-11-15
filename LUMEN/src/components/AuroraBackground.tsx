import { motion } from 'framer-motion';
import { useThemeStore } from './ThemeToggle';

export default function AuroraBackground() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora wave layers */}
      {isDark ? (
        <>
          {/* Deep space background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0a1a] to-[#000000]" />
          
          {/* Aurora layer 1 - Cyan */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 217, 255, 0.3) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Aurora layer 2 - Purple */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
          
          {/* Aurora layer 3 - Pink */}
          <motion.div
            className="absolute inset-0 opacity-25"
            style={{
              background: 'radial-gradient(ellipse 70% 40% at 30% 0%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          
          {/* Shooting stars */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-lg shadow-white/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 + 50],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 5,
                repeatDelay: Math.random() * 10 + 5,
              }}
            />
          ))}
          
          {/* Twinkling stars */}
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={`twinkle-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          {/* Nebula clouds */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`nebula-${i}`}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 300 + 150}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: [
                  'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
                ][i % 3],
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          {/* Glowing particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: [
                  'rgba(0, 217, 255, 0.6)',
                  'rgba(139, 92, 246, 0.6)',
                  'rgba(236, 72, 153, 0.6)',
                ][i % 3],
                boxShadow: `0 0 20px ${
                  ['rgba(0, 217, 255, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(236, 72, 153, 0.8)'][i % 3]
                }`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          {/* Light beams */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute top-0 w-0.5 h-full opacity-20"
              style={{
                left: `${20 + i * 20}%`,
                background: 'linear-gradient(to bottom, rgba(0, 217, 255, 0.3) 0%, transparent 100%)',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleY: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </>
      ) : (
        <>
          {/* Light mode - Dreamy sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-200 to-purple-300" />
          
          {/* Sun glow */}
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 200, 0, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          />
          
          {/* Floating light orbs */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full blur-xl"
              style={{
                width: `${Math.random() * 150 + 50}px`,
                height: `${Math.random() * 150 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: [
                  'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(240, 147, 251, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)',
                ][i % 3],
              }}
              animate={{
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          {/* Rainbow shimmer */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(45deg, rgba(255,0,0,0.1) 0%, rgba(255,154,0,0.1) 10%, rgba(208,222,33,0.1) 20%, rgba(79,220,74,0.1) 30%, rgba(63,218,216,0.1) 40%, rgba(47,201,226,0.1) 50%, rgba(28,127,238,0.1) 60%, rgba(95,21,242,0.1) 70%, rgba(186,12,248,0.1) 80%, rgba(251,7,217,0.1) 90%, rgba(255,0,0,0.1) 100%)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </>
      )}
    </div>
  );
}
