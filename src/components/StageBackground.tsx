import React from 'react';

export const StageBackground: React.FC = () => {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <defs>
        {/* Smooth vertical fade for spotlight beams - eliminates sharp cuts at top and bottom */}
        <linearGradient id="beamFadeWhite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="12%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="beamFadePink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0167A" stopOpacity="0" />
          <stop offset="12%" stopColor="#E0167A" stopOpacity="0.10" />
          <stop offset="75%" stopColor="#E0167A" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#E0167A" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="beamFadeBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FC8F8" stopOpacity="0" />
          <stop offset="12%" stopColor="#7FC8F8" stopOpacity="0.18" />
          <stop offset="75%" stopColor="#7FC8F8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#7FC8F8" stopOpacity="0" />
        </linearGradient>

        {/* Soft edge blur filter for realistic light diffusion */}
        <filter id="softBeamBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>

        <radialGradient id="stageBottomGlow" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Spotlight beams — smoothly extended past top and bottom with gradient dissolve (hardware accelerated) */}
      <polygon
        className="beam"
        points="30,-120 90,-120 330,1050 -10,1050"
        fill="url(#beamFadeWhite)"
      />
      <polygon
        className="beam beam2"
        points="160,-120 220,-120 390,1050 50,1050"
        fill="url(#beamFadePink)"
      />
      <polygon
        className="beam beam3"
        points="290,-120 350,-120 440,1050 110,1050"
        fill="url(#beamFadeBlue)"
      />

      {/* Soft ambient floor light */}
      <ellipse cx="195" cy="844" rx="250" ry="120" fill="url(#stageBottomGlow)" />

      {/* Decorative sparkles */}
      <path className="tw" d="M340 410 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="#FFFFFF" />
      <path className="tw tw2" d="M40 380 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z" fill="#E0167A" />
      <path className="tw tw3" d="M360 160 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z" fill="#7FC8F8" />
      <path className="tw tw2" d="M120 760 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z" fill="#FFFFFF" />
    </svg>
  );
};
