import { motion } from 'framer-motion';
import { useState } from 'react';

const coachingPlans = [
  {
    id: '7-days',
    name: '7 Days',
    duration: '1 Week',
    price: '$49',
    description: 'Quick brain sync for a specific challenge',
    features: [
      'Daily thought streams tailored to you',
      'Access to all mental models',
      '3 personalized scenario analyses',
      'Email support during your week',
      'Decision-making frameworks'
    ],
    color: 'var(--accent-cyan)'
  },
  {
    id: '14-days',
    name: '14 Days',
    duration: '2 Weeks',
    price: '$89',
    description: 'Deep dive into my thinking patterns and frameworks',
    features: [
      'Everything in 7 Days',
      'Unlimited scenario analyses',
      '1-on-1 async coaching session',
      'Custom framework creation',
      'Career roadmap review',
      'Priority response time'
    ],
    popular: true,
    color: 'var(--accent-purple)'
  }
];

const Coaching = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', challenge: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="coaching" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Personal Coaching
          </motion.span>
          <motion.h2
            className="heading-lg section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Add me as your coach
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Sync my brain with yours. Get personalized guidance on career decisions,
            data analytics, and life frameworks.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid-2" style={{ maxWidth: '800px', margin: '0 auto 60px' }}>
          {coachingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{
                border: plan.popular
                  ? `1px solid ${plan.color}`
                  : '1px solid var(--border-subtle)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setSelectedPlan(plan)}
              whileHover={{ y: -4, borderColor: plan.color }}
            >
              {plan.popular && (
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '24px',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: plan.color,
                  color: 'white',
                  borderRadius: '100px'
                }}>
                  Most Popular
                </span>
              )}

              {/* Duration Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: `${plan.color}15`,
                borderRadius: '100px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: plan.color
                }} />
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: plan.color
                }}>
                  {plan.duration}
                </span>
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                {plan.name}
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '700' }}>{plan.price}</span>
              </div>

              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                {plan.description}
              </p>

              <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '10px'
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke={plan.color}
                      strokeWidth="2"
                      style={{ marginTop: '2px', flexShrink: 0 }}
                    >
                      <path d="M4 8l3 3 5-6" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  marginTop: 'auto',
                  background: plan.popular ? plan.color : undefined
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start {plan.name} Coaching
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '700px',
            margin: '0 auto 60px',
            padding: '40px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            How Brain Coaching Works
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            {[
              { step: '01', title: 'Share your challenge', desc: 'Tell me what decision you\'re facing' },
              { step: '02', title: 'Receive frameworks', desc: 'Get mental models tailored to your situation' },
              { step: '03', title: 'Navigate with clarity', desc: 'Make decisions backed by proven patterns' }
            ].map((item) => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: 'var(--accent-purple)',
                  marginBottom: '12px'
                }}>
                  {item.step}
                </div>
                <div style={{
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: '1.5'
                }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          {!isSubmitted ? (
            <>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Ready to sync?
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '24px'
              }}>
                Tell me your challenge and let's get started.
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="input"
                  required
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="input"
                  required
                />
                <textarea
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="What decision are you facing? (optional)"
                  className="input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                />
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <svg width="24" height="24" fill="none" stroke="var(--accent-green)" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px' }}>
                Brain sync initiated
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                I'll reach out within 24 hours to start your coaching journey.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          .grid-2 > div {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Coaching;
