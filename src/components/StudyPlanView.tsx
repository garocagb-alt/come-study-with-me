"use client";

import { useState, useEffect } from "react";
import type { StudyPlan } from "@/data/categories";
import { getSessionsByPlan, saveSession, updateSession, deleteSession, type StudySession } from "@/lib/notes";

interface Props {
  plan: StudyPlan;
  onBack: () => void;
}

function getWeekLabel(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `Semana ${week} — ${now.toLocaleDateString("es", { month: "long", year: "numeric" })}`;
}

export default function StudyPlanView({ plan, onBack }: Props) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const [entries, setEntries] = useState<{ step: string; content: string; scripture?: string }[]>([]);

  const refresh = () => setSessions(getSessionsByPlan(plan.id));
  useEffect(() => { refresh(); }, [plan.id]);

  const startNew = () => {
    const emptyEntries = plan.steps.map((step) => ({ step, content: "", scripture: "" }));
    const session = saveSession({ planId: plan.id, weekLabel: getWeekLabel(), entries: emptyEntries });
    setActiveSession(session);
    setEntries(session.entries);
  };

  const openSession = (s: StudySession) => {
    setActiveSession(s);
    setEntries([...s.entries]);
  };

  const handleSave = () => {
    if (!activeSession) return;
    updateSession(activeSession.id, entries);
    setActiveSession(null);
    refresh();
  };

  const updateEntry = (index: number, field: "content" | "scripture", value: string) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    setEntries(updated);
  };

  // Active session editor
  if (activeSession) {
    const isColors = plan.id === "colors";
    return (
      <div className="flex flex-col min-h-screen">
        <header className="text-white px-6 pt-12 pb-4" style={{ backgroundColor: plan.color }}>
          <div className="flex justify-between items-center">
            <button onClick={() => setActiveSession(null)} className="text-white/80 text-sm">← Atrás</button>
            <span className="text-sm font-medium">{activeSession.weekLabel}</span>
            <button onClick={handleSave} className="bg-white/20 text-white font-semibold text-sm px-4 py-1.5 rounded-full">
              Guardar
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 space-y-4">
          {isColors && (
            <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-medium mb-1">¿Cómo usar este método?</p>
              <p>Lee un capítulo o pasaje. Luego anota aquí lo que encontraste para cada color/tema.</p>
            </div>
          )}

          {entries.map((entry, i) => (
            <div key={i} className="bg-card rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
              <h3 className="font-semibold text-sm" style={{ color: plan.color }}>
                {entry.step}
              </h3>
              {!isColors && (
                <input
                  type="text"
                  placeholder="Referencia (ej: Moroni 7:45)"
                  value={entry.scripture ?? ""}
                  onChange={(e) => updateEntry(i, "scripture", e.target.value)}
                  className="w-full text-xs text-primary-light bg-primary/5 rounded-lg px-3 py-1.5 outline-none placeholder:text-text-muted/40"
                />
              )}
              <textarea
                placeholder={
                  isColors
                    ? "¿Qué encontraste sobre este tema? Incluye la referencia..."
                    : plan.id === "weekly" && i === 6
                    ? "Revisa tus notas de la semana. ¿Qué patrones ves? ¿Qué aprendiste?"
                    : "Escribe aquí..."
                }
                value={entry.content}
                onChange={(e) => updateEntry(i, "content", e.target.value)}
                className="w-full min-h-[80px] text-sm text-text bg-transparent outline-none resize-none placeholder:text-text-muted/40 leading-relaxed"
              />
            </div>
          ))}
        </main>
      </div>
    );
  }

  // Sessions list
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-white px-6 pt-12 pb-6" style={{ backgroundColor: plan.color }}>
        <button onClick={onBack} className="text-white/80 text-sm mb-3 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Inicio
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{plan.icon}</span>
          <div>
            <h1 className="text-xl font-bold">{plan.name}</h1>
            <p className="text-white/70 text-sm">{plan.description}</p>
          </div>
        </div>
      </header>

      {/* How it works */}
      <div className="px-4 py-4">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-sm text-text mb-2">¿Cómo funciona?</h3>
          <ul className="space-y-1">
            {plan.steps.map((step, i) => (
              <li key={i} className="text-xs text-text-muted flex gap-2">
                <span className="font-medium" style={{ color: plan.color }}>{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main className="flex-1 px-4 pb-6">
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">🚀</p>
            <p className="text-text-muted">¡Empieza tu primer estudio!</p>
            <p className="text-text-muted text-sm mt-1">Toca el botón + para iniciar.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-text-muted">Mis sesiones</h3>
            {sessions.map((s) => {
              const filled = s.entries.filter((e) => e.content.trim()).length;
              return (
                <div key={s.id} className="bg-card rounded-xl shadow-sm border border-gray-100 flex items-center overflow-hidden">
                  <button onClick={() => openSession(s)} className="flex-1 p-4 text-left">
                    <h4 className="font-semibold text-sm text-text">{s.weekLabel}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: plan.color,
                            width: `${(filled / s.entries.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-text-muted">{filled}/{s.entries.length}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { deleteSession(s.id); refresh(); }}
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

      <button
        onClick={startNew}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg text-white text-2xl flex items-center justify-center hover:scale-105 transition-transform"
        style={{ backgroundColor: plan.color }}
      >
        +
      </button>
    </div>
  );
}
