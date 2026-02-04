import { motion } from 'framer-motion';
import { useState } from 'react';

const AskMeAnything = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const suggestedQuestions = [
    "How do you evaluate if someone is job-ready?",
    "What's your take on work-life balance?",
    "How did you build Codebasics profitably?",
    "What mental models do you use daily?",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="ask" className="section">
      <div className="container container-sm">
        {/* Header */}
        <div className="section-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            AI Chat
          </motion.span>
          <motion.h2
            className="heading-lg section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ask me anything
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Chat with an AI trained on my mental models, frameworks, and 634 LinkedIn posts.
          </motion.p>
        </div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              {/* Input */}
              <div style={{ marginBottom: '24px' }}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question..."
                  className="input"
                  style={{
                    minHeight: '120px',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Suggested Questions */}
              <div style={{ marginBottom: '24px' }}>
                <p style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-tertiary)',
                  marginBottom: '12px'
                }}>
                  Try asking
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuestion(q)}
                      style={{
                        padding: '8px 14px',
                        fontSize: '0.8125rem',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '100px',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.borderColor = 'var(--border-light)';
                        e.target.style.color = 'var(--text-primary)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.borderColor = 'var(--border-subtle)';
                        e.target.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!question.trim()}
                style={{
                  opacity: question.trim() ? 1 : 0.5,
                  cursor: question.trim() ? 'pointer' : 'not-allowed'
                }}
                whileHover={question.trim() ? { scale: 1.01 } : {}}
                whileTap={question.trim() ? { scale: 0.99 } : {}}
              >
                Ask Question
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 8h8m-4-4l4 4-4 4" />
                </svg>
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '48px 0' }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <svg width="28" height="28" fill="none" stroke="var(--accent-green)" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>
                Question Received
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                In the full version, you'll get an AI-powered response based on my frameworks.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setQuestion('');
                }}
                className="btn btn-secondary"
              >
                Ask Another Question
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AskMeAnything;
