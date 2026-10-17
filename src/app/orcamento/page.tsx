import { canonical } from "@/lib/seo";
import { Briefing } from "@/components/briefing";
export const metadata = {
  alternates: canonical("/orcamento"),
  title: "Solicitar orçamento",
  description:
    "Conte sua ideia e prepare um briefing para a LS Design. Projetos esportivos personalizados e pacotes mensais.",
};
export default function Page() {
  return (
    <main id="conteudo" className="section container inner-page contact-page">
      <div>
        <p className="eyebrow">
          <span className="signature" /> VAMOS CRIAR ALGO SEU
        </p>
        <h1>
          SEU PROJETO.
          <br />
          <span>OUTRO NÍVEL.</span>
        </h1>
        <p className="section-intro">
          Conte sua ideia, o que você precisa e quando quer entrar em campo.
          Esse é o primeiro passo para construir seu próximo visual.
        </p>
      </div>
      <Briefing />
    </main>
  );
}
