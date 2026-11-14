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
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        background: '#FFD6EA',
        color: '#1A1020',
        padding: '0 22px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <StageBackground showLanyard lanyardLength={118} />

      {/* Dark Swaying Badge */}
      <div
        className="sway"
        style={{
          marginTop: '135px',
          width: '270px',
          boxSizing: 'border-box',
          borderRadius: '22px',
          background: '#1A1020',
          border: '2px solid #1A1020',
          boxShadow: '0 18px 40px rgba(26, 16, 32, 0.22)',
          overflow: 'hidden',
          zIndex: 2,
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
              fontSize: '110px',
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

      <div style={{ flexGrow: 1 }} />

      {/* Bottom copy & Button */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          textAlign: 'center',
          zIndex: 2,
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
            fontSize: '34px',
            lineHeight: 1.05,
          }}
        >
          Ты прошёл. Теперь самое жёсткое
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '16px',
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
            height: '62px',
            borderRadius: '999px',
            border: 0,
            background: '#E0167A',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '17px',
            letterSpacing: '0.04em',
            boxShadow: '0 8px 24px rgba(224, 22, 122, 0.35)',
          }}
        >
          Открывай, я готов
        </button>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#5C3A4E' }}>
          Держи телефон крепче
        </div>
      </div>
    </div>
  );
};

