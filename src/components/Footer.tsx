import Link from "next/link";
import type { Dictionary, Locale } from "@/dictionaries";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <Link className="brand footer-brand" href={"/" + lang}>
                    <span className="brand-mark" aria-hidden="true">N</span>
                    <span>Nicolas <b>Lobo</b></span>
                </Link>
                <p className="footer-note">{dict.footer.built}</p>
                <p className="footer-rights">© {new Date().getFullYear()} Nicolas Lobo. {dict.footer.rights}</p>
                <a className="back-to-top mono" href="#main-content">
                    {lang === "pt" ? "VOLTAR AO TOPO" : "BACK TO TOP"} <span aria-hidden="true">↑</span>
                </a>
            </div>
        </footer>
    );
}
