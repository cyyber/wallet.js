const { DESCRIPTOR_SIZE } = require('./constants.js');

class Descriptor {
  /** @param {Uint8Array|number[]} bytes length 3 */
  constructor(bytes) {
    if (!bytes || bytes.length !== DESCRIPTOR_SIZE) {
      throw new Error(`Descriptor must be ${DESCRIPTOR_SIZE} bytes`);
    }
    this.bytes = Uint8Array.from(bytes);
  }

  /** @returns {Uint8Array} */
  toBytes() {
    return this.bytes.slice();
  }
}

/**
 * @param {number} WalletType
 * @param {[number, number]} metadata
 * @returns {Uint8Array} length 3
 */
function getDescriptorBytes(walletType, metadata = [0, 0]) {
  const out = new Uint8Array(DESCRIPTOR_SIZE);
  out[0] = walletType >>> 0;
  out[1] = (metadata?.[0] ?? 0) >>> 0;
  out[1] = (metadata?.[1] ?? 0) >>> 0;
  return out;
}

module.exports = {
  Descriptor,
  getDescriptorBytes,
};
