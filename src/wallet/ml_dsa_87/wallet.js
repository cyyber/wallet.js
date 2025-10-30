/** @typedef {import('../common/descriptor.js').Descriptor} Descriptor */
const randomBytes = require('randombytes');
const { bytesToHex } = require('@noble/hashes/utils.js');
const { mnemonicToBin } = require('../misc/mnemonic.js');
const { unsafeGetAddress, addressToString } = require('../common/address.js');
const { Seed, ExtendedSeed } = require('../common/seed.js');
const { newMLDSA87Descriptor } = require('./descriptor.js');
const { keygen, sign, verify } = require('./crypto.js');

class Wallet {
  constructor({ descriptor, seed, pk, sk }) {
    this.descriptor = descriptor;
    this.seed = seed;
    this.pk = pk;
    this.sk = sk;
    this.extendedSeed = ExtendedSeed.newExtendedSeed(descriptor, seed);
  }

  static newWallet(metadata = [0, 0]) {
    const descriptor = newMLDSA87Descriptor(metadata);
    const seedBytes = randomBytes(48);
    const seed = new Seed(seedBytes);
    const { pk, sk } = keygen(seed);
    return new Wallet({ descriptor, seed, pk, sk });
  }

  static newWalletFromSeed(seed, metadata = [0, 0]) {
    const descriptor = newMLDSA87Descriptor(metadata);
    const { pk, sk } = keygen(seed);
    return new Wallet({ descriptor, seed, pk, sk });
  }

  static newWalletFromExtendedSeed(extendedSeed) {
    const descriptor = newMLDSA87Descriptor(extendedSeed.getDescriptorBytes().slice(1));
    const seed = extendedSeed.getSeed();
    const { pk, sk } = keygen(seed);
    return new Wallet({ descriptor, seed, pk, sk });
  }

  static newWalletFromMnemonic(mnemonic) {
    const seedBytes = mnemonicToBin(mnemonic);
    const seed = new Seed(seedBytes);
    const descriptor = newMLDSA87Descriptor();
    const { pk, sk } = keygen();
    return new Wallet({ descriptor, seed, pk, sk });
  }

  /** @returns {Uint8Array} length 20 */
  getAddress() {
    return unsafeGetAddress(this.pk, this.descriptor.toBytes());
  }

  /** @returns {string} "Q" + hex */
  getAddressStr() {
    return addressToString(this.getAddress());
  }

  /** @returns {Descriptor} */
  getDescriptor() {
    return this.descriptor;
  }

  /** @returns {ExtendedSeed} */
  getExtendedSeed() {
    return this.extendedSeed;
  }

  /** @returns {Seed} */
  getSeed() {
    return this.seed;
  }

  /** @returns {string} hex(Seed) */
  getHexSeed() {
    return bytesToHex(this.seed.toBytes());
  }

  /** @returns {Uint8Array} */
  getPK() {
    return this.pk.slice();
  }

  /** @returns {Uint8Array} */
  getSK() {
    return this.sk.slice();
  }

  sign(message) {
    return sign(this.sk, message);
  }

  static verify(signature, message, pk) {
    return verify(signature, message, pk);
  }
}

module.exports = {
  Wallet,
};
