import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const serverDirectory = resolve(projectRoot, "dist/server");
const hostingDirectory = resolve(projectRoot, "dist/.openai");

await mkdir(serverDirectory, { recursive: true });
await mkdir(hostingDirectory, { recursive: true });
await copyFile(
  resolve(projectRoot, "sites/worker.js"),
  resolve(serverDirectory, "index.js")
);
await copyFile(
  resolve(projectRoot, ".openai/hosting.json"),
  resolve(hostingDirectory, "hosting.json")
);

console.log("Sites deployment entrypoint prepared.");
