"use client";

import { useRef, useState } from "react";
import type { Dictionary, Locale } from "@/dictionaries";

const email = "nicolaslobo9@gmail.com";

export default function Contact({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    const emailRef = useRef<HTMLInputElement>(null);
    const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

    const copyEmail = async () => {
        try {
            if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
            await navigator.clipboard.writeText(email);
            setCopyState("copied");
        } catch {
            const field = emailRef.current;
            if (field) {
                field.focus();
                field.select();
                try {
                    const copied = document.execCommand("copy");
                    setCopyState(copied ? "copied" : "failed");
                } catch {
                    setCopyState("failed");
                }
            } else {
                setCopyState("failed");
            }
        }
    };

    return (
        <section id="contact" className="content-section contact-section" aria-labelledby="contact-heading">
            <div className="container">
                <div className="contact-panel">
                    <div className="contact-main">
                        <p className="eyebrow">{dict.contact.eyebrow}</p>
                        <h2 id="contact-heading">{dict.contact.title}</h2>
                        <p>{dict.contact.description}</p>
                        <div className="contact-actions">
                            <a className="button button-primary" href={"mailto:" + email}>
                                {dict.contact.email}<span aria-hidden="true">↗</span>
                            </a>
                            <button className="button button-copy" type="button" onClick={copyEmail}>
                                <span aria-hidden="true">{copyState === "copied" ? "✓" : "▢"}</span>
                                {copyState === "copied" ? dict.contact.copied : dict.contact.copy}
                            </button>
                        </div>
                        <div className="copy-fallback">
                            <label className="mono" htmlFor="contact-email">{dict.contact.select}</label>
                            <input
                                ref={emailRef}
                                id="contact-email"
                                type="text"
                                readOnly
                                value={email}
                                onFocus={(event) => event.currentTarget.select()}
                                onClick={(event) => event.currentTarget.select()}
                            />
                        </div>
                        <p className="copy-status" role="status" aria-live="polite" aria-atomic="true">
                            {copyState === "copied" ? dict.contact.copied : copyState === "failed" ? dict.contact.copyFailed : ""}
                        </p>
                    </div>
                    <div className="contact-side">
                        <span className="contact-orbit contact-orbit-one" aria-hidden="true" />
                        <span className="contact-orbit contact-orbit-two" aria-hidden="true" />
                        <span className="contact-node" aria-hidden="true">N</span>
                        <div className="contact-links">
                            <a href="https://github.com/nicolasalobo" target="_blank" rel="noreferrer">
                                <span>{dict.contact.github}</span><span aria-hidden="true">↗</span>
                            </a>
                            <a href="https://www.linkedin.com/in/nicolasalobo" target="_blank" rel="noreferrer">
                                <span>{dict.contact.linkedin}</span><span aria-hidden="true">↗</span>
                            </a>
                            <a href="/curriculo-nicolas-lobo-pt.pdf" download>
                                <span>{lang === "pt" ? dict.contact.resume : "Download résumé · Portuguese"}</span><span aria-hidden="true">↓</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
