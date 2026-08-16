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

