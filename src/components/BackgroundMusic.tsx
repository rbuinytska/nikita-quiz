import React, { useState, useEffect, useRef } from 'react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [useSynth, setUseSynth] = useState(false);


  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const userPausedRef = useRef(false);

  const currentTrack = appConfig.playlist[currentTrackIndex] || {
    id: 'default',
    title: 'Праздничный вайб',
    artist: 'Квиз',
    src: '/audio/track1.mp3',
  };

  // Synthesizer chime generator (festive celebratory melody) if MP3 is not provided yet
  const playSynthChime = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Pleasant pentatonic celebration arpeggios
      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 392.00, 329.63, 261.63]; // C, E, G, C5, A, G, E, C
      let step = 0;

      const scheduleNote = () => {
        if (!isPlaying && !synthTimerRef.current) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = notes[step % notes.length];
        step++;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.55);

        synthTimerRef.current = window.setTimeout(scheduleNote, 400);
      };

      scheduleNote();
    } catch (e) {
      console.warn('Synth audio failed:', e);
    }
  };

  const stopSynth = () => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  // Handle play / pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      userPausedRef.current = true;
      if (audioRef.current) audioRef.current.pause();
      stopSynth();
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      startAudio();
    }
  };

  const startAudio = () => {
    if (audioRef.current && !useSynth) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If MP3 file is not found, fallback to Web Audio Synth!
          setUseSynth(true);
          setIsPlaying(true);
          playSynthChime();
        });
    } else {
      setIsPlaying(true);
      playSynthChime();
    }
  };

  // Switch to next track
  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % appConfig.playlist.length;
    setCurrentTrackIndex(nextIdx);
    setUseSynth(false);
    stopSynth();
    if (audioRef.current) {
      audioRef.current.src = resolveAudioSrc(appConfig.playlist[nextIdx].src);
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setUseSynth(true);
          playSynthChime();
        });
      }
    }
  };

  // Autoplay on first user interaction anywhere on the screen
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userPausedRef.current && !isPlaying) {
        startAudio();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying, useSynth]);

  // Audio ducking / pausing when a video starts playing
  useEffect(() => {
    const handleVideoPlay = () => {
      if (isPlaying) {
        if (audioRef.current) audioRef.current.pause();
        stopSynth();
      }
    };

    const handleVideoPause = () => {
      if (!userPausedRef.current) {
        if (useSynth) {
          playSynthChime();
        } else if (audioRef.current) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener('play', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'VIDEO') {
        handleVideoPlay();
      }
    }, true);

    document.addEventListener('pause', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'VIDEO') {
        handleVideoPause();
      }
    }, true);
    document.addEventListener('ended', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'VIDEO') {
        handleVideoPause();
      }
    }, true);
  }, [isPlaying, useSynth]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '12px',
        right: '14px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <audio
        ref={audioRef}
        src={resolveAudioSrc(currentTrack.src)}
        loop
        preload="auto"
        onError={() => {
          setUseSynth(true);
          if (isPlaying) playSynthChime();
        }}
      />

      {/* Floating mini widget */}
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={togglePlay}

          title={isPlaying ? `Играет: ${currentTrack.title} (нажмите для паузы)` : 'Включить музыку'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            borderRadius: '19px',
            border: isPlaying ? '2px solid #E0167A' : '2px solid #1A1020',
            background: isPlaying ? '#1A1020' : '#FFFFFF',
            color: isPlaying ? '#FFD6EA' : '#1A1020',
            boxShadow: '0 4px 14px rgba(26, 16, 32, 0.16)',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.2s ease',
          }}
        >
          {isPlaying ? (
            <svg
              className="spin"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E0167A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation: 'spin 4s linear infinite',
              }}
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" fill="#E0167A" />
              <path d="M12 2a10 10 0 0 0-4 1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1020" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>

        {/* Small next track pill when playing */}
        {isPlaying && (
          <button
            type="button"
            onClick={nextTrack}
            title="Следующий трек"
            style={{
              position: 'absolute',
              right: '-6px',
              bottom: '-6px',
              width: '20px',
              height: '20px',
              borderRadius: '10px',
              border: '1.5px solid #FFFFFF',
              background: '#E0167A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 900,
              padding: 0,
            }}
          >
            ⏭
          </button>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
