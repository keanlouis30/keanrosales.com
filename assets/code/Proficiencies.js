import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import './Proficiencies.css';

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
    return (
      <div className="proficiency-level">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`proficiency-dot ${i < level ? 'filled' : ''}`} />
        ))}
      </div>
    );
  };

  return (
    <section className="proficiencies-section">
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
        {/* Title Card as the first card */}
        <ScrollStackItem itemClassName="proficiency-card title-card">
          <div className="title-card-content">
            <h2 className="section-title">My Proficiencies</h2>
            <p className="section-subtitle">Scroll to explore my technical expertise and skills</p>
            <div className="scroll-indicator">
              <span className="scroll-text">Scroll Down</span>
              <span className="scroll-arrow">↓</span>
            </div>
          </div>
        </ScrollStackItem>

        {/* Proficiency Cards */}
        {proficiencyData.map((prof, index) => (
          <ScrollStackItem key={index} itemClassName="proficiency-card">
            <div className="proficiency-category">{prof.category}</div>
            <h3 className="proficiency-title">{prof.title}</h3>
            
            <div className="proficiency-items">
              {prof.items.map((item, i) => (
                <div key={i} className="proficiency-item">
                  <span className="proficiency-name">{item.name}</span>
                  {renderProficiencyLevel(item.level)}
                </div>
              ))}
            </div>
            
            <p className="proficiency-description">{prof.description}</p>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default Proficiencies;

