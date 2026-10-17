import { FadeInUp } from "../fade-in-up";
const steps = [
  ["SUA IDEIA", "Entendemos a necessidade e o objetivo do projeto."],
  ["PLANEJAMENTO", "Definimos formato, detalhes e orçamento."],
  ["CRIAÇÃO", "Transformo a proposta em uma peça visual personalizada."],
  ["ENTREGA", "Finalizamos o projeto conforme as condições combinadas."],
];
export function Process() {
  return (
    <section className="process-section">
      <div className="section container">
        <FadeInUp>
          <p className="eyebrow">O PROCESSO / SEM COMPLICAÇÃO</p>
          <h2>
            DA IDEIA
            <br />
            AO IMPACTO<span className="blue-period">.</span>
          </h2>
        </FadeInUp>
        <div className="process-grid">
          {steps.map(([title, description], index) => (
            <FadeInUp key={title} delay={index * 90}>
              <article className="process-step">
                <span className="step-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
