"use client";

import { getDictionary } from "@/dictionaries";
import SplitText from "./SplitText";

export default function Hero({ dict }: { dict: any }) {
    return (
        <section className="min-h-screen flex items-center pt-20 relative z-10">
            <div className="container grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col justify-center items-start order-2 md:order-1">
                    <h2 className="text-2xl text-primary mb-4">{dict.hero.greeting}</h2>
                    <div className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        <SplitText text="Nicolas Lobo" />
                    </div>
                    <h3 className="text-3xl md:text-4xl text-foreground mb-6 opacity-90">{dict.hero.role}</h3>
                    <p className="text-xl max-w-xl mb-8 leading-relaxed opacity-80">{dict.hero.description}</p>
                    <div className="flex gap-4">
                        <button className="btn btn-primary">{dict.hero.downloadCv}</button>
                        <button className="btn btn-outline">{dict.hero.contactMe}</button>
                    </div>
                </div>

                <div className="flex justify-center order-1 md:order-2">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl glow-animation">
                        {/* Placeholder for user image - replace src with actual image path later */}
                        <img
                            src="https://github.com/nicolasalobo.png"
                            alt="Nicolas Lobo"
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                // Fallback if GitHub image fails or isn't desired
                                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Nicolas+Lobo&background=7c3aed&color=fff&size=512";
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
