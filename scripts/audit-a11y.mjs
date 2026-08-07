/**
 * Structural accessibility sweep across every route, at desktop and mobile.
 *
 * Checks: one h1 per page, no skipped heading levels, alt on every image,
 * accessible names on links/buttons/controls, no duplicate ids, no horizontal
 * overflow, and no console or page errors.
 *
 * Playwright is intentionally NOT a dependency of this project — the client
 * should not carry a 100MB browser download to build the site. To run:
 *
 *   npm i -D playwright && npx playwright install chromium
 *   npm run dev                       # in another terminal
 *   node scripts/audit-a11y.mjs       # BASE=http://localhost:3000 to override
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const PAGES = [
  "/", "/about", "/services", "/services/villa-transformation",
  "/projects", "/projects/ghaf-house", "/process", "/testimonials",
  "/insights", "/insights/designing-for-forty-five-degrees",
  "/contact", "/privacy", "/terms",
];
const WIDTHS = [1440, 360];

const browser = await chromium.launch();
let total = 0;

for (const width of WIDTHS) {
  console.log(`\n=== ${width}px ===`);
  for (const path of PAGES) {
    const page = await browser.newPage({ viewport: { width, height: width < 600 ? 780 : 900 } });
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e).split("\n")[0]));
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().split("\n")[0]));

    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.9) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    const f = await page.evaluate(() => {
      const out = [];
      const txt = (el) => (el?.textContent || "").trim();
      const name = (el) =>
        el.getAttribute("aria-label") ||
        txt(document.getElementById(el.getAttribute("aria-labelledby") || "")) ||
        txt(el) || el.getAttribute("title") || "";

      document.querySelectorAll("img").forEach((i) => {
        if (!i.hasAttribute("alt")) out.push(`img without alt: ${i.src.slice(-40)}`);
      });
      document.querySelectorAll("a[href]").forEach((a) => {
        if (!name(a)) out.push(`link without name: ${a.getAttribute("href")}`);
      });
      document.querySelectorAll("button").forEach((b) => {
        if (!name(b)) out.push("button without name");
      });
      document.querySelectorAll("input,select,textarea").forEach((c) => {
        if (c.type === "hidden") return;
        if (!(c.labels?.length || c.getAttribute("aria-label") || c.getAttribute("aria-labelledby")))
          out.push(`unlabelled control: ${c.name || c.id}`);
      });

      const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
      const h1 = hs.filter((h) => h.tagName === "H1").length;
      if (h1 !== 1) out.push(`h1 count = ${h1}`);
      let prev = 0;
      for (const h of hs) {
        const lvl = +h.tagName[1];
        if (prev && lvl > prev + 1) out.push(`heading skip h${prev}->h${lvl}: "${txt(h).slice(0, 40)}"`);
        prev = lvl;
      }

      const seen = new Set();
      document.querySelectorAll("[id]").forEach((el) => {
        if (seen.has(el.id)) out.push(`duplicate id: ${el.id}`);
        seen.add(el.id);
      });

      if (document.documentElement.scrollWidth > innerWidth + 1)
        out.push(`h-overflow: ${document.documentElement.scrollWidth} > ${innerWidth}`);
      return out;
    });

    const all = [...f, ...errs.map((e) => `console: ${e.slice(0, 90)}`)];
    total += all.length;
    console.log(`${all.length ? "FAIL" : "OK  "} ${path.padEnd(42)} ${all.length}`);
    all.slice(0, 5).forEach((x) => console.log(`      · ${x}`));
    await page.close();
  }
}

await browser.close();
console.log(`\n${total} issue(s) across ${PAGES.length * WIDTHS.length} page renders.`);
