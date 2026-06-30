# KNOBE Protocol v1

**An open, plain-text protocol for knowledge objects that keep their context when they move.**

A KNOBE (Knowledge Object Boundary Envelope) is a single markdown file with three layers:

1. **YAML frontmatter** — human-scannable metadata
2. **Markdown body** — the document itself, opens in any editor
3. **Base64 JSON payload** — attribution, transformation history, fidelity limits, use conditions, accessibility lineage, and a SHA-256 integrity hash

A human reads the first two layers. A machine decodes the third. A verifier checks the hash. No sidecar files, no platform, no account required.

## What this protocol does

KNOBE makes it harder for fragments to pass as whole objects. It carries interpretive context (fidelity limits, consent terms, attribution, transformation history) alongside the content itself, in plain text, verifiable without infrastructure.

## What this protocol does not do

It is not DRM, not a truth machine, not an identity verification system, and not a replacement for institutional systems. It declares interpretive obligations; it does not enforce them. See [`spec.html`](spec.html) §11 (Honest limits) and the [threat model](https://knobe.org/threat-model) for the precise account.

## Verifying a KNOBE

```bash
python3 lens.py examples/knobe-v1-white-paper.knobe.md
```

Output includes three independent dimensions:

- **status** (integrity): `verified` · `verified-body-modified` · `failed` · `unreadable`
- **body_verified** (body-hash check): `yes` · `modified` · `omitted`
- **conformance** (schema compliance): `valid` · `warnings` · `invalid`

A `verified` result proves the payload is byte-identical to what was hashed at sealing. It does not prove the content is accurate, the attribution is honest, the consent was actually obtained, or the object is appropriate for any particular use. Integrity is the substrate; interpretive context is the point.

## Repository layout

```
.
├── spec.html              The normative v1 specification
├── lens.py                Python reference verifier, no external dependencies
├── test-vectors/          Nine conformance vectors for testing implementations
└── examples/              Sealed example KNOBEs (white paper, education chain, etc.)
```

## Implementing a verifier

The reference verifier `lens.py` is a standard-library Python file with no external dependencies. To build a conformant verifier in another language:

1. Read [`spec.html`](spec.html) — particularly §3.3 (Payload block), §5 (Canonical hash rule), §6 (Body hash), §7 (Verification states)
2. Reproduce the canonical hash algorithm: sort keys recursively, NFC-normalize all keys and string values, no whitespace between tokens, literal UTF-8, SHA-256
3. Run your implementation against all nine test vectors in `test-vectors/` and confirm expected outputs match the README in that directory

An implementation that reproduces all nine expected results is canonically compatible with KNOBE Protocol v1.

## License

KNOBE Protocol v1 is published under [CC BY 4.0](LICENSE). You are free to share, adapt, and build on the protocol with attribution.

## Steward

David Kyle, founder and steward · University of California, Davis
djkyle@ucdavis.edu · [knobe.org](https://knobe.org)

## Citation

```bibtex
@misc{kyle2026knobe,
  author       = {Kyle, David},
  title        = {KNOBE Protocol v1: A Plain-Text Protocol for Knowledge Object Context Survival},
  year         = {2026},
  publisher    = {University of California, Davis},
  url          = {https://knobe.org}
}
```

---

KNOBE is an open protocol for plain-text knowledge objects that carry their source, history, limits, and obligations across human and AI systems.
