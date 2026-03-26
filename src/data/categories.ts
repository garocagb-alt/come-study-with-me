export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "ven-sigueme",
    name: "Ven, Sígueme",
    description: "Plan de estudio semanal de la Iglesia",
    icon: "📖",
    color: "#1e3a5f",
  },
  {
    id: "libro-de-mormon",
    name: "Libro de Mormón",
    description: "Otro testamento de Jesucristo",
    icon: "📘",
    color: "#1a5276",
  },
  {
    id: "biblia",
    name: "Biblia",
    description: "Antiguo y Nuevo Testamento",
    icon: "📕",
    color: "#7b241c",
  },
  {
    id: "dyc",
    name: "Doctrina y Convenios",
    description: "Revelaciones modernas",
    icon: "📗",
    color: "#1e8449",
  },
  {
    id: "perla-de-gran-precio",
    name: "Perla de Gran Precio",
    description: "Escrituras selectas",
    icon: "📙",
    color: "#b7950b",
  },
  {
    id: "conferencia-general",
    name: "Conferencia General",
    description: "Discursos de los líderes de la Iglesia",
    icon: "🎤",
    color: "#6c3483",
  },
];
