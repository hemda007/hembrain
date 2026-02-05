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
    if (question.trim()) setIsSubmitted(true);
  };

  return (
    <section id="ask" className="section">
      <div className="container ask-wrap">
        <div className="section-header">
          <span className="section-label">AI Chat</span>
          <h2 className="heading-lg section-title">Ask me anything</h2>
          <p className="section-description">
            Chat with an AI trained on my mental models, frameworks, and 634 LinkedIn posts.
          </p>
        </div>

        <div className="ask-card">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
                className="input ask-input"
              />

              <div className="ask-suggest">
                <span className="label">Try asking</span>
                <div className="suggest-list">
                  {suggestedQuestions.map((q) => (
                    <button key={q} type="button" onClick={() => setQuestion(q)} className="suggest-btn">
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!question.trim()}
                style={{ opacity: question.trim() ? 1 : 0.5 }}
              >
                Ask Question
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 8h8m-4-4l4 4-4 4" />
                </svg>
              </button>
            </form>
          ) : (
            <div className="ask-success">
              <div className="success-icon">
                <svg width="24" height="24" fill="none" stroke="var(--accent-green)" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3>Question Received</h3>
              <p>In the full version, you'll get an AI-powered response based on my frameworks.</p>
              <button onClick={() => { setIsSubmitted(false); setQuestion(''); }} className="btn btn-secondary">
                Ask Another Question
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .ask-wrap {
          max-width: 640px;
        }
        .ask-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 32px;
        }
        .ask-input {
          min-height: 100px;
          resize: vertical;
          margin-bottom: 20px;
        }
        .ask-suggest {
          margin-bottom: 20px;
        }
        .ask-suggest .label {
          display: block;
          margin-bottom: 10px;
        }
        .label {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-tertiary);
        }
        .suggest-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .suggest-btn {
          padding: 6px 12px;
          font-size: 0.8125rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .suggest-btn:hover {
          border-color: var(--border-light);
          color: var(--text-primary);
        }
        .ask-success {
          text-align: center;
          padding: 20px 0;
        }
        .success-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .ask-success h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .ask-success p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
      `}</style>
    </section>
  );
};

export default AskMeAnything;
