import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { brainRegions } from '../data';

const BrainExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <section id="explorer" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Knowledge Domains
          </motion.span>
          <motion.h2
            className="heading-lg section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore my brain
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Each region represents years of learning, experiences, and frameworks.
            Click to dive deeper into any domain.
          </motion.p>
        </div>

        {/* Regions Grid */}
        <div className="grid-3">
          {brainRegions.map((region, index) => (
            <motion.button
              key={region.id}
              onClick={() => setSelectedRegion(region)}
              className="card card-interactive"
              style={{ textAlign: 'left', padding: '28px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Color indicator */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: `${region.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: region.color
                }} />
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                {region.name}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {region.description}
              </p>

              {/* Topics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {region.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-tertiary)'
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            {/* Backdrop */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)'
              }}
              onClick={() => setSelectedRegion(null)}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '560px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
                padding: '40px',
                maxHeight: '90vh',
                overflow: 'auto'
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedRegion(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l8 8M4 12l8-8" />
                </svg>
              </button>

              {/* Header */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${selectedRegion.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: selectedRegion.color
                }} />
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '12px'
              }}>
                {selectedRegion.name}
              </h3>

              <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '32px',
                lineHeight: '1.7'
              }}>
                {selectedRegion.description}
              </p>

              {/* Topics */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-tertiary)',
                  marginBottom: '16px'
                }}>
                  Key Topics
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedRegion.topics.map((topic) => (
                    <span
                      key={topic}
                      style={{
                        fontSize: '0.875rem',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        background: `${selectedRegion.color}10`,
                        border: `1px solid ${selectedRegion.color}30`,
                        color: selectedRegion.color
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Insights */}
              {selectedRegion.insights && (
                <div>
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-tertiary)',
                    marginBottom: '16px'
                  }}>
                    Top Insights
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedRegion.insights.map((insight, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '16px',
                          background: 'var(--bg-secondary)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          marginBottom: '6px'
                        }}>
                          {insight.title}
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.6'
                        }}>
                          {insight.content}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-tertiary)',
                          marginTop: '8px'
                        }}>
                          {insight.engagement} reactions
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BrainExplorer;
