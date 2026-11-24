# PEACH 🍑

A clickable prototype for **PEACH**, a language-exchange app that mixes:
- Duolingo-style game rewards (coins, co-op battles)
- An AI conversation partner per language, with pronunciation coaching and AI-powered
  slang/cultural explanations
- VRChat-style shared virtual space

This is a front-end-only prototype — no backend, no real network calls. All data is mocked.
The design follows the project's own demo videos and pitch deck as closely as a static mock
allows (see `src/mockData.js` for exactly what's scripted vs. a stand-in for a real backend).

## Screens

0. **Onboarding** — shown once on first load: a splash ("Learn a language, one bite at a
   time.") followed by a welcome reward (bonus coins + a starter collectible). Resets if you
   clear the browser's localStorage.
1. **Lobby** (`/`) — a 2D room with avatars. Tap an avatar to open an AI Partner practice
   session for that language.
2. **Chat** (`/chat/:userId`) — a scripted AI Partner voice-practice session. Tap the mic
   ("Hold to talk") to "speak" your next line; it reveals a transcribed reply with a
   Pronunciation Coach score + tip, then the partner's response (with translation). Replies
   containing slang or a cultural reference show a "✨ Smart Chat" chip; tapping it reveals an
   "AI culture note" card. Explanations come from a hardcoded dictionary — see
   `src/ai/explain.js` for the stub where a real LLM/STT call would go.
3. **Battle** (`/battle`) — Team Peach (you + 2 teammates from other countries) races Team Plum
   through 5 narrative mission rounds against a 30-second timer. Each round shows one hint in a
   rotating teammate's native language — "your teammates' language becomes your hint" — plus a
   lettered multiple-choice answer. Correct answers pay out coins live and unlock a themed
   collectible item immediately.
4. **Shop** (`/shop`) — "Collect the World": spend coins on cultural collectible items (each
   tied to a country) or see the ones you've already won in Battle marked "Owned".

## Mock data

Everything editable lives in **`src/mockData.js`**: the lobby users, scripted AI Partner
conversations (turns, translations, pronunciation scores), the slang/cultural-reference
dictionary, battle mission rounds (hints, choices, rewards), and culture items. Edit that one
file to change content without touching any component code.

Coins and owned items persist to `localStorage` so progress survives a refresh
(`src/state/GameContext.jsx`).

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
