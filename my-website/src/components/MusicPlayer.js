import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'one', 'all'
  const audioRef = useRef(null);

  const playlist = React.useMemo(() => [
    { id: 1, title: 'Abot Kamay', artist: 'Orange & Lemons', file: 'Abot Kamay.mp3' },
    { id: 2, title: 'Always', artist: 'Daniel Caesar', file: 'Always.mp3' },
    { id: 3, title: 'Bawat Piyesa', artist: 'Munimuni', file: 'Bawat Piyesa.mp3' },
    { id: 4, title: 'Heaven Knows - This Angel Has Flown', artist: 'Orange & Lemons', file: 'Heaven Knows - This Angel Has Flown.mp3' },
    { id: 5, title: 'Kung Wala Ka', artist: 'Hale', file: 'Kung Wala Ka.mp3' },
    { id: 6, title: 'Sa Hindi Pag-Alala', artist: 'Munimuni', file: 'Sa Hindi Pag-Alala.mp3' },
    { id: 7, title: 'Sparks', artist: 'Coldplay', file: 'Sparks.mp3' },
    { id: 8, title: 'Telephones', artist: 'Vacations', file: 'Telephones.mp3' },
    { id: 9, title: 'The Day You Said Goodnight', artist: 'Hale', file: 'The Day You Said Goodnight.mp3' },
    { id: 10, title: 'Warning Sign', artist: 'Coldplay', file: 'Warning Sign.mp3' }
  ], []);

  const handleTrackSelect = React.useCallback((track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = `/songs/${track.file}`;
    }
  }, []);

  const handleNext = React.useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    
    let nextIndex;
    if (isShuffling) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    
    handleTrackSelect(playlist[nextIndex]);
  }, [currentTrack, isShuffling, playlist, handleTrackSelect]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      window.dispatchEvent(new Event('musicplayer:ended'));
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 'all' || isShuffling) {
        handleNext();
      } else {
        setIsPlaying(false);
      }
    };

    const handlePlayEvent = () => window.dispatchEvent(new Event('musicplayer:play'));
    const handlePauseEvent = () => window.dispatchEvent(new Event('musicplayer:pause'));

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
    };
  }, [repeatMode, isShuffling, handleNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);


  const togglePlayPause = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      window.dispatchEvent(new Event('musicplayer:pause'));
    } else {
      audioRef.current.play();
      window.dispatchEvent(new Event('musicplayer:play'));
    }
    setIsPlaying(!isPlaying);
  };


  const handlePrevious = () => {
    if (!currentTrack || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    
    handleTrackSelect(playlist[prevIndex]);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };


  return (
    <div className="music-player-terminal proficiency-card">
      <div className="terminal-header">
        <span className="terminal-dots">
          <span className="dot dot-red">●</span>
          <span className="dot dot-yellow">●</span>
          <span className="dot dot-green">●</span>
        </span>
        <span className="terminal-title">~/music --player</span>
        <span className="terminal-minimize">_</span>
      </div>

      <div className="terminal-body">
        <div className="music-description">
          <span className="music-prompt">kean@portfolio:~$</span>
          <span className="music-command">echo "kean loves music, why don't you play some of the songs he loves"</span>
        </div>
        
        <div className="music-output">
          kean loves music, why don't you play some of the songs he loves
        </div>

        <div className="music-interface">
          {/* Track List */}
          <div className="track-list-section">
            <div className="section-title">
              <span className="music-prompt">kean@portfolio:~$</span>
              <span className="music-command">ls songs/</span>
            </div>
            <div className="track-list">
              {playlist.map((track, index) => (
                <div 
                  key={track.id}
                  className={`track-item ${currentTrack?.id === track.id ? 'track-active' : ''}`}
                  onClick={() => handleTrackSelect(track)}
                >
                  <span className="track-index">[{String(index + 1).padStart(2, '0')}]</span>
                  <div className="track-info">
                    <span className="track-title">{track.title}</span>
                    <span className="track-artist">{track.artist}</span>
                  </div>
                  {currentTrack?.id === track.id && isPlaying && (
                    <span className="playing-indicator">♪</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Player Controls */}
          {currentTrack && (
            <div className="player-controls-section">
              <div className="section-title">
                <span className="music-prompt">kean@portfolio:~$</span>
                <span className="music-command">mpv "{currentTrack.title}"</span>
              </div>
              
              <div className="now-playing">
                <div className="current-track-info">
                  <div className="current-title">♫ {currentTrack.title}</div>
                  <div className="current-artist">by {currentTrack.artist}</div>
                </div>
                
                <div className="progress-section">
                  <div className="time-info">
                    <span className="current-time">{formatTime(currentTime)}</span>
                    <span className="duration">{formatTime(duration)}</span>
                  </div>
                  <div className="progress-bar" onClick={handleSeek}>
                    <div 
                      className="progress-fill"
                      style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
                
                <div className="controls">
                  <span 
                    className={`control-text ${isShuffling ? 'active' : ''}`}
                    onClick={toggleShuffle}
                    title="Toggle Shuffle"
                  >
                    [shuffle]
                  </span>
                  <span className="control-text" onClick={handlePrevious} title="Previous">
                    [prev]
                  </span>
                  <span className="control-text play-pause" onClick={togglePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? '[pause]' : '[play]'}
                  </span>
                  <span className="control-text" onClick={handleNext} title="Next">
                    [next]
                  </span>
                  <span 
                    className={`control-text ${repeatMode !== 'off' ? 'active' : ''}`}
                    onClick={toggleRepeat}
                    title={`Repeat: ${repeatMode}`}
                  >
                    {repeatMode === 'one' ? '[repeat-one]' : repeatMode === 'all' ? '[repeat-all]' : '[repeat-off]'}
                  </span>
                </div>
                
                <div className="volume-section">
                  <span className="volume-label">vol:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="volume-slider"
                  />
                  <span className="volume-value">{Math.round(volume * 100)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default MusicPlayer;
