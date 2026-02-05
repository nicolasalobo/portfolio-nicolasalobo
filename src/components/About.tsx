export default function About({ dict }: { dict: any }) {
    return (
        <section id="about" className="py-24 bg-background">
            <div className="container">
                <h2 className="text-4xl font-bold mb-12 text-center text-primary">{dict.about.title}</h2>
                <div className="flex justify-center items-center gap-16">
                    <div className="max-w-3xl text-lg leading-relaxed text-foreground opacity-90 text-center">
                        <p>{dict.about.description}</p>
                    </div>
                    {/* Add image or visual element here later if needed */}
                </div>
            </div>
        </section>
    );
}
