import { useState } from 'react';
import { coachingPlans } from '../data';

const steps = [
  { num: '01', title: 'Share the Real Picture', desc: 'Not the LinkedIn version. The messy, complicated, "I\'m not sure what I\'m even asking" version. That\'s where the real work starts.' },
  { num: '02', title: 'Get Frameworks That Fit', desc: 'Not generic advice. Specific mental models mapped to YOUR situation, YOUR constraints, YOUR values.' },
  { num: '03', title: 'Decide With Clarity', desc: 'Walk away with a decision you can explain to yourself at 3am — not because it\'s easy, but because you\'ve thought it through properly.' }
];

const Coaching = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="coaching" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">From Exploring to Applying</span>
          <h2 className="heading-lg section-title">Go beyond the brain</h2>
          <p className="section-description">
            HemBrain gives you the map. Coaching gives you the guide. For decisions too complex
            for a framework and too important for a guess.
          </p>
        </div>

        <div className="pitch">
          <p>
            I've been answering career and life questions for free on LinkedIn for years. I love it.
            But a DM has limits — I can't understand your full context in 280 characters, and you
            deserve more than a rushed reply between meetings.
          </p>
          <p>
            Coaching is the full version of that conversation. Same brain. Same honesty.
            Just with the depth your decision actually deserves.
          </p>
        </div>

        <div className="plans">
          {coachingPlans.map((p) => (
            <div key={p.id} className={`plan ${p.highlighted ? 'popular' : ''}`}>
              {p.highlighted && <span className="pop-badge">Most chosen</span>}
              <h3 className="plan-name">{p.name}</h3>
              <p className="plan-sub">{p.subtitle}</p>
              <div className="plan-price">{p.price}</div>
              <p className="plan-desc">{p.description}</p>
              <button className={`btn w-full ${p.highlighted ? 'btn-primary' : 'btn-secondary'}`}>{p.cta}</button>
              <ul className="plan-feat">
                {p.features.map((f) => (
                  <li key={f}>
                    <svg width="14" height="14" fill="none" stroke={p.color} strokeWidth="2"><path d="M3 7l3 3 5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="steps-section">
          <h3 className="sub-title">How it works</h3>
          <div className="steps-grid">
            {steps.map((s) => (
              <div key={s.num} className="step">
                <span className="step-num">{s.num}</span>
                <h4 className="step-title">{s.title}</h4>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="disclaimer">
          I'm not a certified therapist or financial advisor. I'm someone who has made a lot of decisions — good and bad — and built frameworks from both.
          If your situation needs professional help, I'll tell you that honestly.
        </p>

        <div className="cta-box">
          {!submitted ? (
            <>
              <h3 className="cta-title">Ready to think through your decision?</h3>
              <p className="cta-desc">Takes 30 seconds to get started.</p>
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} className="cta-form">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="input" required />
                <button type="submit" className="btn btn-primary">Get Started</button>
              </form>
            </>
          ) : (
            <div className="cta-done">
              <span className="done-icon">✓</span>
              <h3>You're in!</h3>
              <p>Check your email for next steps.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .pitch {
          max-width: 640px;
          margin: 0 auto 48px;
          text-align: center;
        }
        .pitch p {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .plans {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 700px;
          margin: 0 auto 64px;
        }
        @media (min-width: 768px) { .plans { grid-template-columns: repeat(2, 1fr); } }
        .plan {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 28px;
        }
        .plan.popular { border-color: var(--accent-purple); }
        .pop-badge {
          position: absolute;
          top: -10px;
          right: 20px;
          background: var(--accent-purple);
          color: white;
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 100px;
          text-transform: uppercase;
        }
        .plan-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }
        .plan-sub { font-size: 0.8125rem; color: var(--text-tertiary); margin-bottom: 16px; }
        .plan-price { font-size: 2rem; font-weight: 700; margin-bottom: 4px; }
        .plan-desc { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 20px; }
        .plan-feat { list-style: none; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-subtle); }
        .plan-feat li { display: flex; align-items: flex-start; gap: 8px; font-size: 0.875rem; margin-bottom: 10px; color: var(--text-secondary); line-height: 1.4; }
        .plan-feat svg { flex-shrink: 0; margin-top: 2px; }
        .steps-section { margin-bottom: 48px; }
        .sub-title { font-size: 1.125rem; font-weight: 600; text-align: center; margin-bottom: 32px; }
        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }
        @media (min-width: 768px) { .steps-grid { grid-template-columns: repeat(3, 1fr); } }
        .step { text-align: center; }
        .step-num { font-size: 0.75rem; font-weight: 700; color: var(--accent-purple); display: block; margin-bottom: 12px; }
        .step-title { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
        .step-desc { font-size: 0.875rem; color: var(--text-tertiary); line-height: 1.6; }
        .disclaimer {
          max-width: 600px;
          margin: 0 auto 48px;
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          text-align: center;
          line-height: 1.6;
        }
        .cta-box {
          max-width: 440px;
          margin: 0 auto;
          text-align: center;
          padding: 32px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
        }
        .cta-title { font-size: 1.125rem; font-weight: 600; margin-bottom: 6px; }
        .cta-desc { font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 20px; }
        .cta-form { display: flex; gap: 10px; }
        .cta-form .input { flex: 1; }
        .cta-done { padding: 16px 0; }
        .done-icon { display: inline-flex; width: 44px; height: 44px; border-radius: 50%; background: rgba(34,197,94,0.1); color: var(--accent-green); align-items: center; justify-content: center; font-size: 1.25rem; margin-bottom: 12px; }
        .cta-done h3 { font-size: 1rem; margin-bottom: 6px; }
        .cta-done p { color: var(--text-secondary); font-size: 0.8125rem; }
        @media (max-width: 640px) {
          .cta-form { flex-direction: column; }
        }
      `}</style>
    </section>
  );
};

export default Coaching;
