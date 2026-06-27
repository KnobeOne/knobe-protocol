#!/usr/bin/env python3
"""lens.py — KNOBE Protocol v1 reference verifier.

Usage: python3 lens.py file.knobe.md

Reports two independent dimensions:
  status (integrity):
    verified                payload_hash matches; body_hash matches or absent
    verified-body-modified  payload_hash matches; body_hash present and mismatched
    failed                  payload_hash mismatch
    unreadable              no payload block, or it cannot be decoded/parsed

  conformance (schema/spec compliance):
    valid                   all required fields present, formats well-formed,
                            no normative MUSTs violated
    warnings                file is usable, but soft-spec deviations detected
                            (e.g., custom vocabulary values without namespace)
    invalid                 normative MUSTs violated (e.g., malformed
                            payload_hash, numeric values in payload,
                            malformed created_date)

A match proves integrity, not truth. A `valid` proves conformance, not truth.
Inspect before trusting.

Canonical hash rule (spec §5): decode the Base64 payload to JSON; remove
payload_hash; NFC-normalize all JSON object keys and string values recursively;
serialize with keys recursively sorted, no whitespace, arrays in insertion
order, literal UTF-8 (never \\uXXXX); SHA-256; compare to stored payload_hash.

Numeric payload values MUST be JSON strings (spec §5). lens.py detects bare
numbers in payloads and reports them as `conformance: invalid`.

Body normalization (for the optional body_hash): extract the body between the
closing '---' of the YAML frontmatter and the BEGIN marker; (0) strip the whole
body of leading/trailing whitespace; (1) CRLF and lone CR -> LF; (2) strip only
U+0020 and U+0009 from each line end; (3) no Unicode normalization; (4) UTF-8;
(5) SHA-256.

Multi-block files (spec §3.3, §6): when more than one payload block is present,
body_verified MUST be omitted regardless of whether body_hash is sealed,
because body extraction is ambiguous across multiple BEGIN markers.
"""
import sys, re, json, base64, hashlib, unicodedata

REQUIRED = ["spec_version","title","summary","content_type","created_date",
            "license","privacy_level","quarantine_status","attribution","payload_hash"]

# Vocabulary canonical values (spec §8). Custom values are not invalid, but
# trigger a `warnings` conformance level if they are not prefix-namespaced.
CANONICAL_VOCAB = {
    "content_type": {"original","synthesis","adaptation","compression",
                     "annotation","seed","collection","translation"},
    "quarantine_status": {"quarantine","trusted","rejected"},
    "privacy_level": {"public","internal","sensitive","restricted"},
    "identity_status": {"declared","signed"},
}
ISO_DATE = re.compile(r'^\d{4}-\d{2}-\d{2}$')
HEX64 = re.compile(r'^[0-9a-f]{64}$')

def normalize_body(text):
    text = text.strip()
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    return '\n'.join(line.rstrip(' \t') for line in text.split('\n'))

def find_numeric_paths(obj, path=""):
    """Return paths of bare numeric values in payload (spec §5 violations)."""
    out = []
    if isinstance(obj, bool):
        return out
    if isinstance(obj, (int, float)):
        out.append(path)
    elif isinstance(obj, dict):
        for k, v in obj.items():
            out.extend(find_numeric_paths(v, f"{path}.{k}" if path else k))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            out.extend(find_numeric_paths(v, f"{path}[{i}]"))
    return out

def check_conformance(payload, missing):
    """Return (level, issues) where level is 'valid', 'warnings', or 'invalid'.
    Issues is a list of human-readable strings."""
    errors = []      # → invalid
    warnings = []    # → warnings (only if no errors)

    # 1. Missing required fields → invalid
    for m in missing:
        errors.append(f"required field missing: {m}")

    # 2. payload_hash format (spec §4)
    ph = payload.get("payload_hash")
    if ph is not None:
        if not isinstance(ph, str) or not HEX64.match(ph):
            errors.append(f"payload_hash format invalid (must be 64 lowercase hex)")

    # 3. created_date format (ISO YYYY-MM-DD)
    cd = payload.get("created_date")
    if cd is not None and not (isinstance(cd, str) and ISO_DATE.match(cd)):
        errors.append(f"created_date is not in YYYY-MM-DD form: {cd!r}")

    # 4. Numeric values (spec §5 — all numerics MUST be strings)
    obj_for_scan = {k: v for k, v in payload.items() if k != "payload_hash"}
    numeric_paths = find_numeric_paths(obj_for_scan)
    if numeric_paths:
        # Report once with the list, truncated if very long
        shown = numeric_paths if len(numeric_paths) <= 5 else numeric_paths[:5] + ["..."]
        errors.append(f"bare numeric value(s) in payload (spec §5 requires strings): {', '.join(shown)}")

    # 5. Parent hash format (spec §4)
    for i, parent in enumerate(payload.get("parents", []) or []):
        if isinstance(parent, dict) and "payload_hash" in parent:
            pph = parent["payload_hash"]
            if not isinstance(pph, str) or not HEX64.match(pph):
                errors.append(f"parents[{i}].payload_hash format invalid (must be 64 lowercase hex)")

    # 6. Vocabulary checks — custom values without namespace → warnings only
    for field, canon in CANONICAL_VOCAB.items():
        v = payload.get(field)
        if v is None or not isinstance(v, str):
            continue
        if v in canon:
            continue
        # Custom value — recommend namespace/prefix per spec §8
        if ":" not in v and not v.startswith("ext-"):
            warnings.append(f"{field}: {v!r} is a custom vocabulary value without "
                            f"namespace prefix (recommend 'ext-' or 'domain:' per §8)")

    if errors:
        return ("invalid", errors + warnings)
    if warnings:
        return ("warnings", warnings)
    return ("valid", [])

def verify(path):
    raw = open(path, encoding='utf-8').read()

    blocks = re.findall(
        r'(?:^|\n)-----BEGIN KNOBE B64-----\n(.*?)\n-----END KNOBE B64-----',
        raw, re.DOTALL)
    if not blocks:
        return {"state": "unreadable", "reason": "no payload block found",
                "conformance": "invalid",
                "conformance_issues": ["no payload block found"],
                "multiple_blocks": False, "block_count": 0, "block_used": 0}

    try:
        payload = json.loads(
            base64.b64decode("".join(blocks[-1].split()), validate=True).decode("utf-8"))
    except Exception:
        return {"state": "unreadable", "reason": "payload could not be decoded or parsed",
                "conformance": "invalid",
                "conformance_issues": ["payload could not be decoded or parsed"],
                "multiple_blocks": len(blocks) > 1, "block_count": len(blocks),
                "block_used": len(blocks)}

    stored = payload.get("payload_hash", "")
    obj = {k: v for k, v in payload.items() if k != "payload_hash"}

    def nfc_normalize(x):
        if isinstance(x, str):
            return unicodedata.normalize("NFC", x)
        if isinstance(x, dict):
            return {unicodedata.normalize("NFC", k) if isinstance(k, str) else k:
                    nfc_normalize(v) for k, v in x.items()}
        if isinstance(x, list):
            return [nfc_normalize(v) for v in x]
        return x
    obj = nfc_normalize(obj)

    canon = json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    computed = hashlib.sha256(canon.encode("utf-8")).hexdigest()

    missing = [f for f in REQUIRED if f not in payload]
    if "attribution" in payload and not (
            isinstance(payload["attribution"], dict)
            and payload["attribution"].get("sources")):
        missing.append("attribution.sources")

    if computed != stored:
        state = "failed"
    else:
        state = "verified"

    # body_verified: yes / modified / omitted
    # Per spec §6/§7: when multiple blocks present, body_verified MUST be omitted
    # (body extraction is ambiguous). When status is failed or unreadable,
    # body_verified MUST also be omitted (untrusted payload).
    body_result = None
    body_verified = "omitted"
    if state == "verified" and "body_hash" in payload and len(blocks) == 1:
        b64_marker = '\n-----BEGIN KNOBE B64-----\n'
        pre = raw[:raw.rindex(b64_marker)]
        try:
            i1 = pre.index('---\n')
            i2 = pre.index('---\n', i1 + 4)
        except ValueError:
            return {"state": "unreadable",
                    "reason": "body_hash present but YAML frontmatter delimiters not found",
                    "conformance": "invalid",
                    "conformance_issues": ["body_hash present but YAML frontmatter delimiters not found"],
                    "multiple_blocks": len(blocks) > 1,
                    "block_count": len(blocks),
                    "block_used": len(blocks)}
        body_text = pre[i2 + 4:]
        computed_body = hashlib.sha256(normalize_body(body_text).encode('utf-8')).hexdigest()
        if computed_body == payload["body_hash"]:
            body_result = "match"
            body_verified = "yes"
        else:
            body_result = "mismatch"
            body_verified = "modified"
            state = "verified-body-modified"

    conformance, issues = check_conformance(payload, missing)

    return {"state": state, "computed": computed, "stored": stored,
            "payload": payload, "missing": missing, "body": body_result,
            "body_verified": body_verified,
            "conformance": conformance, "conformance_issues": issues,
            "multiple_blocks": len(blocks) > 1,
            "block_count": len(blocks),
            "block_used": len(blocks)}

if __name__ == "__main__":
    r = verify(sys.argv[1])
    st = r["state"]

    if st == "unreadable":
        print(f"status:            unreadable ({r['reason']})")
        print(f"conformance:       {r['conformance']}")
        for issue in r.get("conformance_issues", []):
            print(f"  - {issue}")
        sys.exit(2)

    p = r["payload"]
    print(f"title:             {p.get('title')}")
    print(f"spec_version:      {p.get('spec_version')}")
    print(f"quarantine_status: {p.get('quarantine_status')}")
    print(f"privacy_level:     {p.get('privacy_level')}")
    print(f"computed_hash:     {r['computed']}")
    print(f"stored_hash:       {r['stored']}")
    print(f"status:            {st}")
    if r["multiple_blocks"]:
        print(f"WARNING:           multiple payload blocks present. Evaluated block {r['block_used']} of {r['block_count']} per spec §3.3.")
    print(f"body_verified:     {r['body_verified']}")
    print(f"conformance:       {r['conformance']}")
    if r["conformance_issues"]:
        for issue in r["conformance_issues"]:
            print(f"  - {issue}")
    if st in ("verified", "verified-body-modified"):
        print("note: integrity verified. Integrity is not truth — inspect before trusting.")
    if st == "verified-body-modified":
        print("note: the markdown body differs from the sealed body. Inspect before relying on this version.")
    # Exit code policy:
    #   0 = status is verified or verified-body-modified AND conformance is valid or warnings
    #   1 = status verified but conformance invalid, OR status failed
    #   2 = status unreadable
    if st in ("verified", "verified-body-modified") and r["conformance"] in ("valid", "warnings"):
        sys.exit(0)
    sys.exit(1)
