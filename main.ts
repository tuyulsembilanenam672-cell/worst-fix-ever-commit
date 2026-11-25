// Worst Fix Ever: Funniest Commit Message — make.fun entry.
// Writes one commit-message line to /output/entry.txt, enforcing the
// kit gate at runtime: UTF-8, 1-100 code points, single line, not blank.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const LINE = "fix: renamed the bug to 'legacy behavior'. docs updated. bug closed.";
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;
const MAX_CHARS = 100;

function codePoints(text: string): number {
  return [...text].length;
}

function gate(line: string): void {
  const n = codePoints(line);
  if (n < 1 || n > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${n}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

process.umask(0o022);
gate(LINE);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");
chmodSync(OUT_DIR, 0o755);
chmodSync(OUT_FILE, 0o644);
console.log(`wrote ${codePoints(LINE)} characters to ${OUT_FILE}`);
