import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'hero', label: 'init', symbol: '>' },
    { id: 'about', label: 'whoami', symbol: '$' },
    { id: 'proficiencies', label: 'skills', symbol: '&' },
    { id: 'projects', label: 'projects', symbol: '#' },
    { id: 'hackathons', label: 'competitions', symbol: '@' },
    { id: 'contact', label: 'connect', symbol: '*' },
    { id: 'extra', label: 'misc', symbol: '~' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`terminal-nav ${isVisible ? 'nav-visible' : ''} ${isCollapsed ? 'nav-collapsed' : ''}`}>
        <div className="nav-terminal">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot dot-red">●</span>
              <span className="dot dot-yellow">●</span>
              <span className="dot dot-green">●</span>
            </span>
            <span className="terminal-title">~/navigation</span>
            <span className="terminal-minimize">_</span>
          </div>
          <div className="nav-body">
            <div className="nav-prompt">
              <span className="prompt-text">$ ls sections/</span>
            </div>
            <div className="nav-items">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <span className="nav-symbol">{item.symbol}</span>
                  <span className="nav-label">{item.label}</span>
                  {activeSection === item.id && <span className="cursor-blink">_</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <button
        className={`nav-toggle ${isCollapsed ? 'toggle-show' : 'toggle-hide'}`}
        onClick={() => setIsCollapsed((c) => !c)}
        aria-label={isCollapsed ? 'Show navigation' : 'Hide navigation'}
      >
        <span className="toggle-icon">{isCollapsed ? '▤' : '✕'}</span>
        <span className="toggle-label">{isCollapsed ? 'menu' : 'hide'}</span>
      </button>
    </>
  );
};

export default Navigation;
