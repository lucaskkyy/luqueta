import Link from "next/link";
import Image from "next/image";
import { conceptProjects as projects } from "@/data/projects";
import { services, studioMedia } from "@/data/site";
import { Artwork } from "../artwork";
import { FadeInUp } from "../fade-in-up";
import { Arrow } from "../icons";
export function Editorials() {
  return (
    <>
      <section
        className="section editorial-section container"
        id="design-esportivo"
      >
        <FadeInUp className="editorial-copy">
          <p className="eyebrow">01 / DESIGN ESPORTIVO</p>
          <h2>
            CADA DETALHE
            <br />
            FAZ A DIFERENÇA<span className="blue-period">.</span>
          </h2>
          <p>
            Criações desenvolvidas para valorizar atletas, fortalecer a
            comunicação dos clubes e transformar momentos esportivos em peças
            visuais marcantes.
          </p>
          <Link className="text-link" href="#servicos">
            CONHECER OS SERVIÇOS <Arrow />
          </Link>
          <span className="editorial-endnote">
            FEITO PARA SER SENTIDO. CRIADO PARA SER VISTO.
          </span>
        </FadeInUp>
        <FadeInUp className="editorial-visual single-art" delay={120}>
          <div className="visual-coordinate">LS / VISUAL STUDIES — 001</div>
          <Artwork project={projects[0]} />
          <div className="visual-caption">A IMAGEM TAMBÉM JOGA.</div>
        </FadeInUp>
      </section>
      <section
        id="pacotes"
        className="section editorial-section editorial-reverse container"
      >
        <FadeInUp className="editorial-visual sequence-visual">
          <div className="sequence-art">
            <Artwork project={projects[3]} />
          </div>
          <div className="sequence-art">
            <Artwork project={projects[4]} />
          </div>
          <div className="sequence-art">
            <Artwork project={projects[5]} />
          </div>
          <span className="sequence-label">
            PRESENÇA. CONSISTÊNCIA. IDENTIDADE.
          </span>
        </FadeInUp>
        <FadeInUp className="editorial-copy" delay={100}>
          <p className="eyebrow">02 / PACOTES MENSAIS</p>
          <h2>
            SUA EQUIPE
            <br />
            SEMPRE EM
            <br />
            DESTAQUE<span className="blue-period">.</span>
          </h2>
          <p>
            Pacotes personalizados de design para clubes, atletas e organizações
            que buscam uma presença visual consistente e profissional.
          </p>
          <Link className="button secondary" href="/orcamento">
            SOLICITAR UM PACOTE <Arrow />
          </Link>
        </FadeInUp>
      </section>
      <section id="studio" className="creator-section">
        <div className="section container creator-grid">
          <FadeInUp className="creator-photo">
            {studioMedia.creatorImage ? (
              <Image
                src={studioMedia.creatorImage}
                alt={
                  studioMedia.creatorName
                    ? `Retrato de ${studioMedia.creatorName}, criador da LS Design`
                    : "Retrato do criador da LS Design"
                }
                fill
                sizes="(max-width: 700px) 90vw, 40vw"
                className="creator-image"
              />
            ) : (
              <div className="portrait-placeholder">
                <span className="portrait-corner">
                  LS / INDEPENDENT DESIGNER
                </span>
                <div className="portrait-monogram" aria-hidden="true">
                  LS
                </div>
                <span className="portrait-label">
                  ESPAÇO PARA RETRATO AUTORAL
                  <br />
                  <small>FOTOGRAFIA A SER ADICIONADA</small>
                </span>
              </div>
            )}
          </FadeInUp>
          <FadeInUp className="editorial-copy" delay={100}>
            <p className="eyebrow">03 / O CRIADOR</p>
            <h2>
              POR TRÁS DE
              <br />
              CADA PROJETO,
              <br />
              EXISTE PROPÓSITO<span className="blue-period">.</span>
            </h2>
            <p>
              A LS Design é resultado da paixão pelo design esportivo e da
              dedicação colocada em cada criação. Com mais de 750 projetos
              entregues, sigo construindo uma trajetória baseada em
              criatividade, identidade e cuidado com os detalhes.
            </p>
            <div className="creator-signature">
              <span className="signature" />
              <span>
                {studioMedia.creatorName ?? "UM ESTÚDIO. UM CRIADOR. UM OLHAR."}
              </span>
            </div>
          </FadeInUp>
        </div>
      </section>
      <section id="servicos" className="section container services">
        <FadeInUp>
          <div className="section-heading">
            <div>
              <p className="eyebrow">ESPECIALIDADES / LS DESIGN</p>
              <h2>
                SEU ESPORTE.
                <br />
                NOSSA LINGUAGEM.
              </h2>
            </div>
            <p className="section-intro">
              Da identidade da equipe à emoção de cada partida. Design pensado
              para o seu contexto.
            </p>
          </div>
        </FadeInUp>
        <div className="services-list">
          {services.map((service, index) => (
            <FadeInUp key={service}>
              <Link href="/orcamento" className="service">
                <span className="service-index">0{index + 1}</span>
                <h3>{service}</h3>
                <Arrow />
              </Link>
            </FadeInUp>
          ))}
        </div>
      </section>
    </>
  );
}
