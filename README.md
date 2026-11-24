# Nicolas Lobo — portfólio

Portfólio bilíngue em Next.js com cases de projetos, currículo em português e interações responsivas. O idioma padrão é português; as rotas públicas são `/pt` e `/en`.

## Executar localmente

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`. A raiz redireciona para `/pt`.

## Validar uma alteração

```bash
npm run lint
npm run typecheck
npm run build
```

O workflow do GitHub executa essas três verificações e não publica o site.

## Editar conteúdo

- `src/dictionaries.ts`: textos da interface em português e inglês.
- `src/data/portfolio.ts`: cases, experiências, tecnologias, laboratório e prévias demonstrativas.
- `src/components`: componentes de apresentação e interações.
- `src/app/(localized)/[lang]/projects/[slug]/page.tsx`: estrutura dos cases.

Os cases privados são apresentados com nomes e detalhes neutralizados. As prévias são ilustrações locais e usam dados fictícios; os visitantes não precisam acessar sistemas ou APIs dos projetos.

## Currículo público

O arquivo público é `public/curriculo-nicolas-lobo-pt.pdf`. Para recriá-lo após editar `scripts/generate_resume.py`, instale `reportlab` (`python -m pip install reportlab`) e execute:

```bash
python scripts/generate_resume.py
```

O currículo resume o material fornecido e omite telefone, nomes de clientes e valores financeiros.

## Hospedagem

O projeto está configurado para Next.js na Vercel. Conecte o repositório no painel da Vercel para criar uma prévia por branch ou pull request. A raiz do projeto é a pasta do repositório; o comando de build é `npm run build`. Não há etapa de publicação no GitHub Pages.
