import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import BrainVisualization from '../components/BrainVisualization';
import { brainRegions } from '../data';

const RegionModal = ({ region, onClose }) => {
  if (!region) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-lg"
        style={{
          background: 'rgba(10, 10, 26, 0.98)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${region.color}`,
          borderRadius: '24px',
          padding: '40px',
          boxShadow: `0 0 80px ${region.color}30`,
        }}
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.5)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = 'white'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Region indicator */}
        <motion.div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${region.color}30, ${region.color}10)`,
            border: `2px solid ${region.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
          }}
          animate={{ boxShadow: [`0 0 20px ${region.color}40`, `0 0 40px ${region.color}60`, `0 0 20px ${region.color}40`] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: region.color }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Content */}
        <h3 style={{ fontSize: '28px', fontWeight: 700, color: region.color, marginBottom: '12px' }}>
          {region.name}
        </h3>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '28px' }}>
          {region.description}
        </p>

        {/* Topics */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
            Key Topics
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {region.topics.map((topic, index) => (
              <motion.span
                key={topic}
                style={{
                  padding: '8px 16px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 500,
                  backgroundColor: `${region.color}15`,
                  border: `1px solid ${region.color}40`,
                  color: region.color,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Explore button */}
        <motion.button
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '15px',
            fontWeight: 600,
            backgroundColor: `${region.color}15`,
            border: `1px solid ${region.color}`,
            color: region.color,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          whileHover={{
            backgroundColor: region.color,
            color: '#0a0a1a',
            boxShadow: `0 10px 40px ${region.color}40`,
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
    <section id="explorer" className="section relative">
      {/* Background */}
      <div className="absolute inset-0 neural-bg" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Interactive Experience</span>
          <h2 className="section-title">
            <span style={{ color: 'white' }}>Explore My </span>
            <span className="text-gradient-purple">Brain</span>
          </h2>
          <p className="section-description" style={{ margin: '0 auto' }}>
            Click on different regions to dive into specific knowledge domains.
            Each area represents years of learning, experiences, and frameworks.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid-2-cols" style={{ alignItems: 'center' }}>
          {/* Brain visualization */}
          <motion.div
            style={{ display: 'flex', justifyContent: 'center' }}
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

          {/* Knowledge domains list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '24px',
            }}>
              Knowledge Domains
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {brainRegions.map((region, index) => {
                const isActive = activeRegionId === region.id;

                return (
                  <motion.button
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setActiveRegionId(region.id)}
                    onMouseLeave={() => setActiveRegionId(null)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      borderRadius: '16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      background: isActive ? `${region.color}10` : 'rgba(18, 18, 42, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${isActive ? region.color + '60' : 'rgba(255,255,255,0.06)'}`,
                      transition: 'all 0.3s ease',
                      transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {/* Color indicator */}
                      <motion.div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: region.color,
                          boxShadow: isActive ? `0 0 20px ${region.color}` : `0 0 10px ${region.color}80`,
                          flexShrink: 0,
                        }}
                        animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      />

                      {/* Text content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: isActive ? region.color : 'white',
                          marginBottom: '4px',
                          transition: 'color 0.3s ease',
                        }}>
                          {region.name}
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.5)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {region.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isActive ? region.color : 'rgba(255,255,255,0.3)'}
                        strokeWidth="2"
                        style={{
                          flexShrink: 0,
                          transition: 'all 0.3s ease',
                          transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                        }}
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </motion.button>
                );
              })}
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
