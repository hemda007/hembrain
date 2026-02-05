import { useState } from 'react';

const plans = [
  {
    id: 'free', name: 'Free', price: '$49', note: 'Beta access', isFree: true,
    features: ['Full access to HemBrain AI interface', 'Personalized daily thought streams', 'All 50+ mental models library', '5 scenario analyses per day', 'Decision framework templates', 'Community Discord access'],
    btn: 'Start Free Trial', color: 'var(--accent-cyan)'
  },
  {
    id: 'premium', name: '$99', note: 'One-time payment', popular: true,
    features: ['Everything in 7-Day AI', '30-min live video session with Hemanand', 'Unlimited scenario analyses', 'Custom framework creation', 'Career roadmap review', 'Priority response within 4 hours', 'Lifetime access to updates'],
    btn: 'Get Started', color: 'var(--accent-purple)'
  }
];

const testimonials = [
  { name: 'Priya S.', role: 'Data Analyst', quote: 'The mental models framework completely changed how I approach career decisions. Worth every penny.' },
  { name: 'Rahul M.', role: 'Product Manager', quote: 'Finally, practical advice that works in the real Indian tech industry context.' },
  { name: 'Ananya K.', role: 'Fresher', quote: 'From confused fresher to confident professional. The 7-day program was transformative.' }
];

const steps = [
  { icon: '⚡', title: 'Instant Access', desc: 'Get immediate access to the AI brain interface' },
  { icon: '🎯', title: 'Daily Insights', desc: 'Receive personalized coaching for your challenges' },
  { icon: '🚀', title: 'Transform', desc: 'Apply mental models to real decisions' }
];

const Coaching = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="coaching" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Personal Coaching</span>
          <h2 className="heading-lg section-title">Add me as your coach</h2>
          <p className="section-description">Sync my brain with yours. Get personalized guidance on career decisions, data analytics, and life frameworks.</p>
        </div>

        <div className="plans">
          {plans.map((p) => (
            <div key={p.id} className={`plan ${p.popular ? 'popular' : ''}`}>
              <div className="plan-price">
                {p.isFree ? <><span className="price-big">Free</span><span className="price-old">{p.price}</span></> : <span className="price-big">{p.name}</span>}
              </div>
              <p className="plan-note">{p.note}</p>
              <button className={`btn w-full ${p.popular ? 'btn-grad' : 'btn-secondary'}`}>{p.btn}</button>
              <div className="plan-feat">
                <span className="label">WHAT'S INCLUDED</span>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>
                      <svg width="14" height="14" fill="none" stroke={p.color} strokeWidth="2"><path d="M3 7l3 3 5-5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="trust">
          <span>🛡️ 100% Money-back Guarantee</span>
          <span>🔒 Secure Payment</span>
          <span>⚡ Instant Access</span>
        </div>

        <div className="test-section">
          <h3 className="sub-title">What others are saying</h3>
          <div className="test-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="test-card">
                <div className="test-head">
                  <div className="test-avatar">👤</div>
                  <div><p className="test-name">{t.name}</p><p className="test-role">{t.role}</p></div>
                </div>
                <p className="test-quote">"{t.quote}"</p>
                <div className="test-stars">⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>

        <div className="steps-section">
          <h3 className="sub-title">What happens after you sign up?</h3>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={s.title} className="step">
                <div className="step-icon">{s.icon}</div>
                <span className="step-num">Step {i + 1}</span>
                <h4 className="step-title">{s.title}</h4>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-box">
          {!submitted ? (
            <>
              <h3 className="cta-title">Ready to transform your decision-making?</h3>
              <p className="cta-desc">Join 500+ professionals who've upgraded their thinking.</p>
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} className="cta-form">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="input" required />
                <button type="submit" className="btn btn-primary">Get Started Free</button>
              </form>
            </>
          ) : (
            <div className="cta-done">
              <span className="done-icon">✓</span>
              <h3>You're in!</h3>
              <p>Check your email for access instructions.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .plans {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 800px;
          margin: 0 auto 40px;
        }
        @media (min-width: 768px) { .plans { grid-template-columns: repeat(2, 1fr); } }
        .plan {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 28px;
        }
        .plan.popular { border-color: var(--accent-purple); }
        .plan-price { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
        .price-big { font-size: 2.25rem; font-weight: 700; }
        .price-old { font-size: 1.125rem; color: var(--text-tertiary); text-decoration: line-through; }
        .plan-note { font-size: 0.8125rem; color: var(--text-tertiary); margin-bottom: 16px; }
        .btn-grad { background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink)); color: white; border: none; }
        .plan-feat { margin-top: 20px; }
        .plan-feat .label { display: block; margin-bottom: 12px; }
        .label { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-tertiary); }
        .plan-feat ul { list-style: none; }
        .plan-feat li { display: flex; align-items: flex-start; gap: 8px; font-size: 0.875rem; margin-bottom: 10px; line-height: 1.4; }
        .plan-feat svg { flex-shrink: 0; margin-top: 2px; }
        .trust { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; margin-bottom: 64px; font-size: 0.8125rem; color: var(--text-tertiary); }
        .test-section { margin-bottom: 64px; }
        .sub-title { font-size: 1.25rem; font-weight: 700; text-align: center; margin-bottom: 32px; }
        .test-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) { .test-grid { grid-template-columns: repeat(3, 1fr); } }
        .test-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
        }
        .test-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .test-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; font-size: 1rem; }
        .test-name { font-weight: 600; font-size: 0.875rem; }
        .test-role { font-size: 0.75rem; color: var(--text-tertiary); }
        .test-quote { font-size: 0.875rem; color: var(--text-secondary); font-style: italic; line-height: 1.5; margin-bottom: 10px; }
        .test-stars { font-size: 0.75rem; }
        .steps-section { margin-bottom: 64px; }
        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) { .steps-grid { grid-template-columns: repeat(3, 1fr); } }
        .step { text-align: center; padding: 16px; }
        .step-icon { width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; margin: 0 auto 12px; }
        .step-num { font-size: 0.6875rem; font-weight: 600; color: var(--accent-purple); text-transform: uppercase; display: block; margin-bottom: 6px; }
        .step-title { font-size: 1rem; font-weight: 600; margin-bottom: 6px; }
        .step-desc { font-size: 0.8125rem; color: var(--text-tertiary); line-height: 1.5; }
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
          .trust { flex-direction: column; align-items: center; gap: 10px; }
        }
      `}</style>
    </section>
  );
};

export default Coaching;
