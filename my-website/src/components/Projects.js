import React, { useState, useRef, useEffect } from 'react';
import './Projects.css';
import GlitchText from './GlitchText';
import '../Proficiencies.css';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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

  const projects = [
    {
      id: 'kitakita',
      name: 'KitaKita',
      status: 'Champion',
      competition: 'DLSU HackerCup 2025',
      description: 'Champion-winning Point-of-Sale (POS) system for small neighborhood stores that operates entirely within Facebook Messenger.',
      technologies: ['Facebook Messenger API', 'Node.js', 'Express', 'MongoDB', 'Webhook Integration'],
      features: [
        'Complete POS functionality within Messenger',
        'Inventory management system',
        'Sales tracking and reporting',
        'Customer management',
        'Multi-store support'
      ],
      impact: '🏆 Champion - DLSU HackerCup 2025',
      type: 'Full-Stack Application'
    },
    {
      id: 'inventisolve',
      name: 'InventiSolve',
      status: '2nd Place',
      competition: 'Inventi Hackathon Challenge 2025',
      description: 'InventiSolve - an award winning all-in-one solution for property managers and tenants. Built for Inventi to streamline property operations.',
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT Authentication', 'RESTful API'],
      features: [
        'Tenant and property management',
        'Maintenance request tracking',
        'Payment processing and invoicing',
        'Real-time communication system',
        'Document management and storage',
        'Analytics and reporting dashboard'
      ],
      impact: '🥈 2nd Place - Inventi Hackathon Challenge 2025',
      type: 'Property Management Platform'
    },
    {
      id: 'neosolutions',
      name: 'Neosolutions',
      status: 'Top 5 Finalist',
      competition: 'Tenext.ai Codebreak 2.0',
      description: 'Full-stack, custom ticketing and support system tailored to the specific operational needs of Tenext.ai.',
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'JWT Authentication'],
      features: [
        'Real-time ticket management',
        'Priority-based queue system',
        'Admin dashboard with analytics',
        'Multi-agent support',
        'Custom workflow automation'
      ],
      impact: '🥇 Top 5 Finalist - Tenext.ai Codebreak 2.0',
      type: 'Enterprise Web Application'
    },
    {
      id: 'procrash',
      name: 'Procrash',
      status: '3rd Place',
      competition: 'FlutterFlow Development Group Manila',
      description: 'Gamified to-do list mobile application aimed at combating procrastination by turning tasks into RPG-style quests.',
      technologies: ['Flutter', 'FlutterFlow', 'Firebase', 'Dart', 'Cloud Firestore'],
      features: [
        'RPG-style quest system',
        'Experience points and leveling',
        'Achievement badges',
        'Task categories and priorities',
        'Progress tracking and statistics'
      ],
      impact: '🥉 3rd Place - FlutterFlow Development Group Manila Hackathon',
      type: 'Mobile Application'
    },
    {
      id: 'kachingko',
      name: 'Kachingko',
      status: '4th Place',
      competition: 'SpringBoards hack-it',
      description: 'Mobile financial management app that uses Optical Character Recognition (OCR) to automatically scan, categorize, and report expenses from receipts.',
      technologies: ['React Native', 'OCR API', 'Machine Learning', 'Firebase', 'Chart.js'],
      features: [
        'Receipt OCR scanning',
        'Automatic expense categorization',
        'Budget tracking and alerts',
        'Expense analytics and reports',
        'Multi-currency support'
      ],
      impact: '🏅 4th Place - SpringBoards hack-it',
      type: 'Fintech Mobile App'
    },
    {
      id: 'talento',
      name: 'Talento',
      status: 'Special Award',
      competition: 'KMC Solutions Hackathon',
      description: 'Job-searching platform that reimagines the resume as short-form video, allowing HR managers to screen candidates through a TikTok-style interface. Judges said: "The idea was so good we had to create an award for it."',
      technologies: ['React', 'Node.js', 'Video Processing', 'MongoDB', 'AWS S3', 'Socket.io'],
      features: [
        'Video resume creation',
        'TikTok-style interface for HR',
        'AI-powered candidate matching',
        'Real-time messaging system',
        'Advanced filtering and search'
      ],
      impact: '⭐ Special Awardee - KMC Solutions Hackathon',
      type: 'HR Tech Platform'
    },
    {
      id: 'fimo',
      name: 'FiMO - Assistive Communication Glove',
      status: '1st Place Winner',
      competition: 'Regional Science and Technology Fair',
      description: 'Smart glove that translates finger movements into audible speech, empowering patients with severe speech impairments to communicate verbally.',
      technologies: ['Arduino', 'Flex Sensors', 'Machine Learning', 'Text-to-Speech AI', 'Gesture Recognition'],
      features: [
        'Real-time gesture recognition',
        'Custom vocabulary training',
        'Text-to-speech conversion',
        'Wireless connectivity',
        'Battery optimization'
      ],
      impact: '🔬 1st Place - Regional & Divisional Science Fairs',
      type: 'Assistive Technology Hardware'
    }
  ];

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <div className="projects-terminal proficiency-card">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot dot-red">●</span>
              <span className="dot dot-yellow">●</span>
              <span className="dot dot-green">●</span>
            </span>
            <span className="terminal-title">~/projects --showcase</span>
            <span className="terminal-minimize">_</span>
          </div>

          <div className="terminal-body">
            <div className="terminal-command">
              <span className="prompt">kean@portfolio:~$</span>
              <span className="command">ls -la projects/ | grep -E "(champion|winner|finalist)"</span>
            </div>

            {isVisible && (
              <div className="terminal-output-block projects-content">
                <div className="projects-grid">
                  {projects.map((project, index) => (
                    <div 
                      key={project.id} 
                      className="project-card"
                      style={{ '--delay': `${index * 0.15}s` }}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="project-header">
                        <div className="project-status">
                          <span className="status-indicator">●</span>
                          <span className="status-text">{project.status}</span>
                        </div>
                        <div className="project-type">[{project.type}]</div>
                      </div>

                      <h3 className="project-name">
                        <GlitchText speed={2} enableOnHover={true}>
                          {project.name}
                        </GlitchText>
                      </h3>

                      <div className="project-competition">
                        <span className="competition-label">COMPETITION:</span>
                        <span className="competition-name">{project.competition}</span>
                      </div>

                      <p className="project-description">{project.description}</p>

                      <div className="tech-stack">
                        <span className="tech-label">STACK:</span>
                        <div className="tech-tags">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">{tech}</span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="tech-more">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                      </div>

                      <div className="project-impact">
                        <span className="impact-text">{project.impact}</span>
                      </div>

                      <div className="project-footer">
                        <span className="view-details">[ CLICK TO VIEW DETAILS ]</span>
                        <span className="arrow">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="project-modal" onClick={() => setSelectedProject(null)}>
            <div className="modal-terminal proficiency-card" onClick={(e) => e.stopPropagation()}>
              <div className="terminal-header">
                <span className="terminal-dots">
                  <span className="dot dot-red">●</span>
                  <span className="dot dot-yellow">●</span>
                  <span className="dot dot-green">●</span>
                </span>
                <span className="terminal-title">~/projects/{selectedProject.id} --details</span>
                <button 
                  className="close-button"
                  onClick={() => setSelectedProject(null)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="terminal-command">
                  <span className="prompt">kean@portfolio:~$</span>
                  <span className="command">cat {selectedProject.id}/README.md</span>
                </div>

                <div className="project-details">
                  <h2 className="detail-title">{selectedProject.name}</h2>
                  
                  <div className="detail-status">
                    <span className="detail-label">STATUS:</span>
                    <span className="detail-value">{selectedProject.status}</span>
                  </div>

                  <div className="detail-competition">
                    <span className="detail-label">COMPETITION:</span>
                    <span className="detail-value">{selectedProject.competition}</span>
                  </div>

                  <div className="detail-description">
                    <span className="detail-label">DESCRIPTION:</span>
                    <p className="detail-text">{selectedProject.description}</p>
                  </div>

                  <div className="detail-technologies">
                    <span className="detail-label">TECHNOLOGIES:</span>
                    <div className="tech-list">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="tech-item">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-features">
                    <span className="detail-label">KEY FEATURES:</span>
                    <ul className="feature-list">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="feature-item">
                          <span className="feature-bullet">></span>
                          <span className="feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-impact">
                    <span className="detail-label">ACHIEVEMENT:</span>
                    <span className="impact-badge">{selectedProject.impact}</span>
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

export default Projects;
