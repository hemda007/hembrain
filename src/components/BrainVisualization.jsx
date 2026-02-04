import { motion } from 'framer-motion';
import { useState } from 'react';

const BrainVisualization = ({ onRegionClick, interactive = false, size = 'large' }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);

  const sizeClasses = {
    small: 'w-48 h-48',
    medium: 'w-72 h-72',
    large: 'w-96 h-96 md:w-[500px] md:h-[500px]'
  };

  const regions = [
    {
      id: 'philosophy',
      name: 'Philosophy & Mental Models',
      color: '#8B5CF6',
      path: 'M 250 80 C 200 60, 150 80, 140 120 C 130 160, 160 180, 200 180 C 240 180, 280 180, 320 180 C 360 180, 380 160, 370 120 C 360 80, 310 60, 250 80',
    },
    {
      id: 'ai-data',
      name: 'AI & Data Analytics',
      color: '#00D4FF',
      path: 'M 100 200 C 70 180, 50 220, 60 270 C 70 320, 90 360, 130 380 C 160 400, 180 380, 180 340 C 180 300, 160 260, 140 230 C 120 200, 100 200, 100 200',
    },
    {
      id: 'career',
      name: 'Career Navigation',
      color: '#10B981',
      path: 'M 250 50 C 220 30, 180 40, 170 60 C 160 80, 180 100, 220 110 C 260 120, 300 110, 320 90 C 340 70, 320 40, 280 35 C 260 32, 250 50, 250 50',
    },
    {
      id: 'cinema',
      name: 'Cinema & Culture',
      color: '#FF6B9D',
      path: 'M 400 200 C 430 180, 450 220, 440 270 C 430 320, 410 360, 370 380 C 340 400, 320 380, 320 340 C 320 300, 340 260, 360 230 C 380 200, 400 200, 400 200',
    },
    {
      id: 'leadership',
      name: 'Leadership & Teams',
      color: '#F59E0B',
      path: 'M 200 200 C 180 220, 180 280, 200 320 C 220 360, 280 360, 300 320 C 320 280, 320 220, 300 200 C 280 180, 220 180, 200 200',
    }
  ];

  const handleRegionClick = (region) => {
    if (interactive && onRegionClick) {
      setActiveRegion(region.id);
      onRegionClick(region);
    }
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(0, 212, 255, 0.2) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Neural network lines */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.3 }}
      >
        <motion.g
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Neural connections */}
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={i}
              x1={150 + Math.random() * 200}
              y1={100 + Math.random() * 300}
              x2={150 + Math.random() * 200}
              y2={100 + Math.random() * 300}
              stroke="#8B5CF6"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.g>
      </svg>

      {/* Main brain SVG */}
      <svg
        viewBox="0 0 500 500"
        className="relative w-full h-full z-10"
      >
        <defs>
          {/* Gradient definitions for each region */}
          {regions.map((region) => (
            <radialGradient key={`gradient-${region.id}`} id={`gradient-${region.id}`}>
              <stop offset="0%" stopColor={region.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={region.color} stopOpacity="0.3" />
            </radialGradient>
          ))}

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Pulse filter */}
          <filter id="pulse-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="15" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Brain outline */}
        <motion.path
          d="M 250 60
             C 150 60, 80 120, 70 200
             C 60 280, 80 360, 140 400
             C 200 440, 300 440, 360 400
             C 420 360, 440 280, 430 200
             C 420 120, 350 60, 250 60"
          fill="none"
          stroke="url(#gradient-philosophy)"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Pulsing core */}
        <motion.circle
          cx="250"
          cy="250"
          r="80"
          fill="rgba(139, 92, 246, 0.1)"
          stroke="rgba(139, 92, 246, 0.3)"
          strokeWidth="1"
          animate={{
            r: [80, 90, 80],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Brain regions */}
        {regions.map((region, index) => (
          <motion.g
            key={region.id}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => handleRegionClick(region)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            <motion.path
              d={region.path}
              fill={`url(#gradient-${region.id})`}
              stroke={region.color}
              strokeWidth={hoveredRegion === region.id || activeRegion === region.id ? 3 : 1.5}
              filter={hoveredRegion === region.id || activeRegion === region.id ? "url(#pulse-glow)" : "url(#glow)"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                fill: hoveredRegion === region.id ? region.color : `url(#gradient-${region.id})`,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={interactive ? { scale: 1.05 } : {}}
            />
          </motion.g>
        ))}

        {/* Synapse dots */}
        {[...Array(30)].map((_, i) => (
          <motion.circle
            key={`synapse-${i}`}
            cx={100 + Math.random() * 300}
            cy={80 + Math.random() * 340}
            r={1 + Math.random() * 2}
            fill={['#8B5CF6', '#00D4FF', '#FF6B9D'][i % 3]}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Electrical impulse paths */}
        {[
          "M 150 150 Q 200 200 250 180 Q 300 160 350 200",
          "M 180 280 Q 220 250 260 270 Q 300 290 340 260",
          "M 200 350 Q 250 320 280 340 Q 320 360 350 330",
        ].map((path, i) => (
          <motion.path
            key={`impulse-${i}`}
            d={path}
            fill="none"
            stroke={['#00D4FF', '#FF6B9D', '#8B5CF6'][i]}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Region label tooltip */}
      {hoveredRegion && interactive && (
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-dark-card px-4 py-2 rounded-lg shadow-lg z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: 'rgba(26, 26, 58, 0.95)',
            border: `1px solid ${regions.find(r => r.id === hoveredRegion)?.color}`,
            boxShadow: `0 0 20px ${regions.find(r => r.id === hoveredRegion)?.color}40`
          }}
        >
          <p className="text-white text-sm font-medium whitespace-nowrap">
            {regions.find(r => r.id === hoveredRegion)?.name}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BrainVisualization;
