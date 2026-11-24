import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
    metadataBase: siteUrl,
    title: "Nicolas Lobo — Desenvolvedor Full Stack",
    robots: { index: false, follow: false },
};

export default function RedirectRootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt">
            <body>{children}</body>
        </html>
    );
}
