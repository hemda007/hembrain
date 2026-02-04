import { motion } from 'framer-motion';
import { useState } from 'react';

const plans = [
  {
    id: 'free',
    name: 'Free Access',
    price: '$0',
    period: 'forever',
    description: 'Explore the brain and access public content',
    features: [
      'Browse all knowledge domains',
      'Access public mental models',
      'Read top insights',
      'Basic scenario frameworks'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Access',
    price: '$29',
    period: '/month',
    description: 'Full access to AI coaching and deep dives',
    features: [
      'Everything in Free',
      'AI chat with my brain',
      'Full scenario deep dives',
      'Weekly thought streams',
      'Priority support'
    ],
    popular: true
  }
];

const Coaching = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
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
            Coaching
          </motion.span>
          <motion.h2
            className="heading-lg section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get personalized guidance
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Access deeper insights and AI-powered coaching based on my frameworks.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid-2" style={{ maxWidth: '800px', margin: '0 auto 80px' }}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{
                border: plan.popular ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                position: 'relative'
              }}
            >
              {plan.popular && (
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '24px',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: 'var(--accent-purple)',
                  color: 'white',
                  borderRadius: '100px'
                }}>
                  Popular
                </span>
              )}

              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {plan.name}
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '2rem', fontWeight: '700' }}>{plan.price}</span>
                <span style={{ color: 'var(--text-tertiary)', marginLeft: '4px' }}>{plan.period}</span>
              </div>

              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '24px'
              }}>
                {plan.description}
              </p>

              <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '10px'
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="var(--accent-green)" strokeWidth="2">
                      <path d="M4 8l3 3 5-6" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ marginTop: 'auto' }}
              >
                {plan.popular ? 'Get Started' : 'Start Free'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Waitlist */}
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
                Join the waitlist
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '24px'
              }}>
                Get early access when AI coaching launches.
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input"
                  style={{ flex: 1 }}
                />
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join
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
                You're on the list
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                We'll notify you when AI coaching launches.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Coaching;
