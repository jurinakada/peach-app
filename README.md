# PEACH 🍑

A clickable prototype for **PEACH**, a language-exchange app that mixes:
- Duolingo-style game rewards (coins, co-op battles)
- HelloTalk-style chat with foreign users, with AI-powered slang/cultural explanations
- VRChat-style shared virtual space

This is a front-end-only prototype — no backend, no real network calls. All data is mocked.

## Screens

1. **Lobby** (`/`) — a 2D room with avatars. Tap an avatar to open a chat with that person.
2. **Chat** (`/chat/:userId`) — chat with a mock foreign user, topic shown under their name.
   Messages containing slang or a cultural reference show an "✨ AI explains" chip; tapping it
   reveals an "AI culture note" card. Explanations currently come from a hardcoded dictionary —
   see `src/ai/explain.js` for the stub where a real LLM call would go.
3. **Battle** (`/battle`) — Team Peach (you + 2 teammates from other countries) races Team Plum
   through 5 narrative mission rounds against a 30-second timer. Each round shows one hint in a
   rotating teammate's native language — "your teammates' language becomes your hint" — plus a
   lettered multiple-choice answer. Correct answers pay out coins live and unlock a themed
   collectible item immediately.
4. **Shop** (`/shop`) — "Collect the World": spend coins on cultural collectible items (each
   tied to a country) or see the ones you've already won in Battle marked "Owned".

## Mock data

Everything editable lives in **`src/mockData.js`**: the lobby users, chat conversations +
topics, the slang/cultural-reference dictionary, battle mission rounds (hints, choices,
rewards), and culture items. Edit that one file to change content without touching any
component code.

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
