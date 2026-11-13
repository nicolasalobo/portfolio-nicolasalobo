import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import AnimatedBackground from "@/components/AnimatedBackground";
import { getDictionary, Locale } from "@/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nicolas Lobo | Portfolio",
    description: "Software Engineer Portfolio",
};

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "pt" }];
}

export const dynamicParams = false;

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = getDictionary(lang as Locale);

    return (
        <html lang={lang}>
            <body className={inter.className}>
                <AnimatedBackground />
                <CursorFollower />
                <div className="relative z-10">
                    <Navbar lang={lang as Locale} dict={dict} />
                    <main>{children}</main>
                    <Footer dict={dict} />
                </div>
            </body>
        </html>
    );
}

