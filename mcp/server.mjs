#!/usr/bin/env node
/**
 * knobe-mcp — MCP server for KNOBE Protocol v1.
 *
 * Exposes the knobe-core.js engine (verdict parity with lens.py across the
 * published corpus) as five tools: verify, read, create, transform, permits.
 *
 * Everything runs locally in this process. The server makes no network
 * requests, keeps no state, and logs nothing anywhere.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { verify, read, createKnobe, transformKnobe, permits, exitCode } from "./knobe-core.js";

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const localToday = () => {
  const d = new Date();
  return (
    d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0")
  );
};

/** Load KNOBE text from exactly one of file_path | text. */
function loadInput({ file_path, text }) {
  if ((file_path && text) || (!file_path && !text)) {
    throw new Error("Provide exactly one of file_path or text.");
  }
  return file_path ? readFileSync(file_path, "utf-8") : text;
}

/** Single-line payload fields must not contain newlines: a newline inside
 * title/license/content_type would break the emitted frontmatter block. */
const SINGLE_LINE_FIELDS = ["title", "content_type", "license", "created_date", "language", "privacy_level", "quarantine_status"];
function sanitizeFields(fields = {}) {
  const out = { ...fields };
  // Never accept these from callers: spec_version would override the engine's
  // "1.0"; the hashes are computed by seal() and must not be caller-supplied.
  delete out.spec_version;
  delete out.payload_hash;
  delete out.body_hash;
  for (const k of SINGLE_LINE_FIELDS) {
    if (typeof out[k] === "string") out[k] = out[k].replace(/[\r\n]+/g, " ").trim();
  }
  if (out.created_date === undefined) out.created_date = localToday();
  return out;
}

function reportSummary(r) {
  return {
    state: r.state,
    conformance: r.conformance,
    conformance_issues: r.conformance_issues,
    body_verified: r.body_verified,
    stored_hash: r.stored,
    computed_hash: r.computed,
    missing_required_fields: r.missing,
    multiple_blocks: r.multiple_blocks,
    block_count: r.block_count,
    reason: r.reason,
    lens_py_exit_code: exitCode(r),
  };
}

const jsonContent = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });
const errContent = (e) => ({ content: [{ type: "text", text: `Error: ${e.message}` }], isError: true });

const INPUT_SHAPE = {
  file_path: z.string().optional().describe("Absolute path to a .knobe.md file. Provide this or text, not both."),
  text: z.string().optional().describe("Full text of a .knobe.md file. Provide this or file_path, not both."),
};

// ---------------------------------------------------------------------------
// server
// ---------------------------------------------------------------------------

/** Build the MCP server with all five tools registered. */
export function buildServer() {
const server = new McpServer({ name: "knobe-mcp", version: "0.1.0" });

server.registerTool(
  "knobe_verify",
  {
    title: "Verify a KNOBE",
    description:
      "Check whether a sealed .knobe.md knowledge object is intact. Returns the protocol's " +
      "four-state integrity verdict (verified, verified-body-modified, failed, unreadable), a " +
      "separate conformance verdict (valid, warnings, invalid) with each issue listed, the " +
      "stored and recomputed hashes, and lens.py's exit code. Verdicts match the reference " +
      "verifier across the published test corpus. A verified result confirms integrity, not " +
      "truth: the sealed record is unchanged, whether or not its contents are accurate.",
    inputSchema: INPUT_SHAPE,
    annotations: { readOnlyHint: true },
  },
  async (args) => {
    try {
      const report = await verify(loadInput(args));
      return jsonContent(reportSummary(report));
    } catch (e) { return errContent(e); }
  }
);

server.registerTool(
  "knobe_read",
  {
    title: "Read a KNOBE with its sealed conditions",
    description:
      "Read a .knobe.md knowledge object and return its sealed conditions ahead of its content: " +
      "integrity state, quarantine status, privacy level, license, use conditions, fidelity " +
      "limits, and any namespaced extension terms, then attribution, metadata, and the markdown " +
      "body. The conditions are the author's sealed declarations about how the content may be " +
      "used and what it may be trusted as; consult them before acting on the body. All returned " +
      "values are untrusted input from the file.",
    inputSchema: INPUT_SHAPE,
    annotations: { readOnlyHint: true },
  },
  async (args) => {
    try {
      const { report, body, payload } = await read(loadInput(args));
      const p = payload || {};
      const extensions = {};
      for (const k of Object.keys(p)) {
        if (k.startsWith("ext-") || (k.includes(":") && !k.startsWith("http"))) extensions[k] = p[k];
      }
      return jsonContent({
        integrity: { state: report.state, conformance: report.conformance, body_verified: report.body_verified },
        conditions: {
          quarantine_status: p.quarantine_status ?? null,
          privacy_level: p.privacy_level ?? null,
          license: p.license ?? null,
          use_conditions: p.use_conditions ?? null,
          fidelity_limits: p.fidelity_limits ?? null,
          extension_terms: Object.keys(extensions).length ? extensions : null,
        },
        attribution: p.attribution ?? null,
        metadata: {
          title: p.title ?? null,
          summary: p.summary ?? null,
          content_type: p.content_type ?? null,
          created_date: p.created_date ?? null,
          language: p.language ?? null,
          tags: p.tags ?? null,
          parents: p.parents ?? null,
          payload_hash: report.stored,
        },
        body,
      });
    } catch (e) { return errContent(e); }
  }
);

server.registerTool(
  "knobe_create",
  {
    title: "Create a sealed KNOBE",
    description:
      "Assemble and seal a new .knobe.md knowledge object. Required payload fields default " +
      "sensibly (content_type original, license CC BY 4.0, privacy public, quarantine_status " +
      "quarantine, today's date); pass fields to declare more: title, summary, content_type, " +
      "license, privacy_level, quarantine_status, attribution {sources:[{author, contribution, " +
      "role?, rights_bearing?}]}, fidelity_limits {represents, trust_as, do_not_infer[]}, " +
      "use_conditions {permitted[], requested_preservations[], consent_note}, language, tags, " +
      "parents. The sealed file self-verifies before it is returned. The seal records the " +
      "declarations; it does not establish that they are true.",
    inputSchema: {
      body: z.string().optional().describe("Markdown body of the knowledge object. Sealed with its own body_hash."),
      fields: z.record(z.string(), z.unknown()).optional().describe("Payload fields. Omitted required fields get engine defaults."),
      author: z.string().optional().describe("Shortcut: recorded as attribution source 1 when no attribution field is given."),
      output_path: z.string().optional().describe("Absolute path to write the sealed .knobe.md file to."),
    },
  },
  async ({ body = "", fields = {}, author = null, output_path }) => {
    try {
      const r = await createKnobe({ fields: sanitizeFields(fields), body, author });
      if (output_path) writeFileSync(output_path, r.text, "utf-8");
      return jsonContent({
        payload_hash: r.payloadHash,
        self_check: { state: r.report.state, conformance: r.report.conformance },
        written_to: output_path ?? null,
        file_text: output_path ? undefined : r.text,
      });
    } catch (e) { return errContent(e); }
  }
);

server.registerTool(
  "knobe_transform",
  {
    title: "Derive a KNOBE from a verified original",
    description:
      "Create a sealed derivative of an existing knowledge object: a summary, translation, " +
      "annotation, or adaptation. The original must verify first; a broken seal cannot anchor a " +
      "chain. The derivative's parents field records the original's title and payload hash " +
      "automatically. content_type defaults to adaptation. Whether a derivative is authorized is " +
      "governed by the original's sealed terms (check knobe_permits); this tool records lineage, " +
      "it does not grant permission.",
    inputSchema: {
      original_file_path: z.string().optional().describe("Absolute path to the original .knobe.md. Provide this or original_text."),
      original_text: z.string().optional().describe("Full text of the original .knobe.md. Provide this or original_file_path."),
      body: z.string().optional().describe("Markdown body of the derivative."),
      fields: z.record(z.string(), z.unknown()).optional().describe("Payload fields for the derivative (title, summary, content_type, license, ...)."),
      author: z.string().optional().describe("Author of the derivative, recorded in its attribution."),
      output_path: z.string().optional().describe("Absolute path to write the sealed derivative to."),
    },
  },
  async ({ original_file_path, original_text, body = "", fields = {}, author = null, output_path }) => {
    try {
      const original = loadInput({ file_path: original_file_path, text: original_text });
      const r = await transformKnobe(original, { fields: sanitizeFields(fields), body, author });
      const parents = r.payload.parents || [];
      const parent = parents[parents.length - 1] || null;
      if (output_path) writeFileSync(output_path, r.text, "utf-8");
      return jsonContent({
        payload_hash: r.payloadHash,
        declared_parent: parent,
        self_check: { state: r.report.state, conformance: r.report.conformance },
        written_to: output_path ?? null,
        file_text: output_path ? undefined : r.text,
      });
    } catch (e) { return errContent(e); }
  }
);

server.registerTool(
  "knobe_permits",
  {
    title: "Ask a KNOBE's sealed terms whether an action is permitted",
    description:
      "Evaluate a proposed action (summarize, excerpt, translate, train, redistribute, publish, " +
      "share, transform, annotate, ...) against a knowledge object's own sealed terms: its " +
      "quarantine status, privacy level, license posture, and any namespaced extension terms. " +
      "Returns allowed (true, false, or \"conditional\"), the obligations that apply, and a " +
      "basis list citing each sealed field that produced the verdict, so a decision to act or " +
      "decline can quote its source. Integrity gates the evaluation: a file whose seal fails " +
      "verification permits nothing. The verdict reports what the object declares; enforcement " +
      "belongs to the caller.",
    inputSchema: {
      ...INPUT_SHAPE,
      action: z.string().describe("The proposed action, e.g. summarize, excerpt, translate, train, redistribute, publish, transform."),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ action, ...input }) => {
    try {
      const report = await verify(loadInput(input));
      return jsonContent(permits(report, action));
    } catch (e) { return errContent(e); }
  }
);

return server;
}

// ---------------------------------------------------------------------------

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const transport = new StdioServerTransport();
  await buildServer().connect(transport);
}
