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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative bg-dark-surface rounded-2xl p-8 max-w-lg w-full border"
        style={{
          borderColor: region.color,
          boxShadow: `0 0 40px ${region.color}40`,
          backgroundColor: 'rgba(18, 18, 42, 0.95)',
        }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: region.color }}
            animate={{ scale: [1, 1.5, 1] }}
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
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Key Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {region.topics.map((topic, index) => (
              <motion.span
                key={topic}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${region.color}20`,
                  border: `1px solid ${region.color}50`,
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
        <div className="bg-dark-bg/50 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm italic">
            Deep-dive content coming soon. This region will contain articles, frameworks, and interactive explorations.
          </p>
        </div>

        {/* Explore button */}
        <motion.button
          className="mt-6 w-full py-3 rounded-lg font-semibold transition-all"
          style={{
            backgroundColor: `${region.color}20`,
            border: `1px solid ${region.color}`,
            color: region.color,
          }}
          whileHover={{
            backgroundColor: region.color,
            color: '#0a0a1a',
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
    <section id="explorer" className="min-h-screen py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 neural-bg opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Explore My </span>
            <span className="text-glow-purple text-soft-purple">Brain</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Click on different regions to dive into specific knowledge domains.
            Each area represents years of learning, experiences, and frameworks.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Interactive brain */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-300">
              Knowledge Domains
            </h3>
            <div className="space-y-3">
              {brainRegions.map((region, index) => (
                <motion.button
                  key={region.id}
                  className="w-full p-4 rounded-xl text-left transition-all group"
                  style={{
                    backgroundColor: activeRegionId === region.id ? `${region.color}20` : 'rgba(26, 26, 58, 0.5)',
                    border: `1px solid ${activeRegionId === region.id ? region.color : 'rgba(255,255,255,0.1)'}`,
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    backgroundColor: `${region.color}20`,
                    borderColor: region.color,
                  }}
                  onMouseEnter={() => setActiveRegionId(region.id)}
                  onMouseLeave={() => setActiveRegionId(null)}
                  onClick={() => setSelectedRegion(region)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full transition-all group-hover:scale-125"
                      style={{
                        backgroundColor: region.color,
                        boxShadow: `0 0 10px ${region.color}`,
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-electric-blue transition-colors">
                        {region.name}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {region.description}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-500 group-hover:text-white ml-auto transition-all group-hover:translate-x-1"
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
