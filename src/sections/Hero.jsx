import { motion } from 'framer-motion';

const Hero = ({ onEnterBrain }) => {
  const stats = [
    { value: '50+', label: 'Mental Models' },
    { value: '634', label: 'LinkedIn Posts' },
    { value: '100K+', label: 'Reactions' },
  ];

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '32px' }}
        >
          <span className="badge badge-accent">
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent-green)',
              animation: 'pulse 2s infinite'
            }} />
            Mind Interface Active
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="heading-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '24px' }}
        >
          Sync with my mind.
          <br />
          <span className="text-gradient">Explore how I think.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ maxWidth: '560px', marginBottom: '40px' }}
        >
          Navigate career decisions, data analytics, and life philosophy through
          mental models and frameworks that actually work. Built from real experience,
          not theory.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '80px' }}
        >
          <motion.button
            className="btn btn-primary"
            onClick={onEnterBrain}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore My Brain
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 8h8m-4-4l4 4-4 4" />
            </svg>
          </motion.button>
          <motion.a
            href="#scenarios"
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Scenarios
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '48px',
            paddingTop: '40px',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-tertiary)'
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
