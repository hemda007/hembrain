const Hero = ({ onEnterBrain }) => {
  const stats = [
    { value: '50+', label: 'Mental Models' },
    { value: '634', label: 'LinkedIn Posts' },
    { value: '100K+', label: 'Reactions' },
  ];

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <span className="badge badge-accent">
            <span className="badge-dot" />
            Mind Interface Active
          </span>

          <h1 className="heading-xl">
            Sync with my mind.
            <br />
            <span className="text-gradient">Explore how I think.</span>
          </h1>

          <p className="hero-desc text-muted">
            Navigate career decisions, data analytics, and life philosophy through
            mental models and frameworks that actually work. Built from real experience,
            not theory.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onEnterBrain}>
              Explore My Brain
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 8h8m-4-4l4 4-4 4" />
              </svg>
            </button>
            <a href="#scenarios" className="btn btn-secondary">
              View Scenarios
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          padding-bottom: 40px;
        }
        .hero-inner {
          max-width: 720px;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-green);
        }
        .hero .badge {
          margin-bottom: 24px;
        }
        .hero .heading-xl {
          margin-bottom: 20px;
        }
        .hero-desc {
          font-size: 1.0625rem;
          line-height: 1.7;
          max-width: 540px;
          margin-bottom: 32px;
        }
        .hero-cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 64px;
        }
        .hero-stats {
          display: flex;
          gap: 40px;
          padding-top: 32px;
          border-top: 1px solid var(--border-subtle);
        }
        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }
        @media (max-width: 640px) {
          .hero-stats {
            gap: 32px;
          }
          .stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
