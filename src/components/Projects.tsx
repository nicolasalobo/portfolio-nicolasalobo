import Link from "next/link";

export default function Projects({ dict }: { dict: any }) {
    const projects = [
        {
            id: 1,
            title: "Project Alpha",
            description: "A full-stack e-commerce application built with Next.js and Stripe.",
            tags: ["Next.js", "Stripe", "PostgreSQL"],
            link: "https://github.com"
        },
        {
            id: 2,
            title: "Task Master",
            description: "Productivity tool for managing daily tasks and workflows.",
            tags: ["React", "Redux", "Firebase"],
            link: "https://github.com"
        },
        {
            id: 3,
            title: "Portfolio v1",
            description: "My first portfolio website using HTML/CSS and JavaScript.",
            tags: ["HTML", "CSS", "JavaScript"],
            link: "https://github.com"
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
                                <Link href={project.link} target="_blank" className="inline-block text-primary font-semibold mt-auto hover:underline">
                                    {dict.projects.viewGithub}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
