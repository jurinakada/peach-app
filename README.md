# PEACH 🍑

A clickable prototype for **PEACH**, a language-exchange app that mixes:
- Duolingo-style game rewards (coins, co-op battles)
- HelloTalk-style chat with foreign users, with AI-powered slang/cultural explanations
- VRChat-style shared virtual space

This is a front-end-only prototype — no backend, no real network calls. All data is mocked.

## Screens

1. **Lobby** (`/`) — a 2D room with avatars. Tap an avatar to open a chat with that person.
2. **Chat** (`/chat/:userId`) — chat with a mock foreign user. Messages containing slang or a
   cultural reference show an "✨ AI explains" chip; tapping it reveals an explanation bubble.
   Explanations currently come from a hardcoded dictionary — see `src/ai/explain.js` for the
   stub where a real LLM call would go.
3. **Battle** (`/battle`) — a 3-person co-op vocabulary quiz (you + 2 teammates from other
   countries) against a 10-second-per-question timer. Teammates' native-language words are
   shown as hints. Winning (and even partial credit) earns coins.
4. **Shop** (`/shop`) — spend coins on cosmetic items (hats, face accessories, pets,
   backgrounds). Owned items can be equipped; your equipped hat shows up on your avatar
   back in the Lobby.

## Mock data

Everything editable lives in **`src/mockData.js`**: the lobby users, chat conversations, the
slang/cultural-reference dictionary, battle questions + teammate hints, and shop items. Edit
that one file to change content without touching any component code.

Coins and owned/equipped items persist to `localStorage` so progress survives a refresh
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
