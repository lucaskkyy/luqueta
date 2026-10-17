const specialties = [
  "MATCHDAY",
  "RESULTADOS",
  "CAMPEONATOS",
  "IDENTIDADE ESPORTIVA",
  "DESIGN PARA ATLETAS",
  "PACOTES MENSAIS",
];
export function Marquee() {
  return (
    <section className="marquee" aria-label="Especialidades da LS Design">
      <p className="sr-only">{specialties.join(", ")}</p>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {specialties.map((text) => (
              <span className="marquee-item" key={text}>
                {text}
                <span className="marquee-symbol">+</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
