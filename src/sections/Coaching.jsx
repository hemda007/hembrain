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
    <section id="coaching" className="section relative">
      <div className="absolute inset-0 neural-bg" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Personal Growth</span>
          <h2 className="section-title">
            <span style={{ color: 'white' }}>Add Me As Your </span>
            <span className="text-gradient-purple">Coach</span>
          </h2>
          <p className="section-description" style={{ margin: '0 auto' }}>
            Get personalized guidance based on mental models that actually work.
            From daily AI check-ins to live sessions.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid-2-cols" style={{ marginBottom: '80px' }}>
          {coachingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="relative p-8 rounded-2xl cursor-pointer transition-all"
              style={{
                background: 'rgba(18, 18, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${formData.selectedPlan === plan.id ? plan.color : 'rgba(255,255,255,0.08)'}`,
                boxShadow: formData.selectedPlan === plan.id ? `0 0 40px ${plan.color}20` : 'none',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -8,
                borderColor: plan.color,
                boxShadow: `0 30px 60px ${plan.color}20`,
              }}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {/* Highlighted badge */}
              {plan.highlighted && (
                <motion.div
                  className="absolute -top-4 left-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{
                    transform: 'translateX(-50%)',
                    background: `linear-gradient(135deg, ${plan.color}, #FF6B9D)`,
                    boxShadow: `0 4px 15px ${plan.color}40`,
                  }}
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  RECOMMENDED
                </motion.div>
              )}

              {/* Plan icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${plan.color}30, ${plan.color}10)`,
                  border: `1px solid ${plan.color}50`,
                }}
                whileHover={{
                  boxShadow: `0 0 30px ${plan.color}40`,
                }}
              >
                <span className="text-3xl">
                  {plan.id === 'ai-coaching' ? '🤖' : '🎯'}
                </span>
              </motion.div>

              {/* Plan details */}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p
                className="text-3xl font-bold mb-4"
                style={{ color: plan.color }}
              >
                {plan.price}
              </p>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">{plan.description}</p>

              {/* Features list */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
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
                  </motion.li>
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
                    transition={{ type: 'spring' }}
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
            <div
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(18, 18, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h3>
                  <p className="text-gray-400 text-sm">Be the first to know when coaching launches.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-premium"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-premium"
                    required
                  />
                </div>

                <textarea
                  placeholder="What's your main goal? What challenge are you facing?"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="input-premium h-28 resize-none"
                  required
                />

                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #00D4FF 100%)',
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join Waitlist
                </motion.button>
              </form>
            </div>
          ) : (
            <motion.div
              className="text-center py-12 rounded-2xl"
              style={{
                background: 'rgba(18, 18, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10B981',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <svg className="w-10 h-10" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
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
