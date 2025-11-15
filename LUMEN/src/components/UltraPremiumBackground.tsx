import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const UltraPremiumBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
    }

    const particles: Particle[] = [];
    const particleCount = 80;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * -0.5 - 0.1,
        opacity: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Animation loop
    let animationFrame: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulse opacity
        particle.pulsePhase += particle.pulseSpeed;
        const pulseOpacity = particle.opacity * (0.7 + Math.sin(particle.pulsePhase) * 0.3);

        // Draw particle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `rgba(212, 175, 55, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `rgba(244, 208, 63, ${pulseOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Layer 1: Base Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, #1a0f0a 0%, #0a0504 50%, #000000 100%)',
        }}
      />

      {/* Layer 2: Animated Mesh Gradient */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(212,175,55,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(244,208,63,0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(201,169,97,0.07) 0%, transparent 50%),
            radial-gradient(circle at 60% 20%, rgba(205,127,50,0.05) 0%, transparent 50%)
          `,
          filter: 'blur(80px)',
        }}
        animate={{
          transform: [
            'translate(0%, 0%) scale(1)',
            'translate(-5%, 3%) scale(1.05)',
            'translate(3%, -4%) scale(0.98)',
            'translate(0%, 0%) scale(1)',
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 3: Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Layer 4: Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg) scale(2)',
          transformOrigin: 'center top',
        }}
      />

      {/* Layer 5: Light Rays */}
      <motion.div
        className="absolute top-0 right-0 w-full h-full opacity-0"
        style={{
          background: `linear-gradient(
            125deg,
            transparent 0%,
            rgba(212,175,55,0.03) 45%,
            rgba(244,208,63,0.05) 50%,
            rgba(212,175,55,0.03) 55%,
            transparent 100%
          )`,
          transform: 'rotate(-15deg) scale(1.5)',
        }}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default UltraPremiumBackground;
