import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import GlitchText from './GlitchText';
import './Writeups.css';
import '../Proficiencies.css';

const writeupsList = [
  { id: 'Arbitrary File Write', title: 'Arbitrary File Write.md', category: 'Injection / Path Traversal', size: '21K' },
  { id: 'Forged Coupon', title: 'Forged Coupon.md', category: 'Cryptographic Flaw', size: '24K' },
  { id: 'Forged Signed JWT', title: 'Forged Signed JWT.md', category: 'Broken Authentication', size: '20K' },
  { id: 'Imaginary Challenge', title: 'Imaginary Challenge.md', category: 'Shenanigans', size: '23K' },
  { id: 'Login Support Team', title: 'Login Support Team.md', category: 'Broken Authentication', size: '24K' },
  { id: 'Multiple Likes', title: 'Multiple Likes.md', category: 'Broken Access Control', size: '20K' },
  { id: 'Premium Paywall', title: 'Premium Paywall.md', category: 'Broken Access Control', size: '19K' },
  { id: 'SSRF', title: 'SSRF.md', category: 'Server-Side Request Forgery', size: '19K' },
  { id: 'SSTI', title: 'SSTI.md', category: 'Injection', size: '23K' },
  { id: 'Successful RCE DoS', title: 'Successful RCE DoS.md', category: 'Remote Code Execution', size: '18K' },
  { id: 'Video XSS', title: 'Video XSS.md', category: 'Cross-Site Scripting (XSS)', size: '21K' },
  { id: 'Wallet Depletion', title: 'Wallet Depletion.md', category: 'Web3 / Blockchain', size: '25K' }
];

const Writeups = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    fetch('/writeups/ReadME.md')
      .then((response) => {
        if (!response.ok) {
          throw new Error('ReadME not found');
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((error) => {
        setContent('# Error\n\nCould not load the writeups index.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="writeups-page">
      <section className="writeups-section">
        <div className="writeups-container">
          <div className="writeups-terminal proficiency-card">
            <div className="terminal-header">
              <span className="terminal-dots">
                <span className="dot dot-red">●</span>
                <span className="dot dot-yellow">●</span>
                <span className="dot dot-green">●</span>
              </span>
              <span className="terminal-title">~/owasp-juice-shop/6-star-challenges/ReadME.md</span>
              <span className="terminal-minimize">_</span>
            </div>

            <div className="terminal-body">
              <div className="terminal-command" style={{ marginBottom: '20px' }}>
                <span className="prompt">kean@portfolio:~$</span>
                <span className="command">cat ReadME.md</span>
              </div>

              {loading ? (
                <div className="loading-text">Loading ReadME.md...<span className="cursor-blink">_</span></div>
              ) : (
                <div className="markdown-body terminal-markdown">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      a: ({node, ...props}) => {
                        const href = props.href;
                        if (href && href.includes('6-Star%20Challenges/')) {
                          const filename = decodeURIComponent(href.split('/').pop().replace('.md', ''));
                          return <Link to={`/writeups/${encodeURIComponent(filename)}`}>{props.children}</Link>;
                        }
                        return <a target="_blank" rel="noopener noreferrer" {...props} />;
                      },
                      table: () => (
                        <div className="directory-listing" style={{ margin: '30px 0' }}>
                          <div className="directory-header">
                            <span className="header-perms">PERMISSIONS</span>
                            <span className="header-size">SIZE</span>
                            <span className="header-category">CATEGORY</span>
                            <span className="header-name">FILENAME</span>
                          </div>

                          <div className="directory-entries">
                            {writeupsList.map((writeup, index) => (
                              <Link 
                                key={writeup.id}
                                to={`/writeups/${encodeURIComponent(writeup.id)}`}
                                className="directory-entry clickable-entry"
                                style={{ '--delay': `${index * 0.05}s` }}
                              >
                                <span className="entry-perms">-rw-r--r--</span>
                                <span className="entry-size">{writeup.size}</span>
                                <span className="entry-category">{writeup.category}</span>
                                <span className="entry-name">
                                  <GlitchText speed={2} enableOnHover={true}>
                                    {writeup.title}
                                  </GlitchText>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Writeups;
