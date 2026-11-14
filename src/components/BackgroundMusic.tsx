import React, { useEffect, useRef } from 'react';
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
  const track = appConfig.playlist[0] || {
    id: 'default',
    title: 'Праздничный вайб',
    src: 'audio/birthday-vibe.mp3',
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set comfortable background volume
    audio.volume = 0.35;

    // Autoplay on first touch/click anywhere (browser policy requirement)
    const handleFirstTap = () => {
      audio.play().catch(() => {});
      window.removeEventListener('click', handleFirstTap);
      window.removeEventListener('touchstart', handleFirstTap);
    };

    window.addEventListener('click', handleFirstTap);
    window.addEventListener('touchstart', handleFirstTap);

    // Pause music while video questions are playing
    const handleVideoPlay = () => {
      audio.pause();
    };

    const handleVideoEnd = () => {
      audio.play().catch(() => {});
    };

    document.addEventListener('play', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'VIDEO') {
        handleVideoPlay();
      }
    }, true);

    document.addEventListener('pause', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'VIDEO') {
        handleVideoEnd();
      }
    }, true);

    document.addEventListener('ended', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'VIDEO') {
        handleVideoEnd();
      }
    }, true);

    return () => {
      window.removeEventListener('click', handleFirstTap);
      window.removeEventListener('touchstart', handleFirstTap);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={resolveAudioSrc(track.src)}
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};
