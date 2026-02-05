export const coachingPlans = [
  {
    id: 'quick-sync',
    name: 'Quick Sync',
    subtitle: 'One focused week for one specific challenge',
    price: '$49',
    description: 'When you need clarity, not a long-term commitment.',
    features: [
      'Focused on one specific decision or challenge',
      'Frameworks mapped to YOUR situation',
      'Async responses within 24 hours',
      'Clarity by end of week'
    ],
    cta: 'Start Quick Sync',
    highlighted: false,
    color: '#00D4FF'
  },
  {
    id: 'deep-sync',
    name: 'Deep Sync',
    subtitle: 'Two weeks of sustained thinking partnership',
    price: '$89',
    description: 'For decisions that deserve more than a gut feeling.',
    features: [
      'Everything in Quick Sync',
      'Deeper context and follow-ups',
      'Multiple interconnected challenges',
      'Custom action plan',
      'Priority response time'
    ],
    cta: 'Start Deep Sync',
    highlighted: true,
    color: '#8B5CF6'
  }
];

export default coachingPlans;
