import { presentationFor } from "@/data/presentation";
import Link from "next/link";
import { featuredHeroProjects } from "@/data/projects";
import { Artwork } from "../artwork";
import { Arrow } from "../icons";
import { FadeInUp } from "../fade-in-up";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid container">
        <FadeInUp className="hero-copy">
          <p className="eyebrow">
            <span className="signature" /> LS DESIGN — SPORTS CREATIVE STUDIO
          </p>
          <h1 id="hero-title">
            O JOGO
            <br />
            COMEÇA NO
            <br />
            VISUAL<span className="blue-period">.</span>
          </h1>
          <p className="hero-description">
            Design esportivo para atletas, clubes e equipes. Criatividade,
            identidade e impacto visual em cada projeto.
          </p>
          <div className="cta-row">
            <Link className="button primary" href="/portfolio">
              EXPLORAR PORTFÓLIO <Arrow />
            </Link>
            <Link className="button secondary" href="/orcamento">
              SOLICITAR ORÇAMENTO <Arrow />
            </Link>
          </div>
          <div className="hero-proof">
            <strong>
              750<span>+</span>
            </strong>
            <span>
              PROJETOS ENTREGUES.
              <br />
              UM OLHAR AUTORAL.
            </span>
          </div>
        </FadeInUp>
        <div
          className="hero-composition real-art-composition"
          aria-label="Seleção de seis artes esportivas da LS Design"
        >
          <div className="composition-guide guide-top" />
          <div className="composition-guide guide-bottom" />
          {featuredHeroProjects.map((project, index) => (
            <div
              className={`hero-art hero-art-${index + 1}`}
              key={project.id}
              style={{ aspectRatio: `${presentationFor(project).width} / ${presentationFor(project).height}` }}
            >
              <FadeInUp delay={150 + index * 130}>
                <Artwork project={project} priority={index === 0} />
              </FadeInUp>
            </div>
          ))}
          <span className="composition-caption">
            DIREÇÃO DE ARTE / LS DESIGN{" "}
            <span>
              SELEÇÃO 01—{String(featuredHeroProjects.length).padStart(2, "0")}
            </span>
          </span>
        </div>
      </div>
      <div className="hero-bottom container">
        <span>INDEPENDENT MIND. SPORTS SOUL.</span>
        <a href="#projetos">
          EXPLORE O VISUAL <span aria-hidden="true">↓</span>
        </a>
        <span>BRASIL / DESIGN SEM FRONTEIRAS</span>
      </div>
    </section>
  );
}
