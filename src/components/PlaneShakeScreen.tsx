import React, { useState, useEffect, useRef } from 'react';

interface PlaneShakeScreenProps {
  onFinish: () => void;
}

export const PlaneShakeScreen: React.FC<PlaneShakeScreenProps> = ({ onFinish }) => {
  const [shakeProgress, setShakeProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const [isRumbling, setIsRumbling] = useState(false);
  const completedRef = useRef(false);

  const [needsPermission, setNeedsPermission] = useState<boolean>(() => {
    return (
      typeof window !== 'undefined' &&
      typeof (window as any).DeviceMotionEvent?.requestPermission === 'function'
    );
  });
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const lastTimeRef = useRef(Date.now());
  const isInitializedRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const lastZRef = useRef(0);

  // Synthesize cockpit turbulence sound via Web Audio API (works on iOS & Android!)
  const playRumbleSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(70, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Audio context might be restricted before user tap
    }
  };

  const triggerShakeEffect = (amount = 20) => {
    setIsRumbling(true);
    playRumbleSound();
    try {
      navigator.vibrate?.(45);
    } catch {}

    setShakeProgress((prev) => Math.min(100, prev + amount));
    setTimeout(() => setIsRumbling(false), 220);
  };

  const handleMotion = (event: DeviceMotionEvent) => {
    if (completedRef.current) return;

    // Prioritize accelerationIncludingGravity because on iOS event.acceleration.x is often null!
    const acc = event.accelerationIncludingGravity || event.acceleration;
    if (!acc) return;

    const x = typeof acc.x === 'number' ? acc.x : 0;
    const y = typeof acc.y === 'number' ? acc.y : 0;
    const z = typeof acc.z === 'number' ? acc.z : 0;

    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      lastXRef.current = x;
      lastYRef.current = y;
      lastZRef.current = z;
      lastTimeRef.current = Date.now();
      return;
    }

    const now = Date.now();
    const diffTime = now - lastTimeRef.current;
    if (diffTime > 70) {
      lastTimeRef.current = now;

      const deltaX = Math.abs(x - lastXRef.current);
      const deltaY = Math.abs(y - lastYRef.current);
      const deltaZ = Math.abs(z - lastZRef.current);
      const totalDelta = deltaX + deltaY + deltaZ;

      // Realistic and responsive threshold
      if (totalDelta > 2.8 || (totalDelta / diffTime) * 10000 > 140) {
        triggerShakeEffect(20);
      }

      lastXRef.current = x;
      lastYRef.current = y;
      lastZRef.current = z;
    }
  };

  const requestMotionPermission = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const DME = (window as any).DeviceMotionEvent;
      if (typeof DME?.requestPermission === 'function') {
        const res = await DME.requestPermission();
        if (res === 'granted') {
          setPermissionGranted(true);
          setNeedsPermission(false);
          window.addEventListener('devicemotion', handleMotion);
        }
      }
    } catch (err) {
      console.warn('Error requesting motion permission:', err);
    }
    triggerShakeEffect(25);
  };

  useEffect(() => {
    if (!needsPermission) {
      window.addEventListener('devicemotion', handleMotion);
      return () => window.removeEventListener('devicemotion', handleMotion);
    }
  }, [needsPermission]);

  useEffect(() => {
    if (permissionGranted) {
      window.addEventListener('devicemotion', handleMotion);
      return () => window.removeEventListener('devicemotion', handleMotion);
    }
  }, [permissionGranted]);

  // When 100% reached, trigger flash, victory sound, and transition
  useEffect(() => {
    if (shakeProgress >= 100 && !completedRef.current) {
      completedRef.current = true;
      try {
        navigator.vibrate?.(250);
      } catch {}
      setFlash(true);
      const timer = setTimeout(() => {
        onFinish();
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [shakeProgress, onFinish]);

  const handleScreenTap = () => {
    if (needsPermission && !permissionGranted) {
      requestMotionPermission();
    }
    triggerShakeEffect(25);
  };

  return (
    <div
      onClick={handleScreenTap}
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
        gap: '16px',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        cursor: 'pointer',
        transform: isRumbling ? 'translate(-3px, 2px) rotate(-0.5deg)' : 'none',
        transition: 'transform 0.05s ease',
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

      {/* Airplane SVG with turbulence animation */}
      <svg
        className={isRumbling ? 'shake-icon' : 'fly'}
        role="img"
        aria-label="Розовый самолёт"
        width="290"
        height="140"
        viewBox="0 0 320 160"
        style={{ margin: '4px 0', flexShrink: 0 }}
      >
        <path d="M40 85 C100 83 230 83 270 78 C285 76 295 82 290 88 C280 94 250 96 220 96 C160 96 70 96 40 93 Z" fill="#FFFFFF" stroke="#1A1020" strokeWidth="4" />
        <path d="M140 86 L110 32 C106 25 116 23 125 28 L180 86 Z" fill="#E0167A" stroke="#1A1020" strokeWidth="4" strokeLinejoin="round" />
        <path d="M150 93 L120 145 C116 151 126 154 135 149 L190 93 Z" fill="#E0167A" stroke="#1A1020" strokeWidth="4" strokeLinejoin="round" />
        <path d="M45 85 L30 45 C28 40 35 38 42 42 L65 85 Z" fill="#E0167A" stroke="#1A1020" strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="260" cy="84" rx="9" ry="5" fill="#7FC8F8" stroke="#1A1020" strokeWidth="2.5" />
        <ellipse cx="235" cy="85" rx="5" ry="5" fill="#7FC8F8" />
        <ellipse cx="215" cy="85" rx="5" ry="5" fill="#7FC8F8" />
        <ellipse cx="195" cy="85" rx="5" ry="5" fill="#7FC8F8" />
        <ellipse cx="175" cy="85" rx="5" ry="5" fill="#7FC8F8" />
      </svg>

      {/* Text instructions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '320px' }}>
        <h1
          className="font-playfair"
          style={{
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 'clamp(28px, 8vw, 36px)',
            lineHeight: 1.05,
          }}
        >
          Держи телефон <span style={{ color: '#E0167A' }}>обеими руками!</span>
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.45, fontWeight: 600, color: '#5C3A4E' }}>
          Наш самолёт на высоте 4000 метров. Потряси телефон изо всех сил или тапай по экрану! ✈️
        </p>

        {needsPermission && !permissionGranted && (
          <button
            type="button"
            onClick={requestMotionPermission}
            style={{
              background: '#E0167A',
              color: '#FFFFFF',
              border: '2px solid #1A1020',
              borderRadius: '999px',
              padding: '12px 18px',
              fontSize: '14px',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(224, 22, 122, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '4px',
            }}
          >
            <span>📱 Разрешить датчик тряски</span>
          </button>
        )}
      </div>

      {/* Shake phone icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 800 }}>
          <span>Тряска самолёта</span>
          <span>{shakeProgress}%</span>
        </div>
        <div
          aria-hidden="true"
          style={{
            height: '18px',
            boxSizing: 'border-box',
            borderRadius: '9px',
            border: '2px solid #1A1020',
            background: '#FFFFFF',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${shakeProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #F472B6, #E0167A)',
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
          cursor: 'pointer',
        }}
      >
        Не трясётся? Нажми сюда
      </button>
    </div>
  );
};
