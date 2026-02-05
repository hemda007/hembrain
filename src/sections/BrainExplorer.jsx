import { useState, useMemo } from 'react';
import { brainRegions, thoughts, getRelativeTime } from '../data';

const BrainExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const displayedThoughts = useMemo(() => thoughts.slice(0, 5), []);

  const brainPaths = useMemo(() => ({
    // Original 5 regions (left and center)
    'career': 'M150,40 Q200,30 250,50 Q280,70 280,100 Q250,90 200,95 Q160,90 150,70 Z',
    'work-culture': 'M120,80 Q150,70 200,95 Q170,110 140,120 Q110,110 100,95 Q105,85 120,80 Z',
    'data-analytics': 'M80,110 Q100,95 140,120 Q130,150 110,180 Q70,170 60,140 Q65,120 80,110 Z',
    'leadership': 'M200,95 Q250,90 280,100 Q300,130 290,170 Q260,160 220,165 Q180,155 170,130 Q175,110 200,95 Z',
    'philosophy': 'M110,180 Q130,150 170,130 Q180,155 220,165 Q200,200 160,210 Q120,200 110,180 Z',
    // New 4 regions (right side)
    'integrity': 'M290,170 Q310,150 330,160 Q350,180 345,210 Q330,220 300,215 Q280,200 290,170 Z',
    'discipline': 'M250,50 Q290,40 320,60 Q340,85 330,110 Q310,100 280,100 Q265,85 250,50 Z',
    'spirituality': 'M220,165 Q260,160 290,170 Q280,200 300,215 Q270,240 230,230 Q200,210 220,165 Z',
    'cultures': 'M330,110 Q355,120 360,155 Q355,190 330,160 Q310,150 290,170 Q300,130 330,110 Z'
  }), []);

  const labelPositions = useMemo(() => ({
    'career': { x: 200, y: 55 },
    'work-culture': { x: 140, y: 100 },
    'data-analytics': { x: 75, y: 145 },
    'leadership': { x: 260, y: 130 },
    'philosophy': { x: 165, y: 190 },
    'integrity': { x: 315, y: 190 },
    'discipline': { x: 295, y: 70 },
    'spirituality': { x: 255, y: 205 },
    'cultures': { x: 340, y: 140 }
  }), []);

  const getRegionColor = (regionId) => {
    const region = brainRegions.find(r => r.id === regionId);
    return region?.color || '#666';
  };

  return (
    <section id="explorer" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">The Architecture of How I Think</span>
          <h2 className="heading-lg section-title">What's inside</h2>
          <p className="section-description">
            Every brain has regions. Mine have been shaped by decades of making decisions —
            some I'm proud of, some I'd take back. Click any region to see the frameworks that survived real life.
          </p>
        </div>

        <div className="brain-grid">
          <div className="brain-visual">
            <svg viewBox="0 0 400 260" className="brain-svg">
              <ellipse cx="200" cy="130" rx="175" ry="115" fill="none" stroke="var(--border-light)" strokeWidth="1" />
              <line x1="200" y1="20" x2="200" y2="240" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4,4" />

              {Object.entries(brainPaths).map(([regionId, path]) => {
                const region = brainRegions.find(r => r.id === regionId);
                const isActive = hoveredRegion === regionId || selectedRegion?.id === regionId;
                return (
                  <path
                    key={regionId}
                    d={path}
                    fill={isActive ? `${region?.color}30` : `${region?.color}15`}
                    stroke={region?.color}
                    strokeWidth={isActive ? 2 : 1}
                    className="brain-path"
                    onMouseEnter={() => setHoveredRegion(regionId)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => setSelectedRegion(region)}
                  />
                );
              })}

              {brainRegions.map((region) => {
                const pos = labelPositions[region.id];
                if (!pos) return null;
                return (
                  <circle
                    key={region.id}
                    cx={pos.x}
                    cy={pos.y}
                    r="4"
                    fill={region.color}
                    className="brain-path"
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  />
                );
              })}
            </svg>
          </div>

          <div className="region-list">
            {brainRegions.map((region) => {
              const isActive = hoveredRegion === region.id || selectedRegion?.id === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className={`region-item ${isActive ? 'active' : ''}`}
                  style={{ '--color': region.color }}
                >
                  <span className="region-dot" />
                  <span className="region-name">{region.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="thoughts">
          <div className="thoughts-head">
            <span className="thoughts-dot" />
            <span className="label">Thought Stream</span>
          </div>

          <div className="thoughts-list">
            {displayedThoughts.map((thought) => (
              <div key={thought.id} className="thought" style={{ '--color': getRegionColor(thought.region) }}>
                <p className="thought-text">"{thought.content}"</p>
                <div className="thought-foot">
                  <div className="thought-left">
                    <span className="thought-tag" style={{ background: `${getRegionColor(thought.region)}15`, color: getRegionColor(thought.region) }}>
                      {thought.type}
                    </span>
                    <span className="thought-meta">{thought.engagement} reactions</span>
                  </div>
                  <span className="thought-meta">{getRelativeTime(thought.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedRegion && (
        <div className="modal-bg" onClick={() => setSelectedRegion(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedRegion(null)} className="modal-x">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3l8 8M3 11l8-8" />
              </svg>
            </button>

            <div className="modal-dot" style={{ background: `${selectedRegion.color}15` }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: selectedRegion.color, display: 'block' }} />
            </div>

            <h3 className="modal-name">{selectedRegion.name}</h3>
            <p className="modal-desc">{selectedRegion.description}</p>

            <div className="modal-block">
              <span className="label">Key Topics</span>
              <div className="tags">
                {selectedRegion.topics.map((topic) => (
                  <span key={topic} className="tag" style={{ background: `${selectedRegion.color}10`, borderColor: `${selectedRegion.color}30`, color: selectedRegion.color }}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {selectedRegion.insights && (
              <div className="modal-block">
                <span className="label">Top Insights</span>
                <div className="insights">
                  {selectedRegion.insights.map((insight, i) => (
                    <div key={i} className="insight">
                      <div className="insight-title">{insight.title}</div>
                      <div className="insight-text">{insight.content}</div>
                      <div className="insight-meta">{insight.engagement} reactions</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .brain-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          margin-bottom: 64px;
        }
        @media (min-width: 768px) {
          .brain-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .brain-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .brain-svg {
          width: 100%;
          max-width: 420px;
        }
        .brain-path {
          cursor: pointer;
          transition: fill 0.15s, stroke-width 0.15s;
        }
        .region-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .region-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
        }
        .region-item:hover, .region-item.active {
          background: var(--bg-tertiary);
          border-color: var(--color);
        }
        .region-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color);
        }
        .region-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        .thoughts {
          margin-top: 16px;
        }
        .thoughts-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .thoughts-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-green);
        }
        .label {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-tertiary);
        }
        .thoughts-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .thought {
          padding: 18px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          border-left: 3px solid var(--color);
        }
        .thought-text {
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .thought-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .thought-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .thought-tag {
          padding: 3px 8px;
          border-radius: 100px;
          font-size: 0.6875rem;
          font-weight: 500;
          text-transform: uppercase;
        }
        .thought-meta {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
        .modal-bg {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0,0,0,0.85);
        }
        .modal {
          position: relative;
          width: 100%;
          max-width: 480px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 32px;
          max-height: 85vh;
          overflow: auto;
        }
        .modal-x {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-dot {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .modal-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .modal-desc {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
        }
        .modal-block {
          margin-bottom: 24px;
        }
        .modal-block:last-child {
          margin-bottom: 0;
        }
        .modal-block .label {
          display: block;
          margin-bottom: 12px;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tag {
          font-size: 0.8125rem;
          padding: 6px 12px;
          border-radius: 100px;
          border: 1px solid;
        }
        .insights {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .insight {
          padding: 14px;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
        }
        .insight-title {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .insight-text {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .insight-meta {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-top: 8px;
        }
      `}</style>
    </section>
  );
};

export default BrainExplorer;
