import { motion } from 'framer-motion';
import BrainVisualization from '../components/BrainVisualization';

const Hero = ({ onEnterBrain }) => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 neural-bg" />

      {/* Content */}
      <div className="container relative z-10 min-h-screen flex flex-col items-center justify-center py-32">

        {/* Status badge */}
        <motion.div
          className="glass-card-sm px-5 py-2.5 flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: '#10B981' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            Mind Interface Active
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 style={{ fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px' }}>
            <span className="text-gradient-purple">Hem</span>
            <span className="text-gradient-blue">Brain</span>
          </h1>
          <motion.div
            style={{
              height: '4px',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, #8B5CF6, #00D4FF, #FF6B9D)',
              margin: '0 auto',
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '200px', opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>

        {/* Brain visualization */}
        <motion.div
          className="my-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <BrainVisualization size="large" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-center mb-10"
          style={{
            fontSize: 'clamp(18px, 3vw, 22px)',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '600px',
            lineHeight: 1.7,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Sync with my mind. Explore thoughts, frameworks, and{' '}
          <span style={{ color: '#00D4FF' }}>mental models</span> that shape how I navigate{' '}
          <span style={{ color: '#FF6B9D' }}>career</span>,{' '}
          <span style={{ color: '#8B5CF6' }}>creativity</span>, and{' '}
          <span style={{ color: '#F59E0B' }}>life</span>.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onEnterBrain}
          className="btn-primary"
          style={{ fontSize: '17px', padding: '18px 40px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Enter My Brain</span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </motion.button>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-12 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {[
            { value: '50+', label: 'Mental Models', color: '#8B5CF6' },
            { value: '5', label: 'Knowledge Domains', color: '#00D4FF' },
            { value: '∞', label: 'Connections', color: '#FF6B9D' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div style={{ fontSize: '36px', fontWeight: 700, color: stat.color, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2"
        style={{ transform: 'translateX(-50%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Scroll
          </span>
          <div
            style={{
              width: '24px',
              height: '40px',
              borderRadius: '12px',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px',
            }}
          >
            <motion.div
              style={{
                width: '4px',
                height: '10px',
                borderRadius: '2px',
                backgroundColor: '#8B5CF6',
              }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0a0a1a 0%, transparent 100%)' }}
      />
    </section>
  );
};

export default Hero;
