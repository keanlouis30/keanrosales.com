import React, { useEffect } from 'react';

const GeworldFinal = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'The World Trade Desk — Case File';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <iframe
      src="/geworld-final.html"
      title="The World Trade Desk — Case File"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        zIndex: 1000,
      }}
    />
  );
};

export default GeworldFinal;
