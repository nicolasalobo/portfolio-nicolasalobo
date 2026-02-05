import { getDictionary } from "@/dictionaries";

export default function Footer({ dict }: { dict: any }) {
    return (
        <footer className="py-8 bg-card-bg border-t border-card-border mt-16">
            <div className="container flex justify-between items-center text-foreground opacity-80">
                <p>&copy; {new Date().getFullYear()} Nicolas Lobo. {dict.footer.rights}</p>
                <div className="flex gap-4">
                    {/* Add social links here later */}
                </div>
            </div>
        </footer>
    );
}
