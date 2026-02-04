import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useMemo, useRef, useEffect } from 'react';

// Synaptic firing animation - light traveling along path
const SynapticFire = ({ path, color, delay, duration }) => (
  <motion.circle
    r="3"
    fill={color}
    filter="url(#glow-intense)"
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      offsetDistance: ['0%', '100%'],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      offsetPath: `path('${path}')`,
    }}
  />
);

// Floating neuron particle
const FloatingNeuron = ({ index }) => {
  const randomX = 60 + Math.random() * 380;
  const randomY = 30 + Math.random() * 400;
  const size = 1.5 + Math.random() * 2;
  const delay = Math.random() * 5;
  const duration = 3 + Math.random() * 4;
  const colors = ['#8B5CF6', '#00D4FF', '#FF6B9D', '#10B981', '#F59E0B'];
  const color = colors[index % colors.length];

  return (
    <motion.circle
      cx={randomX}
      cy={randomY}
      r={size}
      fill={color}
      filter="url(#glow-soft)"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        scale: [0, 1, 1, 0],
        cy: [randomY, randomY - 20, randomY - 40],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Data stream effect around brain
const DataStream = ({ index }) => {
  const angle = (index * 360) / 8;
  const radius = 230 + (index % 3) * 15;
  const size = 2 + Math.random() * 2;

  return (
    <motion.g
      style={{
        transformOrigin: '250px 250px',
      }}
      animate={{
        rotate: [angle, angle + 360],
      }}
      transition={{
        duration: 20 + index * 2,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <motion.circle
        cx={250 + radius}
        cy={250}
        r={size}
        fill="url(#dataGradient)"
        filter="url(#glow-soft)"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          delay: index * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.g>
  );
};

const BrainVisualization = ({ onRegionClick, interactive = false, size = 'large' }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [activeRipple, setActiveRipple] = useState(null);
  const containerRef = useRef(null);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 30, stiffness: 200 };

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

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
      glowColor: 'rgba(139, 92, 246, 0.6)',
      path: 'M250,85 C200,70 160,90 150,130 C140,170 165,195 210,195 C240,195 270,195 300,195 C345,195 365,170 355,130 C345,90 305,70 250,85',
      heatLevel: 0.85,
    },
    {
      id: 'data-analytics',
      name: 'Data & Analytics',
      color: '#00D4FF',
      glowColor: 'rgba(0, 212, 255, 0.6)',
      path: 'M95,220 C65,200 50,240 60,290 C70,340 95,380 140,395 C175,408 195,385 195,345 C195,305 175,265 150,235 C125,205 95,220 95,220',
      heatLevel: 0.7,
    },
    {
      id: 'career',
      name: 'Career Navigation',
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.6)',
      path: 'M250,55 C215,35 175,50 165,75 C155,100 180,120 225,130 C270,140 310,125 320,100 C330,75 295,40 260,40 C250,40 250,55 250,55',
      heatLevel: 0.95,
    },
    {
      id: 'philosophy',
      name: 'Life Philosophy',
      color: '#FF6B9D',
      glowColor: 'rgba(255, 107, 157, 0.6)',
      path: 'M405,220 C435,200 450,240 440,290 C430,340 405,380 360,395 C325,408 305,385 305,345 C305,305 325,265 350,235 C375,205 405,220 405,220',
      heatLevel: 0.6,
    },
    {
      id: 'leadership',
      name: 'Leadership & Business',
      color: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.6)',
      path: 'M200,215 C175,240 175,300 200,340 C225,380 275,380 300,340 C325,300 325,240 300,215 C275,190 225,190 200,215',
      heatLevel: 0.8,
    },
  ];

  // Generate random synapse positions - memoized
  const synapses = useMemo(
    () =>
      [...Array(50)].map((_, i) => ({
        id: i,
        cx: 70 + Math.random() * 360,
        cy: 40 + Math.random() * 400,
        r: 0.8 + Math.random() * 2,
        color: ['#8B5CF6', '#00D4FF', '#FF6B9D', '#10B981', '#F59E0B'][i % 5],
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })),
    []
  );

  // Neural connection paths for synaptic firing
  const neuralPaths = useMemo(
    () => [
      { path: 'M150,180 Q200,220 250,200 Q300,180 350,220', color: '#8B5CF6', delay: 0 },
      { path: 'M130,280 Q180,250 230,270 Q280,290 330,260', color: '#00D4FF', delay: 1.5 },
      { path: 'M160,340 Q210,310 260,330 Q310,350 360,320', color: '#FF6B9D', delay: 3 },
      { path: 'M180,150 Q220,180 260,160 Q300,140 340,170', color: '#10B981', delay: 4.5 },
      { path: 'M200,250 Q250,230 300,250', color: '#F59E0B', delay: 2 },
    ],
    []
  );

  const handleRegionClick = (region) => {
    if (interactive && onRegionClick) {
      setActiveRipple(region.id);
      setTimeout(() => setActiveRipple(null), 600);
      onRegionClick(region);
    }
  };

  const handleRegionHover = (regionId) => {
    if (interactive) {
      setHoveredRegion(regionId);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{
        width: config.width,
        height: config.height,
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Multi-layer ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep background glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '150%',
            height: '150%',
            left: '-25%',
            top: '-25%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Mid-layer glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '130%',
            height: '130%',
            left: '-15%',
            top: '-15%',
            background:
              'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.7, 0.5],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Inner bright glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 30%, transparent 60%)',
            filter: 'blur(30px)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main SVG with 3D transform */}
      <motion.svg
        viewBox="0 0 500 500"
        className="relative w-full h-full z-10"
        style={{
          overflow: 'visible',
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
      >
        <defs>
          {/* Premium gradients for each region */}
          {regions.map((region) => (
            <radialGradient
              key={`grad-${region.id}`}
              id={`grad-${region.id}`}
              cx="50%"
              cy="30%"
              r="70%"
            >
              <stop offset="0%" stopColor={region.color} stopOpacity="0.95" />
              <stop offset="40%" stopColor={region.color} stopOpacity="0.6" />
              <stop offset="70%" stopColor={region.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={region.color} stopOpacity="0.05" />
            </radialGradient>
          ))}

          {/* Heat map gradients */}
          {regions.map((region) => (
            <radialGradient
              key={`heat-${region.id}`}
              id={`heat-${region.id}`}
              cx="50%"
              cy="50%"
              r="60%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity={region.heatLevel * 0.3} />
              <stop offset="50%" stopColor={region.color} stopOpacity={region.heatLevel * 0.5} />
              <stop offset="100%" stopColor={region.color} stopOpacity="0" />
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
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-intense" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Chromatic aberration filter */}
          <filter id="chromatic" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset in="SourceGraphic" dx="1" dy="0" result="red">
              <animate
                attributeName="dx"
                values="1;2;1"
                dur="3s"
                repeatCount="indefinite"
              />
            </feOffset>
            <feOffset in="SourceGraphic" dx="-1" dy="0" result="blue">
              <animate
                attributeName="dx"
                values="-1;-2;-1"
                dur="3s"
                repeatCount="indefinite"
              />
            </feOffset>
            <feBlend in="red" in2="blue" mode="screen" />
          </filter>

          {/* Brain outline gradient */}
          <linearGradient id="brain-outline" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9">
              <animate
                attributeName="stop-color"
                values="#8B5CF6;#00D4FF;#FF6B9D;#8B5CF6"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.7">
              <animate
                attributeName="stop-color"
                values="#00D4FF;#FF6B9D;#8B5CF6;#00D4FF"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#FF6B9D" stopOpacity="0.9">
              <animate
                attributeName="stop-color"
                values="#FF6B9D;#8B5CF6;#00D4FF;#FF6B9D"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Data stream gradient */}
          <radialGradient id="dataGradient">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.5" />
          </radialGradient>

          {/* Ripple animation */}
          <filter id="ripple">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.01"
              numOctaves="3"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01;0.02;0.01"
                dur="2s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="5" />
          </filter>
        </defs>

        {/* Floating data streams */}
        {[...Array(12)].map((_, i) => (
          <DataStream key={`data-${i}`} index={i} />
        ))}

        {/* Brain outline with breathing animation */}
        <motion.g
          animate={{
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '250px 230px' }}
        >
          {/* Outer glow outline */}
          <motion.path
            d="M250,40
               C150,40 70,100 60,200
               C50,300 80,380 150,420
               C220,460 280,460 350,420
               C420,380 450,300 440,200
               C430,100 350,40 250,40"
            fill="none"
            stroke="url(#brain-outline)"
            strokeWidth="3"
            filter="url(#glow-strong)"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />

          {/* Main outline */}
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
            filter="url(#glow-soft)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* Inner structure lines */}
        <motion.g opacity={0.2}>
          <motion.path
            d="M250,60 L250,420"
            stroke="url(#brain-outline)"
            strokeWidth="0.5"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path
            d="M80,230 Q250,180 420,230"
            stroke="url(#brain-outline)"
            strokeWidth="0.5"
            strokeDasharray="6 6"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.7 }}
          />
          <motion.path
            d="M100,300 Q250,260 400,300"
            stroke="url(#brain-outline)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.9 }}
          />
        </motion.g>

        {/* Neural connection paths with animated synaptic firing */}
        {neuralPaths.map((neural, i) => (
          <g key={`neural-${i}`}>
            {/* Path background */}
            <motion.path
              d={neural.path}
              fill="none"
              stroke={neural.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
            {/* Animated pulse along path */}
            <motion.path
              d={neural.path}
              fill="none"
              stroke={neural.color}
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow-soft)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 0.3, 0.3, 0],
                pathOffset: [0, 0.7, 0.7, 1],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 3,
                delay: neural.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </g>
        ))}

        {/* Brain regions with premium effects */}
        {regions.map((region, index) => {
          const isHovered = hoveredRegion === region.id;
          const isRippling = activeRipple === region.id;

          return (
            <motion.g
              key={region.id}
              onMouseEnter={() => handleRegionHover(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region)}
              style={{ cursor: interactive ? 'pointer' : 'default' }}
            >
              {/* Heat map layer */}
              <motion.path
                d={region.path}
                fill={`url(#heat-${region.id})`}
                opacity={0.5}
                animate={{
                  opacity: isHovered ? 0.8 : 0.5,
                }}
              />

              {/* Region glow on hover */}
              {isHovered && (
                <motion.path
                  d={region.path}
                  fill={region.color}
                  opacity={0.2}
                  filter="url(#glow-strong)"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                />
              )}

              {/* Ripple effect on click */}
              {isRippling && (
                <motion.path
                  d={region.path}
                  fill="none"
                  stroke={region.color}
                  strokeWidth="3"
                  filter="url(#glow-strong)"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                />
              )}

              {/* Main region shape with gradient fill */}
              <motion.path
                d={region.path}
                fill={`url(#grad-${region.id})`}
                stroke={region.color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                filter="url(#glow-soft)"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isHovered ? 1.03 : 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
              />

              {/* Highlight/shine effect */}
              <motion.path
                d={region.path}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                opacity={isHovered ? 0.5 : 0.2}
                style={{
                  strokeDasharray: '10 100',
                  strokeDashoffset: 0,
                }}
                animate={{
                  strokeDashoffset: isHovered ? [-110] : [0],
                }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut',
                }}
              />

              {/* Pulse ring animation */}
              <motion.path
                d={region.path}
                fill="none"
                stroke={region.color}
                strokeWidth="1"
                opacity={0.3}
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.1, 0.3],
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

        {/* Synapse dots with staggered animation */}
        {synapses.map((synapse) => (
          <motion.circle
            key={`synapse-${synapse.id}`}
            cx={synapse.cx}
            cy={synapse.cy}
            r={synapse.r}
            fill={synapse.color}
            filter="url(#glow-soft)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.3, 1.2, 1, 0.3],
            }}
            transition={{
              duration: synapse.duration,
              repeat: Infinity,
              delay: synapse.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Floating neurons */}
        {[...Array(15)].map((_, i) => (
          <FloatingNeuron key={`neuron-${i}`} index={i} />
        ))}

        {/* Central core with multi-layer pulse */}
        <motion.g>
          {/* Outer pulse ring */}
          <motion.circle
            cx="250"
            cy="250"
            r="45"
            fill="none"
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="1"
            animate={{
              r: [45, 60, 45],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Mid pulse */}
          <motion.circle
            cx="250"
            cy="250"
            r="35"
            fill="rgba(139, 92, 246, 0.15)"
            stroke="rgba(139, 92, 246, 0.4)"
            strokeWidth="1"
            filter="url(#glow-soft)"
            animate={{
              r: [35, 42, 35],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Inner core */}
          <motion.circle
            cx="250"
            cy="250"
            r="20"
            fill="url(#dataGradient)"
            filter="url(#glow-soft)"
            animate={{
              r: [20, 25, 20],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Bright center */}
          <motion.circle
            cx="250"
            cy="250"
            r="8"
            fill="rgba(255, 255, 255, 0.9)"
            filter="url(#glow-intense)"
            animate={{
              r: [8, 10, 8],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.g>
      </motion.svg>

      {/* Hover tooltip */}
      {hoveredRegion && interactive && (
        <motion.div
          className="absolute left-1/2 px-5 py-3 rounded-xl z-30 pointer-events-none"
          style={{
            bottom: '-80px',
            transform: 'translateX(-50%)',
            background: 'rgba(5, 5, 8, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${regions.find((r) => r.id === hoveredRegion)?.color}40`,
            boxShadow: `0 0 40px ${regions.find((r) => r.id === hoveredRegion)?.glowColor}, 0 8px 32px rgba(0,0,0,0.5)`,
          }}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: regions.find((r) => r.id === hoveredRegion)?.color,
                boxShadow: `0 0 10px ${regions.find((r) => r.id === hoveredRegion)?.color}`,
              }}
            />
            <div>
              <p className="text-white text-sm font-semibold whitespace-nowrap">
                {regions.find((r) => r.id === hoveredRegion)?.name}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">Click to explore</p>
            </div>
          </div>

          {/* Activity indicator */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: regions.find((r) => r.id === hoveredRegion)?.color,
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${(regions.find((r) => r.id === hoveredRegion)?.heatLevel || 0) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs text-gray-500 font-mono">
              {Math.round((regions.find((r) => r.id === hoveredRegion)?.heatLevel || 0) * 100)}%
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BrainVisualization;
