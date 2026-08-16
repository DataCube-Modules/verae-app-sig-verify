# Sig Verify

List valid/revoked signatures; enqueue verae.sig.verify

Specialist: Crypto + JS.
# Installation — Sig Verify

## Requirements

- Peergos account on a Verae host
- Permissions: STORE_APP_DATA
- For outbox subjects: desktop-host connector running

## Steps

1. Copy `peergos-app.json` and `assets/` into Drive (or use OrgTool / gallery).
2. Context menu on `peergos-app.json` → **Install App**.
3. Open from Apps launcher.
4. Dark theme: Peergos passes `?theme=dark-mode`.

## Uninstall

Apps launcher → remove `Sig Verify`. Data remains under `/.apps/` until deleted.
# Developer reference — verae-app-sig-verify

## Layout

```
peergos-app.json
assets/index.html
assets/sdk.js
src/peergos-sdk.mjs
src/lib.mjs
tests/lib.test.mjs
tests/certify-peergos.sh
```

## Integration

Sandbox `fetch` → `/peergos-api/v0/data`.  
Outbox JSON → connector → NATS (`verae-nats-bus/schemas/subjects.json`).  
Inbox JSON → app lists `/inbox/`.

## Tests

`make test` runs Node unit tests against an in-memory `fetch`.  
`make certify` adds Peergos compliance (manifest bounds, no NATS/WebSocket).

# Function specs — sig-verify

Specialist: Crypto + JS.

## listValid / listRevoked → JSON filenames

## isRevoked(id, revokedFiles) → boolean

## enqueueVerify(client, {object_sha256, signature_id})
Subject `verae.sig.verify`.

# Function specs — sig-verify

Specialist: Crypto + JS.

## listValid / listRevoked → JSON filenames

## isRevoked(id, revokedFiles) → boolean

## enqueueVerify(client, {object_sha256, signature_id})
Subject `verae.sig.verify`.
