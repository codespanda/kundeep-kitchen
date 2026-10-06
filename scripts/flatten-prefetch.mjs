// Workaround for the static export: Next writes segment-prefetch payloads as
// `out/menu/__next.menu/__PAGE__.txt`, but the client requests
// `out/menu/__next.menu.__PAGE__.txt`. Copy each nested file to the flat name so
// static hosts (GitHub Pages) serve it instead of a 404. Harmless if nothing matches.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = "out";
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of readdirSync(full)) {
        const src = join(full, file);
        const flat = join(dir, `${name}.${file}`);
        if (statSync(src).isFile() && !existsSync(flat)) {
          copyFileSync(src, flat);
          copied++;
        }
      }
    }
    walk(full);
  }
}

if (existsSync(outDir)) walk(outDir);
console.log(`flatten-prefetch: copied ${copied} prefetch file(s)`);
