import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero, BrainExplorer, AskMeAnything, Scenarios, Coaching, Footer } from './sections';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'explorer', label: 'Explore' },
    { id: 'ask', label: 'Ask Me' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'coaching', label: 'Coaching' },
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="container nav-content">
          <a href="#" className="nav-logo">
            HemBrain
          </a>

          {/* Desktop Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className="btn btn-primary"
            onClick={() => scrollTo('coaching')}
            style={{ padding: '10px 20px', fontSize: '0.875rem' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Coaching
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '8px',
            }}
            className="mobile-menu-toggle"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-subtle)',
                padding: '16px 24px',
              }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px 0',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>
        <Hero onEnterBrain={() => scrollTo('explorer')} />
        <div className="divider-gradient" />
        <BrainExplorer />
        <div className="divider-gradient" />
        <AskMeAnything />
        <div className="divider-gradient" />
        <Scenarios />
        <div className="divider-gradient" />
        <Coaching />
      </main>

      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .nav-links { display: none !important; }
          .btn-primary { display: none !important; }
          .mobile-menu-toggle { display: block !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
