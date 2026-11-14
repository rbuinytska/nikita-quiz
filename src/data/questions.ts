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
    aliases: ['Jakub Švec', 'Якуб Швец', 'Якуб Свец', 'Svec', 'Švec', 'Швец'],
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
    type: 'text',
    badge: 'вайб',
    media: {
      photo: '/assets/q10.jpg',
      revealAfterAnswer: '/assets/q10-sticker.png'
    },
    question: 'Какой стикер описывает этот вечер?',
    placeholder: 'Опиши стикер словами',
    answer: 'губы',
    aliases: [
      'губа',
      'кусает губу',
      'закусанная губа',
      'закусывает губу',
      'прикусила губу',
      'прикусывает губу',
      'lips'
    ],
    note: 'Засчитывать, если в ответе есть слово «губ» в любой форме.'
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
    media: { photo: '/assets/q14.jpg' },
    question: 'Кто заблюрен на фото?',
    hint: 'У него есть друг с неприятным запахом',
    placeholder: 'Кто это?',
    answer: 'Сергей',
    aliases: ['Серёжа', 'Сережа', 'Серега', 'Серёга', 'Sergej', 'Sergey']
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
  // Вопросы 18-23 — заглушки, готовые к заполнению автором (согласно разделу 6 HANDOFF.md)
  {
    id: 18,
    type: 'text',
    badge: 'секрет',
    media: { photo: '/assets/nikita.jpg' },
    question: 'Какая любимая коронная фраза Никиты в любой непонятной ситуации?',
    placeholder: 'Твой ответ',
    answer: 'база',
    aliases: ['это база', 'slay', 'вайб', 'кринж', 'иконка']
  },
  {
    id: 19,
    type: 'choice',
    badge: 'интрига',
    media: { photo: '/assets/nikita.jpg' },
    question: 'Сколько будильников Никите нужно, чтобы проснуться вовремя?',
    options: ['1 (он пунктуален)', '3 штуки с шагом 5 минут', '7 и звонок друга', 'Он никогда не просыпается'],
    correct: 1
  },
  {
    id: 20,
    type: 'voice',
    badge: 'легенда',
    media: { photo: '/assets/nikita.jpg' },
    question: 'Самый эпичный поступок или фраза за прошедший год?',
    voicePrompt: 'Расскажи жюри свою версию. Друзья решат, достойно ли это зачёта!'
  },
  {
    id: 21,
    type: 'choice',
    badge: 'эксклюзив',
    media: { photo: '/assets/nikita.jpg' },
    question: 'Что Никита выберет в пятницу вечером?',
    options: ['Уютный чилл под сериал', 'Шумную тусовку до рассвета', 'Кодить пет-проект', 'Спонтанную поездку в другой город'],
    correct: 1
  },
  {
    id: 22,
    type: 'text',
    badge: 'красота',
    media: { photo: '/assets/nikita.jpg' },
    question: 'Какой главный скилл или суперсила именинника?',
    placeholder: 'Суперсила',
    answer: 'харизма',
    aliases: ['обаяние', 'красота', 'ум', 'вайб', 'дружба', 'душа компании', 'все']
  },
  {
    id: 23,
    type: 'voice',
    badge: 'финал!',
    media: { photo: '/assets/nikita.jpg' },
    question: 'Готов ли ты к самому безумному приключению в твоей жизни?',
    voicePrompt: 'Произнеси вслух своё финальное согласие перед открытием главного подарка!'
  }
];

