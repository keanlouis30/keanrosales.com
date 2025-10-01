# Kean Rosales Portfolio - Technical Documentation

## Overview

A **terminal-themed cybersecurity portfolio** showcasing hackathon achievements, technical projects, and professional capabilities. The website emulates a Linux terminal interface with hacker/cyberpunk aesthetics using React, CSS3, and modern web technologies.

**Architecture**: Single Page Application (SPA) with component-based architecture  
**Framework**: React 18 with functional components and hooks  
**Styling**: CSS3 with CSS Custom Properties, Flexbox, and Grid  
**Animations**: CSS Keyframes, Intersection Observer API, Web Animations API  
**Theme**: Monochromatic green color scheme with terminal aesthetics  

---

## Design System

### **Primary Theme: Terminal/Hacker Aesthetic**

**Core Concept**: Emulation of a Linux terminal environment with cyberpunk visual enhancements

- **Visual Language**: Retro terminal interface with modern web technologies
- **Inspiration Sources**: Linux command line, Matrix digital rain, cyberpunk terminals, hacker culture
- **Mood**: Technical proficiency, cybersecurity expertise, innovation, professionalism
- **User Experience**: Interactive exploration through terminal commands and scroll-based animations
- **Target Audience**: Technical recruiters, software developers, cybersecurity professionals, potential collaborators

### **Visual Elements Inventory**

1. **Terminal Windows**: Consistent header pattern with traffic light dots (red, yellow, green)
2. **Typography**: Exclusively monospace fonts with ligature support
3. **Matrix Background**: Animated falling character columns in Hero section
4. **Boot Sequence**: Staged loading animation mimicking system startup
5. **Terminal Prompts**: Command-line interface patterns throughout
6. **Glitch Effects**: Text distortion animations on hover interactions
7. **Scroll Animations**: Intersection Observer-triggered entrance effects
8. **Interactive Elements**: Clickable components with terminal-style feedback

---

## Color System

### **Monochromatic Green Palette**

A carefully curated spectrum of green shades creating visual hierarchy while maintaining terminal authenticity:

```css
:root {
  /* Light to Dark Green Spectrum */
  --nyanza: #d8f3dcff;           /* Lightest - primary text, main content */
  --celadon: #b7e4c7ff;         /* Light - secondary text, subdued content */
  --celadon-2: #95d5b2ff;       /* Medium-light - tertiary accents */
  --mint: #74c69dff;            /* Primary - main accent, interactive elements */
  --mint-2: #52b788ff;          /* Medium - secondary interactive elements */
  --sea-green: #40916cff;       /* Medium-dark - borders, emphasis, hover states */
  --dartmouth-green: #2d6a4fff; /* Dark - secondary backgrounds, containers */
  --brunswick-green: #1b4332ff; /* Very dark - card backgrounds, terminals */
  --dark-green: #081c15ff;      /* Darkest - main background, ultimate contrast */
}
```

### **Color Usage Implementation**

#### **Background Hierarchy**
```css
/* Primary backgrounds */
body { background-color: var(--dark-green); }           /* Main page background */
.proficiency-card { background: var(--brunswick-green); } /* Card/terminal backgrounds */
.terminal-header { background: var(--dartmouth-green); }  /* Terminal headers */

/* Accent backgrounds */
.status-info { background: rgba(45, 106, 79, 0.2); }    /* Semi-transparent overlays */
.system-ready { background: rgba(116, 198, 157, 0.1); } /* Subtle highlights */
```

#### **Text Color Hierarchy**
```css
/* Text color applications */
.primary-text { color: var(--nyanza); }      /* Main content, headings */
.secondary-text { color: var(--celadon); }   /* Supporting text, descriptions */
.accent-text { color: var(--mint); }         /* Highlights, links, prompts */
.emphasis-text { color: var(--sea-green); }  /* Important information */
```

#### **Interactive States**
```css
/* Button and link states */
.interactive-element {
  color: var(--mint);
  border-color: var(--sea-green);
}

.interactive-element:hover {
  color: var(--nyanza);
  border-color: var(--mint);
  background: rgba(116, 198, 157, 0.1);
}

.interactive-element:active {
  background: rgba(45, 106, 79, 0.2);
}
```

---

## Typography System

### **Font Stack Implementation**

```css
/* Global font variable */
--mono-font: 'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, 
             'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;

/* Global application */
body {
  font-family: var(--mono-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: 'liga' 1, 'calt' 1;
}
```

### **Font Loading Strategy**

```css
/* Preload critical fonts */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Fira+Code:wght@300..700&display=swap');
```

### **Typography Hierarchy & Classes**

#### **Display Text**
```css
/* Hero name display */
.name-display {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-family: var(--mono-font);
  font-weight: bold;
  letter-spacing: 2px;
  font-feature-settings: 'liga' 1, 'calt' 1;
  line-height: 1.1;
}

/* Mobile responsive scaling */
@media (max-width: 768px) {
  .name-display {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
    line-height: 1.1;
  }
}

@media (max-width: 480px) {
  .name-display {
    font-size: clamp(1.2rem, 10vw, 2rem);
    letter-spacing: 1px;
  }
}
```

#### **Section Headers**
```css
/* Terminal titles */
.terminal-title {
  font-size: 14px;
  font-weight: bold;
  font-family: var(--mono-font);
  color: var(--nyanza);
}

/* Section headings */
.section-heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--mint);
}
```

#### **Body Text Classes**
```css
/* Standard body text */
.body-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--nyanza);
}

/* Secondary text */
.secondary-text {
  font-size: 13px;
  color: var(--celadon);
  line-height: 1.5;
}

/* Terminal text */
.terminal-text {
  font-size: 12px;
  font-family: var(--mono-font);
  font-feature-settings: 'liga' 1, 'calt' 1;
}
```

#### **Interactive Text**
```css
/* Terminal prompts */
.prompt {
  color: var(--mint);
  font-weight: bold;
  font-family: var(--mono-font);
}

/* Commands */
.command {
  color: var(--celadon);
  font-family: var(--mono-font);
}

/* Role/tagline text */
.role-text {
  font-size: 18px;
  color: var(--celadon);
  font-family: var(--mono-font);
  font-feature-settings: 'liga' 1, 'calt' 1;
}

@media (max-width: 768px) {
  .role-text {
    font-size: 14px;
  }
}
```

---

## Layout Architecture

### **Grid System & Container Classes**

#### **Main Layout Structure**
```css
/* Global container pattern */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

/* Hero section full height */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #000000;
  overflow: hidden;
}

/* Section spacing */
.content-section {
  padding: 4rem 0;
  margin: 0 auto;
  max-width: 1200px;
}
```

#### **Terminal Card Pattern**
```css
/* Base terminal card */
.proficiency-card {
  background: var(--brunswick-green);
  border: 1px solid var(--dartmouth-green);
  border-radius: 8px;
  box-shadow: 
    0 8px 32px rgba(8, 28, 21, 0.3),
    0 4px 16px rgba(8, 28, 21, 0.2),
    inset 0 1px 0 rgba(116, 198, 157, 0.1);
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
}

/* Terminal card hover effects */
.proficiency-card:hover {
  border-color: var(--sea-green);
  box-shadow: 
    0 12px 40px rgba(8, 28, 21, 0.4),
    0 6px 20px rgba(8, 28, 21, 0.3),
    inset 0 1px 0 rgba(116, 198, 157, 0.2);
  transform: translateY(-2px);
}

/* Hero terminal variant */
.hero-terminal.proficiency-card {
  width: 90%;
  max-width: 800px;
  background: #000000;
  border: 1px solid var(--sea-green);
  box-shadow: 
    0 0 20px rgba(116, 198, 157, 0.1),
    0 0 40px rgba(116, 198, 157, 0.05),
    inset 0 0 20px rgba(8, 28, 21, 0.8);
}
```

### **Responsive Breakpoints**

```css
/* Mobile breakpoints */
@media (max-width: 768px) {
  .section-container {
    padding: 2rem 1rem;
  }
  
  .hero-terminal {
    width: calc(100% - 20px);
    margin: 10px;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .section-container {
    padding: 1.5rem 0.75rem;
  }
  
  .hero-terminal {
    width: calc(100% - 10px);
    margin: 5px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .hover\:transform-none:hover {
    transform: none !important;
  }
  
  .active\:scale-95:active {
    transform: scale(0.95);
  }
  
  /* Larger touch targets */
  button, input, textarea, select, a {
    min-height: 44px;
    touch-action: manipulation;
  }
}
```

---

## Layout Structure

### **Main Sections**
1. **Hero Section** - Boot sequence animation + name display
2. **About/Proficiencies** - Skills and background
3. **Projects** - Featured project showcase
4. **Hackathons** - Competition achievements leaderboard
5. **Extra/Terminal** - Interactive terminal experience
6. **Contact** - Professional contact information

### **Container Pattern**
```css
/* Standard section wrapper */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

/* Terminal card pattern */
.proficiency-card {
  background: var(--brunswick-green);
  border: 1px solid var(--dartmouth-green);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(8, 28, 21, 0.3);
}
```

---

## Component Architecture

### **Terminal Header Pattern**

A consistent UI pattern used across all major sections to maintain visual coherence:

#### **JSX Structure**
```jsx
<div className="terminal-header">
  <span className="terminal-dots">
    <span className="dot dot-red">●</span>
    <span className="dot dot-yellow">●</span>
    <span className="dot dot-green">●</span>
  </span>
  <span className="terminal-title">~/section-name --flag</span>
  <span className="terminal-minimize">_</span>
</div>
```

#### **CSS Implementation**
```css
.terminal-header {
  background: var(--dartmouth-green);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--brunswick-green);
  border-radius: 12px 12px 0 0;
}

.terminal-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
}

.dot-red { background: #ff5f57; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #28ca42; }

.terminal-title {
  color: var(--nyanza);
  font-size: 14px;
  font-weight: bold;
  font-family: var(--mono-font);
}

.terminal-minimize {
  color: var(--celadon);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
```

### **Section Components Breakdown**

#### **1. Hero Component**

**Purpose**: Landing section with boot animation and name display  
**Key Features**: Matrix background, boot sequence, glitch text  
**File**: `src/components/Hero.js`

```jsx
// Core structure
const Hero = () => {
  const [bootStage, setBootStage] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const bootSequence = [
      () => setBootStage(1), // BIOS
      () => setBootStage(2), // Kernel  
      () => setBootStage(3), // Services
      () => setBootStage(4), // Network
      () => setBootStage(5), // User profile
      () => setShowMainContent(true)
    ];
    
    bootSequence.forEach((stage, index) => {
      setTimeout(stage, (index + 1) * 800);
    });
  }, []);

  return (
    <section className="hero-section">
      {/* Matrix background animation */}
      <div className="matrix-bg">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="matrix-column" style={{ '--delay': `${i * 0.1}s` }}>
            {/* Generated characters */}
          </div>
        ))}
      </div>
      
      {/* Main terminal content */}
      <div className="hero-terminal proficiency-card">
        <div className="terminal-header">{/* ... */}</div>
        <div className="terminal-body">
          {/* Boot sequence */}
          <div className="boot-sequence">
            {/* Staged boot messages */}
          </div>
          
          {showMainContent && (
            <div className="main-content">
              <h1 className="name-display">
                <GlitchText speed={3} enableOnHover={true}>
                  KEAN LOUIS ROSALES
                </GlitchText>
              </h1>
              {/* Role and status information */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
```

#### **2. Projects Component**

**Purpose**: Showcase of featured projects with modal details  
**Key Features**: Grid layout, click-to-expand modals, tech stack display  
**File**: `src/components/Projects.js`

```jsx
const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <div className="projects-terminal proficiency-card">
          <div className="terminal-header">{/* ... */}</div>
          <div className="terminal-body">
            {isVisible && (
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className="project-card"
                    style={{ '--delay': `${index * 0.15}s` }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Project content */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Modal for project details */}
        {selectedProject && (
          <div className="project-modal" onClick={() => setSelectedProject(null)}>
            {/* Detailed project information */}
          </div>
        )}
      </div>
    </section>
  );
};
```

#### **3. Hackathons Component**

**Purpose**: Competition achievements in leaderboard format  
**Key Features**: Ranking system, statistics overview, achievement badges  
**File**: `src/components/Hackathons.js`

```jsx
const hackathons = [
  {
    id: 'dlsu-hackercup-2025',
    name: 'DLSU HackerCup 2025',
    position: 'Champion',
    project: 'KitaKita',
    achievement: 'Champion 🏆',
    rank: 1,
    participants: '100+',
    prize: 'Grand Prize'
  },
  // ... more hackathons
];

// Color coding based on rank
const getRankColor = (rank) => {
  if (rank === 1) return 'var(--mint)';
  if (rank <= 3) return 'var(--celadon)';
  if (rank <= 5) return 'var(--celadon-2)';
  return 'var(--nyanza)';
};
```

#### **4. Extra Component (Interactive Terminal)**

**Purpose**: Full terminal emulation with command system  
**Key Features**: File system simulation, command history, CTF challenges  
**File**: `src/components/Extra.js`

```jsx
// Terminal state management
const [terminalInput, setTerminalInput] = useState('');
const [terminalHistory, setTerminalHistory] = useState([]);
const [commandHistory, setCommandHistory] = useState([]);
const [currentDir, setCurrentDir] = useState('/home/kean');
const [historyIndex, setHistoryIndex] = useState(-1);

// File system simulation
const fileSystem = {
  '/home/kean': {
    type: 'dir',
    contents: {
      'portfolio': { type: 'dir', contents: {
        'projects.txt': { type: 'file', content: 'Project listings...' },
        'skills.txt': { type: 'file', content: 'Technical skills...' }
      }},
      'about.txt': { type: 'file', content: 'Personal information...' }
    }
  }
};

// Command processing
const handleTerminalSubmit = (e) => {
  e.preventDefault();
  const [command, ...args] = terminalInput.trim().split(' ');
  
  switch (command.toLowerCase()) {
    case 'ls':
      // List directory contents
      break;
    case 'cd':
      // Change directory
      break;
    case 'cat':
      // Display file contents
      break;
    case 'ctf':
      // Launch CTF challenges
      break;
    // ... more commands
  }
};
```

---

## Animation Systems

### **1. Matrix Rain Background**

**Location**: Hero section background  
**Purpose**: Ambient cyberpunk atmosphere  
**Implementation**: CSS animations with staggered delays

#### **JavaScript Structure**
```jsx
// Generate 50 animated columns
<div className="matrix-bg">
  {Array.from({ length: 50 }, (_, i) => (
    <div key={i} className="matrix-column" style={{ '--delay': `${i * 0.1}s` }}>
      {Array.from({ length: 20 }, (_, j) => (
        <span key={j} className="matrix-char">
          {Math.random() > 0.5 
            ? String.fromCharCode(0x30A0 + Math.random() * 96) 
            : Math.random().toString(36)[0]
          }
        </span>
      ))}
    </div>
  ))}
</div>
```

#### **CSS Animation**
```css
.matrix-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.1;
  pointer-events: none;
}

.matrix-column {
  position: absolute;
  top: -100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: var(--mint);
  animation: matrix-rain 8s linear infinite;
  animation-delay: var(--delay);
}

.matrix-column:nth-child(odd) {
  left: calc(var(--delay) * 50px);
}

.matrix-column:nth-child(even) {
  right: calc(var(--delay) * 30px);
}

@keyframes matrix-rain {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}

.matrix-char {
  opacity: 0.7;
  transition: opacity 0.1s;
}

/* Mobile optimization */
@media (max-width: 480px) {
  .matrix-bg {
    opacity: 0.05; /* Reduce intensity on mobile */
  }
  
  .matrix-column {
    font-size: 10px;
  }
}
```

### **2. Boot Sequence Animation**

**Location**: Hero section terminal  
**Purpose**: System startup simulation  
**Implementation**: Staged state updates with timeouts

#### **JavaScript Logic**
```jsx
const [bootStage, setBootStage] = useState(0);
const [showMainContent, setShowMainContent] = useState(false);

useEffect(() => {
  const bootSequence = [
    () => setBootStage(1), // BIOS v2.1.3 - System POST
    () => setBootStage(2), // Loading Linux kernel 6.5.0-hacker  
    () => setBootStage(3), // Starting system services
    () => setBootStage(4), // Network interface initialized
    () => setBootStage(5), // Loading user profile: kean.rosales
    () => setShowMainContent(true) // Show main content
  ];
  
  let timeouts = [];
  bootSequence.forEach((stage, index) => {
    timeouts.push(setTimeout(stage, (index + 1) * 800));
  });
  
  // Cleanup timeouts
  return () => timeouts.forEach(clearTimeout);
}, []);
```

#### **CSS Animations**
```css
.boot-line {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 8px;
  font-family: var(--mono-font);
  font-size: 14px;
  opacity: 0;
  animation: fade-in-boot 0.5s ease forwards;
}

.boot-status.ok {
  color: var(--mint);
}

.main-content {
  opacity: 0;
  animation: fade-in-main 1s ease 0.5s forwards;
}

@keyframes fade-in-boot {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes fade-in-main {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
```

### **3. Glitch Text Effect**

**Location**: Name display, section headers  
**Purpose**: Cyberpunk text distortion  
**Implementation**: CSS pseudo-elements with clip-path

#### **React Component**
```jsx
const GlitchText = ({ children, speed = 2, enableOnHover = false }) => {
  return (
    <span 
      className={`glitch ${enableOnHover ? 'enable-on-hover' : ''}`}
      data-text={children}
      style={{
        '--after-duration': `${speed}s`,
        '--before-duration': `${speed - 0.5}s`
      }}
    >
      {children}
    </span>
  );
};
```

#### **CSS Implementation**
```css
.glitch {
  position: relative;
  user-select: none;
  cursor: pointer;
}

.glitch::after,
.glitch::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  color: #fff;
  background-color: #060010;
  overflow: hidden;
  clip-path: inset(0 0 0 0);
}

/* Continuous glitch effect */
.glitch:not(.enable-on-hover)::after {
  left: 10px;
  text-shadow: var(--after-shadow, -10px 0 var(--mint));
  animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse;
}

.glitch:not(.enable-on-hover)::before {
  left: -10px;
  text-shadow: var(--before-shadow, 10px 0 var(--celadon));
  animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse;
}

/* Hover-triggered glitch */
.glitch.enable-on-hover:hover::after {
  content: attr(data-text);
  opacity: 1;
  left: 10px;
  text-shadow: -10px 0 red;
  animation: animate-glitch 3s infinite linear alternate-reverse;
}

.glitch.enable-on-hover:hover::before {
  content: attr(data-text);
  opacity: 1;
  left: -10px;
  text-shadow: 10px 0 cyan;
  animation: animate-glitch 2s infinite linear alternate-reverse;
}

@keyframes animate-glitch {
  0% { clip-path: inset(20% 0 50% 0); }
  5% { clip-path: inset(10% 0 60% 0); }
  10% { clip-path: inset(15% 0 55% 0); }
  15% { clip-path: inset(25% 0 35% 0); }
  20% { clip-path: inset(30% 0 40% 0); }
  25% { clip-path: inset(40% 0 20% 0); }
  30% { clip-path: inset(10% 0 60% 0); }
  35% { clip-path: inset(15% 0 55% 0); }
  40% { clip-path: inset(25% 0 35% 0); }
  45% { clip-path: inset(30% 0 40% 0); }
  50% { clip-path: inset(20% 0 50% 0); }
  55% { clip-path: inset(10% 0 60% 0); }
  60% { clip-path: inset(15% 0 55% 0); }
  65% { clip-path: inset(25% 0 35% 0); }
  70% { clip-path: inset(30% 0 40% 0); }
  75% { clip-path: inset(40% 0 20% 0); }
  80% { clip-path: inset(20% 0 50% 0); }
  85% { clip-path: inset(10% 0 60% 0); }
  90% { clip-path: inset(15% 0 55% 0); }
  95% { clip-path: inset(25% 0 35% 0); }
  100% { clip-path: inset(30% 0 40% 0); }
}
```

### **4. Scroll-triggered Animations**

**Location**: All major sections  
**Purpose**: Progressive revelation of content  
**Implementation**: Intersection Observer API

#### **Hook Implementation**
```jsx
const useScrollAnimation = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold]);

  return [isVisible, sectionRef];
};
```

#### **Staggered Card Animations**
```jsx
// Projects grid with staggered entrance
<div className="projects-grid">
  {projects.map((project, index) => (
    <div 
      key={project.id} 
      className="project-card"
      style={{ '--delay': `${index * 0.15}s` }}
    >
      {/* Project content */}
    </div>
  ))}
</div>
```

```css
.project-card {
  opacity: 0;
  transform: translateY(30px);
  animation: slide-in-up 0.6s ease forwards;
  animation-delay: var(--delay);
}

@keyframes slide-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### **5. Utility Animations**

#### **Pulse Effect**
```css
@keyframes pulse {
  0%, 50% { opacity: 1; }
  25%, 75% { opacity: 0.7; }
}

.ready-indicator {
  animation: pulse 2s infinite;
}

.status-value.active {
  animation: pulse 2s infinite;
}
```

#### **Blink Effect**
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.scroll-text {
  animation: blink 1.5s infinite;
}
```

#### **Cursor Animation**
```css
@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.resume-cursor {
  animation: cursor-blink 1.2s infinite;
}
```

#### **Bounce Effect**
```css
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.scroll-arrow {
  animation: bounce 2s infinite;
}
```

---

## Interactive Elements

### **1. Terminal Command System**

**Location**: Extra component mini-terminal  
**Purpose**: Full command-line interface simulation  
**Implementation**: Command parsing with switch statements

#### **Available Commands**

| Command | Function | Example Usage |
|---------|----------|---------------|
| `help` | Display available commands | `help` |
| `ls` | List directory contents | `ls`, `ls -la` |
| `cd` | Change directory | `cd portfolio`, `cd ..` |
| `pwd` | Print working directory | `pwd` |
| `cat` | Display file contents | `cat about.txt` |
| `whoami` | Display user information | `whoami` |
| `about` | Show brief profile | `about` |
| `skills` | Display technical skills | `skills` |
| `projects` | Show recent projects | `projects` |
| `ctf` | Launch CTF challenges | `ctf`, `ctf 1`, `ctf 2`, `ctf 3` |
| `resume` | Download resume PDF | `resume` |
| `download` | Download files | `download resume` |
| `wget` | Download via wget | `wget resume.pdf` |
| `curl` | Download via curl | `curl /resume.pdf` |
| `history` | Show command history | `history` |
| `clear` | Clear terminal output | `clear` |
| `easteregg` | Hidden surprise | `easteregg` |

#### **Command Processing Implementation**
```jsx
const handleTerminalSubmit = (e) => {
  e.preventDefault();
  if (!terminalInput.trim()) return;
  
  const fullCommand = terminalInput.trim();
  const [command, ...args] = fullCommand.split(' ');
  const cmd = command.toLowerCase();
  
  // Add to command history
  setCommandHistory(prev => {
    const newHistory = [fullCommand, ...prev.filter(h => h !== fullCommand)].slice(0, 50);
    return newHistory;
  });
  
  let response = '';
  let newDir = currentDir;

  switch (cmd) {
    case 'help':
      response = `Available commands:\n\nNavigation:\n  ls, cd, pwd\n\nFile operations:\n  cat, history\n\nSystem info:\n  whoami, date, uname\n\nPortfolio info:\n  about, skills, projects\n\nDownloads:\n  resume, download resume\n\nChallenges:\n  ctf - Launch CTF challenges\n\nOther:\n  clear, easteregg`;
      break;
      
    case 'ls':
      const currentNode = getCurrentNode(currentDir);
      if (currentNode && currentNode.type === 'dir') {
        const items = Object.keys(currentNode.contents || {});
        response = items.length > 0 ? items.join('  ') : 'Directory is empty';
      } else {
        response = 'ls: cannot access directory';
      }
      break;
      
    // ... additional command implementations
  }
  
  setTerminalHistory(prev => [...prev, { 
    command: fullCommand, 
    response, 
    timestamp: getCurrentTimestamp(),
    directory: currentDir 
  }]);
};
```

#### **File System Simulation**
```jsx
const fileSystem = {
  '/home/kean': {
    type: 'dir',
    contents: {
      'portfolio': { 
        type: 'dir', 
        contents: {
          'projects.txt': { 
            type: 'file', 
            content: 'DLSU HackerCup 2025 Winner - KitaKita\nInventi Hackathon 2nd Place - Inventisolve\nFiMO Communication Glove\nReal-time Threat Detection System' 
          },
          'skills.txt': { 
            type: 'file', 
            content: 'Programming:\n  Python, C++, React, Node.js\n\nCybersecurity:\n  Kali Linux, Digital Forensics\n\nHardware:\n  Arduino, Sensor Integration' 
          }
        }
      },
      'documents': { 
        type: 'dir', 
        contents: {
          'resume.pdf': { 
            type: 'file', 
            content: 'Resume download available via: resume command',
            downloadUrl: '/resume.pdf' 
          }
        }
      },
      'about.txt': { 
        type: 'file', 
        content: 'Kean Louis R. Rosales\n\nCybersecurity Specialist & Full-Stack Developer\nDLSU HackerCup 2025 Champion\nInventi Hackathon 2025 - 2nd Place' 
      }
    }
  }
};
```

### **2. CTF Challenge System**

**Purpose**: Interactive cybersecurity challenges  
**Implementation**: Modal-based challenge interface with flag validation

#### **Challenge Structure**
```jsx
const ctfChallenges = {
  easy: {
    title: "Pirate's First Code",
    category: "Cryptography",
    description: "Caesar cipher decryption challenge",
    encryptedMessage: "Wkh wuhdvxuh lv klgghq xqghu wkh rog rdn wuhh",
    flag: "CTF{the_treasure_is_hidden_under_the_old_oak_tree}",
    hint: "Try shifting the letters by different amounts..."
  },
  medium: {
    title: "Marine Intelligence",
    category: "Forensics",
    description: "File integrity verification challenge",
    hashes: {
      md5: "5d41402abc4b2a76b9719d911017c592",
      sha1: "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
      sha256: "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
    },
    flag: "CTF{file_integrity_compromised_mission_exposed}"
  },
  hard: {
    title: "The Road to Laugh Tale",
    category: "Multi-Stage Cryptography",
    description: "One Piece themed multi-step challenge",
    flag: "CTF{GOMU_GOMU_LAUGHTALE_ONEPIECE_CIPHER}"
  }
};
```

#### **Flag Validation**
```jsx
const handleCtfSubmit = (e) => {
  e.preventDefault();
  if (!ctfInput.trim()) return;
  
  const flag = ctfInput.trim();
  
  if (flag === currentCtfChallenge.flag) {
    // Success handling based on challenge type
    if (currentCtfChallenge.type === 'easy') {
      setCtfStatus('🏴‍☠️ Congratulations! You\'ve found the treasure!\n\nThe Caesar cipher shifts each letter by 3 positions.');
    } else if (currentCtfChallenge.type === 'medium') {
      setCtfStatus('🎯 Excellent detective work!\n\nFile integrity verification detected tampering.');
    } else if (currentCtfChallenge.type === 'hard') {
      setCtfStatus('🏆 INCREDIBLE! You\'ve reached Laugh Tale!');
    }
  } else {
    setCtfStatus(`❌ Incorrect flag. Try again!\n\n💡 Hint: ${currentCtfChallenge.hint}`);
  }
  
  setCtfInput('');
};
```

### **3. Modal System**

**Purpose**: Detailed project information and CTF challenges  
**Implementation**: Click-to-expand with backdrop blur

#### **Modal Structure**
```jsx
// Project modal
{selectedProject && (
  <div className="project-modal" onClick={() => setSelectedProject(null)}>
    <div className="modal-terminal proficiency-card" onClick={(e) => e.stopPropagation()}>
      <div className="terminal-header">
        <span className="terminal-dots">{/* ... */}</span>
        <span className="terminal-title">~/projects/{selectedProject.id} --details</span>
        <button className="close-button" onClick={() => setSelectedProject(null)}>×</button>
      </div>
      <div className="modal-body">
        {/* Detailed project information */}
      </div>
    </div>
  </div>
)}
```

#### **Modal Styling**
```css
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(8, 28, 21, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-terminal {
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.close-button {
  background: transparent;
  border: none;
  color: var(--celadon);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: var(--mint);
}
```

### **4. Keyboard Navigation**

**Purpose**: Enhanced terminal experience  
**Implementation**: Arrow key command history

```jsx
const handleKeyDown = (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (commandHistory.length > 0) {
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setTerminalInput(commandHistory[newIndex] || '');
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setTerminalInput(commandHistory[newIndex] || '');
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setTerminalInput('');
    }
  }
};
```

---

## Key Features

### **1. Responsive Design**
- Mobile-first approach with touch optimization
- Breakpoints: 480px, 768px, 1200px
- Touch-friendly button sizes (44px minimum)
- iOS zoom prevention on inputs

### **2. Accessibility**
- High contrast color ratios
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support

### **3. Performance Optimizations**
- CSS transforms for smooth animations
- `will-change` properties for GPU acceleration
- Efficient intersection observers for scroll animations
- Font preloading for consistent typography

### **4. Interactive Terminal**
- Full command-line interface simulation
- File system navigation
- Command history with arrow key support
- CTF challenge integration
- Resume download functionality

---

## Technical Stack

### **Core Technologies**
- **React 18** - Component framework
- **CSS3** - Styling and animations
- **Tailwind CSS** - Utility classes (selective usage)
- **JavaScript ES6+** - Interactive functionality

### **Key Dependencies**
- **Intersection Observer API** - Scroll-triggered animations
- **Web Animations API** - Complex animation sequences
- **CSS Custom Properties** - Consistent theming
- **Flexbox/Grid** - Layout systems

### **Build Tools**
- **Create React App** - Development environment
- **React Scripts** - Build process
- **PostCSS** - CSS processing

---

## File Structure

```
my-website/src/
├── components/
│   ├── Hero.js              # Main landing section
│   ├── About.js             # About/proficiencies  
│   ├── Projects.js          # Project showcase
│   ├── Hackathons.js        # Competition leaderboard
│   ├── Extra.js             # Interactive terminal
│   ├── Contact.js           # Contact information
│   ├── Navigation.js        # Site navigation
│   └── utility/
│       ├── GlitchText.js    # Text glitch effects
│       └── TextType.js      # Typewriter animation
├── styles/
│   └── globals.css          # Global styles & variables
└── assets/
    └── (media files)
```

---

## Browser Support

### **Modern Browser Features**
- CSS Custom Properties
- Flexbox & Grid
- Intersection Observer
- Web Animations API
- ES6+ JavaScript features

### **Fallback Strategy**
- Graceful degradation for older browsers
- Progressive enhancement approach
- Font stack fallbacks for typography consistency

---

*This documentation covers the core aspects of the Kean Rosales portfolio website. For specific implementation details or component modifications, refer to the individual component files and their associated CSS modules.*
