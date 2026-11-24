// All mock/demo data lives here. Swap any of this out for real API data later
// without touching component code — screens just import from this file.

export const ME = {
  id: 'me',
  name: 'You',
  flag: '🇺🇸',
  lang: 'English',
  color: '#ff9f80',
  emoji: '🙂',
  x: 50,
  y: 68,
}

export const LOBBY_USERS = [
  {
    id: 'haruto',
    name: 'Haruto',
    country: 'Japan',
    flag: '🇯🇵',
    lang: 'Japanese',
    color: '#ffb199',
    emoji: '🎧',
    x: 22,
    y: 28,
    status: 'online',
  },
  {
    id: 'camille',
    name: 'Camille',
    country: 'France',
    flag: '🇫🇷',
    lang: 'French',
    color: '#ffceb0',
    emoji: '🎨',
    x: 74,
    y: 24,
    status: 'online',
  },
  {
    id: 'mateo',
    name: 'Mateo',
    country: 'Spain',
    flag: '🇪🇸',
    lang: 'Spanish',
    color: '#ffb3a7',
    emoji: '⚽',
    x: 30,
    y: 72,
    status: 'online',
  },
  {
    id: 'soojin',
    name: 'Soo-jin',
    country: 'South Korea',
    flag: '🇰🇷',
    lang: 'Korean',
    color: '#ffd9c7',
    emoji: '📚',
    x: 78,
    y: 70,
    status: 'away',
  },
]

// Hardcoded slang/cultural-reference dictionary.
// Keys are matched case-insensitively as whole phrases inside chat messages.
// Later this lookup can be replaced by a real LLM call — see explainText() in ai/explain.js.
export const SLANG_DICTIONARY = {
  'yolo': {
    term: 'YOLO',
    explanation:
      '"You Only Live Once" — used in English to justify a spontaneous or risky decision.',
  },
  'ganbatte': {
    term: 'Ganbatte (頑張って)',
    explanation:
      'A Japanese phrase of encouragement, roughly "do your best!" or "good luck!" — said before an effort, not after.',
  },
  'nomikai': {
    term: 'Nomikai (飲み会)',
    explanation:
      'A Japanese work/social drinking party. Common after-hours bonding ritual, often paid for partly by the company.',
  },
  'la rentrée': {
    term: 'La rentrée',
    explanation:
      'French for "the return" — refers to the start of the school/work year in September, a big cultural moment in France.',
  },
  'faire la bise': {
    term: 'Faire la bise',
    explanation:
      'The French custom of greeting with light cheek kisses — number of kisses varies by region (usually 2).',
  },
  'siesta': {
    term: 'Siesta',
    explanation:
      'A short afternoon nap/rest, traditional in Spain, often during the hottest part of the day.',
  },
  'sobremesa': {
    term: 'Sobremesa',
    explanation:
      'Spanish for the time spent chatting at the table after a meal has finished — considered as important as the meal itself.',
  },
  'aegyo': {
    term: 'Aegyo (애교)',
    explanation:
      'Korean for a deliberately cute display of affection — exaggerated cute voice, expressions or gestures.',
  },
  'jjang': {
    term: 'Jjang (짱)',
    explanation:
      'Korean slang meaning "the best" or "awesome" — an enthusiastic compliment.',
  },
  'bet': {
    term: 'Bet',
    explanation:
      'English slang meaning "okay" / "deal" / "for sure" — agreement, not an actual wager.',
  },
  'guay': {
    term: 'Guay',
    explanation:
      'Spanish slang for "cool" or "nice" — casual, used mostly in Spain.',
  },
  'café con leche': {
    term: 'Café con leche',
    explanation:
      'The most common way to order a Spanish-style latte in Spain — espresso with hot, steamed milk.',
  },
  'for here or to go': {
    term: '"For here or to go?"',
    explanation:
      'A standard question at US cafés asking whether you\'ll eat in (for here) or take your order with you (to go).',
  },
  'no worries': {
    term: 'No worries',
    explanation:
      'A casual, friendly way to say "you\'re welcome" or "it\'s fine" — common in English, especially Australian/British English.',
  },
}

// Conversations with the four LOBBY_USERS contacts — real human chat partners
// (HelloTalk-style). `topic` shows under the chat header. `slang` lists
// dictionary keys present in `text` so the UI knows which messages get a
// "✨ AI explains" chip — see ai/explain.js.
export const CONVERSATIONS = {
  haruto: {
    topic: 'Weekend',
    messages: [
      { from: 'them', text: 'Hey! Long time no chat 👋 How was your week?', slang: [] },
      { from: 'them', text: 'I had a nomikai with my coworkers yesterday, I\'m so tired lol', slang: ['nomikai'] },
      { from: 'me', text: 'Haha nice! What did you talk about?', slang: [] },
      { from: 'them', text: 'Mostly work stuff. My boss kept saying "ganbatte" about the new project 😅', slang: ['ganbatte'] },
      { from: 'them', text: 'Anyway, bet you had a chill week right?', slang: ['bet'] },
    ],
  },
  camille: {
    topic: 'School life',
    messages: [
      { from: 'them', text: 'Salut! Ça va? 😊', slang: [] },
      { from: 'them', text: 'C\'est la rentrée here, everyone is stressed at school', slang: ['la rentrée'] },
      { from: 'me', text: 'Oh that sounds intense. What is that exactly?', slang: [] },
      { from: 'them', text: 'My grandma still wants to faire la bise with everyone at family dinners haha', slang: ['faire la bise'] },
    ],
  },
  mateo: {
    topic: 'Daily routine',
    messages: [
      { from: 'them', text: 'Buenas! Watched the match yesterday? 🔥', slang: [] },
      { from: 'them', text: 'After lunch I need my siesta, no cap', slang: ['siesta'] },
      { from: 'them', text: 'Then sobremesa for like an hour with my family lol', slang: ['sobremesa'] },
      { from: 'me', text: 'That sounds so relaxing honestly', slang: [] },
    ],
  },
  soojin: {
    topic: 'Family',
    messages: [
      { from: 'them', text: 'Hii~ did you finish your homework yet?', slang: [] },
      { from: 'them', text: 'My little sister is doing so much aegyo to get allowance money 😂', slang: ['aegyo'] },
      { from: 'them', text: 'This new comeback is jjang btw, you have to listen', slang: ['jjang'] },
    ],
  },
}

// The ONE AI Partner — a single always-available conversation practice
// partner (separate from the human LOBBY_USERS contacts above). Its avatar
// stays the same; which language it speaks is picked on the practice screen.
export const AI_PARTNER_PROFILE = {
  id: 'ai-partner',
  emoji: '🍑',
  color: '#ffceb0',
}

export const AI_PARTNER_LANGUAGES = [
  { code: 'es', lang: 'Spanish', flag: '🇪🇸' },
  { code: 'en', lang: 'English', flag: '🇬🇧' },
]

// Real-life practice scenarios, grouped by language code (see
// AI_PARTNER_LANGUAGES). Also doubles as the Study Plan's lesson list (see
// STUDY_PLAN below), so a scenario is both "practice any time" and "a
// lesson". Each turn is either:
//   { from: 'ai', text, translation?, slang?: [dictionaryKey] }
//   { from: 'me', text, pronunciation: { score, tip } }
// `translation` is omitted when the scenario's language already matches the
// display language (English). `slang` keys are passed straight to
// explainText() — see ai/explain.js.
export const AI_PARTNER_SCENARIOS = {
  es: [
    {
      id: 'weekend',
      title: 'Everyday Chat',
      icon: '💬',
      topic: 'Weekend',
      turns: [
        { from: 'ai', text: '¿Qué hiciste el fin de semana?', translation: 'What did you do on the weekend?' },
        {
          from: 'me',
          text: 'Fui a la playa con mis amigos.',
          pronunciation: { score: 92, tip: "soften the 'y' in playa" },
        },
        { from: 'ai', text: '¡Qué guay! ¿Nadaste?', translation: 'Nice! Did you swim?', slang: ['guay'] },
        {
          from: 'me',
          text: 'Sí, el agua estaba perfecta.',
          pronunciation: { score: 91, tip: "roll the double 'rr' sound — agua has none, careful not to add it" },
        },
        {
          from: 'ai',
          text: 'Después seguro tocó sobremesa con la familia, ¿no?',
          translation: 'Afterwards you probably had sobremesa with the family, right?',
          slang: ['sobremesa'],
        },
      ],
    },
    {
      id: 'cafe',
      title: 'Ordering Food',
      icon: '☕',
      topic: 'Ordering food at a café',
      turns: [
        { from: 'ai', text: '¡Hola! ¿Qué te gustaría pedir?', translation: 'Hello! What would you like to order?' },
        {
          from: 'me',
          text: 'Quiero un café con leche, por favor.',
          pronunciation: { score: 88, tip: "soften the 'b' sound in favor" },
        },
        {
          from: 'ai',
          text: '¡Perfecto! Un café con leche es una gran elección.',
          translation: 'Perfect! A café con leche is a great choice.',
          slang: ['café con leche'],
        },
        {
          from: 'me',
          text: 'Sí, también quiero un croissant.',
          pronunciation: { score: 90, tip: "lengthen the vowel sound in croissant" },
        },
        {
          from: 'ai',
          text: '¡Marchando! Serán cinco euros.',
          translation: "Coming right up! That'll be five euros.",
        },
      ],
    },
    {
      id: 'directions',
      title: 'Asking Directions',
      icon: '🧭',
      topic: 'Asking for Directions',
      turns: [
        {
          from: 'ai',
          text: '¿Necesitas ayuda para encontrar algo?',
          translation: 'Do you need help finding something?',
        },
        {
          from: 'me',
          text: 'Sí, busco la estación de tren.',
          pronunciation: { score: 90, tip: "soften the 'c' sound in estación" },
        },
        {
          from: 'ai',
          text: 'Sigue recto y gira a la derecha en la plaza.',
          translation: 'Go straight and turn right at the square.',
        },
        {
          from: 'me',
          text: 'Muchas gracias, ¡qué amable!',
          pronunciation: { score: 93, tip: "stress the first syllable in gracias" },
        },
        { from: 'ai', text: '¡De nada! Buen viaje.', translation: "You're welcome! Safe travels." },
      ],
    },
  ],
  en: [
    {
      id: 'weekend',
      title: 'Everyday Chat',
      icon: '💬',
      topic: 'Weekend',
      turns: [
        { from: 'ai', text: 'What did you do this weekend?' },
        {
          from: 'me',
          text: 'I went to the beach with my friends.',
          pronunciation: { score: 90, tip: "stress the first syllable in 'friends'" },
        },
        { from: 'ai', text: 'Nice! Did you swim?' },
        {
          from: 'me',
          text: 'Yeah, the water was perfect.',
          pronunciation: { score: 94, tip: "soften the 'w' in water, don't over-round your lips" },
        },
        { from: 'ai', text: "Must've been fun — YOLO, am I right?", slang: ['yolo'] },
      ],
    },
    {
      id: 'cafe',
      title: 'Ordering Food',
      icon: '☕',
      topic: 'Ordering food at a café',
      turns: [
        { from: 'ai', text: 'Hi! What would you like to order?' },
        {
          from: 'me',
          text: "I'll have a latte, please.",
          pronunciation: { score: 89, tip: "soften the double 't' sound in latte" },
        },
        { from: 'ai', text: 'Great choice! For here or to go?', slang: ['for here or to go'] },
        {
          from: 'me',
          text: 'For here, thanks.',
          pronunciation: { score: 95, tip: "don't drop the 'r' in for" },
        },
        { from: 'ai', text: "Coming right up! That'll be five dollars." },
      ],
    },
    {
      id: 'directions',
      title: 'Asking Directions',
      icon: '🧭',
      topic: 'Asking for Directions',
      turns: [
        { from: 'ai', text: 'Do you need help finding something?' },
        {
          from: 'me',
          text: "Yes, I'm looking for the train station.",
          pronunciation: { score: 91, tip: "stress the second syllable in 'station'" },
        },
        { from: 'ai', text: 'Go straight and turn right at the corner.' },
        {
          from: 'me',
          text: "Thanks so much, that's very kind of you!",
          pronunciation: { score: 92, tip: "link 'so much' smoothly, don't pause between the words" },
        },
        { from: 'ai', text: 'No worries! Safe travels.', slang: ['no worries'] },
      ],
    },
  ],
}

// Your own study plan — level, goal, and a recommended ORDER to practice a
// language's scenarios above. Unlike the free-access scenario picker,
// lessons here unlock one at a time as you complete the previous one.
export const STUDY_PLAN = {
  level: 'Beginner',
  languageCode: 'es',
  language: 'Spanish',
  goal: 'Travel-ready conversations in 3 months',
}

// Team Battle: you + 2 teammates vs "Team Plum" on a timer, round by round.
// Each round has a narrative mission and ONE hint, voiced in that round's
// teammate's native language — "your teammates' language becomes your hint".
export const BATTLE_TEAMMATES = [
  { id: 'haruto', name: 'Haruto', flag: '🇯🇵', lang: 'Japanese' },
  { id: 'camille', name: 'Camille', flag: '🇫🇷', lang: 'French' },
]

export const OPPONENT_TEAM_NAME = 'Team Plum'
export const OPPONENT_SCORE_GAINS = [18, 22, 15, 25, 20]

export const BATTLE_ROUNDS = [
  {
    id: 'r1',
    mission: 'Find the hidden café together',
    hint: { teammateId: 'haruto', text: '喫茶店は赤いドアです (Kissaten wa akai doa desu)', translation: 'The café has a red door' },
    question: 'Which door is the café?',
    choices: [
      { id: 'a', label: 'Blue door', color: '#5b8def' },
      { id: 'b', label: 'Red door', color: '#e2574c' },
      { id: 'c', label: 'Green door', color: '#4caf7d' },
    ],
    answerId: 'b',
    reward: { coins: 30, item: 'paper_fan' },
  },
  {
    id: 'r2',
    mission: 'Order breakfast like a local in Paris',
    hint: { teammateId: 'camille', text: 'Je prends un croissant, s\'il vous plaît', translation: "I'll have a croissant, please" },
    question: 'What should you order?',
    choices: [
      { id: 'a', label: 'Soup', color: '#5b8def' },
      { id: 'b', label: 'Croissant', color: '#e2574c' },
      { id: 'c', label: 'Steak', color: '#4caf7d' },
    ],
    answerId: 'b',
    reward: { coins: 30, item: 'croissant' },
  },
  {
    id: 'r3',
    mission: 'Catch the right bus to the market in London',
    hint: { teammateId: 'haruto', text: '赤いバスに乗ってください (Akai basu ni notte kudasai)', translation: 'Please get on the red bus' },
    question: 'Which bus do you take?',
    choices: [
      { id: 'a', label: 'Blue bus', color: '#5b8def' },
      { id: 'b', label: 'Red bus', color: '#e2574c' },
      { id: 'c', label: 'Green bus', color: '#4caf7d' },
    ],
    answerId: 'b',
    reward: { coins: 35, item: 'red_bus' },
  },
  {
    id: 'r4',
    mission: 'Pick the right street snack in Mexico City',
    hint: { teammateId: 'camille', text: 'Prends le taco, pas la soupe', translation: 'Take the taco, not the soup' },
    question: 'What do you order?',
    choices: [
      { id: 'a', label: 'Soup', color: '#5b8def' },
      { id: 'b', label: 'Taco', color: '#e2574c' },
      { id: 'c', label: 'Salad', color: '#4caf7d' },
    ],
    answerId: 'b',
    reward: { coins: 35, item: 'taco' },
  },
  {
    id: 'r5',
    mission: 'Find your platform for the train to Seoul',
    hint: { teammateId: 'haruto', text: '３番線に行ってください (San-bansen ni itte kudasai)', translation: 'Please go to platform 3' },
    question: 'Which platform?',
    choices: [
      { id: 'a', label: 'Platform 1', color: '#5b8def' },
      { id: 'b', label: 'Platform 2', color: '#4caf7d' },
      { id: 'c', label: 'Platform 3', color: '#e2574c' },
    ],
    answerId: 'c',
    reward: { coins: 40, item: 'kimchi' },
  },
]

export const SECONDS_PER_ROUND = 30
// Win condition: get at least this many correct out of BATTLE_ROUNDS.length
export const BATTLE_WIN_THRESHOLD = 3
export const BATTLE_WIN_BONUS = 50

// "Collect the World" — cosmetic/collectible items tied to real cultures.
// Battle rounds can award one of these directly (see BATTLE_ROUNDS[].reward.item);
// anything not yet won can also be bought with coins here.
export const CULTURE_ITEMS = [
  { id: 'paper_fan', name: 'Paper Fan', emoji: '🪭', country: 'Japan', price: 40 },
  { id: 'croissant', name: 'Croissant', emoji: '🥐', country: 'France', price: 35 },
  { id: 'red_bus', name: 'Red Bus', emoji: '🚌', country: 'United Kingdom', price: 45 },
  { id: 'taco', name: 'Taco', emoji: '🌮', country: 'Mexico', price: 35 },
  { id: 'kimchi', name: 'Kimchi', emoji: '🥬', country: 'South Korea', price: 45 },
  { id: 'paella', name: 'Paella', emoji: '🥘', country: 'Spain', price: 50 },
  { id: 'gondola', name: 'Gondola', emoji: '🛶', country: 'Italy', price: 60 },
  { id: 'maple_leaf', name: 'Maple Leaf', emoji: '🍁', country: 'Canada', price: 30 },
  { id: 'ceramic_cup', name: 'Ceramic Cup', emoji: '☕', country: 'Spain', price: 45 },
]

export const STARTING_COINS = 120

// Onboarding splash carousel — one speech bubble "spoken" per slide.
export const ONBOARDING_SLIDES = [
  { bubble: 'Hola!', color: '#f3b088' },
  { bubble: 'Bonjour', color: '#9ad1b5' },
  { bubble: 'こんにちは', color: '#9ad1b5' },
  { bubble: '你好', color: '#e2574c' },
]

// Welcome reward granted once, right after onboarding finishes.
export const ONBOARDING_BONUS_COINS = 50
export const ONBOARDING_STARTER_ITEM = 'ceramic_cup'
