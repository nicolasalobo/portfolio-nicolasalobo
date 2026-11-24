/* Use the default dark theme before paint, then honor the visitor's choice. */
try {
  document.documentElement.dataset.theme =
    localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
} catch {
  document.documentElement.dataset.theme = "dark";
}
