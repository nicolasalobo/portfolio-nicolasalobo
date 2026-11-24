import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/dictionaries";
import { projects } from "@/data/portfolio";
import PreviewWindow from "@/components/PreviewWindow";

type PageProps = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang, slug } = await params;
    if (!isLocale(lang)) return {};
    const project = projects.find((item) => item.slug === slug);
    if (!project) return {};
    const copy = project.copy[lang];
    return {
        title: copy.title,
        description: copy.summary,
        alternates: {
            canonical: "/" + lang + "/projects/" + project.slug,
            languages: {
                pt: "/pt/projects/" + project.slug,
                en: "/en/projects/" + project.slug,
            },
        },
        openGraph: {
            title: copy.title + " | Nicolas Lobo",
            description: copy.summary,
            type: "article",
        },
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { lang, slug } = await params;
    if (!isLocale(lang)) notFound();
    const projectIndex = projects.findIndex((item) => item.slug === slug);
    if (projectIndex < 0) notFound();

    const project = projects[projectIndex];
    const copy = project.copy[lang];
    const dict = getDictionary(lang);
    const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
    const nextProject = projects[(projectIndex + 1) % projects.length];
    const privacyNote = project.privateCase ? dict.case.limitationsPrivate : dict.case.limitationsPublic;

    return (
        <article className="case-page">
            <section className="case-hero">
                <div className="container">
                    <nav className="case-breadcrumbs" aria-label={lang === "pt" ? "Trilha de navegação" : "Breadcrumb"}>
                        <Link href={"/" + lang + "#projects"}>← {dict.case.back}</Link>
                        <span aria-hidden="true">/</span>
                        <span>{copy.categoryLabel}</span>
                    </nav>
                    <div className="case-hero-grid">
                        <div>
                            <p className="eyebrow"><span className="case-number mono">CASE 0{projectIndex + 1}</span>{copy.categoryLabel}</p>
                            <h1>{copy.title}</h1>
                            <p className="case-lede">{copy.summary}</p>
                            <div className="project-tech-list case-tech-list" aria-label={dict.case.stack}>
                                {project.technologies.map((technology) => <span className="tech-pill" key={technology}>{technology}</span>)}
                            </div>
                        </div>
                        <div className="case-hero-side">
                            <span className="case-side-label mono">{lang === "pt" ? "VISÃO DE PROJETO" : "PROJECT VIEW"}</span>
                            <p>{lang === "pt" ? "Uma leitura objetiva do problema, da solução e do fluxo de trabalho." : "A focused view of the problem, solution, and workflow."}</p>
                            <span className="case-side-index mono">Nº 0{projectIndex + 1}<i aria-hidden="true" /></span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container case-content-grid">
                <div className="case-content-main">
                    <section className="case-content-block" aria-labelledby="case-context">
                        <p className="eyebrow">{dict.case.overview}</p>
                        <h2 id="case-context">{lang === "pt" ? "O contexto" : "The context"}</h2>
                        <p className="case-body-copy">{copy.context}</p>
                    </section>

                    <section className="case-content-block" aria-labelledby="case-features">
                        <p className="eyebrow">{lang === "pt" ? "ESCOPO DO PRODUTO" : "PRODUCT SCOPE"}</p>
                        <h2 id="case-features">{dict.case.features}</h2>
                        <ul className="case-feature-list">
                            {copy.features.map((feature, index) => (
                                <li key={feature}>
                                    <span className="mono">0{index + 1}</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="case-content-block" aria-labelledby="case-decisions">
                        <p className="eyebrow">{lang === "pt" ? "IMPLEMENTAÇÃO" : "IMPLEMENTATION"}</p>
                        <h2 id="case-decisions">{dict.case.decisions}</h2>
                        <ul className="case-check-list">
                            {copy.decisions.map((decision) => <li key={decision}>{decision}</li>)}
                        </ul>
                    </section>

                    <section className="case-content-block" aria-labelledby="case-flow">
                        <p className="eyebrow">{lang === "pt" ? "LÓGICA DA SOLUÇÃO" : "SOLUTION LOGIC"}</p>
                        <h2 id="case-flow">{dict.case.flow}</h2>
                        <ol className="solution-flow">
                            {copy.flow.map((step, index) => (
                                <li key={step}>
                                    <span className="flow-index mono">0{index + 1}</span>
                                    <strong>{step}</strong>
                                    {index < copy.flow.length - 1 ? <span className="flow-connector" aria-hidden="true">→</span> : null}
                                </li>
                            ))}
                        </ol>
                    </section>

                    <aside className="case-learning">
                        <span className="eyebrow">{lang === "pt" ? "APRENDIZADO" : "LEARNING"}</span>
                        <p>{copy.learning}</p>
                    </aside>
                </div>

                <aside className="case-sidebar">
                    <PreviewWindow slug={project.slug} category={project.category} screens={copy.screens} lang={lang} />
                    <div className="case-scope-note">
                        <span className="scope-note-icon" aria-hidden="true">i</span>
                        <div>
                            <p className="eyebrow">{dict.case.limits}</p>
                            <p>{privacyNote}</p>
                        </div>
                    </div>
                    {project.liveDemo ? (
                        <a className="source-link case-source-link" href={project.liveDemo} target="_blank" rel="noreferrer">
                            {copy.demoLabel ?? (lang === "pt" ? "Abrir demonstração" : "Open demo")}<span aria-hidden="true">↗</span>
                        </a>
                    ) : null}
                    {project.publicSource ? (
                        <a className="source-link case-source-link" href={project.publicSource} target="_blank" rel="noreferrer">
                            {dict.projects.source}<span aria-hidden="true">↗</span>
                        </a>
                    ) : null}
                </aside>
            </div>

            <nav className="container case-pagination" aria-label={lang === "pt" ? "Navegar entre cases" : "Navigate between cases"}>
                <Link href={"/" + lang + "/projects/" + previousProject.slug}>
                    <span className="mono">← {lang === "pt" ? "ANTERIOR" : "PREVIOUS"}</span><strong>{previousProject.copy[lang].title}</strong>
                </Link>
                <Link href={"/" + lang + "/projects/" + nextProject.slug}>
                    <span className="mono">{lang === "pt" ? "PRÓXIMO" : "NEXT"} →</span><strong>{nextProject.copy[lang].title}</strong>
                </Link>
            </nav>
        </article>
    );
}
