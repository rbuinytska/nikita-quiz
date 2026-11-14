export type QuestionType = 'text' | 'choice' | 'match' | 'voice' | 'hidden_photo_text';

export interface QuestionMedia {
  photo?: string;
  video?: string;
  poster?: string;
  orientation?: 'portrait' | 'landscape';
  revealAfterAnswer?: string;
}

export interface QuestionItem {
  id: number;
  type: QuestionType;
  media?: QuestionMedia;
  question: string;
  badge?: string; // sticker in top-right: e.g. "это база"
  answer?: string;
  aliases?: string[];
  options?: string[];
  correct?: number;
  pairs?: Record<string, number>;
  voicePrompt?: string;
  hint?: string;
  placeholder?: string;
  revealText?: string;
  note?: string;
}

export interface Track {
  id: string;
  title: string;
  artist?: string;
  src: string;
}

export interface AppConfig {
  recipientName: string;
  eventDate: string;
  fromWhom: string;
  ticket: {
    passenger: string;
    format: string;
    height: string;
    date: string;
    airfield: string;
    certificateNumber: string;
  };
  playlist: Track[];
}

export type ScreenState = 
  | 'welcome'
  | 'question'
  | 'reaction'
  | 'before_gift'
  | 'plane_shake'
  | 'parachute_drop'
  | 'ticket';

export interface QuizProgress {
  currentScreen: ScreenState;
  currentQuestionIndex: number;
  lastAnswerCorrect: boolean;
  lastQuestionAnswer?: string;
  answers: Record<number, any>;
  score: number;
}
