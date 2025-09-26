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
    const targetVolume = 0.15; // 15% volume
    audio.volume = targetVolume;
    audio.muted = false;
    audio.loop = true;

    // Track whether we paused due to music player
    let suspendedByPlayer = false;

    // Helper: enable sound immediately at target volume (for fallback)
    const tryEnableSound = () => {
      if (!audio) return false;
      audio.muted = false;
      audio.volume = targetVolume;
      return audio.play().then(() => {
        showNotificationWithTimeout();
        return true;
      }).catch(() => false);
    };

    const enableSound = () => {
      // Attempt to enable; if it fails, keep listeners for next gesture
      tryEnableSound().then((ok) => {
        if (ok) removeGestureListeners();
      });
    };

    // React to Music Player events
    const handlePlayerPlay = () => {
      if (!audio.paused) {
        audio.pause();
        suspendedByPlayer = true;
      }
    };
    const handlePlayerPause = () => {
      if (suspendedByPlayer) {
        audio.muted = false;
        audio.volume = targetVolume;
        audio.play().catch(() => {});
      }
    };
    const handlePlayerEnded = () => {
      if (suspendedByPlayer) {
        audio.muted = false;
        audio.volume = targetVolume;
        audio.play().catch(() => {});
      }
    };

    // Add robust user-gesture listeners to enable sound
    const gestureEventsWindow = ['pointerdown', 'click', 'keydown', 'touchstart', 'wheel', 'scroll'];
    const gestureEventsDoc = ['pointerdown', 'click', 'keydown', 'touchstart'];
    const gestureHandler = () => enableSound();
    const addGestureListeners = () => {
      gestureEventsWindow.forEach(ev => window.addEventListener(ev, gestureHandler, { passive: true }));
      gestureEventsDoc.forEach(ev => document.addEventListener(ev, gestureHandler, { passive: true }));
    };
    const removeGestureListeners = () => {
      gestureEventsWindow.forEach(ev => window.removeEventListener(ev, gestureHandler));
      gestureEventsDoc.forEach(ev => document.removeEventListener(ev, gestureHandler));
    };

    const showNotificationWithTimeout = () => {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 7000);
    };

    const handleCanPlay = async () => {
      console.log('Audio canplay event triggered');

      // First attempt: try to play with sound immediately
      try {
        console.log('Attempting immediate autoplay with sound...');
        await audio.play();
        console.log('Autoplay with sound successful!');
        showNotificationWithTimeout();
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

    // Attach gesture listeners early so early scroll/clicks count
    addGestureListeners();
    audio.addEventListener('canplay', handleCanPlay);
    window.addEventListener('musicplayer:play', handlePlayerPlay);
    window.addEventListener('musicplayer:pause', handlePlayerPause);
    window.addEventListener('musicplayer:ended', handlePlayerEnded);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      window.removeEventListener('musicplayer:play', handlePlayerPlay);
      window.removeEventListener('musicplayer:pause', handlePlayerPause);
      window.removeEventListener('musicplayer:ended', handlePlayerEnded);
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
