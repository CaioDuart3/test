# Site romântico editorial

Aplicação estática em React, Vite e TypeScript para uma página romântica discreta, elegante e editável. Não há back-end, banco de dados, analytics, cookies nem APIs com credenciais.

## Requisitos

- Node.js 22 ou superior
- npm
- Uma conta do GitHub com GitHub Pages habilitado no repositório

## Instalação

```bash
npm install
```

## Execução local

```bash
npm run dev
```

## Build

```bash
npm run build
```

Para testar um caminho de subpasta igual ao GitHub Pages:

```bash
$env:VITE_BASE_PATH="/nome-do-repositorio/"
npm run build
npm run preview
```

## Estrutura

- `src/data/siteContent.ts`: textos, datas, fotos, links e metadados editáveis.
- `src/components`: seções e peças reutilizáveis da página.
- `src/styles`: tokens, estilos globais e utilitários.
- `public/photos`: pasta recomendada para fotos pessoais.
- `.github/workflows/deploy.yml`: publicação automática no GitHub Pages.

## Personalização dos textos

Edite somente os valores entre colchetes em `src/data/siteContent.ts`. Não é necessário mexer nos componentes para trocar título, datas, legendas, mensagem final ou assinatura.

## Substituição das fotos

Coloque as imagens em `public/photos` e use caminhos como:

```ts
src: '/photos/minha-foto.webp';
```

Enquanto `src` estiver vazio, o site mostra um placeholder editorial. Escreva `alt` descritivo para cada foto real.

Recomendações:

- largura máxima aproximada de 2000 px;
- formato WebP ou AVIF;
- compressão adequada;
- metadados EXIF removidos antes da publicação.

## Playlist

Em `siteContent.playlist`, escolha `provider: 'spotify'` ou `provider: 'youtube'` e cole uma URL pública de embed em `embedUrl`. Não use links com `autoplay=1`. O site não usa API, credenciais ou reprodução automática.

## Metadados

Edite título e descrição no `index.html` e em `siteContent.meta` se quiser reaproveitar esses valores na documentação interna. O caminho `og:image` está como `/social-image.webp`; adicione essa imagem manualmente se quiser uma prévia social, sem dados pessoais inventados.

## Noindex

O `index.html` começa com:

```html
<meta name="robots" content="noindex, nofollow" />
```

Remova essa linha somente se quiser permitir indexação por buscadores.

## GitHub Pages

O Vite usa `VITE_BASE_PATH`.

- Para `https://usuario.github.io/`, use `VITE_BASE_PATH=/`.
- Para `https://usuario.github.io/nome-do-repositorio/`, use `VITE_BASE_PATH=/nome-do-repositorio/`.

No GitHub, crie a variável de repositório `VITE_BASE_PATH` em `Settings > Secrets and variables > Actions > Variables`, ou deixe o workflow usar automaticamente o nome do repositório.

## Caminhos de assets

Fotos no diretório `public` devem ser referenciadas com caminho absoluto do site, por exemplo `/photos/foto.webp`. O `base` do Vite ajusta os assets gerados do app; os arquivos públicos continuam respeitando o caminho onde o site é servido.

## Privacidade

O endereço do GitHub Pages poderá ser acessado publicamente por qualquer pessoa que tiver o link. Fotografias publicadas podem ser baixadas. Publique apenas imagens com consentimento das pessoas retratadas, sem documentos, localizações, informações sensíveis ou nomes completos desnecessários. Remova metadados EXIF antes de enviar as fotos.

## Comandos de qualidade

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```
