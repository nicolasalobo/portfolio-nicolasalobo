import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["selector", '[data-theme="dark"]'],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                surface: "var(--surface)",
                cyan: "var(--cyan)",
                lime: "var(--lime)",
            },
            fontFamily: {
                sans: ["var(--font-body)", "sans-serif"],
                display: ["var(--font-heading)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
        },
    },
    plugins: [],
};
export default config;
