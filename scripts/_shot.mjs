// Throwaway visual-check harness (CDP), so animations and video run in real time.
//   node scripts/_shot.mjs <url> <heading|view:heading|__top> <out> [waitMs]
// Env: SHOT_OFFSET extra scroll px, SHOT_W/SHOT_H viewport, SHOT_CLICK selector.
import { writeFileSync } from "node:fs";

const [, , url, needle, outfile, extraWait = "5000"] = process.argv;
const PORT = 9223;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((res) => {
    const n = ++id;
    pending.set(n, res);
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (r?.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r?.result?.value;
};

const W = Number(process.env.SHOT_W ?? 1440);
const H = Number(process.env.SHOT_H ?? 900);
const pattern = needle.replace(/^view:/, "");
const find = `[...document.querySelectorAll('h1,h2,h3')].find(e =>
  new RegExp(${JSON.stringify(pattern)}, 'i').test(e.textContent.replace(/\\u00a0/g,' ')))`;

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: W,
  height: H,
  deviceScaleFactor: 2,
  mobile: false,
});
await send("Page.navigate", { url });
await wait(6000);

let box;
if (needle === "__top") {
  box = { x: 0, y: 0, width: W, height: H };
} else {
  await evaluate(`
    (() => {
      const h = ${find};
      if (!h) return -1;
      const y = h.getBoundingClientRect().top + window.scrollY - 140
        + ${Number(process.env.SHOT_OFFSET ?? 0)};
      window.scrollTo(0, y);
      document.scrollingElement.scrollTop = y;
      return y;
    })()
  `);
  await wait(Number(extraWait));

  if (process.env.SHOT_CLICK) {
    await evaluate(
      `document.querySelector(${JSON.stringify(process.env.SHOT_CLICK)})?.click(), null`
    );
    await wait(2500);
  }

  if (needle.startsWith("view:") || process.env.SHOT_CLICK) {
    const y = await evaluate("window.scrollY");
    box = { x: 0, y: process.env.SHOT_CLICK ? y : y, width: W, height: H };
  } else {
    box = JSON.parse(
      await evaluate(`
      (() => {
        const h = ${find};
        const s = h.closest('section') || document.body;
        const r = s.getBoundingClientRect();
        return JSON.stringify({
          x: r.left + window.scrollX, y: r.top + window.scrollY,
          width: r.width, height: Math.min(r.height, 2400),
        });
      })()`)
    );
  }
}
await wait(Number(extraWait));
console.log("box:", box);

const shot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: !(needle === "__top" || needle.startsWith("view:") || process.env.SHOT_CLICK),
  clip: { ...box, scale: 1.0 },
});
writeFileSync(outfile, Buffer.from(shot.data, "base64"));
console.log("written", outfile);
ws.close();
