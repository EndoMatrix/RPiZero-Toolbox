/**
 * Converts non-hyphenated lower-case UUIDs into human-readable UUIDs, in
 * accordance with {@link https://www.ietf.org/rfc/rfc4122.txt|IETF RFC-4122}
 * specifications.
 * @param {string} uuid - a non-hypenated lower-case UUID
 * @return {string} a string UUID
 */
function fromUUID(uuid) {
  function insertAt(delimiter, ...indices) {
    let string = this.substring(0, indices[0]);
    for (let i = 0; i < indices.length; i++) {
      string += delimiter + this.substring(indices[i], indices[i + 1] || this.length);
    }
    return string;
  }

  return insertAt.bind(uuid)('-', 8, 12, 16);
}

/**
 * Converts human-readable strings into non-hypenated lower-case UUIDs, in
 * accordance with {@link https://www.ietf.org/rfc/rfc4122.txt|IETF RFC-4122}
 * specifications.
 * @param {string} uuid - a string UUID
 * @return {string} a non-hypenated lower-case UUID
 */
function toUUID(uuid) {
  return uuid.replace(/-/g, '').toLowerCase();
}

module.exports = { fromUUID, toUUID };
