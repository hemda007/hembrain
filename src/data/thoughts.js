export const thoughts = [
  {
    id: 1,
    content: "The best career advice is always uncomfortable. If it feels reassuring, it's probably wrong.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: "insight",
    engagement: "2.1K",
    region: "career"
  },
  {
    id: 2,
    content: "I fired someone I liked yesterday. Not because they were bad. Because the role outgrew them. That's the part leadership books skip.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    type: "story",
    engagement: "4.7K",
    region: "leadership"
  },
  {
    id: 3,
    content: "Your 'dream job' is usually someone else's LinkedIn post that you reverse-engineered into a life goal.",
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    type: "hot-take",
    engagement: "8.3K",
    region: "philosophy"
  },
  {
    id: 4,
    content: "Data literacy isn't about SQL. It's about knowing which question to ask before you open the spreadsheet.",
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    type: "insight",
    engagement: "11.1K",
    region: "data-analytics"
  },
  {
    id: 5,
    content: "Unpopular opinion: work-life balance is a luxury belief. What you actually need is work-life alignment.",
    timestamp: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    type: "hot-take",
    engagement: "25.9K",
    region: "work-culture"
  },
  {
    id: 6,
    content: "I used to think I needed a mentor. Spent years looking for one. Never found the perfect fit. Then I realized: the best mentorship is distributed. Stop looking for one guru. Start collecting fragments from everyone.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    type: "framework",
    engagement: "847",
    region: "career"
  },
  {
    id: 7,
    content: "Someone sends me: 'Should I take this job offer?' I need 40 minutes of context. They need 40 seconds of answer. That's not advice — that's a coin flip with extra steps.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    type: "processing",
    engagement: "1.2K",
    region: "philosophy"
  },
  {
    id: 8,
    content: "65% of our talents are freshers or people with career breaks. They're our top performers. Stop underestimating potential.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    type: "insight",
    engagement: "31.8K",
    region: "career"
  },
  {
    id: 9,
    content: "Never took funding. Never ran fake discounts. Never had forceful sales teams. Just ensured highest quality, kept 80% free, made rest affordable. Still profitable.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    type: "framework",
    engagement: "5.4K",
    region: "leadership"
  },
  {
    id: 10,
    content: "First job in India: Couldn't leave before 7pm even with no work. First job in Germany: Got warning for staying late — 'Are you not able to focus?' Culture shapes everything.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    type: "story",
    engagement: "25.9K",
    region: "work-culture"
  },
  {
    id: 11,
    content: "2016: Jobless for 9 months. 2017: Multiple offers. The difference? I stopped following the crowd and built visible proof of my skills.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    type: "story",
    engagement: "3.7K",
    region: "career"
  },
  {
    id: 12,
    content: "You die twice. First — when your mortal remains are gone. Second — the last time someone says your name. Build a legacy that outlives you.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    type: "philosophy",
    engagement: "5.5K",
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
