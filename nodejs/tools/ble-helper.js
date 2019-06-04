/**
 * Converts human-readable UUIDs into non-hypenated lower-case string
 * representations, in accordance with
 * {@link https://www.ietf.org/rfc/rfc4122.txt|IETF RFC-4122} specifications.
 * @param {string} uuid - any string, ideally a UUID
 * @return {string} a non-hypenated lower-case UUID
 */
function toUUID(uuid) {
  return uuid.replace(/-/g, '').toLowerCase();
}

module.exports = { toUUID };
