import { Plus } from "../icons";
import { FadeInUp } from "../fade-in-up";
const questions = [
  [
    "Como posso solicitar um orçamento?",
    "Acesse a página de orçamento e conte sobre seu projeto. Você poderá preparar uma mensagem para o WhatsApp, quando configurado, ou copiar o briefing e entrar em contato pelo Instagram @flyer.ls.",
  ],
  [
    "A LS Design trabalha com pacotes mensais?",
    "Sim. Os pacotes são personalizados conforme a necessidade de cada clube, atleta ou organização. O escopo e as condições são definidos no orçamento.",
  ],
  [
    "Quais tipos de artes esportivas posso contratar?",
    "Artes de matchday, resultados, campeonatos, identidade esportiva, conteúdo para atletas e projetos personalizados. Conte sua ideia para avaliarmos o formato adequado.",
  ],
  [
    "Como funciona o prazo de entrega?",
    "Os prazos são definidos conforme a necessidade e o escopo de cada projeto, considerando a disponibilidade e as condições combinadas antes do início.",
  ],
  [
    "Posso solicitar um projeto personalizado?",
    "Sim. Compartilhe sua proposta, referências e objetivos pelo formulário de orçamento para conversarmos sobre as possibilidades.",
  ],
];
export function FAQ() {
  return (
    <section id="faq" className="section faq-section container">
      <FadeInUp>
        <p className="eyebrow">PERGUNTAS FREQUENTES</p>
        <h2>
          DÚVIDAS?
          <br />
          VAMOS RESOLVER<span className="blue-period">.</span>
        </h2>
      </FadeInUp>
      <FadeInUp>
        <div className="faq-list">
          {questions.map(([question, answer], index) => (
            <details className="faq-item" key={question} name="ls-faq">
              <summary
                id={`faq-question-${index}`}
                aria-controls={`faq-answer-${index}`}
              >
                <h3>{question}</h3>
                <Plus />
              </summary>
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div>
                  <p>{answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}
