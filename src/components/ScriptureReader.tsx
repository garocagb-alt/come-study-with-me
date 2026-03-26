"use client";

import { useState, useEffect } from "react";
import type { Chapter } from "@/data/scriptures";
import { highlightColors } from "@/data/scriptures";
import {
  getHighlights,
  setHighlight,
  removeHighlight,
  getNotesForVerse,
  addVerseNote,
  deleteVerseNote,
  type VerseNote,
} from "@/lib/highlights";

interface Props {
  chapter: Chapter;
  onBack: () => void;
}

export default function ScriptureReader({ chapter, onBack }: Props) {
  const [highlights, setHighlights] = useState<Record<string, string>>({});
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [verseNotes, setVerseNotes] = useState<VerseNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    setHighlights(getHighlights());
  }, []);

  const verseKey = (v: number) =>
    `${chapter.bookShort.replace(/[.\s]/g, "-").toLowerCase()}-${chapter.chapter}-${v}`;

  const handleVerseTap = (verseNum: number) => {
    const key = verseKey(verseNum);
    if (selectedVerse === verseNum) {
      setSelectedVerse(null);
      setShowColorPicker(false);
    } else {
      setSelectedVerse(verseNum);
      setVerseNotes(getNotesForVerse(key));
      setShowColorPicker(false);
      setNewNote("");
    }
  };

  const handleHighlight = (colorId: string) => {
    if (selectedVerse === null) return;
    const key = verseKey(selectedVerse);
    const current = highlights[key];
    if (current === colorId) {
      removeHighlight(key);
      const updated = { ...highlights };
      delete updated[key];
      setHighlights(updated);
    } else {
      setHighlight(key, colorId);
      setHighlights({ ...highlights, [key]: colorId });
    }
    setShowColorPicker(false);
  };

  const handleAddNote = () => {
    if (!newNote.trim() || selectedVerse === null) return;
    const key = verseKey(selectedVerse);
    addVerseNote(key, newNote.trim());
    setVerseNotes(getNotesForVerse(key));
    setNewNote("");
  };

  const handleDeleteNote = (id: string) => {
    if (selectedVerse === null) return;
    deleteVerseNote(id);
    setVerseNotes(getNotesForVerse(verseKey(selectedVerse)));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white px-6 pt-12 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-white/80 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Atrás
          </button>
          <h1 className="font-bold">
            {chapter.book} {chapter.chapter}
          </h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Color legend */}
      <div className="px-4 py-2 flex gap-1.5 overflow-x-auto bg-gray-50 border-b border-gray-100">
        {highlightColors.map((c) => (
          <span key={c.id} className="flex items-center gap-1 text-xs whitespace-nowrap px-2 py-1 rounded-full" style={{ backgroundColor: c.bg, color: c.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
            {c.label}
          </span>
        ))}
      </div>

      {/* Verses */}
      <main className="flex-1 px-5 py-6">
        <div className="space-y-1 leading-relaxed">
          {chapter.verses.map((verse) => {
            const key = verseKey(verse.number);
            const hColor = highlights[key];
            const colorInfo = hColor ? highlightColors.find((c) => c.id === hColor) : null;
            const isSelected = selectedVerse === verse.number;
            const hasNotes = getNotesForVerse(key).length > 0;

            return (
              <span key={verse.number}>
                <span
                  onClick={() => handleVerseTap(verse.number)}
                  className={`cursor-pointer inline rounded-sm transition-colors ${
                    isSelected ? "ring-2 ring-primary/30" : ""
                  }`}
                  style={
                    colorInfo
                      ? { backgroundColor: colorInfo.bg }
                      : {}
                  }
                >
                  <span className="text-xs font-bold text-primary/50 mr-1">{verse.number}</span>
                  <span className="text-text text-[15px]">{verse.text}</span>
                  {hasNotes && <span className="text-xs ml-0.5">📝</span>}
                </span>{" "}
              </span>
            );
          })}
        </div>
      </main>

      {/* Bottom panel for selected verse */}
      {selectedVerse !== null && (
        <div className="sticky bottom-0 bg-card border-t border-gray-200 shadow-lg rounded-t-2xl max-h-[60vh] overflow-y-auto">
          <div className="px-5 py-4 space-y-3">
            {/* Verse reference */}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-primary">
                {chapter.book} {chapter.chapter}:{selectedVerse}
              </h3>
              <button
                onClick={() => { setSelectedVerse(null); setShowColorPicker(false); }}
                className="text-text-muted text-xs"
              >
                Cerrar ✕
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex items-center gap-1.5 text-xs bg-gray-100 px-3 py-2 rounded-lg"
              >
                🎨 Resaltar
              </button>
            </div>

            {/* Color picker */}
            {showColorPicker && (
              <div className="flex gap-2 flex-wrap">
                {highlightColors.map((c) => {
                  const isActive = highlights[verseKey(selectedVerse)] === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleHighlight(c.id)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border-2 transition-all ${
                        isActive ? "border-current" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.bg, color: c.color }}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.label}
                      {isActive && " ✓"}
                    </button>
                  );
                })}
                {highlights[verseKey(selectedVerse)] && (
                  <button
                    onClick={() => {
                      const key = verseKey(selectedVerse);
                      removeHighlight(key);
                      const updated = { ...highlights };
                      delete updated[key];
                      setHighlights(updated);
                      setShowColorPicker(false);
                    }}
                    className="text-xs px-3 py-2 rounded-lg bg-gray-100 text-text-muted"
                  >
                    Quitar color
                  </button>
                )}
              </div>
            )}

            {/* Notes for this verse */}
            {verseNotes.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-text-muted">Mis notas:</p>
                {verseNotes.map((n) => (
                  <div key={n.id} className="bg-gray-50 rounded-lg p-3 flex justify-between items-start">
                    <div>
                      <p className="text-sm text-text">{n.content}</p>
                      <p className="text-xs text-text-muted/60 mt-1">
                        {new Date(n.createdAt).toLocaleDateString("es", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                    <button onClick={() => handleDeleteNote(n.id)} className="text-text-muted/40 hover:text-red-400 ml-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add note */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe una impresión..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                className="flex-1 text-sm bg-gray-50 rounded-lg px-3 py-2.5 outline-none placeholder:text-text-muted/40"
              />
              <button
                onClick={handleAddNote}
                className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium"
              >
                Anotar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
