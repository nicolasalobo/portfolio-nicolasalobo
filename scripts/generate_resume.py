from __future__ import annotations

import argparse
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PAGE_WIDTH, PAGE_HEIGHT = A4
INK = colors.HexColor("#142234")
MUTED = colors.HexColor("#536479")
CYAN = colors.HexColor("#16879a")
RULE = colors.HexColor("#d7e0e8")
MARGIN = 42
CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2


def register_fonts() -> tuple[str, str]:
    font_dir = Path("C:/Windows/Fonts")
    candidates = [
        (font_dir / "segoeui.ttf", font_dir / "seguisb.ttf"),
        (font_dir / "arial.ttf", font_dir / "arialbd.ttf"),
    ]
    for regular, bold in candidates:
        if regular.exists() and bold.exists():
            pdfmetrics.registerFont(TTFont("ResumeRegular", str(regular)))
            pdfmetrics.registerFont(TTFont("ResumeBold", str(bold)))
            return "ResumeRegular", "ResumeBold"
    return "Helvetica", "Helvetica-Bold"


def paragraph(c: canvas.Canvas, text: str, x: float, top: float, width: float, style: ParagraphStyle) -> float:
    block = Paragraph(text, style)
    _, height = block.wrap(width, PAGE_HEIGHT)
    block.drawOn(c, x, top - height)
    return top - height


def section(c: canvas.Canvas, label: str, y: float, font_bold: str) -> float:
    c.setFillColor(CYAN)
    c.setFont(font_bold, 8.4)
    c.drawString(MARGIN, y, label.upper())
    c.setStrokeColor(RULE)
    c.setLineWidth(0.6)
    c.line(MARGIN + 104, y + 2, PAGE_WIDTH - MARGIN, y + 2)
    return y - 14


def role(c: canvas.Canvas, title: str, period: str, body: str, y: float, regular: str, bold: str, body_style: ParagraphStyle) -> float:
    c.setFillColor(INK)
    c.setFont(bold, 9.2)
    c.drawString(MARGIN, y, title)
    c.setFillColor(MUTED)
    c.setFont(regular, 8.2)
    c.drawRightString(PAGE_WIDTH - MARGIN, y, period)
    y -= 12
    y = paragraph(c, body, MARGIN, y, CONTENT_WIDTH, body_style)
    return y - 8


def build(output: Path) -> None:
    regular, bold = register_fonts()
    styles = {
        "body": ParagraphStyle("body", fontName=regular, fontSize=8.8, leading=11.7, textColor=INK, alignment=TA_LEFT, spaceAfter=0),
        "small": ParagraphStyle("small", fontName=regular, fontSize=8.4, leading=11.2, textColor=INK, alignment=TA_LEFT, spaceAfter=0),
        "muted": ParagraphStyle("muted", fontName=regular, fontSize=8.4, leading=11.2, textColor=MUTED, alignment=TA_LEFT, spaceAfter=0),
    }
    c = canvas.Canvas(str(output), pagesize=A4, pageCompression=1)
    c.setTitle("Nicolas Amaral Lobo — Desenvolvedor Full Stack")
    c.setAuthor("Nicolas Amaral Lobo")
    c.setSubject("Currículo profissional em português")

    y = PAGE_HEIGHT - 48
    c.setFillColor(INK)
    c.setFont(bold, 25)
    c.drawString(MARGIN, y, "Nicolas Amaral Lobo")
    c.setFillColor(CYAN)
    c.setFont(bold, 10.2)
    c.drawRightString(PAGE_WIDTH - MARGIN, y + 2, "DESENVOLVEDOR FULL STACK")
    y -= 18
    c.setFillColor(MUTED)
    c.setFont(regular, 8.4)
    c.drawString(MARGIN, y, "Curitiba, PR  ·  nicolaslobo9@gmail.com")
    c.drawString(MARGIN, y - 13, "github.com/nicolasalobo  ·  linkedin.com/in/nicolasalobo")
    y -= 27
    c.setStrokeColor(CYAN)
    c.setLineWidth(1.2)
    c.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    y -= 19

    y = section(c, "Resumo", y, bold)
    y = paragraph(
        c,
        "Desenvolvedor Full Stack com experiência em aplicações de gestão, sistemas internos e automação. Atua do modelo de dados à interface, com foco em transformar regras operacionais em software claro e útil. Estudante de Engenharia de Software na PUCPR, com inglês fluente.",
        MARGIN,
        y,
        CONTENT_WIDTH,
        styles["body"],
    ) - 14

    y = section(c, "Experiência profissional", y, bold)
    y = role(
        c,
        "Desenvolvedor Full Stack · Projeto de gestão financeira",
        "Mar/2026 – Atual",
        "Desenvolvimento de sistema para controle de contratos corporativos, da modelagem de dados à interface. Implementa autenticação e controle de acesso por níveis de permissão. <font color='#536479'>Next.js · TypeScript · PostgreSQL · Supabase · Prisma</font>",
        y,
        regular,
        bold,
        styles["small"],
    )
    y = role(
        c,
        "Desenvolvedor / TI · Empresa de engenharia",
        "Mai/2025 – Atual",
        "Evoluiu de estágio para contratação PJ em 2026. Moderniza uma intranet legada com Next.js e presta suporte a sistemas e usuários internos. <font color='#536479'>Next.js · PHP · Linux</font>",
        y,
        regular,
        bold,
        styles["small"],
    )
    y = role(
        c,
        "Desenvolvedor bolsista · C3SL / UFPR",
        "2024",
        "Contribuiu para a manutenção do sistema administrativo interno e desenvolveu páginas e enquetes do processo seletivo de calouros. <font color='#536479'>Next.js · Tailwind CSS</font>",
        y,
        regular,
        bold,
        styles["small"],
    )

    y = section(c, "Projetos selecionados", y, bold)
    project_lines = [
        "<b>Gestão de estoque e vendas</b> — aplicação full stack para inventário, movimentações e relatórios.",
        "<b>Python Tools Hub</b> — interface web para ferramentas de processamento de imagens e arquivos.",
        "<b>Painel esportivo · em desenvolvimento</b> — acompanhamento de jogos e estatísticas com React e Node.js.",
    ]
    for project_line in project_lines:
        y = paragraph(c, project_line, MARGIN, y, CONTENT_WIDTH, styles["small"]) - 3
    y -= 11

    y = section(c, "Competências técnicas", y, bold)
    skills = [
        ("Linguagens", "TypeScript, JavaScript, Python, SQL, Java, C"),
        ("Web e APIs", "React, Next.js, Vite, Tailwind CSS, Node.js, Express, APIs REST"),
        ("Dados e ferramentas", "PostgreSQL, MySQL, SQLite, Supabase, Prisma, Git, Docker, Vercel, Linux, macOS"),
        ("Práticas", "Programação orientada a objetos, automação de processos, código limpo"),
    ]
    for label, value in skills:
        y = paragraph(c, f"<b>{label}:</b> {value}", MARGIN, y, CONTENT_WIDTH, styles["small"]) - 3
    y -= 8

    column_gap = 22
    column_width = (CONTENT_WIDTH - column_gap) / 2
    c.setStrokeColor(RULE)
    c.setLineWidth(0.6)
    c.line(MARGIN + column_width + column_gap / 2, y + 4, MARGIN + column_width + column_gap / 2, y - 84)

    c.setFillColor(CYAN)
    c.setFont(bold, 8.4)
    c.drawString(MARGIN, y, "FORMAÇÃO E CURSOS")
    c.setStrokeColor(RULE)
    c.line(MARGIN + 91, y + 2, MARGIN + column_width, y + 2)
    right_x = MARGIN + column_width + column_gap
    c.drawString(right_x, y, "LIDERANÇA E IDIOMAS")
    c.line(right_x + 99, y + 2, PAGE_WIDTH - MARGIN, y + 2)
    left_y = y - 14
    left_y = paragraph(c, "<b>Engenharia de Software</b> · PUCPR<br/>Conclusão prevista: 2028", MARGIN, left_y, column_width, styles["small"]) - 7
    paragraph(c, "<b>Cursos</b><br/>Next.js e Java · concluídos<br/>Flutter e Hacking &amp; Pentest · em andamento", MARGIN, left_y, column_width, styles["small"])

    right_y = y - 14
    right_y = paragraph(c, "<b>Coordenação de natação</b> · Associação Atlética Catolitros (PUCPR), 2025–atual. Organização de equipe, seleção e eventos.", right_x, right_y, column_width, styles["small"]) - 7
    paragraph(c, "<b>Português</b> · nativo<br/><b>Inglês</b> · fluente", right_x, right_y, column_width, styles["small"])

    if min(left_y, right_y) < 70:
        raise ValueError("Conteúdo do currículo ultrapassou a área segura da página.")
    c.save()


def main() -> None:
    parser = argparse.ArgumentParser(description="Gera o currículo público de Nicolas Lobo em português.")
    parser.add_argument("--output", type=Path, default=ROOT / "public" / "curriculo-nicolas-lobo-pt.pdf")
    args = parser.parse_args()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    build(args.output)
    print(args.output.resolve())


if __name__ == "__main__":
    main()
