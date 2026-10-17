import Link from "next/link";
import Image from "next/image";
import { instagram, studioMedia, whatsappUrl } from "@/data/site";
import { conceptProjects } from "@/data/projects";
import { Artwork } from "./artwork";
import { Arrow } from "./icons";
import { Brand } from "./brand";
import { FadeInUp } from "./fade-in-up";
import { FooterFilm } from "./footer-film";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-backdrop" aria-hidden="true">
        {studioMedia.footerVideo ? (
          <FooterFilm
            src={studioMedia.footerVideo}
            poster={studioMedia.footerImage}
          />
        ) : studioMedia.footerImage ? (
          <Image
            src={studioMedia.footerImage}
            alt=""
            fill
            sizes="100vw"
            className="footer-image"
          />
        ) : (
          <div className="footer-artwork">
            <Artwork project={conceptProjects[0]} />
            <Artwork project={conceptProjects[3]} />
          </div>
        )}
      </div>
      <div className="container footer-content">
        <FadeInUp className="footer-callout">
          <p className="eyebrow">
            <span className="signature" /> SEU PRÓXIMO CAPÍTULO COMEÇA AQUI
          </p>
          <h2>
            PRONTO PARA
            <br />
            ELEVAR O NÍVEL
            <br />
            DA SUA IMAGEM?
          </h2>
          <p>
            Vamos transformar sua próxima ideia em um projeto visual marcante.
          </p>
          <div className="cta-row">
            <Link className="button primary" href="/orcamento">
              VAMOS CRIAR <Arrow />
            </Link>
            <Link className="button secondary" href="/portfolio">
              EXPLORAR PORTFÓLIO <Arrow />
            </Link>
          </div>
        </FadeInUp>
        <div className="footer-links">
          <div className="footer-about">
            <Brand />
            <p>
              Estúdio criativo independente.
              <br />
              Design esportivo com identidade,
              <br />
              propósito e um olhar autoral.
            </p>
          </div>
          <div>
            <h3>NAVEGAÇÃO</h3>
            <Link href="/">Início</Link>
            <Link href="/portfolio">Portfólio</Link>
            <Link href="/#studio">Sobre</Link>
            <Link href="/#servicos">Serviços</Link>
          </div>
          <div>
            <h3>PROJETOS & SERVIÇOS</h3>
            <Link href="/#design-esportivo">Artes esportivas</Link>
            <Link href="/portfolio">Campeonatos</Link>
            <Link href="/#pacotes">Pacotes mensais</Link>
            <Link href="/orcamento">Projetos personalizados</Link>
          </div>
          <div>
            <h3>VAMOS CONVERSAR</h3>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              Instagram @flyer.ls <Arrow />
            </a>
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp <Arrow />
              </a>
            )}
            <Link href="/orcamento">
              Solicitar orçamento <Arrow />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} LS Design. Todos os direitos
            reservados.
          </span>
          <a href="#conteudo">VOLTAR AO TOPO ↑</a>
        </div>
      </div>
    </footer>
  );
}
