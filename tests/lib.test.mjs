import assert from "node:assert/strict";
import { createClient, createMemoryFetch } from "../src/peergos-sdk.mjs";
import { listValid, listRevoked, isRevoked, enqueueVerify, VERIFY_SUBJECT } from "../src/lib.mjs";

const fetchImpl = createMemoryFetch();
const client = createClient(fetchImpl);
await client.writeJSON("/signatures/valid/sig1.json", { object_sha256: "sha256:doc" });
await client.writeJSON("/signatures/revoked/sig1.json", { revoked: true });
assert.deepEqual(await listValid(client), ["sig1.json"]);
assert.deepEqual(await listRevoked(client), ["sig1.json"]);
assert.equal(isRevoked("sig1", ["sig1.json"]), true);
assert.equal(isRevoked("other", ["sig1.json"]), false);
const p = await enqueueVerify(client, { object_sha256: "sha256:doc", signature_id: "sig1" });
const env = JSON.parse(fetchImpl.store.get(p));
assert.equal(env.subject, VERIFY_SUBJECT);
await assert.rejects(() => enqueueVerify(client, { object_sha256: "x" }), /signature_id/);
console.log("sig-verify tests ok");
