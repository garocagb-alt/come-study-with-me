export interface Note {
  id: string;
  category: string;
  title: string;
  content: string;
  scripture?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "cswm_notes";

export function getNotes(): Note[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveNote(note: Omit<Note, "id" | "createdAt" | "updatedAt">): Note {
  const notes = getNotes();
  const now = new Date().toISOString();
  const newNote: Note = {
    ...note,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  notes.unshift(newNote);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  return newNote;
}

export function updateNote(id: string, updates: Partial<Pick<Note, "title" | "content" | "scripture">>): Note | null {
  const notes = getNotes();
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return null;
  notes[index] = { ...notes[index], ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  return notes[index];
}

export function deleteNote(id: string): void {
  const notes = getNotes().filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function getNotesByCategory(category: string): Note[] {
  return getNotes().filter((n) => n.category === category);
}
