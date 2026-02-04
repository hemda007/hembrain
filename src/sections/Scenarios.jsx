import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { scenarios } from '../data';

const Scenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);

  return (
    <section id="scenarios" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Decision Frameworks
          </motion.span>
          <motion.h2
            className="heading-lg section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Real scenarios
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Navigate life's tough decisions with frameworks that actually work.
          </motion.p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid-3">
          {scenarios.map((scenario, index) => (
            <motion.button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className="card card-interactive"
              style={{ textAlign: 'left' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Icon */}
              <span style={{ fontSize: '2rem', marginBottom: '16px', display: 'block' }}>
                {scenario.icon}
              </span>

              {/* Category */}
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '500',
                color: scenario.color,
                marginBottom: '12px',
                display: 'block'
              }}>
                {scenario.category}
              </span>

              {/* Title */}
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {scenario.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                {scenario.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedScenario && (
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
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)'
              }}
              onClick={() => setSelectedScenario(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
                padding: '40px',
                maxHeight: '90vh',
                overflow: 'auto'
              }}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedScenario(null)}
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

              {/* Content */}
              <span style={{ fontSize: '2.5rem', marginBottom: '20px', display: 'block' }}>
                {selectedScenario.icon}
              </span>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: '500',
                color: selectedScenario.color,
                marginBottom: '8px',
                display: 'block'
              }}>
                {selectedScenario.category}
              </span>

              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '12px'
              }}>
                {selectedScenario.title}
              </h3>

              <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '32px',
                lineHeight: '1.7'
              }}>
                {selectedScenario.description}
              </p>

              {/* Framework */}
              {selectedScenario.framework && (
                <div>
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-tertiary)',
                    marginBottom: '16px'
                  }}>
                    My Framework
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedScenario.framework.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'flex-start'
                        }}
                      >
                        <span style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: `${selectedScenario.color}15`,
                          color: selectedScenario.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          flexShrink: 0
                        }}>
                          {i + 1}
                        </span>
                        <span style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.6'
                        }}>
                          {item}
                        </span>
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

export default Scenarios;
