const { sha256 } = require('@noble/hashes/sha2.js');
const { SEED_SIZE } = require('./constants.js');
const { toFixedU8 } = require('../../utils/bytes.js');

class Seed {
  /** @param {Uint8Array|number[]} bytes length 48 */
  constructor(bytes) {
    if (!bytes || bytes.length !== SEED_SIZE) {
      throw new Error(`Seed must be ${SEED_SIZE} bytes`);
    }
    this.bytes = Uint8Array.from(bytes);
  }

  hashSHA256() {
    return Uint8Array.from(sha256(this.bytes));
  }

  /** @returns {Uint8Array} */
  toBytes() {
    return this.bytes.slice();
  }

  /**
   *
   * @param {string|Uint8Array|Buffer|number[]} input
   * @returns {Seed}
   */
  static from(input) {
    const b = toFixedU8(input, SEED_SIZE, 'Seed');
    return new Seed(b);
  }
}

module.exports = {
  Seed,
};
