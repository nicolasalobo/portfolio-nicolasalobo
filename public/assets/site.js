(() => {
  "use strict";
  const one = (s, root = document) => root.querySelector(s);
  const many = (s, root = document) => [...root.querySelectorAll(s)];
  const text = (s, value, root = document) => {
    const node = one(s, root);
    if (node && value != null) node.textContent = value;
  };
  const root = document.documentElement;
  const lang = root.lang;
  const translated = lang === "pt";
  const pad = (n) => String(n).padStart(2, "0");

  const mobile = one(".mobile-menu");
  const panel = one("#mobile-navigation");
  const menuTrigger = one(".menu-trigger");
  const closeButton = one(".mobile-menu-heading button");
  let menuOpen = false;
  const setMenu = (open, restoreFocus = true) => {
    if (!mobile || !panel || !menuTrigger) return;
    if (menuOpen !== open && !open && restoreFocus) menuTrigger.focus();
    menuOpen = open;
    mobile.classList.toggle("is-open", open);
    mobile.setAttribute("aria-hidden", String(!open));
    menuTrigger.setAttribute("aria-expanded", String(open));
    panel.inert = !open;
    if (open) closeButton?.focus();
    document.body.style.overflow = open ? "hidden" : "";
  };
  menuTrigger?.addEventListener("click", () => setMenu(!menuOpen));
  closeButton?.addEventListener("click", () => setMenu(false));
  one(".mobile-menu-backdrop")?.addEventListener("click", () => setMenu(false));
  many(".mobile-menu-links a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (!menuOpen) return;
    if (event.key === "Escape") return setMenu(false);
    if (event.key !== "Tab") return;
    const focusable = many("a, button", panel);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  matchMedia("(min-width: 951px)").addEventListener("change", (e) => {
    if (e.matches && menuOpen) setMenu(false, false);
  });

  const theme = one(".theme-button");
  const setThemeLabel = () => {
    const light = root.dataset.theme === "light";
    const label = light
      ? translated ? "Ativar tema escuro" : "Use dark theme"
      : translated ? "Ativar tema claro" : "Use light theme";
    theme?.setAttribute("aria-label", label);
    if (theme) theme.title = label;
  };
  setThemeLabel();
  theme?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("portfolio-theme", root.dataset.theme); } catch {}
    setThemeLabel();
  });

  one(".language-button")?.addEventListener("click", () => {
    const alternate = lang === "pt" ? "en" : "pt";
    location.assign(location.pathname.replace(/^\/(pt|en)(?=\/|$)/, "/" + alternate) + location.search + location.hash);
  });

  const progress = one(".scroll-progress");
  let queued = false;
  const updateProgress = () => {
    queued = false;
    const maximum = Math.max(1, root.scrollHeight - innerHeight);
    const p = Math.min(1, Math.max(0, scrollY / maximum));
    progress?.setAttribute("aria-valuenow", String(Math.round(p * 100)));
    if (progress?.firstElementChild) progress.firstElementChild.style.transform = "scaleX(" + p + ")";
    let section = "";
    for (const name of ["projects", "experience", "about", "lab", "contact"]) {
      if (one("#" + name)?.getBoundingClientRect().top < 120) section = name;
    }
    many(".nav-link").forEach((link) => link.classList.toggle("is-active", !!section && link.hash === "#" + section));
  };
  const queueProgress = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(updateProgress);
    }
  };
  addEventListener("scroll", queueProgress, { passive: true });
  addEventListener("resize", queueProgress);
  queueProgress();

  const copy = one(".button-copy");
  copy?.addEventListener("click", async () => {
    const input = one("#contact-email");
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input.value);
    } catch {
      input.select();
      if (!document.execCommand("copy")) return;
    }
    const node = [...copy.childNodes].find((n) => n.nodeType === Node.TEXT_NODE);
    if (node) {
      const label = node.data;
      node.data = translated ? "E-mail copiado" : "Email copied";
      setTimeout(() => { node.data = label; }, 1800);
    }
  });

  function setupMap(items) {
    const nodes = many(".map-node");
    const lines = many(".map-line");
    const section = one(".map-selection");
    if (!section) return;
    nodes.forEach((node, index) => node.addEventListener("click", () => {
      const item = items[index];
      if (!item) return;
      nodes.forEach((n, i) => {
        n.classList.toggle("is-selected", i === index);
        n.setAttribute("aria-pressed", String(i === index));
        lines[i]?.classList.toggle("is-active", i === index);
      });
      text(".selection-index .mono", pad(index + 1) + " / " + pad(items.length), section);
      text(".selection-copy h3", item.title, section);
      text(".selection-copy p", item.summary, section);
      one(".text-link", section)?.setAttribute("href", "/" + lang + "/projects/" + item.slug);
    }));
  }

  function setupProjects(skills, copy) {
    const filters = many(".filter-button");
    const grid = one(".project-grid");
    if (!grid) return;
    const cards = many(".project-card", grid);
    const chip = many(".skill-chip");
    const counter = one(".result-count-number");
    const category = Object.keys(copy.projects.filters);
    let filter = "all", selectedSkill = "";
    filters.forEach((button, index) => button.addEventListener("click", () => {
      filter = category[index] || "all";
      grid.dataset.filter = filter;
      filters.forEach((b, i) => {
        b.classList.toggle("is-selected", i === index);
        b.setAttribute("aria-pressed", String(i === index));
      });
      if (counter) counter.textContent = pad(cards.filter((c) => filter === "all" || c.dataset.category === filter).length);
    }));
    chip.forEach((button, index) => button.addEventListener("click", () => {
      const item = skills[index];
      if (!item) return;
      selectedSkill = selectedSkill === item.name ? "" : item.name;
      chip.forEach((b, i) => b.setAttribute("aria-pressed", String(skills[i]?.name === selectedSkill)));
      cards.forEach((card) => {
        const active = skills.find((s) => s.name === selectedSkill);
        card.dataset.dimmed = String(!!active && !active.projects.includes(card.dataset.projectId));
      });
    }));
  }

  function setupPreviews(screens) {
    const tabs = many(".preview-tab");
    const tabPanel = one(".preview-tab-panel");
    if (!tabPanel || !tabs.length) return;
    const mockup = one(".project-mockup", tabPanel);
    const rows = one(".mockup-rows", tabPanel);
    const rowTemplate = rows?.firstElementChild?.cloneNode(true);
    const caption = one(".mockup-app-name", tabPanel);
    const status = one(".mockup-status", tabPanel);
    function select(index, focus) {
      const screen = screens[index];
      if (!screen || !mockup) return;
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.classList.toggle("is-selected", selected);
        tab.tabIndex = selected ? 0 : -1;
      });
      tabPanel.setAttribute("aria-labelledby", tabs[index].id);
      if (caption) caption.textContent = "N / " + screen.caption;
      if (status) {
        const indicator = status.firstElementChild?.cloneNode(true);
        status.textContent = screen.status;
        if (indicator) status.prepend(indicator);
      }
      mockup.setAttribute("aria-label", (translated ? "Composição demonstrativa: " : "Demonstration composition: ") + screen.title);
      text(".mockup-page-heading h4", screen.title, tabPanel);
      text(".mockup-page-heading .eyebrow", screen.caption, tabPanel);
      text(".mockup-metric span", screen.metricLabel, tabPanel);
      text(".mockup-metric strong", screen.metricValue, tabPanel);
      if (rows && rowTemplate) {
        rows.replaceChildren(...screen.rows.map((row) => {
          const element = rowTemplate.cloneNode(true);
          const label = element.children[0];
          const icon = label.firstElementChild?.cloneNode(true);
          label.textContent = row.label;
          if (icon) label.prepend(icon);
          element.children[1].textContent = row.value;
          return element;
        }));
      }
      text(".preview-window-counter", pad(index + 1) + " / " + pad(tabs.length));
      if (focus) tabs[index]?.focus();
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i, false));
      tab.addEventListener("keydown", (event) => {
        let next = i;
        if (event.key === "ArrowLeft") next = (i + tabs.length - 1) % tabs.length;
        else if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        select(next, true);
      });
    });
  }

  const id = root.dataset.page;
  if (/^(pt|en)-[a-z0-9-]+$/.test(id || "")) {
    fetch("/assets/pages/" + id + ".json")
      .then((response) => { if (!response.ok) throw new Error("Missing interaction data"); return response.json(); })
      .then((data) => {
        if (data.map) setupMap(data.map);
        if (data.skills) setupProjects(data.skills, data.copy);
        if (data.screens) setupPreviews(data.screens);
      })
      .catch(() => { /* Links and server-rendered content still work without scripts. */ });
  }
})();
