import type { Dictionary, Locale } from "@/dictionaries";
import Reveal from "./Reveal";
import { SkillsSelector } from "./SkillFocus";

export default function About({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    return (
        <section id="about" className="content-section about-section" aria-labelledby="about-heading">
            <div className="container about-layout">
                <Reveal className="about-copy">
                    <div className="section-heading">
                        <p className="eyebrow">{dict.about.eyebrow}</p>
                        <h2 id="about-heading">{dict.about.title}</h2>
                        <p className="section-intro">{dict.about.description}</p>
                    </div>
                    <div className="about-facts">
                        <div className="fact-card">
                            <span className="fact-icon" aria-hidden="true">⌖</span>
                            <div><span className="mono">{lang === "pt" ? "BASE" : "BASED IN"}</span><strong>{dict.about.location}</strong></div>
                        </div>
                        <div className="fact-card">
                            <span className="fact-icon" aria-hidden="true">↗</span>
                            <div><span className="mono">{lang === "pt" ? "FORMAÇÃO" : "EDUCATION"}</span><strong>{dict.about.education}</strong><small>{dict.about.graduation}</small></div>
                        </div>
                        <div className="fact-card">
                            <span className="fact-icon" aria-hidden="true">Aa</span>
                            <div><span className="mono">{lang === "pt" ? "IDIOMA" : "LANGUAGE"}</span><strong>{dict.about.english}</strong></div>
                        </div>
                        <div className="fact-card">
                            <span className="fact-icon" aria-hidden="true">◎</span>
                            <div><span className="mono">{lang === "pt" ? "LIDERANÇA" : "LEADERSHIP"}</span><strong>{dict.about.leadership}</strong></div>
                        </div>
                    </div>
                </Reveal>

                <Reveal className="skills-panel">
                    <div className="skills-panel-heading">
                        <div>
                            <p className="eyebrow">{lang === "pt" ? "CONHECIMENTO APLICADO" : "APPLIED KNOWLEDGE"}</p>
                            <h3>{dict.about.skills}</h3>
                        </div>
                        <span className="skills-orbit" aria-hidden="true">◎</span>
                    </div>
                    <p className="skills-description">{dict.projects.skillsHeading}</p>
                    <SkillsSelector
                        lang={lang}
                        selectedLabel={dict.about.selectedSkill}
                        clearLabel={dict.about.clearSkill}
                        prompt={dict.about.noSkill}
                    />
                </Reveal>
            </div>
        </section>
    );
}
