export default function Experience({ dict }: { dict: any }) {
    return (
        <section id="experience" className="py-24 bg-card-bg">
            <div className="container">
                <h2 className="text-4xl font-bold mb-12 text-center text-primary">{dict.experience.title}</h2>
                <div className="relative max-w-3xl mx-auto before:content-[''] before:absolute before:left-4 md:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:h-full before:bg-card-border">
                    {/* Placeholder for experience items */}
                    <div className="mb-12 relative w-full md:w-1/2 pl-12 md:pl-0 md:pr-8 md:text-right md:left-0">
                        <div className="absolute top-0 w-4 h-4 bg-primary rounded-full z-10 left-2 md:left-auto md:-right-2"></div>
                        <div className="">
                            <h3 className="text-primary text-xl font-semibold mb-2">Senior Developer</h3>
                            <span className="block text-sm text-secondary mb-2">2023 - Present</span>
                            <p className="text-foreground">Tech Company Inc.</p>
                            <p className="text-foreground opacity-80">Leading backend development...</p>
                        </div>
                    </div>
                    <div className="mb-12 relative w-full md:w-1/2 pl-12 md:pl-8 md:text-left md:left-1/2">
                        <div className="absolute top-0 w-4 h-4 bg-primary rounded-full z-10 left-2 md:-left-2"></div>
                        <div className="">
                            <h3 className="text-primary text-xl font-semibold mb-2">Full Stack Developer</h3>
                            <span className="block text-sm text-secondary mb-2">2021 - 2023</span>
                            <p className="text-foreground">Startup LLC</p>
                            <p className="text-foreground opacity-80">Built scalable web applications...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
