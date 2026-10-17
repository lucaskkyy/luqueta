import Link from "next/link";
import { featuredPortfolioProjects } from "@/data/projects";
import { FadeInUp } from "../fade-in-up";
import { ProjectGallery } from "../project-gallery";
import { Arrow } from "../icons";
export function FeaturedWork() {
  return (
    <section id="projetos" className="section container">
      <FadeInUp>
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="signature" /> PORTFÓLIO SELECIONADO
            </p>
            <h2>
              NOSSO TRABALHO.
              <br />
              <span className="muted">NOSSA IDENTIDADE.</span>
            </h2>
          </div>
          <p className="section-intro">
            Projetos criados para transformar ideias em experiências visuais
            marcantes.
          </p>
        </div>
      </FadeInUp>
      <ProjectGallery projects={featuredPortfolioProjects} editorial />
      <FadeInUp className="section-action">
        <Link className="button secondary" href="/portfolio">
          VER TODOS OS PROJETOS <Arrow />
        </Link>
      </FadeInUp>
    </section>
  );
}
