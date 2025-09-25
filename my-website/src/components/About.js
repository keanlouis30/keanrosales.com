import React, { useState, useRef, useEffect } from 'react';
import './About.css';
import TextType from './TextType';
import '../Proficiencies.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const achievements = [
    "🏆 DLSU HackerCup 2025 Champion",
    "🏆 DLSU CTF 2025 Champion",
    "🥇 Top 5 Finalist - Tenext.ai Codebreak 2.0",
    "🥉 3rd Place - FlutterFlow Development Group Manila Hackathon",
    "🏅 4th Place - DLSU CTF 2024",
    "🏅 4th Place - SpringBoards hack-it",
    "⭐ Special Awardee - KMC Solutions Hackathon",
    "🔬 1st Place Winner - Regional Science and Technology Fair"
  ];

  const certifications = [
    { 
      name: "Introduction to Digital Forensics", 
      org: "CYBER 5W", 
      year: "2025",
      id: "4uutnaybl0",
      course: "C5W-100",
      issued: "2025-02-04",
      link: "https://academy.cyber5w.com/certificates/4uutnaybl0"
    }
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        <div className="about-terminal proficiency-card">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot dot-red">●</span>
              <span className="dot dot-yellow">●</span>
              <span className="dot dot-green">●</span>
            </span>
            <span className="terminal-title">~/about --verbose</span>
            <span className="terminal-minimize">_</span>
          </div>

          <div className="terminal-body">
            <div className="terminal-command">
              <span className="prompt">kean@portfolio:~$</span>
              <span className="command">cat personal_info.json</span>
            </div>

            {isVisible && (
              <div className="terminal-output-block about-content">
                <div className="json-structure">
                  <div className="json-line">
                    <span className="json-bracket">{'{'}</span>
                  </div>
                  
                  <div className="json-property">
                    <span className="json-key">"name"</span>
                    <span className="json-colon">:</span>
                    <span className="json-value">"Kean Louis R. Rosales"</span>
                    <span className="json-comma">,</span>
                  </div>

                  <div className="json-property">
                    <span className="json-key">"education"</span>
                    <span className="json-colon">:</span>
                    <span className="json-bracket">{'{'}</span>
                  </div>

                  <div className="json-nested">
                    <div className="json-property">
                      <span className="json-key">"university"</span>
                      <span className="json-colon">:</span>
                      <span className="json-value">"De La Salle University"</span>
                      <span className="json-comma">,</span>
                    </div>
                    <div className="json-property">
                      <span className="json-key">"degree"</span>
                      <span className="json-colon">:</span>
                      <span className="json-value">"BS Computer Science (4th Year)"</span>
                      <span className="json-comma">,</span>
                    </div>
                    <div className="json-property">
                      <span className="json-key">"major"</span>
                      <span className="json-colon">:</span>
                      <span className="json-value">"Network & Information Security"</span>
                    </div>
                  </div>

                  <div className="json-property">
                    <span className="json-bracket">{'}'}</span>
                    <span className="json-comma">,</span>
                  </div>

                  <div className="json-property">
                    <span className="json-key">"thesis"</span>
                    <span className="json-colon">:</span>
                    <span className="json-bracket">{'{'}</span>
                  </div>

                  <div className="json-nested">
                    <div className="json-property">
                      <span className="json-key">"title"</span>
                      <span className="json-colon">:</span>
                      <span className="json-value">"Exploring Real-Time Automated Threat Detection and Response Against Ransomware Attacks using Software Defined Networking"</span>
                    </div>
                  </div>

                  <div className="json-property">
                    <span className="json-bracket">{'}'}</span>
                    <span className="json-comma">,</span>
                  </div>

                  <div className="json-property">
                    <span className="json-key">"bio"</span>
                    <span className="json-colon">:</span>
                    <div className="bio-content">
                      <TextType
                        text="Fourth-year Computer Science student at De La Salle University with a robust background in cybersecurity, software development, and technical instruction. Proven experience developing full-stack applications and automation solutions for international clients. Passionate about building innovative technology, from award-winning assistive communication devices to champion-level hackathon solutions."
                        typingSpeed={30}
                        className="bio-text"
                        showCursor={false}
                        loop={false}
                      />
                    </div>
                  </div>

                  <div className="json-line">
                    <span className="json-bracket">{'}'}</span>
                  </div>
                </div>

                <div className="achievements-section">
                  <div className="terminal-command">
                    <span className="prompt">kean@portfolio:~$</span>
                    <span className="command">ls achievements/</span>
                  </div>
                  
                  <div className="achievements-grid">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className="achievement-item"
                        style={{ '--delay': `${index * 0.1}s` }}
                      >
                        <span className="achievement-text">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="certifications-section">
                  <div className="terminal-command">
                    <span className="prompt">kean@portfolio:~$</span>
                    <span className="command">cat certifications.log</span>
                  </div>
                  
                  <div className="cert-list">
                    {certifications.map((cert, index) => (
                      <a 
                        key={index} 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-item cert-link"
                        aria-label={`View ${cert.name} certificate`}
                      >
                        <span className="cert-date">[{cert.issued}]</span>
                        <div className="cert-details">
                          <span className="cert-name">{cert.name}</span>
                          <span className="cert-course">{cert.course} - {cert.org}</span>
                          <span className="cert-id">ID: {cert.id}</span>
                        </div>
                        <span className="cert-external">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
