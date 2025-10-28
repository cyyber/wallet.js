const randomBytes = require('randombytes');
const { mnemonicToBin } = require('../misc/mnemonic.js');
const { unsafeGetAddress, addressToString } = require('../common/address.js');
const { Seed } = require('../common/seed.js');
const { ExtendedSeed } = require('../common/extended-seed.js');
const { newMLDSA87Descriptor } = require('./descriptor.js');
const { sign, keygen } = require('./crypto.js');

class Wallet {
  constructor({ descriptor, seed, pk, sk }) {
    this.descriptor = descriptor;
    this.seed = seed;
    this.pk = pk;
    this.sk = sk;
    this.extendedSeed = ExtendedSeed.NewExtendedSeed(descriptor, seed);
  }

  static NewWallet(metadata = [0, 0]) {
    const descriptor = newMLDSA87Descriptor(metadata);
    const seedBytes = randomBytes(48);
    const seed = new Seed(seedBytes);
    const { pk, sk } = keygen(seed);
    return new Wallet({ descriptor, seed, pk, sk });
  }

  static NewWalletFromSeed(seed, metadata = [0, 0]) {
    const descriptor = newMLDSA87Descriptor(metadata);
    const { pk, sk } = keygen(seed);
    return new Wallet({ descriptor, seed, pk, sk });
  }

  static NewWalletFromExtendedSeed(extendedSeed) {
    const descriptor = newMLDSA87Descriptor(extendedSeed.GestDescriptorBytes().slice(1));
    const seed = extendedSeed.GetSeed();
    const { pk, sk } = keygen(seed);
    return new Wallet({ descriptor, seed, pk, sk });
  }

  static NewWalletFromMnemonic(mnemonic) {
    const seedBytes = mnemonicToBin(mnemonic);
    const seed = new Seed(seedBytes);
    const descriptor = newMLDSA87Descriptor();
    const { pk, sk } = keygen();
    return new Wallet({ descriptor, seed, pk, sk });
  }

  /** @returns {Uint8Array} length 20 */
  GetAddress() {
    return unsafeGetAddress(this.pk, this.descriptor.ToBytes());
  }

  /** @returns {string} "Q" + hex */
  GetAddressStr() {
    return addressToString(this.GetAddress());
  }

  GestDescriptor() {
    return this.descriptor;
  }

  Sign(message) {
    return sign(this.sk, message);
  }
}

module.exports = {
  Wallet,
};
