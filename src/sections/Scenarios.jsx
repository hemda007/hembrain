import { useState } from 'react';
import { scenarios } from '../data';

const decisionTypes = [
  { id: 'career', icon: '🎯', title: 'Career Decisions', desc: 'Job offers, promotions, career pivots', examples: ['Should I take this new job?', 'Is it time to switch careers?', 'How do I negotiate salary?'], color: 'var(--accent-green)' },
  { id: 'business', icon: '📊', title: 'Business Decisions', desc: 'Strategy, growth, partnerships', examples: ['Should I start this side project?', 'How to prioritize features?', 'When to hire?'], color: 'var(--accent-purple)' },
  { id: 'life', icon: '🧭', title: 'Life Decisions', desc: 'Relationships, lifestyle, purpose', examples: ['Should I relocate?', 'How to balance work-life?', 'What skills to learn?'], color: 'var(--accent-cyan)' }
];

const Scenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [decisionInput, setDecisionInput] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (decisionInput.trim()) {
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 2000);
    }
  };

  return (
    <section id="scenarios" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Decision Frameworks</span>
          <h2 className="heading-lg section-title">Real scenarios</h2>
          <p className="section-description">
            Navigate life's tough decisions with frameworks that actually work.
          </p>
        </div>

        <div className="sc-grid">
          {scenarios.map((sc) => (
            <button key={sc.id} onClick={() => setSelectedScenario(sc)} className="sc-card">
              <span className="sc-icon">{sc.icon}</span>
              <span className="sc-cat" style={{ color: sc.color }}>{sc.category}</span>
              <h3 className="sc-title">{sc.title}</h3>
              <p className="sc-desc">{sc.description}</p>
            </button>
          ))}
        </div>

        <div className="decide-box">
          <div className="decide-head">
            <span className="decide-icon">🧠</span>
            <h3 className="decide-title">Help me in decision making</h3>
            <p className="decide-desc">Facing a tough choice? Let my brain analyze your situation and provide a framework for clarity.</p>
          </div>

          <div className="decide-types">
            {decisionTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(selectedType === t.id ? null : t.id)}
                className={`type-btn ${selectedType === t.id ? 'active' : ''}`}
                style={{ '--color': t.color }}
              >
                <span className="type-icon">{t.icon}</span>
                <h4 className="type-title">{t.title}</h4>
                <p className="type-desc">{t.desc}</p>
              </button>
            ))}
          </div>

          {selectedType && (
            <div className="examples">
              <span className="label">Example questions</span>
              <div className="ex-list">
                {decisionTypes.find(t => t.id === selectedType)?.examples.map((ex) => (
                  <button key={ex} onClick={() => setDecisionInput(ex)} className="ex-btn">{ex}</button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="decide-form">
            <textarea
              value={decisionInput}
              onChange={(e) => setDecisionInput(e.target.value)}
              placeholder="Describe your decision or challenge..."
              className="input decide-input"
            />
            <button type="submit" className="btn btn-primary analyze-btn" disabled={!decisionInput.trim() || isAnalyzing}>
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>
        </div>
      </div>

      {selectedScenario && (
        <div className="modal-bg" onClick={() => setSelectedScenario(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedScenario(null)} className="modal-x">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l8 8M3 11l8-8" /></svg>
            </button>
            <span className="modal-emoji">{selectedScenario.icon}</span>
            <span className="modal-cat" style={{ color: selectedScenario.color }}>{selectedScenario.category}</span>
            <h3 className="modal-title">{selectedScenario.title}</h3>
            <p className="modal-desc">{selectedScenario.description}</p>
            {selectedScenario.framework && (
              <div className="fw-block">
                <span className="label">My Framework</span>
                <div className="fw-list">
                  {selectedScenario.framework.map((item, i) => (
                    <div key={i} className="fw-item">
                      <span className="fw-num" style={{ color: selectedScenario.color }}>{i + 1}</span>
                      <span className="fw-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .sc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 64px;
        }
        @media (min-width: 640px) { .sc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .sc-grid { grid-template-columns: repeat(3, 1fr); } }
        .sc-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s;
        }
        .sc-card:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-light);
        }
        .sc-icon { font-size: 1.5rem; display: block; margin-bottom: 14px; }
        .sc-cat { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; display: block; margin-bottom: 6px; }
        .sc-title { font-size: 1rem; font-weight: 600; margin-bottom: 6px; color: var(--text-primary); }
        .sc-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; }
        .decide-box {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 32px;
        }
        .decide-head { text-align: center; margin-bottom: 28px; }
        .decide-icon { font-size: 1.75rem; display: block; margin-bottom: 14px; }
        .decide-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; }
        .decide-desc { font-size: 0.9375rem; color: var(--text-secondary); max-width: 420px; margin: 0 auto; line-height: 1.5; }
        .decide-types {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        @media (min-width: 768px) { .decide-types { grid-template-columns: repeat(3, 1fr); } }
        .type-btn {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s;
        }
        .type-btn:hover { border-color: var(--color); }
        .type-btn.active { background: color-mix(in srgb, var(--color) 10%, transparent); border-color: var(--color); }
        .type-icon { font-size: 1.25rem; display: block; margin-bottom: 10px; }
        .type-title { font-size: 0.9375rem; font-weight: 600; margin-bottom: 4px; color: var(--text-primary); }
        .type-desc { font-size: 0.8125rem; color: var(--text-tertiary); line-height: 1.4; }
        .examples { margin-bottom: 20px; }
        .examples .label { display: block; margin-bottom: 10px; }
        .label { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-tertiary); }
        .ex-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .ex-btn {
          padding: 6px 12px;
          font-size: 0.8125rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .ex-btn:hover { background: var(--bg-secondary); color: var(--text-primary); }
        .decide-form { position: relative; }
        .decide-input { min-height: 90px; resize: vertical; padding-bottom: 56px; }
        .analyze-btn { position: absolute; bottom: 12px; right: 12px; }
        .modal-bg {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0,0,0,0.85);
        }
        .modal {
          position: relative;
          width: 100%;
          max-width: 480px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 32px;
          max-height: 85vh;
          overflow: auto;
        }
        .modal-x {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-emoji { font-size: 1.75rem; display: block; margin-bottom: 14px; }
        .modal-cat { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; display: block; margin-bottom: 6px; }
        .modal-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 10px; }
        .modal-desc { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; }
        .fw-block .label { display: block; margin-bottom: 12px; }
        .fw-list { display: flex; flex-direction: column; gap: 10px; }
        .fw-item { display: flex; align-items: flex-start; gap: 10px; }
        .fw-num {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .fw-text { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; }
      `}</style>
    </section>
  );
};

export default Scenarios;
