import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { appConfig } from '../config';
import { assetUrl } from '../utils/assets';

interface ParachuteDropScreenProps {
  onViewTicket: () => void;
}

export const ParachuteDropScreen: React.FC<ParachuteDropScreenProps> = ({ onViewTicket }) => {
  useEffect(() => {
    // Fire festive confetti!
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#E0167A', '#7FC8F8', '#1A1020', '#FFFFFF', '#FFD6EA'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#E0167A', '#7FC8F8', '#1A1020', '#FFFFFF', '#FFD6EA'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        minHeight: '100dvh',
        boxSizing: 'border-box',
        background: '#FFD6EA',
        color: '#1A1020',
        padding: 'max(16px, env(safe-area-inset-top, 16px)) 20px calc(24px + env(safe-area-inset-bottom, 16px))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}
    >
      {/* Sky background with rising clouds & confetti */}
      <svg
        aria-hidden="true"
        width="100%"
        height="100%"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', left: 0, top: 0, zIndex: -1, pointerEvents: 'none' }}
      >
        <g className="cu">
          <path d="M20 0 a22 22 0 0 1 40 -10 a17 17 0 0 1 30 12 a14 14 0 0 1 -3 28 h-64 a15 15 0 0 1 -3 -30 z" fill="#FFFFFF" />
        </g>
        <g className="cu cu2">
          <path d="M270 0 a28 28 0 0 1 52 -12 a22 22 0 0 1 38 15 a18 18 0 0 1 -4 36 h-82 a19 19 0 0 1 -4 -39 z" fill="#FFFFFF" opacity="0.85" />
        </g>
        <g className="cu cu3">
          <path d="M150 0 a16 16 0 0 1 30 -8 a12 12 0 0 1 22 9 a10 10 0 0 1 -2 20 h-46 a11 11 0 0 1 -4 -21 z" fill="#FFFFFF" opacity="0.7" />
        </g>
        <g className="away">
          <path d="M0 40 Q0 34 8 33 L48 33 Q58 34 60 40 Q58 46 48 47 L8 47 Q0 46 0 40 Z" fill="#FFFFFF" stroke="#1A1020" strokeWidth="2" />
          <path d="M4 33 L-2 22 L8 22 L16 33 Z" fill="#E0167A" stroke="#1A1020" strokeWidth="2" />
        </g>

        {/* Confetti rectangles in SVG */}
        <rect className="fall" x="40" y="0" width="10" height="16" rx="2" fill="#E0167A" />
        <rect className="fall" style={{ animationDelay: '1s' }} x="330" y="0" width="10" height="16" rx="2" fill="#7FC8F8" />
        <rect className="fall" style={{ animationDelay: '2s' }} x="110" y="0" width="8" height="14" rx="2" fill="#1A1020" />
        <rect className="fall" style={{ animationDelay: '3s' }} x="280" y="0" width="10" height="16" rx="2" fill="#E0167A" />
        <rect className="fall" style={{ animationDelay: '4s' }} x="200" y="0" width="8" height="14" rx="2" fill="#7FC8F8" />
        <circle className="fall" style={{ animationDelay: '2.5s' }} cx="70" cy="0" r="5" fill="#FFFFFF" />
        <circle className="fall" style={{ animationDelay: '0.5s' }} cx="350" cy="0" r="5" fill="#1A1020" />
      </svg>

      {/* Nikita parachuting illustration */}
      <div className="drop-in" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="glide" style={{ position: 'relative', width: '280px', height: '410px', marginTop: '10px', flexShrink: 0 }}>
          <svg
            role="img"
            aria-label="Никита летит на розовом парашюте"
            width="280"
            height="410"
            viewBox="0 0 280 430"
            style={{ position: 'absolute', left: 0, top: 0 }}
          >
            <path d="M14 120 Q140 -40 266 120 Q235 100 203 120 Q172 100 140 120 Q108 100 77 120 Q45 100 14 120 Z" fill="#E0167A" stroke="#1A1020" strokeWidth="3" strokeLinejoin="round" />
            <path d="M77 120 Q108 100 140 120 Q140 10 120 22 Q90 50 77 120 Z" fill="#FFFFFF" stroke="#1A1020" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M203 120 Q172 100 140 120 Q140 10 160 22 Q190 50 203 120 Z" fill="#7FC8F8" stroke="#1A1020" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M16 120 L118 300 M77 120 L126 300 M140 120 L140 300 M203 120 L154 300 M264 120 L162 300" stroke="#1A1020" strokeWidth="1.8" fill="none" />
            <path d="M108 330 Q140 312 172 330 L176 380 Q140 392 104 380 Z" fill="#FFFFFF" stroke="#1A1020" strokeWidth="3" strokeLinejoin="round" />
            <path d="M118 300 L112 336 M162 300 L168 336" stroke="#1A1020" strokeWidth="3" strokeLinecap="round" />
            <path d="M104 340 L80 312 M176 340 L200 312" stroke="#1A1020" strokeWidth="7" strokeLinecap="round" />
            <path d="M122 384 L112 420 M158 384 L170 420" stroke="#1A1020" strokeWidth="8" strokeLinecap="round" />
          </svg>

          {/* Photo head */}
          <div
            style={{
              position: 'absolute',
              left: '92px',
              top: '222px',
              width: '96px',
              height: '96px',
              boxSizing: 'border-box',
              borderRadius: '48px',
              border: '4px solid #FFFFFF',
              boxShadow: '0 0 0 3px #1A1020',
              overflow: 'hidden',
              background: '#FFE9F3',
            }}
          >
            <img
              src={assetUrl('assets/nikita.jpg')}
              alt="Никита"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>

      <div style={{ flexGrow: 1 }} />

      {/* Text and Button */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2 }}>
        <h1
          className="font-playfair"
          style={{
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: '38px',
            lineHeight: 1.05,
          }}
        >
          Ты прыгаешь с <span style={{ color: '#E0167A' }}>парашютом!!!</span>
        </h1>
        <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.45, fontWeight: 600, color: '#5C3A4E' }}>
          Это не шутка. Это твой подарок от {appConfig.fromWhom}
        </p>
        <button
          onClick={onViewTicket}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            height: '60px',
            marginTop: '4px',
            borderRadius: '999px',
            border: 0,
            background: '#1A1020',
            color: '#FFD6EA',
            fontWeight: 800,
            fontSize: '17px',
            boxShadow: '0 8px 24px rgba(26, 16, 32, 0.25)',
            cursor: 'pointer',
          }}
        >
          Посмотреть билет на прыжок 🎫
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD6EA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

