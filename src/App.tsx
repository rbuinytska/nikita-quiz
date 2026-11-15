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
import { FakeGiftScreen } from './components/FakeGiftScreen';
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
        if (parsed.currentScreen) {
          const s = (parsed.currentScreen as string) === 'before_gift' ? 'fake_gift' : parsed.currentScreen;
          setScreen(s);
        }
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
      setScreen('cake');
    }
  };

  return (
    <div className="app-container">
      <div className="mobile-frame">
        {/* Floating background music controller */}
        <BackgroundMusic />

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

        {screen === 'cake' && (
          <BirthdayCakeScreen onContinue={() => setScreen('fake_gift')} />
        )}

        {screen === 'fake_gift' && (
          <FakeGiftScreen onContinue={() => setScreen('plane_shake')} />
        )}

        {screen === 'plane_shake' && (
          <PlaneShakeScreen onFinish={() => setScreen('parachute_drop')} />
        )}

        {screen === 'parachute_drop' && (
          <ParachuteDropScreen onViewTicket={() => setScreen('ticket')} />
        )}

        {screen === 'ticket' && (
          <TicketScreen onRestart={handleReset} onShowCake={() => setScreen('cake')} />
        )}
      </div>
    </div>
  );
};
