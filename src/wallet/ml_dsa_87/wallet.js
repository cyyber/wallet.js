const { MnemonicToBin } = require('../misc/mnemonic.js');
const { UnsafeGetAddress } = require('../common/address.js');
const { ExtendedSeed } = require('../common/extended-seed.js');
const { NewMLDSA87Descriptor } = require('./descriptor.js');
const { sign, keygen } = require('./crypto.js');
const randomBytes = require('randombytes');

class Wallet {
    constructor({ descriptor, seed, pk, sk }) {
        this._descriptor = descriptor;
        this._seed = seed;
        this._pk = pk;
        this._sk = sk;
        this._extendedSeed = ExtendedSeed.NewExtendedSeed(descriptor, seed);
    }

    static NewWallet(metadata = [0, 0]) {
        const descriptor = NewMLDSA87Descriptor(metadata);
        const seedBytes = randomBytes(48);
        const seed = new Seed(seedBytes);
        const { pk, sk } = keygen(seed);
        return new Wallet({ descriptor, seed, pk, sk });
    }

    static NewWalletFromSeed(seed, metadata = [0, 0]) {
        const descriptor = NewMLDSA87Descriptor(metadata);
        const { pk, sk } = keygen(seed);
        return new Wallet({ descriptor, seed, pk, sk });
    }

    static NewWalletFromExtendedSeed(extendedSeed) {
        const descriptor = NewMLDSA87Descriptor(extendedSeed.GestDescriptorBytes().slice(1));
        const seed = extendedSeed.GetSeed();
        const { pk, sk } = keygen(seed);
        return new Wallet({ descriptor, seed, pk, sk });
    }

    static NewWalletFromMnemonic(mnemonic) {
        const seedBytes = MnemonicToBin(mnemonic);
        const seed = new Seed(seedBytes);
        const descriptor = NewMLDSA87Descriptor();
        const { pk, sk } = keygen();
        return new Wallet({ descriptor, seed, pk, sk });
    }

    /** @returns {Uint8Array} length 20 */
    GetAddress() {
        return UnsafeGetAddress(this._pk, this._descriptor.ToBytes());
    }
    
    /** @returns {string} "Q" + hex */
    GetAddressStr() { return addressToString(this.GetAddress()); }

    GestDescriptor() { return this._descriptor; }

    Sign(message) {
        return sign(this._sk, message);
    }
}

module.exports = { 
    Wallet,
};