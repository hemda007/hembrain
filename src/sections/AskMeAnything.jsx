import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Brain avatar component with neural spark effects
const BrainAvatar = ({ isThinking }) => (
  <div className="relative">
    <motion.div
      className="w-16 h-16 rounded-2xl flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
        border: '1px solid rgba(139, 92, 246, 0.3)',
      }}
      animate={isThinking ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <motion.span
        className="text-3xl"
        animate={isThinking ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🧠
      </motion.span>

      {/* Neural sparks when thinking */}
      {isThinking && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: ['#8B5CF6', '#3b82f6', '#06b6d4'][i % 3],
                boxShadow: `0 0 8px ${['#8B5CF6', '#3b82f6', '#06b6d4'][i % 3]}`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 30],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 30],
              }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </motion.div>

    {/* Status indicator */}
    <motion.div
      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
      style={{
        background: isThinking ? 'var(--energy-amber)' : 'var(--insight-green)',
        boxShadow: `0 0 10px ${isThinking ? 'var(--energy-amber)' : 'var(--insight-green)'}`,
      }}
    >
      {isThinking ? (
        <motion.svg
          className="w-3 h-3 text-black"
          fill="none"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 20" />
        </motion.svg>
      ) : (
        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </motion.div>
  </div>
);

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-purple-400"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 0.6,
          delay: i * 0.15,
          repeat: Infinity,
        }}
      />
    ))}
  </div>
);

// Brain regions activated display
const ActivatedRegions = ({ regions }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-wrap gap-2 mt-3"
  >
    <span className="text-xs text-gray-500 font-mono">Regions activated:</span>
    {regions.map((region, i) => (
      <motion.span
        key={region.name}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
        className="px-2 py-0.5 rounded-full text-xs font-mono"
        style={{
          background: `${region.color}15`,
          color: region.color,
          border: `1px solid ${region.color}30`,
        }}
      >
        {region.name}
      </motion.span>
    ))}
  </motion.div>
);

const AskMeAnything = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    { text: "How do you evaluate if someone is job-ready?", icon: "🎯" },
    { text: "What's your take on work-life balance?", icon: "⚖️" },
    { text: "How did you build Codebasics profitably?", icon: "📈" },
    { text: "What mental models do you use daily?", icon: "🧠" },
  ];

  const brainRegions = [
    { name: 'Career', color: '#10B981' },
    { name: 'Analytics', color: '#06b6d4' },
    { name: 'Philosophy', color: '#FF6B9D' },
    { name: 'Leadership', color: '#F59E0B' },
    { name: 'Culture', color: '#8B5CF6' },
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || isThinking) return;

    const userQuestion = question;
    setQuestion('');

    // Add user message
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: userQuestion, timestamp: new Date() },
    ]);

    // Simulate thinking
    setIsThinking(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const activatedRegions = brainRegions
        .sort(() => 0.5 - Math.random())
        .slice(0, 2 + Math.floor(Math.random() * 2));

      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          content: "This is a preview of the AI-powered response system. In the full version, you'll receive personalized insights based on my mental models, frameworks, and 634+ LinkedIn posts covering career navigation, data analytics, work culture, and life philosophy.",
          timestamp: new Date(),
          regions: activatedRegions,
          confidence: 85 + Math.floor(Math.random() * 10),
        },
      ]);
      setIsThinking(false);
    }, 2500);
  };

  const selectSuggestion = (text) => {
    setQuestion(text);
    inputRef.current?.focus();
  };

  return (
    <section id="ask" className="section relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 80% 100%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="container container-md relative z-10">
        {/* Header */}
        <div className="section-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="status-dot status-dot-glow" />
            Neural Interface
          </motion.span>
          <motion.h2
            className="heading-lg section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ask me <span className="text-gradient">anything</span>
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Chat with an AI trained on my mental models, frameworks, and 634 LinkedIn posts.
            Get personalized insights for your career and life decisions.
          </motion.p>
        </div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(10, 10, 15, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {/* Chat header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrainAvatar isThinking={isThinking} />
              <div>
                <h3 className="font-semibold text-sm">HemBrain AI</h3>
                <p className="text-xs text-gray-500 font-mono">
                  {isThinking ? 'Processing neural patterns...' : 'Ready to assist'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Beta
              </span>
            </div>
          </div>

          {/* Messages area */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center px-4"
              >
                <motion.div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                    border: '1px solid var(--border-subtle)',
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <span className="text-4xl">🧠</span>
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Ask about career decisions, mental models, data analytics, or life philosophy.
                  I'll respond with insights from my knowledge base.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/20'
                          : 'bg-white/5 border border-white/5'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>

                      {/* AI message extras */}
                      {msg.type === 'ai' && msg.regions && (
                        <>
                          <ActivatedRegions regions={msg.regions} />
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                            <span className="text-xs text-gray-500">Confidence:</span>
                            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${msg.confidence}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            <span className="text-xs font-mono text-purple-400">{msg.confidence}%</span>
                          </div>
                        </>
                      )}

                      <div className="flex items-center justify-end mt-2">
                        <span className="text-xs text-gray-600">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Typing indicator */}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-sm">🧠</span>
                </div>
                <div className="bg-white/5 rounded-2xl border border-white/5">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 0 && (
            <div className="px-4 pb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Suggested questions
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <motion.button
                    key={i}
                    onClick={() => selectSuggestion(q.text)}
                    className="px-4 py-2 rounded-xl text-sm transition-all hover:scale-[1.02]"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
                    }}
                  >
                    <span className="mr-2">{q.icon}</span>
                    {q.text}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
            <div
              className={`relative rounded-xl transition-all duration-300 ${
                isFocused ? 'ring-2 ring-purple-500/30' : ''
              }`}
              style={{
                background: 'var(--bg-secondary)',
                border: `1px solid ${isFocused ? 'var(--synapse-purple)' : 'var(--border-subtle)'}`,
              }}
            >
              <textarea
                ref={inputRef}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask anything about career, analytics, or life decisions..."
                className="w-full bg-transparent px-4 py-4 pr-24 text-sm resize-none focus:outline-none"
                style={{
                  minHeight: '60px',
                  maxHeight: '150px',
                }}
                rows={1}
              />

              <div className="absolute right-2 bottom-2 flex items-center gap-2">
                {/* Voice input button (decorative) */}
                <motion.button
                  type="button"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ color: 'var(--text-tertiary)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </motion.button>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={!question.trim() || isThinking}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: question.trim() && !isThinking
                      ? 'linear-gradient(135deg, var(--synapse-purple), var(--neural-blue))'
                      : 'var(--bg-tertiary)',
                    color: question.trim() && !isThinking ? 'white' : 'var(--text-muted)',
                    cursor: question.trim() && !isThinking ? 'pointer' : 'not-allowed',
                  }}
                  whileHover={question.trim() && !isThinking ? { scale: 1.05 } : {}}
                  whileTap={question.trim() && !isThinking ? { scale: 0.95 } : {}}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-2 text-center">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-gray-500 font-mono">Enter</kbd> to send
              or <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-gray-500 font-mono">Shift + Enter</kbd> for new line
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AskMeAnything;
