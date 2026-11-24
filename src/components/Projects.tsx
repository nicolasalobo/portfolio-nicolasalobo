import type { Dictionary, Locale } from "@/dictionaries";
import { projects, skills } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";
import ProjectGallery from "./ProjectGallery";

export default function Projects({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    return (
        <section id="projects" className="content-section projects-section" aria-labelledby="projects-heading">
            <div className="container">
                <div className="section-heading section-heading-row">
                    <div>
                        <p className="eyebrow">{dict.projects.eyebrow}</p>
                        <h2 id="projects-heading">{dict.projects.title}</h2>
                        <p className="section-intro">{dict.projects.description}</p>
                    </div>
                    <span className="section-index mono" aria-hidden="true">01 / 04</span>
                </div>

                <ProjectGallery
                    dict={dict}
                    lang={lang}
                    projectMeta={projects.map(({ slug, category }) => ({ slug, category }))}
                    skillMeta={skills}
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            index={index}
                            lang={lang}
                            openCase={dict.projects.openCase}
                            sourceLabel={dict.projects.source}
                        />
                    ))}
                </ProjectGallery>
            </div>
        </section>
    );
}
