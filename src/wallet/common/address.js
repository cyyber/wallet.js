/**
 * Address helpers.
 * @module wallet/common/address
 */

/** @typedef {import('./common/descriptor.js').Descriptor} Descriptor */
const { SHAKE } = require('sha3');
const { ADDRESS_SIZE, DESCRIPTOR_SIZE } = require('./constants.js');

/**
 * Convert address bytes to string form.
 * @param {Uint8Array} addrBytes
 * @returns {string}
 * @throws {Error} If length mismatch.
 */
function addressToString(addrBytes) {
  if (!addrBytes || addrBytes.length !== ADDRESS_SIZE) {
    throw new Error(`addr must be ${ADDRESS_SIZE} bytes`);
  }
  const hex = [...addrBytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `Q${hex}`;
}

/**
 * Derive an address from a public key and descriptor.
 * @param {Uint8Array} pk
 * @param {Descriptor} descriptor
 * @returns {Uint8Array} 20-byte address.
 * @throws {Error} If the derived address length is not `ADDRESS_SIZE`.
 */
function getAddressFromPKAndDescriptor(pk, descriptor) {
  if (!(pk instanceof Uint8Array)) throw new Error('pk must be Uint8Array');

  const descriptorBytes = descriptor.toBytes();
  if (!(descriptorBytes instanceof Uint8Array) || descriptorBytes.length !== DESCRIPTOR_SIZE) {
    throw new Error(`descriptor must be ${DESCRIPTOR_SIZE} bytes`);
  }

  const input = new Uint8Array(descriptorBytes.length + pk.length);
  input.set(descriptorBytes, 0);
  input.set(pk, descriptorBytes.length);

  const shake = new SHAKE(256);
  shake.update(Buffer.from(input));
  const digest = shake.digest();
  const out = new Uint8Array(digest).slice(0, ADDRESS_SIZE);
  return out;
}

module.exports = {
  addressToString,
  getAddressFromPKAndDescriptor,
};
