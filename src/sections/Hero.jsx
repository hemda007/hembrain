const Hero = ({ onEnterBrain }) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-badge">Real brain. Real frameworks. Real consequences.</span>

            <h1 className="hero-title">
              You've read my posts.
              <br />
              <span className="text-gradient">Now enter my mind.</span>
            </h1>

            <p className="hero-desc">
              634 posts only scratched the surface. Inside HemBrain, you get the
              frameworks behind the frameworks — the actual thinking patterns I use
              when facing career decisions, building businesses, and navigating life.
              Not theory. Lived experience.
            </p>

            <div className="hero-cta">
              <button className="btn btn-primary" onClick={onEnterBrain}>
                Enter My Brain
              </button>
              <a href="#scenarios" className="btn btn-secondary">
                See How It Works
              </a>
            </div>

            <p className="hero-micro">No signup needed. Just curiosity.</p>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">30+</span>
                <span className="stat-label">Years of hard-won experience</span>
              </div>
              <div className="stat">
                <span className="stat-value">50+</span>
                <span className="stat-label">Frameworks from real decisions</span>
              </div>
              <div className="stat">
                <span className="stat-value">634</span>
                <span className="stat-label">Posts distilled into this</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="brain-glow" />
            <svg viewBox="0 0 200 200" className="brain-svg">
              <defs>
                <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <filter id="brain-glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Brain outline */}
              <path
                d="M100,25
                   C65,25 40,45 35,75
                   C30,95 35,115 45,130
                   C40,140 38,155 45,168
                   C55,185 75,190 100,190
                   C125,190 145,185 155,168
                   C162,155 160,140 155,130
                   C165,115 170,95 165,75
                   C160,45 135,25 100,25"
                fill="none"
                stroke="url(#brain-gradient)"
                strokeWidth="1.5"
                filter="url(#brain-glow)"
                className="brain-outline"
              />

              {/* Brain center divide */}
              <path
                d="M100,35 C100,35 98,100 100,180"
                fill="none"
                stroke="url(#brain-gradient)"
                strokeWidth="0.5"
                opacity="0.4"
                strokeDasharray="4,4"
              />

              {/* Left hemisphere curves */}
              <path
                d="M45,80 Q60,70 75,85 Q65,100 50,105"
                fill="none"
                stroke="url(#brain-gradient)"
                strokeWidth="0.8"
                opacity="0.5"
              />
              <path
                d="M50,120 Q70,115 80,130 Q65,145 50,150"
                fill="none"
                stroke="url(#brain-gradient)"
                strokeWidth="0.8"
                opacity="0.5"
              />

              {/* Right hemisphere curves */}
              <path
                d="M155,80 Q140,70 125,85 Q135,100 150,105"
                fill="none"
                stroke="url(#brain-gradient)"
                strokeWidth="0.8"
                opacity="0.5"
              />
              <path
                d="M150,120 Q130,115 120,130 Q135,145 150,150"
                fill="none"
                stroke="url(#brain-gradient)"
                strokeWidth="0.8"
                opacity="0.5"
              />

              {/* Top curves (frontal) */}
              <path
                d="M70,45 Q85,40 100,45 Q115,40 130,45"
                fill="none"
                stroke="url(#brain-gradient)"
                strokeWidth="0.8"
                opacity="0.5"
              />

              {/* Neural dots */}
              <circle cx="60" cy="75" r="2" fill="#a855f7" opacity="0.6" className="pulse-dot" />
              <circle cx="140" cy="75" r="2" fill="#06b6d4" opacity="0.6" className="pulse-dot" />
              <circle cx="100" cy="100" r="2.5" fill="#ec4899" opacity="0.7" className="pulse-dot" />
              <circle cx="70" cy="130" r="2" fill="#10b981" opacity="0.6" className="pulse-dot" />
              <circle cx="130" cy="130" r="2" fill="#f59e0b" opacity="0.6" className="pulse-dot" />
              <circle cx="100" cy="160" r="2" fill="#a855f7" opacity="0.6" className="pulse-dot" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }
        }
        .hero-content {
          max-width: 560px;
        }
        .hero-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--accent-purple);
          margin-bottom: 24px;
          letter-spacing: 0.02em;
        }
        .hero-title {
          font-size: clamp(2.25rem, 6vw, 3.25rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .hero-desc {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .hero-cta {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .hero-micro {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          margin-bottom: 48px;
        }
        .hero-stats {
          display: flex;
          gap: 32px;
          padding-top: 32px;
          border-top: 1px solid var(--border-subtle);
        }
        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          line-height: 1.4;
        }
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .brain-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }
        .brain-svg {
          width: 100%;
          max-width: 320px;
          height: auto;
          position: relative;
          z-index: 1;
        }
        .brain-outline {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: draw-brain 2s ease forwards;
        }
        @keyframes draw-brain {
          to {
            stroke-dashoffset: 0;
          }
        }
        .pulse-dot {
          animation: pulse 3s ease-in-out infinite;
        }
        .pulse-dot:nth-child(odd) {
          animation-delay: 0.5s;
        }
        .pulse-dot:nth-child(even) {
          animation-delay: 1s;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @media (max-width: 899px) {
          .hero-visual {
            order: -1;
          }
          .brain-svg {
            max-width: 240px;
          }
          .brain-glow {
            width: 200px;
            height: 200px;
          }
        }
        @media (max-width: 640px) {
          .hero {
            padding: 100px 0 60px;
          }
          .hero-cta {
            flex-direction: column;
          }
          .hero-stats {
            flex-wrap: wrap;
            gap: 24px;
          }
          .stat {
            min-width: 140px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
