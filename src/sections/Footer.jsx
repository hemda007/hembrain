const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '60px 0'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {/* Top */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '40px'
          }}>
            {/* Brand */}
            <div>
              <a href="#" style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                marginBottom: '12px',
                display: 'block'
              }}>
                HemBrain
              </a>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-tertiary)',
                maxWidth: '280px',
                lineHeight: '1.6'
              }}>
                An interactive mind interface for navigating career, analytics, and life decisions.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '48px' }}>
              <div>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-tertiary)',
                  marginBottom: '16px'
                }}>
                  Navigate
                </h4>
                <ul style={{ listStyle: 'none' }}>
                  {links.map((link) => (
                    <li key={link.label} style={{ marginBottom: '10px' }}>
                      <a
                        href={link.href}
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-tertiary)',
                  marginBottom: '16px'
                }}>
                  Connect
                </h4>
                <ul style={{ listStyle: 'none' }}>
                  {socials.map((social) => (
                    <li key={social.name} style={{ marginBottom: '10px' }}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                      >
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider" />

          {/* Bottom */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}>
            <p style={{
              fontSize: '0.8125rem',
              color: 'var(--text-tertiary)'
            }}>
              © {currentYear} HemBrain. Built with mental models.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8125rem',
              color: 'var(--text-tertiary)'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-green)'
              }} />
              Mind syncing
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
