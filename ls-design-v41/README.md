# LS Design V4.1

Website estático, sem build, com HTML + CSS + JS vanilla. **Não foi publicado.**

## Visualização

Extraia o ZIP mantendo os diretórios e abra `index.html` em um navegador moderno. Alguns navegadores restringem recursos quando se usa `file://`. Para simular o ambiente de produção, dentro da pasta execute:

```bash
python -m http.server 8000
```

Então abra `http://localhost:8000`.

## Como personalizar

Abra `index.html` e procure `const CONFIG`. Altere apenas informações reais:

- `brand`: LS Design
- `instagram`: URL oficial atual
- `whatsapp`: número real com DDI e DDD, apenas dígitos (deixe vazio até ter o número)
- `siteUrl`: domínio definitivo **apenas quando existir**
- `projects`: obras do portfólio
- `demoMode`: avisos provisórios; desligam automaticamente quando todas as peças têm imagem

Para substituir um projeto, forneça `slug`, `title`, `category`, `alt`, `featured`, `order` e `image` como objeto `{src, webp, avif, width, height}`. Exemplo de formato genérico (sem nome de cliente):

```js
image: { src:'assets/projects/projeto-01.jpg', webp:'assets/projects/projeto-01.webp', width:1080, height:1350 }
```

Salve os arquivos dentro de `assets/projects/`. Mantenha URLs relativas consistentes e a proporção original da arte. Não altere o HTML da galeria para cadastrar cada peça.

## Antes de publicar

Confirme todos os contatos, substitua os pôsteres demonstrativos por trabalho autorizado, adicione a imagem/foto pessoal, configure URL absoluta da Open Graph e domínio, execute Lighthouse mobile via HTTPS e teste em Safari e no navegador do Instagram.

Veja `RELATORIO_V4_1.md` para as verificações já executadas e limitações.
