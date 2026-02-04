import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const mockResponses = [
  "That's a great question! Based on my experience with mental models, I'd say the key is to focus on first principles thinking...",
  "Interesting. I've seen this pattern many times. The 80/20 rule really applies here - focus on the vital few, not the trivial many.",
  "I've thought a lot about this. My framework for career decisions involves three key questions...",
  "From both a philosophical and practical standpoint, I believe the answer lies in understanding your core values first.",
  "Let me share a mental model that's been incredibly useful for situations like this...",
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

    // Simulate AI response
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
    <section id="ask" className="min-h-screen py-20 px-4 relative">
      <div className="absolute inset-0 neural-bg opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Ask Me </span>
            <span className="text-glow-blue text-electric-blue">Anything</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Chat with an AI version of me, trained on my mental models and frameworks.
          </p>
        </motion.div>

        {/* Chat container */}
        <motion.div
          className="bg-dark-surface/80 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Chat header */}
          <div className="bg-dark-card/50 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-soft-purple to-electric-blue flex items-center justify-center"
                animate={{
                  boxShadow: ['0 0 10px rgba(139, 92, 246, 0.5)', '0 0 20px rgba(0, 212, 255, 0.5)', '0 0 10px rgba(139, 92, 246, 0.5)'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-lg">🧠</span>
              </motion.div>
              <div>
                <h3 className="font-semibold text-white">Hem's Brain</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>
            </div>

            {/* Voice chat badge */}
            <motion.button
              className="px-4 py-2 rounded-full text-sm bg-gray-800 text-gray-400 flex items-center gap-2 cursor-not-allowed opacity-60"
              whileHover={{ scale: 1.02 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>Voice Chat</span>
              <span className="text-xs bg-neural-pink/20 text-neural-pink px-2 py-0.5 rounded">Soon</span>
            </motion.button>
          </div>

          {/* Messages area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-soft-purple text-white rounded-br-sm'
                      : message.type === 'system'
                      ? 'bg-dark-card border border-gray-700 text-gray-300 rounded-bl-sm'
                      : 'bg-dark-card border border-electric-blue/30 text-gray-200 rounded-bl-sm'
                  }`}
                >
                  {message.type !== 'user' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-electric-blue">
                        {message.type === 'system' ? '🧠 System' : '🧠 Hem\'s Brain'}
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
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
                <div className="bg-dark-card border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-electric-blue">🧠 Hem's Brain</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-electric-blue"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2,
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
          <div className="p-4 border-t border-gray-800 bg-dark-card/30">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about career, philosophy, or life decisions..."
                className="flex-1 bg-dark-bg border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue transition-colors"
              />
              <motion.button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-soft-purple to-electric-blue rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              MVP mode: Responses are simulated. Full AI integration coming soon.
            </p>
          </div>
        </motion.div>

        {/* Suggested prompts */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-2"
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
            <button
              key={prompt}
              onClick={() => setInputValue(prompt)}
              className="px-4 py-2 rounded-full text-sm bg-dark-card border border-gray-700 text-gray-400 hover:border-electric-blue hover:text-electric-blue transition-colors"
            >
              {prompt}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AskMeAnything;
