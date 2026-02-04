import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { brainRegions, thoughts, getRelativeTime } from '../data';
import BrainVisualization from '../components/BrainVisualization';

// Neural activity graph mini component
const ActivityGraph = ({ color, activity }) => {
  const bars = 12;
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[...Array(bars)].map((_, i) => {
        const height = Math.sin((i / bars) * Math.PI * activity * 2) * 0.7 + 0.3;
        return (
          <motion.div
            key={i}
            className="w-1 rounded-full"
            style={{ background: color, opacity: 0.6 }}
            initial={{ height: 0 }}
            animate={{ height: `${height * 100}%` }}
            transition={{
              duration: 0.3,
              delay: i * 0.05,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 1,
            }}
          />
        );
      })}
    </div>
  );
};

// Typing animation for thoughts
const TypewriterText = ({ text, speed = 30 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-4 ml-0.5 bg-purple-400"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
};

const BrainExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [visibleThoughts, setVisibleThoughts] = useState([]);
  const [newThoughtIndex, setNewThoughtIndex] = useState(3);
  const thoughtsContainerRef = useRef(null);

  // Animate thoughts streaming in with typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (newThoughtIndex < thoughts.length) {
        setVisibleThoughts((prev) => [thoughts[newThoughtIndex], ...prev].slice(0, 6));
        setNewThoughtIndex((prev) => prev + 1);
      } else {
        setNewThoughtIndex(0);
        setVisibleThoughts(thoughts.slice(0, 3));
      }
    }, 5000);

    setVisibleThoughts(thoughts.slice(0, 3));

    return () => clearInterval(interval);
  }, [newThoughtIndex]);

  const getRegionColor = (regionId) => {
    const region = brainRegions.find((r) => r.id === regionId);
    return region?.color || '#8B5CF6';
  };

  const regionActivityLevels = {
    career: 0.95,
    'work-culture': 0.85,
    'data-analytics': 0.7,
    leadership: 0.8,
    philosophy: 0.6,
  };

  return (
    <section id="explorer" className="section relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 30% at 20% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 40% 40% at 80% 80%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)
            `,
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="section-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="status-dot status-dot-glow" />
            Neural Cartography
          </motion.span>
          <motion.h2
            className="heading-lg section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore the <span className="text-gradient">architecture</span>
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Each region represents years of learning, experiences, and frameworks.
            Click any region to dive deeper into the neural pathways.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Brain Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Coordinate markers */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 text-xs font-mono text-gray-600">
                {['A1', 'A2', 'A3', 'A4'].map((label, i) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-12 text-xs font-mono text-gray-600">
                {['B1', 'B2', 'B3', 'B4'].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>

              <BrainVisualization
                onRegionClick={setSelectedRegion}
                interactive={true}
                size="large"
              />
            </div>
          </motion.div>

          {/* Right: Control Panel & Legend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* System Status Header */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: 'rgba(10, 10, 15, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="status-dot status-dot-glow" />
                  <span className="font-mono text-xs text-gray-400">
                    REGION_ACTIVITY.map
                  </span>
                </div>
                <span className="font-mono text-xs text-gray-500">v2.4.1</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-neural)' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Region Control Panel */}
            <div className="space-y-3">
              {brainRegions.map((region, index) => (
                <motion.button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className="w-full text-left group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 4 }}
                >
                  <div
                    className="p-4 rounded-xl transition-all duration-300"
                    style={{
                      background:
                        hoveredRegion === region.id || selectedRegion?.id === region.id
                          ? `linear-gradient(135deg, ${region.color}10, transparent)`
                          : 'var(--bg-card)',
                      border: `1px solid ${
                        hoveredRegion === region.id || selectedRegion?.id === region.id
                          ? region.color + '40'
                          : 'var(--border-subtle)'
                      }`,
                      boxShadow:
                        hoveredRegion === region.id
                          ? `0 0 30px ${region.color}20`
                          : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: region.color,
                            boxShadow: `0 0 10px ${region.color}`,
                          }}
                          animate={
                            hoveredRegion === region.id
                              ? { scale: [1, 1.2, 1] }
                              : {}
                          }
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                        <span className="font-semibold text-sm">{region.name}</span>
                      </div>
                      <ActivityGraph
                        color={region.color}
                        activity={regionActivityLevels[region.id] || 0.5}
                      />
                    </div>

                    {/* Progress bar showing brain allocation */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: region.color }}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(regionActivityLevels[region.id] || 0.5) * 100}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-mono text-gray-500 w-10">
                        {Math.round((regionActivityLevels[region.id] || 0.5) * 100)}%
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Neural Feed / Thought Stream */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20"
        >
          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(10, 10, 15, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <h3 className="font-mono text-sm text-gray-300">
                  NEURAL_FEED.stream
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">
                  {visibleThoughts.length} active thoughts
                </span>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Thoughts */}
            <div
              ref={thoughtsContainerRef}
              className="space-y-4 max-h-[500px] overflow-hidden"
            >
              <AnimatePresence mode="popLayout">
                {visibleThoughts.map((thought, index) => (
                  <motion.div
                    key={thought.id}
                    initial={{ opacity: 0, x: -30, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 30, height: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="group"
                  >
                    <div
                      className="p-5 rounded-xl transition-all duration-300 hover:translate-x-1"
                      style={{
                        background: 'var(--bg-card)',
                        borderLeft: `3px solid ${getRegionColor(thought.region)}`,
                        border: '1px solid var(--border-subtle)',
                        boxShadow: index === 0 ? `0 0 20px ${getRegionColor(thought.region)}10` : 'none',
                      }}
                    >
                      {/* Timestamp and type */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-mono uppercase"
                            style={{
                              background: `${getRegionColor(thought.region)}15`,
                              color: getRegionColor(thought.region),
                            }}
                          >
                            {thought.type}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">
                            {getRelativeTime(thought.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: getRegionColor(thought.region) }}
                            animate={index === 0 ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-gray-200 leading-relaxed mb-3">
                        {index === 0 ? (
                          <TypewriterText text={thought.content} speed={20} />
                        ) : (
                          `"${thought.content}"`
                        )}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {thought.engagement}
                          </span>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            background: `${getRegionColor(thought.region)}10`,
                            color: getRegionColor(thought.region),
                          }}
                        >
                          {brainRegions.find((r) => r.id === thought.region)?.name || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer status */}
            <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-white/5">
              <motion.div
                className="flex gap-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-purple-400"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                  />
                ))}
              </motion.div>
              <span className="text-xs font-mono text-gray-500">
                Syncing neural patterns...
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Region Detail Modal */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'rgba(3, 3, 5, 0.9)',
                backdropFilter: 'blur(20px)',
              }}
              onClick={() => setSelectedRegion(null)}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${selectedRegion.color}30`,
                boxShadow: `0 0 80px ${selectedRegion.color}20`,
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedRegion(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-8">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${selectedRegion.color}30, ${selectedRegion.color}10)`,
                      border: `1px solid ${selectedRegion.color}40`,
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        background: selectedRegion.color,
                        boxShadow: `0 0 20px ${selectedRegion.color}`,
                      }}
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedRegion.name}</h3>
                    <p className="text-gray-400 leading-relaxed">{selectedRegion.description}</p>
                  </div>
                </div>

                {/* Activity level */}
                <div className="mb-8 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Neural Activity Level</span>
                    <span className="font-mono text-sm" style={{ color: selectedRegion.color }}>
                      {Math.round((regionActivityLevels[selectedRegion.id] || 0.5) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: selectedRegion.color }}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(regionActivityLevels[selectedRegion.id] || 0.5) * 100}%`,
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                    Key Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRegion.topics.map((topic, i) => (
                      <motion.span
                        key={topic}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-4 py-2 rounded-full text-sm"
                        style={{
                          background: `${selectedRegion.color}10`,
                          border: `1px solid ${selectedRegion.color}30`,
                          color: selectedRegion.color,
                        }}
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Insights */}
                {selectedRegion.insights && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                      Top Insights
                    </h4>
                    <div className="space-y-3">
                      {selectedRegion.insights.map((insight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="p-4 rounded-xl transition-colors hover:bg-white/5"
                          style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          <div className="font-semibold text-sm mb-2">{insight.title}</div>
                          <p className="text-sm text-gray-400 leading-relaxed mb-2">
                            {insight.content}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {insight.engagement} reactions
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BrainExplorer;
