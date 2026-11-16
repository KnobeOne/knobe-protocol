#!/usr/bin/env node
/**
 * knobe-core.licence.selftest.mjs — license handling in knobe-core.js.
 *
 * Authoring never assigns a license: createKnobe() and transformKnobe() refuse
 * a missing, non-string or blank one, and seal an explicit one exactly as the
 * engine always has (the golden text below was produced by the engine before
 * the license became required, so an explicit license still seals byte for
 * byte the same). transformKnobe()'s refusal names the original's sealed
 * license, which governs whether the derivative is authorized.
 *
 * permits() reads licenses strictly: spelled-out Creative Commons terms carry
 * their meaning, a negated permissive name grants nothing, and a missing or
 * non-string license is evaluated as no license declared. Each bug case lists
 * the answer the engine gave before the fix; the new answer must equal the
 * expected one and must never be more permissive than the old one.
 *
 *   node knobe-core.licence.selftest.mjs
 *
 * Exit 0 = every check passed. Exit 1 = a failure (printed). Requires
 * Node >= 20; no dependencies.
 */
import { createHash } from "node:crypto";
import {
  verify, permits, createKnobe, transformKnobe, canonicalize, computePayloadHash,
} from "./knobe-core.js";

let passed = 0;
const failures = [];
function check(label, cond, detail) {
  if (cond) passed++;
  else failures.push(detail === undefined ? label : `${label}: ${detail}`);
}
async function refuses(label, fn, ...needles) {
  try {
    await fn();
    failures.push(`${label}: did not throw`);
  } catch (e) {
    const missing = needles.filter((n) => !String(e.message).includes(n));
    check(label, !missing.length, `message ${JSON.stringify(e.message)} lacks ${JSON.stringify(missing)}`);
  }
}
const sha256 = (s) => createHash("sha256").update(s).digest("hex");
const rank = (a) => (a === true ? 2 : a === "conditional" ? 1 : 0);
const show = (v) => (v === undefined ? "(missing)" : JSON.stringify(v));

// A hand-built KNOBE whose payload may break the rules createKnobe enforces
// (no license, or a license that is not a string). It still verifies: the
// seal is intact, conformance is invalid.
async function fileWith(extra) {
  const payload = {
    spec_version: "1.0", title: "License fixture", summary: "A hand-built fixture.",
    content_type: "original", created_date: "2026-11-10", privacy_level: "public",
    quarantine_status: "trusted", attribution: { sources: [{ author: "Test Author", contribution: "author" }] },
    ...extra,
  };
  payload.payload_hash = await computePayloadHash(payload);
  const b64 = Buffer.from(canonicalize(payload), "utf-8").toString("base64").replace(/.{1,76}/g, "$&\n");
  return `---\ntitle: "License fixture"\nspec_version: "1.0"\n---\n\nOne paragraph.\n\n`
    + `-----BEGIN KNOBE B64-----\n${b64}-----END KNOBE B64-----\n`;
}

// ---------------------------------------------------------------------------
// createKnobe: no license, no seal; an explicit license seals as before
// ---------------------------------------------------------------------------

const BASE = { title: "License fixture", summary: "A fixture sealed with a fixed date.", created_date: "2026-11-10" };
const make = (license) => createKnobe({
  fields: { ...BASE, ...(license === undefined ? {} : { license }) }, body: "One paragraph.", author: "Test Author",
});

for (const bad of [undefined, null, "", "   ", "\t\n", 5, true, {}, [], ["CC BY 4.0"]]) {
  await refuses(`createKnobe refuses license ${show(bad)}`, () => make(bad), "a license is required", "declare one explicitly");
}

// Sealed by the engine before this change, with no license given (it then
// defaulted to CC BY 4.0) and with "CC BY 4.0" given: both produced this file.
const GOLDEN_CC_BY = [
  "---",
  'title: "License fixture"',
  'spec_version: "1.0"',
  "content_type: original",
  "license: CC BY 4.0",
  'created_date: "2026-11-10"',
  "---",
  "",
  "One paragraph.",
  "",
  "-----BEGIN KNOBE B64-----",
  "eyJhdHRyaWJ1dGlvbiI6eyJzb3VyY2VzIjpbeyJhdXRob3IiOiJUZXN0IEF1dGhvciIsImNvbnRy",
  "aWJ1dGlvbiI6ImF1dGhvciJ9XX0sImJvZHlfaGFzaCI6IjJjMDY5NDczYzdiNDExNjg4NjY2NmU1",
  "OGVmNDljMjgzOTRlYmU5MDg5NDU3NGI0ZmY2OGEyMmQ5N2NhMjY4NGUiLCJjb250ZW50X3R5cGUi",
  "OiJvcmlnaW5hbCIsImNyZWF0ZWRfZGF0ZSI6IjIwMjYtMTEtMTAiLCJpZGVudGl0eV9zdGF0dXMi",
  "OiJkZWNsYXJlZCIsImxpY2Vuc2UiOiJDQyBCWSA0LjAiLCJwYXlsb2FkX2hhc2giOiJhMDExODJl",
  "MjU2NGQzNmNhYmZmNDQyNWQxOTJiNTJjZTg5ZmVlYzk1Zjg4N2QxMmYyMGE5ZWFiOGVjMjAyZDE3",
  "IiwicHJpdmFjeV9sZXZlbCI6InB1YmxpYyIsInF1YXJhbnRpbmVfc3RhdHVzIjoicXVhcmFudGlu",
  "ZSIsInNwZWNfdmVyc2lvbiI6IjEuMCIsInN1bW1hcnkiOiJBIGZpeHR1cmUgc2VhbGVkIHdpdGgg",
  "YSBmaXhlZCBkYXRlLiIsInRpdGxlIjoiTGljZW5zZSBmaXh0dXJlIn0=",
  "-----END KNOBE B64-----",
  "",
].join("\n");

// [license, payload_hash, SHA-256 of the whole file], from the engine before this change.
const GOLDEN = [
  ["CC BY 4.0", "a01182e2564d36cabff4425d192b52ce89feec95f887d12f20a9eab8ec202d17",
   "3f223dfb9ec25f607f2e02960042d81c58f74797ef9a24dc7ad95274554af8a7"],
  ["All rights reserved", "be4af6bed5c3244119d8548aecc595f2f22d6b8c66191f0b97c78e51b10bf121",
   "0bc04a673e8bf954f2739effba32dfbcd6fc10b41b86aa40d94846b1640fd08e"],
  ["CC0 1.0", "3d9c7a742a647926cf55c6fb46785f385fb8750841c63a11f5d300cc0bae3e0f",
   "71bc2cbccaf6884d2ed2aa6fc9ae30e412f031dbcf1470439857631270e220cd"],
  ["Creative Commons Attribution-NoDerivatives 4.0 International",
   "4b760fa0db64478287233562abc2186e05d92c79fd2b281212fcd8bcad3b363c",
   "f7ae8b2f9e50e7caae88047ff6d55b16bc4eb88908addfd32e6f408d28648185"],
  ["  MIT  ", "7ff8752830edf48797341e64d51642ef274c61c4ada8132cfb40530d02f2614b",
   "b364e6620a917a11b776f805c6a07202d8811ea5b9a047c4a9c33e564d915b22"],
];

{
  const r = await make("CC BY 4.0");
  check('createKnobe with "CC BY 4.0" emits the same file, byte for byte, as before', r.text === GOLDEN_CC_BY);
}
for (const [license, payloadHash, textHash] of GOLDEN) {
  try {
    const r = await make(license);
    check(`createKnobe seals ${show(license)} exactly as given`, r.payload.license === license, show(r.payload.license));
    check(`createKnobe with ${show(license)}: payload_hash unchanged`, r.payloadHash === payloadHash, r.payloadHash);
    check(`createKnobe with ${show(license)}: file unchanged`, sha256(r.text) === textHash);
    check(`createKnobe with ${show(license)}: self-check verified/valid`,
      r.report.state === "verified" && r.report.conformance === "valid", `${r.report.state}/${r.report.conformance}`);
  } catch (e) {
    failures.push(`createKnobe with ${show(license)} threw: ${e.message}`);
  }
}

// ---------------------------------------------------------------------------
// transformKnobe: refuses without a license, naming the original's license
// ---------------------------------------------------------------------------

const parent = await make("All rights reserved");
const derive = (license, original = parent.text) => transformKnobe(original, {
  fields: { title: "Derivative", summary: "A derivative.", created_date: "2026-11-10",
            ...(license === undefined ? {} : { license }) },
  body: "A shorter paragraph.", author: "Deriver",
});
for (const bad of [undefined, null, "", "   ", 5]) {
  await refuses(`transformKnobe refuses license ${show(bad)} and names the original's license`, () => derive(bad),
    "a license is required for the derivative", '"All rights reserved"',
    "governs whether this derivative is authorized", "explicitly", "does not inherit");
}
await refuses("transformKnobe names an original with no license as (missing)",
  async () => derive(undefined, await fileWith({})), "(missing)");
await refuses("transformKnobe still refuses a broken original first",
  () => derive(undefined, parent.text.replace("eyJhdHRy", "eyJhdHRz")), "unverified");
try {
  const d = await derive("CC BY 4.0");
  const parents = d.payload.parents || [];
  check("transformKnobe seals the derivative's declared license, not the original's", d.payload.license === "CC BY 4.0");
  check("transformKnobe keeps its content_type default", d.payload.content_type === "adaptation");
  check("transformKnobe chains the original", parents.length === 1 && parents[0].payload_hash === parent.payloadHash);
  check("transformKnobe's derivative verifies", d.report.state === "verified" && d.report.conformance === "valid");
} catch (e) {
  failures.push(`transformKnobe with a license threw: ${e.message}`);
}

// ---------------------------------------------------------------------------
// permits(): the license on its own (trusted, public, no attribution sources)
// ---------------------------------------------------------------------------

const solo = (license) => ({
  state: "verified", conformance: "valid", conformance_issues: [],
  payload: { quarantine_status: "trusted", privacy_level: "public",
             ...(license === undefined ? {} : { license }) },
});
const licenseBasis = (g) => g.basis.find((b) => b.field === "license");

// [case, license, action, answer before the fix, answer now, text the license basis must contain]
const CASES = [
  // B1: spelled-out Creative Commons names carry their terms
  ["B1", "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International", "transform", true, false, "CC NoDerivatives"],
  ["B1", "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International", "summarize", true, false, "CC NoDerivatives"],
  ["B1", "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International", "redistribute", true, "conditional", "sealed license clause"],
  ["B1", "Creative Commons Attribution-NoDerivs 4.0", "transform", true, false, "CC NoDerivatives"],
  ["B1", "Creative Commons Attribution No Derivatives 4.0", "transform", true, false, "CC NoDerivatives"],
  ["B1", "CC BY No-Derivatives 4.0", "transform", "conditional", false, "CC NoDerivatives"],
  ["B1", "Creative Commons Attribution-ShareAlike 4.0 International", "redistribute", true, "conditional", "sealed license clause"],
  // B1: an underscore next to ND, and the "Non-Derivative" misspelling, still read as NoDerivatives
  ["B1", "CC BY_NC_ND 4.0", "transform", true, false, "CC NoDerivatives"],
  ["B1", "CC BY_NC_ND 4.0", "redistribute", true, "conditional", "sealed license clause"],
  ["B1", "CC BY-NC_ND", "transform", "conditional", false, "CC NoDerivatives"],
  ["B1", "Creative Commons Attribution No_Derivatives", "transform", true, false, "CC NoDerivatives"],
  ["B1", "Creative Commons Attribution-NonCommercial-Non-Derivative", "transform", true, false, "CC NoDerivatives"],
  // B2: a negated permissive name grants nothing
  ["B2", "Copyright 2026 David Kyle. Not in the public domain.", "redistribute", true, false, "negated license wording"],
  ["B2", "Copyright 2026 David Kyle. Not in the public domain.", "transform", true, false, "negated license wording"],
  ["B2", "Copyright 2026 David Kyle. Not in the public domain.", "read", true, "conditional", "sealed license clause"],
  ["B2", "Copyright 2026 David Kyle; not licensed under Creative Commons", "redistribute", true, false, "negated license wording"],
  ["B2", "Copyright 2026 David Kyle; not licensed under Creative Commons", "transform", true, false, "negated license wording"],
  ["B2", "This work isn't MIT licensed", "redistribute", true, false, "negated license wording"],
  ["B2", "This work isn’t CC0", "redistribute", true, false, "negated license wording"],
  ["B2", "Never released into the public domain", "redistribute", true, false, "negated license wording"],
  ["B2", "No longer under CC BY 4.0", "redistribute", "conditional", false, "negated license wording"],
  ["B2", "Shared without a Creative Commons license", "redistribute", true, false, "negated license wording"],
  ["B2", "Neither public domain nor Apache-2.0", "redistribute", true, false, "negated license wording"],
  ["B2", "No CC license applies", "redistribute", true, false, "negated license wording"],
  ["B2", "Non-CC license", "redistribute", true, false, "negated license wording"],
  // B3: a missing or non-string license is no license declared
  ...[undefined, null, 5, { name: "CC BY 4.0" }, ["CC BY 4.0"]].flatMap((v) => [
    ["B3", v, "redistribute", true, false, "no license declared"],
    ["B3", v, "transform", true, false, "no license declared"],
    ["B3", v, "read", true, "conditional", "no license declared"],
  ]),
  // Unchanged: no new recognition. Underscore forms stay unrecognized.
  ["same", "CC_BY_NC_ND", "redistribute", false, false, "unrecognized license"],
  ["same", "CC_BY_NC_ND", "transform", false, false, "unrecognized license"],
  // Unchanged: these must not misfire as negations or lose their terms.
  ["same", "CC BY-NC 4.0 (not for commercial use)", "redistribute", "conditional", "conditional", "sealed license clause"],
  ["same", "CC BY-NC 4.0 (not for commercial use)", "transform", "conditional", "conditional", "sealed license clause"],
  ["same", "Public domain (U.S. Government work)", "redistribute", true, true, "sealed license clause"],
  ["same", "Public domain (U.S. Government work)", "transform", true, true, "sealed license clause"],
  ["same", "CC BY 4.0", "redistribute", "conditional", "conditional", "sealed license clause"],
  ["same", "CC BY 4.0", "transform", "conditional", "conditional", "sealed license clause"],
  ["same", "CC0 1.0", "redistribute", true, true, "sealed license clause"],
  ["same", "CC0 1.0", "transform", true, true, "sealed license clause"],
  ["same", "MIT", "redistribute", true, true, "sealed license clause"],
  ["same", "MIT", "transform", true, true, "sealed license clause"],
  ["same", "Apache-2.0", "redistribute", true, true, "sealed license clause"],
  ["same", "Apache-2.0", "transform", true, true, "sealed license clause"],
  ["same", "CC-BY-SA-4.0", "redistribute", "conditional", "conditional", "sealed license clause"],
  ["same", "CC-BY-SA-4.0", "transform", "conditional", "conditional", "sealed license clause"],
  ["same", "CC BY-ND 4.0", "transform", false, false, "CC NoDerivatives"],
  ["same", "CC BY-NC-ND 4.0", "redistribute", "conditional", "conditional", "sealed license clause"],
  ["same", "All rights reserved", "redistribute", false, false, "rights reserved"],
];

for (const [kind, license, action, before, after, basisText] of CASES) {
  const label = `${kind} permits(${show(license)}, ${action})`;
  const g = permits(solo(license), action);
  const b = licenseBasis(g);
  check(`${label} is ${JSON.stringify(after)}`, g.allowed === after, `got ${JSON.stringify(g.allowed)}`);
  check(`${label} is never looser than before (${JSON.stringify(before)})`, rank(g.allowed) <= rank(before));
  check(`${label} cites the license`, !!b && String(b.effect).includes(basisText), b ? b.effect : "no license basis");
}

// B3: the basis names a non-string license readably, and inspection is all that is left.
for (const [v, shown] of [[undefined, "(missing)"], [null, "(not a string: null)"], [5, "(not a string: number)"],
                          [{ a: "b" }, "(not a string: object)"], [[], "(not a string: array)"]]) {
  const g = permits(solo(v), "read");
  check(`B3 basis names license ${show(v)} as ${shown}`, licenseBasis(g)?.value === shown, licenseBasis(g)?.value);
  check(`B3 license ${show(v)} leaves only inspection`,
    g.obligations.includes(`license ${shown}: no license declared — assume no permission beyond inspection`),
    JSON.stringify(g.obligations));
}

// B3 end to end: real files whose sealed license is missing or not a string.
// Before the fix the license check was skipped and redistribution came back
// "conditional" (attribution only).
for (const [label, extra] of [["missing", {}], ["null", { license: null }], ["a number", { license: 5 }],
                              ["an object", { license: { id: "CC-BY-4.0" } }], ["an array", { license: ["MIT"] }]]) {
  const r = await verify(await fileWith(extra));
  check(`B3 file with license ${label} verifies (seal intact, conformance invalid)`,
    r.state === "verified" && r.conformance === "invalid", `${r.state}/${r.conformance}`);
  for (const action of ["redistribute", "transform"]) {
    const g = permits(r, action);
    check(`B3 file with license ${label}: ${action} is not permitted`, g.allowed === false, JSON.stringify(g.allowed));
  }
}

// Spelled-out terms add the same obligations as the abbreviations, once each.
const OBLIGATIONS = {
  BY: "attribution to the sealed sources is required",
  NC: "commercial use is not licensed",
  SA: "derivatives must carry the same license",
};
for (const [license, want] of [
  ["Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International", ["BY", "NC", "SA"]],
  ["Creative Commons Attribution Non-Commercial Share Alike 4.0", ["BY", "NC", "SA"]],
  ["CC BY-NC-SA 4.0 (Attribution-NonCommercial-ShareAlike)", ["BY", "NC", "SA"]],
  ["CC BY-NC-SA 4.0", ["BY", "NC", "SA"]],
  ["Creative Commons Attribution 4.0 International", ["BY"]],
  ["CC BY_NC_SA 4.0", ["BY", "NC", "SA"]],
  ["Creative Commons Attribution_Non_Commercial_Share_Alike", ["BY", "NC", "SA"]],
  ["CC0 1.0", []],
]) {
  const g = permits(solo(license), "read");
  const got = Object.keys(OBLIGATIONS).filter((k) => g.obligations.some((o) => o.endsWith(OBLIGATIONS[k])));
  const dupes = g.obligations.length !== new Set(g.obligations).size;
  check(`obligations for ${show(license)} are ${want.join(", ") || "none"}`,
    JSON.stringify(got) === JSON.stringify(want) && !dupes, JSON.stringify(g.obligations));
}

// permits() stays linear in the license's length. knobe_read calls it on every
// file it opens, so a long license full of permissive names must not stall a
// reader (the negation check was once quadratic: about 50 s for this string).
{
  const long = "MIT ".repeat(50000);
  const t0 = performance.now();
  const g = permits(solo(long), "redistribute");
  const ms = performance.now() - t0;
  check(`permits() on a ${long.length}-character license finishes in under 500 ms`, ms < 500, `${ms.toFixed(0)} ms`);
  check("permits() on that long license gives the same answer as before (true)", g.allowed === true, JSON.stringify(g.allowed));
}

const total = passed + failures.length;
console.log(`KNOBE license handling: ${passed}/${total} checks passed (createKnobe, transformKnobe, permits)`);
for (const f of failures) console.log("FAIL " + f);
process.exit(failures.length ? 1 : 0);
