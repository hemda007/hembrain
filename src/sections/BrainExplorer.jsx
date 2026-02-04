import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import BrainVisualization from '../components/BrainVisualization';
import { brainRegions } from '../data';

const RegionModal = ({ region, onClose }) => {
  if (!region) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative rounded-2xl p-8 max-w-lg w-full"
        style={{
          border: `1px solid ${region.color}`,
          boxShadow: `0 0 60px ${region.color}30`,
          backgroundColor: 'rgba(10, 10, 26, 0.98)',
          backdropFilter: 'blur(20px)',
        }}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Region indicator */}
        <motion.div
          className="w-16 h-16 rounded-full mb-6 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${region.color}40, ${region.color}10)`,
            border: `2px solid ${region.color}`,
          }}
          animate={{
            boxShadow: [`0 0 20px ${region.color}40`, `0 0 40px ${region.color}60`, `0 0 20px ${region.color}40`],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: region.color }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3" style={{ color: region.color }}>
          {region.name}
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {region.description}
        </p>

        {/* Topics */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-widest">
            Key Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {region.topics.map((topic, index) => (
              <motion.span
                key={topic}
                className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${region.color}15`,
                  border: `1px solid ${region.color}40`,
                  color: region.color,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Placeholder content */}
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <p className="text-gray-500 text-sm">
            Deep-dive content coming soon. This region will contain articles, frameworks, and interactive explorations.
          </p>
        </div>

        {/* Explore button */}
        <motion.button
          className="mt-6 w-full py-3.5 rounded-xl font-semibold transition-all"
          style={{
            backgroundColor: `${region.color}15`,
            border: `1px solid ${region.color}`,
            color: region.color,
          }}
          whileHover={{
            backgroundColor: region.color,
            color: '#0a0a1a',
            boxShadow: `0 10px 30px ${region.color}40`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          Explore This Domain
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const BrainExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [activeRegionId, setActiveRegionId] = useState(null);

  const handleRegionClick = (region) => {
    const fullRegion = brainRegions.find(r => r.id === region.id);
    setSelectedRegion(fullRegion);
  };

  return (
    <section id="explorer" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 neural-bg" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-xs font-semibold uppercase tracking-widest mb-4 block"
            style={{ color: '#8B5CF6' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Interactive Experience
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Explore My </span>
            <span className="text-gradient-purple">Brain</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Click on different regions to dive into specific knowledge domains.
            Each area represents years of learning, experiences, and frameworks.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Interactive brain */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BrainVisualization
              interactive={true}
              onRegionClick={handleRegionClick}
              size="large"
            />
          </motion.div>

          {/* Region list */}
          <motion.div
            className="flex-1 max-w-md w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-6">
              Knowledge Domains
            </h3>
            <div className="space-y-3">
              {brainRegions.map((region, index) => (
                <motion.button
                  key={region.id}
                  className="w-full p-5 rounded-xl text-left transition-all group glass-card glass-card-hover"
                  style={{
                    backgroundColor: activeRegionId === region.id ? `${region.color}10` : undefined,
                    borderColor: activeRegionId === region.id ? region.color : undefined,
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setActiveRegionId(region.id)}
                  onMouseLeave={() => setActiveRegionId(null)}
                  onClick={() => setSelectedRegion(region)}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: region.color,
                        boxShadow: `0 0 15px ${region.color}`,
                      }}
                      animate={activeRegionId === region.id ? {
                        scale: [1, 1.3, 1],
                      } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-semibold text-white transition-colors"
                        style={{
                          color: activeRegionId === region.id ? region.color : 'white',
                        }}
                      >
                        {region.name}
                      </h4>
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {region.description}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-600 flex-shrink-0 transition-all"
                      style={{
                        color: activeRegionId === region.id ? region.color : undefined,
                        transform: activeRegionId === region.id ? 'translateX(4px)' : 'translateX(0)',
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRegion && (
          <RegionModal
            region={selectedRegion}
            onClose={() => setSelectedRegion(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BrainExplorer;
