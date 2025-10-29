/** @typedef {import('./common/descriptor.js').Descriptor} Descriptor */
const { SHAKE } = require('sha3');
const { ADDRESS_SIZE, DESCRIPTOR_SIZE } = require('./constants.js');

/**
 * 
 * @param {Uint8Array} pk 
 * @param {Uint8Array} descriptorBytes 
 * @returns {Uint8Array} address
 */
function unsafeGetAddress(pk, descriptorBytes) {
  if (!(pk instanceof Uint8Array)) throw new Error('pk must be Uint8Array');
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

function addressToString(addrBytes) {
  if (!addrBytes || addrBytes.length !== ADDRESS_SIZE) {
    throw new Error(`addr must be ${ADDRESS_SIZE} bytes`);
  }
  const hex = [...addrBytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `Q${hex}`;
}

/**
 *
 * @param {Uint8Array} pk
 * @param {Descriptor} descriptor
 */
function getAddressFromPKAndDescriptor(pk, descriptor) {
  const addr = unsafeGetAddress(pk, descriptor.toBytes());
  if (addr.length !== ADDRESS_SIZE) {
    throw new Error('unexpected address size');
  }
  return addr;
}

module.exports = {
  unsafeGetAddress,
  addressToString,
  getAddressFromPKAndDescriptor,
};
