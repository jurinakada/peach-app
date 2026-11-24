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
  'otsukaresama': {
    term: 'Otsukaresama (お疲れ様)',
    explanation:
      'Said to acknowledge someone\'s effort — roughly "good work" — used constantly at and after work in Japan, regardless of how tired anyone actually is.',
  },
  'guay': {
    term: 'Guay',
    explanation:
      'Spanish slang for "cool" or "nice" — casual, used mostly in Spain.',
  },
}

// Each LOBBY_USERS contact is an AI conversation partner for their native
// language — practice is a scripted back-and-forth, not free typing.
// `topic` shows under the chat header. Each turn is either:
//   { from: 'ai', text, translation, slang?: [dictionaryKey] }
//   { from: 'me', text, pronunciation: { score, tip } }
// `slang` keys are passed straight to explainText() — see ai/explain.js —
// rather than scanned from text, since the dialogue itself is in-language.
export const CONVERSATIONS = {
  haruto: {
    topic: 'Weekend',
    turns: [
      { from: 'ai', text: '週末は何をしましたか?', translation: 'What did you do this weekend?' },
      {
        from: 'me',
        text: '友達と飲み会に行きました。',
        pronunciation: { score: 88, tip: "lengthen the long 'ō' in nomikai" },
      },
      { from: 'ai', text: 'いいですね!楽しかったですか?', translation: 'Nice! Was it fun?', slang: ['nomikai'] },
      {
        from: 'me',
        text: 'はい、でも疲れました!',
        pronunciation: { score: 94, tip: "soften the 'r' sound in tsukaremashita" },
      },
      {
        from: 'ai',
        text: 'お疲れ様でした!今度は週末にゆっくり休んでくださいね。',
        translation: 'Otsukaresama! Next time, rest well on the weekend.',
        slang: ['otsukaresama'],
      },
    ],
  },
  camille: {
    topic: 'School life',
    turns: [
      {
        from: 'ai',
        text: "C'est la rentrée ici, comment ça se passe pour toi?",
        translation: "It's back-to-school time here, how's it going for you?",
        slang: ['la rentrée'],
      },
      {
        from: 'me',
        text: "Ça va, mais j'ai beaucoup de devoirs.",
        pronunciation: { score: 90, tip: "nasalize the 'en' in beaucoup" },
      },
      { from: 'ai', text: 'Courage! Tu vas y arriver.', translation: "Stay strong! You'll get there." },
      {
        from: 'me',
        text: "Merci, j'espère!",
        pronunciation: { score: 95, tip: "roll the 'r' softly in espère" },
      },
      {
        from: 'ai',
        text: 'On peut faire la bise demain si tu veux passer!',
        translation: 'We can do la bise tomorrow if you want to stop by!',
        slang: ['faire la bise'],
      },
    ],
  },
  mateo: {
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
  soojin: {
    topic: 'Family',
    turns: [
      { from: 'ai', text: '주말에 뭐 했어요?', translation: 'What did you do this weekend?' },
      {
        from: 'me',
        text: '친구들이랑 영화 봤어요.',
        pronunciation: { score: 89, tip: "shorten the 'eo' sound in yeonghwa" },
      },
      { from: 'ai', text: '재미있었어요?', translation: 'Was it fun?' },
      {
        from: 'me',
        text: '네, 완전 잼있었어요!',
        pronunciation: { score: 93, tip: 'soften the final syllable in jaemisseosseoyo' },
      },
      {
        from: 'ai',
        text: '완전 잼있었다니 진짜 짱이에요!',
        translation: "That's awesome, totally the best!",
        slang: ['jjang'],
      },
    ],
  },
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
