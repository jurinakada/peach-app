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

// Conversations keyed by LOBBY_USERS id. `topic` shows under the chat header.
// `slang` lists dictionary keys present in `text` so the UI knows which
// messages get an "AI explains" chip.
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
]

export const STARTING_COINS = 120
