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

      {/* Floating Music Toggle Button in Top-Left */}
      <button
        type="button"
        onClick={handleToggle}
        title={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
        style={{
          position: 'fixed',
          top: 'max(8px, env(safe-area-inset-top, 8px))',
          left: '10px',
          zIndex: 99999,
          background: isPlaying ? 'rgba(26, 16, 32, 0.88)' : 'rgba(255, 255, 255, 0.92)',
          color: isPlaying ? '#FFD6EA' : '#1A1020',
          border: isPlaying ? '1.5px solid #E0167A' : '1.5px solid #1A1020',
          borderRadius: '999px',
          padding: '6px 11px',
          fontSize: '11px',
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.22)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.15s ease',
        }}
      >
        <span style={{ fontSize: '13px' }}>{isPlaying ? '🎵' : '🔇'}</span>
        <span>{isPlaying ? 'Музыка' : 'Вкл звук'}</span>
      </button>
    </>
  );
};
