"use client";

import { useState, useEffect } from "react";
import { getNotes, deleteNote, type Note } from "@/lib/notes";
import { categories } from "@/data/categories";

interface Props {
  onBack: () => void;
}

export default function MyNotesView({ onBack }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const filtered = filter === "all" ? notes : notes.filter((n) => n.category === filter);

  const getCategoryInfo = (id: string) =>
    categories.find((c) => c.id === id) ?? { name: id, icon: "📄", color: "#666" };

  const handleDelete = (id: string) => {
    deleteNote(id);
    setNotes(getNotes());
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white px-6 pt-12 pb-6">
        <button onClick={onBack} className="text-white/80 text-sm mb-3 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Inicio
        </button>
        <h1 className="text-xl font-bold">📝 Mi Estudio</h1>
        <p className="text-white/70 text-sm">Todas tus notas e impresiones</p>
      </header>

      {/* Filters */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
            filter === "all"
              ? "bg-primary text-white"
              : "bg-gray-100 text-text-muted"
          }`}
        >
          Todas ({notes.length})
        </button>
        {categories.map((cat) => {
          const count = notes.filter((n) => n.category === cat.id).length;
          if (count === 0) return null;
          return (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                filter === cat.id
                  ? "text-white"
                  : "bg-gray-100 text-text-muted"
              }`}
              style={filter === cat.id ? { backgroundColor: cat.color } : {}}
            >
              {cat.icon} {count}
            </button>
          );
        })}
      </div>

      {/* Notes */}
      <main className="flex-1 px-4 py-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📚</p>
            <p className="text-text-muted">No hay notas aún.</p>
            <p className="text-text-muted text-sm mt-1">
              Selecciona un plan de estudio y empieza a anotar.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((note) => {
              const cat = getCategoryInfo(note.category);
              return (
                <div
                  key={note.id}
                  className="bg-card rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: cat.color }}
                        >
                          {cat.icon} {cat.name}
                        </span>
                      </div>
                      <h3 className="font-semibold text-text">{note.title}</h3>
                      {note.scripture && (
                        <p className="text-xs text-primary-light mt-0.5">
                          📍 {note.scripture}
                        </p>
                      )}
                      <p className="text-sm text-text-muted mt-2 line-clamp-2">
                        {note.content}
                      </p>
                      <p className="text-xs text-text-muted/60 mt-2">
                        {new Date(note.updatedAt).toLocaleDateString("es", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
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
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
