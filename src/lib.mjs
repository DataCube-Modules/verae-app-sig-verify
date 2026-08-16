import { makeEnvelope, enqueue } from "./peergos-sdk.mjs";

export const VERIFY_SUBJECT = "verae.sig.verify";

export async function listValid(client) {
  const listing = await client.list("/signatures/valid");
  return listing.files.filter((f) => f.endsWith(".json")).sort();
}

export async function listRevoked(client) {
  const listing = await client.list("/signatures/revoked");
  return listing.files.filter((f) => f.endsWith(".json")).sort();
}

/**
 * isRevoked
 * Input: filename or id, revoked filenames[]
 * Output: boolean — true if exact file or stem matches a revoked name
 */
export function isRevoked(id, revokedFiles) {
  if (!id) return false;
  const set = new Set(revokedFiles || []);
  if (set.has(id) || set.has(id + ".json")) return true;
  const stem = id.replace(/\.json$/, "");
  return set.has(stem) || set.has(stem + ".json");
}

export async function enqueueVerify(client, opts) {
  if (!opts || !opts.object_sha256) throw new Error("object_sha256 required");
  if (!opts.signature_id) throw new Error("signature_id required");
  return enqueue(client, opts.signature_id + "-verify", makeEnvelope(VERIFY_SUBJECT, {
    object_sha256: opts.object_sha256,
    signature_id: opts.signature_id,
  }, opts.signature_id + ".verify.json"));
}
