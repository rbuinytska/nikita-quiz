import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StageBackground } from './StageBackground';

interface BirthdayCakeScreenProps {
  onContinue: () => void;
}

export const BirthdayCakeScreen: React.FC<BirthdayCakeScreenProps> = ({ onContinue }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wished, setWished] = useState(false);

  useEffect(() => {
    // Initial celebration confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#E0167A', '#FFD6EA', '#FBBF24', '#7FC8F8', '#1A1020'],
    });
  }, []);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    setWished(true);

    // Big blast of confetti when blowing candles!
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD6EA', '#E0167A', '#FBBF24', '#FFFFFF', '#10B981'],
    });
  };

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
      }}
    >
      <StageBackground />

      <style>{`
        @keyframes dudeDance {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-12px) rotate(6deg); }
        }
        @keyframes armLeft {
          0%, 100% { transform: rotate(-35deg); }
          50% { transform: rotate(45deg); }
        }
        @keyframes armRight {
          0%, 100% { transform: rotate(45deg); }
          50% { transform: rotate(-35deg); }
        }
        @keyframes legLeft {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes legRight {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes peenWiggle {
          0%, 100% { transform: rotate(-28deg); }
          50% { transform: rotate(28deg); }
        }
        @keyframes flameFlicker {
          0%, 100% { transform: scale(1) skewX(0); opacity: 0.95; }
          50% { transform: scale(1.18, 1.3) skewX(-6deg); opacity: 1; }
        }
        @keyframes smokeRise {
          0% { transform: translateY(0) scale(0.6); opacity: 0.8; }
          100% { transform: translateY(-26px) scale(1.4); opacity: 0; }
        }
      `}</style>

      {/* Header Badge */}
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#E0167A',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '4px 14px',
            borderRadius: '999px',
            border: '1.5px solid #E0167A',
          }}
        >
          Праздничный стриптиз 🎂
        </div>
        <h1
          className="font-playfair"
          style={{
            margin: '4px 0 0',
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 'clamp(30px, 8vw, 38px)',
            lineHeight: 1.05,
          }}
        >
          Никите <span style={{ color: '#E0167A' }}>23 года!</span>
        </h1>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#5C3A4E' }}>
          {wished ? '✨ Желание отправлено во Вселенную!' : 'Танец в честь главного именинника!'}
        </p>
      </div>

      {/* Animated Cake & Dancing Dude SVG Scene */}
      <div
        style={{
          width: '100%',
          maxWidth: '340px',
          height: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          margin: '10px 0',
        }}
      >
        <svg
          viewBox="0 0 340 380"
          width="100%"
          height="100%"
          style={{ overflow: 'visible' }}
        >
          {/* Sparkles around cake */}
          <path d="M40 180 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill="#FBBF24" />
          <path d="M300 160 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill="#E0167A" />
          <path d="M50 280 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#7FC8F8" />
          <path d="M290 290 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#FBBF24" />

          {/* ================= CAKE ================= */}
          {/* Cake Plate */}
          <ellipse cx="170" cy="350" rx="140" ry="18" fill="#FFFFFF" stroke="#1A1020" strokeWidth="3" />
          <ellipse cx="170" cy="346" rx="132" ry="12" fill="#F3BCD6" />

          {/* Bottom Cake Tier */}
          <path
            d="M55 270 Q170 295 285 270 L285 330 Q170 355 55 330 Z"
            fill="#FFFFFF"
            stroke="#1A1020"
            strokeWidth="3.5"
          />
          {/* Bottom tier decorative stripes */}
          <path d="M70 285 Q170 310 270 285 L270 305 Q170 330 70 305 Z" fill="#FFD6EA" />
          {/* Bottom cream drips */}
          <path
            d="M55 270 q20 18 40 0 q20 22 40 0 q25 18 45 0 q20 20 40 0 q25 18 45 0 q15 15 20 0"
            fill="#E0167A"
          />

          {/* Top Cake Tier */}
          <path
            d="M85 200 Q170 225 255 200 L255 260 Q170 285 85 260 Z"
            fill="#FFF5FA"
            stroke="#1A1020"
            strokeWidth="3.5"
          />
          {/* Top tier frosting top */}
          <ellipse cx="170" cy="200" rx="85" ry="20" fill="#FFE9F3" stroke="#1A1020" strokeWidth="3.5" />
          {/* Top cream dripping down */}
          <path
            d="M85 205 q18 20 35 0 q20 24 40 0 q20 20 40 0 q20 25 35 0 q15 18 20 0"
            fill="#E0167A"
          />

          {/* Sprinkles on top tier */}
          <rect x="110" y="225" width="8" height="4" rx="2" fill="#7FC8F8" transform="rotate(25 110 225)" />
          <rect x="145" y="240" width="8" height="4" rx="2" fill="#FBBF24" transform="rotate(-30 145 240)" />
          <rect x="180" y="235" width="8" height="4" rx="2" fill="#10B981" transform="rotate(40 180 235)" />
          <rect x="220" y="228" width="8" height="4" rx="2" fill="#E0167A" transform="rotate(-15 220 228)" />

          {/* ================= CANDLES ================= */}
          {/* Candle 1 (Left) */}
          <g>
            <rect x="105" y="165" width="8" height="28" rx="2" fill="#7FC8F8" stroke="#1A1020" strokeWidth="1.5" />
            <line x1="109" y1="165" x2="109" y2="158" stroke="#1A1020" strokeWidth="1.5" />
            {!candlesBlown ? (
              <path
                d="M109 158 Q103 148 109 142 Q115 148 109 158 Z"
                fill="#FBBF24"
                style={{ transformOrigin: '109px 158px', animation: 'flameFlicker 0.4s infinite alternate' }}
              />
            ) : (
              <path d="M109 158 q-4 -8 2 -14" stroke="#9AA3B5" strokeWidth="1.8" fill="none" style={{ animation: 'smokeRise 1.2s infinite ease-out' }} />
            )}
          </g>

          {/* Candle 2 (Far Left) */}
          <g>
            <rect x="128" y="172" width="8" height="25" rx="2" fill="#FBBF24" stroke="#1A1020" strokeWidth="1.5" />
            <line x1="132" y1="172" x2="132" y2="165" stroke="#1A1020" strokeWidth="1.5" />
            {!candlesBlown ? (
              <path
                d="M132 165 Q126 155 132 149 Q138 155 132 165 Z"
                fill="#F59E0B"
                style={{ transformOrigin: '132px 165px', animation: 'flameFlicker 0.35s infinite alternate-reverse' }}
              />
            ) : (
              <path d="M132 165 q4 -8 -2 -14" stroke="#9AA3B5" strokeWidth="1.8" fill="none" style={{ animation: 'smokeRise 1.4s infinite ease-out' }} />
            )}
          </g>

          {/* Candle 3 (Right) */}
          <g>
            <rect x="204" y="172" width="8" height="25" rx="2" fill="#10B981" stroke="#1A1020" strokeWidth="1.5" />
            <line x1="208" y1="172" x2="208" y2="165" stroke="#1A1020" strokeWidth="1.5" />
            {!candlesBlown ? (
              <path
                d="M208 165 Q202 155 208 149 Q214 155 208 165 Z"
                fill="#F59E0B"
                style={{ transformOrigin: '208px 165px', animation: 'flameFlicker 0.38s infinite alternate' }}
              />
            ) : (
              <path d="M208 165 q-3 -8 3 -14" stroke="#9AA3B5" strokeWidth="1.8" fill="none" style={{ animation: 'smokeRise 1.3s infinite ease-out' }} />
            )}
          </g>

          {/* Candle 4 (Far Right) */}
          <g>
            <rect x="226" y="165" width="8" height="28" rx="2" fill="#E0167A" stroke="#1A1020" strokeWidth="1.5" />
            <line x1="230" y1="165" x2="230" y2="158" stroke="#1A1020" strokeWidth="1.5" />
            {!candlesBlown ? (
              <path
                d="M230 158 Q224 148 230 142 Q236 148 230 158 Z"
                fill="#FBBF24"
                style={{ transformOrigin: '230px 158px', animation: 'flameFlicker 0.42s infinite alternate-reverse' }}
              />
            ) : (
              <path d="M230 158 q4 -8 -2 -14" stroke="#9AA3B5" strokeWidth="1.8" fill="none" style={{ animation: 'smokeRise 1.1s infinite ease-out' }} />
            )}
          </g>

          {/* ================= DANCING GUY ON TOP OF CAKE ================= */}
          <g style={{ transformOrigin: '170px 195px', animation: 'dudeDance 0.6s infinite ease-in-out' }}>
            {/* Party Hat */}
            <polygon points="163,38 177,38 170,12" fill="#E0167A" stroke="#1A1020" strokeWidth="2" />
            <circle cx="170" cy="10" r="4" fill="#FBBF24" />
            <circle cx="168" cy="24" r="2" fill="#FFFFFF" />
            <circle cx="173" cy="30" r="2" fill="#7FC8F8" />

            {/* Head */}
            <circle cx="170" cy="54" r="16" fill="#FDE047" stroke="#1A1020" strokeWidth="3" />
            {/* Smiling happy face */}
            <circle cx="165" cy="51" r="2.2" fill="#1A1020" />
            <circle cx="175" cy="51" r="2.2" fill="#1A1020" />
            {/* Wink / Cheek blush */}
            <circle cx="162" cy="56" r="2.5" fill="#F43F5E" opacity="0.6" />
            <circle cx="178" cy="56" r="2.5" fill="#F43F5E" opacity="0.6" />
            {/* Big Smile */}
            <path d="M165 56 Q170 63 175 56" stroke="#1A1020" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* Torso */}
            <line x1="170" y1="70" x2="170" y2="120" stroke="#1A1020" strokeWidth="4.5" strokeLinecap="round" />

            {/* Left Arm (dancing in the air) */}
            <g style={{ transformOrigin: '170px 78px', animation: 'armLeft 0.6s infinite ease-in-out' }}>
              <path d="M170 78 L142 62 L132 40" stroke="#1A1020" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="132" cy="40" r="4" fill="#FDE047" stroke="#1A1020" strokeWidth="2" />
            </g>

            {/* Right Arm (dancing in the air) */}
            <g style={{ transformOrigin: '170px 78px', animation: 'armRight 0.6s infinite ease-in-out' }}>
              <path d="M170 78 L198 62 L208 40" stroke="#1A1020" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="208" cy="40" r="4" fill="#FDE047" stroke="#1A1020" strokeWidth="2" />
            </g>

            {/* Legs */}
            {/* Left Leg */}
            <g style={{ transformOrigin: '170px 120px', animation: 'legLeft 0.6s infinite ease-in-out' }}>
              <path d="M170 120 L150 155 L144 190" stroke="#1A1020" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <ellipse cx="140" cy="190" rx="8" ry="4" fill="#E0167A" stroke="#1A1020" strokeWidth="2" />
            </g>

            {/* Right Leg */}
            <g style={{ transformOrigin: '170px 120px', animation: 'legRight 0.6s infinite ease-in-out' }}>
              <path d="M170 120 L190 155 L196 190" stroke="#1A1020" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <ellipse cx="200" cy="190" rx="8" ry="4" fill="#E0167A" stroke="#1A1020" strokeWidth="2" />
            </g>

            {/* ================= THE PEEN (Swinging to the beat) ================= */}
            <g style={{ transformOrigin: '170px 122px', animation: 'peenWiggle 0.6s infinite ease-in-out' }}>
              {/* Balls */}
              <circle cx="165" cy="123" r="5.5" fill="#FBCFE8" stroke="#1A1020" strokeWidth="2" />
              <circle cx="175" cy="123" r="5.5" fill="#FBCFE8" stroke="#1A1020" strokeWidth="2" />

              {/* Shaft */}
              <rect x="166" y="123" width="8" height="24" rx="4" fill="#F472B6" stroke="#1A1020" strokeWidth="2" />

              {/* Head */}
              <ellipse cx="170" cy="148" rx="6" ry="5.5" fill="#FB7185" stroke="#1A1020" strokeWidth="2" />
              <line x1="170" y1="145" x2="170" y2="150" stroke="#1A1020" strokeWidth="1.5" />

              {/* Motion lines around swinging peen */}
              <path d="M156 138 Q158 144 156 150" stroke="#E0167A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M184 138 Q182 144 184 150" stroke="#E0167A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        {/* Blow Candles Button */}
        {!candlesBlown ? (
          <button
            type="button"
            onClick={handleBlowCandles}
            style={{
              width: '100%',
              height: '56px',
              borderRadius: '999px',
              border: 0,
              background: '#FBBF24',
              color: '#1A1020',
              fontWeight: 800,
              fontSize: '17px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 6px 20px rgba(251, 191, 36, 0.4)',
              transition: 'transform 0.15s ease',
            }}
          >
            <span>💨 Задуть свечи и загадать желание</span>
          </button>
        ) : (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '10px 16px',
              borderRadius: '16px',
              border: '2px solid #10B981',
              color: '#065F46',
              fontWeight: 800,
              fontSize: '15px',
            }}
          >
            🎉 Свечи задуты! Желание 100% сбудется!
          </div>
        )}

        {/* Main Continue Button: Go to Flight Ticket */}
        <button
          type="button"
          onClick={onContinue}
          style={{
            width: '100%',
            height: '60px',
            borderRadius: '999px',
            border: 0,
            background: '#E0167A',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '17px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(224, 22, 122, 0.35)',
            marginTop: '2px',
          }}
        >
          <span>Забрать главный подарок 🪂</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
