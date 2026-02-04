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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative bg-dark-surface rounded-2xl p-8 max-w-lg w-full border border-gray-700"
        style={{
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

        {!submitted ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">{scenario.icon}</span>
              <div>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${scenario.color}20`,
                    color: scenario.color,
                  }}
                >
                  {scenario.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{scenario.title}</h3>
              </div>
            </div>

            <p className="text-gray-400 mb-6">{scenario.description}</p>

            {/* Situation input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Describe your specific situation
              </label>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Tell me about your situation in detail. What's the context? What have you tried? What's holding you back?"
                className="w-full h-32 bg-dark-bg border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue transition-colors resize-none"
              />
            </div>

            {/* Submit button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!situation.trim()}
              className="w-full py-3 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(135deg, ${scenario.color}, ${scenario.color}aa)`,
              }}
              whileHover={{ scale: situation.trim() ? 1.02 : 1 }}
              whileTap={{ scale: situation.trim() ? 0.98 : 1 }}
            >
              Get Personalized Advice
            </motion.button>

            <p className="text-xs text-gray-500 mt-3 text-center">
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
              className="w-20 h-20 mx-auto rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">Scenario Submitted!</h3>
            <p className="text-gray-400 mb-6">
              Your situation has been recorded. In the full version, you'll receive personalized advice based on my frameworks and experiences.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-dark-card border border-gray-700 text-white hover:border-electric-blue transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Scenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);

  return (
    <section id="scenarios" className="min-h-screen py-20 px-4 relative">
      <div className="absolute inset-0 neural-bg opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Real </span>
            <span className="text-glow-pink text-neural-pink">Scenarios</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
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
              className="group relative p-6 rounded-2xl text-left transition-all"
              style={{
                backgroundColor: 'rgba(26, 26, 58, 0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -5,
                borderColor: scenario.color,
                boxShadow: `0 10px 40px ${scenario.color}20`,
              }}
            >
              {/* Icon */}
              <span className="text-4xl mb-4 block">{scenario.icon}</span>

              {/* Category badge */}
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full inline-block mb-3"
                style={{
                  backgroundColor: `${scenario.color}20`,
                  color: scenario.color,
                }}
              >
                {scenario.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-electric-blue transition-colors">
                {scenario.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4">
                {scenario.description}
              </p>

              {/* Arrow indicator */}
              <div className="flex items-center gap-2 text-gray-500 group-hover:text-electric-blue transition-all">
                <span className="text-sm">Explore</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${scenario.color}10, transparent)`,
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* Add your own scenario */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-4">Don't see your scenario?</p>
          <motion.button
            className="px-6 py-3 rounded-xl bg-dark-card border border-gray-700 text-white font-medium hover:border-electric-blue transition-colors"
            whileHover={{ scale: 1.02 }}
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
