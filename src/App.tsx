import React, { useState, useEffect } from 'react';
import { ScreenState, QuizProgress } from './types';
import { questionsData } from './data/questions';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ReactionScreen } from './components/ReactionScreen';
import { BeforeGiftScreen } from './components/BeforeGiftScreen';
import { PlaneShakeScreen } from './components/PlaneShakeScreen';
import { ParachuteDropScreen } from './components/ParachuteDropScreen';
import { BirthdayCakeScreen } from './components/BirthdayCakeScreen';
import { TicketScreen } from './components/TicketScreen';
import { BackgroundMusic } from './components/BackgroundMusic';

const STORAGE_KEY = 'nikita_quiz_progress_v1';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean>(true);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [score, setScore] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [attempt, setAttempt] = useState<number>(0);
  const [revealedPhotos, setRevealedPhotos] = useState<Record<number, boolean>>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: QuizProgress = JSON.parse(saved);
        if (parsed.currentScreen) setScreen(parsed.currentScreen);
        if (typeof parsed.currentQuestionIndex === 'number') {
          setCurrentQuestionIndex(Math.min(parsed.currentQuestionIndex, questionsData.length - 1));
        }
        if (typeof parsed.lastAnswerCorrect === 'boolean') {
          setLastAnswerCorrect(parsed.lastAnswerCorrect);
        }
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.score === 'number') setScore(parsed.score);
      }
    } catch (e) {
      console.warn('Failed to load saved progress:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save progress to localStorage whenever relevant state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const progress: QuizProgress = {
        currentScreen: screen,
        currentQuestionIndex,
        lastAnswerCorrect,
        answers,
        score,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress:', e);
    }
  }, [screen, currentQuestionIndex, lastAnswerCorrect, answers, score, isLoaded]);

  // Reset progress
  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setScreen('welcome');
    setCurrentQuestionIndex(0);
    setLastAnswerCorrect(true);
    setAnswers({});
    setScore(0);
    setAttempt(0);
    setRevealedPhotos({});
  };

  // Handler: question answered
  const handleAnswer = (isCorrect: boolean, userAnswer: any) => {
    setLastAnswerCorrect(isCorrect);
    setAnswers((prev) => ({
      ...prev,
      [questionsData[currentQuestionIndex].id]: userAnswer,
    }));
    if (questionsData[currentQuestionIndex].type === 'hidden_photo_text' || questionsData[currentQuestionIndex].media?.revealAfterAnswer) {
      setRevealedPhotos((prev) => ({
        ...prev,
        [questionsData[currentQuestionIndex].id]: isCorrect,
      }));
    }
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setScreen('reaction');
  };

  // Handler: move from reaction to next step
  const handleNextFromReaction = () => {
    if (!lastAnswerCorrect) {
      // If incorrect, return to the SAME question to guess again!
      setAttempt((prev) => prev + 1);
      setScreen('question');
      return;
    }

    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAttempt(0);
      setScreen('question');
    } else {
      setScreen('before_gift');
    }
  };

  return (
    <div className="app-container">
      <div className="mobile-frame">
        {/* Floating background music controller */}
        <BackgroundMusic />

        {/* Debug Quick Jump Bar */}
        <div
          style={{
            position: 'fixed',
            top: 'max(8px, env(safe-area-inset-top, 8px))',
            right: '10px',
            zIndex: 99999,
            display: 'flex',
            gap: '6px',
          }}
        >
          <button
            type="button"
            onClick={() => setScreen('cake')}
            style={{
              background: 'rgba(26, 16, 32, 0.88)',
              color: '#FFD6EA',
              border: '1.5px solid #E0167A',
              borderRadius: '999px',
              padding: '6px 11px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            🎂 К торту
          </button>
          <button
            type="button"
            onClick={() => setScreen('ticket')}
            style={{
              background: 'rgba(224, 22, 122, 0.92)',
              color: '#FFFFFF',
              border: '1.5px solid #FFFFFF',
              borderRadius: '999px',
              padding: '6px 11px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            🪂 К подарку
          </button>
        </div>

        {screen === 'welcome' && (
          <WelcomeScreen
            onStart={() => setScreen('question')}
            totalQuestions={questionsData.length}
            savedQuestionIndex={currentQuestionIndex > 0 ? currentQuestionIndex : undefined}
            onReset={handleReset}
          />
        )}

        {screen === 'question' && (
          <QuestionScreen
            key={`${questionsData[currentQuestionIndex].id}-${attempt}`}
            question={questionsData[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questionsData.length}
            initialPhotoRevealed={Boolean(revealedPhotos[questionsData[currentQuestionIndex].id])}
            onAnswer={handleAnswer}
            onRestart={handleReset}
          />
        )}

        {screen === 'reaction' && (
          <ReactionScreen
            question={questionsData[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questionsData.length}
            isCorrect={lastAnswerCorrect}
            onNext={handleNextFromReaction}
            onRestart={handleReset}
          />
        )}

        {screen === 'before_gift' && (
          <BeforeGiftScreen onOpen={() => setScreen('plane_shake')} />
        )}

        {screen === 'plane_shake' && (
          <PlaneShakeScreen onFinish={() => setScreen('parachute_drop')} />
        )}

        {screen === 'parachute_drop' && (
          <ParachuteDropScreen onViewTicket={() => setScreen('cake')} />
        )}

        {screen === 'cake' && (
          <BirthdayCakeScreen onContinue={() => setScreen('ticket')} />
        )}

        {screen === 'ticket' && (
          <TicketScreen onRestart={handleReset} onShowCake={() => setScreen('cake')} />
        )}
      </div>
    </div>
  );
};
