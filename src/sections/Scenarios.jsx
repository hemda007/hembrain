import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { scenarios } from '../data';

const decisionTypes = [
  {
    id: 'career',
    icon: '🎯',
    title: 'Career Decisions',
    description: 'Job offers, promotions, career pivots',
    examples: ['Should I take this new job?', 'Is it time to switch careers?', 'How do I negotiate salary?'],
    color: 'var(--accent-green)'
  },
  {
    id: 'business',
    icon: '📊',
    title: 'Business Decisions',
    description: 'Strategy, growth, partnerships',
    examples: ['Should I start this side project?', 'How to prioritize features?', 'When to hire?'],
    color: 'var(--accent-purple)'
  },
  {
    id: 'life',
    icon: '🧭',
    title: 'Life Decisions',
    description: 'Relationships, lifestyle, purpose',
    examples: ['Should I relocate?', 'How to balance work-life?', 'What skills to learn?'],
    color: 'var(--accent-cyan)'
  }
];

const Scenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [decisionInput, setDecisionInput] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDecisionSubmit = (e) => {
    e.preventDefault();
    if (decisionInput.trim()) {
      setIsAnalyzing(true);
      // Simulate analysis
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000);
    }
  };

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

        {/* Help Me in Decision Making Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '80px',
            padding: '48px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <motion.div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--accent-purple)20, var(--accent-cyan)20)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '1.5rem'
              }}
            >
              🧠
            </motion.div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '12px'
            }}>
              Help me in decision making
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Facing a tough choice? Let my brain analyze your situation and provide
              a framework for clarity.
            </p>
          </div>

          {/* Decision Types */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {decisionTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                style={{
                  padding: '20px',
                  background: selectedType === type.id ? `${type.color}10` : 'var(--bg-secondary)',
                  border: `1px solid ${selectedType === type.id ? type.color : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                whileHover={{ y: -2 }}
              >
                <span style={{ fontSize: '1.5rem', marginBottom: '12px', display: 'block' }}>
                  {type.icon}
                </span>
                <h4 style={{
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: selectedType === type.id ? type.color : 'var(--text-primary)'
                }}>
                  {type.title}
                </h4>
                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: '1.5'
                }}>
                  {type.description}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Example Questions */}
          {selectedType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginBottom: '24px' }}
            >
              <p style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-tertiary)',
                marginBottom: '12px'
              }}>
                Example questions
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {decisionTypes.find(t => t.id === selectedType)?.examples.map((example) => (
                  <button
                    key={example}
                    onClick={() => setDecisionInput(example)}
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.8125rem',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '100px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Decision Input */}
          <form onSubmit={handleDecisionSubmit}>
            <div style={{ position: 'relative' }}>
              <textarea
                value={decisionInput}
                onChange={(e) => setDecisionInput(e.target.value)}
                placeholder="Describe your decision or challenge..."
                className="input"
                style={{
                  width: '100%',
                  minHeight: '120px',
                  resize: 'vertical',
                  paddingRight: '120px'
                }}
              />
              <motion.button
                type="submit"
                className="btn btn-primary"
                disabled={!decisionInput.trim() || isAnalyzing}
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAnalyzing ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block' }}
                    >
                      ⚡
                    </motion.span>
                    Analyzing
                  </span>
                ) : (
                  'Analyze'
                )}
              </motion.button>
            </div>
          </form>

          {/* Analysis Result */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '24px',
                padding: '24px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent-purple)',
                  animation: 'pulse 1.5s infinite'
                }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Syncing with brain patterns...
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
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
