import React, { useMemo } from 'react';
import { QuestionItem } from '../types';
import { StageBackground } from './StageBackground';
import { assetUrl } from '../utils/assets';

interface ReactionScreenProps {
  question: QuestionItem;
  currentIndex: number;
  totalQuestions: number;
  isCorrect: boolean;
  onNext: () => void;
  onRestart?: () => void;
}

const CORRECT_TITLES = [
  'SLAY.',
  'Это база',
  'Имба',
  'Грин флаг засчитан',
  'Абсолютное кино',
  'Ну всё, я плак',
];

const INCORRECT_TITLES = [
  'Ну такое…',
  'Зай, это кринж',
  'Ред флаг… шучу, люблю',
  'Ору. Нет.',
];

export const ReactionScreen: React.FC<ReactionScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  isCorrect,
  onNext,
  onRestart,
}) => {
  // Pick random title deterministically for this question
  const title = useMemo(() => {
    const list = isCorrect ? CORRECT_TITLES : INCORRECT_TITLES;
    const seed = (question.id * 17 + (isCorrect ? 3 : 7)) % list.length;
    return list[seed];
  }, [question.id, isCorrect]);

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

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
        justifyContent: 'space-between',
        gap: '16px',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <StageBackground />

      {/* Progress header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 4px', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {onRestart && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Начать квиз сначала?')) {
                    onRestart();
                  }
                }}
                title="Начать сначала"
                style={{
                  background: 'rgba(26, 16, 32, 0.08)',
                  border: '1px solid rgba(26, 16, 32, 0.15)',
                  borderRadius: '999px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#5C3A4E',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                ↺ Сначала
              </button>
            )}
            <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Проверка на входе
            </div>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 900 }}>
            {currentIndex + 1} / {totalQuestions}
          </div>
        </div>
        <div
          aria-hidden="true"
          style={{
            height: '8px',
            borderRadius: '4px',
            background: '#FFFFFF',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '8px',
              borderRadius: '4px',
              background: '#E0167A',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      {/* Reaction main center */}
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          textAlign: 'center',
          padding: '0 8px',
          zIndex: 2,
        }}
      >
        {/* Photo + Stamp / Badge */}
        <div
          className="bob"
          style={{
            position: 'relative',
            width: '180px',
            height: '160px',
          }}
        >
          {/* Circular photo of Nikita */}
          <div
            style={{
              width: '82px',
              height: '82px',
              flexShrink: 0,
              boxSizing: 'border-box',
              borderRadius: '41px',
              border: '3px solid #FFFFFF',
              background: '#FFE9F3',
              boxShadow: '0 6px 16px rgba(26, 16, 32, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: '-4px',
              bottom: '-2px',
              transform: 'rotate(-6deg)',
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

          {/* Stamp SVG */}
          {isCorrect ? (
            <svg
              role="img"
              aria-label="Штамп: верно, допущен"
              width="150"
              height="150"
              viewBox="0 0 220 220"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                transform: 'rotate(-10deg)',
              }}
            >
              <polygon
                points="110.0,6.0 126.4,27.6 149.8,13.9 156.7,40.2 183.5,36.5 179.8,63.3 206.1,70.2 192.4,93.6 214.0,110.0 192.4,126.4 206.1,149.8 179.8,156.7 183.5,183.5 156.7,179.8 149.8,206.1 126.4,192.4 110.0,214.0 93.6,192.4 70.2,206.1 63.3,179.8 36.5,183.5 40.2,156.7 13.9,149.8 27.6,126.4 6.0,110.0 27.6,93.6 13.9,70.2 40.2,63.3 36.5,36.5 63.3,40.2 70.2,13.9 93.6,27.6"
                fill="#E0167A"
              />
              <circle cx="110" cy="110" r="74" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
              <text x="110" y="120" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontWeight="900" fontSize="44" fill="#FFFFFF">
                верно
              </text>
              <text x="110" y="150" textAnchor="middle" fontFamily="Montserrat, system-ui, sans-serif" fontWeight="800" fontSize="14" letterSpacing="3" fill="#FFFFFF">
                ДОПУЩЕН
              </text>
            </svg>
          ) : (
            <svg
              role="img"
              aria-label="Штамп: неверно, но любим"
              width="150"
              height="150"
              viewBox="0 0 220 220"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                transform: 'rotate(-5deg)',
              }}
            >
              <polygon
                points="110.0,6.0 126.4,27.6 149.8,13.9 156.7,40.2 183.5,36.5 179.8,63.3 206.1,70.2 192.4,93.6 214.0,110.0 192.4,126.4 206.1,149.8 179.8,156.7 183.5,183.5 156.7,179.8 149.8,206.1 126.4,192.4 110.0,214.0 93.6,192.4 70.2,206.1 63.3,179.8 36.5,183.5 40.2,156.7 13.9,149.8 27.6,126.4 6.0,110.0 27.6,93.6 13.9,70.2 40.2,63.3 36.5,36.5 63.3,40.2 70.2,13.9 93.6,27.6"
                fill="#1A1020"
              />
              <circle cx="110" cy="110" r="74" fill="none" stroke="#F3BCD6" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
              <text x="110" y="120" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontWeight="900" fontSize="40" fill="#FFD6EA">
                мимо
              </text>
              <text x="110" y="150" textAnchor="middle" fontFamily="Montserrat, system-ui, sans-serif" fontWeight="800" fontSize="13" letterSpacing="2" fill="#E0167A">
                НО ЛЮБИМ
              </text>
            </svg>
          )}
        </div>

        {/* Title */}
        <h2
          className="font-playfair"
          style={{
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: title.length > 10 ? 'clamp(32px, 8.5vw, 44px)' : 'clamp(40px, 11vw, 54px)',
            lineHeight: 1,
            color: isCorrect ? '#1A1020' : '#E0167A',
          }}
        >
          {title}
        </h2>

        {/* Subtitle / Remark */}
        {isCorrect ? (
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              lineHeight: 1.45,
              fontWeight: 600,
              color: '#5C3A4E',
            }}
          >
            {question.revealText || 'Это было красиво и прямо в цель!'}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1020' }}>
              Попробуй подумать ещё разок!
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#5C3A4E' }}>
              Но ты всё равно иконка 💅 Правильный ответ сам себя не найдёт
            </div>
          </div>
        )}

        {/* Special sticker preview for Question 10 (only when correctly guessed) */}
        {question.id === 10 && isCorrect && (
          <div
            style={{
              marginTop: '4px',
              padding: '6px',
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 4px 14px rgba(26, 16, 32, 0.1)',
            }}
          >
            <img
              src={assetUrl('assets/q10-sticker.png')}
              alt="Стикер"
              style={{ width: '80px', height: '80px', objectFit: 'contain', display: 'block' }}
            />
          </div>
        )}

        {/* Badge status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            borderRadius: '999px',
            background: '#FFFFFF',
            border: '2px solid #1A1020',
            fontSize: '15px',
            fontWeight: 800,
            marginTop: '4px',
          }}
        >
          {isCorrect ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1020" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
              </svg>
              Ещё на шаг ближе к подарку
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E0167A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Никита, соберись! Давай снова
            </>
          )}
        </div>
      </div>

      {/* Button Next / Retry - Sticky at bottom */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 20,
          paddingTop: '8px',
          paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
          background: 'linear-gradient(to top, #FFD6EA 82%, rgba(255, 214, 234, 0))',
          flexShrink: 0,
          marginTop: 'auto',
        }}
      >
        <button
          onClick={onNext}
          type="button"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            height: '58px',
            borderRadius: '999px',
            border: 0,
            background: isCorrect ? '#E0167A' : '#1A1020',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '17px',
            letterSpacing: '0.04em',
            boxShadow: isCorrect ? '0 8px 24px rgba(224, 22, 122, 0.35)' : '0 8px 24px rgba(26, 16, 32, 0.25)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {isCorrect ? (
            <>
              <span>Дальше</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </>
          ) : (
            <>
              <span>Попробовать снова</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

