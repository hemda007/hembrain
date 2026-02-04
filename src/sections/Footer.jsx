import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Explorer', href: '#explorer' },
    { label: 'Ask Me', href: '#ask' },
    { label: 'Scenarios', href: '#scenarios' },
    { label: 'Coaching', href: '#coaching' },
  ];

  const socials = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/hemvad',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@codebasics',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative border-t border-white/5">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 80% at 50% 100%, rgba(139, 92, 246, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.a
              href="#"
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ x: 2 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--synapse-purple), var(--neural-blue))',
                }}
              >
                <span className="text-xl">🧠</span>
              </div>
              <span className="text-xl font-bold">HemBrain</span>
            </motion.a>

            <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-6">
              An interactive mind interface for navigating career, analytics, and life decisions through battle-tested mental models.
            </p>

            {/* Newsletter signup hint */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-mono text-gray-400">BRAIN_STATUS.active</span>
              </div>
              <p className="text-xs text-gray-500">
                634+ posts synced. New frameworks loading...
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 4 }}
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors"
                    />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                  }}
                  whileHover={{
                    y: -4,
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.1)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <p className="text-xs text-gray-500">
              DM me on LinkedIn for collaboration ideas.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-glow my-10" />

        {/* Bottom */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} HemBrain. Built with mental models and frameworks.
          </p>

          <div className="flex items-center gap-6">
            {/* Keyboard shortcuts hint */}
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-600">
              <kbd className="px-2 py-1 rounded bg-white/5 text-gray-500 font-mono">?</kbd>
              <span>for shortcuts</span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--insight-green)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-mono text-gray-500">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
