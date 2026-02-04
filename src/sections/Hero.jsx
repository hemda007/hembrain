import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import BrainVisualization from '../components/BrainVisualization';

const Hero = ({ onEnterBrain }) => {
  const [lastSync, setLastSync] = useState(new Date());
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatSyncTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Memoize particles to prevent re-renders
  const particles = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      id: i,
      color: ['#8B5CF6', '#00D4FF', '#FF6B9D'][i % 3],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg" />

      {/* Neural ambient background */}
      <div className="absolute inset-0 neural-bg" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              background: particle.color,
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [-20, -120, -20],
              x: [-10, 10, -10],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content with parallax */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-5xl mx-auto text-center px-6 pt-24"
        style={{ opacity, scale }}
      >
        {/* Sync status badge */}
        <motion.div
          className="flex items-center gap-3 px-4 py-2 rounded-full glass-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#00D4FF' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1],
              boxShadow: ['0 0 5px #00D4FF', '0 0 15px #00D4FF', '0 0 5px #00D4FF'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm text-gray-400">
            Last synced: <span className="text-gray-300">{formatSyncTime(lastSync)}</span>
          </span>
        </motion.div>

        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="text-gradient-purple">Hem</span>
            <span className="text-gradient-blue">Brain</span>
          </h1>
          <motion.div
            className="h-1 mt-4 rounded-full mx-auto"
            style={{
              background: 'linear-gradient(90deg, #8B5CF6, #00D4FF, #FF6B9D)',
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '80%', opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          />
        </motion.div>

        {/* Brain visualization */}
        <motion.div
          className="my-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
        >
          <BrainVisualization size="large" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Sync with my mind. Explore thoughts, frameworks, and{' '}
          <span style={{ color: '#00D4FF' }}>mental models</span> that shape how I navigate{' '}
          <span style={{ color: '#FF6B9D' }}>career</span>,{' '}
          <span style={{ color: '#8B5CF6' }}>creativity</span>, and{' '}
          <span style={{ color: '#F59E0B' }}>life</span>.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onEnterBrain}
          className="relative mt-4 px-10 py-4 rounded-full text-lg font-semibold text-white overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7c3aed 100%)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #FF6B9D 100%)',
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <span className="relative z-10 flex items-center gap-3">
            Enter My Brain
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </span>
        </motion.button>

        {/* Quick stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {[
            { value: '50+', label: 'Mental Models', color: '#8B5CF6' },
            { value: '5', label: 'Knowledge Domains', color: '#00D4FF' },
            { value: '∞', label: 'Connections', color: '#FF6B9D' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2"
        style={{ transform: 'translateX(-50%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ border: '2px solid rgba(139, 92, 246, 0.4)' }}
          >
            <motion.div
              className="w-1.5 h-3 rounded-full"
              style={{ backgroundColor: '#8B5CF6' }}
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Gradient fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0a0a1a 0%, transparent 100%)',
        }}
      />
    </section>
  );
};

export default Hero;
