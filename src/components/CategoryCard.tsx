"use client";

import type { Category } from "@/data/categories";

interface Props {
  category: Category;
  onClick: () => void;
}

export default function CategoryCard({ category, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-card rounded-2xl p-4 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow flex flex-col gap-2"
    >
      <span className="text-3xl">{category.icon}</span>
      <h3 className="font-semibold text-sm text-text leading-tight">
        {category.name}
      </h3>
      <p className="text-xs text-text-muted leading-snug">
        {category.description}
      </p>
    </button>
  );
}
