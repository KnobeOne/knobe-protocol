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

KNOBE is an open protocol, and its name is open with it. Anyone may use "KNOBE" truthfully to describe what their work is or does. No permission, license, or fee is required, and nothing in this section lets anyone stop a conforming implementation from saying what it is. These are good-faith guidelines with one purpose: to keep the ecosystem legible for the students, instructors, and readers who rely on knowing which tool is which.

**Use it freely, no permission needed.** Describe your work as *built on KNOBE*, *KNOBE-compatible*, *for KNOBE*, *a KNOBE verifier*, or *implements KNOBE Protocol v1*; say that a tool *reads and writes `.knobe.md` files*. Accurate, descriptive use is what an open protocol is for.

**Conformance is a claim you earn.** Call an implementation a *conformant KNOBE Protocol v1 verifier* only once it reproduces every published test vector (see [CONTRIBUTING.md](CONTRIBUTING.md)). Until then, *KNOBE-compatible* or *built on KNOBE* is the honest description. The claim that matters to a user is the one the vectors back.

**Qualify the reference names.** *KNOBE Studio*, *KNOBE Lens* (and `lens.py`, the reference verifier), *knobe-mcp*, and *KNOBE Grove* name the reference implementations the steward publishes at knobe.org. A separate tool that offers similar functions should qualify its name by its surface or its author, so people are not misled about which tool they are using: *KNOBE Studio for Obsidian*, *a KNOBE verifier for VS Code*, *Acme KNOBE Lens*. Do not present an unqualified reference name, or a project as the official or reference KNOBE implementation, when it is a separate work.

**Naming is not endorsement.** Using the KNOBE name does not mean the steward built, reviewed, sponsors, or vouches for your work, and you should not imply that it does. A listing on knobe.org/implementations is a factual registry entry, not an endorsement and not a grant of these names.

**This is coordination, not a trademark claim.** The steward holds and asserts no trademark over KNOBE and will not use names to restrict conformant implementations, exactly as no patent is asserted against them. To propose a name, coordinate a release, or ask anything here, open an issue or contact the steward; the answer is meant to help you ship.

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
