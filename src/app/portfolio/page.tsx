import { canonical } from "@/lib/seo";
import { Portfolio } from "@/components/portfolio";
export const metadata = {
  alternates: canonical("/portfolio"),
  title: "Portfólio",
  description:
    "Explore artes de matchday, atletas, campeonatos e anúncios esportivos criadas pela LS Design.",
};
export default function Page() {
  return (
    <main id="conteudo" className="section container inner-page">
      <p className="eyebrow">
        <span className="signature" /> LS DESIGN / PORTFÓLIO
      </p>
      <h1>
        VISUAL QUE
        <br />
        <span>MARCA O JOGO.</span>
      </h1>
      <p className="section-intro">
        Artes esportivas criadas pela LS Design. Explore a seleção e amplie cada
        projeto para ver todos os detalhes.
      </p>
      <Portfolio />
    </main>
  );
}
