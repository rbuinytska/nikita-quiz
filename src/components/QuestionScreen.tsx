import React, { useState, useEffect, useRef } from 'react';
import { QuestionItem } from '../types';
import { questionsData } from '../data/questions';
import { StageBackground } from './StageBackground';
import { checkTextAnswer } from '../utils/checker';
import { assetUrl } from '../utils/assets';

interface QuestionScreenProps {
  question: QuestionItem;
  currentIndex: number;
  totalQuestions: number;
  initialPhotoRevealed?: boolean;
  onAnswer: (isCorrect: boolean, userAnswer: any) => void;
  onRestart?: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  initialPhotoRevealed = false,
  onAnswer,
  onRestart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Local state for various question types
  const [textInput, setTextInput] = useState('');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [matchPairs, setMatchPairs] = useState<Record<string, number>>({});
  const [photoRevealed, setPhotoRevealed] = useState(initialPhotoRevealed);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  // Reset local state when question changes
  useEffect(() => {
    setTextInput('');
    setSelectedChoice(null);
    setMatchPairs({});
    setPhotoRevealed(initialPhotoRevealed);
    setIsInputFocused(false);
    setIsMediaLoaded(false);
  }, [question.id, initialPhotoRevealed]);

  // Check if image is already cached and loaded
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsMediaLoaded(true);
    }
  }, [question.id]);

  // Preload next 2 question media items in background for instant loading
  useEffect(() => {
    for (let i = 1; i <= 2; i++) {
      const nextQ = questionsData[currentIndex + i];
      if (nextQ?.media?.photo) {
        const img = new Image();
        img.src = assetUrl(nextQ.media.photo);
      }
    }
  }, [currentIndex]);

  // Listen to visualViewport for mobile virtual keyboard changes
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const handleViewportChange = () => {
      // When keyboard opens, vv.height is noticeably smaller than screen height
      if (window.innerHeight - vv.height > 80) {
        setViewportHeight(vv.height);
      } else {
        setViewportHeight(null);
      }
    };

    vv.addEventListener('resize', handleViewportChange);
    vv.addEventListener('scroll', handleViewportChange);
    return () => {
      vv.removeEventListener('resize', handleViewportChange);
      vv.removeEventListener('scroll', handleViewportChange);
    };
  }, []);

  // When keyboard opens, keep scroll locked at top so content never jumps or cuts off
  useEffect(() => {
    if (!isInputFocused) return;
    const scrollReset = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (containerRef.current) containerRef.current.scrollTop = 0;
      const parent = containerRef.current?.parentElement;
      if (parent) parent.scrollTop = 0;
    };
    scrollReset();
    const t1 = setTimeout(scrollReset, 30);
    const t2 = setTimeout(scrollReset, 100);
    const t3 = setTimeout(scrollReset, 250);
    window.addEventListener('scroll', scrollReset, { passive: true });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('scroll', scrollReset);
    };
  }, [isInputFocused]);

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Handler for text submission
  const handleTextSubmit = () => {
    if (!textInput.trim()) return;

    const isCorrect = checkTextAnswer(
      textInput,
      question.answer,
      question.aliases,
      question.id
    );
    if (question.type === 'hidden_photo_text') {
      setPhotoRevealed(true);
    }
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

  const isSubmitDisabled =
    question.type === 'text' || question.type === 'hidden_photo_text'
      ? !textInput.trim()
      : question.type === 'choice'
      ? selectedChoice === null
      : question.type === 'match'
      ? Object.keys(question.pairs || {}).some((p) => matchPairs[p] === undefined)
      : false;

  const handleFinalSubmit = () => {
    if (isSubmitDisabled) return;
    if (question.type === 'text' || question.type === 'hidden_photo_text') {
      handleTextSubmit();
    } else if (question.type === 'choice') {
      handleChoiceSubmit();
    } else if (question.type === 'match') {
      handleMatchSubmit();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: isInputFocused ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        right: 0,
        margin: '0 auto',
        maxWidth: '430px',
        width: '100%',
        minHeight: isInputFocused ? 'auto' : '100dvh',
        height: isInputFocused
          ? (viewportHeight ? `${viewportHeight}px` : '100dvh')
          : 'auto',
        maxHeight: isInputFocused && viewportHeight ? `${viewportHeight}px` : 'none',
        boxSizing: 'border-box',
        background: '#FFD6EA',
        color: '#1A1020',
        padding: isInputFocused
          ? 'max(6px, env(safe-area-inset-top, 6px)) 16px 8px'
          : 'max(14px, env(safe-area-inset-top, 14px)) 20px calc(20px + env(safe-area-inset-bottom, 16px))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: isInputFocused ? '4px' : '12px',
        overflowY: isInputFocused ? 'hidden' : 'auto',
        overflowX: 'hidden',
        zIndex: isInputFocused ? 50 : 1,
      }}
    >
      <StageBackground />

      {/* Progress header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: isInputFocused ? '4px' : '8px', padding: '0 4px', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {onRestart && !isInputFocused && (
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
            <div style={{ fontSize: isInputFocused ? '11px' : '13px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Вопрос {currentIndex + 1}
            </div>
          </div>
          <div style={{ fontSize: isInputFocused ? '12px' : '15px', fontWeight: 900 }}>
            {currentIndex + 1} / {totalQuestions}
          </div>
        </div>
        <div
          aria-hidden="true"
          style={{
            height: isInputFocused ? '5px' : '8px',
            borderRadius: '4px',
            background: '#FFFFFF',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: isInputFocused ? '5px' : '8px',
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
            alignSelf: 'center',
            width: isInputFocused ? 'auto' : (question.media.orientation === 'portrait' ? '180px' : 'auto'),
            maxWidth: isInputFocused ? '260px' : 'none',
            height: isInputFocused
              ? 'min(130px, 28vh)'
              : (question.type === 'match'
                ? '140px'
                : question.type === 'text' || question.type === 'hidden_photo_text'
                ? '230px'
                : question.media.orientation === 'portrait'
                ? '270px'
                : '220px'),
            flexShrink: isInputFocused ? 1 : 0,
            boxSizing: 'border-box',
            borderRadius: isInputFocused ? '14px' : '22px',
            background: '#1A1020',
            padding: isInputFocused ? '4px' : '5px',
            boxShadow: '0 10px 24px rgba(26, 16, 32, 0.18)',
            transform: isInputFocused ? 'rotate(0deg)' : 'rotate(-1.5deg)',
            transition: 'all 0.25s ease',
            zIndex: 2,
          }}
        >
          {/* Shimmer skeleton while loading */}
          {!isMediaLoaded && (
            <div className="shimmer-box">
              <span style={{ fontSize: '24px' }} className="pulse">📸</span>
              <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
                Загрузка...
              </span>
            </div>
          )}

          {question.media.video ? (
            <video
              src={assetUrl(question.media.video)}
              poster={assetUrl(question.media.poster)}
              controls
              playsInline
              preload="metadata"
              onLoadedData={() => setIsMediaLoaded(true)}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: isInputFocused ? '10px' : '16px',
                background: '#1A1020',
                position: 'relative',
                zIndex: 2,
              }}
            />
          ) : question.type === 'hidden_photo_text' ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: isInputFocused ? '10px' : '16px',
                overflow: 'hidden',
                position: 'relative',
                background: '#1A1020',
                zIndex: 2,
              }}
            >
              <img
                ref={imgRef}
                src={assetUrl(question.media.photo)}
                alt=""
                decoding="async"
                loading="eager"
                onLoad={() => setIsMediaLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: isInputFocused ? 'contain' : 'cover',
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
                    gap: isInputFocused ? '4px' : '10px',
                    color: '#FFFFFF',
                    background: 'rgba(26, 16, 32, 0.35)',
                    padding: '4px',
                    textAlign: 'center',
                  }}
                >
                  <svg width={isInputFocused ? '24' : '40'} height={isInputFocused ? '24' : '40'} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  <div style={{ fontWeight: 800, fontSize: isInputFocused ? '12px' : '15px' }}>
                    {isInputFocused ? 'Откроется после ответа' : 'Фото откроется после ответа'}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img
              ref={imgRef}
              src={assetUrl(question.media.photo)}
              alt=""
              decoding="async"
              loading="eager"
              onLoad={() => setIsMediaLoaded(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: isInputFocused ? 'contain' : 'cover',
                borderRadius: isInputFocused ? '10px' : '16px',
                display: 'block',
                position: 'relative',
                zIndex: 2,
              }}
            />
          )}

          {/* Sticker badge */}
          {!isInputFocused && (
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
          )}
        </div>
      )}

      {/* Question title */}
      <h2
        className="font-playfair"
        style={{
          margin: isInputFocused ? '2px 4px 0' : '4px 4px 0',
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: isInputFocused ? '15px' : (question.question.length > 50 ? '24px' : '28px'),
          lineHeight: 1.15,
          textAlign: isInputFocused ? 'center' : 'left',
          zIndex: 2,
        }}
      >
        {question.question}
      </h2>

      {/* QUESTION TYPE: TEXT or HIDDEN_PHOTO_TEXT */}
      {(question.type === 'text' || question.type === 'hidden_photo_text') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: isInputFocused ? '4px' : '8px', padding: '0 2px', zIndex: 2 }}>
          {!isInputFocused && (
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
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTextSubmit();
            }}
            style={{ position: 'relative', width: '100%', margin: 0 }}
          >
            <input
              id="answer-input"
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onFocus={() => {
                setIsInputFocused(true);
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
                if (document.documentElement) document.documentElement.scrollTop = 0;
                if (containerRef.current) containerRef.current.scrollTop = 0;
                const parent = containerRef.current?.parentElement;
                if (parent) parent.scrollTop = 0;
              }}
              onBlur={() => setIsInputFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleTextSubmit();
                }
              }}
              placeholder={question.placeholder || 'Напиши ответ'}
              autoComplete="off"
              style={{
                width: '100%',
                height: isInputFocused ? '46px' : '56px',
                boxSizing: 'border-box',
                padding: '0 54px 0 16px',
                borderRadius: '16px',
                border: '2px solid #1A1020',
                background: '#FFFFFF',
                color: '#1A1020',
                fontSize: '16px',
                fontWeight: 700,
                outlineColor: '#E0167A',
              }}
            />
            <button
              type="submit"
              onPointerDown={(e) => {
                if (!textInput.trim()) return;
                e.preventDefault();
                handleTextSubmit();
              }}
              onClick={(e) => {
                e.preventDefault();
                handleTextSubmit();
              }}
              disabled={!textInput.trim()}
              title="Ответить"
              style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: 0,
                background: textInput.trim() ? '#E0167A' : '#F5BCCD',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: textInput.trim() ? 'pointer' : 'not-allowed',
                boxShadow: textInput.trim() ? '0 4px 12px rgba(224, 22, 122, 0.4)' : 'none',
                transition: 'background 0.2s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>

          {/* Hint if present */}
          {question.hint && (
            <div
              style={{
                padding: isInputFocused ? '4px 10px' : '10px 14px',
                borderRadius: '12px',
                border: '1.5px dashed #E0167A',
                background: '#FFE9F3',
                fontSize: isInputFocused ? '11px' : '13px',
                fontWeight: 700,
                color: '#5C3A4E',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>💡</span>
              <span>Подсказка: {question.hint}</span>
            </div>
          )}

          <div style={{ fontSize: isInputFocused ? '11px' : '13px', fontWeight: 600, color: '#5C3A4E', textAlign: isInputFocused ? 'center' : 'left' }}>
            Большие или маленькие буквы — неважно
          </div>
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
                fontSize: question.id === 10 ? '26px' : 'inherit',
              }}
            >
              {question.id === 10 ? (
                '👀'
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontWeight: 900, fontSize: '17px' }}>
                {question.id === 10 ? 'Покажи стикер' : 'Отвечай вслух'}
              </div>
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
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleVoiceDecision(false);
                }}
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
                  cursor: 'pointer',
                }}
              >
                Мимо
              </button>
              <button
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleVoiceDecision(true);
                }}
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
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(224, 22, 122, 0.35)',
                }}
              >
                Засчитано
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ flexGrow: 1 }} />

      {/* Bottom Submit Button (for non-voice questions) - Sticky at bottom */}
      {question.type !== 'voice' && !isInputFocused && (
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            zIndex: 20,
            paddingTop: '10px',
            paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
            background: 'linear-gradient(to top, #FFD6EA 82%, rgba(255, 214, 234, 0))',
            flexShrink: 0,
            marginTop: 'auto',
          }}
        >
          <button
            type="button"
            disabled={isSubmitDisabled}
            onPointerDown={(e) => {
              if (isSubmitDisabled) return;
              e.preventDefault();
              handleFinalSubmit();
            }}
            onClick={handleFinalSubmit}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '58px',
              borderRadius: '999px',
              border: isSubmitDisabled ? '2px solid #F3BCD6' : 0,
              background: isSubmitDisabled ? '#F5BCCD' : '#E0167A',
              color: isSubmitDisabled ? '#8A5270' : '#FFFFFF',
              fontWeight: 800,
              fontSize: '17px',
              boxShadow: isSubmitDisabled ? 'none' : '0 8px 24px rgba(224, 22, 122, 0.35)',
              cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span>
              {isSubmitDisabled
                ? (question.type === 'text' || question.type === 'hidden_photo_text' ? 'Введи ответ' : 'Выбери ответ')
                : 'Мой ответ финальный'}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

