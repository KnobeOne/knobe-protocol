---
title: "KNOBE Protocol v1 — NotebookLM Companion Guide"
spec_version: "1.0"
content_type: seed
privacy_level: public
quarantine_status: quarantine
created_date: "2026-06-22"
---

# KNOBE Protocol v1 — NotebookLM Companion Guide

*Upload this file and the six KNOBE files listed below into a new NotebookLM notebook. Then use the question sets in this guide to explore what the notebook can and cannot tell you — and what the KNOBE protocol adds.*

---

## What to upload

Add these six files as sources in your NotebookLM notebook:

1. `knobe-v1-notebooklm-guide.knobe.md` — this file
2. `knobe-v1-white-paper.knobe.md` — the protocol white paper
3. `knobe-v1-plain-language-summary.knobe.md` — a plain-language adaptation of the white paper
4. `knobe-education-reading.knobe.md` — an assigned course reading
5. `knobe-education-assignment.knobe.md` — the instructor assignment specification
6. `knobe-education-example.knobe.md` — a student reflection responding to both

All six are plain-text markdown files. NotebookLM will read their bodies and YAML frontmatter as it would any markdown document. The payload blocks at the bottom of each file will appear as Base64-encoded text — readable but not machine-verified without `lens.py`.

---

## Question Set A — What NotebookLM can answer

Ask these questions in your notebook. NotebookLM should answer them well from the document text:

- What is context survivorship bias?
- What are the three layers of a KNOBE file?
- What is the difference between `fidelity_limits` and `use_conditions`?
- What did the AI assistant contribute to the student reflection?
- What AI policy applied to the SOC 150 assignment?
- According to the white paper, what does the hash prove — and what does it not prove?
- What is the difference between the white paper and the plain-language summary?
- What does quarantine-first mean?
- Who is the steward of the KNOBE protocol?

These questions are well-served by the document text. NotebookLM will synthesize across sources and give you useful answers.

---

## Question Set B — What NotebookLM cannot answer

Ask these questions next. Notice where the answers require the protocol rather than the text:

- **Has the white paper been altered since it was sealed?**
  NotebookLM cannot verify this. It can describe what the hash is for, but it cannot run the check. `lens.py` answers in one line: `status: verified` or `status: failed`.

- **Is the plain-language summary faithfully linked to the white paper?**
  NotebookLM may infer a relationship from the text. What it cannot confirm is whether the `adapted_from` field in the summary's payload actually matches the white paper's `payload_hash`. That requires a hash comparison.

- **Is the student reflection's parent the correct version of the assignment specification?**
  The reflection claims to respond to a specific sealed assignment. NotebookLM cannot verify that the assignment it references is the one sealed at `7c2cb527…`. It can only read what the body says.

- **Which of these documents are trusted and which are quarantined?**
  The white paper and the three education files carry different `quarantine_status` values — some `trusted`, some `quarantine`. NotebookLM will tell you what these fields mean. It cannot tell you what an institution should do with that distinction.

- **Has the student reflection changed since submission?**
  If the reflection's body has been edited since sealing, `lens.py` will return `status: verified-body-modified`. NotebookLM has no way to detect this. It reads the current body text, not the sealed state.

- **Are the fidelity limits of the plain-language summary visible to the model reading it?**
  The fidelity limits are in the payload as Base64-encoded JSON. NotebookLM may see the raw Base64 text as document text, but it should not be treated as a protocol verifier: it does not run `lens.py`, confirm hashes, or apply the structured fields as receiver-facing constraints. It cannot tell you that the summary's fidelity limits explicitly say "do not infer that this captures all nuance or evidence in the original."

---

## What the contrast shows

NotebookLM is an excellent tool for reading, synthesising, and questioning document collections. It handles the text layer of KNOBE files very well.

What it cannot do:

- Verify that a document is unaltered since sealing
- Distinguish between objects that are quarantined (untrusted) and objects that are trusted
- Follow the parent-child lineage between documents by payload hash
- Apply `fidelity_limits` as receiver-facing interpretive constraints
- Honour `use_conditions` as declared terms on the objects it processes

This is not a criticism of NotebookLM. It is doing what it is designed to do: make documents legible to an AI that can answer questions about them.

KNOBE addresses a different and complementary problem: making the conditions under which those documents should be interpreted legible to the next person or system that receives them — including the AI reading them in NotebookLM.

A document that knows it is an unverified simplification of a more authoritative source, with specific fidelity limits and consent terms, carries something that plain text does not. Whether the receiving system honours that context is a separate question. But the object has still made it visible.

A note on what counts: a sufficiently capable model may sometimes infer or decode information from the payload text if prompted directly. That is not the same as protocol verification. The question is not whether the model can describe the payload, but whether it can compute and report the KNOBE verification state according to the v1 specification. Verification is computed, not narrated.

---

## Try it yourself

After exploring the notebook:

1. Download `lens.py` from knobe.org
2. Run `python3 lens.py knobe-v1-white-paper.knobe.md`
3. Compare what you learn from the verifier to what the notebook told you

The verifier gives you four possible states. The notebook gives you a synthesis. Both are useful. They are not the same thing.

---

## About this file

This file is itself a sealed KNOBE. Its payload carries attribution, fidelity limits, and use conditions. You can verify it with `lens.py` like any other KNOBE in the set.

-----BEGIN KNOBE B64-----
eyJhdHRyaWJ1dGlvbiI6eyJnb29kX2ZhaXRoX2RlY2xhcmF0aW9uIjp0cnVlLCJzb3VyY2VzIjpb
eyJhdXRob3IiOiJEYXZpZCBLeWxlIiwiY29udHJpYnV0aW9uIjoiQ29uY2VpdmVkIHRoZSBOb3Rl
Ym9va0xNIGNvbXBhcmlzb24gZGVtbyBhbmQgZGlyZWN0ZWQgdGhlIGd1aWRlIHN0cnVjdHVyZS4i
LCJyaWdodHNfYmVhcmluZyI6dHJ1ZSwicm9sZSI6ImF1dGhvciJ9LHsiYXV0aG9yIjoiQ2xhdWRl
IChBbnRocm9waWMpIiwiY29udHJpYnV0aW9uIjoiRHJhZnRlZCB0aGUgZ3VpZGUgdGV4dCBhbmQg
cXVlc3Rpb24gc2V0cyB1bmRlciBEYXZpZCBLeWxlJ3MgZGlyZWN0aW9uLiIsInJpZ2h0c19iZWFy
aW5nIjpmYWxzZSwicm9sZSI6ImFpX2Fzc2lzdGFudCJ9XX0sImJvZHlfaGFzaCI6IjdhZTIwNWZh
MzY2NjlhMjA1OTk0OTEyMjVjNzRmZTczZWE5MDE0MjhiZjg1OWZhZThiMjdlNWU1MjU5M2I0Y2Ii
LCJjb250ZW50X3R5cGUiOiJzZWVkIiwiY3JlYXRlZF9kYXRlIjoiMjAyNi0wNi0yMiIsImZpZGVs
aXR5X2xpbWl0cyI6eyJkb19ub3RfaW5mZXIiOlsidGhhdCBOb3RlYm9va0xNJ3MgY2FwYWJpbGl0
aWVzIGFyZSBmaXhlZCDigJQgdGhleSBtYXkgY2hhbmdlIHdpdGggZnV0dXJlIHVwZGF0ZXMiLCJ0
aGF0IHRoZSBjb250cmFzdCBzaG93biBoZXJlIGFwcGxpZXMgdG8gYWxsIEFJIGRvY3VtZW50IHRv
b2xzIGVxdWFsbHkiLCJ0aGF0IHRoaXMgZ3VpZGUgY292ZXJzIGFsbCBLTk9CRSB1c2UgY2FzZXMi
XSwicmVwcmVzZW50cyI6ImEgc3RydWN0dXJlZCBkZW1vIGd1aWRlIGZvciBOb3RlYm9va0xNIHVz
ZXJzIGV4cGxvcmluZyBLTk9CRSBQcm90b2NvbCB2MSIsInRydXN0X2FzIjoiYW4gYWNjdXJhdGUg
ZGVzY3JpcHRpb24gb2Ygd2hhdCBOb3RlYm9va0xNIGNhbiBhbmQgY2Fubm90IGRvIHdpdGggS05P
QkUgZmlsZXMgYXMgb2YgSnVuZSAyMDI2In0sImlkZW50aXR5X3N0YXR1cyI6ImRlY2xhcmVkIiwi
bGFuZ3VhZ2UiOiJlbiIsImxpY2Vuc2UiOiJDQyBCWSA0LjAiLCJsaWNlbnNlX3VybCI6Imh0dHBz
Oi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS80LjAvIiwicGFyZW50cyI6W3sicGF5
bG9hZF9oYXNoIjoiNTkzMWQ1NzY3NjNkN2NlMWQyZTM3NzVlM2MxZWU1NDU1MWIzNDNkMDZiYzEz
ODhhMmMwOTdiM2U5MDUyNDg2OCIsInJlbGF0aW9uc2hpcCI6ImRlcml2ZWRfZnJvbSIsInRpdGxl
IjoiS05PQkUgUHJvdG9jb2wgdjEgV2hpdGUgUGFwZXIifSx7InBheWxvYWRfaGFzaCI6ImMxOWZm
YmMwNmFhMmEzODJmNDU3NzVlOGFlNzIxZWE1MmZmMTMwMTFkZTE1YzI2ODc5NjJlNmIyNDYxY2Nh
YzEiLCJyZWxhdGlvbnNoaXAiOiJzeW50aGVzaXNfaW5wdXQiLCJ0aXRsZSI6IktOT0JFIFByb3Rv
Y29sIHYxIFBsYWluLUxhbmd1YWdlIFN1bW1hcnkifSx7InBheWxvYWRfaGFzaCI6IjYwMTRiNThl
YjZmZjU3MmZlODQ0ZDM4OTM5NzE3NDM5NzlhNWJiZDFiNjA1OGI1MWNjNTljODkyYTdkZmI1NGUi
LCJyZWxhdGlvbnNoaXAiOiJzeW50aGVzaXNfaW5wdXQiLCJ0aXRsZSI6Iktub3dsZWRnZSBJbnN0
aXR1dGlvbnMgaW4gdGhlIEFnZSBvZiBDb250ZXh0IExvc3MifSx7InBheWxvYWRfaGFzaCI6ImU5
NjYzNjE3YTVjNDllYTkwN2FkYzBlOWRjZjYwNGUwM2JmNWM1ODVkMDY2OTQwNGQxNjY4MTdiNjc5
NzEzYmYiLCJyZWxhdGlvbnNoaXAiOiJzeW50aGVzaXNfaW5wdXQiLCJ0aXRsZSI6IkFzc2lnbm1l
bnQgMzogUmVhZGluZyBSZWZsZWN0aW9uIHdpdGggQUkgRGlzY2xvc3VyZSJ9LHsicGF5bG9hZF9o
YXNoIjoiZmQyNGU4YzYwZmU2ODhlZjJiYTEyMmQ4M2FmNDk1ODg3ODA5M2JhOTQ0ZjE1M2EyNzVk
ODExNmU1NDliZTY4OSIsInJlbGF0aW9uc2hpcCI6InN5bnRoZXNpc19pbnB1dCIsInRpdGxlIjoi
QUktQXNzaXN0ZWQgUmVmbGVjdGlvbjogUmVhZGluZyBTdW1tYXJ5IOKAlCBTT0MgMTUwIn1dLCJw
YXlsb2FkX2hhc2giOiJkZWQ5NGI3NzU2ZTA1YmVkODkzMzY2YmQ1ZWJjOWM2NThmNzA5YzRlMzU1
ZGQ3OWQyNjIwNmM4MzQ3Y2U0NDEwIiwicHJpdmFjeV9sZXZlbCI6InB1YmxpYyIsInF1YXJhbnRp
bmVfc3RhdHVzIjoicXVhcmFudGluZSIsInNwZWNfdmVyc2lvbiI6IjEuMCIsInN1bW1hcnkiOiJB
IGNvbXBhbmlvbiBndWlkZSBmb3IgZXhwbG9yaW5nIEtOT0JFIFByb3RvY29sIHYxIGluIE5vdGVi
b29rTE0uIFVwbG9hZCB0aGlzIGZpbGUgYWxvbmdzaWRlIHRoZSBzaXggbGlzdGVkIEtOT0JFIGZp
bGVzLiBUd28gcXVlc3Rpb24gc2V0cyBzaG93IHdoYXQgTm90ZWJvb2tMTSBjYW4gYW5zd2VyIGZy
b20gdGhlIGRvY3VtZW50IHRleHQgYW5kIHdoYXQgcmVxdWlyZXMgcnVubmluZyB0aGUgcHJvdG9j
b2wgdmVyaWZpZXIuIFRoZSBjb250cmFzdCBiZXR3ZWVuIHRoZSB0d28gaXMgdGhlIGRlbW9uc3Ry
YXRpb24uIiwidGFncyI6WyJub3RlYm9va2xtIiwiZGVtbyIsImNvbXBhbmlvbiIsImNvbXBhcmlz
b24iLCJlZHVjYXRpb24iXSwidGl0bGUiOiJLTk9CRSBQcm90b2NvbCB2MSDigJQgTm90ZWJvb2tM
TSBDb21wYW5pb24gR3VpZGUiLCJ1c2VfY29uZGl0aW9ucyI6eyJsaWNlbnNlIjoiQ0MgQlkgNC4w
IiwicGVybWl0dGVkIjpbInVwbG9hZCB0byBOb3RlYm9va0xNIGFzIHBhcnQgb2YgdGhlIGRlbW8g
c2V0IiwicmVkaXN0cmlidXRlIGFuZCBhZGFwdCB3aXRoIGF0dHJpYnV0aW9uIiwidXNlIGluIHRl
YWNoaW5nIGFuZCBkZW1vbnN0cmF0aW9ucyJdLCJyZXF1ZXN0ZWRfcHJlc2VydmF0aW9ucyI6WyJr
ZWVwIHRoZSB0d28gcXVlc3Rpb24gc2V0cyBwYWlyZWQg4oCUIHRoZXkgb25seSBtYWtlIHNlbnNl
IHRvZ2V0aGVyIiwicHJlc2VydmUgdGhlIGZpbmFsICd0cnkgaXQgeW91cnNlbGYnIHNlY3Rpb24i
XX19
-----END KNOBE B64-----
