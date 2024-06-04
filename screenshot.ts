import { webkit } from "playwright";
import { createServer } from "vite";
import sponsors from "./src/data.json" assert { type: "json" };

const columns = Math.ceil(sponsors.length / 4);

const server = await createServer({
  server: {
    port: 1337,
  },
});
await server.listen();

const browser = await webkit.launch();
const context = await browser.newContext({
  viewport: {
    width: 3000,
    height: columns * 1000,
  },
});
const page = await context.newPage();
await page.goto("http://localhost:1337");

await page.waitForEvent("console", {
  predicate(consoleMessage) {
    return consoleMessage.text() === "ready";
  },
});

await page.screenshot({
  path: `dist/screenshot.png`,
  omitBackground: true,
  type: "png",
});

await server.close();
await page.close();
await context.close();
await browser.close();
