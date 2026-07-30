import { copyFile, cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const serverDirectory = resolve(projectRoot, "dist/server");
const hostingDirectory = resolve(projectRoot, "dist/.openai");
const clientDirectory = resolve(projectRoot, "dist/client");

await mkdir(serverDirectory, { recursive: true });
await mkdir(hostingDirectory, { recursive: true });
await mkdir(clientDirectory, { recursive: true });
await copyFile(
  resolve(projectRoot, "sites/worker.js"),
  resolve(serverDirectory, "index.js")
);
await copyFile(
  resolve(projectRoot, ".openai/hosting.json"),
  resolve(hostingDirectory, "hosting.json")
);
for (const path of [
  "_astro",
  "privacy",
  "request-assessment",
  "terms",
  "thank-you",
  "index.html",
  "robots.txt",
  "sitemap.xml"
]) {
  await cp(resolve(projectRoot, "dist", path), resolve(clientDirectory, path), {
    recursive: true
  });
}

console.log("Sites deployment entrypoint prepared.");
