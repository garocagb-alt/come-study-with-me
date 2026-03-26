export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  steps: string[];
}

export const studyPlans: StudyPlan[] = [
  {
    id: "soap",
    name: "Método SOAP",
    description: "Escritura, Observación, Aplicación y Oración",
    icon: "📖",
    color: "#1e3a5f",
    steps: [
      "Escritura — ¿Qué versículo te impactó?",
      "Observación — ¿Qué notas? Contexto, palabras clave, quién habla",
      "Aplicación — ¿Cómo aplica esto a tu vida hoy?",
      "Oración — Escribe una oración basada en lo que aprendiste",
    ],
  },
  {
    id: "weekly",
    name: "Estudio Semanal",
    description: "Estudia cada día y haz un recap el domingo",
    icon: "📅",
    color: "#6c3483",
    steps: [
      "Lunes — Impresión del día",
      "Martes — Impresión del día",
      "Miércoles — Impresión del día",
      "Jueves — Impresión del día",
      "Viernes — Impresión del día",
      "Sábado — Impresión del día",
      "Domingo — Recap: ¿Qué aprendí esta semana?",
    ],
  },
  {
    id: "colors",
    name: "Marcado por Colores",
    description: "Asigna colores a temas y marca lo que encuentres",
    icon: "🎨",
    color: "#b7950b",
    steps: [
      "🔴 Expiación y sacrificio de Cristo",
      "🔵 Mandamientos y convenios",
      "🟢 Promesas y bendiciones",
      "🟡 Doctrina y principios",
      "🟣 Profecías",
      "🩷 Atributos de Cristo",
    ],
  },
];

export const notebookIcons = ["📘", "📕", "📗", "📙", "📓", "📔", "✝️", "⛪", "🙏", "💡", "🌟", "❤️"];
