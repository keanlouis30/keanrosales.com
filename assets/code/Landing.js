import React, { useEffect, useRef } from 'react';
import './Landing.css';
import LetterGlitch from './LetterGlitch';
import TextType from './TextType';

const Landing = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll indicator animation
    if (scrollRef.current) {
      scrollRef.current.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(10px)' },
        { transform: 'translateY(0)' }
      ], {
        duration: 1500,
        iterations: Infinity
      });
    }
  }, []);

  return (
    <section className="landing satoshi-font">
      <div className="letter-glitch-background">
        <LetterGlitch 
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      <div className="container">
        <div className="landing-content">
          <div className="landing-text">
            <TextType 
              text="hey, i'm kean, a fourth-year student at de la salle university taking a bachelor of science in computer science major in network and information security"
              as="h1"
              className="typewriter-text"
              typingSpeed={40}
              showCursor={true}
              cursorCharacter="|"
              cursorBlinkDuration={0.7}
              loop={false}
              aria-label="Introduction"
            />
          </div>
          <div className="scroll-indicator" ref={scrollRef}>
            <p>scroll down</p>
            <div className="scroll-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

