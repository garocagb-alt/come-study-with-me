"use client";

import { useState, useEffect } from "react";
import { getNotebooks, saveNotebook, deleteNotebook, getNotesByNotebook, type Notebook } from "@/lib/notes";
import { notebookIcons } from "@/data/categories";

interface Props {
  onBack: () => void;
  onSelectNotebook: (nb: Notebook) => void;
}

export default function NotebooksView({ onBack, onSelectNotebook }: Props) {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("📘");

  const refresh = () => setNotebooks(getNotebooks());
  useEffect(() => { refresh(); }, []);

  const handleCreate = () => {
    if (!newName.trim()) return;
    saveNotebook({ name: newName.trim(), icon: selectedIcon, color: "#1e3a5f" });
    setNewName("");
    setSelectedIcon("📘");
    setShowCreate(false);
    refresh();
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
        <h1 className="text-xl font-bold">📝 Mis Cuadernos</h1>
        <p className="text-white/70 text-sm">Organiza tu estudio por temas</p>
      </header>

      <main className="flex-1 px-4 py-6">
        {/* Create notebook form */}
        {showCreate ? (
          <div className="bg-card rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 space-y-3">
            <input
              type="text"
              placeholder="Nombre del cuaderno..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full text-lg font-semibold text-text bg-transparent outline-none placeholder:text-text-muted/40"
              autoFocus
            />
            <div className="flex gap-2 flex-wrap">
              {notebookIcons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setSelectedIcon(icon)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                    selectedIcon === icon ? "bg-primary/10 ring-2 ring-primary" : "bg-gray-50"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 py-2 rounded-xl text-sm text-text-muted bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 py-2 rounded-xl text-sm text-white bg-primary font-medium"
              >
                Crear
              </button>
            </div>
          </div>
        ) : null}

        {/* Notebooks list */}
        {notebooks.length === 0 && !showCreate ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📚</p>
            <p className="text-text-muted">Aún no tienes cuadernos.</p>
            <p className="text-text-muted text-sm mt-1">Crea uno para empezar a organizar tus notas.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notebooks.map((nb) => {
              const noteCount = getNotesByNotebook(nb.id).length;
              return (
                <div key={nb.id} className="bg-card rounded-2xl shadow-sm border border-gray-100 flex items-center overflow-hidden">
                  <button
                    onClick={() => onSelectNotebook(nb)}
                    className="flex-1 p-4 flex items-center gap-3 text-left"
                  >
                    <span className="text-2xl">{nb.icon}</span>
                    <div>
                      <h3 className="font-semibold text-text">{nb.name}</h3>
                      <p className="text-xs text-text-muted">
                        {noteCount} {noteCount === 1 ? "nota" : "notas"}
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => { deleteNotebook(nb.id); refresh(); }}
                    className="px-4 text-text-muted/40 hover:text-red-400"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FAB */}
      {!showCreate && (
        <button
          onClick={() => setShowCreate(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg text-white text-2xl flex items-center justify-center bg-primary hover:scale-105 transition-transform"
        >
          +
        </button>
      )}
    </div>
  );
}
