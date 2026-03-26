"use client";

import { useState, useEffect } from "react";
import { getNotesByNotebook, saveNote, deleteNote, updateNote, type Note, type Notebook } from "@/lib/notes";

interface Props {
  notebook: Notebook;
  onBack: () => void;
}

export default function NotebookDetail({ notebook, onBack }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editing, setEditing] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scripture, setScripture] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const refresh = () => setNotes(getNotesByNotebook(notebook.id));
  useEffect(() => { refresh(); }, [notebook.id]);

  const openEditor = (note?: Note) => {
    if (note) {
      setEditing(note);
      setTitle(note.title);
      setContent(note.content);
      setScripture(note.scripture ?? "");
      setTagsInput(note.tags.join(", "));
    } else {
      setEditing(null);
      setTitle("");
      setContent("");
      setScripture("");
      setTagsInput("");
    }
    setShowEditor(true);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    if (editing) {
      updateNote(editing.id, { title, content, scripture: scripture || undefined, tags });
    } else {
      saveNote({ notebookId: notebook.id, title, content, scripture: scripture || undefined, tags });
    }
    setShowEditor(false);
    refresh();
  };

  if (showEditor) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-white px-6 pt-12 pb-4">
          <div className="flex justify-between items-center">
            <button onClick={() => setShowEditor(false)} className="text-white/80 text-sm">Cancelar</button>
            <span className="text-sm font-medium">{notebook.icon} {notebook.name}</span>
            <button onClick={handleSave} className="bg-accent text-primary font-semibold text-sm px-4 py-1.5 rounded-full">
              {editing ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 space-y-4">
          <input
            type="text"
            placeholder="Título de tu nota..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xl font-bold text-text bg-transparent outline-none placeholder:text-text-muted/40"
            autoFocus
          />
          <input
            type="text"
            placeholder="Referencia (ej: Alma 32:21)"
            value={scripture}
            onChange={(e) => setScripture(e.target.value)}
            className="w-full text-sm text-primary-light bg-primary/5 rounded-lg px-3 py-2 outline-none placeholder:text-text-muted/40"
          />
          <textarea
            placeholder="Escribe tus impresiones..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[250px] text-text bg-transparent outline-none resize-none placeholder:text-text-muted/40 leading-relaxed"
          />
          <input
            type="text"
            placeholder="Tags (ej: fe, oración, arrepentimiento)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full text-sm text-text-muted bg-gray-50 rounded-lg px-3 py-2 outline-none placeholder:text-text-muted/40"
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white px-6 pt-12 pb-6">
        <button onClick={onBack} className="text-white/80 text-sm mb-3 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Cuadernos
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{notebook.icon}</span>
          <h1 className="text-xl font-bold">{notebook.name}</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">✨</p>
            <p className="text-text-muted">Cuaderno vacío.</p>
            <p className="text-text-muted text-sm mt-1">Toca + para agregar tu primera nota.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-card rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <button onClick={() => openEditor(note)} className="text-left flex-1">
                    <h3 className="font-semibold text-text">{note.title}</h3>
                    {note.scripture && (
                      <p className="text-xs text-primary-light mt-0.5">📍 {note.scripture}</p>
                    )}
                    <p className="text-sm text-text-muted mt-2 line-clamp-3">{note.content}</p>
                    {note.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {note.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-text-muted/60 mt-2">
                      {new Date(note.updatedAt).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </button>
                  <button
                    onClick={() => { deleteNote(note.id); refresh(); }}
                    className="text-text-muted/40 hover:text-red-400 p-1 ml-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => openEditor()}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg text-white text-2xl flex items-center justify-center bg-primary hover:scale-105 transition-transform"
      >
        +
      </button>
    </div>
  );
}
