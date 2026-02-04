import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import BrainVisualization from '../components/BrainVisualization';

const Hero = ({ onEnterBrain }) => {
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const formatSyncTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Background effects */}
      <div className="absolute inset-0 neural-bg" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: ['#8B5CF6', '#00D4FF', '#FF6B9D'][i % 3],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Sync status */}
      <motion.div
        className="absolute top-8 right-8 flex items-center gap-2 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.span
          className="w-2 h-2 rounded-full bg-electric-blue"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <span>Last synced: {formatSyncTime(lastSync)}</span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto text-center">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-2">
            <span className="text-glow-purple">Hem</span>
            <span className="text-glow-blue">Brain</span>
          </h1>
          <motion.div
            className="h-1 bg-gradient-to-r from-soft-purple via-electric-blue to-neural-pink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        {/* Brain visualization */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <BrainVisualization size="large" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Sync with my mind. Explore thoughts, frameworks, and
          <span className="text-electric-blue"> mental models</span> that shape how I navigate
          <span className="text-neural-pink"> career</span>,
          <span className="text-soft-purple"> creativity</span>, and
          <span className="text-yellow-400"> life</span>.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onEnterBrain}
          className="relative px-8 py-4 bg-gradient-to-r from-soft-purple to-electric-blue rounded-full text-lg font-semibold text-white overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Enter My Brain
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-electric-blue to-neural-pink"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Quick stats */}
        <motion.div
          className="flex gap-8 mt-8 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">50+</span>
            <span>Mental Models</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">5</span>
            <span>Knowledge Domains</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">∞</span>
            <span>Connections</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-electric-blue rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
