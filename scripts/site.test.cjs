const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const { JSDOM } = require("jsdom");
const base = path.join(__dirname, "..", "public");
const read = (f) => fs.readFileSync(path.join(base, f), "utf8");
const theme = read("assets/theme.js");
const behavior = read("assets/site.js");
const slugs = ["gestao-de-estoque-e-vendas", "gestor-de-contratos-demo", "landing-page-negocio-local", "planejamento-pessoal-integrado", "python-tools-hub"];
async function open(route, lang = "pt") {
  const dom = new JSDOM(read(route + "/index.html"), {
    url: "https://portfolio-nicolasalobo-preview.vercel.app/" + route,
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const { window: w } = dom;
  w.matchMedia = () => ({ matches: false, addEventListener() {} });
  w.fetch = async (f) => ({ ok: true, json: async () => JSON.parse(read(f.slice(1))) });
  w.eval(theme);
  w.eval(behavior);
  await new Promise((r) => setImmediate(r));
  assert.equal(w.document.documentElement.lang, lang);
  return dom;
}
test("both home pages and all ten case pages are editable HTML with working localized links", async () => {
  for (const lang of ["pt", "en"]) {
    const home = await open(lang, lang);
    const d = home.window.document;
    assert.equal(d.documentElement.dataset.theme, "dark");
    assert.equal(d.querySelectorAll(".project-card").length, 5);
    assert.equal(d.querySelector(".hero-profile-image").getAttribute("src"), "/nicolas-lobo.png");
    assert.ok(d.querySelector('a[href="/curriculo-nicolas-lobo-pt.pdf"]'));
    for (const slug of slugs) {
      const route = lang + "/projects/" + slug;
      assert.ok(d.querySelector('a[href="/' + route + '"]'));
      const siteCase = await open(route, lang);
      assert.ok(siteCase.window.document.querySelector(".case-page"));
      assert.ok(siteCase.window.document.querySelector(".preview-tab"));
      assert.ok(!siteCase.window.document.body.textContent.includes("Tech Company Inc."));
      if (slug === "gestor-de-contratos-demo") {
        assert.ok(siteCase.window.document.querySelector('a[href="https://gestor-contratos-portfolio.vercel.app"]'));
      }
      siteCase.window.close();
    }
    home.window.close();
  }
});
test("map, project filters, technology highlighting, persistent dark/light theme, and menu focus", async () => {
  const dom = await open("pt");
  const { window: w } = dom, { document: d } = w;
  const map = [...d.querySelectorAll(".map-node")];
  map.at(-1).click();
  assert.equal(map.at(-1).getAttribute("aria-pressed"), "true");
  assert.match(d.querySelector(".map-selection a").getAttribute("href"), /gestor-de-contratos-demo/);
  d.querySelectorAll(".filter-button")[1].click();
  assert.equal(d.querySelector(".project-grid").dataset.filter, "systems");
  assert.equal(d.querySelector(".result-count-number").textContent, "03");
  d.querySelector(".skill-chip").click();
  assert.ok(d.querySelector("[data-dimmed=true]"));
  assert.equal(d.querySelector(".skill-chip").getAttribute("aria-pressed"), "true");
  d.querySelector(".theme-button").click();
  assert.equal(d.documentElement.dataset.theme, "light");
  assert.equal(w.localStorage.getItem("portfolio-theme"), "light");
  d.querySelector(".menu-trigger").click();
  assert.equal(d.querySelector(".menu-trigger").getAttribute("aria-expanded"), "true");
  assert.equal(d.activeElement, d.querySelector(".mobile-menu-heading button"));
  d.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Escape" }));
  assert.equal(d.querySelector(".menu-trigger").getAttribute("aria-expanded"), "false");
  dom.window.close();
});
test("contract case preview on both locales follows keyboard tabs and updates the content", async () => {
  for (const lang of ["pt","en"]) {
    const dom = await open(lang + "/projects/gestor-de-contratos-demo", lang);
    const { window: w } = dom, { document: d } = w;
    const tabs = [...d.querySelectorAll(".preview-tab")];
    const heading = d.querySelector(".mockup-page-heading h4");
    const first = heading.textContent;
    tabs[0].dispatchEvent(new w.KeyboardEvent("keydown", { key: "ArrowRight" }));
    assert.equal(tabs[1].getAttribute("aria-selected"), "true");
    assert.equal(d.activeElement, tabs[1]);
    assert.notEqual(heading.textContent, first);
    assert.equal(d.querySelector(".preview-tab-panel").getAttribute("aria-labelledby"), tabs[1].id);
    assert.ok(d.querySelector(".mockup-row b"));
    dom.window.close();
  }
});
