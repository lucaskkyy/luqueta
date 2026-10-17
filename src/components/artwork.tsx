import { presentationFor } from "@/data/presentation";
import type { CSSProperties } from "react";
import { ProjectImage } from "./project-image";
import type { Project } from "@/data/projects";
export function Artwork({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const display = presentationFor(project);
  return (
    <div
      className={`artwork art-${project.color}${project.image ? " artwork-real" : ""}`}
      style={
        display.width && display.height
          ? ({
              aspectRatio: `${display.width} / ${display.height}`,
              "--image-ratio": display.width / display.height,
            } as CSSProperties)
          : undefined
      }
    >
      {project.image ? (
        <ProjectImage
          key={display.image}
          src={display.image!}
          alt={project.alt}
          priority={priority}
          width={display.width}
          height={display.height}
        />
      ) : (
        <div className="art-graphic" role="img" aria-label={project.alt}>
          <span className="art-brand">
            LS / SPORTS DESIGN <span>CONCEPT {project.id}</span>
          </span>
          <div className="orbit" />
          <div className="art-cross" aria-hidden="true">
            +
          </div>
          <strong aria-hidden="true">
            {project.word.split("\n").map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </strong>
          <span className="art-number">{project.id} — VISUAL EXPLORATION</span>
        </div>
      )}
      {project.placeholder && (
        <span className="placeholder-label">PLACEHOLDER / SUA ARTE AQUI</span>
      )}
    </div>
  );
}
