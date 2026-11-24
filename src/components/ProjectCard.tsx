import Link from "next/link";
import type { Locale } from "@/dictionaries";
import type { Project } from "@/data/portfolio";
import ProjectMockup from "./ProjectMockup";
import TiltCard from "./TiltCard";

export default function ProjectCard({ project, index, lang, openCase, sourceLabel }: {
    project: Project;
    index: number;
    lang: Locale;
    openCase: string;
    sourceLabel: string;
}) {
    const copy = project.copy[lang];

    return (
        <TiltCard
            className="project-card"
            data-project-id={project.slug}
            data-category={project.category}
        >
            <ProjectMockup screen={copy.screens[0]} category={project.category} lang={lang} />
            <div className="project-card-body">
                <div className="project-card-meta">
                    <span className="mono">{copy.categoryLabel}</span>
                    <span className="project-card-number mono">0{index + 1}</span>
                </div>
                <h3>{copy.title}</h3>
                <p>{copy.summary}</p>
                <div className="project-tech-list" aria-label={lang === "pt" ? "Tecnologias" : "Technologies"}>
                    {project.technologies.map((technology) => (
                        <span key={technology} className="tech-pill">{technology}</span>
                    ))}
                </div>
                <div className="project-card-actions">
                    <Link className="text-link" href={"/" + lang + "/projects/" + project.slug}>
                        {openCase}<span aria-hidden="true">↗</span>
                    </Link>
                    {project.liveDemo ? (
                        <a className="source-link" href={project.liveDemo} target="_blank" rel="noreferrer">
                            {copy.demoLabel ?? (lang === "pt" ? "Abrir demonstração" : "Open demo")}<span aria-hidden="true">↗</span>
                        </a>
                    ) : null}
                    {project.publicSource ? (
                        <a className="source-link" href={project.publicSource} target="_blank" rel="noreferrer">
                            {sourceLabel}<span aria-hidden="true">↗</span>
                        </a>
                    ) : null}
                </div>
            </div>
        </TiltCard>
    );
}
