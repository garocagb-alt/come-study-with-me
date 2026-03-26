export interface Highlight {
  verseKey: string; // "1-nefi-1-5" = 1 Nefi 1:5
  colorId: string;
}

export interface VerseNote {
  id: string;
  verseKey: string;
  content: string;
  createdAt: string;
}

const HIGHLIGHTS_KEY = "cswm_highlights";
const VERSE_NOTES_KEY = "cswm_verse_notes";

// --- Highlights ---
export function getHighlights(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(HIGHLIGHTS_KEY);
  return data ? JSON.parse(data) : {};
}

export function setHighlight(verseKey: string, colorId: string): void {
  const h = getHighlights();
  h[verseKey] = colorId;
  localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(h));
}

export function removeHighlight(verseKey: string): void {
  const h = getHighlights();
  delete h[verseKey];
  localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(h));
}

// --- Verse Notes ---
export function getVerseNotes(): VerseNote[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(VERSE_NOTES_KEY);
  return data ? JSON.parse(data) : [];
}

export function getNotesForVerse(verseKey: string): VerseNote[] {
  return getVerseNotes().filter((n) => n.verseKey === verseKey);
}

export function addVerseNote(verseKey: string, content: string): VerseNote {
  const notes = getVerseNotes();
  const note: VerseNote = {
    id: crypto.randomUUID(),
    verseKey,
    content,
    createdAt: new Date().toISOString(),
  };
  notes.unshift(note);
  localStorage.setItem(VERSE_NOTES_KEY, JSON.stringify(notes));
  return note;
}

export function deleteVerseNote(id: string): void {
  const notes = getVerseNotes().filter((n) => n.id !== id);
  localStorage.setItem(VERSE_NOTES_KEY, JSON.stringify(notes));
}
