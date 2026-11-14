import React from 'react';
import { StageBackground } from './StageBackground';
import { appConfig } from '../config';

interface WelcomeScreenProps {
  onStart: () => void;
  savedQuestionIndex?: number;
  onReset?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  savedQuestionIndex,
  onReset,
}) => {
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
      <StageBackground showLanyard lanyardLength={148} />

      {/* Swaying VIP Badge */}
      <div
        className="sway"
        style={{
          marginTop: '155px',
          width: '300px',
          boxSizing: 'border-box',
          borderRadius: '22px',
          background: '#FFFFFF',
          border: '2px solid #1A1020',
          boxShadow: '0 18px 40px rgba(26, 16, 32, 0.18)',
          overflow: 'hidden',
          position: 'relative',
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
              src="/assets/nikita.jpg"
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
                fontSize: '48px',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
              }}
            >
              {appConfig.recipientName}
            </div>
            <div
              className="font-playfair"
              style={{
                fontStyle: 'italic',
                fontWeight: 900,
                fontSize: '22px',
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
              <div style={{ fontSize: '17px', fontWeight: 800 }}>иконка 💅</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Дата</div>
              <div style={{ fontSize: '17px', fontWeight: 800 }}>{appConfig.eventDate}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Испытание</div>
              <div style={{ fontSize: '17px', fontWeight: 800 }}>23 вопроса</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Кринж</div>
              <div style={{ fontSize: '17px', fontWeight: 800 }}>0%</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flexGrow: 1 }} />

      {/* Bottom text & CTA */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          zIndex: 2,
        }}
      >
        <h1
          className="font-playfair"
          style={{
            margin: 0,
            textAlign: 'center',
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: '34px',
            lineHeight: 1.05,
          }}
        >
          С днюхой, зай!
        </h1>
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            fontSize: '15px',
            lineHeight: 1.45,
            fontWeight: 500,
            color: '#5C3A4E',
          }}
        >
          23 вопроса — по одному за каждый твой год. Пропуск активируется в конце.
          Ошибёшься — не кринж, подарок всё равно твой
        </p>

        {savedQuestionIndex && savedQuestionIndex > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={onStart}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                height: '60px',
                borderRadius: '999px',
                border: 0,
                background: '#1A1020',
                color: '#FFD6EA',
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '0.04em',
              }}
            >
              Продолжить с вопроса {savedQuestionIndex + 1}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD6EA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <button
              onClick={onReset}
              type="button"
              style={{
                background: 'transparent',
                border: 0,
                color: '#5C3A4E',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'underline',
                padding: '6px',
              }}
            >
              Начать сначала
            </button>
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
              height: '60px',
              borderRadius: '999px',
              border: 0,
              background: '#1A1020',
              color: '#FFD6EA',
              fontWeight: 800,
              fontSize: '17px',
              letterSpacing: '0.04em',
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

