import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import './Proficiencies.css';
import GlitchText from './components/GlitchText';
import './components/GlitchText.css';
import TextType from './components/TextType';
import './components/TextType.css';

const Proficiencies = () => {
  const proficiencyData = [
    {
      category: "Development",
      title: "Programming & Development",
      items: [
        { name: "Python", level: 5 },
        { name: "C++", level: 4 },
        { name: "C", level: 4 },
        { name: "React", level: 5 },
        { name: "Node.js", level: 4 },
        { name: "HTML/CSS", level: 5 },
        { name: "Git", level: 5 }
      ],
      description: "Full-stack development expertise with proven experience in building scalable applications, from Messenger-based POS systems to custom ticketing platforms. Skilled in multiple programming languages with strong version control practices."
    },
    {
      category: "Security",
      title: "Cybersecurity & Network Security",
      items: [
        { name: "Kali Linux", level: 4 },
        { name: "Wireshark", level: 4 },
        { name: "Nmap", level: 4 },
        { name: "Digital Forensics", level: 4 },
        { name: "Vulnerability Assessment", level: 5 },
        { name: "Threat Detection", level: 4 },
        { name: "Software Defined Networking", level: 4 }
      ],
      description: "Network and Information Security major with (ISC)² Certified in Cybersecurity credentials. Specialized in real-time automated threat detection and response, with hands-on experience in security tools and methodologies."
    },
    {
      category: "Communication",
      title: "Instruction & Communication",
      items: [
        { name: "Curriculum Development", level: 5 },
        { name: "Technical Mentorship", level: 5 },
        { name: "Public Speaking", level: 4 },
        { name: "Written Communication", level: 5 },
        { name: "Programming Instruction", level: 5 },
        { name: "Web Development Teaching", level: 5 },
        { name: "Robotics Instruction", level: 4 }
      ],
      description: "Experienced freelance instructor teaching programming, web development, and robotics concepts. Proven ability to develop curriculum materials, lead hands-on sessions, and provide personalized mentorship to diverse student groups."
    },
    {
      category: "Hardware",
      title: "Hardware & Robotics",
      items: [
        { name: "Sensor Integration", level: 5 },
        { name: "Gesture Recognition", level: 5 },
        { name: "Assistive Technology Design", level: 5 },
        { name: "Arduino/Microcontrollers", level: 4 },
        { name: "Hardware Prototyping", level: 4 },
        { name: "Circuit Design", level: 4 }
      ],
      description: "Award-winning experience in assistive technology development, including the FiMO communication glove that translates finger movements into audible speech. Expertise in sensor integration and gesture recognition systems."
    },
    {
      category: "Research",
      title: "Research & Writing",
      items: [
        { name: "Technical Writing", level: 5 },
        { name: "Research Papers", level: 5 },
        { name: "Sports Journalism", level: 4 },
        { name: "Academic Research", level: 5 },
        { name: "Data Analysis", level: 4 },
        { name: "Content Creation", level: 4 }
      ],
      description: "Published researcher with expertise in AR/VR applications and cybersecurity. Former sports writer for The LaSallian with strong academic writing background and experience in collegiate journalism and storytelling."
    },
    {
      category: "Automation",
      title: "Automation & Optimization",
      items: [
        { name: "Python Scripting", level: 5 },
        { name: "Data Processing Automation", level: 5 },
        { name: "Workflow Optimization", level: 4 },
        { name: "Process Automation", level: 4 },
        { name: "Custom Solutions", level: 5 },
        { name: "System Integration", level: 4 }
      ],
      description: "Specialized in designing and implementing Python-based automation solutions for international clients, streamlining manual data processing and workflow tasks to improve operational efficiency and reduce processing time."
    }
  ];

  const renderProficiencyLevel = (level) => {
    // Terminal-style progress bar instead of dots
    const filled = '█'.repeat(level);
    const empty = '░'.repeat(5 - level);
    return (
      <div className="proficiency-level">
        <span className="proficiency-bar-filled">{filled}</span>
        <span className="proficiency-bar-empty">{empty}</span>
        <span className="proficiency-percentage">[{level * 20}%]</span>
      </div>
    );
  };

  return (
    <section id="proficiencies" className="proficiencies-section">
      <ScrollStack
        className="proficiencies-stack"
        itemDistance={80}
        itemScale={0.015}
        itemStackDistance={30}
        stackPosition="25%"
        scaleEndPosition="10%"
        baseScale={0.92}
        rotationAmount={0}
        blurAmount={1.5}
        useWindowScroll={false}
      >
        {/* Title Card - Terminal Boot Screen */}
        <ScrollStackItem itemClassName="proficiency-card title-card">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot dot-red">●</span>
              <span className="dot dot-yellow">●</span>
              <span className="dot dot-green">●</span>
            </span>
            <span className="terminal-title">~/proficiencies --list</span>
            <span className="terminal-minimize">_</span>
          </div>
          <div className="terminal-body">
            <div className="boot-sequence">
              <p className="terminal-line">$ systemctl status skills.service</p>
              <p className="terminal-output">● skills.service - Technical Proficiencies</p>
              <p className="terminal-output">   Loaded: <span className="text-mint">loaded</span></p>
              <p className="terminal-output">   Active: <span className="text-mint">active (running)</span></p>
              <p className="terminal-line typing-indicator">$ ./display_skills.sh<span className="cursor">_</span></p>
            </div>
            <div className="scroll-hint">
              <span className="blink">[SCROLL TO CONTINUE]</span>
            </div>
          </div>
        </ScrollStackItem>

        {/* Proficiency Cards as Terminal Windows */}
        {proficiencyData.map((prof, index) => (
          <ScrollStackItem key={index} itemClassName="proficiency-card">
            <div className="terminal-header">
              <span className="terminal-dots">
                <span className="dot dot-red">●</span>
                <span className="dot dot-yellow">●</span>
                <span className="dot dot-green">●</span>
              </span>
              <span className="terminal-title">~/{prof.category.toLowerCase()}</span>
              <span className="terminal-minimize">_</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-command">
                <span className="prompt">$</span> cat {prof.category.toLowerCase()}_skills.json
              </div>
              <div className="terminal-output-block">
<p className="proficiency-category"># <GlitchText speed={2.5} enableOnHover={false}>{prof.title}</GlitchText></p>
                
                <div className="proficiency-items">
                  {prof.items.map((item, i) => (
                    <div key={i} className="proficiency-item">
                      <span className="proficiency-name">{item.name}</span>
                      <span className="skill-separator">:</span>
                      {renderProficiencyLevel(item.level)}
                    </div>
                  ))}
                </div>
                
                <div className="terminal-divider">{'─'.repeat(50)}</div>
                
<p className="proficiency-description">
  <span className="comment-marker">{'//'}</span>
<TextType text={prof.description} typingSpeed={18} className="description-animated" showCursor={true} loop={true} pauseDuration={10000} />
</p>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default Proficiencies;
