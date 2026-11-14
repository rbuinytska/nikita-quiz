import React, { useState, useEffect } from 'react';
import { QuestionItem } from '../types';
import { StageBackground } from './StageBackground';
import { checkTextAnswer } from '../utils/checker';
import { assetUrl } from '../utils/assets';

interface QuestionScreenProps {
  question: QuestionItem;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, userAnswer: any) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}) => {
  // Local state for various question types
  const [textInput, setTextInput] = useState('');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [matchPairs, setMatchPairs] = useState<Record<string, number>>({});
  const [photoRevealed, setPhotoRevealed] = useState(false);

  // Reset local state when question changes
  useEffect(() => {
    setTextInput('');
    setSelectedChoice(null);
    setMatchPairs({});
    setPhotoRevealed(false);
  }, [question.id]);

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Handler for text submission
  const handleTextSubmit = () => {
    if (!textInput.trim()) return;

    if (question.type === 'hidden_photo_text' && !photoRevealed) {
      setPhotoRevealed(true);
      return;
    }

    const isCorrect = checkTextAnswer(
      textInput,
      question.answer,
      question.aliases,
      question.id
    );
    onAnswer(isCorrect, textInput);
  };

  // Handler for choice submission
  const handleChoiceSubmit = () => {
    if (selectedChoice === null) return;
    const isCorrect = selectedChoice === question.correct;
    onAnswer(isCorrect, selectedChoice);
  };

  // Handler for match selection
  const handleMatchSelect = (person: string, optionIdx: number) => {
    setMatchPairs((prev) => {
      const next = { ...prev };
      // Remove optionIdx from any other person (mutual exclusion)
      Object.keys(next).forEach((key) => {
        if (next[key] === optionIdx) {
          delete next[key];
        }
      });
      next[person] = optionIdx;
      return next;
    });
  };

  const handleMatchSubmit = () => {
    if (!question.pairs) return;
    const persons = Object.keys(question.pairs);
    const isAllSelected = persons.every((p) => matchPairs[p] !== undefined);
    if (!isAllSelected) return;

    const isCorrect = persons.every((p) => matchPairs[p] === question.pairs![p]);
    onAnswer(isCorrect, matchPairs);
  };

  // Handler for voice (jury decision)
  const handleVoiceDecision = (isCorrect: boolean) => {
    onAnswer(isCorrect, isCorrect ? 'Засчитано жюри' : 'Мимо');
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        boxSizing: 'border-box',
        background: '#FFD6EA',
        color: '#1A1020',
        padding: '38px 20px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <StageBackground />

      {/* Progress header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 4px', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Вопрос {currentIndex + 1}
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

      {/* Media Card */}
      {question.media && (
        <div
          style={{
            position: 'relative',
            alignSelf: question.media.orientation === 'portrait' ? 'center' : 'stretch',
            width: question.media.orientation === 'portrait' ? '180px' : 'auto',
            height: question.type === 'match' ? '150px' : question.media.orientation === 'portrait' ? '290px' : '230px',
            flexShrink: 0,
            boxSizing: 'border-box',
            borderRadius: '22px',
            background: '#1A1020',
            padding: '7px',
            boxShadow: '0 14px 30px rgba(26, 16, 32, 0.18)',
            transform: 'rotate(-1.5deg)',
            zIndex: 2,
          }}
        >
          {question.media.video ? (
            <video
              src={assetUrl(question.media.video)}
              poster={assetUrl(question.media.poster)}
              controls
              playsInline
              preload="metadata"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
                background: '#1A1020',
              }}
            />
          ) : question.type === 'hidden_photo_text' ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                background: '#1A1020',
              }}
            >
              <img
                src={assetUrl(question.media.photo)}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: photoRevealed ? 'none' : 'blur(22px) saturate(1.3)',
                  transform: photoRevealed ? 'scale(1)' : 'scale(1.2)',
                  transition: 'filter 0.8s ease, transform 0.8s ease',
                }}
              />
              {!photoRevealed && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    color: '#FFFFFF',
                    background: 'rgba(26, 16, 32, 0.35)',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  <div style={{ fontWeight: 800, fontSize: '15px' }}>Фото откроется после ответа</div>
                </div>
              )}
            </div>
          ) : (
            <img
              src={assetUrl(question.media.photo)}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
                display: 'block',
              }}
            />
          )}

          {/* Sticker badge */}
          <div
            className="font-playfair"
            style={{
              position: 'absolute',
              right: '-8px',
              top: '-12px',
              padding: '8px 14px',
              borderRadius: '12px',
              background: '#E0167A',
              color: '#FFFFFF',
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: '18px',
              transform: 'rotate(6deg)',
              boxShadow: '0 4px 12px rgba(224, 22, 122, 0.35)',
              zIndex: 3,
            }}
          >
            {photoRevealed && question.revealText ? 'а вот и он' : question.badge || 'это база'}
          </div>
        </div>
      )}

      {/* Question title */}
      <h2
        className="font-playfair"
        style={{
          margin: '4px 4px 0',
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: question.question.length > 50 ? '24px' : '30px',
          lineHeight: 1.1,
          zIndex: 2,
        }}
      >
        {question.question}
      </h2>

      {/* QUESTION TYPE: TEXT or HIDDEN_PHOTO_TEXT */}
      {(question.type === 'text' || question.type === 'hidden_photo_text') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 2px', zIndex: 2 }}>
          <label
            htmlFor="answer-input"
            style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#5C3A4E',
            }}
          >
            Твой ответ
          </label>
          <input
            id="answer-input"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTextSubmit();
            }}
            placeholder={question.placeholder || 'Напиши ответ'}
            autoComplete="off"
            style={{
              height: '60px',
              boxSizing: 'border-box',
              padding: '0 20px',
              borderRadius: '18px',
              border: photoRevealed ? '2px solid #1F9D55' : '2px solid #1A1020',
              background: photoRevealed ? '#E8F7EE' : '#FFFFFF',
              color: '#1A1020',
              fontSize: '18px',
              fontWeight: 700,
              outlineColor: '#E0167A',
            }}
          />

          {/* Hint if present */}
          {question.hint && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '14px',
                border: '2px dashed #E0167A',
                background: '#FFE9F3',
                fontSize: '13px',
                fontWeight: 700,
                color: '#5C3A4E',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>💡</span>
              <span>Подсказка: {question.hint}</span>
            </div>
          )}

          {photoRevealed && question.revealText ? (
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1F9D55' }}>
              ✓ {question.revealText}
            </div>
          ) : (
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#5C3A4E' }}>
              Большие или маленькие буквы — неважно
            </div>
          )}
        </div>
      )}

      {/* QUESTION TYPE: CHOICE */}
      {question.type === 'choice' && question.options && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: question.media?.orientation === 'portrait' ? 'repeat(2, minmax(0, 1fr))' : '1fr',
            gap: '10px',
            zIndex: 2,
          }}
        >
          {question.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = selectedChoice === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedChoice(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minHeight: '54px',
                  padding: '10px 14px',
                  borderRadius: '999px',
                  border: '2px solid #1A1020',
                  background: isSelected ? '#1A1020' : '#FFFFFF',
                  color: isSelected ? '#FFD6EA' : '#1A1020',
                  fontSize: '16px',
                  fontWeight: 700,
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    flexShrink: 0,
                    borderRadius: '16px',
                    background: isSelected ? '#E0167A' : '#FFE9F3',
                    color: isSelected ? '#FFFFFF' : '#1A1020',
                    fontWeight: 900,
                    fontSize: '14px',
                  }}
                >
                  {letter}
                </span>
                <span style={{ flexGrow: 1 }}>{option}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* QUESTION TYPE: MATCH */}
      {question.type === 'match' && question.options && question.pairs && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 2 }}>
          {/* Legend card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '12px 14px',
              borderRadius: '18px',
              background: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(26, 16, 32, 0.08)',
            }}
          >
            {question.options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    flexShrink: 0,
                    borderRadius: '12px',
                    background: '#E0167A',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '12px',
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}>{opt}</span>
              </div>
            ))}
          </div>

          {/* Rows for each friend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 4px' }}>
            {Object.keys(question.pairs).map((person) => (
              <div
                key={person}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <div style={{ fontWeight: 900, fontSize: '16px' }}>{person}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[0, 1, 2, 3].map((optIdx) => {
                    const isPicked = matchPairs[person] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleMatchSelect(person, optIdx)}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '21px',
                          border: '2px solid #1A1020',
                          background: isPicked ? '#E0167A' : '#FFFFFF',
                          color: isPicked ? '#FFFFFF' : '#1A1020',
                          fontWeight: 900,
                          fontSize: '15px',
                        }}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION TYPE: VOICE */}
      {question.type === 'voice' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px',
              borderRadius: '20px',
              background: '#FFFFFF',
              border: '2px solid #1A1020',
            }}
          >
            <div
              className="pulse"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '52px',
                height: '52px',
                flexShrink: 0,
                borderRadius: '26px',
                background: '#E0167A',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontWeight: 900, fontSize: '17px' }}>Отвечай вслух</div>
              <div style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.35, color: '#5C3A4E' }}>
                {question.voicePrompt}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C3A4E' }}>
              Для жюри
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleVoiceDecision(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '56px',
                  borderRadius: '999px',
                  border: '2px solid #1A1020',
                  background: '#FFFFFF',
                  color: '#1A1020',
                  fontWeight: 800,
                  fontSize: '16px',
                }}
              >
                Мимо
              </button>
              <button
                type="button"
                onClick={() => handleVoiceDecision(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '56px',
                  borderRadius: '999px',
                  border: 0,
                  background: '#E0167A',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '16px',
                }}
              >
                Засчитано
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ flexGrow: 1 }} />

      {/* Bottom Submit Button (for non-voice questions) */}
      {question.type !== 'voice' && (
        <div style={{ zIndex: 2, paddingTop: '10px' }}>
          {question.type === 'hidden_photo_text' && photoRevealed ? (
            <button
              type="button"
              onClick={() => {
                const isCorrect = checkTextAnswer(textInput, question.answer, question.aliases, question.id);
                onAnswer(isCorrect, textInput);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '56px',
                borderRadius: '999px',
                border: 0,
                background: '#E0167A',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '17px',
              }}
            >
              Дальше
            </button>
          ) : (
            <button
              type="button"
              disabled={
                question.type === 'text' || question.type === 'hidden_photo_text'
                  ? !textInput.trim()
                  : question.type === 'choice'
                  ? selectedChoice === null
                  : question.type === 'match'
                  ? Object.keys(question.pairs || {}).some((p) => matchPairs[p] === undefined)
                  : false
              }
              onClick={() => {
                if (question.type === 'text' || question.type === 'hidden_photo_text') {
                  handleTextSubmit();
                } else if (question.type === 'choice') {
                  handleChoiceSubmit();
                } else if (question.type === 'match') {
                  handleMatchSubmit();
                }
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '56px',
                borderRadius: '999px',
                border: 0,
                background: '#E0167A',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '17px',
                opacity:
                  (question.type === 'text' || question.type === 'hidden_photo_text') && !textInput.trim()
                    ? 0.45
                    : question.type === 'choice' && selectedChoice === null
                    ? 0.45
                    : question.type === 'match' &&
                      Object.keys(question.pairs || {}).some((p) => matchPairs[p] === undefined)
                    ? 0.45
                    : 1,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
            >
              Мой ответ финальный
            </button>
          )}
        </div>
      )}
    </div>
  );
};

