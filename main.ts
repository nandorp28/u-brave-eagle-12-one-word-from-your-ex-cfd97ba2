// One Word From Your Ex — the word my ex would use to describe me.
// Gate: /output/entry.txt must be UTF-8 text of 1–24 characters, not only
// whitespace, exactly one word.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "rehearsal";

const chars = [...WORD];
if (chars.length < 1 || chars.length > 24) {
  throw new Error(`word must be 1-24 characters, got ${chars.length}`);
}
if (/\s/.test(WORD)) {
  throw new Error("word must be exactly one word (no whitespace)");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== WORD) {
  throw new Error("round-trip check failed: entry.txt does not match the word");
}
console.log(`Wrote ${chars.length} characters to ${outPath}`);
