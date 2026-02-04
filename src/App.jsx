import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero, BrainExplorer, AskMeAnything, Scenarios, Coaching, Footer } from './sections';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'explorer', label: 'Explorer' },
    { id: 'ask', label: 'Ask Me' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'coaching', label: 'Coaching' },
  ];

  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[200]"
        style={{
          background: 'linear-gradient(90deg, var(--synapse-purple), var(--neural-blue), var(--thought-pink))',
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px var(--synapse-purple)',
        }}
      />

      {/* Navigation */}
      <motion.nav
        className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="container nav-content">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ x: 2 }}
          >
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--synapse-purple), var(--neural-blue))',
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-lg">🧠</span>
            </motion.div>
            <span className="text-lg font-bold">HemBrain</span>
          </motion.a>

          {/* Desktop Links */}
          <div className="nav-links">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="nav-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className="hidden md:inline-flex btn btn-glow"
            onClick={() => scrollTo('coaching')}
            style={{ padding: '10px 20px', fontSize: '0.875rem' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.span>
              Brain Sync
            </span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            style={{
              display: 'none',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '10px',
            }}
            whileHover={{ borderColor: 'var(--synapse-purple)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M5 5l10 10M5 15L15 5" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
              style={{
                background: 'rgba(5, 5, 8, 0.95)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div className="container py-4 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-full p-4 rounded-xl text-left flex items-center gap-3 transition-colors"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: 'var(--synapse-purple)' }}
                    />
                    <span className="font-medium">{link.label}</span>
                  </motion.button>
                ))}

                <motion.button
                  onClick={() => scrollTo('coaching')}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="w-full p-4 rounded-xl text-center font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, var(--synapse-purple), var(--neural-blue))',
                  }}
                >
                  Start Brain Sync
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main>
        <Hero onEnterBrain={() => scrollTo('explorer')} />

        <motion.div
          className="divider-glow"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <BrainExplorer />

        <motion.div
          className="divider-glow"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <AskMeAnything />

        <motion.div
          className="divider-glow"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <Scenarios />

        <motion.div
          className="divider-glow"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <Coaching />
      </main>

      <Footer />

      {/* Back to top button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center z-50"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{
              y: -4,
              borderColor: 'var(--synapse-purple)',
              boxShadow: '0 10px 40px rgba(139, 92, 246, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .nav-links { display: none !important; }
          .mobile-menu-toggle { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
