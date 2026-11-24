"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Dictionary, Locale } from "@/dictionaries";

const items = [
    { id: "projects", key: "projects" },
    { id: "experience", key: "experience" },
    { id: "about", key: "about" },
    { id: "lab", key: "lab" },
    { id: "contact", key: "contact" },
] as const;

type Theme = "dark" | "light";

function subscribeToTheme(callback: () => void) {
    window.addEventListener("portfolio-theme-change", callback);
    return () => window.removeEventListener("portfolio-theme-change", callback);
}

function getThemeSnapshot(): Theme {
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
    return "dark";
}

export default function Navbar({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    const pathname = usePathname();
    const router = useRouter();
    const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [progress, setProgress] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const isHomePage = pathname === "/" + lang;

    useEffect(() => {
        const updateProgress = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0);
        };

        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);

        if (!("IntersectionObserver" in window)) {
            return () => {
                window.removeEventListener("scroll", updateProgress);
                window.removeEventListener("resize", updateProgress);
            };
        }

        const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActiveSection(visible.target.id);
            },
            { rootMargin: "-25% 0px -62% 0px", threshold: [0, 0.2, 0.45, 0.7] },
        );
        sections.forEach((section) => observer.observe(section));

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
            observer.disconnect();
        };
    }, [lang]);

    useEffect(() => {
        if (!menuOpen) return;

        const firstLink = menuRef.current?.querySelector<HTMLElement>("a, button");
        firstLink?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setMenuOpen(false);
                triggerRef.current?.focus();
                return;
            }
            if (event.key !== "Tab" || !menuRef.current) return;

            const focusable = Array.from(
                menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
            ).filter((element) => element.offsetParent !== null);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [menuOpen]);

    const toggleTheme = () => {
        const nextTheme: Theme = theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = nextTheme;
        try {
            window.localStorage.setItem("portfolio-theme", nextTheme);
        } catch {
            // Theme still applies for this visit when storage is unavailable.
        }
        window.dispatchEvent(new Event("portfolio-theme-change"));
    };

    const switchLanguage = () => {
        const nextLang: Locale = lang === "pt" ? "en" : "pt";
        const nextPath = pathname.replace(/^\/(pt|en)(?=\/|$)/, "/" + nextLang);
        setMenuOpen(false);
        router.push(nextPath);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        triggerRef.current?.focus();
    };

    return (
        <>
            <a className="skip-link" href="#main-content">{dict.skipToContent}</a>
            <div
                className="scroll-progress"
                role="progressbar"
                aria-label={dict.nav.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
            >
                <span style={{ transform: "scaleX(" + progress / 100 + ")" }} />
            </div>
            <header className="site-header">
                <nav className="nav-wrap container" aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}>
                    <Link className="brand" href={"/" + lang} aria-label="Nicolas Lobo — home">
                        <span className="brand-mark" aria-hidden="true">N</span>
                        <span>Nicolas <b>Lobo</b></span>
                    </Link>

                    <div className="desktop-nav">
                        {items.map((item) => (
                            <Link
                                key={item.id}
                                href={"/" + lang + "#" + item.id}
                                className={isHomePage && activeSection === item.id ? "nav-link is-active" : "nav-link"}
                                aria-current={isHomePage && activeSection === item.id ? "location" : undefined}
                            >
                                {dict.nav[item.key]}
                            </Link>
                        ))}
                    </div>

                    <div className="nav-actions">
                        <button
                            className="icon-button language-button"
                            type="button"
                            onClick={switchLanguage}
                            aria-label={dict.nav.language}
                            title={dict.nav.language}
                        >
                            <span aria-hidden="true">{lang === "pt" ? "EN" : "PT"}</span>
                        </button>
                        <button
                            className="icon-button theme-button"
                            type="button"
                            onClick={toggleTheme}
                            aria-label={theme === "dark" ? dict.nav.themeLight : dict.nav.themeDark}
                            title={theme === "dark" ? dict.nav.themeLight : dict.nav.themeDark}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                {theme === "dark" ? (
                                    <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.6 8.6 0 1 0 20.2 15.4Z" />
                                ) : (
                                    <><circle cx="12" cy="12" r="3.8" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
                                )}
                            </svg>
                        </button>
                        <button
                            ref={triggerRef}
                            className="icon-button menu-trigger"
                            type="button"
                            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.menu}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-navigation"
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <span className={menuOpen ? "menu-icon is-open" : "menu-icon"} aria-hidden="true">
                                <i /><i />
                            </span>
                        </button>
                    </div>
                </nav>
            </header>

            <div className={menuOpen ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!menuOpen}>
                <div
                    id="mobile-navigation"
                    ref={menuRef}
                    className="mobile-menu-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label={lang === "pt" ? "Menu de navegação" : "Navigation menu"}
                    inert={!menuOpen}
                >
                    <div className="mobile-menu-heading">
                        <span className="eyebrow">{lang === "pt" ? "NAVEGAR" : "NAVIGATE"}</span>
                        <button
                            className="icon-button"
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                triggerRef.current?.focus();
                            }}
                            aria-label={dict.nav.closeMenu}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="mobile-menu-links">
                        {items.map((item, index) => (
                            <Link
                                key={item.id}
                                href={"/" + lang + "#" + item.id}
                                onClick={closeMenu}
                                className="mobile-nav-link"
                                aria-current={isHomePage && activeSection === item.id ? "location" : undefined}
                            >
                                <span className="mono">0{index + 1}</span>
                                {dict.nav[item.key]}
                                <span className="link-arrow" aria-hidden="true">↗</span>
                            </Link>
                        ))}
                    </div>
                    <p className="mobile-menu-footnote">Nicolas Lobo · Full Stack</p>
                </div>
                <button className="mobile-menu-backdrop" type="button" tabIndex={-1} aria-hidden="true" onClick={closeMenu} />
            </div>
        </>
    );
}
