"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const techs = [
    { name: "JavaScript", desc: "Dynamic scripting language" },
    { name: "TypeScript", desc: "Typed superset of JS" },
    { name: "React", desc: "UI Library" },
    { name: "Next.js", desc: "React Framework" },
    { name: "Node.js", desc: "JS Runtime" },
    { name: "Python", desc: "Versatile language" },
    { name: "Docker", desc: "Containerization" },
    { name: "AWS", desc: "Cloud Services" },
    { name: "Git", desc: "Version Control" },
    { name: "SQL", desc: "Database Querying" },
    { name: "GraphQL", desc: "API Query Language" },
    { name: "Tailwind", desc: "Utility-first CSS" },
];

export default function Technologies({ dict }: { dict: any }) {
    return (
        <section id="technologies" className="py-24 bg-background overflow-hidden">
            <div className="container">
                <h2 className="text-4xl font-bold mb-16 text-center text-primary">{dict.technologies.title}</h2>

                <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto perspective-[1000px]">
                    {techs.map((tech, index) => (
                        <Keycap key={tech.name} tech={tech} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Keycap({ tech }: { tech: { name: string; desc: string } }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-24 h-24 md:w-32 md:h-32"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -10 : 10 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-white text-xs md:text-sm px-3 py-1 rounded-md whitespace-nowrap z-20 pointer-events-none shadow-lg"
            >
                {tech.desc}
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
            </motion.div>

            {/* Keycap Body */}
            <motion.div
                className="w-full h-full bg-card-bg border border-card-border rounded-xl flex items-center justify-center cursor-pointer shadow-md relative z-10"
                animate={{
                    y: isHovered ? -10 : 0,
                    scale: isHovered ? 1.05 : 1,
                    boxShadow: isHovered
                        ? "0 20px 25px -5px rgba(124, 58, 237, 0.3), 0 8px 10px -6px rgba(124, 58, 237, 0.3)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                    borderColor: isHovered ? "var(--primary)" : "var(--card-border)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <div className="text-center">
                    <span className={`font-bold text-sm md:text-base ${isHovered ? 'text-primary' : 'text-foreground'} transition-colors duration-200`}>
                        {tech.name}
                    </span>
                </div>

                {/* Keycap Side (3D effect simulation) */}
                <div className="absolute top-full left-0 w-full h-2 bg-card-border rounded-b-xl opacity-50 transform origin-top scale-y-[0.8]"></div>
            </motion.div>
        </div>
    );
}
