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
    color: '#10B981',
  },
  {
    id: 'business',
    icon: '📊',
    title: 'Business Decisions',
    description: 'Strategy, growth, partnerships',
    examples: ['Should I start this side project?', 'How to prioritize features?', 'When to hire?'],
    color: '#8B5CF6',
  },
  {
    id: 'life',
    icon: '🧭',
    title: 'Life Decisions',
    description: 'Relationships, lifestyle, purpose',
    examples: ['Should I relocate?', 'How to balance work-life?', 'What skills to learn?'],
    color: '#06b6d4',
  },
];

// Complexity indicator component
const ComplexityBadge = ({ level }) => {
  const levels = {
    low: { label: 'Simple', color: '#10B981', dots: 1 },
    medium: { label: 'Moderate', color: '#F59E0B', dots: 2 },
    high: { label: 'Complex', color: '#EF4444', dots: 3 },
  };
  const config = levels[level] || levels.medium;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: dot <= config.dots ? config.color : 'var(--bg-tertiary)',
            }}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">{config.label}</span>
    </div>
  );
};

// Scenario card with preview animation
const ScenarioCard = ({ scenario, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full text-left group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <div
        className="p-6 rounded-2xl h-full transition-all duration-500 relative"
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${isHovered ? scenario.color + '40' : 'var(--border-subtle)'}`,
          boxShadow: isHovered ? `0 20px 50px ${scenario.color}15` : 'none',
        }}
      >
        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(135deg, ${scenario.color}08, transparent)`,
          }}
        />

        {/* Icon with animation */}
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative"
          style={{
            background: `linear-gradient(135deg, ${scenario.color}15, ${scenario.color}05)`,
            border: `1px solid ${scenario.color}20`,
          }}
          animate={isHovered ? { scale: 1.05, rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl">{scenario.icon}</span>

          {/* Glow ring on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                boxShadow: `0 0 30px ${scenario.color}40`,
              }}
            />
          )}
        </motion.div>

        {/* Category badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: scenario.color }}
          >
            {scenario.category}
          </span>
          <ComplexityBadge level={scenario.complexity || 'medium'} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-3 leading-tight">{scenario.title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{scenario.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {scenario.framework?.length || 5} step framework
            </span>
          </div>
          <motion.div
            className="flex items-center gap-1 text-sm"
            style={{ color: scenario.color }}
            animate={isHovered ? { x: 3 } : { x: 0 }}
          >
            <span>Explore</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};

const Scenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [decisionInput, setDecisionInput] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleDecisionSubmit = (e) => {
    e.preventDefault();
    if (decisionInput.trim()) {
      setIsAnalyzing(true);
      setAnalysisComplete(false);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  return (
    <section id="scenarios" className="section relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 20% 40%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 80% 60%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
            `,
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
            Decision Frameworks
          </motion.span>
          <motion.h2
            className="heading-lg section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Real-world <span className="text-gradient">scenarios</span>
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Navigate life's tough decisions with frameworks that actually work.
            Each scenario includes battle-tested mental models.
          </motion.p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {scenarios.map((scenario, index) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              index={index}
              onClick={() => setSelectedScenario(scenario)}
            />
          ))}
        </div>

        {/* Decision Helper Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(10, 10, 15, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <span className="text-3xl">🧠</span>
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">Decision Analysis Engine</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Facing a tough choice? Let my brain analyze your situation and provide a framework for clarity.
              </p>
            </div>

            {/* Decision Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {decisionTypes.map((type, index) => (
                <motion.button
                  key={type.id}
                  onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-xl text-left transition-all duration-300"
                  style={{
                    background: selectedType === type.id
                      ? `linear-gradient(135deg, ${type.color}15, transparent)`
                      : 'var(--bg-card)',
                    border: `1px solid ${selectedType === type.id ? type.color + '40' : 'var(--border-subtle)'}`,
                    boxShadow: selectedType === type.id ? `0 0 30px ${type.color}15` : 'none',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: selectedType === type.id ? type.color : 'white' }}
                      >
                        {type.title}
                      </h4>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Example Questions */}
            <AnimatePresence>
              {selectedType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    Example questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {decisionTypes.find((t) => t.id === selectedType)?.examples.map((example, i) => (
                      <motion.button
                        key={example}
                        onClick={() => setDecisionInput(example)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-4 py-2 rounded-xl text-sm transition-all hover:scale-[1.02]"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {example}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decision Input */}
            <form onSubmit={handleDecisionSubmit}>
              <div className="relative">
                <textarea
                  value={decisionInput}
                  onChange={(e) => setDecisionInput(e.target.value)}
                  placeholder="Describe your decision or challenge..."
                  className="input w-full"
                  style={{
                    minHeight: '120px',
                    resize: 'vertical',
                    paddingRight: '140px',
                  }}
                />
                <motion.button
                  type="submit"
                  disabled={!decisionInput.trim() || isAnalyzing}
                  className="absolute bottom-4 right-4 btn btn-glow"
                  whileHover={decisionInput.trim() && !isAnalyzing ? { scale: 1.02 } : {}}
                  whileTap={decisionInput.trim() && !isAnalyzing ? { scale: 0.98 } : {}}
                  style={{
                    opacity: decisionInput.trim() && !isAnalyzing ? 1 : 0.5,
                    cursor: decisionInput.trim() && !isAnalyzing ? 'pointer' : 'not-allowed',
                  }}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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
            <AnimatePresence>
              {(isAnalyzing || analysisComplete) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-6 rounded-xl"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <motion.div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))' }}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <span className="text-xl">🧠</span>
                        </motion.div>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-purple-400"
                            style={{
                              top: '50%',
                              left: '50%',
                            }}
                            animate={{
                              x: [0, Math.cos((i * 120 * Math.PI) / 180) * 30],
                              y: [0, Math.sin((i * 120 * Math.PI) / 180) * 30],
                              opacity: [1, 0],
                            }}
                            transition={{
                              duration: 1,
                              delay: i * 0.2,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Syncing with brain patterns...</p>
                        <p className="text-sm text-gray-500">
                          Analyzing decision frameworks and mental models
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-500/20">
                          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold">Analysis Complete</p>
                          <p className="text-sm text-gray-500">Framework identified</p>
                        </div>
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                        In the full version, you'll receive a personalized decision framework based on your specific situation,
                        including relevant mental models, pros/cons analysis, and recommended action steps.
                      </p>
                      <button
                        onClick={() => {
                          setAnalysisComplete(false);
                          setDecisionInput('');
                        }}
                        className="mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Analyze another decision →
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Scenario Detail Modal */}
      <AnimatePresence>
        {selectedScenario && (
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
              onClick={() => setSelectedScenario(null)}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-auto rounded-2xl"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${selectedScenario.color}30`,
                boxShadow: `0 0 80px ${selectedScenario.color}20`,
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedScenario(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${selectedScenario.color}20, ${selectedScenario.color}10)`,
                    border: `1px solid ${selectedScenario.color}30`,
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-3xl">{selectedScenario.icon}</span>
                </motion.div>

                {/* Header */}
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: selectedScenario.color }}
                >
                  {selectedScenario.category}
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-3">{selectedScenario.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8">{selectedScenario.description}</p>

                {/* Framework */}
                {selectedScenario.framework && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                      My Framework
                    </h4>
                    <div className="space-y-4">
                      {selectedScenario.framework.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-4"
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `${selectedScenario.color}15`,
                              color: selectedScenario.color,
                            }}
                          >
                            <span className="text-sm font-semibold">{i + 1}</span>
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
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

export default Scenarios;
