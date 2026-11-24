import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/dictionaries";
import { projects } from "@/data/portfolio";
import ProjectMap from "./ProjectMap";

export default function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    return (
        <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-grid container">
                <div className="hero-copy">
                    <div className="hero-profile">
                        <Image
                            className="hero-profile-image"
                            src="/nicolas-lobo.png"
                            alt="Nicolas Lobo"
                            width={88}
                            height={88}
                            priority
                        />
                        <p className="eyebrow hero-eyebrow"><span className="status-light" />{dict.hero.eyebrow}</p>
                    </div>
                    <h1 id="hero-title">
                        <span>{dict.hero.title.split(" ")[0]}</span>
                        <span className="hero-last-name">{dict.hero.title.split(" ").slice(1).join(" ")}</span>
                    </h1>
                    <p className="hero-role">{dict.hero.role}</p>
                    <p className="hero-description">{dict.hero.description}</p>
                    <div className="hero-actions">
                        <Link className="button button-primary" href={"/" + lang + "#projects"}>
                            {dict.hero.projects}<span aria-hidden="true">↘</span>
                        </Link>
                        <Link className="button button-quiet" href={"/" + lang + "#contact"}>
                            {dict.hero.contact}<span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                    <a className="resume-inline" href="/curriculo-nicolas-lobo-pt.pdf" download>
                        <span className="resume-icon" aria-hidden="true">↓</span>
                        <span>{dict.hero.resume}</span>
                        <span className="mono">PDF · PT</span>
                    </a>
                    <div className="hero-availability">
                        <span className="availability-dot" aria-hidden="true" />
                        <span>{dict.hero.available}</span>
                    </div>
                </div>

                <div className="hero-visual">
                    <ProjectMap
                        lang={lang}
                        dict={dict}
                        items={projects.map((project) => ({
                            slug: project.slug,
                            title: project.copy[lang].title,
                            categoryLabel: project.copy[lang].categoryLabel,
                            summary: project.copy[lang].summary,
                        }))}
                    />
                </div>
            </div>
        </section>
    );
}
