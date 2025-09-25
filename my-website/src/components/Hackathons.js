import React, { useState, useRef, useEffect } from 'react';
import './Hackathons.css';
import GlitchText from './GlitchText';
import '../Proficiencies.css';

const Hackathons = () => {
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

  const hackathons = [
    {
      id: 'dlsu-ctf-2025',
      name: 'DLSU CTF 2025',
      position: 'Champion',
      project: 'Cybersecurity Competition',
      date: '2025',
      description: 'Capture The Flag cybersecurity competition - network security, cryptography, and penetration testing challenges',
      achievement: 'Champion 🏆',
      rank: 1,
      participants: '50+',
      prize: 'First Place'
    },
    {
      id: 'dlsu-ctf-2024',
      name: 'DLSU CTF 2024',
      position: '4th Place',
      project: 'Cybersecurity Competition',
      date: '2024',
      description: 'Previous year CTF competition - improved from 4th to 1st place in following year',
      achievement: '4th Place 🏅',
      rank: 4,
      participants: '45+',
      prize: 'Merit Award'
    },
    {
      id: 'dlsu-hackercup-2025',
      name: 'DLSU HackerCup 2025',
      position: 'Champion',
      project: 'KitaKita',
      date: '2025',
      description: 'Messenger-based POS system for small neighborhood stores',
      achievement: 'Champion 🏆',
      rank: 1,
      participants: '100+',
      prize: 'Grand Prize'
    },
    {
      id: 'tenext-codebreak-20',
      name: 'Tenext.ai Codebreak 2.0',
      position: 'Top 5 Finalist',
      project: 'Neosolutions',
      date: '2024',
      description: 'Custom ticketing and support system for enterprise needs',
      achievement: 'Top 5 Finalist 🥇',
      rank: 5,
      participants: '200+',
      prize: 'Finalist Award'
    },
    {
      id: 'flutterflow-manila',
      name: 'FlutterFlow Development Group Manila Hackathon',
      position: '3rd Place',
      project: 'Procrash',
      date: '2024',
      description: 'Gamified to-do list mobile application with RPG elements',
      achievement: '3rd Place 🥉',
      rank: 3,
      participants: '80+',
      prize: 'Bronze Medal'
    },
    {
      id: 'springboards-hackit',
      name: 'SpringBoards hack-it',
      position: '4th Place',
      project: 'Kachingko',
      date: '2024',
      description: 'OCR-powered financial management mobile application',
      achievement: '4th Place 🏅',
      rank: 4,
      participants: '120+',
      prize: 'Merit Award'
    },
    {
      id: 'kmc-solutions',
      name: 'KMC Solutions Hackathon',
      position: 'Special Awardee',
      project: 'Talento',
      date: '2024',
      description: 'Video resume platform with TikTok-style HR interface. Judges: "The idea was so good we had to create an award for it."',
      achievement: 'Special Award ⭐',
      rank: 'Special',
      participants: '90+',
      prize: 'Innovation Award'
    }
  ];

  const getRankColor = (rank) => {
    if (rank === 1) return 'var(--mint)';
    if (rank <= 3) return 'var(--celadon)';
    if (rank <= 5) return 'var(--celadon-2)';
    return 'var(--nyanza)';
  };

  return (
    <section id="hackathons" className="hackathons-section" ref={sectionRef}>
      <div className="hackathons-container">
        <div className="hackathons-terminal proficiency-card">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot dot-red">●</span>
              <span className="dot dot-yellow">●</span>
              <span className="dot dot-green">●</span>
            </span>
            <span className="terminal-title">~/competitions --leaderboard</span>
            <span className="terminal-minimize">_</span>
          </div>

          <div className="terminal-body">
            <div className="terminal-command">
              <span className="prompt">kean@portfolio:~$</span>
              <span className="command">sort -k2 -nr hackathons.log | head -10</span>
            </div>

            {isVisible && (
              <div className="terminal-output-block hackathons-content">
                <div className="stats-overview">
                  <div className="stat-item">
                    <span className="stat-value">7+</span>
                    <span className="stat-label">Competitions</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">3</span>
                    <span className="stat-label">Champions</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">6</span>
                    <span className="stat-label">Top 5 Finishes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">Award Rate</span>
                  </div>
                </div>

                <div className="leaderboard">
                  <div className="leaderboard-header">
                    <span className="header-rank">RANK</span>
                    <span className="header-competition">COMPETITION</span>
                    <span className="header-project">PROJECT</span>
                    <span className="header-achievement">ACHIEVEMENT</span>
                  </div>

                  <div className="leaderboard-entries">
                    {hackathons.map((hackathon, index) => (
                      <div 
                        key={hackathon.id} 
                        className="leaderboard-entry"
                        style={{ '--delay': `${index * 0.1}s`, '--rank-color': getRankColor(hackathon.rank) }}
                      >
                        <div className="entry-rank">
                          <span className="rank-number">{hackathon.rank === 'Special' ? '★' : `#${hackathon.rank}`}</span>
                        </div>

                        <div className="entry-competition">
                          <div className="competition-name">
                            <GlitchText speed={2} enableOnHover={true}>
                              {hackathon.name}
                            </GlitchText>
                          </div>
                          <div className="competition-date">{hackathon.date}</div>
                          <div className="competition-participants">{hackathon.participants} participants</div>
                        </div>

                        <div className="entry-project">
                          <div className="project-name">{hackathon.project}</div>
                          <div className="project-desc">{hackathon.description}</div>
                        </div>

                        <div className="entry-achievement">
                          <span className="achievement-badge">{hackathon.achievement}</span>
                          <span className="prize-info">{hackathon.prize}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="summary-stats">
                  <div className="command-line">
                    <span className="prompt">kean@portfolio:~$</span>
                    <span className="command">grep -c "winner\|champion\|finalist" hackathons.log</span>
                  </div>
                  
                  <div className="summary-text">
                    <p className="summary-line">
                      <span className="summary-label">TOTAL COMPETITIONS:</span>
                      <span className="summary-value">7</span>
                    </p>
                    <p className="summary-line">
                      <span className="summary-label">WIN RATE:</span>
                      <span className="summary-value">100% (All competitions resulted in awards)</span>
                    </p>
                    <p className="summary-line">
                      <span className="summary-label">CTF IMPROVEMENT:</span>
                      <span className="summary-value">4th → 1st Place (2024-2025)</span>
                    </p>
                    <p className="summary-line">
                      <span className="summary-label">SPECIALIZATION:</span>
                      <span className="summary-value">Full-Stack Development, Mobile Apps, Fintech, HR Tech</span>
                    </p>
                    <p className="summary-line">
                      <span className="summary-label">IMPACT:</span>
                      <span className="summary-value">Solutions for SMEs, Enterprise, Healthcare, and Employment</span>
                    </p>
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

export default Hackathons;
