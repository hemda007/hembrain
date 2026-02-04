import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { brainRegions, thoughts, getRelativeTime } from '../data';

const BrainExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [visibleThoughts, setVisibleThoughts] = useState([]);

  // Animate thoughts streaming in
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleThoughts(prev => {
        if (prev.length >= thoughts.length) {
          return thoughts.slice(0, 5);
        }
        return thoughts.slice(0, prev.length + 1);
      });
    }, 2000);

    // Start with first 3 thoughts
    setVisibleThoughts(thoughts.slice(0, 3));

    return () => clearInterval(interval);
  }, []);

  // Brain slice paths - minimal geometric style
  const brainPaths = {
    'career': 'M150,40 Q200,30 250,50 Q280,70 280,100 Q250,90 200,95 Q160,90 150,70 Z',
    'work-culture': 'M120,80 Q150,70 200,95 Q170,110 140,120 Q110,110 100,95 Q105,85 120,80 Z',
    'data-analytics': 'M80,110 Q100,95 140,120 Q130,150 110,180 Q70,170 60,140 Q65,120 80,110 Z',
    'leadership': 'M200,95 Q250,90 280,100 Q300,130 290,170 Q260,160 220,165 Q180,155 170,130 Q175,110 200,95 Z',
    'philosophy': 'M110,180 Q130,150 170,130 Q180,155 220,165 Q200,200 160,210 Q120,200 110,180 Z'
  };

  const getRegionColor = (regionId) => {
    const region = brainRegions.find(r => r.id === regionId);
    return region?.color || '#666';
  };

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
            Click any region to dive deeper.
          </motion.p>
        </div>

        {/* Brain Visualization + Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            marginBottom: '80px'
          }}
          className="brain-grid"
        >
          {/* Brain SVG */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <svg
              viewBox="0 0 360 250"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto'
              }}
            >
              {/* Brain outline */}
              <motion.ellipse
                cx="180"
                cy="125"
                rx="150"
                ry="110"
                fill="none"
                stroke="var(--border-light)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Center line */}
              <line
                x1="180"
                y1="20"
                x2="180"
                y2="230"
                stroke="var(--border-subtle)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />

              {/* Brain regions */}
              {Object.entries(brainPaths).map(([regionId, path]) => {
                const region = brainRegions.find(r => r.id === regionId);
                const isHovered = hoveredRegion === regionId;
                const isSelected = selectedRegion?.id === regionId;

                return (
                  <motion.path
                    key={regionId}
                    d={path}
                    fill={isHovered || isSelected ? `${region?.color}30` : `${region?.color}15`}
                    stroke={region?.color}
                    strokeWidth={isHovered || isSelected ? 2 : 1}
                    style={{ cursor: 'pointer' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    onMouseEnter={() => setHoveredRegion(regionId)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => setSelectedRegion(region)}
                    whileHover={{ scale: 1.02 }}
                  />
                );
              })}

              {/* Region labels */}
              {brainRegions.map((region) => {
                const labelPositions = {
                  'career': { x: 200, y: 55 },
                  'work-culture': { x: 140, y: 100 },
                  'data-analytics': { x: 75, y: 145 },
                  'leadership': { x: 260, y: 130 },
                  'philosophy': { x: 165, y: 190 }
                };
                const pos = labelPositions[region.id];
                if (!pos) return null;

                return (
                  <motion.g
                    key={region.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="4"
                      fill={region.color}
                    />
                  </motion.g>
                );
              })}
            </svg>
          </div>

          {/* Region Legend */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {brainRegions.map((region) => (
              <motion.button
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  background: hoveredRegion === region.id || selectedRegion?.id === region.id
                    ? 'var(--bg-tertiary)'
                    : 'var(--bg-card)',
                  border: `1px solid ${hoveredRegion === region.id || selectedRegion?.id === region.id
                    ? region.color + '40'
                    : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                whileHover={{ y: -2 }}
              >
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: region.color,
                  flexShrink: 0
                }} />
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  {region.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Thoughts Stream */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent-green)',
              animation: 'pulse 2s infinite'
            }} />
            <h3 style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-tertiary)'
            }}>
              Live Thought Stream
            </h3>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '400px',
            overflow: 'hidden'
          }}>
            <AnimatePresence mode="popLayout">
              {visibleThoughts.slice(0, 5).map((thought, index) => (
                <motion.div
                  key={thought.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    padding: '20px 24px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    borderLeft: `3px solid ${getRegionColor(thought.region)}`
                  }}
                >
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.7',
                    marginBottom: '12px'
                  }}>
                    "{thought.content}"
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        background: `${getRegionColor(thought.region)}15`,
                        color: getRegionColor(thought.region),
                        borderRadius: '100px',
                        fontSize: '0.6875rem',
                        fontWeight: '500',
                        textTransform: 'uppercase'
                      }}>
                        {thought.type}
                      </span>
                      <span>{thought.engagement} reactions</span>
                    </div>
                    <span>{getRelativeTime(thought.timestamp)}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
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

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 768px) {
          .brain-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BrainExplorer;
