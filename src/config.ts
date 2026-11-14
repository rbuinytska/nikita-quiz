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
      id: 'sirotkin-1',
      title: 'За водопадами',
      artist: 'Сироткин',
      src: 'audio/sirotkin-za-vodopadami.mp3'
    }
  ]
};
