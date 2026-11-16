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
}

// Conversations keyed by LOBBY_USERS id. `slang` lists dictionary keys present in `text`
// so the UI knows which messages get an "AI explains" chip.
export const CONVERSATIONS = {
  haruto: [
    { from: 'them', text: 'Hey! Long time no chat 👋 How was your week?', slang: [] },
    { from: 'them', text: 'I had a nomikai with my coworkers yesterday, I\'m so tired lol', slang: ['nomikai'] },
    { from: 'me', text: 'Haha nice! What did you talk about?', slang: [] },
    { from: 'them', text: 'Mostly work stuff. My boss kept saying "ganbatte" about the new project 😅', slang: ['ganbatte'] },
    { from: 'them', text: 'Anyway, bet you had a chill week right?', slang: ['bet'] },
  ],
  camille: [
    { from: 'them', text: 'Salut! Ça va? 😊', slang: [] },
    { from: 'them', text: 'C\'est la rentrée here, everyone is stressed at school', slang: ['la rentrée'] },
    { from: 'me', text: 'Oh that sounds intense. What is that exactly?', slang: [] },
    { from: 'them', text: 'My grandma still wants to faire la bise with everyone at family dinners haha', slang: ['faire la bise'] },
  ],
  mateo: [
    { from: 'them', text: 'Buenas! Watched the match yesterday? 🔥', slang: [] },
    { from: 'them', text: 'After lunch I need my siesta, no cap', slang: ['siesta'] },
    { from: 'them', text: 'Then sobremesa for like an hour with my family lol', slang: ['sobremesa'] },
    { from: 'me', text: 'That sounds so relaxing honestly', slang: [] },
  ],
  soojin: [
    { from: 'them', text: 'Hii~ did you finish your homework yet?', slang: [] },
    { from: 'them', text: 'My little sister is doing so much aegyo to get allowance money 😂', slang: ['aegyo'] },
    { from: 'them', text: 'This new comeback is jjang btw, you have to listen', slang: ['jjang'] },
  ],
}

// Co-op battle: me + 2 teammates vs the clock. Each teammate's native word is shown
// as a hint for every question (regardless of the question's target language) to
// simulate "learning through your teammates".
export const BATTLE_TEAMMATES = [
  { id: 'haruto', name: 'Haruto', flag: '🇯🇵', lang: 'Japanese' },
  { id: 'camille', name: 'Camille', flag: '🇫🇷', lang: 'French' },
]

export const BATTLE_QUESTIONS = [
  {
    id: 'q1',
    prompt: 'Which word means "water"?',
    choices: ['Agua', 'Fuego', 'Cielo', 'Tierra'],
    answer: 'Agua',
    hints: [
      { teammateId: 'haruto', word: '水 (mizu)' },
      { teammateId: 'camille', word: 'eau' },
    ],
  },
  {
    id: 'q2',
    prompt: 'Which word means "friend"?',
    choices: ['Enemigo', 'Amigo', 'Extraño', 'Vecino'],
    answer: 'Amigo',
    hints: [
      { teammateId: 'haruto', word: '友達 (tomodachi)' },
      { teammateId: 'camille', word: 'ami' },
    ],
  },
  {
    id: 'q3',
    prompt: 'Which word means "to eat"?',
    choices: ['Dormir', 'Correr', 'Comer', 'Hablar'],
    answer: 'Comer',
    hints: [
      { teammateId: 'haruto', word: '食べる (taberu)' },
      { teammateId: 'camille', word: 'manger' },
    ],
  },
  {
    id: 'q4',
    prompt: 'Which word means "happy"?',
    choices: ['Triste', 'Cansado', 'Feliz', 'Enojado'],
    answer: 'Feliz',
    hints: [
      { teammateId: 'haruto', word: '幸せ (shiawase)' },
      { teammateId: 'camille', word: 'heureux' },
    ],
  },
  {
    id: 'q5',
    prompt: 'Which word means "tomorrow"?',
    choices: ['Ayer', 'Hoy', 'Mañana', 'Nunca'],
    answer: 'Mañana',
    hints: [
      { teammateId: 'haruto', word: '明日 (ashita)' },
      { teammateId: 'camille', word: 'demain' },
    ],
  },
]

export const SECONDS_PER_QUESTION = 10
export const COINS_PER_CORRECT_ANSWER = 15
export const BATTLE_WIN_BONUS = 50
// Win condition: get at least this many correct out of BATTLE_QUESTIONS.length
export const BATTLE_WIN_THRESHOLD = 3

export const SHOP_ITEMS = [
  { id: 'hat_cap', name: 'Backwards Cap', emoji: '🧢', category: 'Hat', price: 40 },
  { id: 'hat_crown', name: 'Tiny Crown', emoji: '👑', category: 'Hat', price: 120 },
  { id: 'hat_flower', name: 'Flower Crown', emoji: '🌸', category: 'Hat', price: 60 },
  { id: 'face_glasses', name: 'Cool Shades', emoji: '🕶️', category: 'Face', price: 50 },
  { id: 'face_mask', name: 'Cute Mask', emoji: '😷', category: 'Face', price: 25 },
  { id: 'pet_cat', name: 'Pixel Cat', emoji: '🐱', category: 'Pet', price: 80 },
  { id: 'pet_dog', name: 'Pixel Dog', emoji: '🐶', category: 'Pet', price: 80 },
  { id: 'pet_dragon', name: 'Baby Dragon', emoji: '🐲', category: 'Pet', price: 150 },
  { id: 'bg_beach', name: 'Beach Background', emoji: '🏖️', category: 'Background', price: 70 },
  { id: 'bg_space', name: 'Space Background', emoji: '🌌', category: 'Background', price: 90 },
]

export const STARTING_COINS = 120
