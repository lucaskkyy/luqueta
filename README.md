# LS Design

Website em Next.js (App Router), TypeScript e Tailwind CSS 4. Interface em português, responsiva, com animações que respeitam movimento reduzido.

## Desenvolvimento

Node.js 20.9 ou superior (validado com Node 24).

```sh
npm ci
npm run dev
```

Validação: `npm run build` e `npm run typecheck`. Produção: `npm start` depois do build.

## Conteúdo e artes

O repositório original tinha apenas `hamas 22.txt`, um script Roblox sem relação com o website. Foi preservado para revisão do proprietário; não é executado nem importado pelo projeto.

`src/data/projects.ts` centraliza os projetos. `featuredHeroProjects` seleciona a hero e `featuredPortfolioProjects` seleciona a home; a página `/portfolio` usa a lista completa. Os elementos gráficos atuais são placeholders conceituais explicitamente identificados, não trabalhos reais. Para adicionar artes, coloque arquivos em `public/artworks`, defina `image: '/artworks/arquivo.webp'`, preencha `alt` e altere `placeholder` para `false`. Prefira WebP/AVIF otimizados, aproximadamente 1200 px de largura. Mantenha os identificadores únicos.

## Orçamentos

Configure `NEXT_PUBLIC_WHATSAPP_NUMBER` no ambiente local (`.env.local`) e na Vercel com o número real, contendo país e DDD, apenas dígitos. A página abre um briefing no WhatsApp para o visitante confirmar o envio. Sem número configurado, permite copiar o briefing e avisa que nada foi enviado. Não há armazenamento nem envio automático de dados. Variáveis `NEXT_PUBLIC_` são públicas e exigem novo build quando alteradas.

## Vercel

Importe este repositório, selecione o preset Next.js e use a raiz do projeto, `npm ci` para instalar e `npm run build` para compilar. Configure a variável de contato e publique. Nenhum serviço externo ou banco de dados é necessário. Antes do lançamento, substitua os placeholders pelas artes autorizadas e confirme os textos, identidade e contato reais.

## V2 — Sports Creative Studio

A identidade da interface usa preto, branco e azul LS (`#1877D2` / `#48A5FF`). Os quatro projetos conceituais existentes foram preservados; dois placeholders adicionais completam a seleção inicial de seis peças. Nenhuma composição é apresentada como projeto real. A informação de mais de 750 projetos entregues foi fornecida pelo proprietário.

- `src/components/home/`: hero, marquee, portfólio selecionado, seções editoriais, processo e FAQ.
- `src/components/fade-in-up.tsx`: revelação com Intersection Observer, sem ocultar conteúdo no HTML inicial e com suporte a movimento reduzido.
- `src/components/project-gallery.tsx`: galeria compartilhada com diálogo nativo, fechamento por Escape e restauração de foco.
- `src/data/site.ts`: Instagram oficial, validação do WhatsApp e caminhos opcionais de retrato/rodapé. As logos oficiais estão em `public/assets/branding/`: a branca transparente é usada no cabeçalho e no rodapé; a azul original é usada nos ícones do site. Os arquivos PNG foram preservados sem alteração de pixels.
- `src/data/projects.ts`: projetos completos e seleções independentes para hero e home. A hero acomoda de quatro a seis peças.

O briefing inclui nome, time/organização/projeto, contato opcional, serviço, descrição e prazo desejado. Com WhatsApp válido, prepara um link para revisão e envio pelo visitante. Sem número, copia a mensagem e oferece o Instagram oficial. Se a área de transferência não estiver disponível, exibe a mensagem para cópia manual.

### Qualidade

```sh
npm run lint
npm run build
npm run typecheck
npx playwright install chromium
npm test
```

Os testes Playwright iniciam a aplicação de produção na porta 3100 e verificam desktop/mobile, filtros, ampliação, foco, menu, FAQ, briefing, movimento reduzido e conteúdo sem JavaScript. Para usar Chromium instalado na máquina:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

`npm run dev` mantém a experiência interativa local para revisão. Capturas e HTML exportado são apenas prévias estáticas e não substituem os testes interativos. Nenhum deploy é executado por esses comandos.

## V3 — revisão técnica

A identidade e os seis placeholders da V2 foram mantidos. O FAQ agora usa `details`/`summary`: começa fechado no HTML inicial, funciona com Enter/Espaço e continua utilizável sem JavaScript. A expansão usa CSS grid nos navegadores compatíveis; nos demais, o comportamento nativo permanece disponível.

A visualização ampliada oferece anterior/próximo e setas do teclado, sempre dentro da seleção filtrada. Escape fecha e devolve o foco ao projeto de origem. Seleções vazias e falhas futuras de imagens têm estados próprios. Imagens continuam com dimensão reservada e `object-fit: contain`, sem substituir suas artes.

O formulário remove espaços excedentes, valida campos obrigatórios, contato opcional e serviço. Copiar briefing permanece disponível também com WhatsApp configurado; o envio exige abrir e confirmar a mensagem no WhatsApp. Não foi efetuado envio real. Sem acesso à área de transferência, a mensagem fica disponível para seleção manual.

As fontes Anton e Manrope foram preservadas e migradas para `next/font/local`, com preloads e ajustes métricos de fallback. Elementos já visíveis não ficam escondidos enquanto a hidratação inicia os scroll reveals.

### Domínio e SEO

Defina `NEXT_PUBLIC_SITE_URL` com a origem HTTPS definitiva, sem caminho, credenciais ou parâmetros, e faça novo build. Isso habilita URLs canônicas por rota, imagem Open Graph em `public/og-image.png`, sitemap com as três páginas e a referência ao sitemap no `robots.txt`. Sem domínio válido configurado, a revisão permanece com `noindex`, `robots.txt` bloqueado e sitemap vazio, sem inventar domínio público ou URLs de localhost para buscadores.

O título principal é `LS Design | Design Esportivo`. Portfólio e orçamento mantêm títulos específicos. A imagem social é apenas uma peça tipográfica da marca; os placeholders do portfólio não foram alterados.

Os testes de interface agora cobrem os tamanhos 375, 390, 430, 768, 1024 e 1440 px. Verificam todas as rotas e links da navbar, teclado, categorias, navegação no diálogo, FAQ antes da hidratação, validação/cópia do briefing, fallback manual e endpoints SEO. O número real de WhatsApp e o domínio continuam pendentes de definição pelo proprietário.

## Integração das sete artes reais

Os arquivos recebidos foram copiados integralmente para `public/assets/projects/`, com títulos, categorias, alt e dimensões em `src/data/projects.ts`. A hero utiliza as seis artes selecionadas pelo proprietário, com “Estamos classificados” em destaque. “Confirmados Supercopa Juvenas” está somente nas galerias. `heroProjectIds` controla a seleção da hero; `featuredPortfolioProjects` controla a home. As galerias usam proporções originais, `object-fit: contain` e ampliação com acesso ao arquivo original. Os conceitos anteriores foram separados em `conceptProjects` para preservar os mockups editoriais existentes, sem apresentá-los como projetos reais no portfólio. Nenhuma logo oficial foi alterada.
