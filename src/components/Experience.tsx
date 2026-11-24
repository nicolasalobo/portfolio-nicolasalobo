import type { Dictionary, Locale } from "@/dictionaries";
import { experiences } from "@/data/portfolio";
import Reveal from "./Reveal";

export default function Experience({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    return (
        <section id="experience" className="content-section experience-section" aria-labelledby="experience-heading">
            <div className="container">
                <Reveal>
                    <div className="section-heading section-heading-row">
                        <div>
                            <p className="eyebrow">{dict.experience.eyebrow}</p>
                            <h2 id="experience-heading">{dict.experience.title}</h2>
                            <p className="section-intro">{dict.experience.description}</p>
                        </div>
                        <span className="section-index mono" aria-hidden="true">02 / 04</span>
                    </div>

                    <div className="timeline">
                        {experiences[lang].map((experience, index) => (
                            <details className="timeline-entry" key={experience.organization} open={index === 0}>
                                <summary>
                                    <span className="timeline-marker" aria-hidden="true"><i /></span>
                                    <span className="timeline-heading">
                                        <span className="timeline-role">{experience.role}</span>
                                        <span className="timeline-org">{experience.organization}</span>
                                    </span>
                                    <span className="timeline-date mono">{experience.date}</span>
                                    <span className="timeline-toggle" aria-hidden="true">+</span>
                                </summary>
                                <div className="timeline-details">
                                    <p>{experience.summary}</p>
                                    <ul>
                                        {experience.details.map((detail) => <li key={detail}>{detail}</li>)}
                                    </ul>
                                    <div className="project-tech-list">
                                        {experience.technologies.map((technology) => <span key={technology} className="tech-pill">{technology}</span>)}
                                    </div>
                                    <span className="timeline-disclosure-label">{dict.experience.details}</span>
                                </div>
                            </details>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
