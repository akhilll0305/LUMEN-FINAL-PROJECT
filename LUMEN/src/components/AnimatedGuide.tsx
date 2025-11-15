import { motion, useAnimationControls } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

interface GuideStep {
  icon: typeof Sparkles;
  title: string;
  description: string;
  color: string;
}

const steps: GuideStep[] = [
  {
    icon: Sparkles,
    title: "Upload Your Receipt",
    description: "Drop your receipt like magic — watch it light up and transform into data",
    color: "from-cyan to-blue-400",
  },
  {
    icon: Zap,
    title: "AI Analyzes",
    description: "See the AI brain process your data in real-time — neurons firing, patterns emerging",
    color: "from-purple to-pink-400",
  },
  {
    icon: TrendingUp,
    title: "Get Insights",
    description: "Watch your financial insights bloom like flowers — beautiful, clear, actionable",
    color: "from-cyan to-purple",
  },
];

export default function AnimatedGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      rotate: [0, 5, 0],
      transition: { duration: 0.5 },
    });
  }, [activeStep, controls]);

  return (
    <div className="relative">
      {/* Animated background waves */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(0,217,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(0,217,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 glass-card p-8 rounded-2xl">
        <h3 className="text-2xl font-bold mb-6 text-center">
          <span className="gradient-text">Your Journey</span>
        </h3>

        {/* Steps visualization */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2"
              animate={{
                scale: activeStep === index ? 1.1 : 1,
                opacity: activeStep === index ? 1 : 0.5,
              }}
            >
              <motion.div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center relative`}
                animate={activeStep === index ? controls : {}}
              >
                {activeStep === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)`,
                    }}
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
                <step.icon className="w-8 h-8 text-white relative z-10" />
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-cyan to-purple"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeStep > index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Active step description */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <h4 className={`text-xl font-bold mb-2 bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent`}>
            {steps[activeStep].title}
          </h4>
          <p className="text-text-secondary">{steps[activeStep].description}</p>
        </motion.div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {steps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeStep === index ? "bg-cyan w-8" : "bg-white/30"
              }`}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
