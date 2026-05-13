import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './WriteupDetail.css';

const WriteupDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when loading a new writeup
    window.scrollTo(0, 0);
    
    // Fetch the markdown file
    fetch(`/writeups/${id}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Writeup not found');
        }
        return response.text();
      })
      .then((text) => {
        // Fix image paths: replace ./Images/ with /writeups/Images/
        const fixedText = text.replace(/\.\/Images\//g, '/writeups/Images/');
        setContent(fixedText);
        setLoading(false);
      })
      .catch((error) => {
        setContent('# Error\n\nCould not load the writeup. It may not exist.');
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="writeup-detail-page">
      <div className="writeup-container">
        <div className="writeup-header">
          <Link to="/writeups" className="back-link">
            <span className="back-arrow">&lt;</span> cd ..
          </Link>
          <div className="terminal-controls">
            <span className="dot dot-red">●</span>
            <span className="dot dot-yellow">●</span>
            <span className="dot dot-green">●</span>
          </div>
        </div>
        
        <div className="writeup-content">
          {loading ? (
            <div className="loading-text">Loading {id}.md...<span className="cursor-blink">_</span></div>
          ) : (
            <div className="markdown-body terminal-markdown">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteupDetail;
