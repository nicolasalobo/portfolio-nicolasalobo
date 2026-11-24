"use client";

import type { Dictionary, Locale } from "@/dictionaries";
import { laboratoryProjects, skills } from "@/data/portfolio";
import Reveal from "./Reveal";
import { useSkillFocus } from "./SkillFocus";

export default function Lab({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    const { activeSkill } = useSkillFocus();
    const activeRecord = skills.find((skill) => skill.name === activeSkill);

    return (
        <section id="lab" className="content-section lab-section" aria-labelledby="lab-heading">
            <div className="container">
                <Reveal>
                    <div className="section-heading section-heading-row">
                        <div>
                            <p className="eyebrow">{dict.lab.eyebrow}</p>
                            <h2 id="lab-heading">{dict.lab.title}</h2>
                            <p className="section-intro">{dict.lab.description}</p>
                        </div>
                        <span className="section-index mono" aria-hidden="true">03 / 04</span>
                    </div>

                    <div className="lab-grid">
                        {laboratoryProjects[lang].map((project) => {
                            const projectId = project.kind === "academic" ? "biblioteca-de-jogos-java" : "shared-planning";
                            const highlighted = !activeSkill || activeRecord?.projects.includes(projectId);
                            return (
                                <article key={project.kind} className={highlighted ? "lab-card" : "lab-card is-dimmed"}>
                                    <div className="lab-card-top">
                                        <span className={project.kind === "shared" ? "lab-symbol symbol-orbit" : "lab-symbol symbol-structure"} aria-hidden="true">
                                            {project.kind === "shared" ? "◎" : "⌘"}
                                        </span>
                                        <span className="lab-status"><i />{project.status}</span>
                                    </div>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="lab-card-bottom">
                                        <span className="mono">{project.kind === "shared" ? "COLLABORATION" : "DATA STRUCTURES"}</span>
                                        {project.href ? (
                                            <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
                                                {dict.lab.openProject}<span aria-hidden="true">↗</span>
                                            </a>
                                        ) : <span className="lab-no-link">{lang === "pt" ? "Case em construção" : "Case in progress"}</span>}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
