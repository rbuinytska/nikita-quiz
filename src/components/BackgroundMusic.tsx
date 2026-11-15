import React, { useEffect, useRef, useState } from 'react';
import { appConfig } from '../config';

const resolveAudioSrc = (src: string) => {
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const clean = src.replace(/^\.?\//, '');
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + '/';
  return `${base}${clean}`;
};

export const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [userWantsMute, setUserWantsMute] = useState<boolean>(false);
  const isVideoActiveRef = useRef<boolean>(false);

  const track = appConfig.playlist[0] || {
    id: 'default',
    title: 'Праздничный вайб',
    src: 'audio/birthday-vibe.mp3',
  };

  // Safe play helper
  const tryPlayAudio = () => {
    const audio = audioRef.current;
    if (!audio || userWantsMute || isVideoActiveRef.current) return;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Browser autoplay policy might reject without gesture
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    // Autoplay on first user interaction anywhere
    const handleFirstTap = () => {
      if (!userWantsMute && !isVideoActiveRef.current) {
        tryPlayAudio();
      }
      window.removeEventListener('click', handleFirstTap);
      window.removeEventListener('touchstart', handleFirstTap);
    };

    window.addEventListener('click', handleFirstTap);
    window.addEventListener('touchstart', handleFirstTap);

    // Track video play/pause/ended globally
    const handleVideoPlay = () => {
      isVideoActiveRef.current = true;
      audio.pause();
      setIsPlaying(false);
    };

    const handleVideoStop = () => {
      // Check if any video is still actively playing
      setTimeout(() => {
        const anyPlaying = Array.from(document.querySelectorAll('video')).some(
          (v) => !v.paused && !v.ended && v.readyState > 2
        );
        if (!anyPlaying) {
          isVideoActiveRef.current = false;
          if (!userWantsMute) {
            tryPlayAudio();
          }
        }
      }, 150);
    };

    document.addEventListener('play', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'VIDEO') {
        handleVideoPlay();
      }
    }, true);

    document.addEventListener('pause', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'VIDEO') {
        handleVideoStop();
      }
    }, true);

    document.addEventListener('ended', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'VIDEO') {
        handleVideoStop();
      }
    }, true);

    // Watch for DOM changes (e.g. video unmounting when question is answered)
    const observer = new MutationObserver(() => {
      if (isVideoActiveRef.current) {
        const anyPlaying = Array.from(document.querySelectorAll('video')).some(
          (v) => !v.paused && !v.ended
        );
        if (!anyPlaying) {
          isVideoActiveRef.current = false;
          if (!userWantsMute) {
            tryPlayAudio();
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('click', handleFirstTap);
      window.removeEventListener('touchstart', handleFirstTap);
      observer.disconnect();
    };
  }, [userWantsMute]);

  // Toggle button handler
  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setUserWantsMute(true);
    } else {
      setUserWantsMute(false);
      isVideoActiveRef.current = false;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio play error:', e);
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={resolveAudioSrc(track.src)}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />

      {/* Floating Music Toggle Docked to the Side Edge */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
        title={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
        style={{
          position: 'fixed',
          top: '38%',
          right: 0,
          transform: 'translateY(-50%)',
          zIndex: 99999,
          background: isPlaying ? 'rgba(26, 16, 32, 0.92)' : 'rgba(255, 255, 255, 0.92)',
          color: isPlaying ? '#FFD6EA' : '#1A1020',
          border: isPlaying ? '1.5px solid #E0167A' : '1.5px solid #1A1020',
          borderRight: 'none',
          borderRadius: '16px 0 0 16px',
          padding: '8px 6px 8px 9px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          boxShadow: '-3px 4px 14px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span className={isPlaying ? 'pulse' : ''} style={{ fontSize: '15px', lineHeight: 1 }}>
          {isPlaying ? '🎵' : '🔇'}
        </span>
        <span
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontSize: '9px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.85,
          }}
        >
          {isPlaying ? 'Звук' : 'Вкл'}
        </span>
      </button>
    </>
  );
};
