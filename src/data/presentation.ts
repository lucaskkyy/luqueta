import type { Project } from "./projects";
/** Presentation-only viewport. Originals and the project configuration stay intact. */
export function presentationFor(project: Project) {
  return project.id === "estamos-classificados"
    ? { image: "/assets/projects/presentation/estamos-classificados.svg", width: 1440, height: 1800 }
    : { image: project.image, width: project.width, height: project.height };
}
