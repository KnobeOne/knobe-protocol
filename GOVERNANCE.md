# Governance

## Current structure

KNOBE Protocol v1 has a single steward: David Kyle (author). Sole stewardship is a **transitional condition, not a design goal**.

## What the steward can and cannot do

The steward **may**:

- Publish errata: clarifications that do not change the behavior of any conforming file or verifier.
- Release v1.x updates: backward-compatible additions (new optional payload fields, new canonical vocabulary values) after the public comment process in [CONTRIBUTING.md](CONTRIBUTING.md).
- Maintain the reference verifier, browser Lens, and test vectors.

The steward **may not**:

- Change the v1 file format, required fields, canonical hash rule, or verification semantics. These are frozen. A file that verifies today verifies forever under v1 semantics.
- Relicense the specification, verifiers, or test vectors under more restrictive terms. Published versions are irrevocably licensed (CC BY 4.0 / Apache-2.0 / CC0-1.0).
- Require any server, account, payment, or permission to read the specification or verify a file.

## Patent pledge

The steward asserts no patents covering KNOBE Protocol v1 and will not assert any patent against conformant implementations of it. KNOBE is published as open specification and reference code precisely so that it stays free to implement; no patent is sought or held over the protocol.

## Name and mark use

KNOBE is an open protocol, and its name is open with it. We want people to build on KNOBE, ship real tools, and say plainly that they did. What follows is an invitation and a set of shared expectations, written so the ecosystem stays legible for the students, instructors, and readers who need to know which tool they are holding. It is coordination, not a trademark claim: the steward holds no trademark over KNOBE and will not use names to restrict conformant implementations, exactly as no patent is asserted against them.

**Say what you built, freely.** Describe your work as *built on KNOBE*, *KNOBE-compatible*, *for KNOBE*, *a KNOBE verifier*, or *implements KNOBE Protocol v1*, and tell people it *reads and writes `.knobe.md` files*. Accurate, descriptive use is what an open protocol is for, and it needs no permission.

**Earn the conformance claim, then make it.** When your verifier reproduces every published test vector (see [CONTRIBUTING.md](CONTRIBUTING.md)), call it a *conformant KNOBE Protocol v1 verifier* and mean it. That is the claim a user can rely on, so it is worth earning; until then, *KNOBE-compatible* says exactly what is true.

**Give your tool its own name.** The reference implementations the steward publishes at knobe.org carry the plain names *KNOBE Studio*, *KNOBE Lens* (with `lens.py`, the reference verifier), *knobe-mcp*, and *KNOBE Grove*. Your own tool reads best when its name says whose it is or where it runs: *KNOBE Studio for Obsidian*, *Acme KNOBE Lens*, *a KNOBE verifier for VS Code*. A distinct name helps people find you, credits your work, and keeps everyone oriented as the ecosystem grows.

**Let the work stand in your name.** Build your reputation as the maker of your own tool: credit yourself, name your team, link real source, and let the track record speak. The one firm boundary is ordinary honesty about origin: claim or imply that a project is the steward's official or reference implementation, or that the steward built, endorsed, or reviewed it, only when that is true. Everything else, an accurate account of what you made, is exactly the credit an open ecosystem runs on.

**A listing is a fact, not a favor.** When your tool is public, open an issue and it joins knobe.org/implementations with your name on it: a named maintainer, public source, vector results if it verifies, and a plain word on what it does and does not do. The listing records what exists; it is not an endorsement, and not a grant of these names. To propose a name, coordinate a release, or ask anything here, reach the steward; the answer is meant to help you ship.

## What counts as an independent implementation

The transition triggers below turn on independent implementations, and AI-assisted development changes what the useful definition is, so the term is defined here.

An implementation is independent when a person other than the steward is responsible for it: they read the specification, made or reviewed its interpretive decisions, answer for its behavior under their own name, and maintain it. AI assistance does not disqualify an implementation, for the same reason it does not disqualify the steward's own work; what matters is that a responsible human other than the steward validated the interpretation against the specification and the published vectors.

Not independent, whatever the tooling: an implementation the steward writes or commissions, and an AI-generated implementation with no responsible human behind it. Models trained on overlapping corpora can converge on the same misreading, so agreement between two of them is weak evidence that the specification is buildable from its text. The diversity that counts is human interpretive responsibility, not model or codebase diversity.

Consulting the reference implementations to confirm behavior in an ambiguous case is reasonable and should be disclosed. The published test vectors and their expected results are the arbiter of conformance. Where they leave a detail undecided, `lens.py` is canonical for serialization ambiguity under spec §5, and rulings for everything else are documented in [ERRATA.md](ERRATA.md); where observed reference behavior conflicts with explicit normative text, the ruling follows the specification and records the conflict.

For transition trigger 1 below, passing the full conformance vectors means reproducing the published expected results across all published sets: the nine core vectors, the adversarial set, and the interpretation set.

## Transition to shared governance

An advisory group will be formed when **any** of the following occurs, whichever is first:

1. Two independent (non-steward) implementations pass the full conformance vectors; or
2. The first institutional adoption is active (not planned); or
3. Work on a v2.0 begins.

When formed, the advisory group's charter, membership, and decision rules will be published here. A v2.0 cannot be designated "KNOBE Protocol" without advisory-group process.

## Continuity

The specification, verifiers, and test vectors are published in this repository under irrevocable open licenses. If the steward becomes unavailable, anyone may continue the work by fork; the frozen v1 semantics make forks verifiable against the same test vectors.

## Institutional independence

KNOBE is an independent open protocol. It is not a product, standard, or endorsed service of the University of California, Davis, or any other institution. Institutional affiliations in project materials identify people, not sponsorship.
