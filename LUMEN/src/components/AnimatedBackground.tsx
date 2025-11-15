import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ top: '10%', left: '10%' }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -150, 0],
          y: [0, 150, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        initial={{ bottom: '10%', right: '10%' }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
        initial={{ top: '50%', right: '20%' }}
      />

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(139, 92, 246, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0',
        }}
        animate={{
          backgroundPosition: [
            '0px 0px, 0px 0px, 0px 0px, 0px 0px',
            '100px 100px, 100px 100px, 50px 50px, 50px 50px',
          ],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Scanning lines effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(0deg, transparent 0%, rgba(0, 217, 255, 0.03) 50%, transparent 100%)',
          height: '200px',
        }}
        animate={{
          y: ['0vh', '100vh'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0">
        <div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 20% 20%, rgba(0, 217, 255, 0.08) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
          }}
        />
      </div>
    </div>
  );
}
