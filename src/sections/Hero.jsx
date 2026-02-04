import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import BrainVisualization from '../components/BrainVisualization';

// Particle component for neural network background
const Particle = ({ delay, duration }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const size = 2 + Math.random() * 3;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 100%)`,
        boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Neural connection line that pulses
const NeuralConnection = ({ start, end, delay }) => (
  <motion.svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ overflow: 'visible' }}
  >
    <motion.line
      x1={`${start.x}%`}
      y1={`${start.y}%`}
      x2={`${end.x}%`}
      y2={`${end.y}%`}
      stroke="url(#neuralGradient)"
      strokeWidth="1"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
      transition={{
        duration: 4,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    <defs>
      <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </linearGradient>
    </defs>
  </motion.svg>
);

// Animated counter component
const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numericTarget = parseInt(target.replace(/\D/g, ''));
          const step = numericTarget / (duration * 60);
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= numericTarget) {
              setCount(numericTarget);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  const displayValue = target.includes('K')
    ? `${Math.floor(count / 1000)}K`
    : target.includes('+')
      ? `${count}+`
      : count;

  return <span ref={ref}>{hasAnimated ? displayValue : '0'}{suffix}</span>;
};

const Hero = ({ onEnterBrain }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse parallax for brain
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const brainX = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);
  const brainY = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    }
  };

  const stats = [
    { value: '50', suffix: '+', label: 'Mental Models', icon: '🧠', color: 'var(--synapse-purple)' },
    { value: '634', suffix: '', label: 'LinkedIn Posts', icon: '📝', color: 'var(--neural-blue)' },
    { value: '100', suffix: 'K+', label: 'Reactions', icon: '⚡', color: 'var(--thought-pink)' },
  ];

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 4,
  }));

  // Neural connections
  const connections = [
    { start: { x: 10, y: 20 }, end: { x: 40, y: 35 }, delay: 0 },
    { start: { x: 60, y: 15 }, end: { x: 85, y: 40 }, delay: 1 },
    { start: { x: 20, y: 70 }, end: { x: 50, y: 55 }, delay: 2 },
    { start: { x: 70, y: 80 }, end: { x: 90, y: 60 }, delay: 3 },
  ];

  const letterAnimation = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.03,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const headlineText = "Enter the architecture";
  const headlineText2 = "of decision-making.";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ background: 'var(--bg-void)' }}
    >
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 20% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <Particle key={p.id} delay={p.delay} duration={p.duration} />
        ))}
      </div>

      {/* Neural connections */}
      <div className="absolute inset-0 pointer-events-none">
        {connections.map((conn, i) => (
          <NeuralConnection key={i} {...conn} />
        ))}
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
        }}
        animate={{
          top: ['-5%', '105%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 min-h-screen flex items-center"
        style={{ y, opacity, scale }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-32">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="badge badge-accent badge-glow">
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--insight-green)' }}
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-xs">Neural Interface Active</span>
              </span>
            </motion.div>

            {/* Main Headline with letter animation */}
            <div className="mb-6" style={{ perspective: '1000px' }}>
              <motion.h1
                className="heading-hero"
                initial="hidden"
                animate="visible"
                style={{ overflow: 'hidden' }}
              >
                <span className="block">
                  {headlineText.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterAnimation}
                      style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="block text-gradient" style={{ marginTop: '0.1em' }}>
                  {headlineText2.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i + headlineText.length}
                      variants={letterAnimation}
                      style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              className="text-lg text-muted mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ lineHeight: 1.8 }}
            >
              Navigate career decisions, data analytics, and life philosophy through
              mental models and frameworks distilled from real experience, not theory.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.button
                className="btn btn-glow group"
                onClick={onEnterBrain}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore My Brain</span>
                <motion.svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M4 8h8m-4-4l4 4-4 4" />
                </motion.svg>
              </motion.button>

              <motion.a
                href="#scenarios"
                className="btn btn-secondary group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Scenarios</span>
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Stats as System Status Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(10, 10, 15, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="status-dot status-dot-glow" />
                <span className="font-mono text-xs text-tertiary">BRAIN_METRICS.status</span>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div
                      className="text-2xl md:text-3xl font-bold mb-1 font-mono"
                      style={{ color: stat.color }}
                    >
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-tertiary uppercase tracking-wider">
                      {stat.label}
                    </div>
                    {/* Mini progress bar */}
                    <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: stat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 1.5 + index * 0.2, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Last synced indicator */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-white/5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--insight-green)' }}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="font-mono text-xs text-muted">Last sync: just now</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Brain Visualization */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            style={{
              x: brainX,
              y: brainY,
            }}
          >
            <div className="relative">
              {/* Outer glow rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                  transform: 'scale(1.5)',
                }}
                animate={{
                  scale: [1.5, 1.7, 1.5],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Orbiting ring */}
              <motion.div
                className="absolute inset-0"
                style={{
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '50%',
                  transform: 'scale(1.3)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: 'var(--synapse-purple)',
                    boxShadow: '0 0 20px var(--synapse-purple)',
                    top: '50%',
                    left: '-6px',
                    transform: 'translateY(-50%)',
                  }}
                />
              </motion.div>

              {/* Second orbiting ring */}
              <motion.div
                className="absolute inset-0"
                style={{
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  borderRadius: '50%',
                  transform: 'scale(1.5) rotateX(60deg)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: 'var(--neural-blue)',
                    boxShadow: '0 0 15px var(--neural-blue)',
                    top: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
              </motion.div>

              <BrainVisualization
                onRegionClick={() => {}}
                interactive={false}
                size="large"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs text-muted uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-2"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/50"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
