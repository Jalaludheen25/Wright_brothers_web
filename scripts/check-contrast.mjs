/**
 * WCAG contrast guard.
 *
 * Reads the palette straight out of globals.css, then scans the components for
 * every `text-<token>/<alpha>` actually in use and checks it against the
 * surface it sits on. Run with `npm run check:contrast`.
 *
 * Large display text is allowed the 3:1 threshold (WCAG 1.4.3 "large scale"),
 * which is why `brass` is listed as a display-only accent.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const css = await fs.readFile(path.join(ROOT, "src/app/globals.css"), "utf8");

/** Pull `--color-x: #hex;` declarations out of the @theme block. */
const palette = Object.fromEntries(
  [...css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-f]{6})/gi)].map(([, k, v]) => [
    k,
    v.toLowerCase(),
  ])
);

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (hi + 0.05) / (lo + 0.05);
};
const flatten = (fg, bg, alpha) => {
  const f = hex(fg);
  const b = hex(bg);
  return (
    "#" +
    f
      .map((v, i) => Math.round((v * alpha + b[i] * (1 - alpha)) * 255))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
};

/** Text tokens paired with the surfaces they are used on. */
const PAIRS = [
  ["slate", ["stone", "alabaster"], 4.5],
  ["ash", ["stone", "alabaster"], 4.5],
  ["ink", ["stone", "alabaster"], 4.5],
  ["brass-deep", ["stone", "alabaster"], 4.5],
  ["brass-light", ["ink", "graphite"], 4.5],
  ["alabaster", ["ink", "graphite"], 4.5],
  // Display-only accent: never used below 24px, so 3:1 applies.
  ["brass", ["stone", "alabaster"], 3],
  ["brass", ["ink"], 4.5],
];

const failures = [];
const report = [];

for (const [token, surfaces, min] of PAIRS) {
  for (const surface of surfaces) {
    const fg = palette[token];
    const bg = palette[surface];
    if (!fg || !bg) {
      failures.push(`unknown token: ${token} or ${surface}`);
      continue;
    }
    const r = ratio(fg, bg);
    const ok = r >= min;
    if (!ok) failures.push(`${token} on ${surface}: ${r.toFixed(2)} < ${min}`);
    report.push(
      `${ok ? "PASS" : "FAIL"}  ${`${token} on ${surface}`.padEnd(30)} ${r
        .toFixed(2)
        .padEnd(6)} (min ${min})`
    );
  }
}

/* --- Alpha text actually used in the source ------------------------------ */

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = await walk(path.join(ROOT, "src"));
const alphaUses = new Map();

for (const file of files) {
  const source = await fs.readFile(file, "utf8");
  for (const [, token, alpha] of source.matchAll(
    /(?:^|\s|")text-(alabaster|ink)\/(\d{1,3})\b/g
  )) {
    const key = `${token}/${alpha}`;
    if (!alphaUses.has(key)) alphaUses.set(key, []);
    alphaUses.get(key).push(path.relative(ROOT, file));
  }
}

for (const [key, where] of [...alphaUses].sort()) {
  const [token, alphaStr] = key.split("/");
  const alpha = Number(alphaStr) / 100;
  const surface = token === "alabaster" ? palette.ink : palette.stone;
  const flat = flatten(palette[token], surface, alpha);
  const r = ratio(flat, surface);
  const ok = r >= 4.5;
  if (!ok) {
    failures.push(
      `text-${key} → ${r.toFixed(2)} < 4.5 (${where.length} use${
        where.length > 1 ? "s" : ""
      }, e.g. ${where[0]})`
    );
  }
  report.push(
    `${ok ? "PASS" : "FAIL"}  ${`text-${key}`.padEnd(30)} ${r
      .toFixed(2)
      .padEnd(6)} (min 4.5)`
  );
}

console.log(report.join("\n"));

if (failures.length) {
  console.error(`\n${failures.length} contrast failure(s):`);
  failures.forEach((f) => console.error(`  · ${f}`));
  process.exit(1);
}

console.log(`\nAll ${report.length} checked pairs meet WCAG AA.`);
