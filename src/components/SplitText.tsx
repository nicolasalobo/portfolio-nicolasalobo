"use client";

import { motion } from "framer-motion";

export default function SplitText({ text, className = "" }: { text: string; className?: string }) {
    return (
        <span className={className}>
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        type: "spring",
                        damping: 12,
                        stiffness: 100,
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}
