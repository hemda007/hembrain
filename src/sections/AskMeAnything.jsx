import { useState } from 'react';

const AskMeAnything = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const suggestedQuestions = [
    "How do you know when it's time to quit a job?",
    "What's the biggest career mistake you've made?",
    "How do you make decisions when you don't have enough data?",
    "What would you tell your 25-year-old self?",
    "How do you deal with imposter syndrome as a leader?",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) setIsSubmitted(true);
  };

  return (
    <section id="ask" className="section">
      <div className="container ask-wrap">
        <div className="section-header">
          <span className="section-label">Your Question. My 30 Years.</span>
          <h2 className="heading-lg section-title">Ask my brain</h2>
          <p className="section-description">
            Not a search engine. Not a chatbot trained on Reddit. You're querying a real mind —
            with real biases, real blind spots, and real experience.
          </p>
        </div>

        <div className="ask-card">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about career decisions, leadership, data analytics, life frameworks, or anything you'd DM me on LinkedIn..."
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
              </button>
            </form>
          ) : (
            <div className="ask-success">
              <div className="response-header">
                <span className="response-badge">Hem's Brain responding...</span>
                <span className="response-meta">Drawing from: Career × Philosophy</span>
              </div>
              <p className="response-note">
                In the full version, you'll get a response based on my actual frameworks and lived experience.
                Sometimes the answer is "I don't know." That's how you know it's human.
              </p>
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
        .response-header {
          margin-bottom: 16px;
        }
        .response-badge {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .response-meta {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
        .response-note {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }
      `}</style>
    </section>
  );
};

export default AskMeAnything;
