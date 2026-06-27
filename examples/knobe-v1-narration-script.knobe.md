---
title: "KNOBE Protocol v1 — Narration Script"
spec_version: "1.0"
content_type: adaptation
privacy_level: public
quarantine_status: quarantine
created_date: "2026-06-22"
---

# KNOBE Protocol v1 — Narration Script

*For audio recording as a narrated explainer video.*
*Estimated duration: 12–14 minutes at a measured pace (~135 wpm).*
*Start recording on SLIDE 1 before showing the title slide.*

---

## [SLIDE 1 — The chain] — 0:00–1:45

A graduate student records an oral history interview. The transcript carries consent terms — a do-not-quote request and contextual notes that explain why the interviewee said what they said.

That transcript is summarised by an AI assistant to produce an abstract for a conference. Most of the words survive. The consent terms and the contextual notes do not.

The abstract is edited into a newsletter piece for a general audience. The attribution survives. The consent terms, the contextual notes, the fidelity limits — all gone.

The newsletter piece is cited in a grant report as evidence.

Every step here was reasonable. Nobody was malicious. But by the fourth step, the words still circulate, and everything that governed them has disappeared.

*[Pause two seconds.]*

---

## [SLIDE 0 — Title] — cut to title

This is KNOBE. KNOBE Protocol version one. An open, plain-text protocol for knowledge objects that keep their context when they move.

---

## [SLIDE 2 — Context survivorship bias] — 1:45–3:30

I call this context survivorship bias.

The fragment that survives transit is mistaken for the full knowledge object.

This is everywhere, once you see it. A file becomes a person. A credential becomes competence. A ranking becomes quality. A summary becomes the source. A model output becomes a decision basis.

The problem is not compression. Summary, quotation, translation, adaptation — we need all of these. The problem is compression without portable interpretive obligation. The words travel. The conditions that governed them stay behind.

---

## [SLIDE 3 — The answer] — 3:30–4:30

KNOBE makes it harder for fragments to pass as whole objects.

A KNOBE is not a database. It is not a platform. It is a plain-text file — a single markdown document — that carries its own interpretive context alongside its content. When the file moves, the context moves with it.

*[Pause one second.]*

KNOBE preserves objecthood under compression.

---

## [SLIDE 4 — Three layers] — 4:30–6:30

Here is what a KNOBE actually is.

Every .knobe.md file has three layers.

The first is YAML frontmatter — human-scannable metadata at the top of the file. Title, author, licence, date. Readable in any text editor in about two seconds.

The second is a markdown body — the document itself. Free-form. Opens in any editor, any AI assistant, any browser. No conversion required.

The third is a Base64-encoded JSON payload, delimited by begin and end markers. This is where the machine-readable record lives: attribution, transformation history, use conditions, accessibility adaptation lineage, and fidelity limits. It also carries the SHA-256 integrity hash.

A human reads the first two layers. A machine decodes the third. A verifier checks the hash. No sidecar file. No platform. No account.

The most important fields are not the hash. They are fidelity limits, use conditions, and accessibility. These carry what the next reader — or the next agent — needs in order to interpret the object correctly. Fidelity limits say how far the object can be trusted as a representation of its source. Use conditions carry the originator's declared terms forward. Accessibility records bind adaptations to their sources by hash and credit the adapter by name.

---

## [SLIDE 5 — Two protocol rules] — 6:30–7:45

Two rules govern what the protocol promises.

First: integrity, not truth. The hash proves the record is unaltered since sealing. It does not prove accuracy, attribution honesty, or trustworthiness. A liar can seal a lie. The seal then proves faithfully that the lie has not been edited. The green check is where inspection begins, not where it ends.

Second: quarantine-first. Every new or external KNOBE defaults to quarantine until a human or governed system reviews it. Verification and trust are separate steps. The verifier tells you the record is intact. You decide what to do next.

---

## [SLIDE 6 — System of context] — 7:45–8:45

Where does KNOBE fit in institutions that already have systems?

A system of context, not a system of record.

The learning management system keeps grades. The institutional review board keeps approvals. The repository keeps deposits. KNOBE carries context between them, in plain text, outside any of them.

It does not replace those systems. It lowers the cost of moving between them — while preserving what too often disappears in transit.

---

## [SLIDE 7 — Grove] — 8:45–9:45

Magic Grove is one no-login, no-AI way to author a KNOBE.

If you want to try this now, pause the video and open knobe.org/grove in any browser. The Grove asks plain-language questions about the work you are carrying and turns the answers into a sealed .knobe.md file. You were building a KNOBE the entire time.

Grove is not the protocol. It is one doorway into it — the gentlest one, designed for people who would rather make a first knowledge object than read a specification.

---

## [SLIDE 8 — Round trip] — 9:45–11:00

The reference verifier is called lens.py. It is about seventy lines of standard Python with no external dependencies.

You point it at a .knobe.md file. It extracts the payload, removes the stored hash field, serialises the remaining record in a strict canonical form, runs SHA-256, and compares the result to the stored hash.

The output is one of four states. Verified: the payload is intact. Verified-body-modified: the payload is intact but the body has changed since sealing. Failed: the payload has been altered. Unreadable: no verifiable payload block found.

Status: verified. Body verified: yes. Conformance: valid.

No server. No AI. Pure mathematics.

---

## [SLIDE 9 — Model verification case] — 11:00–11:45 — keep brief

One demonstration of why the verifier matters.

A large language model was asked to verify a KNOBE. It produced a plausible verification story: computed hash, stored hash, test passed. Both values were confabulated from the same hallucination.

We do not ask an AI whether the object verifies. We run the verifier.

*[Move on promptly.]*

---

## [SLIDE 10 — What it is not] — 11:45–12:30

A few things KNOBE is not.

Not a platform. Not a system of record. Not DRM or a smart contract. Not a truth machine. Not a way to open the AI black box — KNOBE carries human-supplied context around AI-mediated work; it does not expose a model's internal reasoning. Not only for AI workflows. Not a replacement for institutional systems. And not finished.

Seed stage means the protocol is open, the specification is public, and we are inviting people to find the gaps.

---

## [SLIDE 11 — Two layers] — 12:30–13:15

One positioning note for builders.

There are two complementary layers in AI-mediated knowledge work.

Harness infrastructure controls the conditions around an agent: execution policy, tool permissions, observability, memory architecture. The harness controls the encounter.

KNOBE governs the conditions carried by the artifact: attribution, transformation history, fidelity limits, interpretive obligations. The KNOBE preserves the object across encounters.

These are not competing. If the artifact arrives stripped of its context, no harness can reconstruct what was never carried.

---

## [SLIDE 12 — Invitation] — 13:15–14:00

Start here.

Make one KNOBE in the Grove. Open knobe.org/grove. Then read the education profile. It shows three course artifacts: an assigned reading, an instructor specification, and a student submission. They are linked by hash and checkable without a database. Then inspect the specification and try to verify one file yourself.

*[Pause three seconds.]*

KNOBE preserves objecthood under compression.

-----BEGIN KNOBE B64-----
eyJhdHRyaWJ1dGlvbiI6eyJnb29kX2ZhaXRoX2RlY2xhcmF0aW9uIjp0cnVlLCJzb3VyY2VzIjpb
eyJhdXRob3IiOiJEYXZpZCBLeWxlIiwiY29udHJpYnV0aW9uIjoiRGlyZWN0b3IgYW5kIGF1dGhv
ci4gUHJvdmlkZWQgYWxsIHNvdXJjZSBtYXRlcmlhbCwgZGV0ZXJtaW5lZCB0aGUgYXJjLCBhcHBy
b3ZlZCBhbGwgZnJhbWluZyBhbmQgbGFuZ3VhZ2UuIiwicmlnaHRzX2JlYXJpbmciOnRydWUsInJv
bGUiOiJhdXRob3IifSx7ImF1dGhvciI6IkNsYXVkZSAoQW50aHJvcGljKSIsImNvbnRyaWJ1dGlv
biI6IkRyYWZ0ZWQgdGhlIG5hcnJhdGlvbiBzY3JpcHQgZnJvbSB0aGUgc2xpZGUgZGVjayB1bmRl
ciBEYXZpZCBLeWxlJ3MgZGlyZWN0aW9uLiBUcmFuc2xhdGVkIHZpc3VhbCBzbGlkZSBlbGVtZW50
cyBpbnRvIGF1ZGlvIGRlc2NyaXB0aW9uOyBzZXQgdGltaW5nIG1hcmtzOyBhZGFwdGVkIHBocmFz
aW5nIGZvciBzcG9rZW4gZGVsaXZlcnkuIiwicmlnaHRzX2JlYXJpbmciOmZhbHNlLCJyb2xlIjoi
YWlfYXNzaXN0YW50In1dfSwiYm9keV9oYXNoIjoiZjhlZDg4MzA0MWVmYzhmN2VlYTc5NTkyZDU3
ZTQ1NzI0NjBiZjU0NTIzNGRlM2I1MzUyZTgxNmYxYTIxNGU1NCIsImNvbnRlbnRfdHlwZSI6ImFk
YXB0YXRpb24iLCJjcmVhdGVkX2RhdGUiOiIyMDI2LTA2LTIyIiwiZmlkZWxpdHlfbGltaXRzIjp7
ImRvX25vdF9pbmZlciI6WyJ0aGF0IHRoaXMgc2NyaXB0IGlzIHRoZSBjYW5vbmljYWwgd3JpdHRl
biBkZXNjcmlwdGlvbiBvZiBLTk9CRSDigJQgdGhhdCBpcyB0aGUgd2hpdGUgcGFwZXIiLCJ0aGF0
IHRpbWluZyBtYXJrcyBhcmUgcHJlY2lzZSDigJQgdGhleSBhcmUgZXN0aW1hdGVzIGF0IH4xMzUg
d3BtIiwidGhhdCB2aXN1YWwgZGVzY3JpcHRpb25zIGZ1bGx5IHN1YnN0aXR1dGUgZm9yIHZpZXdp
bmcgdGhlIHNsaWRlIGRlY2siXSwicmVwcmVzZW50cyI6InRoZSBuYXJyYXRpb24gdGV4dCBmb3Ig
dGhlIEtOT0JFIFByb3RvY29sIHYxIFlvdVR1YmUgZXhwbGFpbmVyIHZpZGVvLCBhZGFwdGVkIGZy
b20gdGhlIDEyLXNsaWRlIEhUTUwgcHJlc2VudGF0aW9uIiwic3VwZXJzZWRlcyI6Im5vdGhpbmc7
IHRoaXMgaXMgYSBuZXcgYXJ0aWZhY3QgcGFyYWxsZWwgdG8gdGhlIHNsaWRlIGRlY2siLCJ0cnVz
dF9hcyI6ImEgZmFpdGhmdWwgbmFycmF0aW9uIHNjcmlwdCBmb3IgdGhlIEtOT0JFIHYxIHBvc2l0
aW9uaW5nIGFuZCBwcm90b2NvbCBkZXNjcmlwdGlvbiBhcyBzZXR0bGVkIG9uIDIwMjYtMDYtMjEi
fSwiaWRlbnRpdHlfc3RhdHVzIjoiZGVjbGFyZWQiLCJsYW5ndWFnZSI6ImVuIiwibGljZW5zZSI6
IkNDIEJZIDQuMCIsImxpY2Vuc2VfdXJsIjoiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xp
Y2Vuc2VzL2J5LzQuMC8iLCJwYXJlbnRzIjpbeyJub3RlIjoiVGhlIDEyLXNsaWRlIEhUTUwgZGVj
ayAoa25vYmUtZHVibGluLXByZXNlbnRhdGlvbi5odG1sKSB0aGlzIHNjcmlwdCB3YXMgYWRhcHRl
ZCBmcm9tLiBOb3QgaXRzZWxmIGEgS05PQkU7IHJlZmVyZW5jZWQgYnkgdGl0bGUuIiwicmVsYXRp
b25zaGlwIjoiYWRhcHRhdGlvbl9vZiIsInRpdGxlIjoiS05PQkUgUHJvdG9jb2wgdjEg4oCUIFlv
dVR1YmUgUHJlc2VudGF0aW9uIERlY2sifSx7Im5vdGUiOiJUaGUgYXV0aG9yaXRhdGl2ZSBwcm90
b2NvbCBkZXNjcmlwdGlvbiB0aGlzIHNjcmlwdCBkcmF3cyBvbi4iLCJwYXlsb2FkX2hhc2giOiI1
OTMxZDU3Njc2M2Q3Y2UxZDJlMzc3NWUzYzFlZTU0NTUxYjM0M2QwNmJjMTM4OGEyYzA5N2IzZTkw
NTI0ODY4IiwicmVsYXRpb25zaGlwIjoiZGVyaXZlZF9mcm9tIiwidGl0bGUiOiJLTk9CRSBQcm90
b2NvbCB2MSBXaGl0ZSBQYXBlciJ9XSwicGF5bG9hZF9oYXNoIjoiNDU5YzcyYjM3ZjI5ODFhN2Qx
M2M5YThiOTEzNjkwNGNhNzNiMTU1N2JjOWQxZjU4OTFmNzBlOWRiYzYyYjcyZCIsInByaXZhY3lf
bGV2ZWwiOiJwdWJsaWMiLCJxdWFyYW50aW5lX3N0YXR1cyI6InF1YXJhbnRpbmUiLCJzcGVjX3Zl
cnNpb24iOiIxLjAiLCJzdW1tYXJ5IjoiVGhlIG5hcnJhdGlvbiBzY3JpcHQgZm9yIHRoZSBLTk9C
RSBQcm90b2NvbCB2MSBZb3VUdWJlIGV4cGxhaW5lciB2aWRlby4gQnJpdGlzaC12b2ljZSBBSSBu
YXJyYXRpb24gcmVjb21tZW5kZWQuIERlcml2ZWQgZnJvbSB0aGUgMTItc2xpZGUgSFRNTCBwcmVz
ZW50YXRpb247IGFsbCB2aXN1YWwgcmVmZXJlbmNlcyB0cmFuc2xhdGVkIGZvciBhdWRpbzsgdGlt
aW5nIG1hcmtzIGFuZCBzdGFnZSBkaXJlY3Rpb25zIGVtYmVkZGVkIGFzIHNlY3Rpb24gaGVhZGVy
cy4gQXBwcm94aW1hdGVseSAxLDc1MCB3b3JkczsgZXN0aW1hdGVkIGR1cmF0aW9uIDEy4oCTMTQg
bWludXRlcyBhdCBhIG1lYXN1cmVkIHBhY2UuIFRoZSBhdWRpbyByZWNvcmRpbmcgcHJvZHVjZWQg
ZnJvbSB0aGlzIHNjcmlwdCBzaG91bGQgY3JlZGl0IHRoaXMgcGF5bG9hZF9oYXNoIGFzIGl0cyBz
b3VyY2UuIiwidGFncyI6WyJuYXJyYXRpb24iLCJzY3JpcHQiLCJ5b3V0dWJlIiwiYXVkaW8iLCJr
bm9iZS1leHBsYWluZXIiXSwidGl0bGUiOiJLTk9CRSBQcm90b2NvbCB2MSDigJQgTmFycmF0aW9u
IFNjcmlwdCIsInRyYW5zZm9ybWF0aW9uX2hpc3RvcnkiOlt7ImRhdGUiOiIyMDI2LTA2LTIyIiwi
bm90ZXMiOiJUcmFuc2xhdGVkIHNsaWRlLWJ5LXNsaWRlIHZpc3VhbCBjb250ZW50IGludG8gc3Bv
a2VuIG5hcnJhdGlvbi4gUmVtb3ZlZCBsaXZlLWRlbW8gcmVmZXJlbmNlcywgYWRkZWQgdGltaW5n
IG1hcmtzLCB0cmFuc2xhdGVkICdsb29rIGF0IHRoZSBzbGlkZScgbGFuZ3VhZ2UgaW50byBhdWRp
byBkZXNjcmlwdGlvbi4gUHJlc2VydmVkIGFsbCBrZXkgcGhyYXNlcyBmcm9tIHRoZSBzZXR0bGVk
IHBvc2l0aW9uaW5nLiIsInN0cmF0ZWd5IjoiYWRhcHRhdGlvbiBmb3IgYXVkaW8gZGVsaXZlcnki
LCJ3aG8iOiJEYXZpZCBLeWxlIHdpdGggQ2xhdWRlIChBbnRocm9waWMpIn1dLCJ1c2VfY29uZGl0
aW9ucyI6eyJsaWNlbnNlIjoiQ0MgQlkgNC4wIiwicGVybWl0dGVkIjpbInJlY29yZCBhcyBhdWRp
byB3aXRoIGFueSB2b2ljZSBzeW50aGVzaXMgdG9vbCIsImRpc3RyaWJ1dGUgdGhlIHJlc3VsdGlu
ZyBhdWRpbyB1bmRlciBDQyBCWSA0LjAgd2l0aCBhdHRyaWJ1dGlvbiB0byBEYXZpZCBLeWxlIGFu
ZCBrbm9iZS5vcmciLCJhZGFwdCBwaHJhc2luZyBmb3IgcmVnaW9uYWwgcHJvbnVuY2lhdGlvbiBv
ciB0aW1pbmciXSwicmVxdWVzdGVkX3ByZXNlcnZhdGlvbnMiOlsiY3JlZGl0IHRoaXMgcGF5bG9h
ZF9oYXNoIGFzIHRoZSBzb3VyY2Ugc2NyaXB0IGluIGFueSBhdWRpbyByZWNvcmRpbmcncyBkZXNj
cmlwdGlvbiIsInByZXNlcnZlIHRoZSAnaW50ZWdyaXR5LCBub3QgdHJ1dGgnIGFuZCAncXVhcmFu
dGluZS1maXJzdCcgZnJhbWluZyBpbnRhY3QiLCJkbyBub3QgcmVtb3ZlIHRoZSAnd2hhdCBpdCBp
cyBub3QnIHNlY3Rpb24iXX19
-----END KNOBE B64-----
