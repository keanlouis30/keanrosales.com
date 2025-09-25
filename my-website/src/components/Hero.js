import React, { useState, useEffect } from 'react';
import './Hero.css';
import GlitchText from './GlitchText';
import TextType from './TextType';
import '../Proficiencies.css';

const Hero = () => {
  const [bootStage, setBootStage] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const bootSequence = [
      () => setBootStage(1), // BIOS
      () => setBootStage(2), // Loading kernel
      () => setBootStage(3), // System services
      () => setBootStage(4), // Network
      () => setBootStage(5), // User profile
      () => setShowMainContent(true), // Show main content
    ];

    let timeouts = [];
    bootSequence.forEach((stage, index) => {
      timeouts.push(setTimeout(stage, (index + 1) * 800));
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="matrix-bg">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="matrix-column" style={{ '--delay': `${i * 0.1}s` }}>
            {Array.from({ length: 20 }, (_, j) => (
              <span key={j} className="matrix-char">
                {Math.random() > 0.5 ? String.fromCharCode(0x30A0 + Math.random() * 96) : Math.random().toString(36)[0]}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="hero-terminal proficiency-card">
        <div className="terminal-header">
          <span className="terminal-dots">
            <span className="dot dot-red">●</span>
            <span className="dot dot-yellow">●</span>
            <span className="dot dot-green">●</span>
          </span>
          <span className="terminal-title">~/kean-rosales --init</span>
          <span className="terminal-minimize">_</span>
        </div>

        <div className="terminal-body">
          <div className="boot-sequence">
            {bootStage >= 1 && (
              <div className="boot-line">
                <span className="boot-time">[0.001]</span>
                <span className="boot-text">BIOS v2.1.3 - System POST</span>
                <span className="boot-status ok">[OK]</span>
              </div>
            )}
            
            {bootStage >= 2 && (
              <div className="boot-line">
                <span className="boot-time">[0.234]</span>
                <span className="boot-text">Loading Linux kernel 6.5.0-hacker</span>
                <span className="boot-status ok">[OK]</span>
              </div>
            )}
            
            {bootStage >= 3 && (
              <div className="boot-line">
                <span className="boot-time">[0.891]</span>
                <span className="boot-text">Starting system services</span>
                <span className="boot-status ok">[OK]</span>
              </div>
            )}
            
            {bootStage >= 4 && (
              <div className="boot-line">
                <span className="boot-time">[1.203]</span>
                <span className="boot-text">Network interface initialized</span>
                <span className="boot-status ok">[OK]</span>
              </div>
            )}
            
            {bootStage >= 5 && (
              <div className="boot-line">
                <span className="boot-time">[1.445]</span>
                <span className="boot-text">Loading user profile: kean.rosales</span>
                <span className="boot-status ok">[OK]</span>
              </div>
            )}
          </div>

          {showMainContent && (
            <div className="main-content">
              <div className="system-ready">
                <span className="ready-indicator">●</span>
                <span className="ready-text">SYSTEM READY</span>
              </div>

              <div className="user-info">
                <div className="prompt-line">
                  <span className="prompt">root@portfolio:~$</span>
                  <span className="command">whoami</span>
                </div>
                
                <div className="output">
                  <h1 className="name-display">
                    <GlitchText speed={3} enableOnHover={true}>
                      KEAN LOUIS ROSALES
                    </GlitchText>
                  </h1>
                  
                  <div className="role-container">
                    <span className="role-prefix">></span>
                    <TextType 
                      text="DLSU HackerCup 2025 Champion | Cybersecurity Specialist | Full-Stack Developer"
                      typingSpeed={50}
                      className="role-text"
                      showCursor={true}
                      loop={false}
                    />
                  </div>

                  <div className="status-info">
                    <div className="status-line">
                      <span className="status-label">STATUS:</span>
                      <span className="status-value active">Available for collaboration</span>
                    </div>
                    <div className="status-line">
                      <span className="status-label">LOCATION:</span>
                      <span className="status-value">Metro Manila, Philippines</span>
                    </div>
                    <div className="status-line">
                      <span className="status-label">SPECIALIZATION:</span>
                      <span className="status-value">Network & Information Security</span>
                    </div>
                  </div>

                  <div className="resume-section">
                    <div className="terminal-command">
                      <span className="prompt">kean@portfolio:~$</span>
                      <span className="command">wget resume.pdf</span>
                    </div>
                    
                    <div className="resume-download">
                      <a 
                        href="/Rosales, Kean Louis.pdf" 
                        download="Rosales_Kean_Louis_Resume.pdf"
                        className="resume-button"
                        aria-label="Download Kean Rosales Resume PDF"
                      >
                        <span className="resume-prompt">$ cat </span>
                        <span className="resume-filename">resume.pdf</span>
                        <span className="resume-cursor">_</span>
                      </a>
                    </div>
                  </div>

                  <div className="boot-complete">
                    <div className="scroll-indicator">
                      <span className="scroll-text">[SCROLL TO EXPLORE]</span>
                      <div className="scroll-arrow">↓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
