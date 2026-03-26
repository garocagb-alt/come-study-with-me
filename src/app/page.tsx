"use client";

import { useState, useEffect } from "react";
import { studyPlans } from "@/data/categories";
import { getNotebooks, getNotes, type Notebook } from "@/lib/notes";
import NotebooksView from "@/components/NotebooksView";
import NotebookDetail from "@/components/NotebookDetail";
import StudyPlanView from "@/components/StudyPlanView";
import SearchView from "@/components/SearchView";

type View =
  | { type: "home" }
  | { type: "notebooks" }
  | { type: "notebook-detail"; notebook: Notebook }
  | { type: "study-plan"; planId: string }
  | { type: "search" };

export default function Home() {
  const [view, setView] = useState<View>({ type: "home" });
  const [notebookCount, setNotebookCount] = useState(0);
  const [noteCount, setNoteCount] = useState(0);

  const refresh = () => {
    setNotebookCount(getNotebooks().length);
    setNoteCount(getNotes().length);
  };

  useEffect(() => {
    refresh();
  }, [view]);

  if (view.type === "notebooks") {
    return (
      <NotebooksView
        onBack={() => setView({ type: "home" })}
        onSelectNotebook={(nb) => setView({ type: "notebook-detail", notebook: nb })}
      />
    );
  }

  if (view.type === "notebook-detail") {
    return (
      <NotebookDetail
        notebook={view.notebook}
        onBack={() => setView({ type: "notebooks" })}
      />
    );
  }

  if (view.type === "study-plan") {
    const plan = studyPlans.find((p) => p.id === view.planId)!;
    return <StudyPlanView plan={plan} onBack={() => setView({ type: "home" })} />;
  }

  if (view.type === "search") {
    return <SearchView onBack={() => setView({ type: "home" })} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white px-6 pt-12 pb-8">
        <h1 className="text-2xl font-bold">Come, Study with Me</h1>
        <p className="text-white/70 mt-1 text-sm">Tu compañero personal de estudio</p>
      </header>

      <main className="flex-1 px-4 py-6 space-y-5">
        {/* Search */}
        <button
          onClick={() => setView({ type: "search" })}
          className="w-full bg-card rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-3 text-text-muted"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm">Buscar en mis notas...</span>
        </button>

        {/* Notebooks */}
        <button
          onClick={() => setView({ type: "notebooks" })}
          className="w-full bg-card rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <div className="text-left">
              <h3 className="font-semibold text-text">Mis Cuadernos</h3>
              <p className="text-sm text-text-muted">
                {notebookCount} {notebookCount === 1 ? "cuaderno" : "cuadernos"} · {noteCount}{" "}
                {noteCount === 1 ? "nota" : "notas"}
              </p>
            </div>
          </div>
          <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Study Plans */}
        <div className="flex items-center gap-3 pt-1">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-text-muted uppercase tracking-wide">Planes de Estudio</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <div className="space-y-3">
          {studyPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setView({ type: "study-plan", planId: plan.id })}
              className="w-full bg-card rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: plan.color + "15" }}
              >
                {plan.icon}
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold text-text">{plan.name}</h3>
                <p className="text-sm text-text-muted">{plan.description}</p>
              </div>
              <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-text-muted">Come, Study with Me — v0.2</footer>
    </div>
  );
}
