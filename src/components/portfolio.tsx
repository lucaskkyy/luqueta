"use client";
import { useState } from "react";
import { projects, portfolioCategories, type Category } from "@/data/projects";
import { ProjectGallery } from "./project-gallery";
export function Portfolio() {
  const [category, setCategory] = useState<Category | "Todos">("Todos");
  const filtered = projects.filter(
    (project) => category === "Todos" || project.category === category,
  );
  return (
    <>
      <div className="filters" aria-label="Filtrar projetos">
        {(["Todos", ...portfolioCategories] as const).map((item) => (
          <button
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filtered.length} projetos exibidos
      </p>
      <ProjectGallery projects={filtered} />
    </>
  );
}
