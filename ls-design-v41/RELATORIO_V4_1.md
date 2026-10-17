# LS Design V4.1 — Refatoração e revisão

Este pacote contém o projeto estático atualizado, sem build, o backup integral da V4, assets e prévias. Não houve deploy.

## Medições antes/depois

| Indicador | V4 | V4.1 | Resultado |
|---|---:|---:|---|
| HTML completo | 101.697 bytes | 92.093 bytes | −9.604 bytes (−9,4%) |
| CSS embutido | 44.582 caracteres | ~35.072 caracteres | −21,3% |
| Referências `#3189f8`, `#70b0ff`, `#050608` | presentes | 0 | removidas |
| Rolagem horizontal (320–1920 px) | 0 nos testes anteriores | 0 em 11 larguras | preservada |
| Sintaxe JavaScript | válida | válida | preservada |

**Atenção:** os valores de performance do Lighthouse (LCP/CLS/TBT) **não foram medidos**. Não há pontuação Lighthouse reivindicada.

## O que foi corrigido

- **CSS:** consolidação das declarações de seletores iguais por contexto, remoção de 17 regras sem uso e 12 regras antigas de posicionamento dos pôsteres, eliminação de 194 propriedades duplicadas durante o processo e redução de especificidade dependente da ordem da cascata. A base CSS ficou em um único bloco e os media queries foram agrupados.
- **Hero:** os seis quadros são posicionados por um conjunto de variáveis CSS em vez de larguras e rotações contraditórias. O card 3 mantém a proporção 9:16 e não recebe `top` e `bottom` simultâneos. Layout refeito para não encobrir arbitrariamente o conteúdo dos demais. As artes passam a aparecer mais cedo no celular; os dois CTAs se alinham em colunas em celulares usuais.
- **Scroll lock:** `unlockPage()` restaura `scrollY` com `scroll-behavior:auto` temporário antes de retornar ao comportamento da página; o salto de rolagem não apareceu no teste.
- **Cores:** tokens essenciais oficiais; substituídas as referências antigas. As cores específicas dos pôsteres CSS demonstrativos permanecem porque **não** são cores de identidade da interface.
- **Títulos:** marcadores `.blue` redundantes dos H2 removidos; assinatura em azul mantida no título principal e no CTA. Textos aprovados preservados.
- **Texto pequeno:** aumentados vários elementos reais da interface (filtros, navegação secundária, legendas, rodapé). Legendas dentro dos pôsteres **demonstrativos** continuam menores: representam texto integrante da arte, não componentes de UI.
- **Fontes:** removida a terceira família `Instrument Serif` da importação; a serifa decorativa permanece com fallback local. Barlow Condensed e DM Sans **ainda dependem do Google Fonts** — hospedagem local é uma etapa futura, não concluída.

## Testes executados

- Chromium automatizado com HTML carregado diretamente, em 11 larguras: 320, 360, 390, 430, 560, 768, 820, 1024, 1280, 1536 e 1920 px. Nenhum overflow horizontal ou erro JavaScript nesses cenários.
- Hero: seis pôsteres dentro da galeria **após a animação de entrada** em 360, 390, 430, 768 e 1536 px. Em 390×844, o pôster principal já aparece por inteiro na dobra testada, com as fontes de fallback.
- Portfólio: seis projetos iniciais, oito após “Ver mais”, botão oculto quando não há mais projetos e filtro “Matchday” exibindo dois.
- Lightbox: abertura, navegação com seta, fechamento com Escape e fundo inacessível por `inert` onde suportado.
- Menu mobile: abrir e fechar por Escape. Teste de scroll anterior e posterior ao fechamento: 1250 → 1250 → 1250 px (0, 0 e 350 ms).
- FAQ: componente nativo `<details>` abre e fecha.
- Orçamento: três campos obrigatórios identificados; preenchimento válido gera o briefing e a confirmação de cópia; não houve envio a terceiros.
- Com JavaScript desativado: seis peças da hero, seis projetos e cinco perguntas continuam no HTML.
- Sintaxe JavaScript e parsing CSS sem erros detectados.

## Limitações e pendências

1. **Fontes reais:** browser de teste não carregou fontes externas. As capturas renderizaram com fontes de fallback; não há medição válida de CLS da troca de fontes.
2. **Lighthouse:** não executado. Nenhuma nota de performance, acessibilidade ou SEO foi fabricada.
3. **Dispositivos reais:** Safari/iOS, Instagram WebView, Android/Firefox e leitores de tela não foram testados diretamente.
4. **Hero:** a composição foi verificada com pôsteres demonstrativos. Quando você inserir os flyers reais, será importante ajustar focalização, escalas e ordem, especialmente em 9:16.
5. **FAQ:** usa `<details>` nativo para manter comportamento robusto sem JavaScript. A expansão é instantânea: animação opcional e compatível entre navegadores permanece pendente.
6. **SEO social:** a imagem Open Graph está pronta, porém `og:image` e URL canônica precisarão usar um domínio absoluto após sua escolha.
7. **Conteúdo:** faltam flyers reais, foto/nome do criador, WhatsApp e domínio. Depoimentos e clientes não foram inventados.
8. **Analytics e publicação:** não instalados nem realizados.

## Próxima etapa recomendada

1. Aprovar a V4.1 no computador e celular (considerando que as fontes externas podem alterar a quebra da tipografia).
2. Inserir 4–6 artes reais representativas para fechar a hero e o portfólio.
3. Hospedar Barlow/DM Sans localmente com arquivos licenciados e testar CLS/primeira visita.
4. Medir Lighthouse via HTTPS, testar WebView do Instagram e validar navegação acessível antes do lançamento.

## Arquivos

- `index.html` — site atualizado pronto para testes locais.
- `index_original_V4.html` — backup intocado.
- `assets/` — favicon, arte OG, ícone mobile e preparação para projetos.
- `qa_interactions.json` — resultados resumidos dos testes de interação automatizados.
- `preview_1536.png`, `preview_390.png` — capturas em fonte de fallback.
- `manifest.webmanifest`, `robots.txt`, `sitemap.template.xml` — preparação do site estático.
