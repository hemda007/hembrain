const Hero = ({ onEnterBrain }) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Enter my mind.
            <br />
            <span className="text-gradient">Think with me.</span>
          </h1>

          <p className="hero-desc">
            Mental models, career frameworks, and life philosophy
            from real experience.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onEnterBrain}>
              Explore My Brain
            </button>
            <a href="#scenarios" className="btn btn-secondary">
              View Scenarios
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">50+</span>
              <span className="stat-label">Mental Models</span>
            </div>
            <div className="stat">
              <span className="stat-value">634</span>
              <span className="stat-label">LinkedIn Posts</span>
            </div>
            <div className="stat">
              <span className="stat-value">100K+</span>
              <span className="stat-label">Reactions</span>
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
          max-width: 600px;
        }
        .hero-title {
          font-size: clamp(2.5rem, 7vw, 3.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }
        .hero-desc {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 440px;
        }
        .hero-cta {
          display: flex;
          gap: 12px;
          margin-bottom: 80px;
        }
        .hero-stats {
          display: flex;
          gap: 48px;
        }
        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }
        @media (max-width: 640px) {
          .hero {
            padding: 100px 0 60px;
          }
          .hero-cta {
            flex-direction: column;
            margin-bottom: 60px;
          }
          .hero-stats {
            gap: 32px;
          }
          .stat-value {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
