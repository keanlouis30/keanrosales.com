import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import TextType from './TextType';
import '../Proficiencies.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const formRef = useRef();
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // EmailJS configuration
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    // Check if EmailJS is properly configured
    if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      console.warn('EmailJS not configured. Please set up your .env.local file.');
      setIsSubmitting(false);
      setSubmitStatus('config-error');
      setTimeout(() => setSubmitStatus(''), 5000);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'keanlouis30@gmail.com',
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('success');
        setTimeout(() => setSubmitStatus(''), 5000);
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        setIsSubmitting(false);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(''), 5000);
      });
  };

  const socialLinks = [
    {
      id: 1,
      name: "Gmail",
      url: "mailto:keanlouis30@gmail.com",
      command: "mail -s 'Collaboration' keanlouis30@gmail.com",
      image: "gmail.png"
    },
    {
      id: 2,
      name: "GitHub",
      url: "https://github.com/keanlouis30",
      command: "git clone https://github.com/keanlouis30",
      image: "github.png"
    },
    {
      id: 3,
      name: "Facebook",
      url: "https://facebook.com/keanlouis30",
      command: "open https://facebook.com/keanlouis30",
      image: "fb.png"
    },
    {
      id: 4,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kean-louis-rosales-5336b2328/",
      command: "curl -L linkedin.com/in/kean-louis-rosales-5336b2328",
      image: "linkedin.png"
    },
    {
      id: 5,
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/~01e4c854ed0d031185?mp_source=share",
      command: "open upwork.com/freelancers/kean-rosales",
      image: "upwork.png"
    },
    {
      id: 6,
      name: "Viber",
      url: "viber://chat?number=639176298175",
      command: "viber://chat?number=639176298175",
      image: "viber.png"
    },
    {
      id: 7,
      name: "Telegram",
      url: "https://t.me/keanlouis",
      command: "open https://t.me/keanlouis",
      image: "telegram.png"
    },
    {
      id: 8,
      name: "Discord",
      url: "https://discordapp.com/users/jankee1011",
      command: "discord://users/jankee1011",
      image: "discord.png"
    }
  ];

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-terminal proficiency-card">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot dot-red">●</span>
              <span className="dot dot-yellow">●</span>
              <span className="dot dot-green">●</span>
            </span>
            <span className="terminal-title">~/contact --establish-connection</span>
            <span className="terminal-minimize">_</span>
          </div>

          <div className="terminal-body">
            <div className="terminal-command">
              <span className="prompt">kean@portfolio:~$</span>
              <span className="command">./initiate_contact.sh</span>
            </div>

            {isVisible && (
              <div className="terminal-output-block contact-content">
                <div className="contact-intro">
                  <div className="status-line">
                    <span className="status-indicator">●</span>
                    <TextType 
                      text="CONNECTION ESTABLISHED - Ready for collaboration opportunities"
                      typingSpeed={40}
                      showCursor={false}
                      className="status-text"
                    />
                  </div>
                </div>

                <div className="contact-grid">
                  <div className="left-column">
                    <div className="contact-form-container">
                      <div className="form-header">
                        <span className="form-title">SEND_MESSAGE</span>
                      </div>
                      
                      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                      <div className="form-group">
                        <label className="form-label">NAME:</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Your name here..."
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">EMAIL:</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="your.email@domain.com"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">MESSAGE:</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="form-textarea"
                          placeholder="Let's build something amazing together..."
                          rows="5"
                          required
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span>TRANSMITTING... <span className="loading-dots">...</span></span>
                        ) : (
                          <span>EXECUTE SEND_MESSAGE()</span>
                        )}
                      </button>
                      
                      {submitStatus && (
                        <div className={`status-message ${submitStatus}`}>
                          {submitStatus === 'success' ? (
                            <span className="success-message">
                              ✓ MESSAGE TRANSMITTED SUCCESSFULLY!
                            </span>
                          ) : submitStatus === 'config-error' ? (
                            <span className="error-message">
                              ⚙️ EMAIL SERVICE NOT CONFIGURED - Please use direct contact methods below
                            </span>
                          ) : (
                            <span className="error-message">
                              ✗ TRANSMISSION FAILED - Please try again or use direct contact methods
                            </span>
                          )}
                        </div>
                      )}
                    </form>
                    </div>

                    <div className="location-info">
                      <div className="terminal-command">
                        <span className="prompt">kean@portfolio:~$</span>
                        <span className="command">whereis kean</span>
                      </div>
                      <div className="location-output">
                        <p className="location-line">📍 Metro Manila, Philippines</p>
                        <p className="location-line">🕒 GMT+8 (Available for remote work)</p>
                        <p className="location-line">📱 +63 917 629 8175</p>
                        <p className="location-line">💼 Open to opportunities worldwide</p>
                        <p className="location-line">🚀 Ready to start immediately</p>
                      </div>
                    </div>
                  </div>

                  <div className="social-links-container">
                    <div className="form-header">
                      <span className="form-title">QUICK_CONNECT</span>
                    </div>
                    
                    <div className="social-links">
                      {socialLinks.map((link, index) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          style={{ '--delay': `${index * 0.1}s` }}
                        >
                          <div className="link-info">
                            <div className="link-name">{link.name}</div>
                            <div className="link-command">{link.command}</div>
                          </div>
                          <div className="link-arrow">→</div>
                        </a>
                      ))}
                    </div>
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

export default Contact;
