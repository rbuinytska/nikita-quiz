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
      }}
    >
      {/* Spotlight beams — gentle, not overwhelming */}
      <polygon className="beam" points="50,0 70,0 270,780 30,780" fill="#FFFFFF" opacity="0.45" />
      <polygon className="beam beam2" points="185,0 205,0 310,780 80,780" fill="#E0167A" opacity="0.10" />
      <polygon className="beam beam3" points="320,0 340,0 360,780 120,780" fill="#7FC8F8" opacity="0.20" />

      {/* Stage light ellipse at bottom */}
      <ellipse cx="195" cy="844" rx="230" ry="70" fill="#FFFFFF" opacity="0.35" />

      {/* Top stage lights fixtures */}
      <rect x="44" y="-8" width="32" height="20" rx="5" fill="#1A1020" />
      <rect x="179" y="-8" width="32" height="20" rx="5" fill="#1A1020" />
      <rect x="314" y="-8" width="32" height="20" rx="5" fill="#1A1020" />
      <circle cx="60" cy="14" r="5" fill="#FFFFFF" />
      <circle cx="195" cy="14" r="5" fill="#FFFFFF" />
      <circle cx="330" cy="14" r="5" fill="#FFFFFF" />

      {/* Decorative sparkles */}
      <path className="tw" d="M340 410 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="#FFFFFF" />
      <path className="tw tw2" d="M40 380 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z" fill="#E0167A" />
      <path className="tw tw3" d="M360 160 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z" fill="#7FC8F8" />
      <path className="tw tw2" d="M120 760 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z" fill="#FFFFFF" />
    </svg>
  );
};
