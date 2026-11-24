"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/dictionaries";

export interface ProjectMapItem {
    slug: string;
    title: string;
    categoryLabel: string;
    summary: string;
}

const positions = [
    { x: 19, y: 25 },
    { x: 81, y: 25 },
    { x: 19, y: 76 },
    { x: 81, y: 76 },
    { x: 50, y: 10 },
];

export default function ProjectMap({ lang, dict, items }: { lang: Locale; dict: Dictionary; items: ProjectMapItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = items[activeIndex];
    const activeCopy = activeProject;

    return (
        <div className="project-map" role="region" aria-labelledby="project-map-title">
            <div className="map-topline">
                <div>
                    <span className="eyebrow">{dict.hero.mapLabel}</span>
                    <p className="map-title" id="project-map-title">{dict.hero.mapTitle}</p>
                </div>
                <span className="map-live"><i /> SYSTEMS MAP</span>
            </div>

            <div className="map-stage">
                <svg className="map-lines" viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true">
                    <path className={activeIndex === 0 ? "map-line is-active" : "map-line"} d="M300 180 114 90" />
                    <path className={activeIndex === 1 ? "map-line is-active" : "map-line"} d="M300 180 486 90" />
                    <path className={activeIndex === 2 ? "map-line is-active" : "map-line"} d="M300 180 114 274" />
                    <path className={activeIndex === 3 ? "map-line is-active" : "map-line"} d="M300 180 486 274" />
                    <path className={activeIndex === 4 ? "map-line is-active" : "map-line"} d="M300 180 300 36" />
                    <circle cx="300" cy="180" r="96" className="map-orbit" />
                    <circle cx="300" cy="180" r="129" className="map-orbit map-orbit-outer" />
                </svg>

                <div className="map-core">
                    <span className="core-symbol" aria-hidden="true">N</span>
                    <span>NICOLAS LOBO</span>
                    <small>FULL STACK</small>
                </div>

                {items.map((project, index) => {
                    const copy = project;
                    const selected = index === activeIndex;
                    return (
                        <button
                            key={project.slug}
                            type="button"
                            className={selected ? "map-node is-selected" : "map-node"}
                            style={{ left: positions[index].x + "%", top: positions[index].y + "%" }}
                            onClick={() => setActiveIndex(index)}
                            aria-pressed={selected}
                            aria-label={copy.title + " — " + (lang === "pt" ? "selecionar módulo" : "select module")}
                        >
                            <span className="node-dot" aria-hidden="true"><i /></span>
                            <span className="node-label">{copy.title}</span>
                            <span className="node-category">{copy.categoryLabel}</span>
                        </button>
                    );
                })}
            </div>

            <p className="map-keyboard-hint">{dict.hero.keyboardHint}</p>

            <div className="map-selection" aria-live="polite" aria-atomic="true">
                <div className="selection-index">
                    <span className="eyebrow">{dict.hero.active}</span>
                    <span className="mono">0{activeIndex + 1} / {items.length.toString().padStart(2, "0")}</span>
                </div>
                <div className="selection-copy">
                    <h3>{activeCopy.title}</h3>
                    <p>{activeCopy.summary}</p>
                </div>
                <Link className="text-link" href={"/" + lang + "/projects/" + activeProject.slug}>
                    {dict.hero.openCase}
                    <span aria-hidden="true">↗</span>
                </Link>
            </div>
        </div>
    );
}
