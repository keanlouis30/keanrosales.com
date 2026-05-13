import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const mainNavItems = [
    { id: 'hero', label: 'init', symbol: '>' },
    { id: 'about', label: 'whoami', symbol: '$' },
    { id: 'proficiencies', label: 'skills', symbol: '&' },
    { id: 'projects', label: 'projects', symbol: '#' },
    { id: 'hackathons', label: 'competitions', symbol: '@' },
    { id: 'contact', label: 'connect', symbol: '*' },
    { id: 'extra', label: 'misc', symbol: '~' },
    { id: 'writeups', label: 'writeups', symbol: '!' }
  ];

  const writeupNavItems = [
    { id: 'home', label: 'cd ~/', symbol: '<' },
    { id: 'writeups', label: 'ls writeups/', symbol: '$' },
    { id: 'Arbitrary File Write', label: 'Arbitrary File Write', symbol: '-' },
    { id: 'Forged Coupon', label: 'Forged Coupon', symbol: '-' },
    { id: 'Forged Signed JWT', label: 'Forged Signed JWT', symbol: '-' },
    { id: 'Imaginary Challenge', label: 'Imaginary Challenge', symbol: '-' },
    { id: 'Login Support Team', label: 'Login Support Team', symbol: '-' },
    { id: 'Multiple Likes', label: 'Multiple Likes', symbol: '-' },
    { id: 'Premium Paywall', label: 'Premium Paywall', symbol: '-' },
    { id: 'SSRF', label: 'SSRF', symbol: '-' },
    { id: 'SSTI', label: 'SSTI', symbol: '-' },
    { id: 'Successful RCE DoS', label: 'Successful RCE DoS', symbol: '-' },
    { id: 'Video XSS', label: 'Video XSS', symbol: '-' },
    { id: 'Wallet Depletion', label: 'Wallet Depletion', symbol: '-' }
  ];

  const isWriteupsRoute = location.pathname.startsWith('/writeups');
  const navItems = isWriteupsRoute ? writeupNavItems : mainNavItems;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isWriteupsRoute) {
      if (location.pathname === '/writeups') {
        setActiveSection('writeups');
      } else {
        const pathParts = location.pathname.split('/');
        if (pathParts.length > 2) {
          setActiveSection(decodeURIComponent(pathParts[2]));
        }
      }
      return;
    }

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
  }, [location.pathname, isWriteupsRoute, navItems]);

  const handleNavClick = (sectionId) => {
    if (sectionId === 'home') {
      navigate('/');
      return;
    }

    if (sectionId === 'writeups') {
      navigate('/writeups');
      return;
    }

    if (isWriteupsRoute) {
      navigate(`/writeups/${encodeURIComponent(sectionId)}`);
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`terminal-nav ${isVisible ? 'nav-visible' : ''} ${isCollapsed ? 'nav-collapsed' : ''}`}>
        <div className="nav-terminal">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span 
                className="dot dot-red clickable" 
                onClick={() => setIsCollapsed(true)}
                title="Hide navigation"
              >●</span>
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
                  onClick={() => handleNavClick(item.id)}
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

      {isCollapsed && (
        <button
          className="nav-show-button"
          onClick={() => setIsCollapsed(false)}
          aria-label="Show navigation"
          title="Show navigation"
        >
          &lt;
        </button>
      )}
    </>
  );
};

export default Navigation;
