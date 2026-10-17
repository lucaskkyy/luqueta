# LS Design — integração das artes reais

Foram integrados os sete arquivos recebidos no RAR, sem recorte, retoque, alteração de cores ou de pixels. As cópias em `assets/projects/` mantêm os bytes dos originais. Nomes descritivos foram utilizados nos caminhos.

## Seleção e dimensões

| Título | Categoria | Dimensões originais | Hero |
|---|---|---|---|
| Estamos classificados | Campeonatos | 1440 × 2560 | Principal |
| Magnus x Caieiras | Matchday | 1170 × 2080 | Apoio |
| Dia de MJ | Atletas | 640 × 1136 | Apoio |
| Dia de jogo (Bonny x Bases) | Matchday | 1024 × 1280 | Apoio |
| Juvenas vs Twister | Matchday | 1170 × 2080 | Apoio |
| Contratado | Social / anúncios | 1170 × 2080 | Apoio |
| Confirmados Supercopa Juvenas | Campeonatos | 1170 × 2080 | Não |

## Configuração

No HTML, `CONFIG.projects` guarda os títulos, categorias, textos alternativos, caminhos e dimensões. `CONFIG.heroProjectIds` seleciona as seis artes da hero, independentemente da ordem do portfólio. O portfólio inicia com seis peças e o botão “Ver mais” exibe a sétima. Os filtros disponíveis são derivados dos trabalhos reais.

No projeto Next.js existente, a seleção correspondente está em `src/data/projects.ts`, com `heroProjectIds`, `featuredHeroProjects` e `featuredPortfolioProjects`. Os antigos conceitos continuam separados somente para os mockups editoriais já existentes; eles não aparecem na hero nem nas galerias de trabalhos reais.

## Preservação das imagens

As proporções originais são reservadas no layout. As imagens usam `object-fit: contain`; não há `cover`, zoom com recorte ou texto de interface sobre os flyers. A sobreposição discreta da peça “Contratado” ocorre sobre a margem inferior de fundo da arte principal, sem cobrir seu título, atletas ou escudos. As margens cinzas, fundos, créditos e elementos de rede social presentes nos arquivos também foram mantidos.

A ampliação existente foi preservada. No Next.js há também um link para abrir a arte original em tamanho completo. “Confirmados Supercopa Juvenas” permanece apenas no portfólio.

As logos oficiais, os ícones e os contatos foram preservados. O HTML mais antigo do RAR foi usado para localizar as artes, sem substituir a versão V4.1 já corrigida com a marca oficial.

## Verificação

- Chromium em 375, 390, 430, 768, 1024 e 1440 px, nas duas bases existentes.
- Seleção de seis imagens, imagem principal maior, proporções e textos alternativos conferidos.
- Sete arquivos originais servidos com hash idêntico ao arquivo recebido.
- Filtros, “Ver mais”, ampliação, anterior/próximo e Escape validados no HTML.
- 90 testes aprovados no Next.js, incluindo carregamento das artes e preservação de proporções, além de lint, TypeScript e build.
- Prévia HTML capturada com fontes de fallback na sessão isolada; não foram alteradas as fontes do arquivo. No Next.js, as fontes locais continuam funcionando.

Não houve publicação. Capturas antigas do pacote foram preservadas como histórico; as prévias `preview_artes_*` mostram a integração atual. Retrato, domínio e número real de WhatsApp continuam sem alterações nesta etapa.
