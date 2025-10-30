/**
 * 3-byte descriptorfor a wallet:
 *  - byte 0: wallet type (e.g. ML_DSA_87)
 *  - bytes 1..2: 2 bytes metadata
 * @module wallet/common/descriptor
 */

/** @typedef {import('./wallttype.js').WalletType} WalletTypeEnum */
const { DESCRIPTOR_SIZE } = require('./constants.js');
const { isValidWalletType } = require('./wallettype.js');

class Descriptor {
  /**
   * @param {Uint8Array|number[]} bytes must be exactly 3 bytes.
   * @throws {Error} if size is not 3 or wallet type is invalid.
   */
  constructor(bytes) {
    if (!bytes || bytes.length !== DESCRIPTOR_SIZE) {
      throw new Error(`Descriptor must be ${DESCRIPTOR_SIZE} bytes`);
    }
    /** @private @type {Uint8Array} */
    this.bytes = Uint8Array.from(bytes);
    if (!isValidWalletType(this.bytes[0])) {
      throw new Error('Invalid wallet type in descriptor');
    }
  }

  /**
   * Copy of internal bytes.
   * @returns {Uint8Array}
   */
  toBytes() {
    return this.bytes.slice();
  }
}

/**
 * Build descriptor bytes from parts.
 * @param {number} walletType byte.
 * @param {[number, number]} [metadata=[0,0]] two metadata bytes.
 * @returns {Uint8Array} 3 bytes.
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
