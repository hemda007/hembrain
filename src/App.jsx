import { useState, useRef } from 'react';
import { Hero, BrainExplorer, AskMeAnything, Scenarios, Coaching, Footer } from './sections';
import { ThoughtStream, ThoughtStreamToggle } from './components';

function App() {
  const [isThoughtStreamOpen, setIsThoughtStreamOpen] = useState(false);
  const explorerRef = useRef(null);

  const scrollToExplorer = () => {
    explorerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-dark-bg/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="text-xl font-bold">
              <span className="text-soft-purple">Hem</span>
              <span className="text-electric-blue">Brain</span>
            </a>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#explorer" className="text-sm text-gray-400 hover:text-white transition-colors">
                Explorer
              </a>
              <a href="#ask" className="text-sm text-gray-400 hover:text-white transition-colors">
                Ask Me
              </a>
              <a href="#scenarios" className="text-sm text-gray-400 hover:text-white transition-colors">
                Scenarios
              </a>
              <a href="#coaching" className="text-sm text-gray-400 hover:text-white transition-colors">
                Coaching
              </a>
            </div>

            {/* CTA */}
            <button
              onClick={() => setIsThoughtStreamOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card border border-gray-700 text-sm text-gray-300 hover:border-soft-purple transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Thought Stream
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <Hero onEnterBrain={scrollToExplorer} />
        <div ref={explorerRef}>
          <BrainExplorer />
        </div>
        <AskMeAnything />
        <Scenarios />
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
