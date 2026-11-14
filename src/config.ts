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
      id: 'birthday-vibe',
      title: 'Праздничный вайб',
      artist: 'Party Vibe',
      src: 'audio/birthday-vibe.mp3'
    }
  ]
};
