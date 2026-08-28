# KNOBE Education Safety Profile and Misuse Analysis

Status: adopted 2026-08-28, under docs/repositioning-2026.md. Non-normative
with respect to KNOBE Protocol v1 (frozen); binding on application-layer
work in this repository and recommended to any education deployment.

## Why this document exists

KNOBE's education footing is where the protocol is most likely to be turned
against its own purpose. A file format that seals attribution, history, and
conditions is one procurement decision away from becoming an instrument for
monitoring the people who make files. This document names the failure modes
specifically and states the safeguards, because a safeguard that is not
written down is a preference, not a policy.

## How KNOBE could become surveillance

Each of these is a plausible product decision away, which is why each is
prohibited below.

1. Mandated sealing. An institution requires every submission to be a
   KNOBE, then treats a missing or failed seal as evidence of misconduct.
   The protocol's honest answer (a failed hash means bytes changed, nothing
   more) gets read as a verdict about a student.
2. Attribution as confession. The required attribution field, designed as a
   maker's declaration about the artifact, is repurposed as a mandatory
   AI-use disclosure form, graded for completeness, mined for policy
   violations.
3. Receipt aggregation. Artifact-level check receipts are joined across a
   term into a per-student timeline: who sealed late, who resealed often,
   whose files failed. Each receipt is innocent; the join is a dossier.
4. Identity creep. Person-bound keys (the deferred signet design) turn
   continuity-of-authorship into an identity regime, where losing a key or
   sharing a laptop becomes an integrity incident.
5. Telemetry smuggling. Extension fields carry drafting time, tool logs,
   revision counts, or engagement metrics, and the sealed record becomes
   process surveillance with a tamper-evident seal on it.
6. Authenticity theater. Verified integrity is marketed as verified
   authorship. The white paper calls this out (a liar can seal a lie); an
   integrity seal presented as an authenticity score is the same failure
   sold as a feature.

## Hard prohibitions

Binding on tooling in this repository; stated as requirements for any
deployment that wants to describe itself as following this profile.

- Absence is not suspicion. No tool, rubric, or workflow may treat a
  missing, unverifiable, or failed KNOBE as evidence about a person. A
  failed verification is a statement about bytes.
- No person-level joins. Tooling must not aggregate artifact records,
  receipts, or verification results into per-student views, timelines, or
  scores. The cohort receipt exists for a dispute the student can invoke,
  not for a dashboard the student cannot see.
- No mandated person-level disclosure. Attribution is the maker's
  declaration about the artifact. Institutions may teach it, model it, and
  invite it; tooling in this repository will not enforce, grade, or score
  it.
- No sensitive-learner data. Profiles must not define, and tools must not
  write, fields carrying disability status, accommodation details,
  diagnosis, or any learner-identifying data inside adaptation records. The
  adaptation names its intended audience by need served (plain language,
  audio, glossary), never by who uses it.
- No hidden telemetry. No field, extension or core, may carry keystroke,
  time-on-task, revision-count, or tool-usage telemetry about a person.
  Transformation history describes what happened to the artifact.
- No authenticity claims from metadata. UI and documentation must not
  present integrity verification as proof of authorship, honesty, or
  originality. The existing verifier language (integrity is not truth) is
  the required framing.
- Symmetric visibility. Any record an institution can see about an
  artifact, the person who made the artifact can see in full.

## Required defaults for education tooling

- Minimum necessary metadata: profiles specify the smallest field set that
  serves the artifact; optional means genuinely optional.
- Artifact-level vocabulary: field names and values describe objects and
  transformations, not behavior ("adapted from", not "submitted late").
- Plain labels in classroom UI: "needs review" or "not yet reviewed" rather
  than "quarantine". Note the boundary: quarantine_status is a frozen v1
  payload field name and does not change; this is a UI-labeling rule, not a
  schema change.
- Pseudonymous and role-based attribution are acceptable: a contributor may
  be recorded as a role ("TA reviewer") where naming a person adds risk
  without adding meaning. Redaction of attribution before wider circulation
  is a legitimate transformation to record, not a violation.
- Retention follows the artifact: when a course artifact is deleted,
  derived receipts referencing only its hash may be kept (a hash is not
  recoverable content), but nothing person-identifying survives deletion.

## What this profile cannot do

CC BY 4.0 and Apache-2.0 licensing mean a determined institution can build
the surveillance version anyway. This profile's real defenses are design
choices: person-level fields do not exist in the published profiles, the
reference tools refuse the joins, and the documentation names the misuse so
that a deployment which crosses the line cannot claim it was following the
protocol. That is detection and attribution of misuse, not prevention,
which is consistent with what KNOBE claims about files: it cannot prevent
stripping; it can make it visible.
