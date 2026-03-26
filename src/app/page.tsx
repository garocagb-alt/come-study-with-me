"use client";

import { useState, useEffect } from "react";
import { categories } from "@/data/categories";
import { getNotes, type Note } from "@/lib/notes";
import CategoryCard from "@/components/CategoryCard";
import StudyView from "@/components/StudyView";
import MyNotesView from "@/components/MyNotesView";

type View = "home" | "study" | "my-notes";

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    setNoteCount(getNotes().length);
  }, [view]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setView("study");
  };

  if (view === "study" && selectedCategory) {
    const cat = categories.find((c) => c.id === selectedCategory)!;
    return (
      <StudyView
        category={cat}
        onBack={() => {
          setView("home");
          setSelectedCategory(null);
        }}
      />
    );
  }

  if (view === "my-notes") {
    return <MyNotesView onBack={() => setView("home")} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white px-6 pt-12 pb-8">
        <h1 className="text-2xl font-bold">Come, Study with Me</h1>
        <p className="text-white/70 mt-1 text-sm">
          Tu compañero personal de estudio
        </p>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 space-y-4">
        {/* My Study button */}
        <button
          onClick={() => setView("my-notes")}
          className="w-full bg-card rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <div className="text-left">
              <h3 className="font-semibold text-text">Mi Estudio</h3>
              <p className="text-sm text-text-muted">
                {noteCount} {noteCount === 1 ? "nota" : "notas"} guardadas
              </p>
            </div>
          </div>
          <svg
            className="w-5 h-5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-text-muted uppercase tracking-wide">
            Planes de Estudio
          </span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => handleCategoryClick(cat.id)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-text-muted">
        Come, Study with Me — v0.1
      </footer>
    </div>
  );
}
