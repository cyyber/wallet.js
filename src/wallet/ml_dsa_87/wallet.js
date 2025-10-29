const randomBytes = require('randombytes');
const { mnemonicToBin } = require('../misc/mnemonic.js');
const { unsafeGetAddress, addressToString } = require('../common/address.js');
const { Seed } = require('../common/seed.js');
// const { ExtendedSeed } = require('../common/extended-seed.js');
const { newMLDSA87Descriptor } = require('./descriptor.js');
const { sign, keygen } = require('./crypto.js');

class Wallet {
  constructor({ descriptor, seed, pk, sk }) {
    this.descriptor = descriptor;
    this.seed = seed;
    this.pk = pk;
    this.sk = sk;
    // this.extendedSeed = ExtendedSeed.newExtendedSeed(descriptor, seed);
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
    const descriptor = newMLDSA87Descriptor(extendedSeed.GestDescriptorBytes().slice(1));
    const seed = extendedSeed.GetSeed();
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

  getDescriptor() {
    return this.descriptor;
  }

  /** @returns {string} hex(Seed) */
  getHexSeed() {
    return [...this.seed.toBytes()].map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  /** @returns {Uint8Array} */
  getPK() {
    return this.pk.slice();
  }

  sign(message) {
    return sign(this.sk, message);
  }
}

module.exports = {
  Wallet,
};
