import type { Locale } from "@/dictionaries";

export type ProjectCategory = "systems" | "interfaces" | "automation";

export interface PreviewScreen {
    tab: string;
    title: string;
    caption: string;
    status: string;
    metricLabel: string;
    metricValue: string;
    rows: Array<{ label: string; value: string }>;
}

export interface LocalizedProject {
    title: string;
    categoryLabel: string;
    summary: string;
    demoLabel?: string;
    context: string;
    features: string[];
    decisions: string[];
    flow: string[];
    learning: string;
    screens: PreviewScreen[];
}

export interface Project {
    slug: string;
    category: ProjectCategory;
    technologies: string[];
    publicSource?: string;
    liveDemo?: string;
    privateCase: boolean;
    copy: Record<Locale, LocalizedProject>;
}

export const projects: Project[] = [
    {
        slug: "gestao-de-estoque-e-vendas",
        category: "systems",
        technologies: ["Next.js", "TypeScript", "Drizzle", "LibSQL"],
        privateCase: true,
        copy: {
            pt: {
                title: "Gestão de estoque e vendas",
                categoryLabel: "Sistemas",
                summary: "Estoque, vendas, recebimentos e caixa conectados em um painel operacional.",
                context: "Quando cada movimentação é anotada em um lugar diferente, entender o estado real da operação fica mais difícil. O projeto reúne estoque, vendas, caixa, comissões e recebíveis em uma ferramenta interna.",
                features: [
                    "Acompanhamento de produtos e movimentações de estoque.",
                    "Registro de vendas, recebimentos e operações de caixa.",
                    "Visão de comissões e valores a receber.",
                ],
                decisions: [
                    "Organização das regras do domínio junto ao fluxo de dados.",
                    "Uso de Next.js e TypeScript na aplicação, com Drizzle ORM e LibSQL na persistência.",
                    "Painel pensado para consulta e operação frequentes.",
                ],
                flow: ["Movimentação", "Regra da operação", "Registro relacionado", "Visão do caixa"],
                learning: "A clareza do histórico depende de tratar cada alteração como parte de uma mesma operação, em vez de uma linha isolada numa tela.",
                screens: [
                    {
                        tab: "Visão geral",
                        title: "Resumo operacional",
                        caption: "ESTOQUE / CAIXA / RECEBÍVEIS",
                        status: "Atualizado agora",
                        metricLabel: "Itens acompanhados",
                        metricValue: "42",
                        rows: [{ label: "Entradas hoje", value: "06" }, { label: "Vendas registradas", value: "12" }, { label: "A receber", value: "04" }],
                    },
                    {
                        tab: "Movimentações",
                        title: "Atividade recente",
                        caption: "REGISTRO DE MOVIMENTOS",
                        status: "Tudo conciliado",
                        metricLabel: "Movimentos no período",
                        metricValue: "28",
                        rows: [{ label: "Entrada de produto", value: "Estoque" }, { label: "Venda registrada", value: "Caixa" }, { label: "Recebimento", value: "Cliente" }],
                    },
                    {
                        tab: "Relatórios",
                        title: "Leitura da operação",
                        caption: "RELATÓRIO DEMONSTRATIVO",
                        status: "Período atual",
                        metricLabel: "Itens em atenção",
                        metricValue: "03",
                        rows: [{ label: "Estoque baixo", value: "Revisar" }, { label: "Recebíveis abertos", value: "Acompanhar" }, { label: "Caixa", value: "Conferido" }],
                    },
                ],
            },
            en: {
                title: "Stock and sales management",
                categoryLabel: "Systems",
                summary: "Stock, sales, incoming payments, and cash operations in one operations panel.",
                context: "When each movement is recorded in a different place, it is harder to understand the real state of an operation. This internal tool brings stock, sales, cash, commissions, and receivables together.",
                features: [
                    "Product and stock movement tracking.",
                    "Sales, incoming payments, and cash operation records.",
                    "Commission and receivables overview.",
                ],
                decisions: [
                    "Domain rules organized alongside the data flow.",
                    "Next.js and TypeScript for the application, with Drizzle ORM and LibSQL for persistence.",
                    "A panel designed for frequent lookup and day-to-day operations.",
                ],
                flow: ["Movement", "Business rule", "Related record", "Cash overview"],
                learning: "A clear history depends on treating each change as part of the same operation instead of an isolated row on a screen.",
                screens: [
                    {
                        tab: "Overview",
                        title: "Operations summary",
                        caption: "STOCK / CASH / RECEIVABLES",
                        status: "Updated just now",
                        metricLabel: "Items tracked",
                        metricValue: "42",
                        rows: [{ label: "Entries today", value: "06" }, { label: "Sales recorded", value: "12" }, { label: "Receivables", value: "04" }],
                    },
                    {
                        tab: "Movements",
                        title: "Recent activity",
                        caption: "MOVEMENT RECORDS",
                        status: "All reconciled",
                        metricLabel: "Movements in period",
                        metricValue: "28",
                        rows: [{ label: "Product entry", value: "Stock" }, { label: "Sale recorded", value: "Cash" }, { label: "Payment received", value: "Customer" }],
                    },
                    {
                        tab: "Reports",
                        title: "Operations review",
                        caption: "ILLUSTRATIVE REPORT",
                        status: "Current period",
                        metricLabel: "Items to review",
                        metricValue: "03",
                        rows: [{ label: "Low stock", value: "Review" }, { label: "Open receivables", value: "Follow up" }, { label: "Cash", value: "Checked" }],
                    },
                ],
            },
        },
    },
    {
        slug: "planejamento-pessoal-integrado",
        category: "systems",
        technologies: ["Next.js", "React", "TypeScript", "Supabase"],
        privateCase: true,
        copy: {
            pt: {
                title: "Planejamento pessoal integrado",
                categoryLabel: "Sistemas",
                summary: "Agenda, tarefas e rotinas organizadas para diferentes horizontes de tempo.",
                context: "Planos diários, semanais e mensais costumam se fragmentar entre listas e calendários. Este produto reúne compromissos, tarefas e rotinas em um espaço pessoal com acesso por conta.",
                features: [
                    "Visões para hoje, semana e mês.",
                    "Tarefas com prazo, duração e próxima ação.",
                    "Compromissos e rotinas no mesmo planejamento.",
                ],
                decisions: [
                    "Organização da interface em torno de prioridades e próximos passos.",
                    "Next.js, React e TypeScript na camada web, com Supabase para recursos de conta e dados.",
                    "Conteúdo local e estrutura responsiva para consulta em diferentes telas.",
                ],
                flow: ["Capturar compromisso", "Organizar prioridade", "Planejar o período", "Revisar progresso"],
                learning: "Um bom planejador reduz a troca de contexto e ajuda a transformar intenção em próxima ação.",
                screens: [
                    {
                        tab: "Hoje",
                        title: "Seu dia, em foco",
                        caption: "SEGUNDA-FEIRA / HOJE",
                        status: "3 prioridades",
                        metricLabel: "Próxima ação",
                        metricValue: "09:30",
                        rows: [{ label: "Revisar entregas", value: "30 min" }, { label: "Enviar proposta", value: "A seguir" }, { label: "Caminhada", value: "Rotina" }],
                    },
                    {
                        tab: "Semana",
                        title: "Distribuição da semana",
                        caption: "PLANEJAMENTO SEMANAL",
                        status: "Ritmo equilibrado",
                        metricLabel: "Blocos planejados",
                        metricValue: "16",
                        rows: [{ label: "Segunda", value: "4 blocos" }, { label: "Quarta", value: "3 blocos" }, { label: "Sexta", value: "Revisão" }],
                    },
                    {
                        tab: "Rotinas",
                        title: "Hábitos que se repetem",
                        caption: "ROTINAS PESSOAIS",
                        status: "2 de 3 concluídas",
                        metricLabel: "Sequência atual",
                        metricValue: "08 dias",
                        rows: [{ label: "Leitura", value: "Concluída" }, { label: "Alongamento", value: "Concluído" }, { label: "Revisão do dia", value: "Pendente" }],
                    },
                ],
            },
            en: {
                title: "Integrated personal planning",
                categoryLabel: "Systems",
                summary: "Calendar, tasks, and routines organized across different time horizons.",
                context: "Daily, weekly, and monthly plans often get split across lists and calendars. This product brings commitments, tasks, and routines into a personal space with account-based access.",
                features: [
                    "Today, week, and month views.",
                    "Tasks with a due date, duration, and next action.",
                    "Commitments and routines in the same plan.",
                ],
                decisions: [
                    "An interface organized around priorities and next steps.",
                    "Next.js, React, and TypeScript for the web layer, with Supabase for account and data features.",
                    "Local content and responsive structure for different screens.",
                ],
                flow: ["Capture a commitment", "Set a priority", "Plan the period", "Review progress"],
                learning: "A useful planner reduces context switching and turns intentions into a clear next action.",
                screens: [
                    {
                        tab: "Today",
                        title: "Your day, in focus",
                        caption: "MONDAY / TODAY",
                        status: "3 priorities",
                        metricLabel: "Next action",
                        metricValue: "09:30",
                        rows: [{ label: "Review deliveries", value: "30 min" }, { label: "Send proposal", value: "Next" }, { label: "Walk", value: "Routine" }],
                    },
                    {
                        tab: "Week",
                        title: "Shape the week",
                        caption: "WEEKLY PLANNING",
                        status: "Balanced pace",
                        metricLabel: "Planned blocks",
                        metricValue: "16",
                        rows: [{ label: "Monday", value: "4 blocks" }, { label: "Wednesday", value: "3 blocks" }, { label: "Friday", value: "Review" }],
                    },
                    {
                        tab: "Routines",
                        title: "Habits that repeat",
                        caption: "PERSONAL ROUTINES",
                        status: "2 of 3 complete",
                        metricLabel: "Current streak",
                        metricValue: "08 days",
                        rows: [{ label: "Reading", value: "Complete" }, { label: "Stretching", value: "Complete" }, { label: "Daily review", value: "Pending" }],
                    },
                ],
            },
        },
    },
    {
        slug: "landing-page-negocio-local",
        category: "interfaces",
        technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
        privateCase: true,
        copy: {
            pt: {
                title: "Landing page para negócio local",
                categoryLabel: "Interfaces",
                summary: "Uma apresentação comercial que organiza conteúdo, galeria, dúvidas e contato.",
                context: "Um negócio local precisa explicar rapidamente o que oferece e como iniciar uma conversa. A página combina mensagem institucional, galeria, perguntas frequentes e chamadas de contato numa experiência adaptável ao celular.",
                features: [
                    "Estrutura comercial com caminhos claros para saber mais e entrar em contato.",
                    "Galeria visual organizada para navegação em telas menores.",
                    "Perguntas frequentes e informações úteis agrupadas por assunto.",
                ],
                decisions: [
                    "Componentes em React e TypeScript com uma composição responsiva.",
                    "Tailwind CSS para ritmo visual consistente e Framer Motion em transições pontuais.",
                    "Identidade e conteúdo apresentados aqui foram neutralizados para proteger o cliente.",
                ],
                flow: ["Entender a oferta", "Explorar a galeria", "Tirar dúvidas", "Iniciar contato"],
                learning: "Em uma página comercial, hierarquia e clareza do próximo passo são tão importantes quanto o acabamento visual.",
                screens: [
                    {
                        tab: "Apresentação",
                        title: "Uma oferta clara",
                        caption: "APRESENTAÇÃO COMERCIAL",
                        status: "Visão inicial",
                        metricLabel: "Seções da página",
                        metricValue: "04",
                        rows: [{ label: "Proposta", value: "Direta" }, { label: "Conteúdo", value: "Escaneável" }, { label: "Contato", value: "Visível" }],
                    },
                    {
                        tab: "Galeria",
                        title: "Detalhes em contexto",
                        caption: "GALERIA DEMONSTRATIVA",
                        status: "Toque para explorar",
                        metricLabel: "Coleções visuais",
                        metricValue: "03",
                        rows: [{ label: "Ambientes", value: "Galeria" }, { label: "Serviços", value: "Resumo" }, { label: "Destaques", value: "Seleção" }],
                    },
                    {
                        tab: "Perguntas",
                        title: "Dúvidas respondidas",
                        caption: "PERGUNTAS FREQUENTES",
                        status: "Informação organizada",
                        metricLabel: "Tópicos",
                        metricValue: "05",
                        rows: [{ label: "Como funciona?", value: "Resposta" }, { label: "Onde fica?", value: "Resposta" }, { label: "Como falar?", value: "Contato" }],
                    },
                ],
            },
            en: {
                title: "Landing page for a local business",
                categoryLabel: "Interfaces",
                summary: "A commercial introduction that brings together a gallery, common questions, and contact.",
                context: "A local business needs to quickly explain what it offers and how to start a conversation. This page combines an introduction, gallery, frequently asked questions, and contact paths in a mobile-friendly experience.",
                features: [
                    "Commercial structure with clear paths to learn more and get in touch.",
                    "A visual gallery organized for smaller screens.",
                    "Frequently asked questions and useful information grouped by topic.",
                ],
                decisions: [
                    "React and TypeScript components in a responsive composition.",
                    "Tailwind CSS for a consistent visual rhythm, with Framer Motion for focused transitions.",
                    "The identity and content shown here are neutralized to protect the client.",
                ],
                flow: ["Understand the offer", "Explore the gallery", "Get answers", "Start a conversation"],
                learning: "On a commercial page, hierarchy and a clear next step matter as much as visual finish.",
                screens: [
                    {
                        tab: "Overview",
                        title: "A clear offer",
                        caption: "COMMERCIAL INTRODUCTION",
                        status: "First view",
                        metricLabel: "Page sections",
                        metricValue: "04",
                        rows: [{ label: "Value proposition", value: "Direct" }, { label: "Content", value: "Scannable" }, { label: "Contact", value: "Visible" }],
                    },
                    {
                        tab: "Gallery",
                        title: "Details in context",
                        caption: "ILLUSTRATIVE GALLERY",
                        status: "Tap to explore",
                        metricLabel: "Visual collections",
                        metricValue: "03",
                        rows: [{ label: "Spaces", value: "Gallery" }, { label: "Services", value: "Summary" }, { label: "Highlights", value: "Selection" }],
                    },
                    {
                        tab: "Questions",
                        title: "Answers in one place",
                        caption: "FREQUENTLY ASKED QUESTIONS",
                        status: "Information organized",
                        metricLabel: "Topics",
                        metricValue: "05",
                        rows: [{ label: "How does it work?", value: "Answer" }, { label: "Where is it?", value: "Answer" }, { label: "How to reach us?", value: "Contact" }],
                    },
                ],
            },
        },
    },
    {
        slug: "python-tools-hub",
        category: "automation",
        technologies: ["Python", "Streamlit", "Pillow", "ONNX Runtime"],
        publicSource: "https://github.com/nicolasalobo/python-tools-hub",
        privateCase: false,
        copy: {
            pt: {
                title: "Python Tools Hub",
                categoryLabel: "Automação",
                summary: "Um hub web que encontra scripts Python e os apresenta como ferramentas.",
                context: "Pequenos scripts são úteis, mas podem ficar difíceis de descobrir e operar por quem não programa. O hub identifica ferramentas numa pasta de scripts e apresenta cada uma numa interface Streamlit.",
                features: [
                    "Descoberta automática de scripts adicionados à pasta de ferramentas.",
                    "Processamento de sprites e remoção de fundo em imagens.",
                    "Execução de ferramentas e preparação de arquivos para exportação ZIP.",
                ],
                decisions: [
                    "Cada ferramenta permanece isolada e pode ser adicionada como um script Python.",
                    "Streamlit fornece a interface web; Pillow e ONNX Runtime apoiam tarefas de imagem.",
                    "O README descreve uma instalação local e um launcher extensível sem configuração por ferramenta.",
                ],
                flow: ["Adicionar script", "Detectar ferramenta", "Executar no navegador", "Exportar resultado"],
                learning: "Uma convenção simples de extensão transforma scripts individuais num catálogo que outras pessoas conseguem usar.",
                screens: [
                    {
                        tab: "Ferramentas",
                        title: "Ferramentas disponíveis",
                        caption: "PYTHON TOOLS HUB",
                        status: "4 detectadas",
                        metricLabel: "Scripts encontrados",
                        metricValue: "04",
                        rows: [{ label: "Processador de sprites", value: "Imagem" }, { label: "Remoção de fundo", value: "Imagem" }, { label: "Exportação ZIP", value: "Arquivos" }],
                    },
                    {
                        tab: "Sprites",
                        title: "Preparar uma folha",
                        caption: "PROCESSAMENTO DE SPRITES",
                        status: "Ajustes prontos",
                        metricLabel: "Quadros detectados",
                        metricValue: "16",
                        rows: [{ label: "Tamanho do quadro", value: "Configurável" }, { label: "Margem", value: "Configurável" }, { label: "Saída", value: "PNG" }],
                    },
                    {
                        tab: "Exportar",
                        title: "Empacotar resultados",
                        caption: "EXPORTAÇÃO DE ARQUIVOS",
                        status: "Pronto para baixar",
                        metricLabel: "Arquivos de saída",
                        metricValue: "03",
                        rows: [{ label: "Imagem tratada", value: "PNG" }, { label: "Prévia", value: "PNG" }, { label: "Pacote", value: "ZIP" }],
                    },
                ],
            },
            en: {
                title: "Python Tools Hub",
                categoryLabel: "Automation",
                summary: "A web hub that discovers Python scripts and presents them as tools.",
                context: "Small scripts are useful, but can be hard to discover and operate for people who do not code. The hub finds tools in a scripts folder and presents each one through a Streamlit interface.",
                features: [
                    "Automatic discovery of scripts added to the tools folder.",
                    "Sprite processing and image background removal.",
                    "Tool execution and preparation of files for ZIP export.",
                ],
                decisions: [
                    "Each tool stays isolated and can be added as a Python script.",
                    "Streamlit provides the web interface; Pillow and ONNX Runtime support image tasks.",
                    "The README describes a local setup and an extensible launcher without per-tool configuration.",
                ],
                flow: ["Add a script", "Discover the tool", "Run it in the browser", "Export the result"],
                learning: "A small convention for extensions turns individual scripts into a catalog other people can use.",
                screens: [
                    {
                        tab: "Tools",
                        title: "Available tools",
                        caption: "PYTHON TOOLS HUB",
                        status: "4 discovered",
                        metricLabel: "Scripts found",
                        metricValue: "04",
                        rows: [{ label: "Sprite processor", value: "Image" }, { label: "Background removal", value: "Image" }, { label: "ZIP export", value: "Files" }],
                    },
                    {
                        tab: "Sprites",
                        title: "Prepare a sprite sheet",
                        caption: "SPRITE PROCESSING",
                        status: "Ready to adjust",
                        metricLabel: "Frames detected",
                        metricValue: "16",
                        rows: [{ label: "Frame size", value: "Configurable" }, { label: "Padding", value: "Configurable" }, { label: "Output", value: "PNG" }],
                    },
                    {
                        tab: "Export",
                        title: "Bundle the results",
                        caption: "FILE EXPORT",
                        status: "Ready to download",
                        metricLabel: "Output files",
                        metricValue: "03",
                        rows: [{ label: "Processed image", value: "PNG" }, { label: "Preview", value: "PNG" }, { label: "Bundle", value: "ZIP" }],
                    },
                ],
            },
        },
    },
    {
        slug: "gestor-de-contratos-demo",
        category: "systems",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Radix UI"],
        publicSource: "https://github.com/nicolasalobo/gestor-contratos-portfolio",
        liveDemo: "https://gestor-contratos-portfolio.vercel.app",
        privateCase: false,
        copy: {
            pt: {
                title: "Gestor de contratos",
                categoryLabel: "Sistemas",
                summary: "Painel interativo para acompanhar contratos, etapas, despesas e pagamentos com dados fictícios.",
                demoLabel: "Abrir demonstração",
                context: "Este case apresenta uma versão simplificada de um gestor de contratos comercial. A demonstração usa apenas dados fictícios, não tem login, banco de dados ou integrações externas; as alterações ficam em memória e voltam aos dados iniciais ao recarregar.",
                features: [
                    "Dashboard financeiro com valores dos contratos, despesas e pagamentos.",
                    "Ficha de contrato com empresas, etapas, despesas e histórico.",
                    "Cadastro, edição e exclusão demonstráveis de contratos e despesas.",
                    "Atualização de etapas e marcação de pagamentos como pagos.",
                ],
                decisions: [
                    "Preservar os principais fluxos do produto numa interface enxuta e responsiva.",
                    "Substituir banco e autenticação por dados tipados e estado compartilhado em memória.",
                    "Recalcular indicadores financeiros a partir das alterações feitas na demonstração.",
                ],
                flow: ["Dashboard financeiro", "Abrir contrato", "Atualizar etapas e despesas", "Revisar pagamentos"],
                learning: "Uma versão demonstrativa pode apresentar fluxos reais sem expor documentos, credenciais ou dados de clientes.",
                screens: [
                    {
                        tab: "Visão geral",
                        title: "Resumo financeiro",
                        caption: "CONTRATOS / DESPESAS / PAGAMENTOS",
                        status: "Dados demonstrativos",
                        metricLabel: "Contratos ativos",
                        metricValue: "08",
                        rows: [{ label: "Valor contratado", value: "R$ 2,4 mi" }, { label: "Despesas", value: "R$ 380 mil" }, { label: "A pagar", value: "R$ 215 mil" }],
                    },
                    {
                        tab: "Contratos",
                        title: "Acompanhamento de contratos",
                        caption: "EMPRESAS / ETAPAS / HISTÓRICO",
                        status: "Busca e filtros ativos",
                        metricLabel: "Etapas concluídas",
                        metricValue: "24",
                        rows: [{ label: "Consultoria de projeto", value: "Em andamento" }, { label: "Empresa responsável", value: "Contratada" }, { label: "Última atualização", value: "Hoje" }],
                    },
                    {
                        tab: "Pagamentos",
                        title: "Pagamentos do período",
                        caption: "FORNECEDORES / CONSULTORES",
                        status: "Atualização interativa",
                        metricLabel: "Pagamentos pendentes",
                        metricValue: "03",
                        rows: [{ label: "Consultor técnico", value: "Aguardando" }, { label: "Apoio de campo", value: "Programado" }, { label: "Fornecedor", value: "Pago" }],
                    },
                ],
            },
            en: {
                title: "Contract Manager",
                categoryLabel: "Systems",
                summary: "Interactive dashboard for contracts, milestones, expenses, and payments using fictional data.",
                demoLabel: "Open demo",
                context: "This case presents a simplified version of a commercial contract management product. The demo uses fictional data only, with no login, database, or external integrations; changes stay in memory and reset when the page reloads.",
                features: [
                    "Financial dashboard for contract values, expenses, and payments.",
                    "Contract details with companies, milestones, expenses, and history.",
                    "Interactive create, edit, and delete flows for contracts and expenses.",
                    "Milestone updates and payment completion actions.",
                ],
                decisions: [
                    "Keep the product's main workflows in a focused, responsive interface.",
                    "Replace database and authentication with typed mock data and shared in-memory state.",
                    "Recalculate financial indicators from changes made in the demo.",
                ],
                flow: ["Financial dashboard", "Open a contract", "Update milestones and expenses", "Review payments"],
                learning: "A demo version can present real workflows without exposing documents, credentials, or client data.",
                screens: [
                    {
                        tab: "Overview",
                        title: "Financial summary",
                        caption: "CONTRACTS / EXPENSES / PAYMENTS",
                        status: "Demo data",
                        metricLabel: "Active contracts",
                        metricValue: "08",
                        rows: [{ label: "Contract value", value: "R$ 2.4M" }, { label: "Expenses", value: "R$ 380K" }, { label: "To pay", value: "R$ 215K" }],
                    },
                    {
                        tab: "Contracts",
                        title: "Contract tracking",
                        caption: "COMPANIES / MILESTONES / HISTORY",
                        status: "Search and filters active",
                        metricLabel: "Completed milestones",
                        metricValue: "24",
                        rows: [{ label: "Project consulting", value: "In progress" }, { label: "Responsible company", value: "Contracted" }, { label: "Last update", value: "Today" }],
                    },
                    {
                        tab: "Payments",
                        title: "Payments this period",
                        caption: "VENDORS / CONSULTANTS",
                        status: "Interactive updates",
                        metricLabel: "Pending payments",
                        metricValue: "03",
                        rows: [{ label: "Technical consultant", value: "Pending" }, { label: "Field support", value: "Scheduled" }, { label: "Vendor", value: "Paid" }],
                    },
                ],
            },
        },
    },
];

export const experiences = {
    pt: [
        {
            role: "Desenvolvedor Full Stack",
            organization: "Projeto de gestão financeira",
            date: "Mar/2026 - Atual",
            summary: "Desenvolvimento de um sistema de gestão financeira para controle de contratos corporativos.",
            details: [
                "Atuação do modelo de dados à interface final.",
                "Modelagem de contratos, autenticação e controle de acesso por níveis de permissão.",
            ],
            technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
        },
        {
            role: "Desenvolvedor / TI",
            organization: "Empresa de engenharia",
            date: "Mai/2025 - Atual",
            summary: "Modernização de uma intranet legada e suporte a sistemas internos.",
            details: [
                "Evolução de estágio para contratação PJ em maio de 2026.",
                "Migração de uma intranet antiga para uma aplicação Next.js e apoio técnico a usuários internos.",
            ],
            technologies: ["Next.js", "PHP", "Linux"],
        },
        {
            role: "Desenvolvedor bolsista",
            organization: "C3SL / UFPR",
            date: "2024",
            summary: "Manutenção de sistema interno e desenvolvimento de páginas do processo seletivo.",
            details: [
                "Participação na evolução do sistema de administração interno.",
                "Desenvolvimento de páginas e pesquisas para o processo seletivo de calouros.",
            ],
            technologies: ["Next.js", "Tailwind CSS"],
        },
    ],
    en: [
        {
            role: "Full Stack Developer",
            organization: "Financial management project",
            date: "Mar/2026 - Present",
            summary: "Development of a financial management system for corporate contract tracking.",
            details: [
                "Work spanning data modeling through the final interface.",
                "Contract modeling, authentication, and role-based access control.",
            ],
            technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
        },
        {
            role: "Developer / IT",
            organization: "Engineering company",
            date: "May/2025 - Present",
            summary: "Modernizing a legacy intranet and supporting internal systems.",
            details: [
                "Progressed from internship to a contractor role in May 2026.",
                "Migrated an older intranet to a Next.js application and supported internal users.",
            ],
            technologies: ["Next.js", "PHP", "Linux"],
        },
        {
            role: "Scholarship Developer",
            organization: "C3SL / UFPR",
            date: "2024",
            summary: "Maintained an internal system and developed pages for the admissions process.",
            details: [
                "Contributed to the evolution of the internal administration system.",
                "Built pages and surveys for incoming student selection.",
            ],
            technologies: ["Next.js", "Tailwind CSS"],
        },
    ],
} as const;

export const skills = [
    { name: "TypeScript", projects: ["gestao-de-estoque-e-vendas", "planejamento-pessoal-integrado", "landing-page-negocio-local"] },
    { name: "Next.js", projects: ["gestao-de-estoque-e-vendas", "planejamento-pessoal-integrado"] },
    { name: "React", projects: ["planejamento-pessoal-integrado", "landing-page-negocio-local"] },
    { name: "Drizzle", projects: ["gestao-de-estoque-e-vendas"] },
    { name: "LibSQL", projects: ["gestao-de-estoque-e-vendas"] },
    { name: "Supabase", projects: ["planejamento-pessoal-integrado"] },
    { name: "Vite", projects: ["landing-page-negocio-local"] },
    { name: "Tailwind CSS", projects: ["landing-page-negocio-local"] },
    { name: "Python", projects: ["python-tools-hub"] },
    { name: "Streamlit", projects: ["python-tools-hub"] },
    { name: "Pillow", projects: ["python-tools-hub"] },
    { name: "Java", projects: ["biblioteca-de-jogos-java"] },
];

export interface LaboratoryProject {
    title: string;
    description: string;
    status: string;
    kind: "shared" | "academic";
    href?: string;
}

export const laboratoryProjects: Record<Locale, LaboratoryProject[]> = {
    pt: [
        {
            title: "Organização compartilhada",
            description: "Um aplicativo em desenvolvimento para coordenar calendário, despesas e tarefas em conjunto.",
            status: "Em desenvolvimento",
            kind: "shared",
        },
        {
            title: "Biblioteca de Jogos em Java",
            description: "Catálogo em memória que explora tabela hash, busca e diferentes critérios de ordenação.",
            status: "Projeto acadêmico",
            kind: "academic",
            href: "https://github.com/nicolasalobo/Faculdade/tree/main/Quarto%20periodo/Resolu%C3%A7%C3%A3o%20de%20Problemas%20Computa%C3%A7%C3%A3o/RA3/Biblioteca",
        },
    ],
    en: [
        {
            title: "Shared planning",
            description: "An in-development app for coordinating a calendar, expenses, and tasks together.",
            status: "In development",
            kind: "shared",
        },
        {
            title: "Java Game Library",
            description: "An in-memory catalog exploring a hash table, search, and different sorting criteria.",
            status: "Academic project",
            kind: "academic",
            href: "https://github.com/nicolasalobo/Faculdade/tree/main/Quarto%20periodo/Resolu%C3%A7%C3%A3o%20de%20Problemas%20Computa%C3%A7%C3%A3o/RA3/Biblioteca",
        },
    ],
};
