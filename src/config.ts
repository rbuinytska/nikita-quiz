import { AppConfig } from './types';

export const appConfig: AppConfig = {
  recipientName: 'Никита',
  eventDate: '2026',
  fromWhom: 'лучших друзей',
  ticket: {
    passenger: 'НИКИТА',
    format: 'ТАНДЕМ',
    height: '4000',
    date: 'Сезон 2027',
    airfield: 'DZ Slavica / Аэродром',
    certificateNumber: 'HERO-23-SKY'
  },
  playlist: [
    {
      id: 'track1',
      title: 'Tanti Auguri / Birthday Vibe',
      artist: 'Праздничный вайб',
      src: '/audio/track1.mp3'
    },
    {
      id: 'track2',
      title: 'Главный герой дня',
      artist: 'Slay Energy',
      src: '/audio/track2.mp3'
    }
  ]
};
