import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

const BrainVisualization = ({ onRegionClick, interactive = false, size = 'large' }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const sizeConfig = {
    small: { width: 200, height: 200 },
    medium: { width: 350, height: 350 },
    large: { width: 500, height: 500 },
  };

  const config = sizeConfig[size];

  const regions = [
    {
      id: 'work-culture',
      name: 'Work Culture',
      color: '#8B5CF6',
      path: 'M250,85 C200,70 160,90 150,130 C140,170 165,195 210,195 C240,195 270,195 300,195 C345,195 365,170 355,130 C345,90 305,70 250,85',
    },
    {
      id: 'data-analytics',
      name: 'Data & Analytics',
      color: '#00D4FF',
      path: 'M95,220 C65,200 50,240 60,290 C70,340 95,380 140,395 C175,408 195,385 195,345 C195,305 175,265 150,235 C125,205 95,220 95,220',
    },
    {
      id: 'career',
      name: 'Career Navigation',
      color: '#10B981',
      path: 'M250,55 C215,35 175,50 165,75 C155,100 180,120 225,130 C270,140 310,125 320,100 C330,75 295,40 260,40 C250,40 250,55 250,55',
    },
    {
      id: 'philosophy',
      name: 'Life Philosophy',
      color: '#FF6B9D',
      path: 'M405,220 C435,200 450,240 440,290 C430,340 405,380 360,395 C325,408 305,385 305,345 C305,305 325,265 350,235 C375,205 405,220 405,220',
    },
    {
      id: 'leadership',
      name: 'Leadership & Business',
      color: '#F59E0B',
      path: 'M200,215 C175,240 175,300 200,340 C225,380 275,380 300,340 C325,300 325,240 300,215 C275,190 225,190 200,215',
    },
  ];

  // Fewer synapse dots - only 15 instead of 50
  const synapses = useMemo(
    () =>
      [...Array(15)].map((_, i) => ({
        id: i,
        cx: 70 + Math.random() * 360,
        cy: 40 + Math.random() * 400,
        r: 1 + Math.random() * 1.5,
        color: ['#8B5CF6', '#00D4FF', '#FF6B9D', '#10B981', '#F59E0B'][i % 5],
      })),
    []
  );

  const handleRegionClick = (region) => {
    if (interactive && onRegionClick) {
      onRegionClick(region);
    }
  };

  return (
    <div
      className="relative select-none"
      style={{
        width: config.width,
        height: config.height,
      }}
    >
      {/* Simple ambient glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Main SVG */}
      <svg
        viewBox="0 0 500 500"
        className="relative w-full h-full z-10"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradients for each region */}
          {regions.map((region) => (
            <radialGradient
              key={`grad-${region.id}`}
              id={`grad-${region.id}`}
              cx="50%"
              cy="30%"
              r="70%"
            >
              <stop offset="0%" stopColor={region.color} stopOpacity="0.9" />
              <stop offset="60%" stopColor={region.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={region.color} stopOpacity="0.1" />
            </radialGradient>
          ))}

          {/* Simple glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
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

        {/* Brain outline */}
        <motion.path
          d="M250,40
             C150,40 70,100 60,200
             C50,300 80,380 150,420
             C220,460 280,460 350,420
             C420,380 450,300 440,200
             C430,100 350,40 250,40"
          fill="none"
          stroke="url(#brain-outline)"
          strokeWidth="1.5"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Inner structure lines */}
        <g opacity={0.15}>
          <path
            d="M250,60 L250,420"
            stroke="url(#brain-outline)"
            strokeWidth="0.5"
            strokeDasharray="6 6"
          />
          <path
            d="M80,230 Q250,180 420,230"
            stroke="url(#brain-outline)"
            strokeWidth="0.5"
            strokeDasharray="6 6"
            fill="none"
          />
        </g>

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
              {/* Main region shape */}
              <motion.path
                d={region.path}
                fill={`url(#grad-${region.id})`}
                stroke={region.color}
                strokeWidth={isHovered ? 2 : 1}
                filter="url(#glow)"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
              />
            </motion.g>
          );
        })}

        {/* Synapse dots - static with simple CSS animation */}
        {synapses.map((synapse) => (
          <circle
            key={`synapse-${synapse.id}`}
            cx={synapse.cx}
            cy={synapse.cy}
            r={synapse.r}
            fill={synapse.color}
            opacity={0.5}
            className="animate-pulse"
          />
        ))}

        {/* Central core */}
        <circle
          cx="250"
          cy="250"
          r="15"
          fill="url(#brain-outline)"
          filter="url(#glow)"
          opacity="0.8"
        />
        <circle
          cx="250"
          cy="250"
          r="6"
          fill="rgba(255, 255, 255, 0.9)"
          filter="url(#glow)"
        />
      </svg>

      {/* Hover tooltip */}
      {hoveredRegion && interactive && (
        <motion.div
          className="absolute left-1/2 px-4 py-2 rounded-xl z-30 pointer-events-none"
          style={{
            bottom: '-70px',
            transform: 'translateX(-50%)',
            background: 'rgba(5, 5, 8, 0.95)',
            border: `1px solid ${regions.find((r) => r.id === hoveredRegion)?.color}40`,
            boxShadow: `0 0 20px ${regions.find((r) => r.id === hoveredRegion)?.color}30`,
          }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: regions.find((r) => r.id === hoveredRegion)?.color,
              }}
            />
            <p className="text-white text-sm font-medium whitespace-nowrap">
              {regions.find((r) => r.id === hoveredRegion)?.name}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BrainVisualization;
