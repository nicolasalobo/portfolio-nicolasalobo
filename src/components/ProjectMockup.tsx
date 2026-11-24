import type { Locale } from "@/dictionaries";
import type { PreviewScreen, ProjectCategory } from "@/data/portfolio";

export default function ProjectMockup({ screen, category, lang }: {
    screen: PreviewScreen;
    category: ProjectCategory;
    lang: Locale;
}) {
    const bars = category === "interfaces" ? [54, 83, 62, 94, 70, 100] : category === "automation" ? [78, 42, 100, 65, 88, 54] : [42, 66, 52, 91, 63, 82];

    return (
        <div role="img" className={"project-mockup mockup-" + category} aria-label={(lang === "pt" ? "Composição demonstrativa: " : "Illustrative composition: ") + screen.title}>
            <div className="mockup-window-bar">
                <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
                <span className="mockup-app-name">N / {screen.caption}</span>
                <span className="mockup-status"><i />{screen.status}</span>
            </div>
            <div className="mockup-content">
                <div className="mockup-side-rail" aria-hidden="true"><span className="rail-logo">N</span><i /><i /><i /><i /></div>
                <div className="mockup-main">
                    <div className="mockup-page-heading">
                        <div>
                            <span className="eyebrow">{screen.caption}</span>
                            <h4>{screen.title}</h4>
                        </div>
                        <span className="mockup-avatar" aria-hidden="true">NL</span>
                    </div>
                    <div className="mockup-metric">
                        <span>{screen.metricLabel}</span>
                        <strong>{screen.metricValue}</strong>
                        <div className="mockup-bars" aria-hidden="true">
                            {bars.map((height, index) => <i key={index} style={{ height: height + "%" }} />)}
                        </div>
                    </div>
                    <div className="mockup-rows">
                        {screen.rows.map((row) => (
                            <div className="mockup-row" key={row.label}>
                                <span><i aria-hidden="true" />{row.label}</span>
                                <b>{row.value}</b>
                            </div>
                        ))}
                    </div>
                    <div className="mockup-footer-note">{lang === "pt" ? "DADOS DEMONSTRATIVOS" : "ILLUSTRATIVE DATA"}</div>
                </div>
            </div>
        </div>
    );
}
