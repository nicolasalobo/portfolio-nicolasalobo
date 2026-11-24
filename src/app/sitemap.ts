import type { MetadataRoute } from "next";
import { locales } from "@/dictionaries";
import { projects } from "@/data/portfolio";
import { siteOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = locales.flatMap((lang) => [
        "/" + lang,
        ...projects.map((project) => "/" + lang + "/projects/" + project.slug),
    ]);
    return paths.map((path) => ({
        url: siteOrigin + path,
        lastModified: new Date("2026-11-10"),
        changeFrequency: path.includes("/projects/") ? "monthly" : "weekly",
        priority: path === "/pt" ? 1 : path === "/en" ? 0.9 : 0.75,
    }));
}
