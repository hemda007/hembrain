import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

const BrainVisualization = ({ onRegionClick, interactive = false, size = 'large' }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const sizeConfig = {
    small: { width: 200, height: 200 },
    medium: { width: 350, height: 350 },
    large: { width: 500, height: 500 }
  };

  const config = sizeConfig[size];

  const regions = [
    {
      id: 'philosophy',
      name: 'Philosophy & Mental Models',
      color: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.6)',
      path: 'M250,85 C200,70 160,90 150,130 C140,170 165,195 210,195 C240,195 270,195 300,195 C345,195 365,170 355,130 C345,90 305,70 250,85',
    },
    {
      id: 'ai-data',
      name: 'AI & Data Analytics',
      color: '#00D4FF',
      glowColor: 'rgba(0, 212, 255, 0.6)',
      path: 'M95,220 C65,200 50,240 60,290 C70,340 95,380 140,395 C175,408 195,385 195,345 C195,305 175,265 150,235 C125,205 95,220 95,220',
    },
    {
      id: 'career',
      name: 'Career Navigation',
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.6)',
      path: 'M250,55 C215,35 175,50 165,75 C155,100 180,120 225,130 C270,140 310,125 320,100 C330,75 295,40 260,40 C250,40 250,55 250,55',
    },
    {
      id: 'cinema',
      name: 'Cinema & Culture',
      color: '#FF6B9D',
      glowColor: 'rgba(255, 107, 157, 0.6)',
      path: 'M405,220 C435,200 450,240 440,290 C430,340 405,380 360,395 C325,408 305,385 305,345 C305,305 325,265 350,235 C375,205 405,220 405,220',
    },
    {
      id: 'leadership',
      name: 'Leadership & Teams',
      color: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.6)',
      path: 'M200,215 C175,240 175,300 200,340 C225,380 275,380 300,340 C325,300 325,240 300,215 C275,190 225,190 200,215',
    }
  ];

  // Generate random synapse positions - memoized to prevent re-renders
  const synapses = useMemo(() =>
    [...Array(40)].map((_, i) => ({
      id: i,
      cx: 80 + Math.random() * 340,
      cy: 50 + Math.random() * 380,
      r: 1 + Math.random() * 2.5,
      color: ['#8B5CF6', '#00D4FF', '#FF6B9D', '#10B981'][i % 4],
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3
    })), []
  );

  // Generate neural connection paths - memoized
  const connections = useMemo(() => [
    { path: 'M150,180 Q200,220 250,200 Q300,180 350,220', color: '#8B5CF6' },
    { path: 'M130,280 Q180,250 230,270 Q280,290 330,260', color: '#00D4FF' },
    { path: 'M160,340 Q210,310 260,330 Q310,350 360,320', color: '#FF6B9D' },
    { path: 'M180,150 Q220,180 260,160 Q300,140 340,170', color: '#10B981' },
  ], []);

  const handleRegionClick = (region) => {
    if (interactive && onRegionClick) {
      onRegionClick(region);
    }
  };

  return (
    <div
      className="relative"
      style={{ width: config.width, height: config.height }}
    >
      {/* Ambient glow layers */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: '120%',
            height: '120%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0, 212, 255, 0.1) 30%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main SVG */}
      <svg
        viewBox="0 0 500 450"
        className="relative w-full h-full z-10"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradients for each region */}
          {regions.map((region) => (
            <radialGradient key={`grad-${region.id}`} id={`grad-${region.id}`} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor={region.color} stopOpacity="0.9" />
              <stop offset="60%" stopColor={region.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={region.color} stopOpacity="0.1" />
            </radialGradient>
          ))}

          {/* Glow filters */}
          <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-strong" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Brain outline gradient */}
          <linearGradient id="brain-outline" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF6B9D" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Brain outline shape */}
        <motion.path
          d="M250,40
             C150,40 70,100 60,200
             C50,300 80,380 150,420
             C220,460 280,460 350,420
             C420,380 450,300 440,200
             C430,100 350,40 250,40"
          fill="none"
          stroke="url(#brain-outline)"
          strokeWidth="2"
          filter="url(#glow-soft)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Inner brain structure lines */}
        <motion.g opacity={0.3}>
          <motion.path
            d="M250,80 L250,380"
            stroke="url(#brain-outline)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path
            d="M100,230 Q250,200 400,230"
            stroke="url(#brain-outline)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.7 }}
          />
        </motion.g>

        {/* Neural connection paths */}
        {connections.map((conn, i) => (
          <motion.path
            key={`conn-${i}`}
            d={conn.path}
            fill="none"
            stroke={conn.color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Brain regions */}
        {regions.map((region, index) => {
          const isHovered = hoveredRegion === region.id;

          return (
            <motion.g
              key={region.id}
              onMouseEnter={() => interactive && setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region)}
              style={{ cursor: interactive ? 'pointer' : 'default' }}
            >
              {/* Region glow on hover */}
              {isHovered && (
                <motion.path
                  d={region.path}
                  fill={region.color}
                  opacity={0.3}
                  filter="url(#glow-strong)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                />
              )}

              {/* Region shape */}
              <motion.path
                d={region.path}
                fill={`url(#grad-${region.id})`}
                stroke={region.color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                filter="url(#glow-soft)"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15,
                }}
                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
              />

              {/* Region pulse effect */}
              <motion.path
                d={region.path}
                fill="none"
                stroke={region.color}
                strokeWidth="1"
                opacity={0.5}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
              />
            </motion.g>
          );
        })}

        {/* Synapse dots */}
        {synapses.map((synapse) => (
          <motion.circle
            key={`synapse-${synapse.id}`}
            cx={synapse.cx}
            cy={synapse.cy}
            r={synapse.r}
            fill={synapse.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: synapse.duration,
              repeat: Infinity,
              delay: synapse.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Central core pulse */}
        <motion.circle
          cx="250"
          cy="250"
          r="30"
          fill="rgba(139, 92, 246, 0.2)"
          stroke="rgba(139, 92, 246, 0.5)"
          strokeWidth="1"
          filter="url(#glow-soft)"
          animate={{
            r: [30, 40, 30],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="250"
          cy="250"
          r="15"
          fill="rgba(0, 212, 255, 0.3)"
          animate={{
            r: [15, 20, 15],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Hover tooltip */}
      {hoveredRegion && interactive && (
        <motion.div
          className="absolute left-1/2 px-5 py-3 rounded-xl z-30 pointer-events-none"
          style={{
            bottom: '-70px',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 10, 26, 0.95)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${regions.find(r => r.id === hoveredRegion)?.color}`,
            boxShadow: `0 0 30px ${regions.find(r => r.id === hoveredRegion)?.glowColor}`
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-white text-sm font-medium whitespace-nowrap">
            {regions.find(r => r.id === hoveredRegion)?.name}
          </p>
          <p className="text-gray-400 text-xs mt-1">Click to explore</p>
        </motion.div>
      )}
    </div>
  );
};

export default BrainVisualization;
