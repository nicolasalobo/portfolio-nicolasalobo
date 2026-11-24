import { ImageResponse } from "next/og";
import type { Locale } from "@/dictionaries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nicolas Lobo — Portfolio / Portfólio";

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const english = lang === "en";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 86px",
                    color: "#f2f6fc",
                    background: "linear-gradient(135deg, #080d16 0%, #111d2b 62%, #112b34 100%)",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#a8b7cc", fontSize: 22, letterSpacing: 3 }}>
                    <span style={{ display: "flex", width: 48, height: 48, alignItems: "center", justifyContent: "center", border: "1px solid #55e5f7", borderRadius: 14, color: "#55e5f7", fontWeight: 700 }}>N</span>
                    <span>CURITIBA, BRASIL</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -5 }}>Nicolas Lobo</div>
                    <div style={{ fontSize: 35, color: "#55e5f7" }}>{english ? "Full Stack Developer" : "Desenvolvedor Full Stack"}</div>
                    <div style={{ fontSize: 27, color: "#a8b7cc" }}>{english ? "Systems and interfaces for real operations." : "Sistemas e interfaces para operações reais."}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 20, color: "#b8f36b", letterSpacing: 2 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 8, background: "#b8f36b" }} />
                    <span>{english ? "PROJECTS · EXPERIENCE · TECHNOLOGY" : "PROJETOS · EXPERIÊNCIA · TECNOLOGIA"}</span>
                </div>
            </div>
        ),
        size,
    );
}
