import { useState, useEffect } from 'react';
import { Hero, BrainExplorer, AskMeAnything, Scenarios, Coaching, Footer } from './sections';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
          <a href="#" className="nav-logo">HemBrain</a>

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
          <button
            className="btn btn-primary nav-cta"
            onClick={() => scrollTo('coaching')}
            style={{ padding: '10px 20px', fontSize: '0.875rem' }}
          >
            Get Coaching
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
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
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="mobile-menu-link"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
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
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px;
        }
        .mobile-menu {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          padding: 16px 24px;
        }
        .mobile-menu-link {
          display: block;
          width: 100%;
          padding: 12px 0;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1rem;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
        }
        @media (max-width: 767px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .mobile-menu-toggle { display: block !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
