import React, { useState, useRef, useEffect } from 'react';
import './BackgroundMusic.css';

const BackgroundMusic = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);
  const currentIndexRef = useRef(0);
  const unlockedRef = useRef(false); // becomes true after first user interaction
  
  // All available background music files
  const bgMusicList = [
    {
      title: 'ZEDD x VALORANT Music Theme',
      file: 'ZEDD x VALORANT Music Theme.mp3'
    },
    {
      title: 'Batman - Return of the Joker (NES) - Stage 4',
      file: 'Batman - Return of the Joker (NES) - Stage 4 Music.mp3'
    },
    {
      title: 'Megaman 3 Theme',
      file: 'Megaman 3 Theme.mp3'
    },
    {
      title: 'Tetris (NES) Music - Music 03 Fast',
      file: 'Tetris (NES) Music - Music 03 Fast.mp3'
    }
  ];

  // Initialize with random song
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * bgMusicList.length);
    currentIndexRef.current = randomIndex;
    setCurrentSong(bgMusicList[randomIndex]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Main audio setup and event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    // Set up audio properties
    const targetVolume = 0.05; // 5% volume cap
    audio.volume = Math.min(audio.volume || targetVolume, targetVolume);
    audio.muted = true; // start muted
    audio.loop = false; // Don't loop single songs

    // Clamp volume to target at all times
    const clampVolume = () => {
      if (audio.volume > targetVolume) audio.volume = targetVolume;
    };

    // Track whether we paused due to music player
    let suspendedByPlayer = false;

    // Show notification helper
    const showNotificationWithTimeout = () => {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 7000);
    };

    // Enable sound and start playback on first user gesture
    const enableSound = async () => {
      if (!audio) return;
      try {
        unlockedRef.current = true;
        audio.muted = false;
        audio.volume = targetVolume;
        // Always start from beginning on first interact if not yet played
        if (audio.currentTime > 0 && audio.paused) {
          audio.currentTime = 0;
        }
        await audio.play();
        showNotificationWithTimeout();
        removeGestureListeners();
      } catch (e) {
        // If play fails, keep listeners for next gesture
      }
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
        suspendedByPlayer = false;
      }
    };
    const handlePlayerEnded = () => {
      if (suspendedByPlayer) {
        audio.muted = false;
        audio.volume = targetVolume;
        audio.play().catch(() => {});
        suspendedByPlayer = false;
      }
    };

    // Handle background music ending - switch to next random song
    const handleBgMusicEnded = () => {
      console.log('Background music ended, switching to next random song');
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * bgMusicList.length);
      } while (newIndex === currentIndexRef.current && bgMusicList.length > 1);
      
      currentIndexRef.current = newIndex;
      const nextSong = bgMusicList[newIndex];
      setCurrentSong(nextSong);
      
      // Update audio source and play if unlocked
      setTimeout(() => {
        audio.src = `/bgmusic/${nextSong.file}`;
        audio.load();
        audio.muted = !unlockedRef.current;
        audio.volume = targetVolume;
        if (unlockedRef.current) {
          audio.play().then(() => {
            showNotificationWithTimeout();
          }).catch(() => {
            // If playback fails, will wait for next user gesture
          });
        }
      }, 100);
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

    const handleCanPlay = () => {
      // Only prevent autoplay if user hasn't interacted yet
      if (!unlockedRef.current) {
        try { audio.pause(); } catch {}
        if (audio.currentTime !== 0) audio.currentTime = 0;
      } else {
        // User has already interacted, allow automatic playback
        audio.muted = false;
        audio.volume = targetVolume;
        audio.play().then(() => {
          showNotificationWithTimeout();
        }).catch(() => {
          console.log('Autoplay failed for subsequent song, will retry on next gesture');
        });
      }
    };

    // Load and setup the audio
    audio.src = `/bgmusic/${currentSong.file}`;
    audio.load();

    // Attach event listeners
    addGestureListeners();
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleBgMusicEnded);
    audio.addEventListener('volumechange', clampVolume);
    window.addEventListener('musicplayer:play', handlePlayerPlay);
    window.addEventListener('musicplayer:pause', handlePlayerPause);
    window.addEventListener('musicplayer:ended', handlePlayerEnded);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleBgMusicEnded);
      audio.removeEventListener('volumechange', clampVolume);
      window.removeEventListener('musicplayer:play', handlePlayerPlay);
      window.removeEventListener('musicplayer:pause', handlePlayerPause);
      window.removeEventListener('musicplayer:ended', handlePlayerEnded);
      removeGestureListeners();
    };
  }, [currentSong]); // Only re-run when song changes

  // Don't render anything until we have a song selected
  if (!currentSong) return null;

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        playsInline
      />
      
      {/* Terminal-style notification */}
      {showNotification && (
        <div className="bg-music-notification">
          <div className="notification-content">
            <span className="notification-prompt">kean@portfolio:~$</span>
            <span className="notification-text"> Now playing: {currentSong.title}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
