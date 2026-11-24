import Link from "next/link";

export default function NotFound() {
    return (
        <section className="not-found-section">
            <div className="container not-found-content">
                <span className="mono">404 / NOT FOUND</span>
                <h1>Página não encontrada <span>/ Page not found</span></h1>
                <p>O endereço pode ter mudado. Volte ao início para continuar explorando.</p>
                <p lang="en">This address may have changed. Return home to keep exploring.</p>
                <div className="not-found-links">
                    <Link className="button button-primary" href="/pt">Início em português</Link>
                    <Link className="button button-quiet" href="/en">English home</Link>
                </div>
            </div>
        </section>
    );
}
