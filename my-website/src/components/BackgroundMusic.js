import React, { useState, useRef, useEffect } from 'react';
import './BackgroundMusic.css';

const BackgroundMusic = () => {
  const [showNotification, setShowNotification] = useState(false);
  const audioRef = useRef(null);
  
  // Background music file info
  const bgMusic = {
    title: 'ZEDD x VALORANT Music Theme',
    file: 'ZEDD x VALORANT Music Theme.mp3'
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set up audio properties
    const targetVolume = 0.3; // 30% volume
    audio.volume = targetVolume;
    audio.muted = false;
    audio.loop = true;

    // Helper: enable sound immediately at target volume (for fallback)
    const enableSound = () => {
      if (!audio) return;
      audio.muted = false;
      audio.volume = targetVolume;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      removeGestureListeners();
    };

    // Add one-time user-gesture listeners to enable sound
    const gestureEvents = ['pointerdown', 'keydown', 'touchstart', 'wheel'];
    const gestureHandler = () => enableSound();
    const addGestureListeners = () => gestureEvents.forEach(ev => window.addEventListener(ev, gestureHandler, { once: true }));
    const removeGestureListeners = () => gestureEvents.forEach(ev => window.removeEventListener(ev, gestureHandler));

    const handleCanPlay = async () => {
      console.log('Audio canplay event triggered');
      // Show notification
      setShowNotification(true);

      // Auto-hide notification after 7 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 7000);

      // First attempt: try to play with sound immediately
      try {
        console.log('Attempting immediate autoplay with sound...');
        await audio.play();
        console.log('Autoplay with sound successful!');
      } catch (error) {
        console.log('Autoplay with sound blocked. Trying muted fallback...');
        // Fallback: muted autoplay
        try {
          audio.muted = true;
          audio.volume = 0;
          await audio.play();
          console.log('Muted autoplay started. Waiting for user gesture to enable sound...');
          addGestureListeners();
        } catch (mutedError) {
          console.log('Even muted autoplay prevented:', mutedError);
          addGestureListeners();
        }
      }
    };

    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      removeGestureListeners();
    };
  }, []);


  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={`/bgmusic/${bgMusic.file}`}
        preload="auto"
        autoPlay
        playsInline
      />
      
      {/* Terminal-style notification */}
      {showNotification && (
        <div className="bg-music-notification">
          <div className="notification-content">
            <span className="notification-prompt">kean@portfolio:~$</span>
            <span className="notification-text"> {bgMusic.title}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
