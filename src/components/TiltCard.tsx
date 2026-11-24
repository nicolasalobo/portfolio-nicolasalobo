"use client";

import type { HTMLAttributes, PointerEvent, ReactNode } from "react";

export default function TiltCard({ children, className, ...attributes }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        const rotateY = (x - 0.5) * 6;
        const rotateX = (0.5 - y) * 6;
        event.currentTarget.style.transform = "perspective(1100px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    };

    const resetPointer = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    };

    return (
        <div
            {...attributes}
            className={className}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
        >
            {children}
        </div>
    );
}
