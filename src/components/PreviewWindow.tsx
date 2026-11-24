"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { Locale } from "@/dictionaries";
import type { PreviewScreen, ProjectCategory } from "@/data/portfolio";
import ProjectMockup from "./ProjectMockup";

export default function PreviewWindow({ slug, category, screens, lang }: {
    slug: string;
    category: ProjectCategory;
    screens: PreviewScreen[];
    lang: Locale;
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeScreen = screens[activeIndex];
    const tabListLabel = lang === "pt" ? "Telas demonstrativas do projeto" : "Illustrative project screens";

    const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") return;
        event.preventDefault();
        let nextIndex = activeIndex;
        if (event.key === "ArrowRight") nextIndex = (activeIndex + 1) % screens.length;
        if (event.key === "ArrowLeft") nextIndex = (activeIndex - 1 + screens.length) % screens.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = screens.length - 1;
        setActiveIndex(nextIndex);
        document.getElementById("preview-tab-" + slug + "-" + nextIndex)?.focus();
    };

    return (
        <div className="preview-window">
            <div className="preview-window-heading">
                <div>
                    <p className="eyebrow">{lang === "pt" ? "TELAS DE DEMONSTRAÇÃO" : "DEMONSTRATION SCREENS"}</p>
                    <p className="preview-note">{lang === "pt" ? "Interface demonstrativa com dados fictícios" : "Demonstration interface with fictitious data"}</p>
                </div>
                <span className="preview-window-counter mono">0{activeIndex + 1} / 0{screens.length}</span>
            </div>
            <div className="preview-tabs" role="tablist" aria-label={tabListLabel} onKeyDown={onTabKeyDown}>
                {screens.map((screen, index) => (
                    <button
                        key={screen.tab}
                        id={"preview-tab-" + slug + "-" + index}
                        type="button"
                        role="tab"
                        aria-selected={activeIndex === index}
                        aria-controls={"preview-panel-" + slug}
                        tabIndex={activeIndex === index ? 0 : -1}
                        className={activeIndex === index ? "preview-tab is-selected" : "preview-tab"}
                        onClick={() => setActiveIndex(index)}
                    >
                        <span className="mono">0{index + 1}</span>{screen.tab}
                    </button>
                ))}
            </div>
            <div
                id={"preview-panel-" + slug}
                className="preview-tab-panel"
                role="tabpanel"
                aria-labelledby={"preview-tab-" + slug + "-" + activeIndex}
                tabIndex={0}
            >
                <ProjectMockup screen={activeScreen} category={category} lang={lang} />
            </div>
        </div>
    );
}
