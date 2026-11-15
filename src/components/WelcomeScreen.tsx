import React from 'react';
import { StageBackground } from './StageBackground';
import { appConfig } from '../config';
import { assetUrl } from '../utils/assets';

interface WelcomeScreenProps {
  onStart: () => void;
  savedQuestionIndex?: number;
  totalQuestions?: number;
  onReset?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  savedQuestionIndex,
  totalQuestions = 18,
  onReset,
}) => {
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

      {/* Top Lanyard Ribbon anchored to top of screen */}
      <svg
        aria-hidden="true"
        width="110"
        height="146"
        viewBox="0 0 110 146"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      >
        <path d="M26 0 L55 132 M84 0 L55 132" stroke="#E0167A" strokeWidth="15" strokeLinecap="round" />
        <rect x="41" y="120" width="28" height="28" rx="6" fill="#9AA3B5" stroke="#1A1020" strokeWidth="2" />
      </svg>

      {/* Swaying VIP Badge */}
      <div
        className="sway"
        style={{
          marginTop: '138px',
          width: 'min(304px, 88vw)',
          boxSizing: 'border-box',
          borderRadius: '22px',
          background: '#FFFFFF',
          border: '2px solid #1A1020',
          boxShadow: '0 18px 40px rgba(26, 16, 32, 0.18)',
          overflow: 'hidden',
          position: 'relative',
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
            style={{
              width: '54px',
              height: '10px',
              borderRadius: '5px',
              background: '#FFD6EA',
            }}
          />
          <div
            style={{
              fontWeight: 900,
              fontSize: '15px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Проход везде
          </div>
        </div>

        <div
          style={{
            padding: '20px 22px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            position: 'relative',
          }}
        >
          {/* Avatar Photo */}
          <div
            style={{
              width: '72px',
              height: '72px',
              flexShrink: 0,
              boxSizing: 'border-box',
              borderRadius: '36px',
              border: '3px solid #FFFFFF',
              background: '#FFE9F3',
              boxShadow: '0 6px 16px rgba(26, 16, 32, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: '18px',
              top: '-42px',
              overflow: 'hidden',
            }}
          >
            <img
              src={assetUrl('assets/nikita.jpg')}
              alt="Никита"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#5C3A4E',
              }}
            >
              Пропуск за кулисы
            </div>
            <div
              style={{
                fontWeight: 900,
                fontSize: 'clamp(36px, 11vw, 48px)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
              }}
            >
              Никита
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 900,
                fontSize: 'clamp(18px, 5.5vw, 22px)',
                color: '#E0167A',
              }}
            >
              главный герой дня
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '12px',
              paddingTop: '14px',
              borderTop: '2px dashed #F3BCD6',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Статус</div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>иконка 💅</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Дата</div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>{appConfig.eventDate}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Испытание</div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>{totalQuestions} вопросов</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Кринж</div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>0%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ minHeight: '16px', flexGrow: 1 }} />

      {/* Bottom Action Area */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1
            style={{
              margin: 0,
              textAlign: 'center',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: 'clamp(28px, 8vw, 34px)',
              lineHeight: 1.05,
            }}
          >
            С днюхой, зай!
          </h1>
          <p
            style={{
              margin: 0,
              textAlign: 'center',
              fontSize: '14px',
              lineHeight: 1.45,
              fontWeight: 500,
              color: '#5C3A4E',
            }}
          >
            {totalQuestions} вопросов о тебе и друзьях. Пропуск активируется только в конце. Никаких поблажек — соберись! 🔥
          </p>
        </div>

        {savedQuestionIndex !== undefined && savedQuestionIndex > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={onStart}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                height: '58px',
                borderRadius: '999px',
                border: 0,
                background: '#1A1020',
                color: '#FFD6EA',
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '0.04em',
                boxShadow: '0 8px 24px rgba(26, 16, 32, 0.25)',
                cursor: 'pointer',
              }}
            >
              Продолжить с вопроса {savedQuestionIndex + 1}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD6EA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            {onReset && (
              <button
                onClick={onReset}
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#5C3A4E',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'underline',
                  padding: '6px',
                  cursor: 'pointer',
                }}
              >
                Начать квиз сначала
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={onStart}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              height: '58px',
              borderRadius: '999px',
              border: 0,
              background: '#1A1020',
              color: '#FFD6EA',
              fontWeight: 800,
              fontSize: '17px',
              letterSpacing: '0.04em',
              boxShadow: '0 8px 24px rgba(26, 16, 32, 0.25)',
              cursor: 'pointer',
            }}
          >
            Погнали
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD6EA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
