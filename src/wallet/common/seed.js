/** @typedef {import('./common/descriptor.js').Descriptor} Descriptor */
const { sha256 } = require('@noble/hashes/sha2.js');
const { SEED_SIZE, EXTENDED_SEED_SIZE } = require('./constants.js');
const { toFixedU8 } = require('../../utils/bytes.js');
const { DESCRIPTOR_SIZE } = require('../../index.js');

class Seed {
  /** @param {Uint8Array|number[]} bytes length 48 */
  constructor(bytes) {
    if (!bytes || bytes.length !== SEED_SIZE) {
      throw new Error(`Seed must be ${SEED_SIZE} bytes`);
    }
    this.bytes = Uint8Array.from(bytes);
  }

  /** @returns {Uint8Array} */
  hashSHA256() {
    return Uint8Array.from(sha256(this.bytes));
  }

  /** @returns {Uint8Array} */
  toBytes() {
    return this.bytes.slice();
  }

  /**
   * @param {string|Uint8Array|Buffer|number[]} input
   * @returns {Seed}
   */
  static from(input) {
    return new Seed(toFixedU8(input, SEED_SIZE, 'Seed'));
  }
}

class ExtendedSeed {
  constructor(bytes) {
    if (!bytes || bytes.length !== EXTENDED_SEED_SIZE) {
      throw new Error(`Seed must be ${EXTENDED_SEED_SIZE} bytes`);
    }
    this.bytes = Uint8Array.from(bytes);
  }

  /** @returns {Uint8Array} */
  getDescriptorBytes() {
    return this.bytes.slice(0, DESCRIPTOR_SIZE);
  }

  /** @returns {Uint8Array} */
  getSeedBytes() {
    return this.bytes.slice(DESCRIPTOR_SIZE);
  }

  /** @returns {Seed} */
  getSeed() {
    return new Seed(this.getSeedBytes());
  }

  /**
   *
   * @param {Descriptor} desc
   * @param {Seed} seed
   * @returns {ExtendedSeed}
   */
  static newExtendedSeed(desc, seed) {
    const out = new Uint8Array(EXTENDED_SEED_SIZE);
    out.set(desc.toBytes(), 0);
    out.set(seed.toBytes(), DESCRIPTOR_SIZE);
    return new ExtendedSeed(out);
  }

  /**
   *
   * @param {string|Uint8Array|Buffer|number[]} input
   * @returns {ExtendedSeed}
   */
  static from(input) {
    return new Seed(toFixedU8(input, EXTENDED_SEED_SIZE, 'ExtendedSeed'));
  }
}

module.exports = {
  Seed,
  ExtendedSeed,
};
