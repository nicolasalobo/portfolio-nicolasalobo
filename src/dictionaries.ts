
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
