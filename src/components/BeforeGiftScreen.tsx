import React from 'react';
import { StageBackground } from './StageBackground';
import { appConfig } from '../config';

interface BeforeGiftScreenProps {
  onOpen: () => void;
}

export const BeforeGiftScreen: React.FC<BeforeGiftScreenProps> = ({ onOpen }) => {
  const handleClick = async () => {
    // Request DeviceMotionEvent permission on iOS 13+ on user gesture
    try {
      const DME = window.DeviceMotionEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };
      if (typeof DME?.requestPermission === 'function') {
        await DME.requestPermission();
      }
    } catch (e) {
      console.warn('DeviceMotionEvent permission error:', e);
    }
    onOpen();
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

      {/* Top Lanyard Ribbon */}
      <svg
        aria-hidden="true"
        width="110"
        height="126"
        viewBox="0 0 110 126"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      >
        <path d="M26 0 L55 114 M84 0 L55 114" stroke="#E0167A" strokeWidth="15" strokeLinecap="round" />
        <rect x="41" y="102" width="28" height="28" rx="6" fill="#9AA3B5" stroke="#1A1020" strokeWidth="2" />
      </svg>

      {/* Dark Swaying Badge */}
      <div
        className="sway"
        style={{
          marginTop: '120px',
          width: 'min(280px, 86vw)',
          boxSizing: 'border-box',
          borderRadius: '22px',
          background: '#1A1020',
          border: '2px solid #1A1020',
          boxShadow: '0 18px 40px rgba(26, 16, 32, 0.22)',
          overflow: 'hidden',
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 20px 16px',
            background: '#E0167A',
            color: '#FFFFFF',
          }}
        >
          <div
            aria-hidden="true"
            style={{ width: '54px', height: '10px', borderRadius: '5px', background: '#FFD6EA' }}
          />
          <div
            style={{
              fontWeight: 900,
              fontSize: '15px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Доступ открыт
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            padding: '18px 20px 24px',
            color: '#FFFFFF',
          }}
        >
          <div
            className="font-playfair"
            aria-hidden="true"
            style={{
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: '100px',
              lineHeight: 1,
              color: '#FFD6EA',
            }}
          >
            ?
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#F3BCD6',
            }}
          >
            подарок внутри
          </div>
        </div>
      </div>

      <div style={{ minHeight: '16px', flexGrow: 1 }} />

      {/* Bottom copy & Button */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          textAlign: 'center',
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#E0167A',
          }}
        >
          Все проверки пройдены
        </div>
        <h2
          className="font-playfair"
          style={{
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 'clamp(28px, 8vw, 34px)',
            lineHeight: 1.05,
          }}
        >
          Ты прошёл. Теперь самое жёсткое
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            lineHeight: 1.45,
            fontWeight: 500,
            color: '#5C3A4E',
          }}
        >
          Внутри — подарок от {appConfig.fromWhom}. Сядь. Подыши. Готов?
        </p>

        <button
          onClick={handleClick}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            height: '60px',
            borderRadius: '999px',
            border: 0,
            background: '#E0167A',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '17px',
            letterSpacing: '0.04em',
            boxShadow: '0 8px 24px rgba(224, 22, 122, 0.35)',
            cursor: 'pointer',
          }}
        >
          Открывай, я готов
        </button>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#5C3A4E' }}>
          Держи телефон крепче 📱
        </div>
      </div>
    </div>
  );
};
