// Unsent: The Micro-Confession Sprint — round 2 entry.
// Writes one two-part micro-confession to /output/entry.txt:
// a "To:" line naming who it was meant for, then the unsent line
// itself, exactly as it was typed, with nothing after it.
// Deterministic: the same fixed text on every run, no randomness,
// no network, no input.

import { mkdirSync, writeFileSync } from "node:fs";

// The confession: a guilt the writer can only rehearse, never say.
// The addressee is essential — the message only makes sense to the
// widow of the brother whose fatal shift the writer pushed him to take.
// "The last one he ever worked" is the hinge: it is why the apology
// can never be delivered, and why it can never be taken back either.
const ENTRY =
  "To: my brother's widow\n" +
  "I was the one who told him to take the night shift, the last one he ever worked, and I've rehearsed this apology in the car a hundred times and never once said it out loud.\n";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  // Gate: the entry must be 1-260 UTF-8 characters, not only whitespace.
  const charCount = [...ENTRY].length;
  if (charCount < 1 || charCount > 260) {
    throw new Error(`entry is ${charCount} characters, must be 1-260`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // Exactly two parts: a "To:" line, then exactly one message line.
  const lines = ENTRY.replace(/\n$/, "").split("\n");
  if (lines.length !== 2 || !lines[0].startsWith("To:")) {
    throw new Error("entry must be a To: line plus exactly one message line");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
}

main();
