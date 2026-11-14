import React, { useMemo } from 'react';
import { QuestionItem } from '../types';
import { StageBackground } from './StageBackground';

interface ReactionScreenProps {
  question: QuestionItem;
  currentIndex: number;
  totalQuestions: number;
  isCorrect: boolean;
  onNext: () => void;
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
}) => {
  // Pick random title deterministically for this question
  const title = useMemo(() => {
    const list = isCorrect ? CORRECT_TITLES : INCORRECT_TITLES;
    const seed = (question.id * 17 + (isCorrect ? 3 : 7)) % list.length;
    return list[seed];
  }, [question.id, isCorrect]);

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Formatting correct answer to display if incorrect
  const displayCorrectAnswer = useMemo(() => {
    if (question.type === 'choice' && question.options && question.correct !== undefined) {
      return question.options[question.correct];
    }
    if (question.type === 'match' && question.pairs && question.options) {
      return Object.entries(question.pairs)
        .map(([name, idx]) => `${name}: ${question.options![idx]}`)
        .join('; ');
    }
    return question.answer || '';
  }, [question]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        background: '#FFD6EA',
        color: '#1A1020',
        padding: '44px 20px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <StageBackground />

      {/* Progress header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 4px', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Проверка на входе
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
            width: '210px',
            height: '190px',
          }}
        >
          {/* Circular photo of Nikita */}
          <div
            style={{
              width: '96px',
              height: '96px',
              flexShrink: 0,
              boxSizing: 'border-box',
              borderRadius: '48px',
              border: '3px solid #FFFFFF',
              background: '#FFE9F3',
              boxShadow: '0 6px 16px rgba(26, 16, 32, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: '-6px',
              bottom: '-4px',
              transform: 'rotate(-6deg)',
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

          {/* Stamp SVG */}
          {isCorrect ? (
            <svg
              role="img"
              aria-label="Штамп: верно, допущен"
              width="170"
              height="170"
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
              width="170"
              height="170"
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
            fontSize: title.length > 10 ? '48px' : '64px',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {displayCorrectAnswer && (
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#1A1020' }}>
                Правильно:{' '}
                <span style={{ color: '#E0167A', fontWeight: 800 }}>
                  {displayCorrectAnswer}
                </span>
              </div>
            )}
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#5C3A4E' }}>
              Но ты всё равно иконка 💅
            </div>
          </div>
        )}

        {/* Special sticker preview for Question 10 */}
        {question.id === 10 && (
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
              src="/assets/q10-sticker.png"
              alt="Стикер"
              style={{ width: '80px', height: '80px', objectFit: 'contain', display: 'block' }}
            />
          </div>
        )}

        {/* Badge: one step closer */}
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1020" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
          </svg>
          Ещё на шаг ближе к подарку
        </div>
      </div>

      {/* Button Next */}
      <div style={{ zIndex: 2 }}>
        <button
          onClick={onNext}
          type="button"
          style={{
            width: '100%',
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
          Дальше
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD6EA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
