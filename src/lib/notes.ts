// --- Notes (for notebooks) ---
export interface Note {
  id: string;
  notebookId: string;
  title: string;
  content: string;
  scripture?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const NOTES_KEY = "cswm_notes";

export function getNotes(): Note[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(NOTES_KEY);
  return data ? JSON.parse(data) : [];
}

export function getNotesByNotebook(notebookId: string): Note[] {
  return getNotes().filter((n) => n.notebookId === notebookId);
}

export function saveNote(note: Omit<Note, "id" | "createdAt" | "updatedAt">): Note {
  const notes = getNotes();
  const now = new Date().toISOString();
  const newNote: Note = { ...note, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  notes.unshift(newNote);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return newNote;
}

export function updateNote(id: string, updates: Partial<Pick<Note, "title" | "content" | "scripture" | "tags">>): void {
  const notes = getNotes();
  const i = notes.findIndex((n) => n.id === id);
  if (i === -1) return;
  notes[i] = { ...notes[i], ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function deleteNote(id: string): void {
  localStorage.setItem(NOTES_KEY, JSON.stringify(getNotes().filter((n) => n.id !== id)));
}

export function searchNotes(query: string): Note[] {
  const q = query.toLowerCase();
  return getNotes().filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.scripture?.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
  );
}

// --- Notebooks ---
export interface Notebook {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
}

const NOTEBOOKS_KEY = "cswm_notebooks";

export function getNotebooks(): Notebook[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(NOTEBOOKS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveNotebook(nb: Omit<Notebook, "id" | "createdAt">): Notebook {
  const notebooks = getNotebooks();
  const newNb: Notebook = { ...nb, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  notebooks.unshift(newNb);
  localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks));
  return newNb;
}

export function deleteNotebook(id: string): void {
  localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(getNotebooks().filter((n) => n.id !== id)));
  // Also delete notes in this notebook
  localStorage.setItem(NOTES_KEY, JSON.stringify(getNotes().filter((n) => n.notebookId !== id)));
}

// --- Study Plan Sessions ---
export interface StudySession {
  id: string;
  planId: string;
  weekLabel: string;
  entries: { step: string; content: string; scripture?: string }[];
  createdAt: string;
  updatedAt: string;
}

const SESSIONS_KEY = "cswm_sessions";

export function getSessions(): StudySession[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(SESSIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getSessionsByPlan(planId: string): StudySession[] {
  return getSessions().filter((s) => s.planId === planId);
}

export function saveSession(session: Omit<StudySession, "id" | "createdAt" | "updatedAt">): StudySession {
  const sessions = getSessions();
  const now = new Date().toISOString();
  const newSession: StudySession = { ...session, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  sessions.unshift(newSession);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  return newSession;
}

export function updateSession(id: string, entries: StudySession["entries"]): void {
  const sessions = getSessions();
  const i = sessions.findIndex((s) => s.id === id);
  if (i === -1) return;
  sessions[i] = { ...sessions[i], entries, updatedAt: new Date().toISOString() };
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function deleteSession(id: string): void {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(getSessions().filter((s) => s.id !== id)));
}
