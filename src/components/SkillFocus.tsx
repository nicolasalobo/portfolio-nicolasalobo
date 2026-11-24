"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Locale } from "@/dictionaries";
import { skills } from "@/data/portfolio";

interface SkillFocusValue {
    activeSkill: string | null;
    setActiveSkill: (skill: string | null) => void;
}

const SkillFocusContext = createContext<SkillFocusValue | null>(null);

export function SkillFocusProvider({ children }: { children: ReactNode }) {
    const [activeSkill, setActiveSkill] = useState<string | null>(null);
    return (
        <SkillFocusContext.Provider value={{ activeSkill, setActiveSkill }}>
            {children}
        </SkillFocusContext.Provider>
    );
}

export function useSkillFocus() {
    const value = useContext(SkillFocusContext);
    if (!value) throw new Error("SkillFocus components must be used within SkillFocusProvider.");
    return value;
}

export function SkillsSelector({ lang, selectedLabel, clearLabel, prompt }: {
    lang: Locale;
    selectedLabel: string;
    clearLabel: string;
    prompt: string;
}) {
    const { activeSkill, setActiveSkill } = useSkillFocus();

    return (
        <div className="skills-selector">
            <div className="skill-list" aria-label={lang === "pt" ? "Tecnologias" : "Technologies"}>
                {skills.map((skill) => {
                    const selected = activeSkill === skill.name;
                    return (
                        <button
                            type="button"
                            className={selected ? "skill-chip is-selected" : "skill-chip"}
                            key={skill.name}
                            aria-pressed={selected}
                            onClick={() => setActiveSkill(selected ? null : skill.name)}
                            title={selected ? clearLabel : selectedLabel + ": " + skill.name}
                        >
                            <span className="skill-chip-mark" aria-hidden="true">{selected ? "−" : "+"}</span>
                            {skill.name}
                        </button>
                    );
                })}
            </div>
            <p className="skills-prompt" aria-live="polite">
                {activeSkill ? selectedLabel + ": " + activeSkill : prompt}
            </p>
        </div>
    );
}
