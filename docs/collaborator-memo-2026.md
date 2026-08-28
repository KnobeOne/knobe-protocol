# Memo: KNOBE's 2026 repositioning

To: Collaborators and contributors, technical and non-technical
From: David Kyle
Date: August 28, 2026
Re: What changed in KNOBE's design doctrine, and what did not

This memo is written for everyone working with KNOBE, whether or not you
write code, because everyone here works in accessibility, and this
repositioning is mostly about accessibility. The main text uses plain
language throughout. A short technical section at the end fills in the
precise terms for readers who want them.

## In one paragraph

KNOBE is going back to the problem it was built to solve: helping AI
tools carry forward the sourcing and limits of a piece of work instead of
silently dropping them. Some newer features had started pointing the
other way, toward watching what students do rather than what AI tools do
with a document. Those features are pulled back. Nothing about the core
file format changed, and nothing already published, the specification,
the white paper, its permanent citation record, was touched or rewritten.

## What changed

- We wrote down a doctrine, in four documents, that says plainly: KNOBE
  describes a piece of work, never the person who made it. This applies
  to every feature going forward.
- A planned feature called the signet is on hold, with no plans to build
  it under the current rules. It would have given each person their own
  digital signing key, so their submitted work could be checked against
  the same person over time. Even done carefully, that is a way of
  tracking a person, and tracking a person is not what KNOBE is for.
- A feature called the cohort receipt stays, but with a firm limit
  written down. It lets a teacher generate one sealed record of what a
  batch of files looked like at check time, useful if a student disputes
  a result later. It will never become a running record of one student
  across a semester. That use is now explicitly ruled out, in writing.
- A piece of documentation called the time sandwich, which describes how
  a sealed file can prove it was created after an assignment existed,
  stays as a true, useful fact. It is no longer described or built as a
  way to catch late submissions.
- Accessibility adaptation, already a clean example of what KNOBE does
  well, becomes the lead example, not one use case among several. A
  plain-language summary, an audio narration script, a translated
  glossary: each carries its own sourcing and limits, and describes only
  the adapted material, never the person reading it.

## What did not change

- The core file format is frozen and stays frozen. Nothing about how a
  file is structured, sealed, or checked for tampering moved.
- Everything already published, the specification, the reference tools,
  the worked examples, is untouched.
- The white paper and its permanent citation record (a DOI, the academic
  equivalent of a permanent web address) stand exactly as published.
- The tools that let AI agents actually read and respect a sealed file,
  and the existing pages for education, enterprise, government, and
  research use, are unaffected by this round of changes. If they change
  later, it will be to give accessibility more emphasis, not to remove
  anything that already works.

## Why this matters, especially for accessibility work

KNOBE started from one specific worry: AI systems now do a large share of
the summarizing, translating, and repackaging of written work, and they
inherited sourcing practices that were already unreliable for humans, let
alone machines. When a document does not carry its own sourcing and
limits, an AI tool compresses the words and quietly drops what made them
trustworthy or usable. The people most likely to be dropped are rarely
the people already well known enough to survive that compression.

Somewhere along the way, some of the project's own tooling started
drifting toward a different, narrower problem: watching what individual
students do, rather than what AI tools do with a document. That risk was
real, and it was already showing up in features already built here, not
just something to guard against in theory. The fix was not to throw out
everything, since the tools that let an AI agent actually check and
respect a sealed file are a real step forward on the original goal. The
fix was to be strict about where KNOBE points: at the piece of work
crossing a boundary (a source becoming a summary, a course reading
becoming an accessible adaptation), never at the person who made or needs
that adaptation.

Accessibility work is where this distinction is easiest to see and
easiest to get right. An adapted reading, a plain-language version, an
audio script: each of these should say clearly where it came from, what
changed, and what it may be used for, without ever describing or
identifying the person the adaptation was made for. That boundary is now
written into the rules, not left to good intentions.

One sentence, if you remember nothing else: KNOBE should not track
people for institutions. It should help AI tools carry forward the
context they would otherwise drop.

## For the technically curious

KNOBE Protocol v1, the file format itself, is frozen: required fields,
the hash used to detect tampering, and verification behavior cannot
change without a formal v2.0 declaration, and none of that happened here.
The new material lives in docs/ as four documents: a repositioning memo,
an education misuse analysis with explicit prohibitions, an accessibility
adaptation profile that adds no new required fields, and a technical
design note covering the permission-checking logic (permits()) and the
tool interface (MCP) that lets an AI agent inspect a file's obligations
before acting on it. The white paper's DOI, 10.5281/zenodo.21298913, is
unchanged. Full documents: docs/repositioning-2026.md,
docs/education-safety-profile.md, docs/accessibility-adaptation-profile.md,
docs/agent-first-design.md.
