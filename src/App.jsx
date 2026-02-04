import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero, BrainExplorer, AskMeAnything, Scenarios, Coaching, Footer } from './sections';
import { ThoughtStream, ThoughtStreamToggle } from './components';

function App() {
  const [isThoughtStreamOpen, setIsThoughtStreamOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const explorerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToExplorer = () => {
    explorerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#explorer', label: 'Explorer' },
    { href: '#ask', label: 'Ask Me' },
    { href: '#scenarios', label: 'Scenarios' },
    { href: '#coaching', label: 'Coaching' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a1a' }}>
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(10, 10, 26, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(139, 92, 246, 0.1)' : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-2xl font-bold flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-gradient-purple">Hem</span>
              <span className="text-gradient-blue">Brain</span>
            </motion.a>

            {/* Desktop Nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                onClick={() => setIsThoughtStreamOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-300 transition-all"
                style={{
                  background: 'rgba(18, 18, 42, 0.6)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                }}
                whileHover={{
                  borderColor: 'rgba(139, 92, 246, 0.6)',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)',
                }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#10B981' }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Thought Stream</span>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden"
              style={{
                backgroundColor: 'rgba(10, 10, 26, 0.98)',
                borderTop: '1px solid rgba(139, 92, 246, 0.1)',
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-6 py-4 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  onClick={() => {
                    setIsThoughtStreamOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-gray-300 mt-4"
                  style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Thought Stream</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main content */}
      <main>
        <Hero onEnterBrain={scrollToExplorer} />

        {/* Section divider */}
        <div className="divider" />

        <div ref={explorerRef}>
          <BrainExplorer />
        </div>

        <div className="divider" />

        <AskMeAnything />

        <div className="divider" />

        <Scenarios />

        <div className="divider" />

        <Coaching />

        <Footer />
      </main>

      {/* Thought Stream Sidebar */}
      <ThoughtStream
        isOpen={isThoughtStreamOpen}
        onClose={() => setIsThoughtStreamOpen(false)}
      />

      {/* Floating toggle button (visible when sidebar is closed) */}
      {!isThoughtStreamOpen && (
        <ThoughtStreamToggle
          onClick={() => setIsThoughtStreamOpen(true)}
          hasNew={false}
        />
      )}
    </div>
  );
}

export default App;
