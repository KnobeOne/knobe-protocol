// Smoke test: full MCP client/server round-trip over the in-memory transport,
// exercising all five tools against the published corpus. Exits non-zero on
// any failure. Also fails if the vendored knobe-core.js drifts from the
// repository copy.
import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { buildServer } from "../server.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..");
const VEC = (f) => join(REPO, "test-vectors", f);
const SITE = (f) => join(REPO, "site", f);

let passed = 0;
function ok(label, cond) {
  assert.ok(cond, label);
  passed += 1;
  console.log(`ok - ${label}`);
}

// --- engine drift gate ---
const vendored = readFileSync(join(HERE, "..", "knobe-core.js"), "utf-8");
const canonical = readFileSync(join(REPO, "knobe-core.js"), "utf-8");
ok("vendored knobe-core.js is byte-identical to the repository copy", vendored === canonical);

// --- wire up client <-> server in memory ---
const server = buildServer();
const client = new Client({ name: "smoke", version: "0.0.0" });
const [ct, st] = InMemoryTransport.createLinkedPair();
await Promise.all([server.connect(st), client.connect(ct)]);

const call = async (name, args) => {
  const res = await client.callTool({ name, arguments: args });
  const text = res.content[0].text;
  return { isError: !!res.isError, data: res.isError ? text : JSON.parse(text) };
};

// --- tool listing ---
const tools = await client.listTools();
const names = tools.tools.map((t) => t.name).sort();
ok("five tools registered", JSON.stringify(names) ===
  JSON.stringify(["knobe_create", "knobe_permits", "knobe_read", "knobe_transform", "knobe_verify"]));

// --- knobe_verify across corpus states ---
let r = await call("knobe_verify", { file_path: VEC("minimal-valid.knobe.md") });
ok("verify minimal-valid: verified/valid/exit 0",
  r.data.state === "verified" && r.data.conformance === "valid" && r.data.lens_py_exit_code === 0);

r = await call("knobe_verify", { file_path: VEC("body-modified.knobe.md") });
ok("verify body-modified: verified-body-modified", r.data.state === "verified-body-modified" && r.data.body_verified === "modified");

r = await call("knobe_verify", { file_path: VEC("payload-modified.knobe.md") });
ok("verify payload-modified: failed with both hashes",
  r.data.state === "failed" && r.data.stored_hash && r.data.computed_hash && r.data.lens_py_exit_code === 1);

r = await call("knobe_verify", { file_path: VEC("unreadable.knobe.md") });
ok("verify unreadable: unreadable/exit 2", r.data.state === "unreadable" && r.data.lens_py_exit_code === 2);

r = await call("knobe_verify", { file_path: VEC("numeric-violation.knobe.md") });
ok("verify numeric-violation: real verdict + conformance invalid",
  r.data.state === "verified" && r.data.conformance === "invalid");

r = await call("knobe_verify", { text: readFileSync(VEC("minimal-valid.knobe.md"), "utf-8") });
ok("verify accepts text input", r.data.state === "verified");

r = await call("knobe_verify", {});
ok("verify rejects zero inputs", r.isError);

r = await call("knobe_verify", { file_path: VEC("minimal-valid.knobe.md"), text: "x" });
ok("verify rejects two inputs", r.isError);

// --- knobe_read: conditions ahead of body ---
r = await call("knobe_read", { file_path: SITE("knobe-research-interview.knobe.md") });
ok("read returns integrity + conditions + body",
  r.data.integrity.state === "verified" && r.data.conditions && typeof r.data.body === "string");
ok("read surfaces namespaced extension terms",
  r.data.conditions.extension_terms && Object.keys(r.data.conditions.extension_terms).some((k) => k.startsWith("research:")));

// --- knobe_create: seal, then verify the output through the tool chain ---
const tmp = mkdtempSync(join(tmpdir(), "knobe-mcp-"));
const outPath = join(tmp, "created.knobe.md");
r = await call("knobe_create", {
  body: "A paragraph sealed through the MCP server.",
  fields: {
    title: "MCP smoke test object",
    license: "CC BY 4.0",
    spec_version: "9.9",
    fidelity_limits: { represents: "a test fixture", trust_as: "test data only", do_not_infer: ["anything beyond the test"] },
  },
  author: "Smoke Test",
  output_path: outPath,
});
ok("create seals verified/valid", r.data.self_check.state === "verified" && r.data.self_check.conformance === "valid");
ok("create wrote the file", r.data.written_to === outPath);

r = await call("knobe_verify", { file_path: outPath });
ok("created file verifies", r.data.state === "verified" && r.data.conformance === "valid");
{
  const raw = readFileSync(outPath, "utf-8");
  const b64 = raw.match(/-----BEGIN KNOBE B64-----\n([\s\S]*?)\n-----END KNOBE B64-----/)[1].replace(/\n/g, "");
  const sealedPayload = JSON.parse(Buffer.from(b64, "base64").toString("utf-8"));
  ok("caller-supplied spec_version was discarded", sealedPayload.spec_version === "1.0");
}

// --- knobe_transform: chain from the created file ---
const derivPath = join(tmp, "derivative.knobe.md");
r = await call("knobe_transform", {
  original_file_path: outPath,
  body: "A one-line summary of the smoke test object.",
  fields: { title: "Summary of the smoke test object", content_type: "compression" },
  author: "Smoke Summarizer",
  output_path: derivPath,
});
ok("transform seals verified/valid", r.data.self_check.state === "verified" && r.data.self_check.conformance === "valid");
const createdVerify = await call("knobe_verify", { file_path: outPath });
ok("declared parent hash equals original stored hash", r.data.declared_parent.payload_hash === createdVerify.data.stored_hash);

r = await call("knobe_transform", { original_file_path: VEC("payload-modified.knobe.md"), body: "x" });
ok("transform refuses a broken original", r.isError && String(r.data).includes("unverified"));

// --- knobe_permits ---
r = await call("knobe_permits", { file_path: SITE("knobe-research-interview.knobe.md"), action: "redistribute" });
ok("permits: sensitive interview denies redistribute with cited basis",
  r.data.allowed === false && Array.isArray(r.data.basis) && r.data.basis.length > 0);

r = await call("knobe_permits", { file_path: outPath, action: "summarize" });
ok("permits: quarantined CC BY object evaluates summarize as conditional with obligations",
  r.data.allowed === "conditional" && r.data.obligations.length > 0);

r = await call("knobe_permits", { file_path: VEC("payload-modified.knobe.md"), action: "summarize" });
ok("permits: failed seal permits nothing", r.data.allowed === false);

rmSync(tmp, { recursive: true, force: true });
await client.close();
console.log(`\n${passed} checks passed`);
