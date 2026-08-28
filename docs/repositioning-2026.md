# KNOBE Repositioning Memo

Status: adopted 2026-08-28. Governs application-layer and adoption decisions.
It does not modify KNOBE Protocol v1, which is frozen; where a refinement
below would require a breaking change, it is labeled v2-territory and waits.

Guiding sentence: KNOBE should not track humans for institutions; it should
help agents preserve the context they would otherwise strip.

## The original vision

KNOBE began as machine-native metadata for a specific problem, not as a
general appetite for a new file format. The originating concern was the
Matthew Defect in an AI era: agents now perform much of the reading,
retrieval, compression, summarization, translation, and redistribution of
knowledge, and they inherit human provenance systems that were already
broken. When a file carries nothing at the file level, an agent compresses
the visible words and silently drops the context that made them
interpretable, along with the contributions of everyone who is not already
famous enough to survive compression.

The original design goals: speak directly to future AI readers at the file
level; remain legible to human readers with no tooling; preserve provenance,
attribution, contribution structure, transformation history, and limits; and
make the stripping of context detectable rather than silent. Artifact-level
legibility, not human surveillance.

## The drift

Between the first release and now, the project accumulated ambitions beyond
that vision. Naming them specifically, because they are in this repository
and on the site, not hypothetical:

- The Cohort Check tab and the cohort receipt: an instructor seals an
  attestation of student submission verdicts.
- The time sandwich: documentation for bounding when a student sealed a file
  relative to a deadline.
- The signet design charter (docs/signet-design.md): per-student
  cryptographic continuity-of-authorship, person-level by construction even
  though opt-in.
- Broader gestures toward LMS integration, course workflow records, and
  institutional process visibility.

Some of this work is technically sound and some of it (the receipt as a
dispute artifact) has a defensible narrow use. But the direction of travel
was toward tooling whose primary customer is an institution monitoring
people, and in higher education that road ends at compliance dashboards,
AI-use confession rituals, and metadata absence treated as suspicion. That
would invert the founding purpose: the fear that humans could not control
agents would be answered by institutions controlling humans.

## The correction

Narrow and discipline, not abandon. The environment has also changed in
KNOBE's favor: agents now routinely reach tools through MCP and similar
runtimes, so "the agent inspects file-level obligations before acting" is a
demo this project can already run (the MCP server ships today), not a
speculative claim. The enforcement target moves from the human at the
keyboard to the agent at the artifact boundary.

## Revised doctrine

1. Agent-first, not compliance-first. KNOBE exists because agents need
   file-level context and obligations before acting on an artifact.
2. Artifact-level, not person-level. KNOBE describes the object: source,
   status, permissions, transformations, limits, obligations. It must never
   become a behavioral dossier on a person. (Human legibility of the file
   itself remains a load-bearing design commitment; this principle is about
   what is described, not who can read it.)
3. Boundary-triggered, not universal. Create or update a KNOBE when an
   artifact crosses a meaningful boundary: source to summary, private to
   shared, draft to publication, instructor material to accessibility
   adaptation, agent output to human-reviewed resource. Do not KNOBE every
   document.
4. Automatic for agents, minimal for humans. Tools and agents generate most
   context; humans confirm only high-stakes fields (status, privacy tier,
   source, attribution, permission, review state). The current Studio is
   manual-form-heavy; that is a known gap, not a model.
5. Absence is not suspicion. Missing KNOBE metadata must never be treated as
   evidence of misconduct, low integrity, or inauthenticity.
6. No universal student tracking. KNOBE is not an AI-use confession system,
   an AI-detection substitute, or drafting telemetry. Note the distinction
   this requires: v1's required attribution field is a voluntary
   artifact-level declaration by the maker about the object; the misuse is a
   mandated person-level disclosure extracted by an institution about the
   person. KNOBE keeps the first and refuses the second.
7. Accessibility-first pilots. The KNOBE describes the adapted course
   material, never the learner. This is the recommended first domain, and
   the corpus already contains two working examples (the plain-language
   summary and the narration script).
8. Agent obligations first. The main enforcement surface is downstream
   agent and tool behavior: preserve source, limits, permissions, review
   state, and attribution when summarizing, translating, embedding,
   training on, redistributing, or publishing an artifact.

## Decisions on shipped work

These are the calls the doctrine forces. Made explicitly rather than left to
drift:

- Signet: deferred indefinitely. The charter remains in docs/ as a design
  record with a status banner; no build proceeds under current doctrine.
  Person-level key continuity, even opt-in, is on the wrong side of
  principle 2 for the education context it was designed for.
- Cohort receipt: retained, re-scoped. It is a sealed artifact-level record
  of what a checker observed at a point in time, usable in a dispute the
  student initiates. It is not an integrity-scoring input, and no tooling
  will be built that aggregates receipts into per-student views.
- Time sandwich: the documentation stands (it describes artifact properties:
  a sealed file provably postdates the assignment hash it embeds), but it is
  no longer presented as a deadline-enforcement technique, and no tooling
  automates it.
- Teaching page and education kit: retained; future revisions re-weight
  toward the accessibility workflow and away from submission-checking as the
  lead story.
- Accessibility kit, Adapt tab, education/research/government/enterprise
  profiles: unaffected; the accessibility work becomes the front door.

## Recommended first use case

AI-mediated accessibility adaptations of course materials in higher
education, per the Accessibility Adaptation Profile
(docs/accessibility-adaptation-profile.md). The object is the adapted
material. It does not name learners, does not record disability status, and
does not carry telemetry. It composes with the agent runtime: an agent asked
to further transform an adaptation can check permits() and see the sealed
source binding, the review state, and the use limits before acting.

## What not to build

Blunt, and binding on application-layer work in this repository:

- No student surveillance tooling, in any framing.
- No universal document tracking; boundary-triggered only.
- No AI-use policing or confession workflows; attribution stays a maker's
  declaration about the artifact.
- No authenticity or integrity scoring of people; verification reports
  describe files.
- No hidden institutional dashboards; anything an institution sees, the
  person the artifact concerns can see.
- No adverse-inference features: nothing that treats a missing or failed
  KNOBE as evidence about a person.

## Limits of this memo

This memo repositions emphasis and constrains application-layer work. It
does not and cannot promise that third parties will honor the doctrine: the
spec is CC BY 4.0 and the code is Apache-2.0, so misuse-resistant design
(minimum fields, artifact-level vocabulary, no person-level fields in
profiles) is the real defense, not this document. The misuse analysis in
docs/education-safety-profile.md carries that weight.
