import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const coachingPlans = [
  {
    id: '7-day-ai',
    name: '7-Day AI Coaching',
    duration: '1 Week',
    icon: '🤖',
    price: 'Free',
    originalPrice: '$49',
    priceNote: 'Beta access',
    badge: 'Free Beta',
    description: 'AI-powered brain sync for quick decision clarity',
    features: [
      'Full access to HemBrain AI interface',
      'Personalized daily thought streams',
      'All 50+ mental models library',
      '5 scenario analyses per day',
      'Decision framework templates',
      'Community Discord access',
    ],
    cta: 'Start Free Trial',
    color: '#06b6d4',
  },
  {
    id: '10-day-live',
    name: '10-Day + Live Session',
    duration: '2 Weeks',
    icon: '🧠',
    price: '$99',
    priceNote: 'One-time payment',
    badge: 'Best Value',
    description: 'Deep dive with 1-on-1 coaching from Hemanand',
    features: [
      'Everything in 7-Day AI',
      '30-min live video session with Hemanand',
      'Unlimited scenario analyses',
      'Custom framework creation',
      'Career roadmap review',
      'Priority response within 4 hours',
      'Lifetime access to updates',
    ],
    cta: 'Get Started',
    color: '#8B5CF6',
    popular: true,
  },
];

// Trust badges component
const TrustBadges = () => {
  const badges = [
    { icon: '🛡️', text: '100% Money-back Guarantee' },
    { icon: '🔒', text: 'Secure Payment' },
    { icon: '⚡', text: 'Instant Access' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mb-12">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.text}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i }}
          className="flex items-center gap-2 text-sm text-gray-400"
        >
          <span>{badge.icon}</span>
          <span>{badge.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Live counter component
const LiveCounter = () => {
  const [count] = useState(Math.floor(Math.random() * 20) + 15);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-3 mb-12"
    >
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-sm font-mono">
          <span className="text-purple-400 font-semibold">{count}</span>
          <span className="text-gray-400"> minds exploring right now</span>
        </span>
      </div>
    </motion.div>
  );
};

// Pricing card component
const PricingCard = ({ plan, index, isPopular }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
            Most Popular
          </span>
        </motion.div>
      )}

      <motion.div
        className="h-full rounded-2xl transition-all duration-500"
        style={{
          background: isPopular
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))'
            : 'var(--bg-card)',
          border: isPopular
            ? '1px solid rgba(139, 92, 246, 0.3)'
            : '1px solid var(--border-subtle)',
          boxShadow: isHovered
            ? isPopular
              ? '0 20px 60px rgba(139, 92, 246, 0.2)'
              : '0 20px 40px rgba(0, 0, 0, 0.3)'
            : 'none',
        }}
        whileHover={{ y: -8 }}
      >
        <div className="p-8">
          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}05)`,
              border: `1px solid ${plan.color}30`,
            }}
            animate={isHovered ? { scale: 1.05, rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl">{plan.icon}</span>
          </motion.div>

          {/* Title & Badge */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold">{plan.name}</h3>
            {plan.badge && (
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: `${plan.color}15`,
                  color: plan.color,
                }}
              >
                {plan.badge}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.originalPrice && (
                <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
              )}
            </div>
            {plan.priceNote && (
              <p className="text-xs text-gray-500 mt-1">{plan.priceNote}</p>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            className={`w-full py-4 rounded-xl font-semibold transition-all ${
              isPopular
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {plan.cta}
          </motion.button>

          {/* Features */}
          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
              What's included
            </p>
            <ul className="space-y-3">
              {plan.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: `${plan.color}15`,
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={plan.color}
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Testimonial carousel item
const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="p-6 rounded-2xl"
    style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
    }}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
        <span className="text-xl">{testimonial.avatar}</span>
      </div>
      <div>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-xs text-gray-500">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-sm text-gray-400 leading-relaxed italic">"{testimonial.quote}"</p>
    <div className="flex items-center gap-1 mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  </motion.div>
);

const Coaching = () => {
  const testimonials = [
    {
      name: 'Priya S.',
      role: 'Data Analyst',
      avatar: '👩‍💼',
      quote: 'The mental models framework completely changed how I approach career decisions. Worth every penny.',
    },
    {
      name: 'Rahul M.',
      role: 'Product Manager',
      avatar: '👨‍💻',
      quote: 'Finally, practical advice that works in the real Indian tech industry context.',
    },
    {
      name: 'Ananya K.',
      role: 'Fresher',
      avatar: '👩‍🎓',
      quote: 'From confused fresher to confident professional. The 7-day program was transformative.',
    },
  ];

  return (
    <section id="coaching" className="section relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 40% 40% at 20% 100%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 40% 40% at 80% 100%, rgba(59, 130, 246, 0.06) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="section-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="status-dot status-dot-glow" />
            Brain Sync
          </motion.span>
          <motion.h2
            className="heading-lg section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Sync with my <span className="text-gradient">brain</span>
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Get personalized coaching and access to my complete mental model library.
            Transform your decision-making in just days.
          </motion.p>
        </div>

        {/* Live Counter */}
        <LiveCounter />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {coachingPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              isPopular={plan.popular}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-center text-lg font-semibold mb-8">
            What others are saying
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl text-center"
          style={{
            background: 'rgba(10, 10, 15, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <h3 className="text-xl font-bold mb-6">What happens after you sign up?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Instant Access',
                description: 'Get immediate access to the AI brain interface and starter frameworks',
                icon: '⚡',
              },
              {
                step: '2',
                title: 'Daily Insights',
                description: 'Receive personalized coaching based on your specific goals',
                icon: '🎯',
              },
              {
                step: '3',
                title: 'Transform',
                description: 'Apply mental models to real decisions and see the difference',
                icon: '🚀',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <p className="text-xs text-purple-400 font-semibold mb-2">Step {item.step}</p>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Coaching;
