import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "../../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary, isLocale, locales } from "@/dictionaries";
import { siteUrl } from "@/lib/site";
const themeScript =
    "(function(){try{var saved=window.localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=saved==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();";

export const metadata: Metadata = {
    metadataBase: siteUrl,
    title: {
        default: "Nicolas Lobo — Desenvolvedor Full Stack",
        template: "%s | Nicolas Lobo",
    },
    applicationName: "Nicolas Lobo — Portfolio",
    creator: "Nicolas Lobo",
    openGraph: {
        siteName: "Nicolas Lobo — Portfolio",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang: rawLang } = await params;
    if (!isLocale(rawLang)) notFound();
    const lang = rawLang;
    const dict = getDictionary(lang);

    return (
        <html lang={lang} data-theme="dark" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body>
                <div className="ambient-background" aria-hidden="true">
                    <span className="ambient-orb ambient-orb-a" />
                    <span className="ambient-orb ambient-orb-b" />
                    <span className="ambient-grid" />
                </div>
                <Navbar lang={lang} dict={dict} />
                <main id="main-content" className="site-main">{children}</main>
                <Footer lang={lang} dict={dict} />
            </body>
        </html>
    );
}
