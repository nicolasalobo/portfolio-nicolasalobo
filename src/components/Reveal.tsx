"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion || !("IntersectionObserver" in window)) return;

        element.dataset.visible = "false";
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.dataset.visible = "true";
                    observer.unobserve(element);
                }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={"reveal " + className} data-visible="true">
            {children}
        </div>
    );
}
