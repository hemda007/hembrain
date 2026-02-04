import { motion } from 'framer-motion';
import { useState } from 'react';
import { coachingPlans } from '../data';

const Coaching = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: '',
    selectedPlan: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.goal) {
      setIsSubmitted(true);
    }
  };

  const handlePlanSelect = (planId) => {
    setFormData((prev) => ({ ...prev, selectedPlan: planId }));
  };

  return (
    <section id="coaching" className="min-h-screen py-20 px-4 relative">
      <div className="absolute inset-0 neural-bg opacity-30" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Add Me As Your </span>
            <span className="text-glow-purple text-soft-purple">Coach</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Get personalized guidance based on mental models that actually work.
            From daily AI check-ins to live sessions.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {coachingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative p-8 rounded-2xl transition-all cursor-pointer ${
                formData.selectedPlan === plan.id
                  ? 'ring-2'
                  : ''
              }`}
              style={{
                backgroundColor: 'rgba(26, 26, 58, 0.6)',
                border: `1px solid ${formData.selectedPlan === plan.id ? plan.color : 'rgba(255,255,255,0.1)'}`,
                ringColor: plan.color,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -5,
                borderColor: plan.color,
                boxShadow: `0 20px 40px ${plan.color}20`,
              }}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {/* Highlighted badge */}
              {plan.highlighted && (
                <motion.div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${plan.color}, #FF6B9D)`,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  RECOMMENDED
                </motion.div>
              )}

              {/* Plan icon */}
              <div
                className="w-16 h-16 rounded-full mb-6 flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${plan.color}30, transparent)`,
                  border: `2px solid ${plan.color}`,
                }}
              >
                <span className="text-2xl">
                  {plan.id === 'ai-coaching' ? '🤖' : '🎯'}
                </span>
              </div>

              {/* Plan details */}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p
                className="text-2xl font-bold mb-4"
                style={{ color: plan.color }}
              >
                {plan.price}
              </p>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <svg
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: plan.color }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Select indicator */}
              <div
                className="w-6 h-6 rounded-full border-2 absolute top-6 right-6 flex items-center justify-center"
                style={{ borderColor: plan.color }}
              >
                {formData.selectedPlan === plan.id && (
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: plan.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signup form */}
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Join the Waitlist</h3>
                <p className="text-gray-400 text-sm">Be the first to know when coaching launches.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-dark-bg border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-soft-purple transition-colors"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-dark-bg border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-soft-purple transition-colors"
                  required
                />
              </div>

              <textarea
                placeholder="What's your main goal? What challenge are you facing?"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full h-24 bg-dark-bg border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-soft-purple transition-colors resize-none"
                required
              />

              <motion.button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-soft-purple to-electric-blue"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Waitlist
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="text-center py-8 bg-dark-card rounded-2xl border border-green-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
              <p className="text-gray-400">
                Thanks, {formData.name}! You'll be notified when coaching launches.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Coaching;
