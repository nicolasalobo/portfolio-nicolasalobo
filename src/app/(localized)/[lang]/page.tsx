import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/dictionaries";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Lab from "@/components/Lab";
import Contact from "@/components/Contact";
import { SkillFocusProvider } from "@/components/SkillFocus";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    if (!isLocale(lang)) return {};
    const title = lang === "pt" ? "Nicolas Lobo — Desenvolvedor Full Stack" : "Nicolas Lobo — Full Stack Developer";
    const description = lang === "pt"
        ? "Sistemas e interfaces para simplificar operações reais. Projetos, experiência e contato com Nicolas Lobo."
        : "Systems and interfaces that simplify real operations. Projects, experience, and contact for Nicolas Lobo.";

    return {
        title: { absolute: title },
        description,
        alternates: { canonical: "/" + lang, languages: { pt: "/pt", en: "/en" } },
        openGraph: {
            title,
            description,
            url: "/" + lang,
            locale: lang === "pt" ? "pt_BR" : "en_US",
        },
    };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params;
    if (!isLocale(rawLang)) notFound();
    const lang = rawLang;
    const dict = getDictionary(lang);

    return (
        <>
            <Hero lang={lang} dict={dict} />
            <SkillFocusProvider>
                <Projects lang={lang} dict={dict} />
                <Experience lang={lang} dict={dict} />
                <About lang={lang} dict={dict} />
                <Lab lang={lang} dict={dict} />
            </SkillFocusProvider>
            <Reveal><Contact lang={lang} dict={dict} /></Reveal>
        </>
    );
}
