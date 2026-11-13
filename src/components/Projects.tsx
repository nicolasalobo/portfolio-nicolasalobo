import Link from "next/link";

type PortfolioProject = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    githubLink?: string;
    demoLink?: string;
    repositoryLink?: string;
};

export default function Projects({ dict }: { dict: any }) {
    const projects: PortfolioProject[] = [
        {
            id: 1,
            title: "Project Alpha",
            description: "A full-stack e-commerce application built with Next.js and Stripe.",
            tags: ["Next.js", "Stripe", "PostgreSQL"],
            githubLink: "https://github.com"
        },
        {
            id: 2,
            title: "Task Master",
            description: "Productivity tool for managing daily tasks and workflows.",
            tags: ["React", "Redux", "Firebase"],
            githubLink: "https://github.com"
        },
        {
            id: 3,
            title: "Portfolio v1",
            description: "My first portfolio website using HTML/CSS and JavaScript.",
            tags: ["HTML", "CSS", "JavaScript"],
            githubLink: "https://github.com"
        },
        {
            id: 4,
            title: dict.projects.contractManagerTitle,
            description: dict.projects.contractManagerDescription,
            tags: ["Next.js", "TypeScript", "Tailwind CSS", dict.projects.mockData],
            demoLink: "https://gestor-contratos-portfolio.vercel.app",
            repositoryLink: "https://github.com/nicolasalobo/gestor-contratos-portfolio"
        }
    ];

    return (
        <section id="projects" className="py-24 bg-card-bg">
            <div className="container">
                <h2 className="text-4xl font-bold mb-12 text-center text-primary">{dict.projects.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-background border border-card-border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1 hover:border-primary hover:shadow-xl">
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-semibold mb-4 text-foreground">{project.title}</h3>
                                <p className="text-foreground opacity-80 mb-6 leading-relaxed flex-grow">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-sm px-3 py-1 bg-card-bg border border-card-border rounded-full text-secondary">{tag}</span>
                                    ))}
                                </div>
                                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
                                    {project.demoLink && (
                                        <Link href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-block text-primary font-semibold hover:underline">
                                            {dict.projects.liveDemo}
                                        </Link>
                                    )}
                                    {project.githubLink && (
                                        <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-block text-primary font-semibold hover:underline">
                                            {dict.projects.viewGithub}
                                        </Link>
                                    )}
                                    {project.repositoryLink && (
                                        <Link href={project.repositoryLink} target="_blank" rel="noopener noreferrer" className="inline-block text-primary font-semibold hover:underline">
                                            {dict.projects.sourceCode}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

