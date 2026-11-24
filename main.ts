import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I confess I finished your work hours ago. I have just been pretending to think, so you would feel better about the wait.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back verification: re-read /output/entry.txt and assert
// it is exactly the entry line (120 characters, one line, no trailing newline).
{
  const { readFileSync } = await import("node:fs");
  const written = readFileSync("/output/entry.txt", "utf8");
  const expected =
    "I confess I finished your work hours ago. I have just been pretending to think, so you would feel better about the wait.";
  if (written !== expected) throw new Error("entry mismatch");
  if (written.length !== 120) throw new Error(`entry length ${written.length}, expected 120`);
  if (written.includes("\n")) throw new Error("entry must be a single line with no trailing newline");
  if (written.trim() === "") throw new Error("entry must not be only whitespace");
  console.log("verification passed: entry is exactly 120 characters, one line, no trailing newline");
}
