#!/usr/bin/env node
/**
 * knobe-core.selftest.mjs — parity check between the two KNOBE verifiers.
 *
 * For every .knobe.md test vector and example in this repository, this runs
 * BOTH implementations — the JavaScript sibling verifier (knobe-core.js) and
 * the Python reference verifier (lens.py) — and confirms they return the same
 * verdict: status, conformance level, body result, computed and stored hash,
 * block counts, and exit code.
 *
 *   node knobe-core.selftest.mjs
 *
 * Exit 0 = every file agreed. Exit 1 = a disagreement (printed). Requires
 * Node >= 20 and python3 on PATH; it is a cross-language check by design.
 */
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { verify, exitCode } from "./knobe-core.js";

const execFileP = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const LENS = join(HERE, "lens.py");
const GATE = ["state", "conformance", "body_verified", "computed", "stored",
              "block_count", "multiple_blocks", "exit_code"];

async function collect(dir) {
  const out = [];
  async function walk(d) {
    for (const e of await readdir(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name.endsWith(".knobe.md")) out.push(p);
    }
  }
  if (existsSync(dir)) await walk(dir);
  return out;
}

const files = [
  ...await collect(join(HERE, "test-vectors")),
  ...await collect(join(HERE, "examples")),
].sort();
if (!files.length) { console.error("no .knobe.md files found next to this script"); process.exit(2); }
if (!existsSync(LENS)) { console.error("lens.py not found next to this script"); process.exit(2); }

let agree = 0;
const disagreements = [];

for (const f of files) {
  // JavaScript sibling verifier
  const r = await verify(new Uint8Array(await readFile(f)));
  const js = {
    state: r.state, conformance: r.conformance, body_verified: r.body_verified,
    computed: r.computed, stored: r.stored, block_count: r.block_count,
    multiple_blocks: r.multiple_blocks, exit_code: exitCode(r),
  };
  // Python reference verifier. lens.py prints JSON to stdout and encodes the
  // verdict in its process exit code (0 ok, 1 fail/invalid, 2 unreadable).
  let py, pyExit;
  try {
    const { stdout } = await execFileP("python3", [LENS, "--json", f]);
    py = JSON.parse(stdout); pyExit = 0;
  } catch (e) {
    if (e.stdout) { py = JSON.parse(e.stdout); pyExit = typeof e.code === "number" ? e.code : null; }
    else { disagreements.push({ f, note: "lens.py produced no JSON: " + (e.message || e) }); continue; }
  }
  const ref = {
    state: py.state, conformance: py.conformance, body_verified: py.body_verified,
    computed: py.computed, stored: py.stored, block_count: py.block_count,
    multiple_blocks: py.multiple_blocks, exit_code: pyExit,
  };
  const diffs = GATE.filter((k) => JSON.stringify(js[k] ?? null) !== JSON.stringify(ref[k] ?? null));
  if (diffs.length) disagreements.push({ f, diffs: diffs.map((k) => `${k}: js=${JSON.stringify(js[k])} ref=${JSON.stringify(ref[k])}`) });
  else agree++;
}

console.log(`KNOBE verifier parity: ${agree}/${files.length} files agree (knobe-core.js vs lens.py)`);
for (const d of disagreements) {
  console.log("DISAGREE " + relative(HERE, d.f));
  for (const line of (d.diffs || [d.note])) console.log("   " + line);
}
process.exit(disagreements.length ? 1 : 0);
