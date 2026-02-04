import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { thoughts, getRelativeTime } from '../data';

const ThoughtStream = ({ isOpen, onClose }) => {
  const [currentThoughts, setCurrentThoughts] = useState(thoughts);
  const [newThought, setNewThought] = useState(null);

  // Simulate new thoughts coming in
  useEffect(() => {
    const newThoughts = [
      { content: "Processing: The hidden tax of indecision...", type: "processing" },
      { content: "New framework: 10-10-10 decision making", type: "model" },
      { content: "Connection found: Stoicism × Career resilience", type: "connection" },
      { content: "Updating: Why mentorship is overrated", type: "update" },
    ];

    const interval = setInterval(() => {
      const randomThought = newThoughts[Math.floor(Math.random() * newThoughts.length)];
      setNewThought({
        id: Date.now(),
        content: randomThought.content,
        type: randomThought.type,
        timestamp: new Date().toISOString(),
      });

      setTimeout(() => setNewThought(null), 3000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const typeColors = {
    insight: '#8B5CF6',
    model: '#00D4FF',
    connection: '#FF6B9D',
    analysis: '#10B981',
    pattern: '#F59E0B',
    processing: '#8B5CF6',
    update: '#00D4FF',
  };

  const typeIcons = {
    insight: '💡',
    model: '🧩',
    connection: '🔗',
    analysis: '🔍',
    pattern: '📊',
    processing: '⚡',
    update: '🔄',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-80 bg-dark-surface/95 backdrop-blur-xl border-l border-gray-800 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    🧠
                  </motion.span>
                  Thought Stream
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Live indicator */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Live updates from the brain</span>
              </div>
            </div>

            {/* New thought notification */}
            <AnimatePresence>
              {newThought && (
                <motion.div
                  className="mx-4 mt-4 p-3 rounded-lg border"
                  style={{
                    backgroundColor: `${typeColors[newThought.type]}10`,
                    borderColor: `${typeColors[newThought.type]}50`,
                  }}
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      {typeIcons[newThought.type]}
                    </motion.span>
                    <span className="text-xs font-medium text-white">New Activity</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{newThought.content}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thoughts list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {currentThoughts.map((thought, index) => (
                <motion.div
                  key={thought.id}
                  className="p-4 rounded-xl bg-dark-card/50 border border-gray-800 hover:border-gray-700 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${typeColors[thought.type]}20`,
                      }}
                    >
                      <span className="text-sm">{typeIcons[thought.type]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-200 leading-relaxed">{thought.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${typeColors[thought.type]}20`,
                            color: typeColors[thought.type],
                          }}
                        >
                          {thought.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getRelativeTime(thought.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Syncing continuously</span>
                <motion.div
                  className="flex items-center gap-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                  <span className="w-1.5 h-1.5 rounded-full bg-soft-purple" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neural-pink" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Floating toggle button for thought stream
export const ThoughtStreamToggle = ({ onClick, hasNew }) => (
  <motion.button
    onClick={onClick}
    className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-dark-card border border-gray-700 flex items-center justify-center z-40 shadow-lg"
    whileHover={{ scale: 1.1, borderColor: '#8B5CF6' }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.span
      className="text-2xl"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      🧠
    </motion.span>
    {hasNew && (
      <motion.span
        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neural-pink border-2 border-dark-bg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
    )}
  </motion.button>
);

export default ThoughtStream;
