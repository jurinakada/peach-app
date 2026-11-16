import { SLANG_DICTIONARY } from '../mockData'

// Finds which dictionary terms appear in a message. Real detection would likely
// be done server-side or by the LLM itself; this is a stand-in using the
// `slang` tags already attached to mock messages plus a plain-text fallback scan.
export function detectSlang(text, taggedKeys = []) {
  if (taggedKeys.length) return taggedKeys
  const lower = text.toLowerCase()
  return Object.keys(SLANG_DICTIONARY).filter((key) => lower.includes(key))
}

// STUB: swap this out for a real LLM call later, e.g.
//
//   export async function explainText(text, key) {
//     const res = await fetch('/api/explain', {
//       method: 'POST',
//       body: JSON.stringify({ text, term: key }),
//     })
//     return res.json() // { term, explanation }
//   }
//
// For now it just looks the term up in the hardcoded dictionary.
export async function explainText(_text, key) {
  const entry = SLANG_DICTIONARY[key]
  if (!entry) {
    return {
      term: key,
      explanation: "Hmm, I don't have an explanation for that one yet.",
    }
  }
  return entry
}
