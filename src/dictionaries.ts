
export const dictionaries = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      technologies: "Technologies",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      role: "Software Engineer",
      description: "Building digital experiences with code and creativity.",
      downloadCv: "Download CV",
      contactMe: "Contact Me",
    },
    about: {
      title: "About Me",
      description: "I am a passionate developer...",
    },
    experience: {
      title: "Experience",
    },
    technologies: {
      title: "Technologies",
    },
    projects: {
      title: "Projects",
      viewGithub: "View on GitHub",
      contractManagerTitle: "Contract Manager",
      contractManagerDescription: "Interactive contract management dashboard with financial overview, expenses, milestones, and payments, powered by fictional demo data.",
      mockData: "Mock data",
      liveDemo: "Live demo",
      sourceCode: "Source code",
    },
    contact: {
      title: "Contact",
      email: "Email me",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      experience: "Experiência",
      technologies: "Tecnologias",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      greeting: "Olá, eu sou",
      role: "Engenheiro de Software",
      description: "Criando experiências digitais com código e criatividade.",
      downloadCv: "Baixar CV",
      contactMe: "Entre em contato",
    },
    about: {
      title: "Sobre Mim",
      description: "Sou um desenvolvedor apaixonado...",
    },
    experience: {
      title: "Experiência",
    },
    technologies: {
      title: "Tecnologias",
    },
    projects: {
      title: "Projetos",
      viewGithub: "Ver no GitHub",
      contractManagerTitle: "Gestor de Contratos",
      contractManagerDescription: "Painel interativo para acompanhar contratos, etapas, despesas e pagamentos, com dados fictícios para demonstração.",
      mockData: "Dados fictícios",
      liveDemo: "Acessar demonstração",
      sourceCode: "Ver código-fonte",
    },
    contact: {
      title: "Contato",
      email: "Envie um email",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
  },
};

export type Locale = "en" | "pt";
export const getDictionary = (lang: Locale) => dictionaries[lang];

