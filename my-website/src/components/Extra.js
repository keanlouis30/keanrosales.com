import React, { useState, useRef, useEffect } from 'react';
import './Extra.css';
import GlitchText from './GlitchText';
import TextType from './TextType';
import MusicPlayer from './MusicPlayer';
import '../Proficiencies.css';

const Extra = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/home/kean');
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [showGamingModal, setShowGamingModal] = useState(false);
  const [showReadingModal, setShowReadingModal] = useState(false);
  const [showSportsModal, setShowSportsModal] = useState(false);
  const sectionRef = useRef(null);
  const terminalInputRef = useRef(null);

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

  const fileSystem = {
    '/home/kean': {
      type: 'dir',
      contents: {
        'portfolio': { type: 'dir', contents: {
          'projects.txt': { type: 'file', content: 'HackerCup Winner\nFiMO Communication Glove\nMessenger POS System\nTicketing Platform' },
          'skills.txt': { type: 'file', content: 'Programming:\n  Python, C++, React, Node.js\n\nCybersecurity:\n  Kali Linux, Wireshark, Nmap\n  Digital Forensics, Threat Detection\n\nOther:\n  Technical Writing, Instruction\n  Hardware & Robotics' }
        }},
        'documents': { type: 'dir', contents: {
          'resume.pdf': { type: 'file', content: 'Kean Louis R. Rosales - Resume\nCybersecurity Specialist & Full-Stack Developer\n\n📄 To download the full resume PDF, use: download resume', downloadUrl: '/resume.pdf' }
        }},
        'about.txt': { type: 'file', content: 'Kean Louis R. Rosales\n\nCybersecurity Specialist & Full-Stack Developer\nDLSU HackerCup 2025 Champion\n\nPassionate about building secure, innovative solutions.\n\nContact: Open to collaboration and opportunities!' },
        'achievements.txt': { type: 'file', content: '🏆 Won 5 hackathons in a row\n🛠️  Built assistive communication glove (FiMO)\n💻 Developed multiple full-stack applications\n📚 Published researcher in AR/VR and cybersecurity\n✍️  Former sports writer for The LaSallian\n🗣️  Freelance programming instructor' }
      }
    }
  };

  const getCurrentTimestamp = () => {
    return new Date().toLocaleString('en-US', {
      month: 'short',
      day: '2-digit', 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

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
        response = `Available commands:\n\nNavigation:\n  ls, cd, pwd\n\nFile operations:\n  cat, history\n\nSystem info:\n  whoami, date, uname\n\nPortfolio info:\n  about, skills, projects\n\nDownloads:\n  resume, download resume, wget resume.pdf, curl /resume.pdf\n\nOther:\n  clear, easteregg`;
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
        
      case 'pwd':
        response = currentDir;
        break;
        
      case 'cd':
        const targetDir = args[0];
        if (!targetDir) {
          newDir = '/home/kean';
          response = '';
        } else if (targetDir === '..' || targetDir === '../') {
          const pathParts = currentDir.split('/').filter(p => p);
          if (pathParts.length > 2) {
            pathParts.pop();
            newDir = '/' + pathParts.join('/');
          } else {
            newDir = '/home/kean';
          }
          response = '';
        } else {
          const newPath = currentDir === '/' ? `/${targetDir}` : `${currentDir}/${targetDir}`;
          const targetNode = getCurrentNode(newPath);
          if (targetNode && targetNode.type === 'dir') {
            newDir = newPath;
            response = '';
          } else {
            response = `cd: ${targetDir}: No such directory`;
          }
        }
        break;
        
      case 'cat':
        const filename = args[0];
        if (!filename) {
          response = 'cat: missing file operand';
        } else {
          const filePath = currentDir === '/' ? `/${filename}` : `${currentDir}/${filename}`;
          const fileNode = getCurrentNode(filePath);
          if (fileNode && fileNode.type === 'file') {
            response = fileNode.content;
          } else {
            response = `cat: ${filename}: No such file or directory`;
          }
        }
        break;
        
      case 'whoami':
        response = 'visitor';
        break;
        
      case 'date':
        response = new Date().toString();
        break;
        
      case 'uname':
        if (args[0] === '-a') {
          response = 'Portfolio-Terminal 1.0.0 Kean-OS x86_64 GNU/Portfolio';
        } else {
          response = 'Portfolio-Terminal';
        }
        break;
        
      case 'history':
        response = commandHistory.map((cmd, i) => `${String(commandHistory.length - i).padStart(4)} ${cmd}`).join('\n');
        break;
        
      case 'about':
        response = 'Kean Louis R. Rosales\n\nCybersecurity Specialist & Full-Stack Developer\nDLSU HackerCup 2025 Champion\n\nFor detailed info: cat about.txt\nFor resume download: resume';
        break;
        
      case 'skills':
        response = 'Core Skills:\n• Programming: Python, C++, React, Node.js\n• Cybersecurity: Kali Linux, Digital Forensics\n• Hardware: Arduino, Sensor Integration\n\nFor detailed breakdown: cat portfolio/skills.txt';
        break;
        
      case 'projects':
        response = 'Recent Projects:\n• FiMO Communication Glove (Award Winner)\n• Real-time Threat Detection System\n• Messenger-based POS System\n\nFor full list: cat portfolio/projects.txt';
        break;
        
      case 'resume':
      case 'download':
        if (args[0] === 'resume' || cmd === 'resume') {
          // Trigger resume download
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'Kean_Rosales_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          response = '📄 Resume download started!\n\nFile: Kean_Rosales_Resume.pdf\nSize: ~250KB\nFormat: PDF\n\nThank you for your interest in my profile!';
        } else if (cmd === 'download') {
          response = 'Usage: download resume\n\nAvailable downloads:\n  • resume - My current resume (PDF format)';
        }
        break;
        
      case 'wget':
        if (args[0] === 'resume.pdf' || args[0] === 'resume') {
          // Trigger resume download
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'Kean_Rosales_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          response = '--2025-09-25 22:36:00--  /resume.pdf\nResolving portfolio.kean... done\nConnecting to portfolio.kean... connected\nHTTP request sent, awaiting response... 200 OK\nLength: ~250KB [application/pdf]\nSaving to: \'Kean_Rosales_Resume.pdf\'\n\n📄 Resume downloaded successfully!';
        } else {
          response = `wget: missing URL\nUsage: wget resume.pdf`;
        }
        break;
        
      case 'curl':
        if (args.includes('/resume.pdf') || args.includes('resume')) {
          // Trigger resume download
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'Kean_Rosales_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          response = '  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\n                                 Dload  Upload   Total   Spent    Left  Speed\n100 85311  100 85311    0     0   256k      0 --:--:-- --:--:-- --:--:--  256k\n\n📄 Resume downloaded via curl!';
        } else {
          response = 'curl: missing URL\nUsage: curl /resume.pdf';
        }
        break;
        
      case 'easteregg':
        response = '🎉 You found it!\n\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    Hidden message: "I debug faster with good music playing! 🎵"\n\nThanks for exploring my terminal! 🚀';
        break;
        
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        setHistoryIndex(-1);
        return;
        
      default:
        if (fullCommand.includes('sudo')) {
          response = 'sudo: permission denied. Nice try though! 😄';
        } else if (fullCommand.includes('rm ') && fullCommand.includes('-rf')) {
          response = 'rm: operation not permitted. This portfolio is protected! 🛡️';
        } else {
          response = `${command}: command not found\n\nType 'help' to see available commands.`;
        }
    }

    setTerminalHistory(prev => [...prev, { 
      command: fullCommand, 
      response, 
      timestamp: getCurrentTimestamp(),
      directory: currentDir 
    }]);
    
    if (newDir !== currentDir) {
      setCurrentDir(newDir);
    }
    
    setTerminalInput('');
    setHistoryIndex(-1);
    
    // Auto-scroll to bottom
    setTimeout(() => {
      const terminalContainer = document.querySelector('.mini-terminal');
      if (terminalContainer) {
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
      }
    }, 10);
  };

  const getCurrentNode = (path) => {
    const pathParts = path.split('/').filter(p => p);
    let currentNode = fileSystem['/home/kean'];
    
    for (let i = 2; i < pathParts.length; i++) {
      if (currentNode && currentNode.contents && currentNode.contents[pathParts[i]]) {
        currentNode = currentNode.contents[pathParts[i]];
      } else {
        return null;
      }
    }
    
    return currentNode;
  };

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

  const interests = [
    { 
      icon: '🎵', 
      title: 'Music', 
      description: 'OPM (46.9%), Harana (44.9%), P-Pop enthusiast',
      detailed: {
        topGenres: [
          { name: 'OPM', percentage: '46.94%' },
          { name: 'HARANA', percentage: '44.90%' },
          { name: 'P-POP', percentage: '44.90%' },
          { name: 'KUNDIMAN', percentage: '30.61%' },
          { name: 'PINOY INDIE', percentage: '26.53%' },
          { name: 'PINOY ROCK', percentage: '24.49%' },
          { name: 'PINOY ALTERNATIVE', percentage: '24.49%' },
          { name: 'K-POP', percentage: '12.24%' },
          { name: 'PINOY R&B', percentage: '10.20%' },
          { name: 'SOFT POP', percentage: '4.08%' }
        ],
        topTracks: [
          { title: 'SPARKS', artist: 'COLDPLAY', duration: '3:47', spotifyUrl: 'https://open.spotify.com/track/7D0RhFcb3CrfPuTJ0obrod?si=fcf1d1b0569a4133' },
          { title: 'KUNG WALA KA', artist: 'HALE', duration: '4:03', spotifyUrl: 'https://open.spotify.com/track/4JSDhJVmo2UqdF7nxbyenn?si=df5c129e2e1a49e8' },
          { title: 'ALWAYS', artist: 'DANIEL CAESAR', duration: '3:45', spotifyUrl: 'https://open.spotify.com/track/2LlOeW5rVcvl3QcPNPcDus?si=d6fd26f5fd5a4a46' },
          { title: 'THE DAY YOU SAID GOODNIGHT', artist: 'HALE', duration: '4:51', spotifyUrl: 'https://open.spotify.com/track/0HZ3OUVrGHxttD2EuHqRm3?si=856b9f747e2e43a6' },
          { title: 'ABOT KAMAY', artist: 'ORANGE & LEMONS', duration: '2:38', spotifyUrl: 'https://open.spotify.com/track/2AfQUfTj9tldldmIv39Dzm?si=6b56d749838947b9' },
          { title: 'TELEPHONES', artist: 'VACATIONS', duration: '3:32', spotifyUrl: 'https://open.spotify.com/track/0JIMT9gzLIIz0esKLyjbKf?si=8430046ecc9b491c' },
          { title: 'SA HINDI PAG-ALALA', artist: 'MUNIMUNI', duration: '4:09', spotifyUrl: 'https://open.spotify.com/track/7CXBhqBSbHNgecVX6aguUp?si=2eb70418e1fe4c1c' },
          { title: 'BAWAT PIYESA', artist: 'MUNIMUNI', duration: '6:26', spotifyUrl: 'https://open.spotify.com/track/1tC2PLqLeJXt0VlgOYpc6m?si=27645f050ec54648' },
          { title: 'HEAVEN KNOWS - THIS ANGEL HAS FLOWN', artist: 'ORANGE & LEMONS', duration: '4:01', spotifyUrl: 'https://open.spotify.com/track/1HWAmrrXx7JdNyUEvaJDGX?si=84d293b4d7444ac5' },
          { title: 'WARNING SIGN', artist: 'COLDPLAY', duration: '5:31', spotifyUrl: 'https://open.spotify.com/track/4bPkBHKLKd9WHizsvM2zV3?si=2c3e48e9147543b3' }
        ],
        topArtists: [
          { name: 'COLDPLAY', plays: '92' },
          { name: 'IV OF SPADES', plays: '70' },
          { name: 'THE WEEKND', plays: '97' },
          { name: 'DANIEL CAESAR', plays: '87' },
          { name: 'ORANGE & LEMONS', plays: '66' },
          { name: 'SILENT SANCTUARY', plays: '70' },
          { name: 'NINA', plays: '59' },
          { name: 'HALE', plays: '67' },
          { name: 'DECEMBER AVENUE', plays: '76' },
          { name: 'BEN&BEN', plays: '72' }
        ]
      }
    },
    { 
      icon: '🎮', 
      title: 'Gaming', 
      description: 'League of Legends, Teamfight Tactics, Torchlight 2',
      detailed: {
        games: [
          { 
            name: 'League of Legends', 
            description: 'Main roles: Jungle (Master Yi, Kayn, Lee Sin)',
            stats: 'Platinum 3 - 89W/95L (48% WR)',
            url: 'https://op.gg/lol/summoners/sea/lebron%20james-lj623'
          },
          { 
            name: 'Teamfight Tactics', 
            description: 'Auto-chess strategy game',
            stats: 'Strategic team composition building',
            url: 'https://tactics.tools/player/sg/lebron%20james%20/lj623'
          },
          { 
            name: 'Torchlight 2', 
            description: 'Action RPG dungeon crawler',
            stats: 'Love the loot system and character builds',
            url: null
          }
        ]
      }
    },
    { 
      icon: '📚', 
      title: 'Reading', 
      description: 'Psychological thrillers and epic adventures',
      detailed: {
        books: [
          { 
            title: 'Shutter Island', 
            author: 'Dennis Lehane',
            description: 'Mind-bending psychological thriller',
            url: 'https://www.goodreads.com/book/show/21686.Shutter_Island'
          },
          { 
            title: 'One Piece', 
            author: 'Eiichiro Oda',
            description: 'Epic pirate adventure manga series',
            url: 'https://www.goodreads.com/series/57193-one-piece'
          }
        ]
      }
    },
    { 
      icon: '🏀', 
      title: 'Sports', 
      description: 'Basketball enthusiast and sports writer',
      detailed: {
        sports: [
          {
            name: 'Basketball',
            description: 'Love watching and analyzing games',
            role: 'Sports writer for The LaSallian'
          }
        ],
        articles: {
          description: 'Check out my sports articles',
          url: 'https://thelasallian.com/author/kean-rosales/'
        }
      }
    },
    { icon: '🏆', title: 'Competitions', description: 'Love the thrill of hackathons' }
  ];

  const funFacts = [
    'Built my first website at age 16',
    'Won 5 hackathons in a row',
    'Speaks fluent English and Tagalog',
    'Loves LeBron James',
    'Studied Mandarin and French for two years',
    'Prefers dark mode for everything'
  ];

  return (
    <section id="extra" className="extra-section" ref={sectionRef}>
      <div className="extra-container">
        <div className="extra-terminal proficiency-card">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot dot-red">●</span>
              <span className="dot dot-yellow">●</span>
              <span className="dot dot-green">●</span>
            </span>
            <span className="terminal-title">~/extras --bonus-content</span>
            <span className="terminal-minimize">_</span>
          </div>

          <div className="terminal-body">
            <div className="terminal-command">
              <span className="prompt">kean@portfolio:~$</span>
              <span className="command">cat additional_info.txt</span>
            </div>

            {isVisible && (
              <div className="terminal-output-block extra-content">
                <div className="welcome-message">
                  <TextType 
                    text="Welcome to the bonus section! Here's some extra info about me beyond the professional stuff..."
                    typingSpeed={30}
                    showCursor={false}
                    className="welcome-text"
                  />
                </div>

                <div className="interests-section">
                  <div className="section-header">
                    <GlitchText speed={2} enableOnHover={true}>
                      INTERESTS & HOBBIES
                    </GlitchText>
                  </div>
                  
                  <div className="interests-grid">
                    {interests.map((interest, index) => {
                      const hasModal = ['Music', 'Gaming', 'Reading', 'Sports'].includes(interest.title);
                      const getClickHandler = () => {
                        switch(interest.title) {
                          case 'Music': return () => setShowMusicModal(true);
                          case 'Gaming': return () => setShowGamingModal(true);
                          case 'Reading': return () => setShowReadingModal(true);
                          case 'Sports': return () => setShowSportsModal(true);
                          default: return undefined;
                        }
                      };
                      
                      return (
                        <div 
                          key={index} 
                          className={`interest-card ${hasModal ? 'interest-card-clickable' : ''}`}
                          style={{ '--delay': `${index * 0.1}s` }}
                          onClick={getClickHandler()}
                        >
                          <div className="interest-icon">{interest.icon}</div>
                          <div className="interest-title">{interest.title}</div>
                          <div className="interest-description">{interest.description}</div>
                          {hasModal && (
                            <div className="click-hint">Click for more details 🎯</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="fun-facts-section">
                  <div className="section-header">
                    <GlitchText speed={2} enableOnHover={true}>
                      FUN FACTS
                    </GlitchText>
                  </div>
                  
                  <div className="fun-facts-list">
                    {funFacts.map((fact, index) => (
                      <div 
                        key={index} 
                        className="fun-fact-item"
                        style={{ '--delay': `${index * 0.15}s` }}
                      >
                        <span className="fact-bullet">></span>
                        <span className="fact-text">{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="footer-message">
                  <div className="ascii-art">
                    <pre>{`
    ╔══════════════════════════════════════════════╗
    ║                                              ║
    ║   Thanks for exploring my portfolio!         ║
    ║   Let's build something amazing together.    ║
    ║                                              ║
    ║   - Kean Louis R. Rosales                    ║
    ║                                              ║
    ╚══════════════════════════════════════════════╝
                    `}</pre>
                  </div>
                  
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Interactive Terminal */}
        <div className="extra-terminal proficiency-card interactive-terminal-standalone">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot dot-red">●</span>
              <span className="dot dot-yellow">●</span>
              <span className="dot dot-green">●</span>
            </span>
            <span className="terminal-title">~/interactive --shell</span>
            <span className="terminal-minimize">_</span>
          </div>

          <div className="terminal-body">
            <div className="section-header">
              <GlitchText speed={2} enableOnHover={true}>
                INTERACTIVE TERMINAL
              </GlitchText>
            </div>
            
            <div className="mini-terminal">
              <div className="terminal-history">
                {terminalHistory.map((entry, index) => (
                  <div key={index} className="history-entry">
                    <div className="history-command">
                      <span className="prompt">visitor@kean:{entry.directory || currentDir}$</span>
                      <span>{entry.command}</span>
                    </div>
                    <div className="history-response" dangerouslySetInnerHTML={{__html: entry.response.replace(/\n/g, '<br/>')}}></div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleTerminalSubmit} className="terminal-input-form">
                <span className="prompt">visitor@kean:{currentDir}$</span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  placeholder="Type 'help' to get started..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        </div>
        
        {/* Music Player Terminal */}
        <MusicPlayer />
        
        {/* Scripture Terminal */}
        <div className="extra-terminal proficiency-card scripture-terminal">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot dot-red">●</span>
              <span className="dot dot-yellow">●</span>
              <span className="dot dot-green">●</span>
            </span>
            <span className="terminal-title">~/scripture --verse</span>
            <span className="terminal-minimize">_</span>
          </div>

          <div className="terminal-body">
            <div className="scripture-content">
              <div className="scripture-reference">Proverbs 3:5-6 KJV</div>
              <div className="scripture-text">
                Trust in the Lord with all thine heart; and lean not unto thine own understanding.<br />
                In all thy ways acknowledge him, and he shall direct thy paths.
              </div>
              <div className="glory-statement">To God be all the glory</div>
            </div>
          </div>
        </div>
        
        {/* Music Modal */}
        {showMusicModal && (
          <div className="terminal-modal-overlay" onClick={() => setShowMusicModal(false)}>
            <div className="terminal-modal proficiency-card music-modal-size" onClick={(e) => e.stopPropagation()}>
              <div className="terminal-header">
                <span className="terminal-dots">
                  <span className="dot dot-red">●</span>
                  <span className="dot dot-yellow">●</span>
                  <span className="dot dot-green">●</span>
                </span>
                <span className="terminal-title">~/music --statistics</span>
                <button 
                  className="close-button"
                  onClick={() => setShowMusicModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="terminal-body">
                <div className="terminal-command">
                  <span className="prompt">kean@portfolio:~$</span>
                  <span className="command">cat music_stats.json | jq .</span>
                </div>
                
                <div className="terminal-output-block">
                  <div className="music-stats-grid">
                    <div className="terminal-stats-section">
                      <h3 className="terminal-section-title">🎵 Top Genres (Past Year)</h3>
                      <div className="terminal-genres-list">
                        {interests[0].detailed.topGenres.map((genre, index) => (
                          <div key={index} className="terminal-genre-item">
                            <span className="genre-rank">[{String(index + 1).padStart(2, '0')}]</span>
                            <span className="genre-name">{genre.name}</span>
                            <span className="genre-percentage">{genre.percentage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="terminal-stats-section">
                      <h3 className="terminal-section-title">🎧 Top Tracks <span className="terminal-hint">(Click to search in Spotify)</span></h3>
                      <div className="terminal-tracks-list">
                        {interests[0].detailed.topTracks.map((track, index) => {
                          const url = track.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(`${track.title} ${track.artist}`)}`;
                          return (
                            <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="terminal-track-item">
                              <span className="track-rank">[{String(index + 1).padStart(2, '0')}]</span>
                              <div className="terminal-track-info">
                                <div className="track-title">{track.title}</div>
                                <div className="track-artist">    by {track.artist}</div>
                              </div>
                              <span className="track-duration">{track.duration}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="terminal-stats-section">
                      <h3 className="terminal-section-title">🎤 Top Artists</h3>
                      <div className="terminal-artists-list">
                        {interests[0].detailed.topArtists.map((artist, index) => (
                          <div key={index} className="terminal-artist-item">
                            <span className="artist-rank">[{String(index + 1).padStart(2, '0')}]</span>
                            <span className="artist-name">{artist.name}</span>
                            <span className="artist-plays">{artist.plays} plays</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Gaming Modal */}
        {showGamingModal && (
          <div className="terminal-modal-overlay" onClick={() => setShowGamingModal(false)}>
            <div className="terminal-modal proficiency-card" onClick={(e) => e.stopPropagation()}>
              <div className="terminal-header">
                <span className="terminal-dots">
                  <span className="dot dot-red">●</span>
                  <span className="dot dot-yellow">●</span>
                  <span className="dot dot-green">●</span>
                </span>
                <span className="terminal-title">~/gaming --stats</span>
                <button 
                  className="close-button"
                  onClick={() => setShowGamingModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="terminal-body">
                <div className="terminal-command">
                  <span className="prompt">kean@portfolio:~$</span>
                  <span className="command">cat gaming_stats.md</span>
                </div>
                
                <div className="terminal-output-block">
                  <h3 className="terminal-section-title">🎮 Most Played Games</h3>
                  <div className="games-list">
                    {interests.find(i => i.title === 'Gaming').detailed.games.map((game, index) => (
                      <div key={index} className={`terminal-game-item ${game.url ? 'game-clickable' : ''}`}>
                        {game.url ? (
                          <a href={game.url} target="_blank" rel="noopener noreferrer" className="terminal-game-link">
                            <div className="terminal-game-info">
                              <div className="terminal-game-header">
                                <span className="game-index">[{String(index + 1).padStart(2, '0')}]</span>
                                <span className="game-name">{game.name}</span>
                                <span className="external-link">🔗</span>
                              </div>
                              <div className="game-description">    » {game.description}</div>
                              <div className="game-stats">    » {game.stats}</div>
                            </div>
                          </a>
                        ) : (
                          <div className="terminal-game-info">
                            <div className="terminal-game-header">
                              <span className="game-index">[{String(index + 1).padStart(2, '0')}]</span>
                              <span className="game-name">{game.name}</span>
                            </div>
                            <div className="game-description">    » {game.description}</div>
                            <div className="game-stats">    » {game.stats}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Reading Modal */}
        {showReadingModal && (
          <div className="terminal-modal-overlay" onClick={() => setShowReadingModal(false)}>
            <div className="terminal-modal proficiency-card" onClick={(e) => e.stopPropagation()}>
              <div className="terminal-header">
                <span className="terminal-dots">
                  <span className="dot dot-red">●</span>
                  <span className="dot dot-yellow">●</span>
                  <span className="dot dot-green">●</span>
                </span>
                <span className="terminal-title">~/reading --library</span>
                <button 
                  className="close-button"
                  onClick={() => setShowReadingModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="terminal-body">
                <div className="terminal-command">
                  <span className="prompt">kean@portfolio:~$</span>
                  <span className="command">ls -la ~/library/favorites/</span>
                </div>
                
                <div className="terminal-output-block">
                  <h3 className="terminal-section-title">📚 Favorite Books</h3>
                  <div className="terminal-books-list">
                    {interests.find(i => i.title === 'Reading').detailed.books.map((book, index) => (
                      <div key={index} className="terminal-book-item">
                        <a href={book.url} target="_blank" rel="noopener noreferrer" className="terminal-book-link">
                          <div className="terminal-book-info">
                            <div className="terminal-book-header">
                              <span className="book-index">[{String(index + 1).padStart(2, '0')}]</span>
                              <span className="book-title">{book.title}</span>
                              <span className="external-link">🔗</span>
                            </div>
                            <div className="book-author">    by {book.author}</div>
                            <div className="book-description">    » {book.description}</div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Sports Modal */}
        {showSportsModal && (
          <div className="terminal-modal-overlay" onClick={() => setShowSportsModal(false)}>
            <div className="terminal-modal proficiency-card" onClick={(e) => e.stopPropagation()}>
              <div className="terminal-header">
                <span className="terminal-dots">
                  <span className="dot dot-red">●</span>
                  <span className="dot dot-yellow">●</span>
                  <span className="dot dot-green">●</span>
                </span>
                <span className="terminal-title">~/sports --profile</span>
                <button 
                  className="close-button"
                  onClick={() => setShowSportsModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="terminal-body">
                <div className="terminal-command">
                  <span className="prompt">kean@portfolio:~$</span>
                  <span className="command">cat sports_profile.yml</span>
                </div>
                
                <div className="terminal-output-block">
                  <h3 className="terminal-section-title">🏀 Basketball</h3>
                  <div className="terminal-sports-info">
                    {interests.find(i => i.title === 'Sports').detailed.sports.map((sport, index) => (
                      <div key={index} className="terminal-sport-item">
                        <div className="terminal-sport-header">
                          <span className="sport-name">{sport.name}</span>
                        </div>
                        <div className="sport-description">    » {sport.description}</div>
                        <div className="sport-role">    » {sport.role}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="terminal-articles-section">
                    <h4 className="terminal-subsection-title">📝 My Sports Writing</h4>
                    <div className="terminal-article-item">
                      <a 
                        href={interests.find(i => i.title === 'Sports').detailed.articles.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="terminal-articles-link"
                      >
                        <div className="terminal-articles-info">
                          <div className="terminal-articles-header">
                            <span className="article-index">[01]</span>
                            <span className="articles-description">
                              {interests.find(i => i.title === 'Sports').detailed.articles.description}
                            </span>
                            <span className="external-link">🔗</span>
                          </div>
                          <div className="publication">    published at The LaSallian</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Extra;
