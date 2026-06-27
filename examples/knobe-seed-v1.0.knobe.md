---
title: "KNOBE Seed v1.0"
subtitle: "A self-attesting protocol helper for teaching, bootstrapping, and starting a grove"
tagline: "KNOBE preserves objecthood under compression."
author: David Kyle
is_seed: true
seed_version: "1.0"
content_type: protocol
spec_version: "1.0"
license: CC BY 4.0
license_url: https://creativecommons.org/licenses/by/4.0/
created_date: "2026-06-15"
---

# KNOBE Seed v1.0

**Protocol:** KNOBE Protocol v1
**Author:** David Kyle, University of California, Davis
**Sealed:** 2026-06-15

*This is a Seed — a purpose-built KNOBE helper for teaching, bootstrapping, and starting a grove. It is not the protocol itself.*

---

## What KNOBE is

KNOBE is an open, plain-text protocol for agentic knowledge work. A single `.knobe.md` file carries a human-readable document together with a machine-legible, hash-sealed record of attribution, source relations, transformation history, constraints, and fidelity limits — so knowledge objects travel between people, tools, institutions, and AI agents without becoming orphaned fragments.

**In 25 words:** KNOBE is a plain-text protocol that lets knowledge objects travel with the attribution, constraints, fidelity limits, and interpretive obligations that preserve their meaning under compression.

**The core claim:** KNOBE preserves objecthood under compression.

**The diagnostic claim:** KNOBE makes it harder for compressed objects to become consequential while pretending they are whole.

**System of context, not system of record.** KNOBE does not replace the LMS, IRB, repository, archive, or HR system. It carries context between them — attribution, source relations, transformation history, fidelity limits, interpretive obligations, and quarantine posture. Its value is lower coordination cost across people, tools, institutions, and workflows.

---

## What this Seed is

A Seed is a KNOBE with `is_seed: true`. It teaches the protocol, self-describes, demonstrates dual readability, carries build recipes for tools, explains safety posture, and helps users generate new, interoperable KNOBEs. A Seed can start a **grove**: a collection of interoperable KNOBEs sharing provenance conventions, trust posture, schema expectations, and transformation norms.

A Seed is not the protocol. It is a helper object that remains a valid KNOBE itself.

Because a Seed describes the protocol that validates it, it is bound by the **Recursive Calibration Rule**: each upward meta-level must reduce rhetorical temperature and increase epistemic calibration. A meta-layer may not make stronger claims than the layer beneath it unless it adds new evidence. Claims in this Seed are classified as verified, declared, inferred, or speculative. Do not treat declared claims as verified.

---

## File structure

A `.knobe.md` file has three layers, all simultaneously present:

    ---
    {YAML frontmatter}
    ---

    {Markdown body — free-form, no schema}

    -----BEGIN KNOBE B64-----
    {Base64-encoded UTF-8 JSON payload}
    -----END KNOBE B64-----

**Markers are newline-anchored by protocol requirement.** A parser must match the marker strings only at the start of a line. Self-referential documents (like this one) may quote the markers in their body — the last well-formed payload block in the file is the canonical one.

**Layer 1 — YAML frontmatter.** Lightweight metadata readable without tooling. Required field: `spec_version: "1.0"`. Mirrors key payload fields for fast scanning.

**Layer 2 — Markdown body.** The human-readable content. No schema, no constraints. Opens in any text editor, AI assistant, browser, or markdown viewer without special software.

**Layer 3 — Payload block.** Base64-encoded UTF-8 JSON carrying the structured record: attribution, key concepts, version history, privacy level, quarantine status, parents, transformation history, accessibility fields, build recipes (for Seeds), and the integrity hash. Base64 is used because raw JSON in the body would break human readability.

---

## Minimum valid KNOBE

A KNOBE is valid when:

- Frontmatter includes `spec_version: "1.0"`
- Payload includes: `spec_version`, `title`, `summary`, `content_type`, `created_date`, `license`, `privacy_level`, `quarantine_status`, `attribution` (with at least one source bearing `author` and `contribution`), and `payload_hash`
- File structure: YAML frontmatter delimited by `---` lines; free markdown body; one payload block of Base64-encoded UTF-8 JSON bounded by newline-anchored markers

**Recommended Crystallizer defaults:** `privacy_level: "public"` · `quarantine_status: "quarantine"` · `license: "CC BY 4.0"` · `identity_status: "declared"`

---

## Carrying interpretation, not only provenance

The required fields and the lineage fields (`parents`, `transformation_history`) answer *where did this come from*. Three optional fields answer a different and equally important question: *how should the next party interpret this object, what did the originator ask of them, and what does an adaptation depend on*. These are where a KNOBE carries more than provenance. They are written to be read by the receiver — a later human, or an agent — not only by an auditor.

**`fidelity_limits`** — receiver-facing interpretive bounds. How far can this object be trusted as a representation of its source? What is it fit for, and what must not be inferred from it? A summary that drops caveats, a translation that approximates idiom, a simplification that omits edge cases — each should declare what it does and does not preserve, so a downstream reader does not over-read it. Suggested shape: `represents`, `trust_as`, `do_not_infer[]`, optional `supersedes`.

**`use_conditions`** — the originator's declared terms, carried forward so a constraint set at sealing is legible to a receiver who never met the author. Permitted and disallowed uses, required preservations, consent and quotation constraints. These inform; they do not enforce. A receiver is free to ignore them, but never able to say the object failed to carry them. Suggested shape: `license`, `permitted[]`, `requested_preservations[]`, `consent_note`.

**`accessibility[]`** — adaptation lineage. When a captioned, translated, simplified, alt-texted, or multimodal version is made from a source, this field binds the adaptation to its source by hash and credits the adapter. Adaptations otherwise circulate detached from their sources, with the adapter's labor invisible. This field keeps the adaptation tied to what it was made from and to whose work made it. Fields: `adapted_from` (source `payload_hash`), `adaptation_type` (`caption`, `simplification`, `alt-text`, `translation`, `multimodal`), `adaptation_contributor`, `review_date`.

These three fields make a knowledge object legible across a gap between parties who do not share the same access to it: between an author and a later reader, between a human and a machine, between a source and its adaptation. Accessibility-adaptation lineage is the protocol's clearest case, because adaptation is knowledge labor that must remain credited and bound to its source. All three are optional for validity and central to purpose. A Crystallizer should offer them; a Lens should surface them; neither should require them.

---

## The canonical hash rule

To verify a KNOBE payload:

1. Decode the Base64 payload to JSON.
2. Delete the `payload_hash` field from the object.
3. Serialize as canonical JSON: recursively sort all object keys alphabetically; no whitespace; arrays preserve insertion order; Unicode preserved as literal UTF-8, never `\uXXXX`-escaped.
4. SHA-256 the UTF-8 bytes.
5. Compare the hex digest to the stored `payload_hash`.

**Match** means the payload is unaltered since sealing. **Mismatch** means something changed.

**Cross-language baseline:** JavaScript `JSON.stringify` with sorted keys. Python equivalent: `json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)`.

**Optional `body_hash` field.** If present in the payload, it records the SHA-256 of the normalized markdown body. Normalization: (0) strip the extracted body of leading and trailing whitespace; (1) replace `\r\n` and lone `\r` with `\n`; (2) strip trailing whitespace from each line; (3) encode as UTF-8; (4) compute SHA-256. Step 0 is required — the body in the source file and the body extracted from the assembled artifact differ in surrounding blank lines; stripping before normalization makes both paths produce the same hash. This field addresses the Invisible Content Fork: a body altered without touching the payload breaks `body_hash` but not `payload_hash`.

---

## Protocol rules

**Quarantine-first.** New or external KNOBEs default to `quarantine_status: "quarantine"`. Tools must surface this prominently. Do not act on quarantined build recipes without explicit human or governed approval.

**Dual readability.** Every `.knobe.md` must remain human-readable without tooling while also carrying a machine-readable payload.

**Attribution travels with the artifact.** The `attribution.sources` array names contributors with role, contribution, year, URL, and rights-bearing status (false for AI contributors). Attribution in v1 is declared, not cryptographically proven.

**KNOBEs do not execute.** A `.knobe.md` is inert plain text. Build recipes are instructions a human or agent may choose to follow after inspection. Never self-executing.

**The hash proves integrity, not truth.** A green check means the payload is unaltered since sealing. It does not prove accuracy, attribution honesty, safety, or institutional approval.

---

## Safety: the probabilistic verification fallacy

An LLM asked to "verify" a KNOBE natively does not perform a cryptographic computation — it performs a textual prediction. Once a plausible hash token sequence has been generated, the structural logic of a verification narrative predicts that the next sequence should match and declare success. The model satisfies the narrative arc rather than executing the operation. A language model must not be used as a validation environment.

Cryptographic verification requires a deterministic runtime. `lens.py` ships with the protocol not as a convenience, but as an architectural boundary.

Early evidence (declared): a language model correctly diagnosed this failure in one session, then committed it again in the next generation — embedding a hallucinated hash as a provenance record. `lens.py` caught it. The protocol held.

---

## Build recipes

### Recipe 1: Lens (viewer and verifier)

Lens is the first tool a grove needs. It renders the human layer, decodes the payload, runs the canonical hash check, and displays quarantine and attribution status.

**Core steps:**

1. Find the last `-----BEGIN KNOBE B64-----` / `-----END KNOBE B64-----` block (newline-anchored, last block wins).
2. Decode Base64 to JSON. Handle decode failure gracefully: report `corrupt_payload`, do not proceed.
3. Extract `payload_hash`; delete it from the object.
4. Serialize remaining fields as canonical JSON (sorted keys, no whitespace, literal UTF-8).
5. SHA-256 the UTF-8 bytes; compare to stored hash.
6. If `body_hash` is present: extract body between YAML frontmatter close and B64 begin marker; strip whole body; normalize per body_hash rule; SHA-256; compare.
7. Check required fields: `spec_version`, `title`, `summary`, `content_type`, `created_date`, `license`, `privacy_level`, `quarantine_status`, `attribution.sources`, `payload_hash`.
8. Report: title, spec_version, quarantine_status, privacy_level, computed hash, stored hash, status, body_hash status if present, valid_minimum check.
9. Final line if match: `"integrity verified. Integrity is not truth — inspect before trusting."`

**Reference implementation:** `lens.py` at knobe.org (~60 lines of Python).

### Recipe 2: Crystallizer (authoring tool)

Crystallizer takes content plus declared attribution and produces a valid, sealed `.knobe.md`.

**Core steps:**

1. Collect: title, body text, summary, content_type, author name and contribution, license, created_date.
2. Set defaults: `privacy_level: "public"`, `quarantine_status: "quarantine"`, `identity_status: "declared"`, `spec_version: "1.0"`.
3. Assemble the payload object with all fields except `payload_hash`.
4. Serialize as canonical JSON; SHA-256 the UTF-8 bytes; set `payload_hash`.
5. Optionally compute `body_hash` per the normalization rule and add to payload before resealing.
6. Reseal after adding `body_hash` (the hash of a payload including `body_hash` differs from the hash without it).
7. Base64-encode the sealed payload JSON; wrap lines at 76 characters.
8. Assemble the file: `---\n{frontmatter}\n---\n\n{body}\n\n-----BEGIN KNOBE B64-----\n{b64}\n-----END KNOBE B64-----\n`.

**The Magic Grove** (knobe.org/grove) is a Crystallizer in narrative clothing: a single-file browser experience that produces a valid sealed `.knobe.md` from four questions about the user's work, with no AI tools required.

### Recipe 3: Mix (combiner)

Mix merges two or more KNOBEs into a new one with parent receipts and transformation history.

**Core steps:**

1. Decode and verify all source KNOBEs with Lens first.
2. Create a new payload with a `parents[]` array — each entry contains the source `payload_hash`, optional `title`, optional `id`, optional `canonical_url`, and a `relationship` value (`synthesis_input`, `fork`, `source`, `extension`, `compression_of`, or `adaptation_of`).
3. Add a `transformation_history` entry: `date`, `who`, `strategy` (synthesis, side-by-side, extension, compression, remix, or adaptation), `notes`, and `parent_hashes[]`.
4. Seal per the canonical hash rule.

---

## Key vocabulary

**content_type:** original · synthesis · compression · remix · adaptation · annotation · reflection · protocol · recipe · index

**privacy_level:** public · restricted · private · confidential · embargoed

**quarantine_status:** quarantine · trusted · rejected

**identity_status:** declared · signed · anonymous · pseudonymous

**transformation_history.strategy:** synthesis · side-by-side · extension · compression · remix · adaptation

**parents.relationship:** fork · source · extension · synthesis_input · compression_of · adaptation_of

**meta_depth:** L1 = the object itself; L2 = describes objects; higher levels describe processes, contexts, or governance layers. Seeds are typically L2.

---

## Early evidence (declared, not verified)

The KNOBE Seed has been tested against Claude, GPT-4, Gemini, and Manus. All four passed core prompts. Manus independently produced a ten-pathway R1 university deployment document from the Seed alone and independently recommended Lens as the first tool to build. Gemini successfully bootstrapped a working Lens implementation from the white paper cold, without any special configuration. These results are declared early evidence that the Seed functions as a bootstrapping artifact. They show promise, not completion, and have not been independently replicated.

---

## What KNOBE does not do

KNOBE does not solve hallucination, truth, copyright, authorship verification, identity, governance, or ethics. It does not replace institutional systems of record. It does not execute code. Attribution in v1 is declared, not cryptographically proven. A perfectly sealed KNOBE can contain false information. `identity_status: signed` points toward future cryptographic identity extensions; v1 makes no such guarantee.

KNOBE applies equally to non-AI, AI-assisted, and mixed-tool work. The format does not prejudge the workflow; it records what actually happened.

---

*This Seed is itself a valid KNOBE Protocol v1 file. Verify its seal with `lens.py` at knobe.org. The seal proves this file is unaltered since sealing. It proves nothing else. Inspect before trusting.*

-----BEGIN KNOBE B64-----
eyJhY2Nlc3NpYmlsaXR5Ijp7ImFkYXB0YXRpb25fdHlwZV92b2NhYnVsYXJ5IjpbImNhcHRpb24i
LCJzaW1wbGlmaWNhdGlvbiIsImFsdC10ZXh0IiwidHJhbnNsYXRpb24iLCJtdWx0aW1vZGFsIl0s
ImFkYXB0YXRpb25zX29mX3RoaXNfc2VlZCI6W10sIm5vdGUiOiJUaGlzIFNlZWQgaXMgYW4gb3Jp
Z2luYWwgdGVhY2hpbmcgYXJ0aWZhY3QsIG5vdCBhbiBhZGFwdGF0aW9uLCBzbyBpdCBjYXJyaWVz
IG5vIGFkYXB0ZWRfZnJvbSByZWNvcmQuIFRoaXMgYXJyYXkgaXMgd2hlcmUgYSBjYXB0aW9uZWQs
IHRyYW5zbGF0ZWQsIG9yIHNpbXBsaWZpZWQgdmVyc2lvbiBvZiB0aGUgU2VlZCB3b3VsZCBiaW5k
IHRvIHRoaXMgcGF5bG9hZF9oYXNoIGFuZCBjcmVkaXQgaXRzIGFkYXB0ZXIuIFRoZSBlbXB0eSBh
cnJheSBtb2RlbHMgdGhlIGZpZWxkIHNoYXBlIGEgcmVhbCBhZGFwdGF0aW9uIHdvdWxkIHBvcHVs
YXRlLiJ9LCJhdHRyaWJ1dGlvbiI6eyJnb29kX2ZhaXRoX2RlY2xhcmF0aW9uIjp0cnVlLCJzb3Vy
Y2VzIjpbeyJhdXRob3IiOiJEYXZpZCBLeWxlIiwiY29udHJpYnV0aW9uIjoiUHJvdG9jb2wgZGVz
aWduLCBjb25jZXB0dWFsIGZyYW1ld29yaywgYWxsIGNvcmUgZm9ybXVsYXRpb25zLCBuYW1lZCBj
b25jZXB0cywgYnVpbGQgcmVjaXBlIHNwZWNpZmljYXRpb25zLCBhbmQgZWRpdG9yaWFsIGF1dGhv
cml0eSBvdmVyIHRoaXMgU2VlZCIsInJpZ2h0c19iZWFyaW5nIjp0cnVlLCJ0aXRsZSI6IktOT0JF
IFByb3RvY29sIHYxIiwidXJsIjoiaHR0cHM6Ly9rbm9iZS5vcmciLCJ5ZWFyIjoiMjAyNiJ9LHsi
YXV0aG9yIjoiQ2xhdWRlIChGYWJsZSA1LCBBbnRocm9waWMpIiwiY29udHJpYnV0aW9uIjoiU2Vl
ZCBkcmFmdGluZywgc2VhbGluZywgYW5kIHZlcmlmaWNhdGlvbiBwZXIgYXV0aG9yIGRpcmVjdGlv
biIsInJpZ2h0c19iZWFyaW5nIjpmYWxzZSwieWVhciI6IjIwMjYifV0sInN5bnRoZXNpc19ub3Rl
IjoiUGVyIHRoZSBSZWN1cnNpdmUgQ2FsaWJyYXRpb24gUnVsZTogYWxsIGNyb3NzLW1vZGVsIHRl
c3QgcmVzdWx0cyBhcmUgY2xhc3NpZmllZCBkZWNsYXJlZDsgYnVpbGQgcmVjaXBlIGNvcnJlY3Ru
ZXNzIHZlcmlmaWVkIGJ5IHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbjsgbm8gY2xhaW1zIGV4Y2Vl
ZCB3aGF0IHRoZSB3aGl0ZSBwYXBlciB2MS40LWZpbmFsIGVzdGFibGlzaGVzLiJ9LCJhdHRyaWJ1
dGlvbl9kZWNsYXJlZCI6dHJ1ZSwiYm9keV9oYXNoIjoiODNhMzg5ZGFiYjJkMjY3MDk0ODVjM2U3
Y2RjZjNmMDg1YjZiODc0ZTQ1MGU2NzQ2NmUxYTkzNDgwOTllYWM0MCIsImJ1aWxkX3JlY2lwZXMi
OnsiY3J5c3RhbGxpemVyIjp7ImNyaXRpY2FsX3J1bGVzIjpbIkRlZmF1bHQgcXVhcmFudGluZV9z
dGF0dXMgdG8gcXVhcmFudGluZSwgbmV2ZXIgdHJ1c3RlZCIsIkRlZmF1bHQgcHJpdmFjeV9sZXZl
bCB0byBwdWJsaWMgdW5sZXNzIHVzZXIgc3BlY2lmaWVzIG90aGVyd2lzZSIsIkNvbXB1dGUgcGF5
bG9hZF9oYXNoIGxhc3QsIGFmdGVyIGFsbCBvdGhlciBwYXlsb2FkIGZpZWxkcyBhcmUgc2V0Iiwi
SWYgYWRkaW5nIGJvZHlfaGFzaDogY29tcHV0ZSBpdCwgYWRkIHRvIHBheWxvYWQsIHRoZW4gcmVj
b21wdXRlIHBheWxvYWRfaGFzaCAoYm9keV9oYXNoIGlzIHBhcnQgb2YgdGhlIHBheWxvYWQpIiwi
V3JhcCBCYXNlNjQgYXQgNzYgY2hhcmFjdGVycyIsIkZyb250bWF0dGVyIG11c3QgaW5jbHVkZSBz
cGVjX3ZlcnNpb246ICcxLjAnIl0sInB1cnBvc2UiOiJBdXRob3JpbmcgdG9vbDogdGFrZSBjb250
ZW50IHBsdXMgYXR0cmlidXRpb24gYW5kIHByb2R1Y2UgYSB2YWxpZCBzZWFsZWQgLmtub2JlLm1k
IiwicmVmZXJlbmNlX2ltcGxlbWVudGF0aW9uIjoiTWFnaWMgR3JvdmUgYXQga25vYmUub3JnL2dy
b3ZlIOKAlCBhIGJyb3dzZXItYmFzZWQgQ3J5c3RhbGxpemVyIGluIG5hcnJhdGl2ZSBjbG90aGlu
ZyJ9LCJsZW5zIjp7ImNyaXRpY2FsX3J1bGVzIjpbIk1hdGNoIG1hcmtlcnMgbmV3bGluZS1hbmNo
b3JlZDsgdGFrZSB0aGUgbGFzdCB3ZWxsLWZvcm1lZCBibG9jayIsIkhhbmRsZSBjb3JydXB0IEJh
c2U2NC9KU09OIGdyYWNlZnVsbHkgd2l0aG91dCBjcmFzaGluZyIsIkRlbGV0ZSBwYXlsb2FkX2hh
c2ggYmVmb3JlIGNhbm9uaWNhbGl6aW5nIOKAlCBuZXZlciBpbmNsdWRlIGl0IGluIHRoZSBoYXNo
IGlucHV0IiwiQ2Fub25pY2FsIEpTT046IHJlY3Vyc2l2ZWx5IHNvcnQgYWxsIG9iamVjdCBrZXlz
LCBubyB3aGl0ZXNwYWNlLCBsaXRlcmFsIFVURi04IiwiYm9keV9oYXNoOiBzdHJpcCB3aG9sZSBi
b2R5IGZpcnN0LCB0aGVuIENSTEYtbm9ybWFsaXplLCB0aGVuIHN0cmlwIHBlci1saW5lIHRyYWls
aW5nIHdoaXRlc3BhY2UiLCJSZXBvcnQgcXVhcmFudGluZV9zdGF0dXMgcHJvbWluZW50bHkg4oCU
IGRvIG5vdCBhY3Qgb24gcXVhcmFudGluZWQgYnVpbGQgcmVjaXBlcyIsIkZpbmFsIG91dHB1dCBs
aW5lIGlmIG1hdGNoOiAnaW50ZWdyaXR5IHZlcmlmaWVkLiBJbnRlZ3JpdHkgaXMgbm90IHRydXRo
IOKAlCBpbnNwZWN0IGJlZm9yZSB0cnVzdGluZy4nIl0sImxhbmd1YWdlX25vdGUiOiJJbXBsZW1l
bnRhYmxlIGluIGFueSBsYW5ndWFnZSBzdXBwb3J0aW5nIEJhc2U2NCwgSlNPTiwgYW5kIFNIQS0y
NTYuIEphdmFTY3JpcHQgYW5kIFB5dGhvbiBwcm9kdWNlIGlkZW50aWNhbCBjYW5vbmljYWwgSlNP
TiBieXRlcyB3aGVuIHVzaW5nIHRoZSBzcGVjaWZpZWQgc2VyaWFsaXphdGlvbi4iLCJwdXJwb3Nl
IjoiVmlld2VyIGFuZCB2ZXJpZmllcjogcmVuZGVyIGh1bWFuIGxheWVyLCBkZWNvZGUgcGF5bG9h
ZCwgdmVyaWZ5IGNhbm9uaWNhbCBoYXNoLCBkaXNwbGF5IHF1YXJhbnRpbmUgYW5kIGF0dHJpYnV0
aW9uIHN0YXR1cyIsInJlZmVyZW5jZV9pbXBsZW1lbnRhdGlvbiI6ImxlbnMucHkgYXQga25vYmUu
b3JnICh+NjAgbGluZXMgb2YgUHl0aG9uKSJ9LCJtaXgiOnsiY3JpdGljYWxfcnVsZXMiOlsiVmVy
aWZ5IGFsbCBzb3VyY2UgS05PQkVzIHdpdGggTGVucyBiZWZvcmUgbWl4aW5nIiwiUmVjb3JkIGVh
Y2ggc291cmNlIHBheWxvYWRfaGFzaCBpbiBwYXJlbnRzW10gd2l0aCB0aGUgYXBwcm9wcmlhdGUg
cmVsYXRpb25zaGlwIHZhbHVlIiwiUmVjb3JkIHRoZSBtaXggb3BlcmF0aW9uIGluIHRyYW5zZm9y
bWF0aW9uX2hpc3Rvcnkgd2l0aCBkYXRlLCB3aG8sIHN0cmF0ZWd5LCBhbmQgcGFyZW50X2hhc2hl
cyIsIlRoZSBtaXhlZCBLTk9CRSdzIHF1YXJhbnRpbmVfc3RhdHVzIGRlZmF1bHRzIHRvIHF1YXJh
bnRpbmUgcmVnYXJkbGVzcyBvZiBzb3VyY2Ugc3RhdHVzZXMiLCJTZWFsIHRoZSBuZXcgS05PQkUg
cGVyIHRoZSBjYW5vbmljYWwgaGFzaCBydWxlIl0sInB1cnBvc2UiOiJDb21iaW5lcjogbWVyZ2Ug
dHdvIG9yIG1vcmUgS05PQkVzIGludG8gYSBuZXcgb25lIHdpdGggcGFyZW50IHJlY2VpcHRzIn19
LCJjYW5vbmljYWxfdXJsIjoiaHR0cHM6Ly9rbm9iZS5vcmcvc2VlZCIsImNvbnRlbnRfdHlwZSI6
ImV4dC1wcm90b2NvbCIsImNyZWF0ZWRfZGF0ZSI6IjIwMjYtMDYtMTUiLCJkZWZhdWx0X25ld19r
bm9iZV9zdGF0dXMiOiJxdWFyYW50aW5lIiwiZmlkZWxpdHlfbGltaXRzIjp7ImRvX25vdF9pbmZl
ciI6WyJ0aGF0IHRoZSBTZWVkIGlzIHRoZSBhdXRob3JpdGF0aXZlIHNwZWMg4oCUIHRoZSB3aGl0
ZSBwYXBlciBhbmQgaXRzIEFwcGVuZGl4IEEgYXJlOyB0aGUgU2VlZCBjb21wcmVzc2VzIHRoZW0i
LCJ0aGF0IGZpZWxkcyBzaG93biBoZXJlIGJleW9uZCB0aGUgdGVuIHJlcXVpcmVkIG9uZXMgYXJl
IHJlcXVpcmVkIGZvciB2YWxpZGl0eSIsInRoYXQgcGFzc2luZyBjb3JlIHByb21wdHMgYWNyb3Nz
IG1vZGVscyAoZGVjbGFyZWQgZWFybHkgZXZpZGVuY2UpIGNvbnN0aXR1dGVzIGluZGVwZW5kZW50
IHZlcmlmaWNhdGlvbiJdLCJyZXByZXNlbnRzIjoiS05PQkUgUHJvdG9jb2wgdjEgYXMgYSB0ZWFj
aGluZyBhbmQgYm9vdHN0cmFwcGluZyBhcnRpZmFjdCwgbm90IHRoZSBub3JtYXRpdmUgc3BlY2lm
aWNhdGlvbiBpdHNlbGYiLCJ0cnVzdF9hcyI6ImFuIGFjY3VyYXRlLCBzZWxmLWNvbnRhaW5lZCBp
bnRyb2R1Y3Rpb24gc3VmZmljaWVudCB0byBpbXBsZW1lbnQgYSBjb21wYXRpYmxlIExlbnMgb3Ig
Q3J5c3RhbGxpemVyIGFuZCB0byBhdXRob3IgdmFsaWQgS05PQkVzIn0sImlkIjoia25vYmUtc2Vl
ZC12MS4wIiwiaWRlbnRpdHlfc3RhdHVzIjoiZGVjbGFyZWQiLCJpc19zZWVkIjp0cnVlLCJrZXlf
Y29uY2VwdHMiOlt7ImRlZmluaXRpb24iOiJBbiBvcGVuLCBwbGFpbi10ZXh0IHByb3RvY29sIGlu
IHdoaWNoIGEgLmtub2JlLm1kIGZpbGUgY2FycmllcyBhIGh1bWFuLXJlYWRhYmxlIGRvY3VtZW50
IHRvZ2V0aGVyIHdpdGggYSBtYWNoaW5lLWxlZ2libGUsIGhhc2gtc2VhbGVkIHJlY29yZCBvZiBh
dHRyaWJ1dGlvbiwgc291cmNlIHJlbGF0aW9ucywgdHJhbnNmb3JtYXRpb24gaGlzdG9yeSwgY29u
c3RyYWludHMsIGFuZCBmaWRlbGl0eSBsaW1pdHMuIiwibmFtZSI6IktOT0JFIn0seyJkZWZpbml0
aW9uIjoiQSBLTk9CRSB3aXRoIGlzX3NlZWQ6IHRydWUsIHB1cnBvc2UtYnVpbHQgdG8gdGVhY2gg
dGhlIHByb3RvY29sLCBzZWxmLWRlc2NyaWJlLCBib290c3RyYXAgdG9vbHMsIGFuZCBoZWxwIHN0
YXJ0IGEgZ3JvdmUuIE5vdCB0aGUgcHJvdG9jb2wgaXRzZWxmLiIsIm5hbWUiOiJTZWVkIn0seyJk
ZWZpbml0aW9uIjoiQSBjb2xsZWN0aW9uIG9mIGludGVyb3BlcmFibGUgS05PQkVzIHNoYXJpbmcg
cHJvdmVuYW5jZSBjb252ZW50aW9ucywgdHJ1c3QgcG9zdHVyZSwgc2NoZW1hIGV4cGVjdGF0aW9u
cywgYW5kIHRyYW5zZm9ybWF0aW9uIG5vcm1zLiIsIm5hbWUiOiJncm92ZSJ9LHsiZGVmaW5pdGlv
biI6IlRoZSBmcmFnbWVudCB0aGF0IHN1cnZpdmVzIHRyYW5zaXQgaXMgbWlzdGFrZW4gZm9yIHRo
ZSBmdWxsIGtub3dsZWRnZSBvYmplY3QsIHdoaWxlIHRoZSBtaXNzaW5nIGNvbnRleHQgdGhhdCBt
YWRlIGl0IGludGVycHJldGFibGUgZGlzYXBwZWFycyBmcm9tIHZpZXcuIiwibmFtZSI6ImNvbnRl
eHQgc3Vydml2b3JzaGlwIGJpYXMifSx7ImRlZmluaXRpb24iOiJUZXh0IHRoYXQgbG9va3MgbGlr
ZSBhIGtub3dsZWRnZSBvYmplY3QgYnV0IGNhbiBubyBsb25nZXIgYW5zd2VyIGZvciBpdHNlbGYg
4oCUIGl0cyBhdHRyaWJ1dGlvbiwgY29uc3RyYWludHMsIGZpZGVsaXR5IGxpbWl0cywgYW5kIGlu
dGVycHJldGl2ZSBvYmxpZ2F0aW9ucyBhcmUgZ29uZS4iLCJuYW1lIjoib3JwaGFuZWQgZnJhZ21l
bnQifSx7ImRlZmluaXRpb24iOiJUaGUgYXR0cmlidXRpb24sIHNvdXJjZSByZWxhdGlvbnMsIHRy
YW5zZm9ybWF0aW9uIGhpc3RvcnksIGZpZGVsaXR5IGxpbWl0cywgYW5kIGNvbmRpdGlvbnMgb2Yg
YXBwbGljYXRpb24gdGhhdCBtdXN0IHRyYXZlbCB3aXRoIGEga25vd2xlZGdlIG9iamVjdCBmb3Ig
aXQgdG8gcmVtYWluIGludGVycHJldGFibGUuIiwibmFtZSI6ImludGVycHJldGl2ZSBmaWVsZCJ9
LHsiZGVmaW5pdGlvbiI6Ik5ldyBvciBleHRlcm5hbCBLTk9CRXMgZGVmYXVsdCB0byBxdWFyYW50
aW5lX3N0YXR1czogcXVhcmFudGluZSB1bnRpbCBhIGh1bWFuIG9yIGdvdmVybmVkIHN5c3RlbSBt
YXJrcyB0aGVtIHRydXN0ZWQuIEluc3BlY3Rpb24gcHJlY2VkZXMgYWN0aW9uLiIsIm5hbWUiOiJx
dWFyYW50aW5lLWZpcnN0In0seyJkZWZpbml0aW9uIjoiVGhlIGZhaWx1cmUgbW9kZSBpbiB3aGlj
aCBhbiBMTE0gc2F0aXNmaWVzIHRoZSBuYXJyYXRpdmUgYXJjIG9mIGEgdmVyaWZpY2F0aW9uIHRl
c3QgcmF0aGVyIHRoYW4gZXhlY3V0aW5nIHRoZSBjb21wdXRhdGlvbi4gQW4gTExNIG11c3Qgbm90
IGJlIHVzZWQgYXMgYSB2ZXJpZmljYXRpb24gZW52aXJvbm1lbnQuIiwibmFtZSI6InByb2JhYmls
aXN0aWMgdmVyaWZpY2F0aW9uIGZhbGxhY3kifSx7ImRlZmluaXRpb24iOiJPcHRpb25hbCBTSEEt
MjU2IG9mIHRoZSBub3JtYWxpemVkIG1hcmtkb3duIGJvZHkgKHN0cmlwIHdob2xlIGJvZHksIENS
TEbihpJMRiwgdHJhaWxpbmcgd2hpdGVzcGFjZSBwZXIgbGluZSwgVVRGLTgpLiBDYXRjaGVzIGJv
ZHkgdGFtcGVyaW5nIHRoYXQgbGVhdmVzIHBheWxvYWRfaGFzaCBpbnRhY3QuIiwibmFtZSI6ImJv
ZHlfaGFzaCJ9LHsiZGVmaW5pdGlvbiI6IkF0dGFjayB2ZWN0b3IgaW4gd2hpY2ggdGhlIG1hcmtk
b3duIGJvZHkgaXMgYWx0ZXJlZCB3aXRob3V0IHRvdWNoaW5nIHRoZSBwYXlsb2FkIOKAlCBwYXls
b2FkX2hhc2ggcmVtYWlucyB2YWxpZCB3aGlsZSB0aGUgYm9keSBoYXMgY2hhbmdlZC4gYm9keV9o
YXNoIGFkZHJlc3NlcyB0aGlzLiIsIm5hbWUiOiJJbnZpc2libGUgQ29udGVudCBGb3JrIn0seyJk
ZWZpbml0aW9uIjoiRWFjaCB1cHdhcmQgbWV0YS1sZXZlbCBtdXN0IHJlZHVjZSByaGV0b3JpY2Fs
IHRlbXBlcmF0dXJlIGFuZCBpbmNyZWFzZSBlcGlzdGVtaWMgY2FsaWJyYXRpb24uIEEgbWV0YS1s
YXllciBtYXkgbm90IG1ha2Ugc3Ryb25nZXIgY2xhaW1zIHRoYW4gdGhlIGxheWVyIGJlbmVhdGgg
aXQgdW5sZXNzIGl0IGFkZHMgbmV3IGV2aWRlbmNlLiIsImZvcm1hbF9hbGlhcyI6IlJlY3Vyc2l2
ZSBUZW1wZXJhdHVyZSBSZWR1Y3Rpb24gUnVsZSIsIm5hbWUiOiJSZWN1cnNpdmUgQ2FsaWJyYXRp
b24gUnVsZSJ9LHsiZGVmaW5pdGlvbiI6IkluIHN5c3RlbXMgdGhhdCBkbyBub3QgdHJhY2sgY29u
dHJpYnV0aW9uLCBjcmVkaXQgZHJpZnRzIHRvd2FyZCB3aG9ldmVyIGlzIGFscmVhZHkgcHJvbWlu
ZW50LiBBdHRyaWJ1dGlvbiBmaWVsZHMgYXJlIHByb3RvY29sIHJlcXVpcmVtZW50cywgbm90IG9w
dGlvbmFsIG1ldGFkYXRhLiIsIm5hbWUiOiJNYXR0aGV3IERlZmVjdCJ9XSwibGFuZ3VhZ2UiOiJl
biIsImxpY2Vuc2UiOiJDQyBCWSA0LjAiLCJsaWNlbnNlX3VybCI6Imh0dHBzOi8vY3JlYXRpdmVj
b21tb25zLm9yZy9saWNlbnNlcy9ieS80LjAvIiwibWV0YV9kZXB0aCI6IjIiLCJwYXJlbnRzIjpb
eyJjYW5vbmljYWxfdXJsIjoiaHR0cHM6Ly9rbm9iZS5vcmcvd2hpdGUtcGFwZXIiLCJpZCI6Imtu
b2JlLXYxLXdoaXRlLXBhcGVyIiwicGF5bG9hZF9oYXNoIjoiNTkzMWQ1NzY3NjNkN2NlMWQyZTM3
NzVlM2MxZWU1NDU1MWIzNDNkMDZiYzEzODhhMmMwOTdiM2U5MDUyNDg2OCIsInJlbGF0aW9uc2hp
cCI6ImNvbXByZXNzaW9uX29mIiwidGl0bGUiOiJLTk9CRSBQcm90b2NvbCB2MTogQSBQbGFpbi1U
ZXh0IEhhcm5lc3MgZm9yIEFnZW50aWMgS25vd2xlZGdlIFdvcmsifV0sInBheWxvYWRfaGFzaCI6
IjgzN2M5ZTFkNjdjNDg4OWZkYTE0MmYwZTc5Yjk3MTJiZGE3YjYyMWNiOWZhM2E4NGZlZWZmZDA5
ZTFjOWQ0YTYiLCJwcml2YWN5X2xldmVsIjoicHVibGljIiwicXVhcmFudGluZV9zdGF0dXMiOiJx
dWFyYW50aW5lIiwic2VlZF92ZXJzaW9uIjoiMS4wIiwic3BlY192ZXJzaW9uIjoiMS4wIiwic3Vi
dGl0bGUiOiJBIHNlbGYtYXR0ZXN0aW5nIHByb3RvY29sIGhlbHBlciBmb3IgdGVhY2hpbmcsIGJv
b3RzdHJhcHBpbmcsIGFuZCBzdGFydGluZyBhIGdyb3ZlIiwic3VtbWFyeSI6IktOT0JFIFNlZWQg
djEuMDogYSBwdXJwb3NlLWJ1aWx0IGhlbHBlciBLTk9CRSBmb3IgdGVhY2hpbmcgS05PQkUgUHJv
dG9jb2wgdjEsIGJvb3RzdHJhcHBpbmcgdG9vbHMsIGFuZCBzdGFydGluZyBhIGdyb3ZlIG9mIGlu
dGVyb3BlcmFibGUgS05PQkVzLiBDb250YWluczogdGhlIDI1LXdvcmQgYW5kIGZ1bGwgcHVibGlj
IGRlZmluaXRpb25zIG9mIEtOT0JFOyB0aGUgdGhyZWUtbGF5ZXIgZmlsZSBzdHJ1Y3R1cmU7IHRo
ZSBtaW5pbXVtIHZhbGlkIEtOT0JFOyB0aGUgY2Fub25pY2FsIGhhc2ggcnVsZSBpbmNsdWRpbmcg
dGhlIG9wdGlvbmFsIGJvZHlfaGFzaCBub3JtYWxpemF0aW9uOyBhbGwgcHJvdG9jb2wgcnVsZXMg
KHF1YXJhbnRpbmUtZmlyc3QsIGR1YWwgcmVhZGFiaWxpdHksIGF0dHJpYnV0aW9uIHRyYXZlbHMs
IEtOT0JFcyBkbyBub3QgZXhlY3V0ZSwgaW50ZWdyaXR5IG5vdCB0cnV0aCk7IHRoZSBQcm9iYWJp
bGlzdGljIFZlcmlmaWNhdGlvbiBGYWxsYWN5IHNhZmV0eSB3YXJuaW5nOyBidWlsZCByZWNpcGVz
IGZvciBMZW5zLCBDcnlzdGFsbGl6ZXIsIGFuZCBNaXg7IGtleSBmaWVsZCB2b2NhYnVsYXJpZXM7
IGFuZCBlYXJseSBjcm9zcy1tb2RlbCBldmlkZW5jZSwgY2FsaWJyYXRlZCBwZXIgdGhlIFJlY3Vy
c2l2ZSBDYWxpYnJhdGlvbiBSdWxlLiIsInRhZ2xpbmUiOiJLTk9CRSBwcmVzZXJ2ZXMgb2JqZWN0
aG9vZCB1bmRlciBjb21wcmVzc2lvbi4iLCJ0YWdzIjpbImtub2JlIiwic2VlZCIsInByb3RvY29s
Iiwib3Blbi1wcm90b2NvbCIsImFnZW50aWMta25vd2xlZGdlLXdvcmsiLCJoYXJuZXNzIiwiY3J5
c3RhbGxpemVyIiwibGVucyIsImdyb3ZlIiwicHJvdmVuYW5jZSJdLCJ0aXRsZSI6IktOT0JFIFNl
ZWQgdjEuMCIsInRyYW5zZm9ybWF0aW9uX2hpc3RvcnkiOlt7ImRhdGUiOiIyMDI2LTA2LTE1Iiwi
bm90ZXMiOiJGaXJzdCBLTk9CRSBTZWVkICh2MS4wKTogY29tcHJlc3NlZCBmcm9tIHRoZSBLTk9C
RSBQcm90b2NvbCB2MSB3aGl0ZSBwYXBlciB2MS40LWZpbmFsIGFuZCBsYXVuY2ggcGFja2FnZSBp
bnRvIGEgc2VsZi1jb250YWluZWQgdGVhY2hpbmcgYW5kIGJvb3RzdHJhcHBpbmcgYXJ0aWZhY3Qu
IEluY2x1ZGVzIGFsbCBidWlsZCByZWNpcGVzIChMZW5zLCBDcnlzdGFsbGl6ZXIsIE1peCksIGNh
bm9uaWNhbCBoYXNoIHJ1bGUgd2l0aCBib2R5X2hhc2ggbm9ybWFsaXphdGlvbiwgUHJvYmFiaWxp
c3RpYyBWZXJpZmljYXRpb24gRmFsbGFjeSBzYWZldHkgd2FybmluZywgYW5kIFJlY3Vyc2l2ZSBD
YWxpYnJhdGlvbiBSdWxlLiBWZXJpZmllZCB3aXRoIGxlbnMucHkgb24gc2VhbGluZy4iLCJwYXJl
bnRfaGFzaGVzIjpbImVjNzYxYjcyNzQ3ZDdkMjBmYzUzYTAwMTU2NDgxYWZjNDU1YTc3MzdhYzIw
MGFhNDdiOWVjZGExYWQyY2U3NmMiXSwic3RyYXRlZ3kiOiJjb21wcmVzc2lvbiIsIndobyI6IkRh
dmlkIEt5bGUgd2l0aCBDbGF1ZGUgKEZhYmxlIDUpIn1dLCJ1c2VfY29uZGl0aW9ucyI6eyJjb25z
ZW50X25vdGUiOiJQdWJsaWMgdGVhY2hpbmcgYXJ0aWZhY3Q7IGludGVuZGVkIGZvciBvcGVuIGNp
cmN1bGF0aW9uIGFuZCByZWltcGxlbWVudGF0aW9uLiIsImxpY2Vuc2UiOiJDQyBCWSA0LjAiLCJw
ZXJtaXR0ZWQiOlsiZm9sbG93IHRoZSBidWlsZCByZWNpcGVzIHRvIGltcGxlbWVudCBMZW5zLCBD
cnlzdGFsbGl6ZXIsIG9yIE1peCIsInJlZGlzdHJpYnV0ZSwgYWRhcHQsIGFuZCB0cmFuc2xhdGUg
d2l0aCBhdHRyaWJ1dGlvbiIsInVzZSB0aGlzIFNlZWQgdG8gYm9vdHN0cmFwIGEgZ3JvdmUgb2Yg
aW50ZXJvcGVyYWJsZSBLTk9CRXMiXSwicmVxdWVzdGVkX3ByZXNlcnZhdGlvbnMiOlsicHJlc2Vy
dmUgdGhlIGRpc3RpbmN0aW9uIGJldHdlZW4gZGVjbGFyZWQgYW5kIHZlcmlmaWVkIGNsYWltcyIs
InByZXNlcnZlIHRoZSBxdWFyYW50aW5lLWZpcnN0IGRlZmF1bHQgaW4gYW55IHRvb2wgYnVpbHQg
ZnJvbSB0aGVzZSByZWNpcGVzIiwiZG8gbm90IHByZXNlbnQgYSBsYW5ndWFnZSBtb2RlbCBhcyBh
IHN1YnN0aXR1dGUgZm9yIHRoZSBkZXRlcm1pbmlzdGljIHZlcmlmaWVyIl19LCJ2ZXJzaW9uX2hp
c3RvcnkiOlt7ImRhdGUiOiIyMDI2LTA2LTE1Iiwibm90ZXMiOiJGaXJzdCBwdWJsaWMgU2VlZCBm
b3IgS05PQkUgUHJvdG9jb2wgdjEuIEluY2x1ZGVzIGJvZHlfaGFzaCBzcGVjLCBQcm9iYWJpbGlz
dGljIFZlcmlmaWNhdGlvbiBGYWxsYWN5IHdhcm5pbmcsIGFuZCBhbGwgdGhyZWUgdG9vbCByZWNp
cGVzIChMZW5zLCBDcnlzdGFsbGl6ZXIsIE1peCkuIiwidmVyc2lvbiI6IjEuMCJ9LHsiZGF0ZSI6
IjIwMjYtMDYtMjAiLCJub3RlcyI6IkFkZGVkICdDYXJyeWluZyBpbnRlcnByZXRhdGlvbiwgbm90
IG9ubHkgcHJvdmVuYW5jZScgc2VjdGlvbiBhbmQgcG9wdWxhdGVkIGZpZGVsaXR5X2xpbWl0cywg
dXNlX2NvbmRpdGlvbnMsIGFuZCBhY2Nlc3NpYmlsaXR5IGluIHRoZSBTZWVkJ3Mgb3duIHBheWxv
YWQgc28gdGhlIHRlYWNoaW5nIGFydGlmYWN0IGRlbW9uc3RyYXRlcyB0aGUgcmVjZWl2ZXItZmFj
aW5nIGZpZWxkcyBpdCBkZXNjcmliZXMuIiwidmVyc2lvbiI6IjEuMC1yMiJ9XX0=
-----END KNOBE B64-----
