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
