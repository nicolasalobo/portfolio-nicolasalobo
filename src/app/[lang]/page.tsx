import { getDictionary, Locale } from "@/dictionaries";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = getDictionary(lang as Locale);

    return (
        <>
            <Hero dict={dict} />
            <About dict={dict} />
            <Experience dict={dict} />
            <Technologies dict={dict} />
            <Projects dict={dict} />
            <Contact dict={dict} />
        </>
    );
}
