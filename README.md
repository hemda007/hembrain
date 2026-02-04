# HemBrain

An interactive mind interface where visitors can explore different parts of your brain/expertise. Features a living, breathing brain visualization as the hero element with different regions representing different knowledge domains.

## Features

- Animated SVG brain visualization with pulsing neural effects
- Interactive brain regions (Philosophy, AI & Data, Career, Cinema, Leadership)
- Ask Me Anything chat interface (mock AI responses)
- Real-world scenario exploration with modals
- Coaching waitlist with plan selection
- Thought Stream sidebar showing live brain activity
- Dark theme with electric blue, neural pink, and soft purple accents
- Fully responsive design

## Tech Stack

- React 19 with Vite
- Tailwind CSS v4
- Framer Motion for animations
- SVG-based brain visualization

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── BrainVisualization.jsx
│   └── ThoughtStream.jsx
├── sections/         # Page sections
│   ├── Hero.jsx
│   ├── BrainExplorer.jsx
│   ├── AskMeAnything.jsx
│   ├── Scenarios.jsx
│   ├── Coaching.jsx
│   └── Footer.jsx
├── data/             # Mock data
│   ├── brainRegions.js
│   ├── scenarios.js
│   ├── thoughts.js
│   └── coaching.js
├── App.jsx           # Main app component
└── index.css         # Global styles & Tailwind
```

## Design System

- **Background**: Dark purple/navy (#0a0a1a)
- **Electric Blue**: #00D4FF
- **Neural Pink**: #FF6B9D
- **Soft Purple**: #8B5CF6
- **Typography**: Space Grotesk

## License

MIT
