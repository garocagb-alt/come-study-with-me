"use client";

import { useState } from "react";
import { searchNotes, type Note } from "@/lib/notes";
import { getNotebooks } from "@/lib/notes";

interface Props {
  onBack: () => void;
}

export default function SearchView({ onBack }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Note[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim().length >= 2) {
      setResults(searchNotes(q));
      setSearched(true);
    } else {
      setResults([]);
      setSearched(false);
    }
  };

  const notebooks = getNotebooks();
  const getNotebookName = (id: string) => notebooks.find((n) => n.id === id)?.name ?? "Sin cuaderno";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white px-6 pt-12 pb-4">
        <button onClick={onBack} className="text-white/80 text-sm mb-3 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Inicio
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por título, referencia, tag..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 outline-none placeholder:text-white/50 text-sm"
            autoFocus
          />
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        {!searched ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-text-muted text-sm">Busca en todas tus notas por título, referencia o tag.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted">No se encontraron resultados para &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-text-muted">{results.length} resultado{results.length !== 1 ? "s" : ""}</p>
            {results.map((note) => (
              <div key={note.id} className="bg-card rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-primary-light mb-1">{getNotebookName(note.notebookId)}</p>
                <h3 className="font-semibold text-text">{note.title}</h3>
                {note.scripture && <p className="text-xs text-primary-light mt-0.5">📍 {note.scripture}</p>}
                <p className="text-sm text-text-muted mt-2 line-clamp-2">{note.content}</p>
                {note.tags.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {note.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
