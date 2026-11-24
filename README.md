# PEACH 🍑

A clickable prototype for **PEACH**, a language-exchange app that mixes:
- Duolingo-style game rewards (coins, co-op battles)
- One AI conversation partner, with pronunciation coaching and AI-powered slang/cultural
  explanations
- HelloTalk-style text chat with real human foreign users
- VRChat-style shared virtual space

This is a front-end-only prototype — no backend, no real network calls. All data is mocked.
The design follows the project's own demo videos and pitch deck as closely as a static mock
allows (see `src/mockData.js` for exactly what's scripted vs. a stand-in for a real backend).

## Screens

0. **Onboarding** — shown once on first load: a splash carousel followed by a welcome reward
   (bonus coins + a starter collectible). Resets if you clear the browser's localStorage.
1. **Lobby** (`/`) — "Talk with your AI Partner" and "Your Study Plan" cards up top, and below
   them a 2D room with human avatars. Tap an avatar to open a text chat with that person.
2. **AI Partner picker** (`/ai-partner`) — "Talk with an AI partner any time": choose a
   language (Spanish or English) via tabs, then pick any real-life practice topic (Everyday
   Chat, Ordering Food, Asking Directions) with no restrictions — a ✓ marks ones you've
   already completed, tracked per language.
3. **AI Partner session** (`/ai-partner/:langCode/:scenarioId`) — a scripted voice-practice
   session for the chosen language + topic. Tap the mic ("Hold to talk") to "speak" your next
   line; it reveals a transcribed reply with a Pronunciation Coach score + tip, then the
   partner's response (with an English translation, when the target language isn't already
   English). Replies containing slang or a cultural reference show a "✨ Smart Chat" chip;
   tapping it reveals an "AI culture note" card. Explanations come from a hardcoded dictionary
   — see `src/ai/explain.js` for the stub where a real LLM/STT call would go.
4. **Study Plan** (`/study-plan`) — "lessons fit your level and goals": your current plan's
   language (Spanish, by default — see `STUDY_PLAN.languageCode` in mockData) presented as a
   guided, ordered path — each lesson unlocks only once the one before it is completed.
5. **Chat** (`/chat/:userId`) — HelloTalk-style typed chat with a real human contact. Messages
   containing slang or a cultural reference show a "✨ AI explains" chip that reveals the same
   kind of culture-note card.
6. **Battle** (`/battle`) — Team Peach (you + 2 human teammates from other countries) races
   Team Plum through 5 narrative mission rounds against a 30-second timer. Each round shows
   one hint in a rotating teammate's native language — "your teammates' language becomes your
   hint" — plus a lettered multiple-choice answer. Correct answers pay out coins live and
   unlock a themed collectible item immediately.
7. **Shop** (`/shop`) — "Collect the World": spend coins on cultural collectible items (each
   tied to a country) or see the ones you've already won in Battle marked "Owned".

## Mock data

Everything editable lives in **`src/mockData.js`**: the human lobby contacts + their typed
conversations, `AI_PARTNER_LANGUAGES` + `AI_PARTNER_SCENARIOS` (scripted turns per language,
translations, pronunciation scores — also what drives the Study Plan's lesson list), the
slang/cultural-reference dictionary, battle mission rounds (hints, choices, rewards), and
culture items. Edit that one file to change content without touching any component code —
adding a third language is just adding another key to `AI_PARTNER_SCENARIOS` and an entry in
`AI_PARTNER_LANGUAGES`.

Coins, owned items, and completed AI Partner scenarios persist to `localStorage` so progress
survives a refresh (`src/state/GameContext.jsx`).

## Running locally

```bash
npm install
npm run dev
```

Open the printed local URL — the UI is designed mobile-sized (max ~420px wide) and will
center itself in a phone-shaped frame on wider screens.

## Tech

React + Vite, `react-router-dom` (HashRouter), plain CSS (no UI framework) with a peach
color theme defined in `src/App.css`.
