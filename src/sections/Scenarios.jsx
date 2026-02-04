import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { scenarios } from '../data';

const ScenarioModal = ({ scenario, onClose }) => {
  const [situation, setSituation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (situation.trim()) {
      setSubmitted(true);
    }
  };

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
          backgroundColor: 'rgba(10, 10, 26, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
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

        {!submitted ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{scenario.icon}</span>
              <div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${scenario.color}15`,
                    color: scenario.color,
                  }}
                >
                  {scenario.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{scenario.title}</h3>
              </div>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">{scenario.description}</p>

            {/* Situation input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Describe your specific situation
              </label>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Tell me about your situation in detail. What's the context? What have you tried? What's holding you back?"
                className="input-premium h-32 resize-none"
              />
            </div>

            {/* Submit button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!situation.trim()}
              className="w-full py-4 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(135deg, ${scenario.color}, ${scenario.color}aa)`,
              }}
              whileHover={situation.trim() ? {
                scale: 1.02,
                boxShadow: `0 10px 30px ${scenario.color}40`,
              } : {}}
              whileTap={situation.trim() ? { scale: 0.98 } : {}}
            >
              Get Personalized Advice
            </motion.button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              MVP mode: Your scenario will be queued for the AI response feature.
            </p>
          </>
        ) : (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10B981',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <svg className="w-10 h-10" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">Scenario Submitted!</h3>
            <p className="text-gray-400 mb-6">
              Your situation has been recorded. In the full version, you'll receive personalized advice.
            </p>
            <motion.button
              onClick={onClose}
              className="px-8 py-3 rounded-xl text-white font-medium transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              whileHover={{ borderColor: '#00D4FF' }}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Scenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);

  return (
    <section id="scenarios" className="section-padding relative">
      <div className="absolute inset-0 neural-bg" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
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
            style={{ color: '#FF6B9D' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Decision Frameworks
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Real </span>
            <span className="text-gradient-pink">Scenarios</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Navigate life's tough decisions with frameworks that actually work.
            Select a scenario that resonates with your situation.
          </p>
        </motion.div>

        {/* Scenario cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => (
            <motion.button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className="group relative p-6 rounded-2xl text-left glass-card glass-card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Icon */}
              <span className="text-4xl mb-4 block">{scenario.icon}</span>

              {/* Category badge */}
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3"
                style={{
                  backgroundColor: `${scenario.color}15`,
                  color: scenario.color,
                }}
              >
                {scenario.category}
              </span>

              {/* Title */}
              <h3
                className="text-lg font-semibold text-white mb-2 transition-colors"
                style={{
                  color: 'white',
                }}
              >
                {scenario.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {scenario.description}
              </p>

              {/* Arrow indicator */}
              <div className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-all">
                <span className="text-sm">Explore</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: scenario.color }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </div>

              {/* Hover border color */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  border: `1px solid transparent`,
                }}
                whileHover={{
                  borderColor: scenario.color,
                  boxShadow: `0 20px 40px ${scenario.color}15`,
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* Add your own scenario */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-4">Don't see your scenario?</p>
          <motion.button
            className="px-8 py-3 rounded-xl text-white font-medium transition-all"
            style={{
              background: 'rgba(18, 18, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{
              borderColor: '#FF6B9D',
              boxShadow: '0 0 30px rgba(255, 107, 157, 0.15)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            + Describe Your Own
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedScenario && (
          <ScenarioModal
            scenario={selectedScenario}
            onClose={() => setSelectedScenario(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Scenarios;
