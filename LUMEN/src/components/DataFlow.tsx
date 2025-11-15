import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DataFlowProps {
  from: string;
  to: string;
  label: string;
}

export default function DataFlow({ from, to, label }: DataFlowProps) {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [...prev, Date.now()]);
      setTimeout(() => {
        setParticles((prev) => prev.slice(1));
      }, 2000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 flex items-center justify-center">
      {/* Flow line */}
      <motion.div
        className="absolute w-full h-1 bg-gradient-to-r from-cyan via-purple to-cyan rounded-full"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />

      {/* Animated particles */}
      {particles.map((id) => (
        <motion.div
          key={id}
          className="absolute w-3 h-3 rounded-full bg-cyan shadow-lg shadow-cyan/50"
          initial={{ x: '-50%', scale: 0 }}
          animate={{
            x: '150%',
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* From point */}
      <motion.div
        className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-blue-400 flex items-center justify-center text-xs font-bold text-black"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 20px rgba(0,217,255,0.5)',
            '0 0 40px rgba(0,217,255,0.8)',
            '0 0 20px rgba(0,217,255,0.5)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {from}
      </motion.div>

      {/* To point */}
      <motion.div
        className="absolute right-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple to-pink-400 flex items-center justify-center text-xs font-bold text-white"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 20px rgba(139,92,246,0.5)',
            '0 0 40px rgba(139,92,246,0.8)',
            '0 0 20px rgba(139,92,246,0.5)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
      >
        {to}
      </motion.div>

      {/* Label */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 text-sm font-medium text-cyan"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {label}
      </motion.div>
    </div>
  );
}
