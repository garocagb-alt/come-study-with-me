"use client";

import { useState, useEffect } from "react";
import type { Category } from "@/data/categories";
import { getNotesByCategory, saveNote, deleteNote, type Note } from "@/lib/notes";
import NoteEditor from "./NoteEditor";

interface Props {
  category: Category;
  onBack: () => void;
}

export default function StudyView({ category, onBack }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    setNotes(getNotesByCategory(category.id));
  }, [category.id, showEditor]);

  const handleSave = (data: { title: string; content: string; scripture?: string }) => {
    saveNote({ ...data, category: category.id });
    setShowEditor(false);
    setEditingNote(null);
    setNotes(getNotesByCategory(category.id));
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    setNotes(getNotesByCategory(category.id));
  };

  if (showEditor || editingNote) {
    return (
      <NoteEditor
        note={editingNote}
        categoryName={category.name}
        onSave={handleSave}
        onCancel={() => {
          setShowEditor(false);
          setEditingNote(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header
        className="text-white px-6 pt-12 pb-6"
        style={{ backgroundColor: category.color }}
      >
        <button onClick={onBack} className="text-white/80 text-sm mb-3 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Inicio
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h1 className="text-xl font-bold">{category.name}</h1>
            <p className="text-white/70 text-sm">{category.description}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">✨</p>
            <p className="text-text-muted">
              Aún no tienes notas en esta sección.
            </p>
            <p className="text-text-muted text-sm mt-1">
              Toca el botón + para crear tu primera nota.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-card rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <button
                    onClick={() => setEditingNote(note)}
                    className="text-left flex-1"
                  >
                    <h3 className="font-semibold text-text">{note.title}</h3>
                    {note.scripture && (
                      <p className="text-xs mt-1" style={{ color: category.color }}>
                        📍 {note.scripture}
                      </p>
                    )}
                    <p className="text-sm text-text-muted mt-2 line-clamp-3">
                      {note.content}
                    </p>
                    <p className="text-xs text-text-muted/60 mt-2">
                      {new Date(note.updatedAt).toLocaleDateString("es", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
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

      {/* FAB */}
      <button
        onClick={() => setShowEditor(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg text-white text-2xl flex items-center justify-center hover:scale-105 transition-transform"
        style={{ backgroundColor: category.color }}
      >
        +
      </button>
    </div>
  );
}
