import { useState } from 'react';
import { scenarios } from '../data';

const Scenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [decisionInput, setDecisionInput] = useState('');
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
          <span className="section-label">Real Dilemmas. Real Frameworks.</span>
          <h2 className="heading-lg section-title">Decisions I've actually faced</h2>
          <p className="section-description">
            These aren't hypotheticals from a business textbook. These are decisions that
            kept me up at night, cost me money, or taught me something I couldn't have learned any other way.
          </p>
        </div>

        <div className="sc-grid">
          {scenarios.map((sc) => (
            <button key={sc.id} onClick={() => setSelectedScenario(sc)} className="sc-card">
              <div className="sc-meta">
                <span className="sc-cat" style={{ color: sc.color }}>{sc.category}</span>
                <span className="sc-diff">{sc.difficulty}</span>
              </div>
              <h3 className="sc-title">{sc.title}</h3>
              <p className="sc-desc">{sc.description}</p>
              {sc.lived && <span className="sc-lived">Lived it: Yes</span>}
            </button>
          ))}
        </div>

        <div className="decide-box">
          <h3 className="decide-title">Bring your own dilemma</h3>
          <p className="decide-desc">
            Facing something right now? Describe it below. My brain will apply the same frameworks I use on my own decisions.
            Not a magic answer — a structured way to think through the fog.
          </p>

          <form onSubmit={handleSubmit} className="decide-form">
            <textarea
              value={decisionInput}
              onChange={(e) => setDecisionInput(e.target.value)}
              placeholder="Describe your decision or challenge. Be specific — the more context, the better the framework..."
              className="input decide-input"
            />
            <button type="submit" className="btn btn-primary analyze-btn" disabled={!decisionInput.trim() || isAnalyzing}>
              {isAnalyzing ? 'Thinking...' : 'Get Framework'}
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
            <div className="modal-meta">
              <span className="modal-cat" style={{ color: selectedScenario.color }}>{selectedScenario.category}</span>
              <span className="modal-diff">Difficulty: {selectedScenario.difficulty}</span>
            </div>
            <h3 className="modal-title">{selectedScenario.title}</h3>
            <p className="modal-desc">{selectedScenario.description}</p>
            {selectedScenario.framework && (
              <div className="fw-block">
                <span className="label">How I'd Think Through This</span>
                <div className="fw-list">
                  {selectedScenario.framework.map((item, i) => (
                    <div key={i} className="fw-item">
                      <span className="fw-num" style={{ background: `${selectedScenario.color}15`, color: selectedScenario.color }}>{i + 1}</span>
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
        .sc-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .sc-cat { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
        .sc-diff { font-size: 0.6875rem; color: var(--text-tertiary); }
        .sc-title { font-size: 1rem; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); }
        .sc-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px; }
        .sc-lived { font-size: 0.6875rem; color: var(--text-tertiary); font-style: italic; }
        .decide-box {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 32px;
          max-width: 640px;
          margin: 0 auto;
        }
        .decide-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; text-align: center; }
        .decide-desc { font-size: 0.9375rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px; line-height: 1.6; text-align: center; }
        .decide-form { position: relative; }
        .decide-input { min-height: 100px; resize: vertical; padding-bottom: 56px; }
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
          max-width: 520px;
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
        .modal-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .modal-cat { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
        .modal-diff { font-size: 0.75rem; color: var(--text-tertiary); }
        .modal-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; }
        .modal-desc { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 28px; }
        .fw-block .label { display: block; margin-bottom: 16px; }
        .label { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-tertiary); }
        .fw-list { display: flex; flex-direction: column; gap: 12px; }
        .fw-item { display: flex; align-items: flex-start; gap: 12px; }
        .fw-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .fw-text { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.5; }
      `}</style>
    </section>
  );
};

export default Scenarios;
