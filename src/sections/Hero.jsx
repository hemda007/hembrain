const Hero = ({ onEnterBrain }) => {
  return (
    <section className="hero">
      <div className="container">
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
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
        }
        .hero-content {
          max-width: 640px;
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
          margin-bottom: 64px;
        }
        .hero-stats {
          display: flex;
          gap: 40px;
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
