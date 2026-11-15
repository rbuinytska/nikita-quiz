import { QuestionItem } from '../types';

export const questionsData: QuestionItem[] = [
  {
    id: 1,
    type: 'text',
    badge: 'это база',
    media: { photo: '/assets/q01.jpg' },
    question: 'Кого не хватает на фото?',
    placeholder: 'Напиши, кто это',
    answer: 'беларус',
    aliases: ['белорус', 'белорусс', 'беларуc']
  },
  {
    id: 2,
    type: 'choice',
    badge: 'вечеринка',
    media: { photo: '/assets/q02.jpg' },
    question: 'Чей это был день рождения?',
    options: ['Мари', 'Джулия', 'Альвина', 'Клауд'],
    correct: 2
  },
  {
    id: 3,
    type: 'voice',
    badge: 'мотор!',
    media: {
      video: '/assets/q03-video.mp4',
      poster: '/assets/q03-poster.jpg',
      orientation: 'landscape'
    },
    question: 'Какой конфуз произошёл на съёмках?',
    voicePrompt: 'Расскажи друзьям, что случилось. Жюри решит, засчитать или нет'
  },
  {
    id: 4,
    type: 'match',
    badge: 'ну и вечер',
    media: { photo: '/assets/q04.jpg' },
    question: 'Кто какие последствия получил в итоге этого вечера? Сопоставь имя с ответом',
    options: [
      'испорченный суп',
      'уехала в неизвестность одна с незнакомым словаком',
      'ушиб ноги',
      'потерянная сим-карта и айсик'
    ],
    pairs: {
      'Никита': 2,
      'Полина': 3,
      'Артём': 0,
      'Мари': 1
    }
  },
  {
    id: 5,
    type: 'voice',
    badge: 'пикник',
    media: { photo: '/assets/q05.jpg' },
    question: 'Какие последствия были у этого вечера?',
    voicePrompt: 'Расскажи друзьям, чем всё закончилось. Жюри решит, засчитать или нет'
  },
  {
    id: 6,
    type: 'choice',
    badge: 'до дна',
    media: {
      video: '/assets/q06-video.mp4',
      poster: '/assets/q06-poster.jpg',
      orientation: 'portrait'
    },
    question: 'Какой напиток вызвал такие последствия?',
    options: ['Егерь', 'Метакса', 'Водка', 'Сангрия'],
    correct: 3
  },
  {
    id: 7,
    type: 'hidden_photo_text',
    badge: 'секрет',
    media: { photo: '/assets/q07.jpg' },
    question: 'Кто отказался пойти с тобой на свидание на кофе?',
    placeholder: 'Имя и фамилия',
    answer: 'Jakub Svec',
    aliases: ['Jakub Švec', 'Якуб Швец', 'Якуб Свец', 'Jakub', 'Якуб', 'Kuba', 'Куба', 'Svec', 'Švec', 'Швец', 'Свец', 'Швецык'],
    revealText: 'Точно. Это был Jakub Svec'
  },
  {
    id: 8,
    type: 'voice',
    badge: 'ой',
    media: { photo: '/assets/q08.jpg' },
    question: 'Где состоялся поцелуй с Максоном?',
    voicePrompt: 'Расскажи друзьям, где это было. Жюри решит, засчитать или нет'
  },
  {
    id: 9,
    type: 'voice',
    badge: 'сюрприз',
    media: { photo: '/assets/q09.jpg' },
    question: 'Какое было неожиданное пополнение компании?',
    voicePrompt: 'Расскажи друзьям, кто к вам присоединился. Жюри решит, засчитать или нет'
  },
  {
    id: 10,
    type: 'voice',
    badge: 'вайб',
    media: {
      photo: '/assets/q10.jpg',
      revealAfterAnswer: '/assets/q10-sticker.png'
    },
    question: 'Какой стикер описывает этот вечер?',
    voicePrompt: 'Найди и покажи друзьям стикер или эмодзи на телефоне. Жюри решит, попал ли ты в точку!',
    revealText: 'Тот самый легендарный стикер 🫦'
  },
  {
    id: 11,
    type: 'text',
    badge: 'драма',
    media: { photo: '/assets/q11.jpg' },
    question: 'Какая еда стала яблоком раздора?',
    placeholder: 'Напиши блюдо',
    answer: 'пицца',
    aliases: ['пиццу', 'пица', 'pizza']
  },
  {
    id: 12,
    type: 'text',
    badge: 'конфликт',
    media: { photo: '/assets/q12.jpg' },
    question: 'Что послужило причиной конфликта Мари и Артёма?',
    placeholder: 'Причина конфликта',
    answer: 'базы данных',
    aliases: ['база данных', 'бд', 'базы', 'database', 'databases', 'sql']
  },
  {
    id: 13,
    type: 'text',
    badge: 'за здоровье',
    media: { photo: '/assets/q13.jpg' },
    question: 'Какой напиток пил Юрий Черняк в этот вечер?',
    placeholder: 'Название напитка',
    answer: 'кефир',
    aliases: ['кефирчик', 'kefir']
  },
  {
    id: 14,
    type: 'text',
    badge: 'инкогнито',
    media: {
      photo: '/assets/q14.jpg',
      revealAfterAnswer: '/assets/q14-unblurred.jpg'
    },
    question: 'Кто заблюрен на фото?',
    hint: 'У него есть друг с неприятным запахом',
    placeholder: 'Кто это?',
    answer: 'Сергей',
    aliases: ['Серёжа', 'Сережа', 'Серега', 'Серёга', 'Sergej', 'Sergey'],
    revealText: 'Да! Это же Серёга!'
  },
  {
    id: 15,
    type: 'text',
    badge: 'дом-2',
    media: { photo: '/assets/q15.jpg' },
    question: 'Кто шестой участник «Дома-2»?',
    placeholder: 'Имя участника',
    answer: 'Миша',
    aliases: ['Михаил', 'Мишка', 'Миха', 'Misha']
  },
  {
    id: 16,
    type: 'text',
    badge: 'шопинг',
    media: { photo: '/assets/q16.jpg' },
    question: 'Какой был ключевой ингредиент корзины?',
    placeholder: 'Ингредиент',
    answer: 'сыр фета',
    aliases: ['фета', 'фету', 'сыр фету', 'feta']
  },
  {
    id: 17,
    type: 'choice',
    badge: 'мэтч',
    media: {
      video: '/assets/q17-video.mp4',
      poster: '/assets/q17-poster.jpg',
      orientation: 'portrait'
    },
    question: 'Где ты познакомился с этим человеком?',
    options: ['Grindr', 'Badoo', 'Tinder', 'LinkedIn'],
    correct: 2
  },
  {
    id: 18,
    type: 'choice',
    badge: 'евровидение',
    media: {
      video: '/assets/q18-video.mp4',
      poster: '/assets/q18-poster.jpg',
      orientation: 'landscape'
    },
    question: 'Какая песня набрала рекордные 758 баллов — максимум за всю историю Евровидения?',
    options: [
      'Alexander Rybak — Fairytale',
      'Salvador Sobral — Amar pelos dois',
      'Kalush Orchestra — Stefania',
      'Loreen — Tattoo'
    ],
    correct: 1,
    revealText: 'Именно! Salvador Sobral в 2017 году набрал 758 баллов — исторический рекорд Евровидения 🏆'
  }
];

