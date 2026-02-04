import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      url: 'https://twitter.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  const navLinks = [
    { name: 'Explorer', href: '#explorer' },
    { name: 'Ask Me', href: '#ask' },
    { name: 'Scenarios', href: '#scenarios' },
    { name: 'Coaching', href: '#coaching' },
  ];

  return (
    <footer
      className="relative py-20 px-6"
      style={{
        borderTop: '1px solid rgba(139, 92, 246, 0.1)',
      }}
    >
      <div className="absolute inset-0 neural-bg opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.h3
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-gradient-purple">Hem</span>
              <span className="text-gradient-blue">Brain</span>
            </motion.h3>
            <p className="text-gray-400 text-sm mb-8 max-w-sm leading-relaxed">
              An interactive mind interface where thoughts, frameworks, and mental models
              come together to help you navigate life's decisions.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 transition-all"
                  style={{
                    background: 'rgba(18, 18, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    borderColor: '#8B5CF6',
                    color: '#fff',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">Explore</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 text-sm transition-colors"
                    whileHover={{ color: '#00D4FF', x: 3 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">About</h4>
            <ul className="space-y-3">
              {['About This Project', 'How It Works', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="text-gray-400 text-sm transition-colors"
                    whileHover={{ color: '#00D4FF', x: 3 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gradient mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} HemBrain. Built with thoughts and frameworks.
          </p>

          {/* Sync status */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <motion.div
              className="flex items-center gap-1.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00D4FF' }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8B5CF6' }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF6B9D' }} />
            </motion.div>
            <span>Brain syncing continuously</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
