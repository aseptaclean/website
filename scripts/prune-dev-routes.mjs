import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const distDev = resolve(process.cwd(), "dist/dev");

if (existsSync(distDev)) {
  rmSync(distDev, { recursive: true, force: true });
  console.log("Pruned /dev/* from production build output (dist/dev).");
}
