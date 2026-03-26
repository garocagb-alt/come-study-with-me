"use client";

import { useState } from "react";
import { updateNote, type Note } from "@/lib/notes";

interface Props {
  note: Note | null;
  categoryName: string;
  onSave: (data: { title: string; content: string; scripture?: string }) => void;
  onCancel: () => void;
}

export default function NoteEditor({ note, categoryName, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [scripture, setScripture] = useState(note?.scripture ?? "");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    if (note) {
      updateNote(note.id, { title, content, scripture: scripture || undefined });
      onCancel();
    } else {
      onSave({ title, content, scripture: scripture || undefined });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white px-6 pt-12 pb-4">
        <div className="flex justify-between items-center">
          <button onClick={onCancel} className="text-white/80 text-sm">
            Cancelar
          </button>
          <span className="text-sm font-medium">{categoryName}</span>
          <button
            onClick={handleSubmit}
            className="bg-accent text-primary font-semibold text-sm px-4 py-1.5 rounded-full"
          >
            {note ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 px-4 py-6 space-y-4">
        <input
          type="text"
          placeholder="Título de tu nota..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl font-bold text-text bg-transparent outline-none placeholder:text-text-muted/40"
        />

        <input
          type="text"
          placeholder="Referencia (ej: Alma 32:21)"
          value={scripture}
          onChange={(e) => setScripture(e.target.value)}
          className="w-full text-sm text-primary-light bg-primary/5 rounded-lg px-3 py-2 outline-none placeholder:text-text-muted/40"
        />

        <textarea
          placeholder="Escribe tus impresiones, ideas, lo que sientes al estudiar..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full flex-1 min-h-[300px] text-text bg-transparent outline-none resize-none placeholder:text-text-muted/40 leading-relaxed"
        />
      </main>
    </div>
  );
}
