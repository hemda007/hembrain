const Footer = () => {
  const year = new Date().getFullYear();
  const links = [
    { label: 'Explore', href: '#explorer' },
    { label: 'Ask Me', href: '#ask' },
    { label: 'Scenarios', href: '#scenarios' },
    { label: 'Coaching', href: '#coaching' },
  ];
  const socials = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/hemvad' },
    { name: 'Twitter', url: 'https://twitter.com' },
  ];

  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="#" className="foot-logo">HemBrain</a>
            <p className="foot-desc">An interactive mind interface for navigating career, analytics, and life decisions.</p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <span className="label">Navigate</span>
              <ul>{links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
            </div>
            <div className="foot-col">
              <span className="label">Connect</span>
              <ul>{socials.map((s) => <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a></li>)}</ul>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="foot-bottom">
          <p>© {year} HemBrain. Built with mental models.</p>
          <div className="foot-status"><span className="status-dot" />Mind syncing</div>
        </div>
      </div>

      <style>{`
        .foot {
          border-top: 1px solid var(--border-subtle);
          padding: 48px 0 40px;
        }
        .foot-top {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 32px;
        }
        @media (min-width: 768px) {
          .foot-top { flex-direction: row; justify-content: space-between; }
        }
        .foot-brand { max-width: 260px; }
        .foot-logo {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
          display: block;
          margin-bottom: 10px;
        }
        .foot-desc { font-size: 0.8125rem; color: var(--text-tertiary); line-height: 1.5; }
        .foot-cols { display: flex; gap: 40px; }
        .foot-col .label { display: block; margin-bottom: 12px; }
        .label { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-tertiary); }
        .foot-col ul { list-style: none; }
        .foot-col li { margin-bottom: 8px; }
        .foot-col a { font-size: 0.8125rem; color: var(--text-secondary); text-decoration: none; transition: color 0.15s; }
        .foot-col a:hover { color: var(--text-primary); }
        .divider { height: 1px; background: var(--border-subtle); margin-bottom: 24px; }
        .foot-bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
        .foot-status { display: flex; align-items: center; gap: 6px; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-green); }
      `}</style>
    </footer>
  );
};

export default Footer;
