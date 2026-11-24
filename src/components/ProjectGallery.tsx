"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Dictionary } from "@/dictionaries";
import type { ProjectCategory } from "@/data/portfolio";
import { useSkillFocus } from "./SkillFocus";

type Filter = "all" | ProjectCategory;
type ProjectMeta = { slug: string; category: ProjectCategory };
type SkillMeta = { name: string; projects: string[] };
const filters: Filter[] = ["all", "systems", "interfaces", "automation"];

export default function ProjectGallery({ dict, lang, projectMeta, skillMeta, children }: {
    dict: Dictionary;
    lang: "pt" | "en";
    projectMeta: ProjectMeta[];
    skillMeta: SkillMeta[];
    children: ReactNode;
}) {
    const [filter, setFilter] = useState<Filter>("all");
    const { activeSkill } = useSkillFocus();
    const gridRef = useRef<HTMLDivElement>(null);
    const labels = {
        all: dict.projects.filters.all,
        systems: dict.projects.filters.systems,
        interfaces: dict.projects.filters.interfaces,
        automation: dict.projects.filters.automation,
    };
    const visibleCount = projectMeta.filter((project) => filter === "all" || project.category === filter).length;

    useEffect(() => {
        const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-project-id]");
        if (!cards) return;
        const matchingProjects = activeSkill ? skillMeta.find((skill) => skill.name === activeSkill)?.projects ?? [] : null;
        cards.forEach((card) => {
            const projectId = card.dataset.projectId ?? "";
            card.dataset.dimmed = matchingProjects ? String(!matchingProjects.includes(projectId)) : "false";
        });
    }, [activeSkill, skillMeta]);

    return (
        <>
            <div className="project-toolbar">
                <div className="filter-list" role="group" aria-label={lang === "pt" ? "Filtrar projetos" : "Filter projects"}>
                    {filters.map((value) => (
                        <button
                            key={value}
                            type="button"
                            className={filter === value ? "filter-button is-selected" : "filter-button"}
                            aria-pressed={filter === value}
                            onClick={() => setFilter(value)}
                        >
                            {labels[value]}
                        </button>
                    ))}
                </div>
                <p className="result-count" aria-live="polite" aria-atomic="true">
                    <span className="result-count-number">{visibleCount.toString().padStart(2, "0")}</span>
                    {dict.projects.count}
                </p>
            </div>
            <div className="project-grid" data-filter={filter} ref={gridRef}>
                {children}
            </div>
            {visibleCount === 0 ? <p className="empty-state">{dict.projects.empty}</p> : null}
        </>
    );
}
