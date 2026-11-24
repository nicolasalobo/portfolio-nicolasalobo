# Portfólio de Nicolas Lobo

Reconstrução estática e editável da versão escura hospedada na Vercel, incluindo o Gestor de Contratos e a foto profissional. Esta branch não contém a implementação original em Next.js/TypeScript: o HTML e CSS foram recuperados a partir das páginas publicadas, e os comportamentos interativos foram reimplementados em JavaScript sem dependências.

## Editar

- Home em português e inglês: `public/pt/index.html` e `public/en/index.html`.
- Projetos: `public/{pt,en}/projects/<slug>/index.html`.
- Dados interativos do mapa e das telas dos projetos: `public/assets/pages/`.
- Aparência e temas: `public/assets/site.css` e `public/assets/theme.js`.
- Interações de navegação, filtros, mapa, habilidades, abas e contato: `public/assets/site.js`.
- Foto e currículo públicos: diretório `public/`. A demo do Gestor usa dados fictícios.

Rode `python3 -m http.server 4173 --directory public` e abra http://localhost:4173/pt/. A configuração da Vercel serve `public/` sem build; a página inicial redireciona para `/pt`.

O visual e o conteúdo preservam o deploy original. Navegação é por links HTML e não depende do runtime do Next.js. As transições foram simplificadas e as páginas não usam processamento no servidor.

## Verificar

Execute `npm ci` e `npm test` para verificar a navegação em ambos os idiomas e as interações em DOM. Esta branch não faz deploy automático.
