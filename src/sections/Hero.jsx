import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import BrainVisualization from '../components/BrainVisualization';

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

  const stats = [
    { value: '50', suffix: '+', label: 'Mental Models', icon: '🧠', color: 'var(--synapse-purple)' },
    { value: '634', suffix: '', label: 'LinkedIn Posts', icon: '📝', color: 'var(--neural-blue)' },
    { value: '100', suffix: 'K+', label: 'Reactions', icon: '⚡', color: 'var(--thought-pink)' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
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

      {/* Main content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 min-h-screen flex items-center"
        style={{ y, opacity }}
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
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: 'var(--insight-green)' }}
                />
                <span className="font-mono text-xs">Neural Interface Active</span>
              </span>
            </motion.div>

            {/* Main Headline - simple fade in */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="heading-hero">
                <span className="block">Enter the architecture</span>
                <span className="block text-gradient" style={{ marginTop: '0.1em' }}>
                  of decision-making.
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              className="text-lg text-muted mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                className="btn btn-glow group"
                onClick={onEnterBrain}
              >
                <span>Explore My Brain</span>
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M4 8h8m-4-4l4 4-4 4" />
                </svg>
              </button>

              <a
                href="#scenarios"
                className="btn btn-secondary group"
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
              </a>
            </motion.div>

            {/* Stats as System Status Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(10, 10, 15, 0.6)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="status-dot status-dot-glow" />
                <span className="font-mono text-xs text-tertiary">BRAIN_METRICS.status</span>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
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
                  </div>
                ))}
              </div>

              {/* Last synced indicator */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-white/5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--insight-green)' }}
                />
                <span className="font-mono text-xs text-muted">Last sync: just now</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Brain Visualization */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Simple glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.3)',
                }}
              />

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
        transition={{ delay: 1 }}
      >
        <span className="text-xs text-muted uppercase tracking-widest">Scroll to explore</span>
        <div
          className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-2"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <div className="w-1 h-2 rounded-full bg-white/50 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
