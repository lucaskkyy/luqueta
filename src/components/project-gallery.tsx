"use client";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { Artwork } from "./artwork";
import { Arrow } from "./icons";
import { FadeInUp } from "./fade-in-up";
export function ProjectGallery({
  projects,
  editorial = false,
}: {
  projects: Project[];
  editorial?: boolean;
}) {
  const ProjectHeading = editorial ? "h3" : "h2";
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedIndex = projects.findIndex(
    (project) => project.id === selectedId,
  );
  const selected = projects[selectedIndex];
  const isOpen = Boolean(selected);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!isOpen || !dialog.current) return;
    const active = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const node = dialog.current;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
      active?.focus();
    };
  }, [isOpen]);
  function close() {
    setSelectedId(null);
  }
  function move(direction: number) {
    const next =
      projects[(selectedIndex + direction + projects.length) % projects.length];
    if (next) setSelectedId(next.id);
  }
  if (projects.length === 0)
    return (
      <div className="portfolio-empty" role="status">
        <h2>Nenhum projeto nesta seleção.</h2>
        <p>Escolha outra categoria para continuar explorando.</p>
      </div>
    );
  return (
    <>
      <div
        className={`project-grid ${editorial ? "editorial-grid" : "portfolio-grid"}`}
      >
        {projects.map((project, index) => (
          <FadeInUp
            key={project.id}
            className="project-entry"
            delay={(index % 3) * 90}
          >
            <article data-project-id={project.id}>
              <button
                className="project-open"
                onClick={() => setSelectedId(project.id)}
                aria-haspopup="dialog"
                aria-label={`Ampliar projeto: ${project.title}`}
              >
                <Artwork project={project} />
                <span className="project-overlay">
                  <span>VER COMPOSIÇÃO</span>
                  <Arrow />
                </span>
              </button>
              <div className="project-caption">
                <div>
                  <span className="project-index">
                    /{String(index + 1).padStart(2, "0")}
                  </span>
                  <ProjectHeading>{project.title}</ProjectHeading>
                </div>
                <span>{project.category}</span>
              </div>
            </article>
          </FadeInUp>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-title"
        aria-describedby="project-description"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (
            projects.length > 1 &&
            (event.key === "ArrowLeft" || event.key === "ArrowRight")
          ) {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {selected && (
          <div className="dialog-content">
            <button
              className="dialog-close"
              onClick={close}
              aria-label="Fechar projeto"
            >
              FECHAR <span aria-hidden="true">×</span>
            </button>
            <div className="dialog-art">
              <Artwork project={selected} />
            </div>
            <div
              className="dialog-caption"
              aria-live="polite"
              aria-atomic="true"
            >
              <h2 id="project-title">{selected.title}</h2>
              <p id="project-description">
                {selected.category}
                {selected.placeholder
                  ? " · Composição conceitual. Espaço reservado para uma arte real da LS Design."
                  : ""}
              </p>
            </div>
            {selected.image && (
              <a
                href={selected.image}
                target="_blank"
                rel="noopener noreferrer"
                className="original-art-link"
              >
                VER ARTE ORIGINAL <Arrow />
              </a>
            )}
            {projects.length > 1 && (
              <nav
                className="dialog-navigation"
                aria-label="Navegar pelos projetos desta seleção"
              >
                <button onClick={() => move(-1)} aria-label="Projeto anterior">
                  ← <span>ANTERIOR</span>
                </button>
                <span>
                  {selectedIndex + 1} / {projects.length}
                </span>
                <button onClick={() => move(1)} aria-label="Próximo projeto">
                  <span>PRÓXIMO</span> →
                </button>
              </nav>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
