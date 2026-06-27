# KNOBE Protocol v1 — Test Vectors

Nine reference `.knobe.md` files with known expected verification results, for testing independent verifier implementations against the public v1 specification.

Verify each with the reference implementation:

```
python3 lens.py minimal-valid.knobe.md
```

## Expected results

### Core six (integrity model)

| file | expected status | expected conformance |
|------|----------------|----------------------|
| `minimal-valid.knobe.md` | verified | valid |
| `full-valid.knobe.md` | verified | valid |
| `body-modified.knobe.md` | verified-body-modified | valid |
| `payload-modified.knobe.md` | failed | valid (where readable) |
| `unreadable.knobe.md` | unreadable | invalid |
| `unicode-valid.knobe.md` | verified | valid |

### Additional three (extended spec rules)

| file | expected status | expected conformance | notes |
|------|----------------|----------------------|-------|
| `numeric-violation.knobe.md` | verified | invalid | bare integer in payload triggers §5 violation; integrity intact |
| `omitted-body-hash.knobe.md` | verified | valid | no body_hash field; body_verified MUST be omitted |
| `multi-block.knobe.md` | verified (last block) | valid | two payload blocks; verifier surfaces warning, body_verified MUST be omitted |

## Notes

- `payload_hash` is the SHA-256 of the canonical JSON payload (keys recursively sorted, no whitespace, NFC-normalized keys and string values, literal UTF-8, `payload_hash` field excluded).
- All numeric payload values MUST be JSON strings per spec §5.
- `body_hash` is optional and advisory. A mismatch yields `verified-body-modified`, not `failed`, when the payload still verifies.
- Body normalization: strip whole body; CRLF and lone CR to LF; strip only U+0020 and U+0009 from each line end; no Unicode normalization; UTF-8; SHA-256.
- Verifiers emit three independent dimensions: `status` (integrity), `body_verified` (yes/modified/omitted), and `conformance` (valid/warnings/invalid).
- An implementation that reproduces all nine expected results is canonically compatible with KNOBE Protocol v1.

KNOBE Protocol v1 · CC BY 4.0 · UC Davis
