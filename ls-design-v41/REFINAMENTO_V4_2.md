# LS Design V4.2 — revisão visual local

Hero ampliada com prioridade para Estamos classificados, sobreposição discreta e composição própria para celular. Portfólio em colunas editoriais contínuas com escalas variadas, mantendo ordem DOM, filtros e lightbox. Hover de 1,2% aplicado ao botão completo, sem cortar as bordas das imagens. Movimento inicial de profundidade de apenas 3px no desktop, sem loop contínuo; desativado no celular e em reduced-motion.

## Apresentação da arte principal
`assets/projects/presentation/estamos-classificados.svg` é um arquivo de apresentação independente. Seu viewport é x=0,y=380,width=1440,height=1800 sobre a fonte 1440x2560. Embute os bytes JPEG originais, sem redesenho ou recompressão, e exclui somente as faixas cinzentas externas. Jogadores, títulos, escudos e assinatura permanecem visíveis.

Todos os sete arquivos originais continuam intactos. A configuração original de projetos e suas dimensões não foi substituída: um mapeamento separado controla somente a apresentação. O link VER ARTE ORIGINAL do Next.js continua abrindo a fonte completa.

## Exports pendentes
- Dia de MJ: fundo roxo e crédito de publicação se aproximam da logo; preservar até receber export original sem a moldura de story.
- Contratado: fundo, cantos arredondados e crédito externo tornam o limite delicado; é necessário export original para remover essa apresentação sem perder informações.
- Confirmados Supercopa Juvenas: manter a publicação completa, incluindo crédito e elementos junto à borda; solicitar export original da arte.
- Magnus x Caieiras, Juvenas vs Twister e Bonny x Bases: preservados completos, pois não apresentam faixas externas inequivocamente separadas de todos os elementos do design.

Logo, textos, CONFIG, navegação, orçamento e FAQ preservados. Revisão feita nas edições Next.js e HTML. Nenhuma publicação ou envio desta V4.2 ao GitHub nesta etapa.
