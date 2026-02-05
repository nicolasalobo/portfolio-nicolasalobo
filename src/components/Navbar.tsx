"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getDictionary } from "@/dictionaries";

export default function Navbar({ lang, dict }: { lang: "en" | "pt"; dict: any }) {
    const pathname = usePathname();
    const router = useRouter();
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const switchLanguage = (newLang: "en" | "pt") => {
        if (newLang === lang) return;
        // Replace the language segment in the URL
        const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
        router.push(newPath);
    };

    return (
        <nav className="fixed top-0 left-0 w-full h-20 bg-nav-bg backdrop-blur-md z-50 border-b border-card-border flex items-center">
            <div className="container flex justify-between items-center w-full">
                <Link href={`/${lang}`} className="text-2xl font-bold text-primary">
                    Nicolas Lobo
                </Link>

                <div className="hidden md:flex gap-8">
                    <Link href={`/${lang}#about`} className="font-medium text-foreground hover:text-primary transition-colors">{dict.nav.about}</Link>
                    <Link href={`/${lang}#experience`} className="font-medium text-foreground hover:text-primary transition-colors">{dict.nav.experience}</Link>
                    <Link href={`/${lang}#technologies`} className="font-medium text-foreground hover:text-primary transition-colors">{dict.nav.technologies}</Link>
                    <Link href={`/${lang}#projects`} className="font-medium text-foreground hover:text-primary transition-colors">{dict.nav.projects}</Link>
                    <Link href={`/${lang}#contact`} className="font-medium text-foreground hover:text-primary transition-colors">{dict.nav.contact}</Link>
                </div>

                <div className="flex gap-4 items-center">
                    <button
                        className="bg-transparent border border-card-border px-4 py-2 rounded-lg text-foreground cursor-pointer font-semibold transition-all hover:border-primary hover:text-primary"
                        onClick={() => switchLanguage(lang === "en" ? "pt" : "en")}
                    >
                        {lang === "en" ? "PT" : "EN"}
                    </button>
                    <button
                        className="bg-transparent border border-card-border px-4 py-2 rounded-lg text-foreground cursor-pointer font-semibold transition-all hover:border-primary hover:text-primary"
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
