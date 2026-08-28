# Memo: KNOBE's 2026 repositioning

To: Collaborators and contributors
From: David Kyle
Date: August 28, 2026
Re: What changed in KNOBE's design doctrine, and what did not

## The short version

KNOBE returns to its original purpose: helping AI agents preserve the
context they would otherwise strip from knowledge objects, not tracking
what humans do with those objects. Some tooling that had drifted toward
institutional monitoring is being pulled back. The frozen v1 protocol, the
published spec, the corpus, and the white paper's DOI are untouched.

## What changed

- New doctrine, four documents in docs/. A repositioning memo, an
  education misuse analysis with hard prohibitions, an accessibility
  adaptation profile, and an agent-first technical design plan. Together
  they set the rule going forward: KNOBE describes artifacts, never
  people.
- The signet is deferred, indefinitely. This was a design for per-student
  cryptographic signing keys, meant to prove continuity of authorship
  across a term. Even opt-in, a person-bound key is the wrong shape for
  what KNOBE is supposed to be. The charter stays in the repo as a
  record; nothing is being built against it under current doctrine.
- The cohort receipt is re-scoped, not removed. It still exists as a
  sealed record an instructor can produce during a check, useful if a
  student disputes a result. What it will never become: a per-student
  timeline, a dashboard, or an aggregation across a term. That use is now
  explicitly prohibited in writing.
- The time sandwich documentation is reframed. It still describes a true,
  useful property (a sealed file provably postdates the assignment hash
  it embeds), but it is no longer presented as a deadline-enforcement
  technique, and nothing automates it that way.
- Accessibility adaptation becomes the lead use case, not one use case
  among many. It is also the cleanest example of what the doctrine wants:
  the object being described is the adapted material, never the learner.

## What did not change

- KNOBE Protocol v1 is still frozen. File format, required fields,
  canonical hash rule, verification semantics: none of this moved, and
  none of it can move without a v2.0 declaration.
- The published spec, test vectors, reference verifier, and sealed corpus
  files are untouched.
- The white paper and its DOI (10.5281/zenodo.21298913) stand as
  published. Nothing here rewrites or reissues it.
- The MCP server, the permits() engine, and the existing site pages
  (education, enterprise, government, research profiles) are unaffected
  by this pass. Where they get revised later, it will be to re-weight
  emphasis toward accessibility, not to strip anything that already
  works.

## Why

The concern KNOBE started from was narrow: AI agents increasingly do the
reading, compressing, and redistributing of knowledge, and they inherit
provenance systems that were already broken for humans, let alone
machines. If a file does not carry its own context, an agent compresses
the words and drops what made them trustworthy, and the people whose
contributions get dropped are rarely the people already famous enough to
survive that compression.

Since then, some of the project's own tooling drifted toward a different
problem: monitoring what students do, not what agents do. That is a real
risk specific to education deployments, and the honest read is that it
was already happening in this repository, not just a hypothetical to
guard against. The correction is not to abandon the tooling that has real
value (an MCP server agents can actually call today is a genuine advance
on the original vision), but to discipline where KNOBE points: at the
artifact boundary an agent crosses, not at the person who made the
artifact.

The rule going forward, in one sentence: KNOBE should not track humans
for institutions. It should help agents preserve the context they would
otherwise strip.

Full detail: docs/repositioning-2026.md,
docs/education-safety-profile.md, docs/accessibility-adaptation-profile.md,
docs/agent-first-design.md.
