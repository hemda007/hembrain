import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const mockResponses = [
  "That's a great question! Based on my experience with mental models, I'd say the key is to focus on first principles thinking. Break down the problem into its fundamental components and build up from there.",
  "Interesting. I've seen this pattern many times. The 80/20 rule really applies here - focus on the vital few, not the trivial many. What's the one thing that would make everything else easier?",
  "I've thought a lot about this. My framework for career decisions involves three key questions: Does it give you leverage? Does it compound? Does it align with your values?",
  "From both a philosophical and practical standpoint, I believe the answer lies in understanding your core values first. Once you're clear on what matters, the decision often becomes obvious.",
  "Let me share a mental model that's been incredibly useful for situations like this - the Regret Minimization Framework. Imagine yourself at 80, looking back...",
];

const AskMeAnything = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: "Hey! I'm Hem's Brain - an AI trained on my thoughts, frameworks, and experiences. Ask me anything about career, philosophy, or life decisions.",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="ask" className="section relative">
      <div className="absolute inset-0 neural-bg" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="container relative z-10" style={{ maxWidth: '900px' }}>
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label" style={{ color: '#00D4FF' }}>AI Chat Interface</span>
          <h2 className="section-title">
            <span style={{ color: 'white' }}>Ask Me </span>
            <span className="text-gradient-blue">Anything</span>
          </h2>
          <p className="section-description" style={{ margin: '0 auto' }}>
            Chat with an AI version of me, trained on my mental models and frameworks.
          </p>
        </motion.div>

        {/* Chat container */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(18, 18, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Chat header */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              background: 'rgba(10, 10, 26, 0.5)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #00D4FF 100%)',
                }}
                animate={{
                  boxShadow: ['0 0 15px rgba(139, 92, 246, 0.4)', '0 0 25px rgba(0, 212, 255, 0.4)', '0 0 15px rgba(139, 92, 246, 0.4)'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-xl">🧠</span>
              </motion.div>
              <div>
                <h3 className="font-semibold text-white">Hem's Brain</h3>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#10B981' }}
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>
            </div>

            {/* Voice chat badge */}
            <div
              className="px-4 py-2 rounded-full text-sm flex items-center gap-2 opacity-60"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="text-gray-400">Voice Chat</span>
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#FF6B9D' }}
              >
                Soon
              </span>
            </div>
          </div>

          {/* Messages area */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                    message.type === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                  }`}
                  style={{
                    backgroundColor: message.type === 'user'
                      ? '#8B5CF6'
                      : 'rgba(26, 26, 58, 0.8)',
                    border: message.type !== 'user' ? '1px solid rgba(0, 212, 255, 0.2)' : 'none',
                  }}
                >
                  {message.type !== 'user' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold" style={{ color: '#00D4FF' }}>
                        {message.type === 'system' ? '🧠 System' : "🧠 Hem's Brain"}
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed text-white">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  className="rounded-2xl rounded-bl-md px-5 py-4"
                  style={{
                    backgroundColor: 'rgba(26, 26, 58, 0.8)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs" style={{ color: '#00D4FF' }}>🧠 Hem's Brain</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#00D4FF' }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            className="p-4"
            style={{
              background: 'rgba(10, 10, 26, 0.5)',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about career, philosophy, or life decisions..."
                className="input-premium flex-1"
              />
              <motion.button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #00D4FF 100%)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              MVP mode: Responses are simulated. Full AI integration coming soon.
            </p>
          </div>
        </motion.div>

        {/* Suggested prompts */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            "How do I negotiate salary?",
            "What's your philosophy framework?",
            "Career pivot advice",
          ].map((prompt) => (
            <motion.button
              key={prompt}
              onClick={() => setInputValue(prompt)}
              className="px-5 py-2.5 rounded-full text-sm text-gray-400 transition-all"
              style={{
                background: 'rgba(18, 18, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              whileHover={{
                borderColor: '#00D4FF',
                color: '#00D4FF',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
              }}
            >
              {prompt}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AskMeAnything;
