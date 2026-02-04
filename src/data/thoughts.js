export const thoughts = [
  {
    id: 1,
    content: "Just processed: Why most career advice fails...",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
    type: "insight"
  },
  {
    id: 2,
    content: "New mental model added: The 80/20 of learning",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 min ago
    type: "model"
  },
  {
    id: 3,
    content: "Connecting: Stoicism × Modern productivity systems",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    type: "connection"
  },
  {
    id: 4,
    content: "Analyzing: The hidden cost of 'keeping options open'",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    type: "analysis"
  },
  {
    id: 5,
    content: "Pattern detected: Why smart people make dumb career moves",
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hours ago
    type: "pattern"
  }
];

export const getRelativeTime = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

export default thoughts;
