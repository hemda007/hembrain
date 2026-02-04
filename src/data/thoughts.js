export const thoughts = [
  {
    id: 1,
    content: "Focus hours > Show hours. Late hours at work means poor focus, not dedication.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: "insight",
    engagement: "25.9K",
    region: "work-culture"
  },
  {
    id: 2,
    content: "65% of our talents are freshers or people with career breaks. They're our top performers.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    type: "insight",
    engagement: "31.8K",
    region: "career"
  },
  {
    id: 3,
    content: "Excel is still the gateway to modern analytics. Don't underestimate the fundamentals.",
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    type: "model",
    engagement: "11.1K",
    region: "data-analytics"
  },
  {
    id: 4,
    content: "Data analysts are not report senders. We are trusted partners of business stakeholders.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    type: "insight",
    engagement: "7.1K",
    region: "data-analytics"
  },
  {
    id: 5,
    content: "You die twice. First when your mortal remains are gone. Second - the last time someone says your name.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    type: "philosophy",
    engagement: "5.5K",
    region: "philosophy"
  },
  {
    id: 6,
    content: "Never took funding. Never ran fake discounts. Just ensured quality. Still profitable.",
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    type: "model",
    engagement: "5.4K",
    region: "leadership"
  },
  {
    id: 7,
    content: "2016: Jobless for 9 months. 2017: Multiple offers. I stopped following the crowd.",
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    type: "story",
    engagement: "3.7K",
    region: "career"
  },
  {
    id: 8,
    content: "Formal education is not the differentiator anymore. Learn, unlearn, relearn - everyday.",
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    type: "insight",
    engagement: "2.4K",
    region: "philosophy"
  },
  {
    id: 9,
    content: "If I marry Data Analytics: Excel is the eldest family member, SQL is the key member, Power BI is the close friend.",
    timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    type: "analogy",
    engagement: "3K",
    region: "data-analytics"
  },
  {
    id: 10,
    content: "Toxic managers who enjoy control by making people work long hours - they are the real cancer.",
    timestamp: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    type: "insight",
    engagement: "25.9K",
    region: "work-culture"
  },
  {
    id: 11,
    content: "No timesheet. No tracker. No one brags about working late. Everyone cares only about focus hours.",
    timestamp: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
    type: "model",
    engagement: "25.9K",
    region: "work-culture"
  },
  {
    id: 12,
    content: "Before sending a report: List sources, mention refresh time, specify currencies, explain formulas.",
    timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    type: "checklist",
    engagement: "7.1K",
    region: "data-analytics"
  },
  {
    id: 13,
    content: "The 'masterclass' culture exploits aspirants with false promises. Quality over quick money.",
    timestamp: new Date(Date.now() - 1000 * 60 * 660).toISOString(),
    type: "insight",
    engagement: "2.4K",
    region: "leadership"
  },
  {
    id: 14,
    content: "5 qualities I look for: Attitude to learn, proof of work, clear communication, continuous learning, recent activity.",
    timestamp: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    type: "framework",
    engagement: "31.8K",
    region: "career"
  },
  {
    id: 15,
    content: "Recession is part of a cycle. When everyone says 'no jobs', identify gaps and work on them.",
    timestamp: new Date(Date.now() - 1000 * 60 * 780).toISOString(),
    type: "philosophy",
    engagement: "3.7K",
    region: "philosophy"
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
