import React, { useState, useEffect, useRef } from 'react';

interface PlaneShakeScreenProps {
  onFinish: () => void;
}

export const PlaneShakeScreen: React.FC<PlaneShakeScreenProps> = ({ onFinish }) => {
  const [shakeProgress, setShakeProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    let lastTime = Date.now();
    let lastX = 0, lastY = 0, lastZ = 0;

    const handleMotion = (event: DeviceMotionEvent) => {
      if (completedRef.current) return;
      const current = event.accelerationIncludingGravity;
      if (!current) return;

      const now = Date.now();
      if (now - lastTime > 100) {
        const diffTime = now - lastTime;
        lastTime = now;

        const x = current.x || 0;
        const y = current.y || 0;
        const z = current.z || 0;

        const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;

        if (speed > 450) {
          setShakeProgress((prev) => {
            const next = Math.min(100, prev + 15);
            return next;
          });
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  // When 100% reached, trigger vibration, flash, and transition
  useEffect(() => {
    if (shakeProgress >= 100 && !completedRef.current) {
      completedRef.current = true;
      try {
        navigator.vibrate?.(200);
      } catch {
        // ignore
      }
      setFlash(true);
      const timer = setTimeout(() => {
        onFinish();
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [shakeProgress, onFinish]);

  const handleManualShake = () => {
    setShakeProgress((prev) => Math.min(100, prev + 25));
  };

  return (
    <div
      onClick={handleManualShake}
      style={{
        flex: 1,
        width: '100%',
        minHeight: '100dvh',
        boxSizing: 'border-box',
        background: '#FFD6EA',
        color: '#1A1020',
        padding: 'max(20px, env(safe-area-inset-top, 20px)) 24px calc(24px + env(safe-area-inset-bottom, 16px))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '18px',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      {flash && <div className="screen-flash" />}

      {/* Drifting clouds SVG background */}
      <svg
        aria-hidden="true"
        width="100%"
        height="100%"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', left: 0, top: 0, zIndex: -1, pointerEvents: 'none' }}
      >
        <g className="cl">
          <path d="M0 170 a22 22 0 0 1 40 -10 a17 17 0 0 1 30 12 a14 14 0 0 1 -3 28 h-64 a15 15 0 0 1 -3 -30 z" fill="#FFFFFF" />
        </g>
        <g className="cl cl2">
          <path d="M0 470 a28 28 0 0 1 52 -12 a22 22 0 0 1 38 15 a18 18 0 0 1 -4 36 h-82 a19 19 0 0 1 -4 -39 z" fill="#FFFFFF" opacity="0.85" />
        </g>
        <g className="cl cl3">
          <path d="M0 330 a16 16 0 0 1 30 -8 a12 12 0 0 1 22 9 a10 10 0 0 1 -2 20 h-46 a11 11 0 0 1 -4 -21 z" fill="#FFFFFF" opacity="0.7" />
        </g>
        <g className="cl cl2">
          <path d="M0 690 a22 22 0 0 1 40 -10 a17 17 0 0 1 30 12 a14 14 0 0 1 -3 28 h-64 a15 15 0 0 1 -3 -30 z" fill="#FFFFFF" />
        </g>
      </svg>

      <div
        style={{
          padding: '7px 14px',
          borderRadius: '999px',
          background: '#1A1020',
          color: '#FFD6EA',
          fontSize: '13px',
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        Подарок уже в воздухе
      </div>

      {/* Airplane SVG */}
      <svg
        className="fly"
        role="img"
        aria-label="Розовый самолёт"
        width="290"
        height="140"
        viewBox="0 0 290 140"
        style={{ marginTop: '14px', flexShrink: 0 }}
      >
        <path d="M30 70 Q30 50 60 48 L230 48 Q272 50 280 70 Q272 92 230 94 L60 94 Q30 92 30 70 Z" fill="#FFFFFF" stroke="#1A1020" strokeWidth="3" />
        <path d="M44 48 L22 10 L50 10 L84 48 Z" fill="#E0167A" stroke="#1A1020" strokeWidth="3" strokeLinejoin="round" />
        <path d="M130 80 L180 80 L150 132 L120 132 Z" fill="#E0167A" stroke="#1A1020" strokeWidth="3" strokeLinejoin="round" />
        <path d="M36 74 H276" stroke="#E0167A" strokeWidth="6" />
        <circle cx="200" cy="62" r="6" fill="#7FC8F8" stroke="#1A1020" strokeWidth="2" />
        <circle cx="178" cy="62" r="6" fill="#7FC8F8" stroke="#1A1020" strokeWidth="2" />
        <circle cx="156" cy="62" r="6" fill="#7FC8F8" stroke="#1A1020" strokeWidth="2" />
        <circle cx="134" cy="62" r="6" fill="#7FC8F8" stroke="#1A1020" strokeWidth="2" />
        <path d="M250 58 Q268 60 272 70 L250 70 Z" fill="#7FC8F8" stroke="#1A1020" strokeWidth="2" strokeLinejoin="round" />
        <rect x="88" y="54" width="22" height="36" rx="5" fill="#FFE9F3" stroke="#1A1020" strokeWidth="2.5" />
        <text x="99" y="76" textAnchor="middle" fontFamily="Montserrat, system-ui, sans-serif" fontWeight="900" fontSize="16" fill="#E0167A">
          ?
        </text>
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1
          className="font-playfair"
          style={{
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: '44px',
            lineHeight: 1,
          }}
        >
          Потряси<br />телефон!
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.45, fontWeight: 600, color: '#5C3A4E' }}>
          Сильнее. Ещё сильнее. Кажется, сейчас что-то выпадет…
        </p>
      </div>

      {/* Phone shake illustration */}
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          className="shake-icon"
          aria-hidden="true"
          width="110"
          height="110"
          viewBox="0 0 120 120"
          fill="none"
          stroke="#1A1020"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="40" y="20" width="40" height="76" rx="9" fill="#FFFFFF" />
          <path d="M54 86h12" />
          <path className="pulse" d="M24 40c-6 8-6 24 0 32M14 32c-10 14-10 34 0 48M96 40c6 8 6 24 0 32M106 32c10 14 10 34 0 48" stroke="#E0167A" />
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 800 }}>
          <span>Тряска</span>
          <span>{shakeProgress}%</span>
        </div>
        <div
          aria-hidden="true"
          style={{
            height: '16px',
            boxSizing: 'border-box',
            borderRadius: '8px',
            border: '2px solid #1A1020',
            background: '#FFFFFF',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${shakeProgress}%`,
              height: '100%',
              background: '#E0167A',
              transition: 'width 0.2s ease',
            }}
          />
        </div>
      </div>

      {/* Fallback button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onFinish();
        }}
        style={{
          background: 'transparent',
          border: 0,
          minHeight: '44px',
          padding: '0 12px',
          fontSize: '14px',
          fontWeight: 700,
          color: '#5C3A4E',
          textDecoration: 'underline',
        }}
      >
        Не трясётся? Нажми сюда
      </button>
    </div>
  );
};

